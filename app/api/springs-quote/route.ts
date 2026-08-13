import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Relay for the Springs Mowing & Maintenance website quote form
// (springsmowing.com.au is a static site with no backend of its own).
// Sends via CoreSentia's authenticated SMTP, delivers to the client's inbox.
const RECIPIENT = 'info@springsmowing.com.au'
const SMTP_USER = process.env.SMTP_USER || process.env.ADMIN_EMAIL || 'info@coresentia.com.au'

const ALLOWED_ORIGINS = new Set([
  'https://www.springsmowing.com.au',
  'https://springsmowing.com.au',
  'https://www.springsmowingmaintenance.com.au',
  'https://springsmowingmaintenance.com.au',
  'http://localhost:4321',
])

function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') || ''
  if (!ALLOWED_ORIGINS.has(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: process.env.SMTP_PASSWORD || process.env.GOOGLE_APP_PASSWORD,
  },
})

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}

export async function POST(request: NextRequest) {
  const headers = corsHeaders(request)
  try {
    const body = await request.json()
    const { name, phone, email, suburb, size, message, company } = body

    // Honeypot: real visitors never fill this field
    if (company) {
      return NextResponse.json({ success: true }, { headers })
    }

    if (!name?.trim() || !(phone?.trim() || email?.trim())) {
      return NextResponse.json(
        { error: 'Name and a phone number or email are required' },
        { status: 400, headers }
      )
    }

    const clip = (v: unknown, max: number) =>
      typeof v === 'string' ? v.trim().slice(0, max) : ''

    const emailBody = [
      `Name: ${clip(name, 100)}`,
      `Phone: ${clip(phone, 40) || 'Not provided'}`,
      `Email: ${clip(email, 120) || 'Not provided'}`,
      `Suburb: ${clip(suburb, 80) || 'Not provided'}`,
      `Yard size: ${clip(size, 40) || 'Not specified'}`,
      '',
      clip(message, 2000) || 'No message provided.',
      '',
      '--',
      'Sent from the quote form at springsmowing.com.au',
    ].join('\n')

    await transporter.sendMail({
      from: `"Springs Mowing website" <${SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: clip(email, 120) || undefined,
      subject: `New quote request - ${clip(name, 100)}${suburb ? ` (${clip(suburb, 80)})` : ''}`,
      text: emailBody,
    })

    return NextResponse.json({ success: true }, { headers })
  } catch (error) {
    console.error('Springs quote form error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please call or text 0408 777 692 instead.' },
      { status: 500, headers }
    )
  }
}
