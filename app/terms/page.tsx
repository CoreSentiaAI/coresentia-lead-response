import Link from 'next/link'
import Header from '../components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-brand-navy text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              Terms of Service
            </h1>
            <p className="text-lg text-white/80">
              Last Updated: October 27, 2025
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-base text-text-secondary mb-0">
                <strong>CoreSentia</strong><br />
                ABN: 69 267 271 132<br />
                Brisbane, Queensland, Australia<br />
                Email: <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">info@coresentia.com</Link>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary mb-6">
              By accessing or using CoreSentia's services (the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. Description of Services</h2>
            <p className="text-text-secondary mb-4">
              CoreSentia provides AI-powered receptionist services, including:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>SMS and web chat response systems</li>
              <li>Lead qualification and capture</li>
              <li>Appointment booking functionality</li>
              <li>Customer management dashboards</li>
              <li>Website creation (Professional Package only)</li>
            </ul>
            <p className="text-text-secondary mb-6">
              CoreSentia acts as a "front gate" lead capture system. We do not provide quotes, payment processing, or full business management systems unless explicitly agreed in writing.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. Service Packages and Pricing</h2>
            <p className="text-text-secondary mb-4">
              <strong>SMS Responder:</strong> $499 setup + $150/month (inc. GST)<br />
              <strong>Professional Package:</strong> $2,500 setup + $250/month (inc. GST)
            </p>
            <p className="text-text-secondary mb-6">
              Prices are subject to change with 30 days' notice. Current customers will be notified of any price changes before they take effect.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Setup fees are due before service commencement</li>
              <li>Monthly fees are billed in advance on the 1st of each month</li>
              <li>Payment is due within 7 days of invoice date</li>
              <li>Late payments may result in service suspension</li>
              <li>All prices include GST</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Service Term and Cancellation</h2>
            <p className="text-text-secondary mb-4">
              <strong>No Lock-In:</strong> Services are provided month-to-month with no long-term contracts.
            </p>
            <p className="text-text-secondary mb-4">
              <strong>Cancellation:</strong> Either party may cancel with 30 days' written notice. You will be charged for the remainder of your current billing period. Setup fees are non-refundable.
            </p>
            <p className="text-text-secondary mb-6">
              <strong>Service Suspension:</strong> We reserve the right to suspend services for non-payment, misuse, or violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">6. Your Responsibilities</h2>
            <p className="text-text-secondary mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Provide accurate business information during setup</li>
              <li>Respond to appointment bookings and customer inquiries in a timely manner</li>
              <li>Not use the Services for illegal, fraudulent, or harmful purposes</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">7. AI Disclaimer</h2>
            <p className="text-text-secondary mb-4">
              <strong>AI Accuracy:</strong> While our AI is highly accurate, it may occasionally make errors or provide incorrect information. CoreSentia is not responsible for:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>Missed appointments due to AI misunderstanding</li>
              <li>Incorrect information provided to customers</li>
              <li>Lost business opportunities due to AI responses</li>
            </ul>
            <p className="text-text-secondary mb-6">
              You remain responsible for all customer interactions and business decisions. The AI is a tool to assist you, not replace your judgment.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-text-secondary mb-6">
              To the maximum extent permitted by Australian law, CoreSentia's total liability for any claims arising from these Terms or use of the Services shall not exceed the total amount paid by you in the 12 months preceding the claim.
              <br /><br />
              CoreSentia is not liable for indirect, incidental, special, or consequential damages, including loss of profits, revenue, data, or business opportunities.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">9. No Guarantee of Results</h2>
            <p className="text-text-secondary mb-6">
              CoreSentia does not guarantee any specific number of leads, bookings, or revenue. Results vary based on your business, industry, marketing efforts, and other factors outside our control.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">10. Intellectual Property</h2>
            <p className="text-text-secondary mb-6">
              CoreSentia retains all intellectual property rights to the Services, software, AI systems, and related technology. You are granted a limited, non-exclusive license to use the Services for your business purposes only.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">11. Data and Privacy</h2>
            <p className="text-text-secondary mb-6">
              Your use of the Services is also governed by our <Link href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your data and your customers' data.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">12. Service Modifications</h2>
            <p className="text-text-secondary mb-6">
              CoreSentia reserves the right to modify, suspend, or discontinue any aspect of the Services at any time. We will provide reasonable notice of significant changes.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">13. Third-Party Services</h2>
            <p className="text-text-secondary mb-6">
              The Services may integrate with third-party platforms (e.g., Twilio for SMS, Anthropic for AI). We are not responsible for the availability, performance, or policies of third-party services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">14. Indemnification</h2>
            <p className="text-text-secondary mb-6">
              You agree to indemnify and hold harmless CoreSentia from any claims, damages, or expenses arising from your use of the Services, your violation of these Terms, or your violation of any third-party rights.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">15. Governing Law</h2>
            <p className="text-text-secondary mb-6">
              These Terms are governed by the laws of Queensland, Australia. Any disputes shall be resolved in the courts of Queensland.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">16. Dispute Resolution</h2>
            <p className="text-text-secondary mb-6">
              Before commencing legal proceedings, parties agree to attempt to resolve disputes through good faith negotiation. If negotiation fails, disputes may be escalated to mediation or arbitration.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">17. Severability</h2>
            <p className="text-text-secondary mb-6">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full effect.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">18. Entire Agreement</h2>
            <p className="text-text-secondary mb-6">
              These Terms, together with our Privacy Policy and any Service Agreement you sign, constitute the entire agreement between you and CoreSentia regarding the Services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">19. Changes to Terms</h2>
            <p className="text-text-secondary mb-6">
              We may update these Terms from time to time. Significant changes will be communicated via email. Continued use of the Services after changes take effect constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">20. Contact Information</h2>
            <p className="text-text-secondary mb-6">
              For questions about these Terms, contact us at:<br />
              Email: <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">info@coresentia.com</Link><br />
              ABN: 69 267 271 132
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-text-secondary">
                <strong>Acknowledgment:</strong> By using CoreSentia's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-text-secondary mb-4">
              Questions about our Terms?
            </p>
            <Link
              href="mailto:info@coresentia.com"
              className="text-brand-orange hover:underline font-semibold text-lg"
            >
              Contact Us →
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
