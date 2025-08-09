import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Zap, Brain, Unlock, DollarSign, Check, X, Calendar, Package, Globe, FileText, Phone, Wrench, Shield, MessageSquare, TrendingUp, Users } from 'lucide-react'
import Header from './components/Header'

// Dynamically import NetworkCanvas (no SSR for canvas animation)
const NetworkCanvas = dynamic(() => import('./components/NetworkCanvas'), { ssr: false })

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-opensans">
      {/* Synapse canvas background */}
      <div className="absolute inset-0 z-0">
        <NetworkCanvas />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="min-h-[100vh] flex items-center justify-center px-6 pt-24 md:pt-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 font-montserrat tracking-[0.15em] leading-[1.2] md:leading-[1.1]">
                Stop talking about AI
                <br />
                <span className="text-[#62D4F9] drop-shadow-[0_0_8px_#62D4F9]">Start closing with it</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 md:mb-4 font-light font-montserrat tracking-[0.1em]">
                Stop renting AI. Start owning it.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#62D4F9] mb-8 md:mb-12 font-light font-montserrat tracking-[0.1em]">
                From managed lead responder solutions, to custom AI and websites you own forever
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/chat/homepage-visitor" 
                className="inline-block px-8 py-3 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-lg hover:shadow-[0_0_20px_#62D4F9]"
              >
                Chat with Ivy →
              </Link>
              <a 
                href="#packages" 
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-lg"
              >
                View our solutions
              </a>
            </div>
          </div>
        </section>

        {/* Why CoreSentia Wins Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-montserrat font-light text-white text-center mb-16 tracking-[0.15em]">
              Why businesses choose CoreSentia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Economics Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <TrendingUp size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">The Economics Are Insane</h3>
                <p className="text-white mb-3">
                  <span className="font-bold">Their way:</span> Intercom charges $39 per conversation. Drift: $2,500/month. Endless reoccuring costs, forever.
                </p>
                <p className="text-white">
                  <span className="font-bold">Our way:</span> We charge one fee to build, plus a monthly hosting subscription. Or we can handover the code and you take control - nothing else to pay.
                </p>
              </div>

              {/* Ownership Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Unlock size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">You OWN It</h3>
                <p className="text-white">
                  Not renting. Not subscribing. OWNING. CoreSentia offers true ownership with optional self-hosting. Your AI, your rules, your asset.
                </p>
              </div>

              {/* Unlimited Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <MessageSquare size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Unlimited Everything</h3>
                <p className="text-white">
                  No conversation caps. No usage tiers. No overage charges. Others track each chat and cut you off or make you pay more, our Custom solutions handle infinite scale at the same price.
                </p>
              </div>

              {/* Australian Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Users size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">100% Australian</h3>
                <p className="text-white">
                  Brisbane-based team. Local support. We understand Australian businesses, compliance, and what actually works here.
                </p>
              </div>

              {/* Speed Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Zap size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Have you bot live in weeks</h3>
                <p className="text-white">
                  2 weeks to 2 months deployment, depending on your project complexity.
                </p>
              </div>

              {/* ROI Card */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <DollarSign size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Break-Even in 4-5 Months</h3>
                <p className="text-white">
                  Most clients see positive ROI within 6-8 weeks through increased lead conversion. After 4-5 months, you&apos;re saving pure profit with no downside.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section id="packages" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-white mb-6 tracking-[0.15em]">
                Three ways to own your AI future
              </h2>
              <p className="text-xl md:text-2xl text-white mb-2 font-light font-montserrat tracking-[0.1em]">
                All solutions qualify leads, send quotes, and book meetings 24/7
              </p>
              <p className="text-base md:text-lg text-white font-light font-montserrat tracking-[0.1em]">
                Choose managed simplicity or complete ownership
              </p>
            </div>

            {/* Package Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Essentials Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all relative">
                <div className="absolute -top-3 left-8 bg-[#62D4F9] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  ⚡ 2-Week Delivery
                </div>
                <div className="text-[#62D4F9] mb-4">
                  <Zap size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.15em]">Essentials</h3>
                <p className="text-3xl font-bold text-white mb-2">$3,000</p>
                <p className="text-lg text-white mb-6">+ $300/month hosting</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Intelligent chat bot trained on your FAQs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">SMS & email follow-up cascade</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">PDF quote generation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Up to 1,000 conversations/month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Fully managed by CoreSentia</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Industry-proven templates</span>
                  </div>
                </div>
                
                <p className="text-white text-sm italic">Perfect for: Small businesses wanting quick deployment without technical hassle. If you dont want the hassle and just want it to work.</p>
              </div>

              {/* Custom Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-[#62D4F9]/30 rounded-2xl p-8 hover:border-[#62D4F9]/50 transition-all relative shadow-[0_0_30px_rgba(98,212,249,0.1)]">
                <div className="absolute -top-3 left-8 bg-[#40FFD9] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  💡 Most Popular
                </div>
                <div className="text-[#62D4F9] mb-4">
                  <Brain size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.15em]">Custom</h3>
                <p className="text-3xl font-bold text-white mb-2">$10,000</p>
                <p className="text-lg text-white mb-6">+ $400/month hosting</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm font-bold">UNLIMITED conversations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Custom UI matching your brand</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Advanced lead scoring with AI reasoning</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Multi-channel (Web, SMS, WhatsApp, Telegram, Email)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Intelligence dashboard & analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Unlock className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">You own the code - we&apos;ll hand it over anytime</span>
                  </div>
                </div>
                
                <p className="text-white text-sm italic">Perfect for: Growing businesses, SMEs wanting more control, the option of ownership, and unlimited scale</p>
              </div>

              {/* Website + AI Bundle Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all relative">
                <div className="text-[#62D4F9] mb-4">
                  <Globe size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.15em]">Website + AI Bundle</h3>
                <p className="text-3xl font-bold text-white mb-2">$15,000</p>
                <p className="text-lg text-white mb-6">+ $500/month hosting</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm font-bold">UNLIMITED conversations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Professional Next.js website (5-10 pages)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Custom AI bot fully integrated</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">SEO optimisation from launch</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Unified analytics across site and bot</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Unlock className="w-5 h-5 text-[#62D4F9] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Own the code forever</span>
                  </div>
                </div>
                
                <p className="text-white text-sm italic">Perfect for: Complete digital transformation - website + AI in one. Trying to get your business launched? This gets you up, online, and closing deals.</p>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="mt-12 text-center">
              <p className="text-white mb-4">
                <span className="font-semibold">Delivery:</span> Essentials (2 weeks) • Custom (1 month) • Bundle (2-month sprint)
              </p>
              <Link 
                href="/products" 
                className="inline-block px-8 py-3 bg-transparent border border-[#62D4F9] text-[#62D4F9] font-semibold rounded-full hover:bg-[#62D4F9] hover:text-black transition-all transform hover:scale-105 text-lg hover:shadow-[0_0_20px_#62D4F9]"
              >
                View detailed comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* Subscription Comparison Section */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-light text-white text-center mb-6 tracking-[0.15em]">
              Stop juggling 5, 10, 12 AI subscriptions
            </h2>
            <p className="text-xl md:text-2xl text-white text-center mb-16 font-light font-montserrat tracking-[0.1em]">
              Businesses waste $2,000+/month on overlapping AI tools. We build you ONE lead managementsystem that can lock in your leads 24/7.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* The Old Way */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300">
                <DollarSign className="w-12 h-12 text-red-500 mb-6" />
                <h3 className="text-2xl font-montserrat text-white mb-6 tracking-[0.15em]">The Old Way</h3>
                <ul className="space-y-4">
                  {[
                    'Typeform: $59/month',
                    'Calendly: $20/month',
                    'Wix: $15/month',
                    'Squarespace: $20/month',
                    'Klaviyo: $50/month',
                    'Intercom: $500/month',
                    'Drift: $2,500/month',
                    'Plus 8 more tools...'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-white">
                      <span className="text-red-500 mr-3">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-3xl font-bold text-red-500">$2,000+/month forever</p>
                </div>
              </div>

              {/* The CoreSentia Way */}
              <div className="bg-black/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(98,212,249,0.2)]">
                <Zap className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-[0_0_8px_#62D4F9]" />
                <h3 className="text-2xl font-montserrat text-white mb-6 tracking-[0.15em]">The CoreSentia Way</h3>
                <ul className="space-y-4">
                  {[
                    'One custom solution',
                    'Built for YOUR process',
                    'Designed for your brand',
                    'You own the code',
                    'We&apos;ll host for a monthly fee, or take control at anytime - no more subscriptions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-white">
                      <span className="text-cyan-400 mr-3 drop-shadow-[0_0_4px_#62D4F9]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_6px_#62D4F9]">$3k-$15k once + hosting, or we hand over the code</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <p className="text-white text-xl mb-8">
                Break-even in 4-5 months - no more subscriptions
              </p>
              <Link
                href="/chat/homepage-visitor"
                className="inline-block bg-cyan-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-cyan-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#62D4F9]"
              >
                Book your AI Reality Check™
              </Link>
            </div>
          </div>
        </section>

        {/* What Your AI Does Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-montserrat font-light text-white text-center mb-12 tracking-[0.15em]">
              What your AI sales assistant actually does
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Zap size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Instant Response</h3>
                <p className="text-white font-bold mb-2">Reply in seconds — not hours</p>
                <p className="text-white text-sm">SMS, email, and chat responses sent instantly when a lead contacts you, 24/7/365.</p>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Brain size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Smart Qualification</h3>
                <p className="text-white font-bold mb-2">Filters tyre-kickers automatically</p>
                <p className="text-white text-sm">Natural conversation to identify intent, budget, timeline, and authority level.</p>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <FileText size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Instant Quotes</h3>
                <p className="text-white font-bold mb-2">Professional PDFs in minutes</p>
                <p className="text-white text-sm">Branded quotes sent automatically. Optional Xero/QuickBooks integration available.</p>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Calendar size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Seamless Booking</h3>
                <p className="text-white font-bold mb-2">Meetings booked automatically</p>
                <p className="text-white text-sm">Direct calendar integration. No back-and-forth emails ever again.</p>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <MessageSquare size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Multi-Channel</h3>
                <p className="text-white font-bold mb-2">Meet leads where they are</p>
                <p className="text-white text-sm">Web chat, SMS, WhatsApp, email - one AI brain across all channels.</p>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
                <div className="text-[#62D4F9] mb-4">
                  <Phone size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat tracking-[0.15em]">Voice AI <span className="text-sm font-normal">(Coming Q2 2025)</span></h3>
                <p className="text-white font-bold mb-2">Natural phone conversations</p>
                <p className="text-white text-sm">Australian accents. 24/7 phone answering. Appointment booking by voice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Solutions Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-montserrat font-light text-white text-center mb-4 tracking-[0.15em]">
              Pre-configured for your industry
            </h2>
            <p className="text-lg text-white text-center mb-12">
              Same pricing, industry-specific workflows included
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#62D4F9]/30 transition-all">
                <h3 className="text-lg font-semibold mb-3 text-[#62D4F9]">🏥 Healthcare</h3>
                <ul className="text-sm text-white space-y-2">
                  <li>• Medicare/private FAQs</li>
                  <li>• Appointment scheduling</li>
                  <li>• After-hours triage</li>
                  <li>• Patient recalls</li>
                </ul>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#62D4F9]/30 transition-all">
                <h3 className="text-lg font-semibold mb-3 text-[#62D4F9]">🏠 Real Estate</h3>
                <ul className="text-sm text-white space-y-2">
                  <li>• Property inquiries</li>
                  <li>• Open home bookings</li>
                  <li>• Buyer qualification</li>
                  <li>• Market appraisals</li>
                </ul>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#62D4F9]/30 transition-all">
                <h3 className="text-lg font-semibold mb-3 text-[#62D4F9]">🔧 Trades</h3>
                <ul className="text-sm text-white space-y-2">
                  <li>• Job qualification</li>
                  <li>• Instant ballpark quotes</li>
                  <li>• Emergency routing</li>
                  <li>• Photo uploads</li>
                </ul>
              </div>
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#62D4F9]/30 transition-all">
                <h3 className="text-lg font-semibold mb-3 text-[#62D4F9]">💼 Professional</h3>
                <ul className="text-sm text-white space-y-2">
                  <li>• Consultation booking</li>
                  <li>• Document automation</li>
                  <li>• Client onboarding</li>
                  <li>• Billing inquiries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 font-montserrat tracking-[0.15em]">
              Experience AI that actually
              <br />
              <span className="text-[#62D4F9] drop-shadow-[0_0_8px_#62D4F9]">closes deals</span>
            </h2>
            <p className="text-xl md:text-2xl text-white mb-12 font-light font-montserrat tracking-[0.1em]">
              Chat with Ivy. She&apos;ll qualify you, quote you, and book your AI Reality Check™
            </p>
            <Link 
              href="/chat/homepage-visitor" 
              className="inline-block px-10 py-4 bg-[#62D4F9] text-black font-bold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-xl hover:shadow-[0_0_20px_#62D4F9]"
            >
              Start your conversation with Ivy →
            </Link>
            <p className="text-white mt-8 text-sm">
              No forms. No downloads. Just chat.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4 font-montserrat tracking-[0.15em]">Products</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/products#essentials" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Essentials</Link></li>
                  <li><Link href="/products#custom" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Custom</Link></li>
                  <li><Link href="/products#bundle" className="hover:text-[#62D4F9] transition-colors">Website + AI Bundle</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat tracking-[0.15em]">Company</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/about" className="hover:text-[#62D4F9] transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-[#62D4F9] transition-colors">Contact</Link></li>
                  <li><Link href="/terms" className="hover:text-[#62D4F9] transition-colors">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat tracking-[0.15em]">Resources</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/chat/homepage-visitor" className="hover:text-[#62D4F9] transition-colors">Chat with Ivy</Link></li>
                  <li><Link href="/case-studies" className="hover:text-[#62D4F9] transition-colors">Case Studies</Link></li>
                  <li><Link href="/faq" className="hover:text-[#62D4F9] transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat tracking-[0.15em]">Connect</h4>
                <p className="text-white mb-4">Brisbane, Australia</p>
                <Link 
                  href="mailto:info@coresentia.com" 
                  className="text-[#62D4F9] hover:text-[#40FFD9] transition-colors"
                >
                  info@coresentia.com
                </Link>
              </div>
            </div>
            <div className="mt-12 pt-8 text-center text-white">
              <p className="font-montserrat tracking-[0.15em]">&copy; 2025 CoreSentia. Stop renting AI. Start owning it.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
