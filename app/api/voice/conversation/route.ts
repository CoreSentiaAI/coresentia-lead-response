/**
 * Voice Conversation Handler - Multi-Turn Conversation
 *
 * This endpoint handles ongoing voice conversations with the AI.
 * Twilio calls this endpoint with speech-to-text results.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  parseTwilioVoiceParams,
  generateConversationTwiML,
  generateErrorTwiML,
} from '@/lib/twilio-voice';
import {
  getVoicePrompt,
  extractVoiceAction,
  shouldTriggerFallback,
  VoiceConversationContext,
} from '@/lib/voice-prompts';
import { getBotType } from '@/lib/bot-prompts';
import { handleActionNotifications } from '@/lib/notifications';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('=== VOICE CONVERSATION CALLED ===');

    // Parse Twilio webhook parameters
    const formData = await request.formData();
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    const voiceParams = parseTwilioVoiceParams(params);
    const speechResult = voiceParams.SpeechResult;
    const confidence = parseFloat(voiceParams.Confidence || '0');

    console.log('Speech result:', {
      callSid: voiceParams.CallSid,
      from: voiceParams.From,
      to: voiceParams.To,
      speech: speechResult,
      confidence,
    });

    // Handle empty or low-confidence speech
    if (!speechResult || confidence < 0.5) {
      console.log('No speech detected or low confidence');

      // Update failed attempts in session
      const { data: session } = await supabase
        .from('voice_call_sessions')
        .select('*')
        .eq('call_sid', voiceParams.CallSid)
        .single();

      if (session) {
        const failedAttempts = (session.booking_state?.failedAttempts || 0) + 1;

        await supabase
          .from('voice_call_sessions')
          .update({
            booking_state: { ...session.booking_state, failedAttempts },
            updated_at: new Date().toISOString(),
          })
          .eq('call_sid', voiceParams.CallSid);

        // If too many failures, trigger fallback
        if (failedAttempts >= 3) {
          const twiml = generateErrorTwiML('unclear');
          return new NextResponse(twiml, {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
          });
        }
      }

      // Ask them to repeat
      const twiml = generateConversationTwiML({
        message: "Sorry, I didn't catch that. Could you repeat that for me?",
        continueConversation: true,
        conversationUrl: `${getBaseUrl()}/api/voice/conversation`,
      });

      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Retrieve call session from database
    console.log('Fetching session for CallSid:', voiceParams.CallSid);
    const { data: session, error: sessionError } = await supabase
      .from('voice_call_sessions')
      .select('*')
      .eq('call_sid', voiceParams.CallSid)
      .single();

    if (sessionError || !session) {
      console.error('Failed to retrieve call session:', sessionError);
      const twiml = generateErrorTwiML('system');
      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    console.log('Session found:', session.id);
    console.log('Existing conversation history length:', session.conversation_history?.length || 0);

    // Build conversation context
    const conversationHistory = session.conversation_history || [];
    const turnCount = conversationHistory.length;

    // Add user's speech to conversation history
    conversationHistory.push({
      role: 'user',
      content: speechResult,
      timestamp: new Date().toISOString(),
    });

    // Check if we should trigger fallback (too long conversation)
    if (turnCount >= 20) {
      console.log('Conversation too long, triggering fallback');

      // Create lead and notify
      await createLeadFromVoiceCall(session, 'conversation_timeout');

      const twiml = generateConversationTwiML({
        message: "I need to wrap this up, but I've saved your details. The team will call you back shortly to continue. Thanks for calling!",
        continueConversation: false,
      });

      // Mark session as completed
      await supabase
        .from('voice_call_sessions')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('call_sid', voiceParams.CallSid);

      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Determine bot type and get appropriate prompt
    const botType = getBotType(voiceParams.To);
    console.log('Bot type determined:', botType, 'for number:', voiceParams.To);
    let systemPrompt: string;

    if (botType === 'sales') {
      console.log('Using sales bot prompt');
      systemPrompt = getVoicePrompt(voiceParams.To);
    } else {
      console.log('Using client bot prompt, fetching business context');
      // For client bot, need to fetch business context from business_phones table
      const { data: businessPhone, error: businessError } = await supabase
        .from('business_phones')
        .select('*')
        .eq('phone_number', voiceParams.To)
        .single();

      if (businessError || !businessPhone) {
        console.error('Failed to fetch business phone:', businessError);
        const twiml = generateErrorTwiML('system');
        return new NextResponse(twiml, {
          status: 200,
          headers: { 'Content-Type': 'text/xml' },
        });
      }

      console.log('Business found:', businessPhone.business_name);
      systemPrompt = getVoicePrompt(voiceParams.To, {
        businessName: businessPhone.business_name,
        industryType: businessPhone.industry_type || 'service',
        services: businessPhone.services || [],
        botPersonality: businessPhone.bot_personality || 'friendly',
      });
    }

    // Call Claude AI
    console.log('Calling Claude AI with', conversationHistory.length, 'messages');
    console.log('System prompt length:', systemPrompt.length);

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500, // Shorter for voice
        system: systemPrompt,
        messages: conversationHistory.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content || '',
        })),
        temperature: 0.7,
      }),
    });

    console.log('Claude API response status:', apiResponse.status);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      console.error('Anthropic API error:', apiResponse.status, errorData);
      const twiml = generateErrorTwiML('system');
      return new NextResponse(twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    const aiData = await apiResponse.json();
    console.log('Claude API response received, parsing...');

    if (!aiData.content || !aiData.content[0] || !aiData.content[0].text) {
      console.error('Invalid AI response structure:', JSON.stringify(aiData));
      throw new Error('Invalid response from Claude API');
    }

    let aiResponse = aiData.content[0].text;
    console.log('AI response length:', aiResponse.length);
    console.log('AI response preview:', aiResponse.substring(0, 100));

    // Extract any action triggers
    const { action, cleanedResponse } = extractVoiceAction(aiResponse);
    aiResponse = cleanedResponse;

    // Add AI response to conversation history
    conversationHistory.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    });

    // Extract customer data from conversation for potential lead creation
    const customerData = extractCustomerDataFromConversation(conversationHistory);

    // Update session in database
    await supabase
      .from('voice_call_sessions')
      .update({
        conversation_history: conversationHistory,
        customer_data: customerData,
        updated_at: new Date().toISOString(),
      })
      .eq('call_sid', voiceParams.CallSid);

    // Handle actions if any
    if (action) {
      console.log('Action triggered:', action);
      await handleVoiceAction(action, session, customerData, voiceParams.From);
    }

    // Determine if conversation should continue
    const shouldContinue = !action || action === 'CHECK_AVAILABILITY';
    const shouldHangup = action === 'GENERATE_QUOTE' ||
                         action === 'BOOK_MEETING' ||
                         action === 'CREATE_BOOKING' ||
                         action === 'HUMAN_HANDOFF';

    // Generate TwiML response
    console.log('Generating TwiML, shouldHangup:', shouldHangup);
    const twiml = generateConversationTwiML({
      message: aiResponse,
      continueConversation: !shouldHangup,
      conversationUrl: `${getBaseUrl()}/api/voice/conversation`,
    });

    console.log('TwiML generated, length:', twiml.length);
    console.log('Returning TwiML, continue:', !shouldHangup);

    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('Voice conversation error:', error);
    const twiml = generateErrorTwiML('system');
    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}

/**
 * Extract customer data from conversation history
 */
