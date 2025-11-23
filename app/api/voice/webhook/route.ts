/**
 * Voice Call Webhook - Initial Call Handler
 *
 * This endpoint is called by Twilio when someone calls the business number.
 * It creates a new call session and returns TwiML to greet the caller.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parseTwilioVoiceParams, generateGreetingTwiML } from '@/lib/twilio-voice';
import { getBotType } from '@/lib/bot-prompts';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('=== VOICE WEBHOOK CALLED ===');

    // Parse Twilio webhook parameters
    const formData = await request.formData();
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    const voiceParams = parseTwilioVoiceParams(params);

    console.log('Call received:', {
      callSid: voiceParams.CallSid,
      from: voiceParams.From,
      to: voiceParams.To,
      status: voiceParams.CallStatus,
    });

    // Determine bot type based on destination number
    const botType = getBotType(voiceParams.To);
    console.log('Bot type:', botType);

    // Create initial call session in database
    const sessionData = {
      call_sid: voiceParams.CallSid,
      customer_phone: voiceParams.From,
      conversation_history: [],
      customer_data: {},
      booking_state: {},
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
    };

    // For client bots, we'd need to look up business_id from business_phones table
    // For now, focusing on sales bot (null business_id for sales)
    if (botType === 'client') {
      // Look up which business owns this phone number
      const { data: businessPhone } = await supabase
        .from('business_phones')
        .select('business_id')
        .eq('phone_number', voiceParams.To)
        .single();

      if (businessPhone) {
        Object.assign(sessionData, { business_id: businessPhone.business_id });
      }
    }

    const { data: session, error: sessionError } = await supabase
      .from('voice_call_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (sessionError) {
      console.error('Failed to create call session:', sessionError);
      // Continue anyway - we can still handle the call without DB
    } else {
      console.log('Call session created:', session.id);
    }

    // Determine business name for greeting
    let businessName = 'CoreSentia';
    if (botType === 'client') {
      // Look up business name from database
      const { data: businessPhone } = await supabase
        .from('business_phones')
        .select('businesses(name)')
        .eq('phone_number', voiceParams.To)
        .single();

      if (businessPhone && businessPhone.businesses) {
        businessName = (businessPhone.businesses as any).name;
      }
    }

    // Generate conversation URL for next step
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://www.coresentia.com.au';
    const conversationUrl = `${baseUrl}/api/voice/conversation`;

    // Return TwiML greeting
    const twiml = generateGreetingTwiML(businessName, conversationUrl);

    console.log('Returning TwiML greeting');

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });

  } catch (error) {
    console.error('Voice webhook error:', error);

    // Return error TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Google.en-AU-Neural2-A">I'm sorry, I'm experiencing technical difficulties. Please try calling back in a few minutes. Goodbye!</Say>
  <Hangup/>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'Voice webhook endpoint active',
    usage: 'POST only - Twilio webhook',
  });
}
