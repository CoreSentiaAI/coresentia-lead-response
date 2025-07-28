// app/products/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<'essentials' | 'custom' | null>(null)

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
            <Link 
              href="/chat/homepage-visitor"
              className="px-6 py-3 bg-[#62D4F9] text-black rounded-xl font-semibold hover:bg-[#40FFD9] transition-all"
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
            className={`text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-white ${montserrat.className}`}
            style={{ 
              letterSpacing: '0.15em',
              textShadow: '0 0 40px rgba(98, 212, 249, 0.5)'
            }}
          >
            Lead-to-Deal Solutions
          </h1>
          <p className={`text-xl md:text-2xl text-white/90 mb-4 ${openSans.className}`}>
            Stop losing leads. Start closing deals automatically.
          </p>
          <p className={`text-lg text-[#62D4F9] font-medium ${openSans.className}`}>
            Own your AI forever. No subscriptions. No lock-in.
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
              <div className="text-4xl mb-4">⚡</div>
              <h3 className={`text-xl font-semibold text-white mb-3 ${montserrat.className}`}>
                Instant Response
              </h3>
              <p className={`text-white/80 ${openSans.className}`}>
                Every lead gets a response in seconds, not hours
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
              <div className="text-4xl mb-4">🎯</div>
              <h3 className={`text-xl font-semibold text-white mb-3 ${montserrat.className}`}>
                Smart Qualification
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
              <div className="text-4xl mb-4">💰</div>
              <h3 className={`text-xl font-semibold text-white mb-3 ${montserrat.className}`}>
                Instant Quotes
              </h3>
              <p className={`text-white/80 ${openSans.className}`}>
                Professional PDFs generated and sent automatically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-semibold text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.1em' }}
          >
            Choose Your Solution
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Essentials */}
            <div 
              className={`relative rounded-3xl p-8 lg:p-10 cursor-pointer transition-all ${
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
              onClick={() => setSelectedProduct('essentials')}
            >
              <div className="mb-8">
                <h3 className={`text-2xl font-semibold text-[#62D4F9] mb-2 ${montserrat.className}`}>
                  Lead-to-Deal ESSENTIALS
                </h3>
                <p className={`text-white/80 ${openSans.className}`}>
                  Perfect for small businesses ready to automate
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className={`text-5xl font-bold text-white ${montserrat.className}`}>
                    $3,000
                  </span>
                  <span className={`text-white/60 ml-3 ${openSans.className}`}>
                    one-time
                  </span>
                </div>
                <p className={`text-white/90 ${openSans.className}`}>
                  + $300/month hosting
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Instant SMS & email responses</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">AI chat interface with your branding</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Smart lead qualification</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Professional PDF quotes</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Meeting booking automation</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#62D4F9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">5-day deployment</span>
                </li>
              </ul>
              
              <div className={`text-center py-3 px-6 rounded-xl bg-[#62D4F9]/20 border border-[#62D4F9]/50 ${openSans.className}`}>
                <span className="text-[#62D4F9] font-semibold">Best for 1-50 leads/month</span>
              </div>
            </div>

            {/* Custom */}
            <div 
              className={`relative rounded-3xl p-8 lg:p-10 cursor-pointer transition-all ${
                selectedProduct === 'custom' ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: selectedProduct === 'custom' 
                  ? '2px solid #40FFD9' 
                  : '1px solid rgba(64, 255, 217, 0.3)',
                boxShadow: selectedProduct === 'custom'
                  ? '0 0 30px rgba(64, 255, 217, 0.4)'
                  : '0 0 15px rgba(64, 255, 217, 0.2)'
              }}
              onClick={() => setSelectedProduct('custom')}
            >
              <div className="absolute top-0 right-0 bg-[#40FFD9] text-black px-4 py-1 rounded-bl-xl rounded-tr-xl">
                <span className={`text-sm font-semibold ${montserrat.className}`}>POPULAR</span>
              </div>
              
              <div className="mb-8">
                <h3 className={`text-2xl font-semibold text-[#40FFD9] mb-2 ${montserrat.className}`}>
                  Lead-to-Deal CUSTOM
                </h3>
                <p className={`text-white/80 ${openSans.className}`}>
                  Enterprise-grade with unlimited customization
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className={`text-5xl font-bold text-white ${montserrat.className}`}>
                    $10,000
                  </span>
                  <span className={`text-white/60 ml-3 ${openSans.className}`}>
                    one-time
                  </span>
                </div>
                <p className={`text-white/90 ${openSans.className}`}>
                  + $500/month hosting
                </p>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Everything in Essentials, plus:</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Custom interface like Ivy</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Admin & analytics dashboards</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Advanced AI personality matching</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Smart lead scoring</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">A/B testing capabilities</span>
                </li>
                <li className={`flex items-start ${openSans.className}`}>
                  <span className="text-[#40FFD9] mr-3 text-xl">✓</span>
                  <span className="text-white/90">Option to self-host (+$1,500)</span>
                </li>
              </ul>
              
              <div className={`text-center py-3 px-6 rounded-xl bg-[#40FFD9]/20 border border-[#40FFD9]/50 ${openSans.className}`}>
                <span className="text-[#40FFD9] font-semibold">Scales to 1000+ leads/month</span>
              </div>
            </div>
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
            <h3 className={`text-3xl font-semibold text-center text-white mb-8 ${montserrat.className}`}>
              Professional Quote System Included
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-xl font-semibold text-[#62D4F9] mb-4 ${montserrat.className}`}>
                  Standard Features (Both Packages)
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
                <h4 className={`text-xl font-semibold text-[#40FFD9] mb-4 ${montserrat.className}`}>
                  Optional Add-Ons
                </h4>
                <ul className="space-y-3">
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Xero Integration (+$1,500)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Custom quote templates (+$500)</span>
                  </li>
                  <li className={`flex items-start ${openSans.className}`}>
                    <span className="text-[#40FFD9] mr-3">•</span>
                    <span className="text-white/90">Multi-currency support (+$1,000)</span>
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

      {/* Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className={`text-3xl font-semibold text-center text-white mb-12 ${montserrat.className}`}>
            Why Choose CoreSentia?
          </h3>
          
          <div 
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(98, 212, 249, 0.3)'
            }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className={`text-left p-6 text-white/60 font-normal ${openSans.className}`}>
                    
                  </th>
                  <th className={`text-center p-6 text-[#62D4F9] font-semibold ${montserrat.className}`}>
                    CoreSentia
                  </th>
                  <th className={`text-center p-6 text-white/60 font-normal ${openSans.className}`}>
                    SaaS Platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className={`p-6 text-white/90 ${openSans.className}`}>Ownership</td>
                  <td className="text-center p-6">
                    <span className="text-[#62D4F9] text-2xl">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white/30 text-2xl">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`p-6 text-white/90 ${openSans.className}`}>One-time cost</td>
                  <td className="text-center p-6">
                    <span className="text-[#62D4F9] text-2xl">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white/30 text-2xl">✗</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`p-6 text-white/90 ${openSans.className}`}>Custom built</td>
                  <td className="text-center p-6">
                    <span className="text-[#62D4F9] text-2xl">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white/30 text-2xl">✗</span>
                  </td>
                </tr>
                <tr>
                  <td className={`p-6 text-white/90 ${openSans.className}`}>No vendor lock-in</td>
                  <td className="text-center p-6">
                    <span className="text-[#62D4F9] text-2xl">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white/30 text-2xl">✗</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`text-4xl md:text-5xl font-semibold text-white mb-6 ${montserrat.className}`}
            style={{ letterSpacing: '0.1em' }}
          >
            Ready to Transform Your Lead Process?
          </h2>
          <p className={`text-xl text-white/80 mb-10 ${openSans.className}`}>
            Experience the difference with Ivy. She&apos;s closing deals while you read this.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat/homepage-visitor"
              className={`px-8 py-4 bg-[#62D4F9] text-black rounded-xl font-semibold hover:bg-[#40FFD9] transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #62D4F9, 0 0 30px #62D4F9'
              }}
            >
              Chat with Ivy Now
            </Link>
            <Link 
              href="https://calendar.app.google/X6T7MdmZCxF3mGBe7"
              target="_blank"
              className={`px-8 py-4 bg-transparent text-white rounded-xl font-semibold hover:bg-white/10 transition-all text-lg border-2 border-white/30 hover:border-[#62D4F9] ${openSans.className}`}
            >
              Book a Demo
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
            Copyright © CoreSentia 2025 | ABN: [Your ABN]
          </p>
        </div>
      </footer>
    </div>
  )
}
