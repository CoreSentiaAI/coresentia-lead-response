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

export default function EssentialsPage() {
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
                className="px-6 py-3 bg-[#62D4F9] text-black rounded-xl font-medium hover:bg-[#40FFD9] transition-all"
                style={{
                  boxShadow: '0 0 12px #62D4F9, 0 0 20px #62D4F9'
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
            <h1 
              className={`text-5xl md:text-6xl font-normal mb-6 text-white ${montserrat.className}`}
              style={{ 
                letterSpacing: '0.15em',
                textShadow: '0 0 40px rgba(98, 212, 249, 0.5)'
              }}
            >
              Lead-to-Deal ESSENTIALS
            </h1>
            <p className={`text-xl md:text-2xl text-[#62D4F9] ${openSans.className}`}>
              Professional lead automation in 5 working days
            </p>
          </div>

          {/* Pricing Box */}
          <div 
            className="max-w-lg mx-auto rounded-3xl p-8 text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 212, 249, 0.3)'
            }}
          >
            <div className="mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className={`text-6xl font-light text-white ${montserrat.className}`}>
                  $3,000
                </span>
                <span className={`text-white/60 ml-3 text-lg ${openSans.className}`}>
                  AUD
                </span>
              </div>
              <p className={`text-white/90 text-lg ${openSans.className}`}>
                + $300 AUD/month hosting & maintenance
              </p>
            </div>
            <Link 
              href="/chat/homepage-visitor"
              className={`inline-block px-8 py-4 bg-[#62D4F9] text-black rounded-xl font-medium hover:bg-[#40FFD9] transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #62D4F9, 0 0 30px #62D4F9'
              }}
            >
              Get Started with Ivy
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            What You Get
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Instant Response System */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                INSTANT RESPONSE SYSTEM
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• SMS responses in seconds</li>
                <li className={`text-white/80 ${openSans.className}`}>• Email fallback automation</li>
                <li className={`text-white/80 ${openSans.className}`}>• Personalised messaging</li>
                <li className={`text-white/80 ${openSans.className}`}>• Multi-touch follow-up sequences</li>
              </ul>
            </div>

            {/* AI Chat Interface */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                AI CHAT INTERFACE
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Your branding & colours</li>
                <li className={`text-white/80 ${openSans.className}`}>• Natural conversation flow</li>
                <li className={`text-white/80 ${openSans.className}`}>• Smart qualification logic</li>
                <li className={`text-white/80 ${openSans.className}`}>• Mobile responsive design</li>
              </ul>
            </div>

            {/* Quote & Booking System */}
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                QUOTE & BOOKING SYSTEM
              </h3>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Instant PDF generation</li>
                <li className={`text-white/80 ${openSans.className}`}>• Payment links included</li>
                <li className={`text-white/80 ${openSans.className}`}>• Calendar integration</li>
                <li className={`text-white/80 ${openSans.className}`}>• Automated reminders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full bg-[#62D4F9]/20 border border-[#62D4F9] flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 0 20px rgba(98, 212, 249, 0.5)' }}
              >
                <span className={`text-2xl font-light text-[#62D4F9] ${montserrat.className}`}>1</span>
              </div>
              <h4 className={`text-lg font-normal text-white mb-2 ${montserrat.className}`}>Lead Arrives</h4>
              <p className={`text-white/70 text-sm ${openSans.className}`}>Form, email, or phone enquiry hits your system</p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full bg-[#62D4F9]/20 border border-[#62D4F9] flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 0 20px rgba(98, 212, 249, 0.5)' }}
              >
                <span className={`text-2xl font-light text-[#62D4F9] ${montserrat.className}`}>2</span>
              </div>
              <h4 className={`text-lg font-normal text-white mb-2 ${montserrat.className}`}>Instant Response</h4>
              <p className={`text-white/70 text-sm ${openSans.className}`}>SMS sent within seconds with chat link</p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full bg-[#62D4F9]/20 border border-[#62D4F9] flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 0 20px rgba(98, 212, 249, 0.5)' }}
              >
                <span className={`text-2xl font-light text-[#62D4F9] ${montserrat.className}`}>3</span>
              </div>
              <h4 className={`text-lg font-normal text-white mb-2 ${montserrat.className}`}>AI Qualification</h4>
              <p className={`text-white/70 text-sm ${openSans.className}`}>Natural conversation extracts needs & budget</p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full bg-[#62D4F9]/20 border border-[#62D4F9] flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 0 20px rgba(98, 212, 249, 0.5)' }}
              >
                <span className={`text-2xl font-light text-[#62D4F9] ${montserrat.className}`}>4</span>
              </div>
              <h4 className={`text-lg font-normal text-white mb-2 ${montserrat.className}`}>Convert to Deal</h4>
              <p className={`text-white/70 text-sm ${openSans.className}`}>Quote sent or meeting booked automatically</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Technical Specifications
          </h2>

          <div 
            className="rounded-3xl p-10"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 212, 249, 0.3)'
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`}>Infrastructure</h4>
                <ul className="space-y-2">
                  <li className={`text-white/80 ${openSans.className}`}>• Pre-built, proven architecture</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Cloud-hosted solution</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Simple CRM database</li>
                  <li className={`text-white/80 ${openSans.className}`}>• 99.9% uptime guarantee</li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`}>Integrations</h4>
                <ul className="space-y-2">
                  <li className={`text-white/80 ${openSans.className}`}>• SMS providers (Twilio, etc.)</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Email systems (Gmail, Outlook)</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Calendar booking</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Payment gateways (Stripe, Square)</li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`}>Support</h4>
                <ul className="space-y-2">
                  <li className={`text-white/80 ${openSans.className}`}>• Email support included</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Initial training session</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Monthly performance reports</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Bug fixes & updates</li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`}>Limitations</h4>
                <ul className="space-y-2">
                  <li className={`text-white/80 ${openSans.className}`}>• Template-based design</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Standard workflows only</li>
                  <li className={`text-white/80 ${openSans.className}`}>• Basic analytics</li>
                  <li className={`text-white/80 ${openSans.className}`}>• No self-hosting option</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-4xl font-normal mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Perfect For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`}>Small Businesses</h4>
              <p className={`text-white/70 ${openSans.className}`}>Ready to automate without the complexity</p>
            </div>
            <div>
              <h4 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`}>1-300 Leads/Month</h4>
              <p className={`text-white/70 ${openSans.className}`}>Designed for steady, manageable growth</p>
            </div>
            <div>
              <h4 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`}>Quick Deployment</h4>
              <p className={`text-white/70 ${openSans.className}`}>Need results in days, not months</p>
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
            Ready to Automate Your Leads?
          </h2>
          <p className={`text-xl text-white/80 mb-10 ${openSans.className}`}>
            Join businesses already converting leads 24/7 with ESSENTIALS
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat/homepage-visitor"
              className={`px-8 py-4 bg-[#62D4F9] text-black rounded-xl font-medium hover:bg-[#40FFD9] transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #62D4F9, 0 0 30px #62D4F9'
              }}
            >
              Start with Ivy Now
            </Link>
            <Link 
              href="/products/custom"
              className={`px-8 py-4 bg-transparent text-white rounded-xl font-medium hover:bg-white/10 transition-all text-lg border-2 border-white/30 hover:border-[#62D4F9] ${openSans.className}`}
            >
              Explore CUSTOM Instead
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
