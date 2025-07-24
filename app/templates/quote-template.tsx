// app/templates/quote-template.ts

interface QuoteTemplateProps {
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  companyName: string;
  clientABN?: string;
  email: string;
  phone: string;
  packageType: 'Essentials' | 'Custom';
  description: string;
  amount: number;
  subtotal: number;
  gst: number;
  total: number;
  timeline: number;
  monthlyHosting: number;
  selfHostedPrice?: number;
}

export function generateQuoteHTML(props: QuoteTemplateProps): string {
  const {
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
  } = props;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoreSentia Quote</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Open Sans', sans-serif;
            background-color: #FFFFFF;
            color: #000000;
            line-height: 1.6;
            padding: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #FFFFFF;
        }
        
        .header {
            background: #000000;
            padding: 40px;
            text-align: center;
            border-bottom: 2px solid #62D4F9;
        }
        
        .logo {
            width: 150px;
            height: 50px;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .logo span {
            color: #62D4F9;
            font-size: 36px;
            font-weight: 500;
        }
        
        h1, h2, h3, h4 {
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.15em;
            font-weight: 400;
        }
        
        h1 {
            font-size: 32px;
            margin-bottom: 10px;
            color: #FFFFFF;
        }
        
        .quote-number {
            font-size: 18px;
            color: #FFFFFF;
            opacity: 0.8;
        }
        
        .content {
            padding: 40px;
            background: #FFFFFF;
        }
        
        .quote-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 1px solid #E0E0E0;
        }
        
        .detail-section h3 {
            color: #62D4F9;
            font-size: 18px;
            margin-bottom: 15px;
        }
        
        .detail-section p {
            margin-bottom: 8px;
            color: #000000;
        }
        
        .table-section {
            margin-bottom: 40px;
        }
        
        .table-section h2 {
            color: #62D4F9;
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background-color: #F5F5F5;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #2A50DF;
            border-bottom: 2px solid #2A50DF;
        }
        
        td {
            padding: 15px;
            border-bottom: 1px solid #E0E0E0;
            color: #000000;
        }
        
        .text-right {
            text-align: right;
        }
        
        .total-section {
            margin-top: 30px;
            padding: 20px;
            background-color: #F5F5F5;
            border-radius: 8px;
            text-align: right;
        }
        
        .total-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        
        .total-label {
            margin-right: 40px;
            color: #666666;
        }
        
        .total-amount {
            min-width: 120px;
            text-align: right;
            color: #000000;
        }
        
        .grand-total {
            font-size: 24px;
            color: #2A50DF;
            font-weight: 600;
            padding-top: 10px;
            border-top: 2px solid #2A50DF;
        }
        
        .terms-section {
            margin-top: 40px;
            padding: 30px;
            background-color: #F5F5F5;
            border-radius: 8px;
        }
        
        .terms-section h3 {
            color: #2A50DF;
            margin-bottom: 15px;
        }
        
        .terms-section ul {
            list-style: none;
            padding-left: 0;
        }
        
        .terms-section li {
            margin-bottom: 10px;
            padding-left: 25px;
            position: relative;
            color: #000000;
        }
        
        .terms-section li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #62D4F9;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #E0E0E0;
            text-align: center;
            color: #666666;
        }
        
        .footer p {
            margin-bottom: 5px;
        }
        
        .tagline {
            color: #2A50DF;
            font-style: italic;
            margin-top: 15px;
        }
        
        .validity-notice {
            background-color: #E3F2FD;
            border-left: 4px solid #2A50DF;
            padding: 20px;
            margin: 30px 0;
            color: #000000;
        }
        
        .hosting-option {
            background-color: #F5F5F5;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 1px solid #E0E0E0;
            color: #000000;
        }
        
        a {
            color: #2A50DF;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        @media print {
            body {
                padding: 0;
            }
            .container {
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <span>CoreSentia</span>
            </div>
            <h1>Quote</h1>
            <p class="quote-number">#${quoteNumber}</p>
        </div>
        
        <div class="content">
            <div class="quote-details">
                <div class="detail-section">
                    <h3>Quote For</h3>
                    <p><strong>${clientName}</strong></p>
                    <p>${companyName}</p>
                    ${clientABN ? `<p>ABN: ${clientABN}</p>` : ''}
                    <p>${email}</p>
                    <p>${phone}</p>
                </div>
                <div class="detail-section">
                    <h3>Quote Details</h3>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Valid Until:</strong> ${validUntil}</p>
                    <p><strong>ABN:</strong> 69 267 271 132</p>
                </div>
            </div>
            
            <div class="table-section">
                <h2>Services</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="text-right">Amount (AUD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Lead-to-Deal System - ${packageType}</strong><br />
                                <span style="color: #666666; font-size: 14px;">
                                    ${description}
                                </span>
                            </td>
                            <td class="text-right">$${amount.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="hosting-option">
                    <strong>Monthly Hosting (Required):</strong>
                    <p style="margin-top: 10px;">• Managed Hosting: $${monthlyHosting}/month</p>
                    ${packageType === 'Custom' && selfHostedPrice ? `<p>• Self-Managed: $${selfHostedPrice.toLocaleString()} one-time</p>` : ''}
                    <p style="margin-top: 10px; font-size: 14px; color: #666666;">
                        <em>Note: Hosting selection and payment required at final invoice. Service will not commence without hosting arrangement.</em>
                    </p>
                </div>
            </div>
            
            <div class="total-section">
                <div class="total-row">
                    <span class="total-label">Subtotal:</span>
                    <span class="total-amount">$${subtotal.toLocaleString()}</span>
                </div>
                <div class="total-row">
                    <span class="total-label">GST (10%):</span>
                    <span class="total-amount">$${gst.toLocaleString()}</span>
                </div>
                <div class="total-row grand-total">
                    <span class="total-label">Total:</span>
                    <span class="total-amount">$${total.toLocaleString()} AUD</span>
                </div>
            </div>
            
            <div class="validity-notice">
                <strong>Quote Validity:</strong> This quote is valid for 7 days from the date of issue. 
                Prices are subject to change after this period.
            </div>
            
            <div class="terms-section">
                <h3>Payment Terms</h3>
                <ul>
                    <li>50% deposit required to commence work (non-refundable)</li>
                    <li>50% balance due upon delivery, before go-live</li>
                    <li>First month's hosting due with final payment</li>
                    <li>Delivery timeline: ${timeline} business days from deposit</li>
                </ul>
                
                <h3 style="margin-top: 25px;">Next Steps</h3>
                <ul>
                    <li>Accept this quote via the email link or contact us</li>
                    <li>We'll send a deposit invoice for 50%</li>
                    <li>Upon payment, we'll begin building your system</li>
                    <li>You'll receive updates throughout the process</li>
                </ul>
                
                <p style="margin-top: 25px; font-size: 14px;">
                    By accepting this quote, you agree to our Terms & Conditions: <br />
                    <a href="https://www.coresentia.com/termsandconditions">www.coresentia.com/termsandconditions</a>
                </p>
            </div>
            
            <div class="footer">
                <p><strong>CoreSentia</strong></p>
                <p>info@coresentia.com | coresentia.com</p>
                <p class="tagline">"Stop talking about AI. Start closing with it."</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}
