// app/products/bundle/page.tsx
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

export default function BundlePage() {
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
                className="px-6 py-3 bg-[#40FFD9] text-black rounded-xl font-medium hover:bg-white transition-all"
                style={{
                  boxShadow: '0 0 12px #40FFD9, 0 0 20px #40FFD9'
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
              <span className={`text-sm font-medium ${montserrat.className}`}>BEST VALUE</span>
            </div>
            <h1 
              className={`text-5xl md:text-6xl font-normal mb-6 text-white ${montserrat.className}`}
              style={{ 
                letterSpacing: '0.15em',
                textShadow: '0 0 40px rgba(64, 255, 217, 0.5)'
              }}
            >
              Website + AI Bundle
            </h1>
            <p className={`text-xl md:text-2xl text-[#40FFD9] ${openSans.className}`}>
              Stop juggling subscriptions. Own your entire digital presence.
            </p>
          </div>

          {/* Pricing Box */}
          <div 
            className="max-w-lg mx-auto rounded-3xl p-8 text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(64, 255, 217, 0.3)',
              boxShadow: '0 0 30px rgba(64, 255, 217, 0.2)'
            }}
          >
            <div className="mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className={`text-6xl font-light text-white ${montserrat.className}`}>
                  $15,000
                </span>
                <span className={`text-white/60 ml-3 text-lg ${openSans.className}`}>
                  AUD
                </span>
              </div>
              <p className={`text-white/90 text-lg mb-2 ${openSans.className}`}>
                + $500 AUD/month hosting
              </p>
              <p className={`text-[#40FFD9] font-medium ${openSans.className}`}>
                Save $9,000 vs separate builds
              </p>
            </div>
            <Link 
              href="/chat/homepage-visitor"
              className={`inline-block px-8 py-4 bg-[#40FFD9] text-black rounded-xl font-medium hover:bg-white transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #40FFD9, 0 0 30px #40FFD9'
              }}
            >
              See It In Action
            </Link>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-12 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            The Math Is Simple
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className={`text-xl font-normal text-white/60 mb-6 ${montserrat.className}`}>Traditional Approach</h3>
              <ul className="space-y-4">
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">Professional Website</span>
                  <span className="text-white/60">$8,000 - $15,000</span>
                </li>
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">Lead Bot (Drift/Intercom)</span>
                  <span className="text-white/60">$500 - $2,500/month</span>
                </li>
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">2-Year Bot Cost</span>
                  <span className="text-white/60">$12,000 - $60,000</span>
                </li>
                <li className={`flex justify-between pt-4 border-t border-white/20 font-semibold ${openSans.className}`}>
                  <span className="text-white">Total Over 2 Years</span>
                  <span className="text-red-400">$20,000 - $75,000</span>
                </li>
              </ul>
            </div>
            
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(64, 255, 217, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(64, 255, 217, 0.3)',
                boxShadow: '0 0 20px rgba(64, 255, 217, 0.1)'
              }}
            >
              <h3 className={`text-xl font-normal text-[#40FFD9] mb-6 ${montserrat.className}`}>CoreSentia Bundle</h3>
              <ul className="space-y-4">
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">Complete Website + AI</span>
                  <span className="text-white">$15,000</span>
                </li>
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">Hosting (2 years)</span>
                  <span className="text-white">$12,000</span>
                </li>
                <li className={`flex justify-between ${openSans.className}`}>
                  <span className="text-white/80">Bot Subscriptions</span>
                  <span className="text-[#40FFD9]">$0 (You own it!)</span>
                </li>
                <li className={`flex justify-between pt-4 border-t border-[#40FFD9]/30 font-semibold ${openSans.className}`}>
                  <span className="text-white">Total Over 2 Years</span>
                  <span className="text-[#40FFD9]">$27,000</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className={`text-2xl text-white/90 ${openSans.className}`}>
              You save <span className="text-[#40FFD9] font-bold">at least $9,000</span> and own everything forever
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Everything You Need to Dominate Online
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Website Features */}
            <div>
              <h3 className={`text-2xl font-normal text-[#40FFD9] mb-8 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                PROFESSIONAL WEBSITE
              </h3>
              
              <div className="space-y-6">
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(64, 255, 217, 0.3)'
                  }}
                >
                  <h4 className={`text-lg font-medium text-white mb-3 ${openSans.className}`}>Modern Tech Stack</h4>
                  <ul className="space-y-2">
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Next.js/React (like CoreSentia)</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Lightning-fast performance</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• SEO-optimized from day one</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Mobile-first responsive design</li>
                  </ul>
                </div>
                
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(64, 255, 217, 0.3)'
                  }}
                >
                  <h4 className={`text-lg font-medium text-white mb-3 ${openSans.className}`}>Custom Design</h4>
                  <ul className="space-y-2">
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Your brand, elevated</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Professional copywriting included</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Unlimited pages</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• One round of revisions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AI Bot Features */}
            <div>
              <h3 className={`text-2xl font-normal text-[#40FFD9] mb-8 ${montserrat.className}`} style={{ letterSpacing: '0.1em' }}>
                INTEGRATED AI SYSTEM
              </h3>
              
              <div className="space-y-6">
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(64, 255, 217, 0.3)'
                  }}
                >
                  <h4 className={`text-lg font-medium text-white mb-3 ${openSans.className}`}>Lead-to-Deal CUSTOM</h4>
                  <ul className="space-y-2">
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Full CUSTOM bot (worth $10k)</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Seamlessly integrated, not bolted on</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• SMS & email automation</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Intelligent qualification</li>
                  </ul>
                </div>
                
                <div 
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(64, 255, 217, 0.3)'
                  }}
                >
                  <h4 className={`text-lg font-medium text-white mb-3 ${openSans.className}`}>Flexible Deployment</h4>
                  <ul className="space-y-2">
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Frontline greeter mode</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Support assistant bubble</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• Form enhancement option</li>
                    <li className={`text-white/80 text-sm ${openSans.className}`}>• You choose the approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-12 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Enhance Your Bundle
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h4 className={`text-xl font-normal text-[#62D4F9] mb-4 ${montserrat.className}`}>Design Package</h4>
              <p className={`text-3xl font-light text-white mb-4 ${montserrat.className}`}>+$500</p>
              <ul className="space-y-2 text-left">
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Custom color palette</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Typography selection</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Brand guidelines</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Design system</li>
              </ul>
            </div>
            
            <div 
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h4 className={`text-xl font-normal text-[#2A50DF] mb-4 ${montserrat.className}`}>Content Creation</h4>
              <p className={`text-3xl font-light text-white mb-4 ${montserrat.className}`}>+$1,000</p>
              <ul className="space-y-2 text-left">
                <li className={`text-white/70 text-sm ${openSans.className}`}>• AI-assisted copywriting</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• SEO optimization</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Product descriptions</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Blog starter content</li>
              </ul>
            </div>
            
            <div 
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h4 className={`text-xl font-normal text-[#40FFD9] mb-4 ${montserrat.className}`}>Professional Logo</h4>
              <p className={`text-3xl font-light text-white mb-4 ${montserrat.className}`}>+$300</p>
              <ul className="space-y-2 text-left">
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Premium designer</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Multiple concepts</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• Revision rounds</li>
                <li className={`text-white/70 text-sm ${openSans.className}`}>• All file formats</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-16 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            14-Day Transformation
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#40FFD9]/20 border border-[#40FFD9] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(64, 255, 217, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#40FFD9] ${montserrat.className}`}>1-3</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Discovery & Design</h4>
                <p className={`text-white/70 ${openSans.className}`}>Understanding your business, creating site architecture, designing custom interface</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#40FFD9]/20 border border-[#40FFD9] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(64, 255, 217, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#40FFD9] ${montserrat.className}`}>4-10</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Development & Integration</h4>
                <p className={`text-white/70 ${openSans.className}`}>Building your website, customizing AI bot, integrating all systems</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-[#40FFD9]/20 border border-[#40FFD9] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(64, 255, 217, 0.5)' }}
              >
                <span className={`text-xl font-light text-[#40FFD9] ${montserrat.className}`}>11-13</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Testing & Refinement</h4>
                <p className={`text-white/70 ${openSans.className}`}>Quality assurance, your revision round, final adjustments</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full bg-white/20 border border-white flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
              >
                <span className={`text-xl font-light text-white ${montserrat.className}`}>14</span>
              </div>
              <div>
                <h4 className={`text-xl font-normal text-white mb-2 ${montserrat.className}`}>Launch Day</h4>
                <p className={`text-white/70 ${openSans.className}`}>Your complete digital presence is live and converting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Need */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-12 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            What We Need From You
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(98, 212, 249, 0.3)'
              }}
            >
              <h4 className={`text-xl font-normal text-[#62D4F9] mb-6 ${montserrat.className}`}>Business Information</h4>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Products/services with pricing</li>
                <li className={`text-white/80 ${openSans.className}`}>• Terms and conditions</li>
                <li className={`text-white/80 ${openSans.className}`}>• Business description and USPs</li>
                <li className={`text-white/80 ${openSans.className}`}>• How you deliver (physical/digital/service)</li>
              </ul>
            </div>
            
            <div 
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(42, 80, 223, 0.3)'
              }}
            >
              <h4 className={`text-xl font-normal text-[#2A50DF] mb-6 ${montserrat.className}`}>Design & Content</h4>
              <ul className="space-y-3">
                <li className={`text-white/80 ${openSans.className}`}>• Brand colors (if existing)</li>
                <li className={`text-white/80 ${openSans.className}`}>• Competitor sites you like</li>
                <li className={`text-white/80 ${openSans.className}`}>• Existing marketing materials</li>
                <li className={`text-white/80 ${openSans.className}`}>• Product photos/videos</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className={`text-[#40FFD9] font-medium ${openSans.className}`}>
              Remember: You get ONE round of design revisions, so gather feedback internally first!
            </p>
          </div>
        </div>
      </section>

      {/* Hosting Options */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            className={`text-4xl font-normal text-center mb-12 text-white ${montserrat.className}`}
            style={{ letterSpacing: '0.15em' }}
          >
            Flexible Hosting Options
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(64, 255, 217, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(64, 255, 217, 0.3)',
                boxShadow: '0 0 30px rgba(64, 255, 217, 0.1)'
              }}
            >
              <h3 className={`text-2xl font-normal text-[#40FFD9] mb-6 ${montserrat.className}`}>Managed Hosting</h3>
              <p className={`text-3xl font-light text-white mb-6 ${montserrat.className}`}>$500/month</p>
              <ul className="space-y-3 mb-8">
                <li className={`text-white/80 ${openSans.className}`}>✓ All infrastructure costs included</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ SSL certificates</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ 4 hours of updates monthly</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ Performance monitoring</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ Security updates</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ Domain management</li>
                <li className={`text-white/80 ${openSans.className}`}>✓ 24/7 uptime monitoring</li>
              </ul>
              <p className={`text-[#40FFD9] text-center font-medium ${openSans.className}`}>
                90% of clients choose this
              </p>
            </div>
            
            <div 
              className="rounded-3xl p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 className={`text-2xl font-normal text-white/60 mb-6 ${montserrat.className}`}>Self-Host Option</h3>
              <p className={`text-3xl font-light text-white mb-6 ${montserrat.className}`}>+$7,500</p>
              <ul className="space-y-3 mb-8">
                <li className={`text-white/60 ${openSans.className}`}>• Complete code handover</li>
                <li className={`text-white/60 ${openSans.className}`}>• Documentation package</li>
                <li className={`text-white/60 ${openSans.className}`}>• One-time training session</li>
                <li className={`text-white/60 ${openSans.className}`}>• Architecture diagrams</li>
                <li className={`text-white/60 ${openSans.className}`}>• Deployment guides</li>
                <li className={`text-white/60 ${openSans.className}`}>• No ongoing support</li>
                <li className={`text-white/60 ${openSans.className}`}>• Buy-back option: $2,500</li>
              </ul>
              <p className={`text-white/40 text-center text-sm ${openSans.className}`}>
                For enterprises with technical teams
              </p>
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
            Ready for Complete Digital Transformation?
          </h2>
          <p className={`text-xl text-white/80 mb-10 ${openSans.className}`}>
            Join smart businesses who refuse to juggle subscriptions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/chat/homepage-visitor"
              className={`px-8 py-4 bg-[#40FFD9] text-black rounded-xl font-medium hover:bg-white transition-all text-lg ${openSans.className}`}
              style={{
                boxShadow: '0 0 20px #40FFD9, 0 0 30px #40FFD9'
              }}
            >
              Start Your Transformation
            </Link>
            <Link 
              href="/products"
              className={`px-8 py-4 bg-transparent text-white rounded-xl font-medium hover:bg-white/10 transition-all text-lg border-2 border-white/30 hover:border-[#40FFD9] ${openSans.className}`}
            >
              Compare All Options
            </Link>
          </div>
          
          <p className={`mt-8 text-white/60 ${openSans.className}`}>
            Or start smaller with our <Link href="/products/essentials" className="text-[#62D4F9] hover:text-[#40FFD9]">ESSENTIALS</Link> or <Link href="/products/custom" className="text-[#2A50DF] hover:text-[#40FFD9]">CUSTOM</Link> solutions
          </p>
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
