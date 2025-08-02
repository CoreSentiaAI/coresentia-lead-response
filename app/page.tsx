import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Zap, Brain, Unlock, DollarSign, Check, X, Calendar, Package, Globe } from 'lucide-react'
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

        {/* Hero Section - Added pt-24 to account for fixed header */}
        <section className="min-h-[100vh] flex items-center justify-center px-6 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight font-montserrat tracking-[0.15em]">
              Build once
              <br />
              <span className="text-[#62D4F9]">Own forever</span>
              <br />
              Host wherever
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 font-light max-w-2xl mx-auto font-montserrat tracking-[0.15em]">
              From fast, CoreSentia-hosted bots, to fully custom AI you can own - automation systems for businesses of any size<br /><br /> 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#packages" 
                className="px-8 py-3 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-lg"
              >
                Explore our solutions →
              </a>
              <Link 
                href="/chat/demo" 
                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-[#62D4F9] transition-all text-lg"
              >
                Meet Ivy – Our Custom AI Bot
              </Link>
            </div>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section id="packages" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-montserrat font-medium text-white mb-6 tracking-[0.15em]">
                Choose your path
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light font-montserrat tracking-[0.1em]">
                One platform. Three ways to launch.<br />
                From fast, budget-friendly bots to complete digital transformation.
              </p>
            </div>

            {/* Package Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Essentials Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all relative">
                <div className="absolute -top-3 left-8 bg-[#62D4F9] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  ⚡ Fastest Launch
                </div>
                <div className="text-[#62D4F9] mb-4">
                  <Zap size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.1em]">Essentials</h3>
                <p className="text-3xl font-bold text-white mb-6">$3,000 <span className="text-lg font-normal text-white/60">+ $300/m</span></p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">5 working days delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-white/80">CoreSentia hosting only</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-white/80">No code ownership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">Basic branding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">PDF quotes via template</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">Standard meeting booking</span>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm">Best for: Budget-conscious, testing the concept</p>
              </div>

              {/* Custom Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-[#62D4F9]/30 rounded-2xl p-8 hover:border-[#62D4F9]/50 transition-all relative shadow-[0_0_30px_rgba(98,212,249,0.1)]">
                <div className="text-[#62D4F9] mb-4">
                  <Brain size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.1em]">Custom</h3>
                <p className="text-3xl font-bold text-white mb-6">$10,000 <span className="text-lg font-normal text-white/60">+ $500/m</span></p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">10 working days delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">You or us host (+50% for self-host)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Optional code ownership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Full custom branding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Smart PDF + Xero optional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Advanced Cal.com booking</span>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm">Best for: Scaling brands</p>
              </div>

              {/* Website + AI Bundle Package */}
              <div className="bg-black/50 backdrop-blur-xl border border-[#62D4F9]/30 rounded-2xl p-8 hover:border-[#62D4F9]/50 transition-all relative shadow-[0_0_30px_rgba(98,212,249,0.1)]">
                <div className="absolute -top-3 left-8 bg-[#40FFD9] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  💡 Most Popular
                </div>
                <div className="text-[#62D4F9] mb-4">
                  <Globe size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-2 tracking-[0.1em]">Website + AI Bundle</h3>
                <p className="text-3xl font-bold text-white mb-6">$15,000 <span className="text-lg font-normal text-white/60">+ $500/m</span></p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#62D4F9]" />
                    <span className="text-white/80">2-week sprint delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">You or us host (+50% for self-host)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Full code ownership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Full custom branding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Smart PDF + Xero optional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#62D4F9] drop-shadow-[0_0_4px_#62D4F9]" />
                    <span className="text-white/80">Integrated booking system</span>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm">Best for: Full digital upgrade</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link 
                href="/products" 
                className="inline-block px-8 py-3 bg-transparent border border-[#62D4F9] text-[#62D4F9] font-semibold rounded-full hover:bg-[#62D4F9] hover:text-black transition-all transform hover:scale-105 text-lg hover:shadow-[0_0_20px_#62D4F9]"
              >
                → Compare packages in detail
              </Link>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
              <div className="text-[#62D4F9] mb-4">
                <Zap size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Response</h3>
              <p className="text-white/60">SMS & email responses in seconds, not hours. Your leads get answers immediately.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
              <div className="text-[#62D4F9] mb-4">
                <Brain size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Qualification</h3>
              <p className="text-white/60">AI that understands intent and qualifies naturally through conversation.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
              <div className="text-[#62D4F9] mb-4">
                <Unlock size={48} className="drop-shadow-[0_0_8px_#62D4F9]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Ownership</h3>
              <p className="text-white/60">Your AI, your code, your choice. No vendor lock-in, ever.</p>
            </div>
          </div>
        </section>

        {/* Improved Subscription Comparison Section */}
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
          {/* Subtle particle background effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute bottom-40 right-20 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300" />
            <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse delay-700" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-montserrat font-medium text-white text-center mb-4 tracking-[0.15em]">
              Stop juggling 12 AI subscriptions
            </h2>
            <p className="text-xl md:text-2xl text-white text-center mb-16 font-light max-w-3xl mx-auto font-montserrat tracking-[0.15em]">
              Businesses waste $2,000+/month on overlapping AI tools. We build you ONE system that does it all.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* The Old Way */}
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1">
                <DollarSign className="w-12 h-12 text-red-500 mb-6" />
                <h3 className="text-2xl font-montserrat text-white mb-6 tracking-[0.1em]">The Old Way</h3>
                <ul className="space-y-4">
                  {[
                    'ChatGPT Pro: $20/month',
                    'Zapier: $69/month',
                    'Intercom: $500/month',
                    'Drift: $2,500/month',
                    'Plus 8 more tools...'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-white/60">
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
              <div className="bg-black/50 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(98,212,249,0.2)]">
                <Zap className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-[0_0_8px_#62D4F9]" />
                <h3 className="text-2xl font-montserrat text-white mb-6 tracking-[0.1em]">The CoreSentia Way</h3>
                <ul className="space-y-4">
                  {[
                    'One custom solution',
                    'Built for YOUR process',
                    'You own the code',
                    'Host anywhere',
                    'No subscriptions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-white/90">
                      <span className="text-cyan-400 mr-3 drop-shadow-[0_0_4px_#62D4F9]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_#62D4F9]">$5k-$25k once + hosting</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                href="/products"
                className="inline-block bg-cyan-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-cyan-300 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#62D4F9]"
              >
                See how much you&apos;ll save
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8 font-montserrat">
              Stop talking about AI.
              <br />
              <span className="text-[#62D4F9]">Start closing with it.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white mb-12 font-light max-w-2xl mx-auto font-montserrat tracking-[0.15em]">
              Experience our AI before you buy. Talk to Ivy and see how she qualifies, quotes, and converts.
            </p>
            <Link 
              href="/chat/homepage-visitor" 
              className="inline-block px-10 py-4 bg-[#62D4F9] text-black font-bold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-xl"
            >
              Chat with Ivy →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/products#essentials" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Essentials</Link></li>
                  <li><Link href="/products#custom" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Custom</Link></li>
                  <li><Link href="/products#bundle" className="hover:text-[#62D4F9] transition-colors">Website + AI Bundle</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/about" className="hover:text-[#62D4F9] transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-[#62D4F9] transition-colors">Contact</Link></li>
                  <li><Link href="/terms" className="hover:text-[#62D4F9] transition-colors">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-white">
                  <li><Link href="/demo" className="hover:text-[#62D4F9] transition-colors">Live Demo</Link></li>
                  <li><Link href="/case-studies" className="hover:text-[#62D4F9] transition-colors">Case Studies</Link></li>
                  <li><Link href="/faq" className="hover:text-[#62D4F9] transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
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
              <p>&copy; 2025 CoreSentia. Build once. Own forever.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
