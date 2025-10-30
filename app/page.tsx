import Image from 'next/image'
import Link from 'next/link'
import { Zap, MessageSquare, Globe, Calendar, Check, Clock, DollarSign, Users, Phone, TrendingUp, Shield } from 'lucide-react'
import Header from './components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-text-primary relative overflow-hidden font-opensans">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 z-0"></div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center justify-center px-6 pt-28 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 font-montserrat text-brand-navy leading-tight">
              Stop talking about AI.
              <br />
              <span className="text-brand-orange">Start closing with it.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-3 font-light max-w-3xl mx-auto">
              Your AI Receptionist for Local Business
            </p>
            <p className="text-lg md:text-xl text-text-secondary mb-10 font-light max-w-2xl mx-auto">
              Never miss a lead again. Respond 24/7, book jobs automatically, grow your business while you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat/homepage-visitor"
                className="btn-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Get Started →
              </Link>
              <Link
                href="#packages"
                className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                View Packages
              </Link>
            </div>
            <p className="text-sm text-text-secondary mt-6">
              Built for trades, salons, and local service businesses across Australia
            </p>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-10 font-montserrat">
              Sound familiar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <Phone className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">Missing Calls</h3>
                <p className="text-text-secondary">
                  You're on the tools, can't answer your phone. Leads call your competitors instead.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <Clock className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">Slow Responses</h3>
                <p className="text-text-secondary">
                  By the time you text back at 8pm, they've already booked someone else.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                <Globe className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">No Web Presence</h3>
                <p className="text-text-secondary">
                  Facebook posts and DMs don't cut it. You need something more professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-montserrat">
              Meet Your AI Receptionist
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
              An intelligent assistant that responds to leads via SMS and web chat 24/7, qualifies them, and books jobs into your calendar — while you focus on the work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <MessageSquare className="w-10 h-10 text-brand-orange mb-3" />
                <h3 className="font-semibold mb-2">Instant Response</h3>
                <p className="text-sm text-white/80">Replies in seconds, not hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <Calendar className="w-10 h-10 text-brand-orange mb-3" />
                <h3 className="font-semibold mb-2">Auto Booking</h3>
                <p className="text-sm text-white/80">Jobs booked automatically</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <Shield className="w-10 h-10 text-brand-orange mb-3" />
                <h3 className="font-semibold mb-2">Lead Qualification</h3>
                <p className="text-sm text-white/80">Filters serious inquiries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <Zap className="w-10 h-10 text-brand-orange mb-3" />
                <h3 className="font-semibold mb-2">24/7 Available</h3>
                <p className="text-sm text-white/80">Never miss a weekend lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Simple Workflow */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-3 font-montserrat">
              Simple. Automatic. Effective.
            </h2>
            <p className="text-xl text-text-secondary text-center mb-12 max-w-2xl mx-auto">
              Here's how it works in the real world
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-8 md:p-12 mb-12">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-brand-navy mb-2">Lead texts your business number</h3>
                    <p className="text-text-secondary mb-3">
                      It's 8pm. You're watching the footy. Someone texts: <span className="italic">"Can you mow my lawn this week?"</span>
                    </p>
                    <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm">
                      <p className="text-gray-600 mb-1">📱 <strong>To:</strong> Your business (0412 XXX XXX)</p>
                      <p className="text-text-primary">"Hi, can you mow my lawn this week?"</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-brand-navy mb-2">AI responds instantly & books them in</h3>
                    <p className="text-text-secondary mb-3">
                      Your AI assistant handles the conversation, checks your availability, and locks in the booking.
                    </p>
                    <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm space-y-3">
                      <p className="text-text-primary"><strong>AI:</strong> "I'd be happy to help! We have Thursday at 10am or Friday at 2pm. Which works for you?"</p>
                      <p className="text-gray-600"><strong>Lead:</strong> "Thursday 10am"</p>
                      <p className="text-text-primary"><strong>AI:</strong> "Perfect! You're booked for Thursday 10am. I've sent a confirmation."</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-brand-navy mb-2">You confirm with one tap</h3>
                    <p className="text-text-secondary mb-3">
                      Next morning, you open your dashboard on your phone. See the booking. Tap "Confirm". Done in 2 seconds.
                    </p>
                    <div className="bg-white border border-brand-navy rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">● Pending</span>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                      <p className="font-semibold text-brand-navy mb-2">Thursday, 10:00 AM - Lawn Mowing</p>
                      <p className="text-sm text-text-secondary mb-4">John Smith • 0412 XXX XXX</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium text-sm">
                          ✓ Confirm
                        </button>
                        <button className="flex-1 bg-white border-2 border-gray-300 text-text-primary py-2 px-4 rounded-lg font-medium text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-300 text-center">
                <p className="text-brand-navy font-semibold text-lg">
                  That's it. You just booked a job without lifting a finger.
                </p>
                <p className="text-text-secondary mt-2">
                  No phone tag. No missed calls. No back-and-forth. Just bookings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">24/7</div>
                <p className="text-text-secondary">Never miss a lead, even at midnight</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">&lt;10s</div>
                <p className="text-text-secondary">Average response time</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">2 sec</div>
                <p className="text-text-secondary">To confirm a booking</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-5 font-montserrat">
                Choose Your Package
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Simple pricing. Fast delivery. Start capturing leads you're currently missing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto lg:items-stretch">
              {/* Tier 1: SMS Responder */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 hover:border-brand-orange transition-all shadow-lg flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-10 h-10 text-brand-orange" />
                  <h3 className="text-2xl font-bold text-brand-navy font-montserrat">SMS Responder</h3>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-brand-navy">$999</p>
                  <p className="text-lg text-text-secondary">+ $150/month</p>
                  <p className="text-xs text-text-secondary mt-1">(inc. GST)</p>
                  <p className="text-sm text-brand-orange font-semibold mt-2">⚡ 2-3 day delivery</p>
                </div>

                <p className="text-text-secondary mb-6">
                  Perfect for tradies and mobile services who need to respond fast but don't have a website.
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Dedicated business SMS number</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">AI responds 24/7 to text inquiries</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Qualifies leads and books appointments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Simple mobile dashboard</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Built-in booking calendar</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">SMS confirmations to you and customer</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="btn-primary w-full py-3 rounded-full font-semibold text-center block"
                  >
                    Get Started
                  </Link>

                  <p className="text-sm text-text-secondary mt-4 italic">
                    Best for: Landscapers, cleaners, mobile mechanics, handymen
                  </p>
                </div>
              </div>

              {/* Tier 2: Professional Package */}
              <div className="bg-gradient-to-br from-brand-navy to-blue-900 border-2 border-brand-orange rounded-2xl p-10 text-white relative shadow-2xl transform lg:scale-105 flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-10 h-10 text-brand-orange" />
                  <h3 className="text-2xl font-bold font-montserrat">Professional Package</h3>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-bold">$2,500</p>
                  <p className="text-lg text-white/80">+ $250/month</p>
                  <p className="text-xs text-white/70 mt-1">(inc. GST)</p>
                  <p className="text-sm text-brand-orange font-semibold mt-2">🚀 5-7 day delivery</p>
                </div>

                <p className="text-white/90 mb-6">
                  For service businesses ready to look professional with a complete web presence.
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span className="font-semibold">Everything in SMS Responder, PLUS:</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Professional one-page website</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Web chat widget (same AI brain)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Custom domain setup (yourname.com.au)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Your branding and colors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Embedded booking system</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                    <span>Mobile-optimized design</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="bg-brand-orange text-white hover:bg-orange-600 w-full py-3 rounded-full font-semibold text-center block transition-all"
                  >
                    Get Started
                  </Link>

                  <p className="text-sm text-white/80 mt-4 italic">
                    Best for: Hairdressers, beauty services, pet groomers, mobile businesses ready to grow
                  </p>
                </div>
              </div>
            </div>

            {/* Add-ons note */}
            <div className="mt-12 text-center">
              <p className="text-text-secondary">
                Optional add-ons: Payment processing, multiple staff calendars, SMS marketing — discuss during setup
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-3 font-montserrat">
              How It Works
            </h2>
            <p className="text-center text-lg text-text-secondary mb-12 max-w-3xl mx-auto">
              We're your "front gate" — capturing leads and booking appointments automatically. You take over from there and manage jobs your way.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Customer Texts/Chats</h3>
                <p className="text-text-secondary text-sm">
                  Your customer reaches out via SMS or website chat
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">AI Qualifies Lead</h3>
                <p className="text-text-secondary text-sm">
                  Our AI asks questions, understands needs, and checks availability
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Booking Confirmed</h3>
                <p className="text-text-secondary text-sm">
                  Appointment booked into your dashboard, SMS sent to both parties
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">You Take Over</h3>
                <p className="text-text-secondary text-sm">
                  Show up, do the work, quote, and get paid — your way
                </p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 max-w-3xl mx-auto">
              <p className="text-sm text-text-secondary text-center">
                <strong>Simple:</strong> We don't replace your workflow. We feed qualified leads into your pipeline, and you handle the rest like you always have.
              </p>
            </div>
          </div>
        </section>

        {/* Why CoreSentia Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-10 font-montserrat">
              Why CoreSentia?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <Users className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">100% Australian</h3>
                <p className="text-text-secondary">
                  Brisbane-based team. We understand local businesses and what actually works here.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <DollarSign className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">No Hidden Fees</h3>
                <p className="text-text-secondary">
                  Simple pricing. No per-conversation charges. No surprise bills. Just predictable monthly hosting.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <TrendingUp className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">Fast ROI</h3>
                <p className="text-text-secondary">
                  Most customers break even in 2-3 months. Every lead captured after that is pure profit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonials Section - Placeholder */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-10 font-montserrat">
              Built for Australian Service Businesses
            </h2>
            <p className="text-xl text-text-secondary mb-6">
              Whether you're a solo tradie or a growing salon, we help you capture every lead and book more jobs — without the overwhelm.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-brand-orange">24/7</p>
                <p className="text-text-secondary mt-2">Always Available</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">&lt;60s</p>
                <p className="text-text-secondary mt-2">Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">100%</p>
                <p className="text-text-secondary mt-2">Lead Capture Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">2-7</p>
                <p className="text-text-secondary mt-2">Days to Launch</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 font-montserrat">
              Ready to Stop Missing Leads?
            </h2>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Get your AI receptionist set up this week. Start booking more jobs while you focus on the work.
            </p>
            <Link
              href="/chat/homepage-visitor"
              className="bg-brand-orange text-white hover:bg-orange-600 px-12 py-4 rounded-full font-bold text-xl shadow-xl inline-block transition-all transform hover:scale-105"
            >
              Get Started Now →
            </Link>
            <p className="text-white/80 mt-6 text-sm">
              No lock-in contracts. Cancel anytime. Full support included.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 bg-brand-navy text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4 font-montserrat">Solutions</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="#packages" className="hover:text-brand-orange transition-colors">SMS Responder</a></li>
                  <li><a href="#packages" className="hover:text-brand-orange transition-colors">Professional Package</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat">Company</h4>
                <ul className="space-y-2 text-white/80">
                  <li><Link href="/about" className="hover:text-brand-orange transition-colors">About</Link></li>
                  <li><Link href="/faq" className="hover:text-brand-orange transition-colors">FAQ</Link></li>
                  <li><Link href="/terms" className="hover:text-brand-orange transition-colors">Terms</Link></li>
                  <li><Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat">Industries</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Trades & Contractors</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Beauty & Salons</a></li>
                  <li><a href="#" className="hover:text-brand-orange transition-colors">Mobile Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat">Connect</h4>
                <p className="text-white/80 mb-4">Brisbane, Australia</p>
                <Link
                  href="mailto:info@coresentia.com"
                  className="text-brand-orange hover:text-orange-400 transition-colors"
                >
                  info@coresentia.com
                </Link>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/80">
              <p className="font-montserrat">&copy; 2025 CoreSentia. Never miss a lead again.</p>
              <p className="text-sm mt-2">ABN: 69 267 271 132</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
