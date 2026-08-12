import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sendSMS } from '@/lib/twilio'
import { attributionLines } from '@/app/lib/attribution'

// Form submissions are delivered by email (plus SMS when ADMIN_PHONE is set).
// No database write - the old leads table was retired Aug 2026. If enquiry
// volume grows, re-add a storage step here.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@coresentia.com.au'
const SMTP_USER = process.env.SMTP_USER || ADMIN_EMAIL

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: process.env.SMTP_PASSWORD || process.env.GOOGLE_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, businessType, message, page, utm } = body

    // Validation - phone is optional in the form, so not required here
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const emailBody = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone?.trim() || 'Not provided'}`,
      `Project type: ${businessType || 'Not specified'}`,
      ...attributionLines(page, utm),
      '',
      message?.trim() || 'No message provided.',
    ].join('\n')

    // Send email notification
    let emailSent = false
    try {
      await transporter.sendMail({
        from: `"CoreSentia website" <${SMTP_USER}>`,
        to: ADMIN_EMAIL,
        replyTo: email.trim(),
        subject: `New enquiry from ${name.trim()}${businessType ? ` - ${businessType}` : ''}`,
        text: emailBody,
      })
      emailSent = true
    } catch (emailError) {
      console.error('Failed to send enquiry email:', emailError)
    }

    // Send SMS notification (best effort)
    let smsSent = false
    const adminPhone = process.env.ADMIN_PHONE
    if (adminPhone) {
      try {
        const smsResult = await sendSMS({
          to: adminPhone,
          body: `🎯 NEW ENQUIRY

Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email}
Project: ${businessType || 'Not specified'}
${message ? `Message: ${message}` : ''}`,
        })
        smsSent = smsResult.success
        if (!smsResult.success) {
          console.error('Failed to send admin SMS notification:', smsResult.error)
        }
      } catch (smsError) {
        console.error('Failed to send admin SMS notification:', smsError)
      }
    }

    // Fail loudly only if nothing was delivered at all
    if (!emailSent && !smsSent) {
      return NextResponse.json(
        {
          error: 'Failed to submit your message',
          details: `Please email ${ADMIN_EMAIL} directly`,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
    })
  } catch (error) {
    console.error('Quote form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
