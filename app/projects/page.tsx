import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

function LiveTag() {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      Live
    </span>
  )
}

export default function ProjectsPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pb-16">
        {/* Hero — compact, editorial */}
        <section className="px-6 lg:px-8 pt-40 pb-16 lg:pt-48 lg:pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-end">
                <h1 className="lg:col-span-4 text-5xl md:text-6xl lg:text-7xl font-semibold font-display">
                  Work
                </h1>
                <p className="lg:col-span-6 lg:col-start-6 text-ink-2 max-w-2xl">
                  Production systems we&apos;ve designed, built, and run — from enterprise
                  automation to consumer SaaS.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Featured: Enterprise Operations Platform */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <Link href="/projects/automation-hub" className="block group">
                <div className="relative bg-surface-card rounded p-8 md:p-12 border border-line-soft
                  group-hover:border-accent transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <LiveTag />
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Enterprise platform &middot; Solar industry</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold font-display mb-4 group-hover:text-accent-ink transition-colors">
                    Enterprise Operations Platform
                  </h2>
                  <p className="text-ink-2 mb-6 leading-relaxed max-w-2xl text-lg">
                    Mission-critical operations platform for a national Australian solar
                    company. Integrates 15+ SaaS platforms, processes hundreds of sales a
                    month, and runs every job from signed contract to final closeout —
                    replacing a $40K/year CRM along the way.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Claude AI', 'OAuth 2.0', 'HMAC-SHA256'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-sm bg-surface-raised border border-line-soft text-ink-3">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* editorial stat line — one big, others inline */}
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
                    <span className="text-5xl font-semibold font-display tracking-editorial">320K+</span>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3">lines of TypeScript</span>
                    <span className="font-mono text-sm text-ink-2">500+ API endpoints &middot; 15+ SaaS platforms</span>
                  </div>

                  <span className="inline-flex items-center gap-2 text-accent-ink font-medium font-display group-hover:gap-3 transition-all">
                    View case study &rarr;
                  </span>
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
                <div className="bg-surface-card rounded p-8 md:p-10 border border-line-soft group-hover:border-accent transition-colors">
                  <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-start">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-4 mb-4">
                        <LiveTag />
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Consumer SaaS</span>
                      </div>
                      <h3 className="text-2xl font-semibold font-display mb-3 group-hover:text-accent-ink transition-colors">FirstLight</h3>
                      <p className="text-ink-2 mb-4 leading-relaxed">
                        A conditions-first decision engine for nature photographers.
                        Ephemeris, weather, season, and place — synthesised into an honest
                        answer about where to be and when, with AI briefings over the top.
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent-ink font-medium text-sm font-display group-hover:gap-3 transition-all">
                        View case study &rarr;
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap gap-2 lg:justify-end font-mono text-[11px]">
                        {['Next.js 14', 'Claude AI', 'Supabase', 'Google Weather API', 'Google Maps'].map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-sm bg-surface-raised text-ink-3 border border-line-soft">
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
                <h2 className="text-3xl font-semibold font-display mb-4">Have a project in mind?</h2>
                <p className="text-ink-2 mb-8 max-w-xl">
                  Tell us what your business needs to run better.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm font-display
                    hover:bg-[#0d86cc] transition-colors"
                >
                  Get in touch &rarr;
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