function extractCustomerDataFromConversation(
  conversationHistory: any[]
): Record<string, any> {
  const allText = conversationHistory
    .map((m) => m.content)
    .join(' ')
    .toLowerCase();

  const data: Record<string, any> = {};

  // Extract email (simple pattern)
  const emailMatch = allText.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) data.email = emailMatch[0];

  // Extract phone number (Australian format)
  const phoneMatch = allText.match(/(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}/);
  if (phoneMatch) data.phone = phoneMatch[0];

  // Try to extract name (look for "my name is" or "I'm")
  const nameMatch = allText.match(/(?:my name is|i'm|this is)\s+([a-z]+)/i);
  if (nameMatch) data.name = nameMatch[1];

  return data;
}

/**
 * Handle voice call actions
 */
async function handleVoiceAction(
  action: string,
  session: any,
  customerData: any,
  fromPhone: string
) {
  console.log('Handling voice action:', action);

  // Create a lead in the database
  await createLeadFromVoiceCall(session, action);

  // Trigger notifications via existing system
  try {
    await handleActionNotifications([
      {
        type: action.toLowerCase(),
        status: 'completed',
        data: {
          ...customerData,
          phone: customerData.phone || fromPhone,
          leadName: customerData.name || 'Voice Caller',
          clientName: customerData.name || 'Voice Caller',
          source: 'voice',
        },
      },
    ]);
  } catch (error) {
    console.error('Failed to send notifications:', error);
  }
}

/**
 * Create a lead from voice call
 */
async function createLeadFromVoiceCall(session: any, action: string) {
  const customerData = session.customer_data || {};
  const conversationHistory = session.conversation_history || [];

  // Build conversation transcript
  const transcript = conversationHistory
    .map((m: any) => `${m.role === 'user' ? 'Customer' : 'AI'}: ${m.content}`)
    .join('\n\n');

  await supabase.from('leads').insert({
    name: customerData.name || 'Voice Caller',
    email: customerData.email || null,
    phone: customerData.phone || session.customer_phone,
    business_name: customerData.businessName || null,
    message: transcript,
    source: 'voice',
    conversation_data: {
      call_sid: session.call_sid,
      action_triggered: action,
      customer_data: customerData,
    },
  });

  console.log('Lead created from voice call');
}

/**
 * Get base URL for webhook callbacks
 */
function getBaseUrl(): string {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.coresentia.com.au';
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'Voice conversation endpoint active',
    usage: 'POST only - Twilio webhook',
  });
}
