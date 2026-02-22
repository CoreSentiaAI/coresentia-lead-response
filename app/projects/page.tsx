import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary">
      <Header />

      <main className="pb-12">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/hero-bg.jpeg"
              alt=""
              fill
              className="object-cover object-center opacity-40"
              priority
              quality={80}
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-bg-primary to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-dark-bg-primary to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark-bg-primary to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <AnimateOnScroll>
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Portfolio</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6">
                Our Projects
              </h1>
              <p className="text-lg text-dt-secondary max-w-2xl">
                Production systems we&apos;ve designed and built. From AI automation to full-stack SaaS platforms.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Featured: AI Receptionist */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <Link href="/projects/ai-receptionist" className="block group">
                <div className="relative bg-dark-bg-tertiary rounded-3xl p-8 md:p-12 border border-dark-border
                  hover:border-brand-primary/30 transition-all duration-300 hover:glow-blue overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, rgba(42, 80, 223, 0.5) 0%, transparent 70%)' }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live</span>
                      <span className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-highlight text-xs font-semibold">AI + Automation</span>
                      <span className="px-3 py-1 rounded-full bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs font-semibold">Featured</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-raleway mb-4 group-hover:text-brand-accent transition-colors">
                      AI Receptionist
                    </h2>
                    <p className="text-dt-secondary mb-6 leading-relaxed max-w-2xl text-lg">
                      24/7 AI-powered phone answering, SMS automation, and appointment booking for Australian service businesses. Handles calls, qualifies leads, and books jobs — all automatically.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {['Next.js', 'Claude AI', 'Twilio', 'Supabase', 'Google TTS', 'Vercel'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-8 max-w-md mb-8">
                      <div>
                        <div className="text-2xl font-bold gradient-text font-montserrat">24/7</div>
                        <div className="text-dt-tertiary text-xs uppercase tracking-wide">Availability</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold gradient-text font-montserrat">&lt;10s</div>
                        <div className="text-dt-tertiary text-xs uppercase tracking-wide">Response</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold gradient-text font-montserrat">SMS+Voice</div>
                        <div className="text-dt-tertiary text-xs uppercase tracking-wide">Channels</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-brand-accent font-semibold group-hover:gap-3 transition-all">
                      View Full Case Study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Other Projects */}
        <section className="px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <AnimateOnScroll delay={100}>
                <Link href="/projects/automation-hub" className="block group h-full">
                  <div className="bg-dark-bg-tertiary rounded-2xl p-8 border border-dark-border h-full hover:border-brand-primary/30 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live</span>
                      <span className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-highlight text-xs font-semibold">Enterprise</span>
                    </div>
                    <h3 className="text-xl font-bold font-raleway mb-3 group-hover:text-brand-accent transition-colors">Enterprise Automation Hub</h3>
                    <p className="text-dt-secondary text-sm mb-4 leading-relaxed">
                      Mission-critical sales automation connecting 13 business systems. 57K+ lines of TypeScript, 97 API endpoints, and a custom CRM pipeline — for a major Australian energy company.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Claude AI', 'OAuth 2.0'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-dark-bg-elevated text-dt-tertiary text-xs border border-dark-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm group-hover:gap-3 transition-all">
                      View project <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <Link href="/projects/firstlight" className="block group h-full">
                  <div className="bg-dark-bg-tertiary rounded-2xl p-8 border border-dark-border h-full hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live</span>
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">SaaS + AI</span>
                    </div>
                    <h3 className="text-xl font-bold font-raleway mb-3 group-hover:text-amber-400 transition-colors">FirstLight</h3>
                    <p className="text-dt-secondary text-sm mb-4 leading-relaxed">
                      AI-powered photography conditions platform. Real-time weather, astronomy data, and Claude AI briefings for nature photographers across Australia.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Next.js 14', 'Claude AI', 'Supabase', 'Google APIs', 'Tailwind CSS'].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-dark-bg-elevated text-dt-tertiary text-xs border border-dark-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm group-hover:gap-3 transition-all">
                      View project <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold font-raleway mb-4">Have a Project in Mind?</h2>
              <p className="text-dt-secondary mb-8 max-w-xl mx-auto">
                Let&apos;s talk about what you need built.
              </p>
              <Link
                href="/#contact"
                className="btn-primary px-10 py-4 rounded-full font-semibold text-lg inline-block relative overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="shimmer-span" />
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
