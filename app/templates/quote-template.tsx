<!DOCTYPE html>
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
            background-color: #000000;
            color: #FFFFFF;
            line-height: 1.6;
            padding: 40px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #000000;
            border: 1px solid #2A50DF;
            border-radius: 8px;
            overflow: hidden;
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
        
        .logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
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
        }
        
        .quote-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 1px solid #2A50DF33;
        }
        
        .detail-section h3 {
            color: #62D4F9;
            font-size: 18px;
            margin-bottom: 15px;
        }
        
        .detail-section p {
            margin-bottom: 8px;
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
            background-color: #2A50DF22;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #62D4F9;
            border-bottom: 2px solid #2A50DF;
        }
        
        td {
            padding: 15px;
            border-bottom: 1px solid #2A50DF33;
        }
        
        .text-right {
            text-align: right;
        }
        
        .total-section {
            margin-top: 30px;
            padding: 20px;
            background-color: #2A50DF11;
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
            color: #FFFFFF99;
        }
        
        .total-amount {
            min-width: 120px;
            text-align: right;
        }
        
        .grand-total {
            font-size: 24px;
            color: #62D4F9;
            font-weight: 600;
            padding-top: 10px;
            border-top: 2px solid #2A50DF;
        }
        
        .terms-section {
            margin-top: 40px;
            padding: 30px;
            background-color: #2A50DF11;
            border-radius: 8px;
        }
        
        .terms-section h3 {
            color: #62D4F9;
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
            border-top: 1px solid #2A50DF33;
            text-align: center;
            color: #FFFFFF66;
        }
        
        .footer p {
            margin-bottom: 5px;
        }
        
        .tagline {
            color: #62D4F9;
            font-style: italic;
            margin-top: 15px;
        }
        
        a {
            color: #62D4F9;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        .validity-notice {
            background-color: #62D4F911;
            border-left: 4px solid #62D4F9;
            padding: 20px;
            margin: 30px 0;
        }
        
        .hosting-option {
            background-color: #2A50DF11;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 1px solid #2A50DF33;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <!-- Replace with: <img src="logo.png" alt="CoreSentia"> -->
                <span style="color: #62D4F9; font-size: 36px; font-weight: 500;">CoreSentia</span>
            </div>
            <h1>Quote</h1>
            <p class="quote-number">#Q-2025-001</p>
        </div>
        
        <div class="content">
            <div class="quote-details">
                <div class="detail-section">
                    <h3>Quote For</h3>
                    <p><strong>[Client Name]</strong></p>
                    <p>[Company Name]</p>
                    <p>ABN: [Client ABN]</p>
                    <p>[Email]</p>
                    <p>[Phone]</p>
                </div>
                <div class="detail-section">
                    <h3>Quote Details</h3>
                    <p><strong>Date:</strong> [Date]</p>
                    <p><strong>Valid Until:</strong> [Valid Until]</p>
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
                                <strong>Lead-to-Deal System - [Package Type]</strong><br>
                                <span style="color: #FFFFFF99; font-size: 14px;">
                                [Description of what's included]
                                </span>
                            </td>
                            <td class="text-right">$[Amount]</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="hosting-option">
                    <strong>Monthly Hosting (Required):</strong>
                    <p style="margin-top: 10px;">• Managed Hosting: $[Amount]/month</p>
                    <p>• Self-Managed: $[Amount] one-time (Custom package only)</p>
                    <p style="margin-top: 10px; font-size: 14px; color: #FFFFFF99;">
                        <em>Note: Hosting selection and payment required at final invoice. Service will not commence without hosting arrangement.</em>
                    </p>
                </div>
            </div>
            
            <div class="total-section">
                <div class="total-row">
                    <span class="total-label">Subtotal:</span>
                    <span class="total-amount">$[Subtotal]</span>
                </div>
                <div class="total-row">
                    <span class="total-label">GST (10%):</span>
                    <span class="total-amount">$[GST]</span>
                </div>
                <div class="total-row grand-total">
                    <span class="total-label">Total:</span>
                    <span class="total-amount">$[Total] AUD</span>
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
                    <li>Delivery timeline: [Timeline] business days from deposit</li>
                </ul>
                
                <h3 style="margin-top: 25px;">Next Steps</h3>
                <ul>
                    <li>Accept this quote via the email link or contact us</li>
                    <li>We'll send a deposit invoice for 50%</li>
                    <li>Upon payment, we'll begin building your system</li>
                    <li>You'll receive updates throughout the process</li>
                </ul>
                
                <p style="margin-top: 25px; font-size: 14px;">
                    By accepting this quote, you agree to our Terms & Conditions: 
                    <a href="https://www.coresentia.com/termsandconditions" style="color: #62D4F9;">www.coresentia.com/termsandconditions</a>
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
</html>
