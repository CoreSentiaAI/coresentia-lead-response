// app/products/page.tsx
'use client'

import { useState } from 'react'
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

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<'essentials' | 'custom' | 'bundle' | null>(null)
  
  // Click outside handler
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      setSelectedProduct(null)
    }
  }

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
      onClick={handleContainerClick}
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
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-normal mb-6 text-white ${montserrat.className}`}
            style={{ 
              letterSpacing: '0.15em',
              textShadow: '0 0 40px rgba(98, 212, 249, 0.5)'
            }}
          >
            Complete AI Solutions
          </h1>
          <p className={`text-xl md:text-2xl text-white/90 mb-4 ${openSans.className}`}>
            From lead capture to complete digital transformation
          </p>
          <p className={`text-lg text-[#62D4F9] font-medium ${openSans.className}`}>
            Build once. Own forever. Scale without limits.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="text-center p-8 rounded-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`} style={{ letterSpacing: '0.15em' }}>
                INSTANT RESPONSE
              </h3>
              <p className={`text-white/80 ${openSans.className}`}>
                SMS & email responses in seconds, not hours
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`} style={{ letterSpacing: '0.15em' }}>
                SMART QUALIFICATION
              </h3>
              <p className={`text-white/80 ${openSans.className}`}>
                AI that understands intent and qualifies naturally
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#62D4F9] mb-3 ${montserrat.className}`} style={{ letterSpacing: '0.15em' }}>
                COMPLETE OWNERSHIP
              </h3>
              <p className={`text-white/80 ${openSans.className}`}>
                Your AI, your code, your choice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Choose Your Solution
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Essentials */}
            <div 
              className={`relative rounded-3xl p-8 cursor-pointer transition-all flex flex-col ${
                selectedProduct === 'essentials' ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: selectedProduct === 'essentials' 
                  ? '2px solid #62D4F9' 
                  : '1px solid rgba(98, 212, 249, 0.3)',
                boxShadow: selectedProduct === 'essentials'
                  ? '0 0 30px rgba(98, 212, 249, 0.4)'
                  : '0 0 15px rgba(98, 212, 249, 0.2)'
              }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProduct('essentials')
              }}
            >
              <div className="mb-6">
                <h3 className={`text-2xl font-normal text-[#62D4F9] mb-2 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                  Lead-to-Deal ESSENTIALS
                </h3>
                <p className={`text-white/80 text-sm ${openSans.className}`}>
                  Pre-built solution on proven infrastructure
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className={`text-4xl font-light text-white ${montserrat.className}`}>
                    $3,000
                  </span>
                  <span className={`text-white/60 ml-2 text-sm ${openSans.className}`}>
                    AUD build
                  </span>
                </div>
                <p className={`text-white/90 text-sm ${openSans.className}`}>
                  + $300/month hosting
                </p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-2">✓</span>
                  <span className="text-white/90">SMS & email responses</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-2">✓</span>
                  <span className="text-white/90">AI chat with your branding</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-2">✓</span>
                  <span className="text-white/90">PDF quotes & payment links</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-2">✓</span>
                  <span className="text-white/90">5-day deployment</span>
                </li>
              </ul>
              
              <div className={`text-center py-2 px-4 rounded-xl bg-[#62D4F9]/20 border border-[#62D4F9]/50 mb-4 ${openSans.className}`}>
                <span className="text-[#62D4F9] text-sm font-medium">Ideal for 1-300 leads/month</span>
              </div>
              
              <Link 
                href="/products/essentials"
                className={`block text-center py-3 px-6 rounded-xl bg-[#62D4F9] text-black font-medium hover:bg-[#40FFD9] transition-all ${openSans.className}`}
                onClick={(e) => e.stopPropagation()}
              >
                Learn More
              </Link>
              
              <p className={`text-xs text-white/50 mt-4 ${openSans.className}`}>
                CoreSentia retains ownership. Non-exclusive licence to use.
              </p>
            </div>

            {/* Custom */}
            <div 
              className={`relative rounded-3xl p-8 cursor-pointer transition-all flex flex-col ${
                selectedProduct === 'custom' ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: selectedProduct === 'custom' 
                  ? '2px solid #2A50DF' 
                  : '1px solid rgba(42, 80, 223, 0.3)',
                boxShadow: selectedProduct === 'custom'
                  ? '0 0 30px rgba(42, 80, 223, 0.4)'
                  : '0 0 15px rgba(42, 80, 223, 0.2)'
              }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProduct('custom')
              }}
            >
              <div className="mb-6">
                <h3 className={`text-2xl font-normal text-[#2A50DF] mb-2 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                  Lead-to-Deal CUSTOM
                </h3>
                <p className={`text-white/80 text-sm ${openSans.className}`}>
                  Bespoke solution built for your business
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className={`text-4xl font-light text-white ${montserrat.className}`}>
                    $10,000
                  </span>
                  <span className={`text-white/60 ml-2 text-sm ${openSans.className}`}>
                    AUD build
                  </span>
                </div>
                <p className={`text-white/90 text-sm ${openSans.className}`}>
                  + $500/month hosting
                </p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#2A50DF] mr-2">✓</span>
                  <span className="text-white/90">Everything in Essentials</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#2A50DF] mr-2">✓</span>
                  <span className="text-white/90">Custom interface like Ivy</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#2A50DF] mr-2">✓</span>
                  <span className="text-white/90">Advanced AI & analytics</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#2A50DF] mr-2">✓</span>
                  <span className="text-white/90 font-semibold">You own the code</span>
                </li>
              </ul>
              
              <div className={`text-center py-2 px-4 rounded-xl bg-[#2A50DF]/20 border border-[#2A50DF]/50 mb-4 ${openSans.className}`}>
                <span className="text-[#2A50DF] text-sm font-medium">Scales to 1000+ leads/month</span>
              </div>
              
              <Link 
                href="/products/custom"
                className={`block text-center py-3 px-6 rounded-xl bg-[#2A50DF] text-white font-medium hover:bg-[#40FFD9] hover:text-black transition-all ${openSans.className}`}
                onClick={(e) => e.stopPropagation()}
              >
                Learn More
              </Link>
              
              <p className={`text-xs text-white/50 mt-4 ${openSans.className}`}>
                Self-hosting option available (+$1,500 handover fee)
              </p>
            </div>

            {/* Website + AI Bundle */}
            <div 
              className={`relative rounded-3xl p-8 cursor-pointer transition-all flex flex-col ${
                selectedProduct === 'bundle' ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: selectedProduct === 'bundle' 
                  ? '2px solid #40FFD9' 
                  : '1px solid rgba(64, 255, 217, 0.3)',
                boxShadow: selectedProduct === 'bundle'
                  ? '0 0 30px rgba(64, 255, 217, 0.4)'
                  : '0 0 15px rgba(64, 255, 217, 0.2)'
              }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedProduct('bundle')
              }}
            >
              <div className="absolute top-0 right-0 bg-[#40FFD9] text-black px-4 py-1 rounded-bl-xl rounded-tr-xl">
                <span className={`text-sm font-medium ${montserrat.className}`}>BEST VALUE</span>
              </div>
              
              <div className="mb-6">
                <h3 className={`text-2xl font-normal text-[#40FFD9] mb-2 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                  Website + AI Bundle
                </h3>
                <p className={`text-white/80 text-sm ${openSans.className}`}>
                  Complete digital transformation
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className={`text-4xl font-light text-white ${montserrat.className}`}>
                    $15,000
                  </span>
                  <span className={`text-white/60 ml-2 text-sm ${openSans.className}`}>
                    AUD build
                  </span>
                </div>
                <p className={`text-white/90 text-sm ${openSans.className}`}>
                  + $500/month hosting
                </p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-2">✓</span>
                  <span className="text-white/90">Professional website</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-2">✓</span>
                  <span className="text-white/90">CUSTOM bot integrated</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-2">✓</span>
                  <span className="text-white/90">SEO-optimized from day 1</span>
                </li>
                <li className={`flex items-start text-sm ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-2">✓</span>
                  <span className="text-white/90 font-semibold">You own everything</span>
                </li>
              </ul>
              
              <div className={`text-center py-2 px-4 rounded-xl bg-[#40FFD9]/20 border border-[#40FFD9]/50 mb-4 ${openSans.className}`}>
                <span className="text-[#40FFD9] text-sm font-medium">Save $9k vs separate builds</span>
              </div>
              
              <Link 
                href="/products/bundle"
                className={`block text-center py-3 px-6 rounded-xl bg-[#40FFD9] text-black font-medium hover:bg-white transition-all ${openSans.className}`}
                onClick={(e) => e.stopPropagation()}
              >
                Learn More
              </Link>
              
              <p className={`text-xs text-white/50 mt-4 ${openSans.className}`}>
                Self-hosting option available (+50% premium)
              </p>
            </div>
          </div>

          {/* Comparison Note */}
          <div className="text-center mt-12">
            <p className={`text-white/60 text-sm ${openSans.className}`}>
              All prices exclude GST. Self-hosting available for CUSTOM and Bundle (+50% premium).
            </p>
          </div>
        </div>
      </section>

      {/* Quote System Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            className="rounded-3xl p-12"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 212, 249, 0.3)'
            }}
          >
            <h3 className={`text-3xl font-normal text-center text-white mb-8 ${montserrat.className}`} style={{ letterSpacing: '0.15em' }}>
              Professional Quote System Included
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                  Standard Features (All Packages)
                </h4>
                <ul className="space-y-3">
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Instant PDF generation</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Professional templates with your branding</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Payment links (Stripe, Square, etc.)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Automatic email delivery</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Quote tracking dashboard</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#62D4F9] mr-3">•</span>
                    <span className="text-white/90">Monthly CSV export for accounting</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className={`text-xl font-normal text-[#40FFD9] mb-4 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                  Optional Add-Ons
                </h4>
                <ul className="space-y-3">
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Xero Integration (+$1,500 AUD)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Custom quote templates (+$500 AUD)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Multi-currency support (+$1,000 AUD)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">QuickBooks/MYOB (Coming Soon)</span>
                  </li>
                </ul>
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
            Ready to Transform Your Business?
          </h2>
          <p className={`text-xl text-white/80 mb-10 ${openSans.className}`}>
            Experience the difference with Ivy. She&apos;s qualifying leads while you read this.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat/homepage-visitor"
              className={`px-8 py-4 bg-[#62D4F9] text-black rounded-xl font-medium hover:bg-[#40FFD9] transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #62D4F9, 0 0 30px #62D4F9'
              }}
            >
              Want a demo? Chat with Ivy
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
