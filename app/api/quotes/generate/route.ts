import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { generateQuoteHTML } from '@/app/templates/quote-template';
import { generatePDF } from '@/app/lib/pdf-generator';

// Initialize services
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

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

    // Send email with quote
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your CoreSentia Quote is Ready</h2>
        <p>Hi ${clientName},</p>
        <p>Thank you for your interest in CoreSentia's Lead-to-Deal System. Your custom quote is attached to this email.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2A50DF; margin-top: 0;">Quote Summary</h3>
          <p><strong>Package:</strong> ${packageType}</p>
          <p><strong>Total:</strong> $${total.toLocaleString()} AUD (inc. GST)</p>
          <p><strong>Valid Until:</strong> ${validUntil}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${stripePaymentLink}" style="background-color: #62D4F9; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Accept Quote & Pay Deposit
          </a>
        </div>
        
        <p>This quote is valid for 7 days. A 50% deposit is required to begin work.</p>
        
        <p>Questions? Just reply to this email or call us.</p>
        
        <p>Best regards,<br>
        The CoreSentia Team</p>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          CoreSentia | info@coresentia.com | coresentia.com<br>
          <em>"Stop talking about AI. Start closing with it."</em>
        </p>
      </div>
    `;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'CoreSentia <info@coresentia.com>',
      to: [email],
      subject: `Your CoreSentia Quote #${quoteNumber}`,
      html: emailHtml,
      attachments: [
        {
          filename: `CoreSentia-Quote-${quoteNumber}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    if (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the whole request if email fails
    }

    // Update lead status
    await supabase
      .from('leads')
      .update({ 
        status: 'quoted',
        last_action_at: new Date().toISOString()
      })
      .eq('id', leadId);

    return NextResponse.json({
      success: true,
      quoteNumber,
      quoteId: quote.id,
      message: 'Quote generated and sent successfully'
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
