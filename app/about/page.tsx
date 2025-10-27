import Link from 'next/link'
import { ArrowLeft, Target, Users, Zap, Shield } from 'lucide-react'
import Header from '../components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              About CoreSentia
            </h1>
            <p className="text-xl md:text-2xl font-light">
              We help Australian service businesses never miss a lead again
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <Target className="w-12 h-12 text-brand-orange flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-brand-navy mb-4 font-montserrat">Our Mission</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Every day, hardworking tradies, salon owners, and mobile service providers lose jobs because they can't answer their phone while working. By the time they respond at night, the lead has already booked someone else.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  CoreSentia solves this with AI-powered SMS and web chat that responds instantly, qualifies leads, and books appointments automatically — so you can focus on your work while we handle the front gate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 font-montserrat text-center">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <Zap className="w-10 h-10 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold text-brand-navy mb-3">AI-Powered Lead Capture</h3>
                <p className="text-text-secondary">
                  We build intelligent SMS and web chat systems that respond to inquiries 24/7, qualify leads with natural conversation, and book appointments into your calendar automatically.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <Shield className="w-10 h-10 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold text-brand-navy mb-3">"Front Gate" Positioning</h3>
                <p className="text-text-secondary">
                  We don't replace your entire workflow. We're the front gate — capturing leads and getting them into your pipeline. Once booked, you take over and manage the job your way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <Users className="w-12 h-12 text-brand-orange flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-brand-navy mb-4 font-montserrat">Built in Brisbane, for Australia</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  CoreSentia was founded by a team who understands the challenges of running a local service business in Australia. We've seen firsthand how tradies and service providers lose work because they're too busy working to respond to leads quickly.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  We built CoreSentia to be simple, affordable, and effective. No complicated CRM systems. No expensive enterprise software. Just a smart AI receptionist that captures leads while you're on the tools.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  We're Brisbane-based, Australian-owned, and focused on helping local businesses thrive in a competitive market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 font-montserrat text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
                <p className="text-white/80">
                  No jargon, no complexity. We build tools that work straight out of the box.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Affordability</h3>
                <p className="text-white/80">
                  Enterprise AI shouldn't cost enterprise prices. We keep it accessible for small businesses.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Results</h3>
                <p className="text-white/80">
                  We measure success by leads captured and jobs booked, not features built.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy mb-8 font-montserrat text-center">Why Choose CoreSentia?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">Fast Setup</h3>
                  <p className="text-text-secondary">
                    2-3 days for SMS, 5-7 days for website package. No months-long implementation projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">No Lock-In Contracts</h3>
                  <p className="text-text-secondary">
                    Month-to-month billing. We keep you because it works, not because you're trapped.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">Local Support</h3>
                  <p className="text-text-secondary">
                    Brisbane-based team that understands Australian businesses and works in your timezone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">Proven Technology</h3>
                  <p className="text-text-secondary">
                    Built on Claude AI (Anthropic) — the same technology powering Fortune 500 companies, customized for local businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-navy mb-6 font-montserrat">
              Ready to Never Miss a Lead Again?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Let's get you set up with your AI receptionist
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat/homepage-visitor"
                className="btn-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Get Started →
              </Link>
              <Link
                href="/#packages"
                className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Legal Info */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto text-center text-sm text-text-secondary">
            <p>CoreSentia</p>
            <p>ABN: 69 267 271 132</p>
            <p className="mt-2">Brisbane, Queensland, Australia</p>
            <p className="mt-2">
              <Link href="mailto:info@coresentia.com" className="text-brand-orange hover:underline">
                info@coresentia.com
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
