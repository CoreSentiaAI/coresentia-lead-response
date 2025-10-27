import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendSMS, formatPhoneNumber } from '@/lib/twilio'

/**
 * Twilio SMS Webhook
 * Receives incoming SMS messages, processes with AI, and responds
 */
export async function POST(request: NextRequest) {
  try {
    console.log('SMS webhook received')

    // Parse form data from Twilio
    const formData = await request.formData()
    const from = formData.get('From') as string
    const to = formData.get('To') as string
    const body = formData.get('Body') as string
    const messageSid = formData.get('MessageSid') as string

    console.log('SMS details:', { from, to, body, messageSid })

    if (!from || !body) {
      console.error('Missing required fields')
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/xml' }
        }
      )
    }

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    // Format phone number consistently
    const normalizedPhone = formatPhoneNumber(from)
    console.log('Normalized phone:', normalizedPhone)

    // Look up or create lead
    let lead: any = null

    // Try to find existing lead by phone
    const { data: existingLead } = await supabase
      .from('leads')
      .select('*')
      .eq('phone', normalizedPhone)
      .single()

    if (existingLead) {
      console.log('Found existing lead:', existingLead.id)
      lead = existingLead
    } else {
      // Create new lead
      console.log('Creating new lead for SMS contact')
      const { data: newLead, error: createError } = await supabase
        .from('leads')
        .insert({
          phone: normalizedPhone,
          name: `SMS Contact ${normalizedPhone.slice(-4)}`,
          initial_message: body,
          status: 'new',
          source: 'sms'
        })
        .select('*')
        .single()

      if (createError) {
        console.error('Error creating lead:', createError)
        throw new Error('Failed to create lead')
      }

      console.log('New lead created:', newLead.id)
      lead = newLead
    }

    // Get conversation history
    const { data: conversations } = await supabase
      .from('conversations')
      .select('*')
      .eq('lead_id', lead.id)
      .order('timestamp', { ascending: true })

    console.log('Found', conversations?.length || 0, 'previous messages')

    // Format messages for chat API
    const messages: Array<{ role: string; content: string }> = []

    if (conversations && conversations.length > 0) {
      // Add conversation history
      for (const conv of conversations) {
        messages.push({
          role: conv.sender === 'user' ? 'user' : 'assistant',
          content: conv.message
        })
      }
    }

    // Add current message
    messages.push({
      role: 'user',
      content: body
    })

    console.log('Calling chat API with', messages.length, 'messages')

    // Call chat API to get AI response
    const chatResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        leadId: lead.id,
        leadInfo: lead
      })
    })

    if (!chatResponse.ok) {
      console.error('Chat API error:', chatResponse.status)
      throw new Error('Chat API failed')
    }

    const chatData = await chatResponse.json()
    const aiResponse = chatData.message

    console.log('AI response received:', aiResponse.substring(0, 100) + '...')

    // Send SMS response
    const smsResult = await sendSMS({
      to: from,
      body: aiResponse
    })

    if (!smsResult.success) {
      console.error('Failed to send SMS:', smsResult.error)
    } else {
      console.log('SMS sent successfully:', smsResult.messageSid)
    }

    // Handle any actions from the AI (like booking)
    if (chatData.actions && chatData.actions.length > 0) {
      console.log('Actions detected:', chatData.actions)

      for (const action of chatData.actions) {
        if (action.type === 'book_meeting') {
          // Send follow-up SMS with booking link
          await sendSMS({
            to: from,
            body: `Book your consultation here: https://calendar.app.google/X6T7MdmZCxF3mGBe7`
          })
        }
      }
    }

    // Return TwiML response (empty - we've already sent the SMS)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      }
    )
  } catch (error) {
    console.error('SMS webhook error:', error)

    // Return empty TwiML even on error
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      }
    )
  }
}

// Handle GET requests (for webhook verification)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    message: 'SMS webhook endpoint is active'
  })
}
