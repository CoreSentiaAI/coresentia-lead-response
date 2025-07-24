// app/api/quotes/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateQuoteHTML } from '@/app/templates/quote-template';
import { generatePDF } from '@/app/lib/pdf-generator';

// Initialize services
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Quote generation endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      leadId,
      clientName,
      companyName,
      clientABN,
      email,
      phone,
      packageType,
      description,
      amount,
      stripePaymentLink // You'll generate this separately
    } = body;

    // Validate required fields
    if (!leadId || !clientName || !email || !packageType || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate pricing
    const subtotal = amount;
    const gst = subtotal * 0.1;
    const total = subtotal + gst;
    
    // Determine hosting prices based on package
    const monthlyHosting = packageType === 'Essentials' ? 200 : 300;
    const selfHostedPrice = packageType === 'Custom' ? 1500 : undefined;
    const timeline = packageType === 'Essentials' ? 5 : 10;

    // Generate quote number (format: Q-YYYY-XXX)
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('quotes')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', `${year}-01-01`);
    
    const quoteNumber = `Q-${year}-${String((count || 0) + 1).padStart(3, '0')}`;
    
    // Format dates
    const date = new Date().toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 7);
    const validUntil = validUntilDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Generate HTML from template
    const quoteHtml = generateQuoteHTML({
      quoteNumber,
      date,
      validUntil,
      clientName,
      companyName,
      clientABN,
      email,
      phone,
      packageType,
      description,
      amount,
      subtotal,
      gst,
      total,
      timeline,
      monthlyHosting,
      selfHostedPrice
    });

    // Convert HTML to PDF using Puppeteer
    const pdfBuffer = await generatePDF(quoteHtml);

    // Save quote to Supabase
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        lead_id: leadId,
        quote_number: quoteNumber,
        client_name: clientName,
        company_name: companyName,
        client_abn: clientABN,
        email,
        phone,
        package_type: packageType,
        description,
        amount: subtotal,
        gst,
        total,
        valid_until: validUntilDate.toISOString(),
        status: 'sent',
        stripe_payment_link: stripePaymentLink
      })
      .select()
      .single();

    if (quoteError) {
      throw new Error('Failed to save quote');
    }

    // TODO: Add email sending back once Resend issue is resolved
    // For now, just log that email would be sent
    console.log('Quote generated successfully. Email would be sent to:', email);
    console.log('PDF Buffer size:', pdfBuffer.length);

    // Update lead status
    await supabase
      .from('leads')
      .update({ 
        status: 'quoted',
        last_action_at: new Date().toISOString()
      })
      .eq('id', leadId);

    // Return success with PDF buffer as base64
    return NextResponse.json({
      success: true,
      quoteNumber,
      quoteId: quote.id,
      message: 'Quote generated successfully',
      pdfBase64: pdfBuffer.toString('base64'),
      htmlPreview: quoteHtml // Include HTML for preview
    });

  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve quote
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quoteId = searchParams.get('id');
  
  if (!quoteId) {
    return NextResponse.json({ error: 'Quote ID required' }, { status: 400 });
  }

  const { data: quote, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', quoteId)
    .single();

  if (error || !quote) {
    return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
  }

  return NextResponse.json(quote);
}
