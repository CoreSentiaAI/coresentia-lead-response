import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createXeroQuote } from '@/app/lib/xero-client'

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

    // Create quote in Xero
    const xeroQuote = await createXeroQuote({
      quoteNumber,
      clientName,
      companyName,
      email,
      phone,
      description: description || `${packageType} - AI-powered lead response system`,
      amount: subtotal // Xero wants ex-GST amount
    })

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
        created_at: new Date().toISOString(),
        xero_quote_id: xeroQuote.Quotes?.[0]?.QuoteID
      })

    if (dbError) {
      console.error('Database error:', dbError)
    }

    return NextResponse.json({
      success: true,
      quoteNumber,
      xeroQuoteId: xeroQuote.Quotes?.[0]?.QuoteID,
      message: 'Quote created in Xero successfully!'
    })

  } catch (error) {
    console.error('Quote generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
