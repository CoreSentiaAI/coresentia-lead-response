import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generatePDF } from '@/app/lib/pdf-generator'
import { generateQuoteHTML } from '@/app/templates/quote-template'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    const body = await request.json()
    const {
      leadId,
      clientName,
      companyName,
      email,
      phone,
      packageType,
      description,
      amount
    } = body

    // Generate quote number (format: QT-YYYYMMDD-XXXX)
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const quoteNumber = `QT-${dateStr}-${random}`

    // Calculate amounts
    const subtotal = amount
    const gst = Math.round(subtotal * 0.1)
    const total = subtotal + gst

    // Determine timeline and hosting based on package
    const isEssentials = packageType === 'Essentials' || amount === 2500
    const timeline = isEssentials ? 5 : 10
    const monthlyHosting = isEssentials ? 200 : 300
    const selfHostedPrice = isEssentials ? null : 1500

    // Generate quote HTML
    const quoteHTML = generateQuoteHTML({
      quoteNumber,
      date: new Date().toLocaleDateString('en-AU'),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU'),
      clientName: clientName || 'Valued Client',
      companyName: companyName || 'Your Company',
      email,
      phone: phone || 'Not provided',
      packageType: isEssentials ? 'Essentials' : 'Custom',
      description: description || `${packageType} - AI-powered lead response system`,
      amount,
      subtotal,
      gst,
      total,
      timeline,
      monthlyHosting,
      selfHostedPrice
    })

    // Generate PDF
    const pdfBuffer = await generatePDF(quoteHTML, `CoreSentia-Quote-${quoteNumber}.pdf`)

    // Save quote to database
    const { error: dbError } = await supabase
      .from('quotes')
      .insert({
        lead_id: leadId,
        quote_number: quoteNumber,
        client_name: clientName,
        company_name: companyName,
        email,
        phone,
        package_type: packageType,
        description,
        amount,
        subtotal,
        gst,
        total,
        status: 'sent',
        valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database error:', dbError)
    }

    // Send email with Google Workspace SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'info@coresentia.com',
        pass: process.env.GOOGLE_APP_PASSWORD!
      }
    })

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2A50DF;">Your CoreSentia Quote is Ready!</h2>
        <p>Hi ${clientName},</p>
        <p>Thank you for your interest in CoreSentia's AI solutions. Your custom quote is attached to this email.</p>
        <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #62D4F9; margin-top: 0;">Quote Summary</h3>
          <p><strong>Quote Number:</strong> ${quoteNumber}</p>
          <p><strong>Package:</strong> ${packageType}</p>
          <p><strong>Total:</strong> $${total.toLocaleString()} AUD (inc. GST)</p>
          <p><strong>Valid Until:</strong> ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU')}</p>
        </div>
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Review the attached quote</li>
          <li>Reply to this email to accept or ask questions</li>
          <li>We'll send a deposit invoice to begin</li>
        </ol>
        <p>Have questions? Reply to this email or book a consultation: <a href="https://calendar.app.google/X6T7MdmZCxF3mGBe7">Schedule a Call</a></p>
        <p style="color: #666; font-style: italic; margin-top: 30px;">"Stop talking about AI. Start closing with it."</p>
      </div>
    `

    await transporter.sendMail({
      from: 'CoreSentia <info@coresentia.com>',
      to: email,
      subject: `Your CoreSentia Quote #${quoteNumber}`,
      html: emailHTML,
      attachments: [{
        filename: `CoreSentia-Quote-${quoteNumber}.pdf`,
        content: pdfBuffer
      }]
    })

    return NextResponse.json({
      success: true,
      quoteNumber,
      message: 'Quote generated and sent successfully'
    })

  } catch (error) {
    console.error('Quote generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
