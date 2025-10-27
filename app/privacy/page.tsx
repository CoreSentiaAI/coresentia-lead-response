import Link from 'next/link'
import Header from '../components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80">
              Last Updated: October 27, 2025
            </p>
          </div>
        </section>

        {/* Privacy Content */}
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

            <p className="text-text-secondary mb-6">
              CoreSentia ("we," "our," or "us") is committed to protecting your privacy and the privacy of your customers. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our services.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">1.1 Information You Provide</h3>
            <p className="text-text-secondary mb-4">
              When you sign up for CoreSentia, we collect:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Business Information:</strong> Business name, ABN, contact details, services offered, pricing</li>
              <li><strong>Account Information:</strong> Name, email address, phone number, payment details</li>
              <li><strong>Setup Information:</strong> Business hours, service area, availability preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">1.2 Customer Data (Your Customers)</h3>
            <p className="text-text-secondary mb-4">
              When your customers interact with our AI services, we collect:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Contact Information:</strong> Phone numbers (SMS), names, email addresses (if provided)</li>
              <li><strong>Conversation Data:</strong> SMS messages, web chat messages, appointment details</li>
              <li><strong>Appointment Information:</strong> Booking times, service requested, notes</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">1.3 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Usage Data:</strong> Dashboard interactions, login times, feature usage</li>
              <li><strong>Technical Data:</strong> IP addresses, browser type, device information</li>
              <li><strong>Cookies:</strong> Essential cookies for authentication and session management</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-text-secondary mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Provide Services:</strong> Operate the AI chat, SMS responses, booking system, and dashboard</li>
              <li><strong>Improve Services:</strong> Analyze usage patterns, improve AI accuracy, develop new features</li>
              <li><strong>Communication:</strong> Send service updates, support messages, billing notices</li>
              <li><strong>Compliance:</strong> Meet legal obligations, prevent fraud, enforce our terms</li>
              <li><strong>Support:</strong> Respond to your questions and troubleshoot issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">3. How We Share Your Information</h2>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">3.1 Service Providers</h3>
            <p className="text-text-secondary mb-4">
              We share data with trusted third-party providers who help us deliver our services:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Twilio:</strong> SMS messaging infrastructure (USA-based, privacy compliant)</li>
              <li><strong>Anthropic:</strong> AI processing (Claude AI, privacy-focused)</li>
              <li><strong>Supabase:</strong> Secure database hosting (Australia/Singapore data centers)</li>
              <li><strong>Vercel:</strong> Web hosting and infrastructure</li>
            </ul>
            <p className="text-text-secondary mb-6">
              All service providers are contractually required to protect your data and use it only for providing services to us.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">3.2 Legal Requirements</h3>
            <p className="text-text-secondary mb-6">
              We may disclose information if required by law, court order, or government request, or to protect our rights, property, or safety.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">3.3 Business Transfers</h3>
            <p className="text-text-secondary mb-6">
              If CoreSentia is involved in a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your information is transferred and subject to a different privacy policy.
            </p>

            <h3 className="text-xl font-semibold text-brand-navy mt-6 mb-3">3.4 What We Don't Do</h3>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li>We <strong>never</strong> sell your data or your customers' data to third parties</li>
              <li>We <strong>never</strong> use your data for advertising or marketing outside of CoreSentia</li>
              <li>We <strong>never</strong> share conversation data with other CoreSentia customers</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">4. Data Security</h2>
            <p className="text-text-secondary mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Encryption:</strong> Data encrypted in transit (HTTPS/TLS) and at rest</li>
              <li><strong>Access Controls:</strong> Limited access to sensitive data, role-based permissions</li>
              <li><strong>Monitoring:</strong> Regular security audits and monitoring for suspicious activity</li>
              <li><strong>Backups:</strong> Regular encrypted backups for data recovery</li>
            </ul>
            <p className="text-text-secondary mb-6">
              While we strive to protect your data, no internet transmission or storage system is 100% secure. You use the service at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">5. Data Retention</h2>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Active Accounts:</strong> We retain data for as long as your account is active</li>
              <li><strong>Closed Accounts:</strong> Data retained for 12 months after account closure for legal and support purposes</li>
              <li><strong>Conversation Data:</strong> Retained for AI improvement unless you request deletion</li>
              <li><strong>Billing Data:</strong> Retained for 7 years as required by Australian tax law</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">6. Your Rights</h2>
            <p className="text-text-secondary mb-4">
              Under Australian Privacy Principles (APPs), you have the right to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing (may affect service availability)</li>
            </ul>
            <p className="text-text-secondary mb-6">
              To exercise these rights, contact us at <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">info@coresentia.com</Link>. We will respond within 30 days.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">7. Customer Data (Your Customers' Rights)</h2>
            <p className="text-text-secondary mb-6">
              You are the data controller for your customers' information. We process this data on your behalf. Your customers can exercise their privacy rights by contacting you directly. You are responsible for responding to their requests and ensuring compliance with privacy laws.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">8. Cookies and Tracking</h2>
            <p className="text-text-secondary mb-4">
              We use cookies for:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Authentication, session management (required)</li>
              <li><strong>Analytics Cookies:</strong> Understanding how you use our services (optional)</li>
            </ul>
            <p className="text-text-secondary mb-6">
              You can control cookies through your browser settings. Disabling essential cookies may affect service functionality.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">9. Third-Party Links</h2>
            <p className="text-text-secondary mb-6">
              Our services may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies before providing any information.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">10. Children's Privacy</h2>
            <p className="text-text-secondary mb-6">
              CoreSentia is not intended for individuals under 18. We do not knowingly collect data from children. If you believe we have collected data from a child, contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">11. International Data Transfers</h2>
            <p className="text-text-secondary mb-6">
              Some of our service providers (Twilio, Anthropic) are based outside Australia. Data transferred to these providers is protected by contractual safeguards and compliance with international data protection standards (GDPR-equivalent).
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">12. Changes to This Policy</h2>
            <p className="text-text-secondary mb-6">
              We may update this Privacy Policy from time to time. Significant changes will be communicated via email. Continued use of our services after changes take effect constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">13. Complaints</h2>
            <p className="text-text-secondary mb-6">
              If you have concerns about how we handle your data, please contact us first at <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">info@coresentia.com</Link>. If you are not satisfied with our response, you can lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" className="text-brand-orange hover:underline" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
            </p>

            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">14. Contact Us</h2>
            <p className="text-text-secondary mb-6">
              For questions or concerns about this Privacy Policy, contact us at:<br />
              <strong>Email:</strong> <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">info@coresentia.com</Link><br />
              <strong>ABN:</strong> 69 267 271 132<br />
              <strong>Location:</strong> Brisbane, Queensland, Australia
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-text-secondary">
                <strong>Summary:</strong> We collect data to provide our services, protect it with strong security, never sell it, and give you control over your information. Your trust is important to us.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-text-secondary mb-4">
              Questions about our Privacy Policy?
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
