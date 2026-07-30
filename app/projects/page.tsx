import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pb-12">
        {/* Hero — compact, editorial */}
        <section className="relative px-6 lg:px-8 pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/hero-bg.jpeg"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              priority
              quality={80}
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-bg-primary to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-bg-primary to-transparent" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark-bg-primary to-transparent" />
          </div>
          <div
            className="absolute inset-0 z-0 pointer-events-none light-only"
            style={{
              background:
                'radial-gradient(70% 60% at 90% 10%, rgba(42, 80, 223, 0.06) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <AnimateOnScroll>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6">
                Work
              </h1>
              <p className="text-lg text-ink-2 max-w-2xl">
                Production systems we&apos;ve designed, built, and run — from enterprise
                automation to consumer SaaS.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Featured: Enterprise Automation Hub */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <Link href="/projects/automation-hub" className="block group">
                <div className="relative bg-surface-card rounded-3xl p-8 md:p-12 border border-line-soft
                  hover:border-brand-primary/30 transition-all duration-300 hover:glow-blue overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 dark-only"
                    style={{ background: 'radial-gradient(circle, rgba(42, 80, 223, 0.5) 0%, transparent 70%)' }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold">Live</span>
                      <span className="text-ink-3 text-xs">Enterprise automation &middot; Energy sector</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-raleway mb-4 group-hover:text-brand-accent transition-colors">
                      Enterprise Automation Hub
                    </h2>
                    <p className="text-ink-2 mb-6 leading-relaxed max-w-2xl text-lg">
                      Mission-critical sales and operations platform for a major Australian
                      energy company. Connects thirteen business systems, processes hundreds
                      of sales a month, and replaced a $40K/year CRM with a purpose-built
                      job pipeline.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Claude AI', 'OAuth 2.0', 'HMAC-SHA256'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-surface-raised border border-line-soft text-ink-3 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-8 max-w-md mb-8">
                      <div>
                        <div className="text-2xl font-bold font-mono text-ink-1 tracking-editorial">57K+</div>
                        <div className="text-ink-3 text-xs mt-1">Lines of TypeScript</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-mono text-ink-1 tracking-editorial">97</div>
                        <div className="text-ink-3 text-xs mt-1">API endpoints</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-mono text-ink-1 tracking-editorial">13</div>
                        <div className="text-ink-3 text-xs mt-1">Systems connected</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-brand-accent font-semibold group-hover:gap-3 transition-all">
                      View case study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* FirstLight */}
        <section className="px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll delay={100}>
              <Link href="/projects/firstlight" className="block group">
                <div className="bg-surface-card rounded-2xl p-8 md:p-10 border border-line-soft hover:border-amber-500/30 transition-all">
                  <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-start">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold">Live</span>
                        <span className="text-ink-3 text-xs">Consumer SaaS</span>
                      </div>
                      <h3 className="text-2xl font-bold font-raleway mb-3 group-hover:text-amber-500 transition-colors">FirstLight</h3>
                      <p className="text-ink-2 mb-4 leading-relaxed">
                        AI-powered conditions platform for nature photographers. Real-time
                        weather, astronomy data, and intelligent shoot briefings across 150+
                        curated Australian locations.
                      </p>
                      <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm group-hover:gap-3 transition-all">
                        View case study <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {['Next.js 14', 'Claude AI', 'Supabase', 'Google Weather API', 'Google Maps'].map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-surface-raised text-ink-3 text-xs border border-line-soft">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="border-t border-line-soft pt-12">
                <h2 className="text-3xl font-bold font-raleway mb-4">Have a project in mind?</h2>
                <p className="text-ink-2 mb-8 max-w-xl">
                  Tell us what your business needs to run better.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg
                    hover:bg-[#4dc4e8] transition-colors"
                >
                  Get in touch <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
