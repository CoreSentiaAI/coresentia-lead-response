import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendSMS, formatPhoneNumber } from '@/lib/twilio'
import { getBotType } from '@/lib/bot-prompts'

/**
 * Twilio SMS Webhook
 * Receives incoming SMS messages, routes to appropriate bot, and responds
 *
 * ROUTING LOGIC:
 * - +61489087491 → CoreSentia Sales Pipeline Bot (acquire clients)
 * - All other numbers → Client Booking Bot (book appointments for client's customers)
 */
export async function POST(request: NextRequest) {
  try {
    console.log('SMS webhook received')

    // Parse form data from Twilio
    const formData = await request.formData()
    const from = formData.get('From') as string // Customer's phone
    const to = formData.get('To') as string // Business phone number that received SMS
    const body = formData.get('Body') as string
    const messageSid = formData.get('MessageSid') as string

    console.log('SMS details:', { from, to, body, messageSid })

    if (!from || !to || !body) {
      console.error('Missing required fields')
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        {
          status: 400,
          headers: { 'Content-Type': 'text/xml' }
        }
      )
    }

    // Initialize Supabase with validation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if env vars are set and not placeholders
    const isValidUrl = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here') && supabaseUrl.startsWith('http')
    const isValidKey = supabaseKey && !supabaseKey.includes('your_') && supabaseKey.length > 20

    if (!isValidUrl || !isValidKey) {
      console.error('Missing or invalid Supabase environment variables')
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        {
          status: 503,
          headers: { 'Content-Type': 'text/xml' }
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Format phone numbers consistently
    const normalizedCustomerPhone = formatPhoneNumber(from)
    const normalizedBusinessPhone = formatPhoneNumber(to)
    console.log('Normalized phones - Customer:', normalizedCustomerPhone, 'Business:', normalizedBusinessPhone)

    // =====================================================
    // STEP 1: Determine bot type and get business context
    // =====================================================
    const botType = getBotType(normalizedBusinessPhone)
    console.log('Bot type:', botType)

    let businessContext: any = null
    let businessId: string | null = null

    if (botType === 'client') {
      // Look up business from phone number
      const { data: businessPhone, error: lookupError } = await supabase
        .from('business_phones')
        .select('*')
        .eq('phone_number', normalizedBusinessPhone)
        .eq('is_active', true)
        .single()

      if (lookupError || !businessPhone) {
        console.error('Business phone not found or inactive:', normalizedBusinessPhone, lookupError)
        // Send error SMS
        await sendSMS({
          to: from,
          body: "Sorry, this number is not configured. Please contact CoreSentia support."
        })
        return new NextResponse(
          '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
          { status: 200, headers: { 'Content-Type': 'text/xml' } }
        )
      }

      businessContext = {
        businessName: businessPhone.business_name,
        industryType: businessPhone.industry_type,
        services: businessPhone.services || [],
        botPersonality: businessPhone.bot_personality,
        customGreeting: businessPhone.custom_greeting
      }
      businessId = businessPhone.business_id

      console.log('Business context:', businessContext)
    }

    // =====================================================
    // STEP 2: Look up or create lead
    // =====================================================
    const normalizedPhone = normalizedCustomerPhone
    let lead: any = null

    // Try to find existing lead by phone
    // For client bookings, also filter by business_id
    let leadQuery = supabase
      .from('leads')
      .select('*')
      .eq('phone', normalizedPhone)

    if (botType === 'client' && businessId) {
      leadQuery = leadQuery.eq('business_id', businessId)
    }

    const { data: existingLead } = await leadQuery.single()

    if (existingLead) {
      console.log('Found existing lead:', existingLead.id)
      lead = existingLead
    } else {
      // Create new lead
      console.log('Creating new lead for SMS contact')
      const leadData: any = {
        phone: normalizedPhone,
        name: `SMS Contact ${normalizedPhone.slice(-4)}`,
        initial_message: body,
        status: 'new',
        source: 'sms'
      }

      // For client bookings, associate with business
      if (botType === 'client' && businessId) {
        leadData.business_id = businessId
      }

      const { data: newLead, error: createError } = await supabase
        .from('leads')
        .insert(leadData)
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
    // Pass bot type and business context for routing
    const chatResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        leadId: lead.id,
        leadInfo: lead,
        botType: botType, // 'sales' or 'client'
        businessContext: businessContext, // For client bot only
        businessId: businessId // For client bot only
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
