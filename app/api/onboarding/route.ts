import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if env vars are set and not placeholders
const isValidUrl = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here') && supabaseUrl.startsWith('http')
const isValidKey = supabaseKey && !supabaseKey.includes('your_') && supabaseKey.length > 20

if (!isValidUrl || !isValidKey) {
  console.error('Missing or invalid Supabase environment variables')
}

const supabase = isValidUrl && isValidKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Email transporter (configure with your SMTP settings)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const formData = await request.json()

    // Save to database (simplified fields)
    const { data: onboarding, error } = await supabase
      .from('client_onboarding')
      .insert({
        // Business Basics
        business_name: formData.businessName,
        abn: formData.abn || null,
        contact_person: formData.contactPerson,
        mobile: formData.mobile,
        email: formData.email,
        industry_type: formData.industryType,

        // Package
        selected_package: formData.selectedPackage,

        // Service Coverage
        service_city: formData.serviceCity,
        service_state: formData.serviceState,
        service_radius: formData.serviceRadius,
        service_notes: formData.serviceNotes || null,

        // Phone Setup
        current_phone: formData.currentPhone,
        phone_setup: formData.phoneSetup,
        port_number: formData.portNumber || null,

        // Scheduling
        go_live_date: formData.goLiveDate,
        call_time: formData.callTime,

        // Additional
        special_requests: formData.specialRequests || null,

        // Status
        status: 'submitted',
        created_at: new Date().toISOString()
      })
      .select('*')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save form data' },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      await transporter.sendMail({
        from: '"CoreSentia" <info@coresentia.com.au>',
        to: formData.email,
        subject: 'Welcome to CoreSentia - Onboarding Received!',
        html: `
          <h2>Thanks for completing your onboarding form!</h2>
          <p>Hi ${formData.contactPerson},</p>
          <p>We've received your onboarding information for <strong>${formData.businessName}</strong>.</p>

          <h3>What's Next?</h3>
          <ol>
            <li><strong>Setup Call:</strong> We'll reach out within 24 hours to schedule your 15-minute setup call</li>
            <li><strong>Customization:</strong> We'll build and customize your AI receptionist (1-2 business days)</li>
            <li><strong>Testing:</strong> You'll test and approve before we go live</li>
            <li><strong>Go Live:</strong> Start capturing leads on ${formData.goLiveDate}!</li>
          </ol>

          <h3>Your Information:</h3>
          <ul>
            <li><strong>Package:</strong> ${formData.selectedPackage}</li>
            <li><strong>Service Area:</strong> ${formData.serviceCity}, ${formData.serviceState} (${formData.serviceRadius})</li>
            <li><strong>Phone Setup:</strong> ${formData.phoneSetup === 'new' ? 'New CoreSentia number' : 'Port existing number'}</li>
            <li><strong>Preferred Call Time:</strong> ${formData.callTime}</li>
          </ul>

          <p>If you have any questions before our call, reply to this email or text <strong>+61489087491</strong>.</p>

          <p>Looking forward to working with you!</p>
          <p><strong>The CoreSentia Team</strong></p>
          <hr>
          <p style="font-size: 12px; color: #666;">CoreSentia | ABN: 69 267 271 132 | Brisbane, QLD</p>
        `,
      })

      // Send internal notification to admin
      await transporter.sendMail({
        from: '"CoreSentia System" <info@coresentia.com.au>',
        to: process.env.ADMIN_EMAIL || 'info@coresentia.com.au',
        subject: `🎉 New Onboarding: ${formData.businessName}`,
        html: `
          <h2>New Client Onboarding Submitted</h2>

          <h3>Business Details:</h3>
          <ul>
            <li><strong>Business Name:</strong> ${formData.businessName}</li>
            <li><strong>ABN:</strong> ${formData.abn || 'Not provided'}</li>
            <li><strong>Contact:</strong> ${formData.contactPerson}</li>
            <li><strong>Mobile:</strong> ${formData.mobile}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Industry:</strong> ${formData.industryType}</li>
          </ul>

          <h3>Package & Setup:</h3>
          <ul>
            <li><strong>Package:</strong> ${formData.selectedPackage}</li>
            <li><strong>Service Area:</strong> ${formData.serviceCity}, ${formData.serviceState}</li>
            <li><strong>Radius:</strong> ${formData.serviceRadius}</li>
            <li><strong>Current Phone:</strong> ${formData.currentPhone}</li>
            <li><strong>Phone Setup:</strong> ${formData.phoneSetup === 'new' ? 'New number' : `Port: ${formData.portNumber}`}</li>
            <li><strong>Go-Live Date:</strong> ${formData.goLiveDate}</li>
            <li><strong>Call Time:</strong> ${formData.callTime}</li>
          </ul>

          ${formData.serviceNotes ? `<h3>Service Notes:</h3><p>${formData.serviceNotes}</p>` : ''}
          ${formData.specialRequests ? `<h3>Special Requests:</h3><p>${formData.specialRequests}</p>` : ''}

          <p><strong>Action Required:</strong> Schedule setup call with ${formData.contactPerson} within 24 hours</p>
        `,
      })
    } catch (emailError) {
      console.error('Email error (non-blocking):', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      onboardingId: onboarding?.id
    })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
