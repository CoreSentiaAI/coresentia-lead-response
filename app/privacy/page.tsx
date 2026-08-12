import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 font-display">
              Privacy Policy
            </h1>
            <p className="text-lg text-ink-3">
              Last Updated: July 30, 2026
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 p-6 bg-surface-card rounded border border-line-soft">
              <p className="text-base text-ink-2 mb-0">
                <strong className="text-ink-1">CoreSentia</strong><br />
                ABN: 69 267 271 132<br />
                Brisbane, Queensland, Australia<br />
                Email: <Link href="mailto:info@coresentia.com.au" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com.au</Link>
              </p>
            </div>

            <p className="text-ink-2 mb-6">
              CoreSentia (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy and the privacy of your customers. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, engage us for a project, or use systems we build and host.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">1.1 Website Enquiries</h3>
            <p className="text-ink-2 mb-4">When you contact us through this website, we collect:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Contact Information:</strong> Name, email address, phone number</li>
              <li><strong className="text-ink-1">Enquiry Details:</strong> Project type and the information you include in your message</li>
            </ul>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">1.2 Client Engagements</h3>
            <p className="text-ink-2 mb-4">When you engage us for a project, we collect:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Business Information:</strong> Business name, ABN, contact details, and details of the processes and systems in scope</li>
              <li><strong className="text-ink-1">Account and Billing Information:</strong> Names, email addresses, payment details</li>
              <li><strong className="text-ink-1">System Access:</strong> Credentials and API access you provide so we can build and integrate your systems - handled under least-privilege access and removed at handover unless we host the system for you</li>
            </ul>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">1.3 Systems We Build and Host</h3>
            <p className="text-ink-2 mb-4">Where we host and operate a system on your behalf (including conversational AI systems), that system may process:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Your Customers&apos; Contact Information:</strong> Names, phone numbers, email addresses</li>
              <li><strong className="text-ink-1">Conversation Data:</strong> SMS, chat, or call interactions handled by the system</li>
              <li><strong className="text-ink-1">Operational Data:</strong> Bookings, jobs, quotes, and related business records</li>
            </ul>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">1.4 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Usage Data:</strong> Page and dashboard interactions, login times, feature usage</li>
              <li><strong className="text-ink-1">Technical Data:</strong> IP addresses, browser type, device information</li>
              <li><strong className="text-ink-1">Cookies:</strong> Essential cookies for authentication and session management</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-ink-2 mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Respond to Enquiries:</strong> Reply to your messages and scope potential projects</li>
              <li><strong className="text-ink-1">Deliver Services:</strong> Design, build, integrate, host, and support the systems you engage us for</li>
              <li><strong className="text-ink-1">Improve Services:</strong> Diagnose issues and improve the reliability of systems we operate</li>
              <li><strong className="text-ink-1">Communication:</strong> Send project updates, support messages, and billing notices</li>
              <li><strong className="text-ink-1">Compliance:</strong> Meet legal obligations, prevent fraud, enforce our terms</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">3. How We Share Your Information</h2>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">3.1 Service Providers</h3>
            <p className="text-ink-2 mb-4">We share data with trusted third-party providers who supply the infrastructure our systems run on. Depending on the project, these typically include:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Vercel:</strong> Web hosting and infrastructure</li>
              <li><strong className="text-ink-1">Supabase:</strong> Secure database hosting</li>
              <li><strong className="text-ink-1">Anthropic:</strong> AI processing (Claude)</li>
              <li><strong className="text-ink-1">Twilio:</strong> SMS and voice infrastructure, where a system includes telephony</li>
              <li><strong className="text-ink-1">Google:</strong> Workspace, Maps, and related APIs, where a system integrates with them</li>
            </ul>
            <p className="text-ink-2 mb-6">
              All service providers are contractually required to protect your data and use it only for providing services to us.
            </p>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">3.2 Legal Requirements</h3>
            <p className="text-ink-2 mb-6">
              We may disclose information if required by law, court order, or government request, or to protect our rights, property, or safety.
            </p>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">3.3 Business Transfers</h3>
            <p className="text-ink-2 mb-6">
              If CoreSentia is involved in a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your information is transferred and subject to a different privacy policy.
            </p>

            <h3 className="text-xl font-semibold text-ink-1 mt-6 mb-3">3.4 What We Don&apos;t Do</h3>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li>We <strong className="text-ink-1">never</strong> sell your data or your customers&apos; data to third parties</li>
              <li>We <strong className="text-ink-1">never</strong> use your data for advertising or marketing outside of CoreSentia</li>
              <li>We <strong className="text-ink-1">never</strong> share one client&apos;s data with another client</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">4. Data Security</h2>
            <p className="text-ink-2 mb-4">We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Encryption:</strong> Data encrypted in transit (HTTPS/TLS) and at rest</li>
              <li><strong className="text-ink-1">Access Controls:</strong> Limited access to sensitive data, role-based permissions</li>
              <li><strong className="text-ink-1">Monitoring:</strong> Audit logging and monitoring for suspicious activity</li>
              <li><strong className="text-ink-1">Backups:</strong> Regular encrypted backups for data recovery</li>
            </ul>
            <p className="text-ink-2 mb-6">
              While we strive to protect your data, no internet transmission or storage system is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">5. Data Retention</h2>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Enquiries:</strong> Retained while we correspond with you and for a reasonable period afterwards</li>
              <li><strong className="text-ink-1">Active Engagements:</strong> Data retained for the duration of the engagement and any ongoing hosting arrangement</li>
              <li><strong className="text-ink-1">Ended Engagements:</strong> Data retained for 12 months after an engagement ends for legal and support purposes, then deleted on request or in the ordinary course</li>
              <li><strong className="text-ink-1">Billing Data:</strong> Retained for 7 years as required by Australian tax law</li>
            </ul>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-ink-2 mb-4">Under the Australian Privacy Principles (APPs), you have the right to:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Access:</strong> Request a copy of your data</li>
              <li><strong className="text-ink-1">Correction:</strong> Request correction of inaccurate data</li>
              <li><strong className="text-ink-1">Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong className="text-ink-1">Portability:</strong> Request your data in a portable format</li>
              <li><strong className="text-ink-1">Objection:</strong> Object to processing of your data for certain purposes</li>
              <li><strong className="text-ink-1">Withdraw Consent:</strong> Withdraw consent for data processing (may affect service availability)</li>
            </ul>
            <p className="text-ink-2 mb-6">
              To exercise these rights, contact us at <Link href="mailto:info@coresentia.com.au" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com.au</Link>. We will respond within 30 days.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">7. Your Customers&apos; Data</h2>
            <p className="text-ink-2 mb-6">
              Where we host a system that processes your customers&apos; information, you are the data controller and we process that data on your behalf. Your customers can exercise their privacy rights by contacting you directly. You are responsible for responding to their requests and ensuring your use of the system complies with privacy laws.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">8. Cookies and Tracking</h2>
            <p className="text-ink-2 mb-4">We use cookies for:</p>
            <ul className="list-disc list-inside text-ink-2 mb-6 space-y-2">
              <li><strong className="text-ink-1">Essential Cookies:</strong> Authentication, session management (required)</li>
              <li><strong className="text-ink-1">Analytics Cookies:</strong> Understanding how you use our services (optional)</li>
            </ul>
            <p className="text-ink-2 mb-6">
              You can control cookies through your browser settings. Disabling essential cookies may affect service functionality.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">9. Third-Party Links</h2>
            <p className="text-ink-2 mb-6">
              Our services may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies before providing any information.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-ink-2 mb-6">
              CoreSentia is not intended for individuals under 18. We do not knowingly collect data from children. If you believe we have collected data from a child, contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">11. International Data Transfers</h2>
            <p className="text-ink-2 mb-6">
              Some of our service providers (e.g., Twilio, Anthropic) are based outside Australia. Data transferred to these providers is protected by contractual safeguards and compliance with international data protection standards.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">12. Changes to This Policy</h2>
            <p className="text-ink-2 mb-6">
              We may update this Privacy Policy from time to time. Significant changes will be communicated via email. Continued use of our services after changes take effect constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">13. Complaints</h2>
            <p className="text-ink-2 mb-6">
              If you have concerns about how we handle your data, please contact us first at <Link href="mailto:info@coresentia.com.au" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com.au</Link>. If you are not satisfied with our response, you can lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" className="text-accent-ink hover:text-ink-1 transition-colors" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
            </p>

            <h2 className="text-2xl font-semibold text-ink-1 mt-8 mb-4">14. Contact Us</h2>
            <p className="text-ink-2 mb-6">
              For questions or concerns about this Privacy Policy, contact us at:<br />
              <strong className="text-ink-1">Email:</strong> <Link href="mailto:info@coresentia.com.au" className="text-accent-ink hover:text-ink-1 transition-colors">info@coresentia.com.au</Link><br />
              <strong className="text-ink-1">ABN:</strong> 69 267 271 132<br />
              <strong className="text-ink-1">Location:</strong> Brisbane, Queensland, Australia
            </p>

            <div className="mt-12 pt-8 border-t border-line-soft">
              <p className="text-sm text-ink-3">
                <strong className="text-ink-2">Summary:</strong> We collect data to deliver our services, protect it with strong security, never sell it, and give you control over your information. Your trust is important to us.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-ink-2 mb-4">
              Questions about our Privacy Policy?
            </p>
            <Link
              href="mailto:info@coresentia.com.au"
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
