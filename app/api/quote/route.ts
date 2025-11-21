import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendSMS } from '@/lib/twilio'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, businessType, message } = body

    // Validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create lead in database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        first_name: name.trim().split(' ')[0],
        last_name: name.trim().split(' ').slice(1).join(' ') || '',
        phone: phone.trim(),
        email: email.trim(),
        company: businessType || 'Not specified',
        initial_message: message || 'Quote request via web form',
        source: 'web_form',
        status: 'new',
        business_id: null, // No business association for quote requests
      })
      .select()
      .single()

    if (leadError) {
      console.error('Error creating lead:', leadError)
      console.error('Lead error details:', JSON.stringify(leadError, null, 2))
      return NextResponse.json(
        { error: 'Failed to submit quote request', details: leadError.message || 'Unknown error' },
        { status: 500 }
      )
    }

    // Send SMS notification to admin
    const adminPhone = process.env.ADMIN_PHONE
    if (adminPhone) {
      try {
        const smsMessage = `🎯 NEW QUOTE REQUEST

Name: ${name}
Phone: ${phone}
Email: ${email}
Business: ${businessType || 'Not specified'}
${message ? `Message: ${message}` : ''}

View: https://www.coresentia.com.au/admin`

        await sendSMS({ to: adminPhone, body: smsMessage })
      } catch (smsError) {
        console.error('Failed to send admin SMS notification:', smsError)
        // Don't fail the request if SMS fails
      }
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Quote request submitted successfully',
    })
  } catch (error) {
    console.error('Quote form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
