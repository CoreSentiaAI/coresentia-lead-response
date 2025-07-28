// app/products/custom/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500']
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export default function CustomPage() {
  return (
    <div 
      className="min-h-screen w-screen bg-black overflow-x-hidden"
      style={{
        backgroundImage: 'url(/CoreSentia_page_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image 
                src="/CoreSentia_Transparent_Logo.png" 
                alt="CoreSentia" 
                width={250}
                height={100}
                className="h-16 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(98, 212, 249, 0.8))'
                }}
              />
            </Link>
            <div className="flex gap-4">
              <Link 
                href="/products"
                className="px-6 py-3 bg-transparent text-white rounded-xl font-medium hover:bg-white/10 transition-all border border-white/30"
              >
                Back to Products
              </Link>
              <Link 
                href="/chat/homepage-visitor"
                className="px-6 py-3 bg-[#2A50DF] text-white rounded-xl font-medium hover:bg-[#40FFD9] hover:text-black transition-all"
                style={{
                  boxShadow: '0 0 12px #2A50DF, 0 0 20px #2A50DF'
                }}
              >
                Chat with Ivy
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#40FFD9] text-black px-6 py-2 rounded-full mb-6">
              <span className={`text-sm font-medium ${montserrat.className}`}>MOST POPULAR</span>
            </div>
            <h1 
              className={`text-5xl md:text-6xl font-normal mb-6 text-white ${montserrat.className}`}
              style={{ 
                letterSpacing: '0.15em',
                textShadow: '0 0 40px rgba(42, 80, 223, 0.5)'
              }}
            >
              Lead-to-Deal CUSTOM
            </h1>
            <p className={`text-xl md:text-2xl text-[#2A50DF] ${openSans.className}`}>
              Bespoke AI solution that you own forever
            </p>
          </div>

          {/* Pricing Box */}
          <div 
            className="max-w-lg mx-auto rounded-3xl p-8 text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(42, 80, 223, 0.3)',
              boxShadow: '0 0 30px rgba(42, 80, 223, 0.2)'
            }}
          >
            <div className="mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className={`text-6xl font-light text-white ${montserrat.className}`}>
                  $10,000
                </span>
                <span className={`text-white/60 ml-3 text-lg ${openSans.className}`}>
                  AUD
                </span>
              </div>
              <p className={`text-white/90 text-lg mb-2 ${openSans.className}`}>
                + $500 AUD/month hosting & maintenance
              </p>
              <p className={`text-[#40FFD9] text-sm ${openSans.className}`}>
                Self-hosting available (+$1,500 AUD)
              </p>
            </div>
            <Link 
              href="/chat/homepage-visitor"
              className={`inline-block px-8 py-4 bg-[#2A50DF] text-white rounded-xl font-medium hover:bg-[#40FFD9] hover:text-black transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #2A50DF, 0 0 30px #2A50DF'
              }}
            >
              Experience Ivy - Your Future Bot
            </Link>
          </div>
        </div>
      </section>

      {/* Key Differentiator */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-4xl font-normal mb-8 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            The CoreSentia Difference
          </h2>
          <p className={`text-2xl text-[#40FFD9] mb-6 ${openSans.className}`}>
            You own the code. Forever.
          </p>
          <p className={`text-lg text-white/80 max-w-3xl mx-auto ${openSans.className}`}>
            Unlike SaaS subscriptions that lock you in forever, CUSTOM gives you complete ownership. 
            Keep us for convenience, or take it in-house anytime. No vendor lock-in. Total transparency.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Everything in CUSTOM
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Interface */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                CUSTOM INTERFACE
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Beautiful design like Ivy</li>
                <li className={`text-white/80 ${openSans.className}`}>• Your exact brand aesthetic</li>
                <li className={`text-white/80 ${openSans.className}`}>• Custom animations & effects</li>
                <li className={`text-white/80 ${openSans.className}`}>• Unlimited design iterations</li>
              </ul>
            </div>

            {/* Advanced AI */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                ADVANCED AI
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Personality matching</li>
                <li className={`text-white/80 ${openSans.className}`}>• Complex decision trees</li>
                <li className={`text-white/80 ${openSans.className}`}>• Smart lead scoring (1-10)</li>
                <li className={`text-white/80 ${openSans.className}`}>• Sentiment analysis</li>
              </ul>
            </div>

            {/* Full Database */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                FULL DATABASE
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Complete lead history</li>
                <li className={`text-white/80 ${openSans.className}`}>• Advanced analytics</li>
                <li className={`text-white/80 ${openSans.className}`}>• Custom reporting</li>
                <li className={`text-white/80 ${openSans.className}`}>• Data export anytime</li>
              </ul>
            </div>

            {/* Admin Dashboard */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                ADMIN DASHBOARD
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Real-time monitoring</li>
                <li className={`text-white/80 ${openSans.className}`}>• Lead management portal</li>
                <li className={`text-white/80 ${openSans.className}`}>• Performance metrics</li>
                <li className={`text-white/80 ${openSans.className}`}>• Team access controls</li>
              </ul>
            </div>

            {/* Integrations */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                UNLIMITED INTEGRATIONS
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Any CRM system</li>
                <li className={`text-white/80 ${openSans.className}`}>• Custom API connections</li>
                <li className={`text-white/80 ${openSans.className}`}>• Multiple calendars</li>
                <li className={`text-white/80 ${openSans.className}`}>• Complex workflows</li>
              </ul>
            </div>

            {/* Ownership */}
            <div 
              className="rounded-2xl p-8 bg-[#2A50DF]/10"
              style={{
                background: 'rgba(42, 80, 223, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.5)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#40FFD9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                CODE OWNERSHIP
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/90 font-semibold ${openSans.className}`}>• You own everything</li>
                <li className={`text-white/90 ${openSans.className}`}>• Self-host option available</li>
                <li className={`text-white/90 ${openSans.className}`}>• Full documentation</li>
                <li className={`text-white/90 ${openSans.className}`}>• No vendor lock-in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Enterprise-Grade Features
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className={`text-2xl font-normal text-[#40FFD9] mb-6 ${montserrat.className}`}>AI Capabilities</h4>
              <ul className="space-y-4">
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Personality Matching:</span> AI adapts communication style to each lead
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Lead Scoring:</span> Automatic 1-10 scoring with detailed reasoning
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Intent Recognition:</span> Understands urgency and buying signals
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Multi-language:</span> Support for international markets
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-2xl font-normal text-[#40FFD9] mb-6 ${montserrat.className}`}>Business Intelligence</h4>
              <ul className="space-y-4">
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Conversion Analytics:</span> Track every step of the journey
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">ROI Dashboard:</span> Real revenue attribution
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Pattern Recognition:</span> Identify what makes leads convert
                </li>
                <li className={`text-white/80 ${openSans.className}`}>
                  <span className="text-[#2A50DF] font-semibold">Predictive Insights:</span> Forecast future performance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Hosting Option */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-3xl p-12 text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(64, 255, 217, 0.3)',
              boxShadow: '0 0 30px rgba(64, 255, 217, 0.2)'
            }}
          >
            <h3 
              className={`text-3xl font-normal mb-6 text-white ${montserrat.className}`}
              style={{ letterSpacing: '0.15em' }}
            >
              The Self-Hosting Advantage
            </h3>
            <p className={`text-xl text-[#40FFD9] mb-4 ${openSans.className}`}>
              Complete control. Total independence.
            </p>
            <p className={`text-white/80 mb-8 max-w-2xl mx-auto ${openSans.className}`}>
              For an additional $1,500 AUD, receive everything you need to run the system yourself. 
              Full code, documentation, and a handover session. Most clients prefer our hosting for 
              convenience, but the choice is always yours.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
              <div>
                <h5 className={`text-[#40FFD9] font-semibold mb-2 ${openSans.className}`}>What You Get</h5>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Complete source code</li>
                  <li>• Technical documentation</li>
                  <li>• Deployment guides</li>
                  <li>• Architecture diagrams</li>
                </ul>
              </div>
              <div>
                <h5 className={`text-[#40FFD9] font-semibold mb-2 ${openSans.className}`}>Requirements</h5>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Technical team</li>
                  <li>• Cloud infrastructure</li>
                  <li>• API management</li>
                  <li>• Ongoing maintenance</li>
                </ul>
              </div>
              <div>
                <h5 className={`text-[#40FFD9] font-semibold mb-2 ${openSans.className}`}>Support</h5>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• 2-hour handover session</li>
                  <li>• Setup assistance</li>
                  <li>• No ongoing support</li>
                  <li>• Buy-back option: $2,500</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            10-Day Deployment
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#2A50DF]/20 border border-[#2A50DF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(42, 80, 223, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#2A50DF] ${montserrat.className}`}>1-2</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Discovery & Design</h4>
                <p className={`text-white/70 ${openSans.className}`}>Understanding your business, mapping workflows, designing custom interface</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#2A50DF]/20 border border-[#2A50DF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(42, 80, 223, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#2A50DF] ${montserrat.className}`}>3-7</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Development & Integration</h4>
                <p className={`text-white/70 ${openSans.className}`}>Building your custom solution, integrating with your systems</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#2A50DF]/20 border border-[#2A50DF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(42, 80, 223, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#2A50DF] ${montserrat.className}`}>8-9</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Testing & Training</h4>
                <p className={`text-white/70 ${openSans.className}`}>Thorough testing, team training, documentation delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#40FFD9]/20 border border-[#40FFD9] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(64, 255, 217, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#40FFD9] ${montserrat.className}`}>10</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Go Live</h4>
                <p className={`text-white/70 ${openSans.className}`}>Your custom AI is live, converting leads 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-4xl md:text-5xl font-normal text-white mb-6 ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Ready to Own Your AI?
          </h2>
          <p className={`text-xl text-white/80 mb-10 ${openSans.className}`}>
            Join forward-thinking businesses who refuse to rent their future
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat/homepage-visitor"
              className={`px-8 py-4 bg-[#2A50DF] text-white rounded-xl font-medium hover:bg-[#40FFD9] hover:text-black transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #2A50DF, 0 0 30px #2A50DF'
              }}
            >
              Experience Ivy Now
            </Link>
            <Link 
              href="/products/essentials"
              className={`px-8 py-4 bg-transparent text-white rounded-xl font-medium hover:bg-white/10 transition-all text-lg border-2 border-white/30 hover:border-[#62D4F9] ${openSans.className}`}
            >
              Start with ESSENTIALS
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p 
            className={`text-lg text-white/90 font-medium mb-4 ${openSans.className}`}
            style={{ textShadow: '0 0 2px rgba(255, 255, 255, 0.25)' }}
          >
            Stop talking about AI. Start closing with it.
          </p>
          <p className={`text-sm text-white/60 ${openSans.className}`}>
            Copyright © CoreSentia 2025
          </p>
        </div>
      </footer>
    </div>
  )
}
