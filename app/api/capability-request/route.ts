import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  renderDeliveryEmail,
  CAPABILITY_PDF_FILENAME,
  CAPABILITY_PDF_PATH,
} from '@/app/lib/capability-email'

// Email-gated capability document. No database - the notification email to
// info@ is the lead record while enquiry volume stays low.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@coresentia.com'
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
    const { name, email, company } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'That email address does not look right' },
        { status: 400 }
      )
    }

    const cleanName = String(name).trim()
    const cleanEmail = String(email).trim()
    const cleanCompany = company ? String(company).trim() : ''
    const firstName = cleanName.split(' ')[0]

    // The PDF lives on the static CDN, not in the function bundle - fetch it
    // from our own origin to attach. Request origin first (correct in dev and
    // prod), configured site URL as the fallback.
    let pdfResponse = await fetch(new URL(CAPABILITY_PDF_PATH, request.nextUrl.origin)).catch(() => null)
    if ((!pdfResponse || !pdfResponse.ok) && process.env.NEXT_PUBLIC_SITE_URL) {
      pdfResponse = await fetch(new URL(CAPABILITY_PDF_PATH, process.env.NEXT_PUBLIC_SITE_URL)).catch(() => null)
    }
    if (!pdfResponse || !pdfResponse.ok) {
      console.error('Failed to fetch capability PDF:', pdfResponse?.status ?? 'network error')
      return NextResponse.json(
        { error: 'Could not prepare the document', details: `Please email ${ADMIN_EMAIL} and we will send it directly` },
        { status: 500 }
      )
    }
    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())

    // Deliver the document to the requester
    try {
      await transporter.sendMail({
        from: `"Ramsay Hatfield - CoreSentia" <${SMTP_USER}>`,
        to: cleanEmail,
        replyTo: ADMIN_EMAIL,
        subject: 'Your CoreSentia capability document',
        html: renderDeliveryEmail(firstName),
        attachments: [
          {
            filename: CAPABILITY_PDF_FILENAME,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      })
    } catch (emailError) {
      console.error('Failed to send capability document:', emailError)
      return NextResponse.json(
        { error: 'Could not send the document', details: `Please email ${ADMIN_EMAIL} and we will send it directly` },
        { status: 500 }
      )
    }

    // Lead record: notify admin (best effort, never fails the request)
    try {
      await transporter.sendMail({
        from: `"CoreSentia website" <${SMTP_USER}>`,
        to: ADMIN_EMAIL,
        replyTo: cleanEmail,
        subject: `Capability doc lead: ${cleanName}${cleanCompany ? ` - ${cleanCompany}` : ''}`,
        text: [
          'Capability document requested',
          '',
          `Name: ${cleanName}`,
          `Email: ${cleanEmail}`,
          `Company: ${cleanCompany || 'Not provided'}`,
          '',
          'The document was delivered automatically. Reply to this email to follow up with them directly.',
        ].join('\n'),
      })
    } catch (notifyError) {
      console.error('Failed to send capability lead notification:', notifyError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Capability request error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
