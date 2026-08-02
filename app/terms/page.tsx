import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 font-display">
              Terms of Service
            </h1>
            <p className="text-lg text-ink-3">
              Last Updated: July 30, 2026
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 p-6 bg-surface-card rounded border border-line-soft">
              <p className="text-base text-ink-2 mb-0">
                <strong className="text-ink-1">CoreSentia</strong><br />
                ABN: 69 267 271 132<br />
                Brisbane, Queensland, Australia<br />
                Email: <Link href="mailto:info@coresentia.com" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com</Link>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-ink-2 mb-6">
              By engaging CoreSentia&apos;s services (the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). Individual projects are governed by a written scope or service agreement; where that agreement and these Terms conflict, the written agreement prevails.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">2. Description of Services</h2>
            <p className="text-ink-2 mb-4">
              CoreSentia provides custom software development and automation services, including:
            </p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li>Business process mapping and workflow automation</li>
              <li>Systems integration between business platforms (CRM, accounting, inventory, communications)</li>
              <li>Custom internal platforms, dashboards, and operational tools</li>
              <li>AI-native software, including conversational AI systems</li>
              <li>Web application and website development</li>
              <li>Hosting, maintenance, and support of systems we build</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">3. Quotes, Scope, and Pricing</h2>
            <p className="text-ink-2 mb-4">
              Projects are quoted per-project with defined deliverables, agreed in writing before work begins. Changes to scope are quoted and agreed before being built. Ongoing services (hosting, support, retainers) are billed monthly as agreed in the relevant service agreement.
            </p>
            <p className="text-ink-2 mb-6">
              Unless otherwise stated, prices are in Australian dollars and include GST.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li>Project payments follow the milestones set out in the project agreement</li>
              <li>Monthly fees for ongoing services are billed in advance</li>
              <li>Payment is due within 7 days of invoice date unless otherwise agreed</li>
              <li>Late payments may result in suspension of ongoing services</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">5. Term and Cancellation</h2>
            <p className="text-ink-2 mb-4">
              <strong className="text-ink-1">Ongoing services:</strong> Hosting, support, and retainer arrangements are month-to-month with no lock-in. Either party may cancel with 30 days&apos; written notice.
            </p>
            <p className="text-ink-2 mb-6">
              <strong className="text-ink-1">Projects:</strong> Either party may terminate a project engagement with written notice. You are invoiced for work completed to the date of termination, and all completed work is handed over on payment.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">6. Your Responsibilities</h2>
            <p className="text-ink-2 mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li>Provide accurate information about your business and systems during scoping</li>
              <li>Provide timely access to the systems, accounts, and people needed to deliver the project</li>
              <li>Review and provide feedback on deliverables within reasonable timeframes</li>
              <li>Not use the Services for illegal, fraudulent, or harmful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-ink-2 mb-4">
              <strong className="text-ink-1">You own your system.</strong> On full payment, intellectual property in the custom software we build for you is assigned to you - source code, infrastructure configuration, and documentation.
            </p>
            <p className="text-ink-2 mb-6">
              CoreSentia retains ownership of pre-existing tools, libraries, and generic components we bring to a project, which are licensed to you for use within your system. Third-party and open-source components remain subject to their own licences.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">8. AI Disclaimer</h2>
            <p className="text-ink-2 mb-4">
              Where deliverables include AI-powered features, you acknowledge that AI systems are probabilistic and may occasionally produce errors or incorrect output. CoreSentia designs safeguards appropriate to each use case, but is not responsible for:
            </p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li>Business decisions made in reliance on AI-generated output</li>
              <li>Incorrect information produced by AI features to you or your customers</li>
              <li>Lost opportunities arising from AI responses</li>
            </ul>
            <p className="text-ink-2 mb-6">
              You remain responsible for your customer interactions and business decisions. AI features are tools to assist your team, not replace its judgment.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-ink-2 mb-6">
              To the maximum extent permitted by Australian law, CoreSentia&apos;s total liability for any claims arising from these Terms or use of the Services shall not exceed the total amount paid by you in the 12 months preceding the claim.
              <br /><br />
              CoreSentia is not liable for indirect, incidental, special, or consequential damages, including loss of profits, revenue, data, or business opportunities.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">10. No Guarantee of Results</h2>
            <p className="text-ink-2 mb-6">
              CoreSentia does not guarantee specific business outcomes such as revenue, cost savings, or lead volumes. Results vary based on your business, industry, and factors outside our control. We do guarantee that delivered software will materially conform to the agreed scope.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">11. Data and Privacy</h2>
            <p className="text-ink-2 mb-6">
              Your use of the Services is also governed by our <Link href="/privacy" className="text-accent-ink hover:text-ink-1 transition-colors">Privacy Policy</Link>, which explains how we collect, use, and protect your data and your customers&apos; data.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">12. Third-Party Services</h2>
            <p className="text-ink-2 mb-6">
              Systems we build typically integrate with, and run on, third-party platforms (e.g., Vercel, Supabase, Anthropic, Twilio, Google). We are not responsible for the availability, performance, or policies of third-party services, and their fees are your responsibility unless otherwise agreed.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">13. Indemnification</h2>
            <p className="text-ink-2 mb-6">
              You agree to indemnify and hold harmless CoreSentia from any claims, damages, or expenses arising from your use of the Services, your violation of these Terms, or your violation of any third-party rights.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">14. Governing Law</h2>
            <p className="text-ink-2 mb-6">
              These Terms are governed by the laws of Queensland, Australia. Any disputes shall be resolved in the courts of Queensland.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">15. Dispute Resolution</h2>
            <p className="text-ink-2 mb-6">
              Before commencing legal proceedings, parties agree to attempt to resolve disputes through good faith negotiation. If negotiation fails, disputes may be escalated to mediation or arbitration.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">16. Severability</h2>
            <p className="text-ink-2 mb-6">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full effect.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">17. Entire Agreement</h2>
            <p className="text-ink-2 mb-6">
              These Terms, together with our Privacy Policy and any project or service agreement you sign, constitute the entire agreement between you and CoreSentia regarding the Services.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">18. Changes to Terms</h2>
            <p className="text-ink-2 mb-6">
              We may update these Terms from time to time. Significant changes will be communicated via email. Continued use of the Services after changes take effect constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">19. Contact Information</h2>
            <p className="text-ink-2 mb-6">
              For questions about these Terms, contact us at:<br />
              Email: <Link href="mailto:info@coresentia.com" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com</Link><br />
              ABN: 69 267 271 132
            </p>

            <div className="mt-12 pt-8 border-t border-line-soft">
              <p className="text-sm text-ink-3">
                <strong className="text-ink-2">Acknowledgment:</strong> By engaging CoreSentia&apos;s services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-ink-2 mb-4">
              Questions about our Terms?
            </p>
            <Link
              href="mailto:info@coresentia.com"
              className="text-accent-ink hover:text-ink-1 font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
