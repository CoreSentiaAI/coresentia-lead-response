import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background with subtle particle effect */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/CoreSentia_page_background.jpg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/CoreSentia_Transparent_Logo.png"
              alt="CoreSentia" 
              width={40} 
              height={40}
              className="drop-shadow-[0_0_10px_#62D4F9]"
            />
            <span className="text-xl font-light tracking-wider text-white font-montserrat">
              coresentia
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-white/80 hover:text-[#62D4F9] transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-white/80 hover:text-[#62D4F9] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-[#62D4F9] transition-colors">
              Contact
            </Link>
            <Link 
              href="/chat/homepage-visitor" 
              className="px-6 py-2 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105"
            >
              Chat with Ivy
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight font-montserrat tracking-wider">
            Build once
            <br />
            <span className="text-[#62D4F9]">Own forever</span>
            <br />
            Host wherever
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto">
            Custom AI, built for you. Host it with us or take it anywhere. 
            No lock-ins, total transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-lg"
            >
              Explore our solutions →
            </Link>
            <Link 
              href="/chat/demo" 
              className="px-8 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-[#62D4F9] transition-all text-lg"
            >
              Try Ivy Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="relative z-10 py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
            <div className="text-[#62D4F9] text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Instant Response</h3>
            <p className="text-white/60">SMS & email responses in seconds, not hours. Your leads get answers immediately.</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
            <div className="text-[#62D4F9] text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3">Smart Qualification</h3>
            <p className="text-white/60">AI that understands intent and qualifies naturally through conversation.</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#62D4F9]/30 transition-all">
            <div className="text-[#62D4F9] text-4xl mb-4">🔓</div>
            <h3 className="text-xl font-semibold mb-3">Complete Ownership</h3>
            <p className="text-white/60">Your AI, your code, your choice. No vendor lock-in, ever.</p>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 font-montserrat">
            Stop juggling 12 AI subscriptions
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Businesses waste $2,000+/month on overlapping AI tools. We build you ONE system that does it all.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-red-400">The Old Way</h3>
              <ul className="space-y-3 text-white/60">
                <li>❌ ChatGPT Pro: $20/month</li>
                <li>❌ Zapier: $69/month</li>
                <li>❌ Intercom: $500/month</li>
                <li>❌ Drift: $2,500/month</li>
                <li>❌ Plus 8 more tools...</li>
              </ul>
              <p className="mt-4 text-2xl font-bold text-red-400">$2,000+/month forever</p>
            </div>
            
            <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-green-400">The CoreSentia Way</h3>
              <ul className="space-y-3 text-white/60">
                <li>✅ One custom solution</li>
                <li>✅ Built for YOUR process</li>
                <li>✅ You own the code</li>
                <li>✅ Host anywhere</li>
                <li>✅ No subscriptions</li>
              </ul>
              <p className="mt-4 text-2xl font-bold text-green-400">$5k-$25k once + hosting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 font-montserrat">
            Stop talking about AI.
            <br />
            <span className="text-[#62D4F9]">Start closing with it.</span>
          </h2>
          
          <p className="text-xl text-white/60 mb-12">
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
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/products#essentials" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Essentials</Link></li>
                <li><Link href="/products#custom" className="hover:text-[#62D4F9] transition-colors">Lead-to-Deal Custom</Link></li>
                <li><Link href="/products#bundle" className="hover:text-[#62D4F9] transition-colors">Website + AI Bundle</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/about" className="hover:text-[#62D4F9] transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#62D4F9] transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-[#62D4F9] transition-colors">Terms</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link href="/demo" className="hover:text-[#62D4F9] transition-colors">Live Demo</Link></li>
                <li><Link href="/case-studies" className="hover:text-[#62D4F9] transition-colors">Case Studies</Link></li>
                <li><Link href="/faq" className="hover:text-[#62D4F9] transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-white/60 mb-4">Brisbane, Australia</p>
              <Link 
                href="mailto:hello@coresentia.com" 
                className="text-[#62D4F9] hover:text-[#40FFD9] transition-colors"
              >
                hello@coresentia.com
              </Link>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40">
            <p>&copy; 2025 CoreSentia. Build once. Own forever.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
