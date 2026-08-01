import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'

function Tag({ children }: { children: string }) {
  return (
    <span className="px-2.5 py-1 rounded-sm bg-surface-raised border border-line-soft text-ink-3 font-mono text-[11px]">
      {children}
    </span>
  )
}

export default function FirstLightPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1 relative overflow-x-hidden">
      <Header />

      <main className="pt-32 pb-0">
        {/* Back to Work */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent-ink hover:text-ink-1 font-medium text-sm transition-colors font-display"
            >
              &larr; Back to work
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Live
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Consumer SaaS &middot; AI-powered</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display mb-6 leading-tight">
                  FirstLight
                </h1>

                <p className="text-lg md:text-xl text-ink-2 mb-8 leading-relaxed">
                  The intelligent helper that tells a nature photographer where to be,
                  when — and what the place is offering, honestly. A conditions-first
                  decision engine that synthesises ephemeris, weather, season, place, and
                  the photographer&apos;s own style into one honest answer.
                </p>

                <a
                  href="https://first-light.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm font-display
                    hover:bg-[#4dc4e8] transition-colors text-base"
                >
                  Visit first-light.com.au &rarr;
                </a>

                <div className="flex flex-wrap gap-2 mt-8">
                  {['Next.js 14', 'Claude AI (Opus)', 'Supabase', 'Google Weather API', 'Google Maps', 'Tailwind CSS', 'Vercel'].map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* What It Does */}
        <section className="bg-surface-alt py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-12">
                <div className="lg:col-span-5">
                  <div className="section-label mb-3">The product</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display">The decision is the product</h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                  Weather apps, ephemeris tools, star charts, and forecast sites all hold
                  the raw data — photographers used to check five of them and still guess.
                  None of them make the call. FirstLight synthesises the lot for a
                  specific shooting intent and hands back a decision.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num: '01', title: 'Live weather', description: 'Real-time conditions, cloud cover, wind, visibility, and precipitation — everything that affects a shoot.' },
                { num: '02', title: 'Light times', description: 'First light, golden hour, blue hour, sunrise, sunset — colour-coded and annotated with exact times.' },
                { num: '03', title: 'Astronomy', description: 'Moon phase, rise/set times, Bortle rating for light pollution, and aurora probability for southern Australia.' },
                { num: '04', title: 'AI briefings', description: 'Claude AI generates personalised creative advice — composition, camera settings, weather reframing, and shot ideas.' },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 100}>
                  <div className="bg-surface-card border border-line-soft rounded p-6 h-full hover:border-accent transition-colors">
                    <div className="font-mono text-xs text-ink-3 mb-3">{item.num}</div>
                    <h3 className="text-lg font-semibold font-display mb-2">{item.title}</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="mb-12 max-w-2xl">
                <div className="section-label mb-3">Features</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">Built for photographers who notice every detail</h2>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-6">
              <AnimateOnScroll>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <div className="font-mono text-xs text-accent-ink mb-3">/scout</div>
                  <h3 className="text-xl font-semibold font-display mb-3">Scout AI assistant</h3>
                  <p className="text-ink-2 text-base leading-relaxed mb-4">
                    A draggable, expandable AI chat panel powered by Claude. Photographers
                    ask natural questions and get location-aware, condition-aware creative
                    advice — not generic tourism tips.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Quick Brief', 'Shot Ideas', 'Best Times', 'Full Briefing'].map((action) => (
                      <Tag key={action}>{action}</Tag>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={100}>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <div className="font-mono text-xs text-accent-ink mb-3">/locations</div>
                  <h3 className="text-xl font-semibold font-display mb-3">Hand-vetted locations</h3>
                  <p className="text-ink-2 text-base leading-relaxed mb-4">
                    A curated library of parks, dark-sky anchors, and shooting locations —
                    every row personally vetted before it publishes. No scraped databases:
                    if FirstLight says a viewpoint faces south-east, someone has stood
                    there and checked.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Coastal', 'Alpine', 'Waterfall', 'Forest', 'Astro', 'Urban'].map((type) => (
                      <Tag key={type}>{type}</Tag>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <div className="font-mono text-xs text-ink-3 mb-3">/conditions</div>
                  <h3 className="text-xl font-semibold font-display mb-3">Conditions dashboard</h3>
                  <p className="text-ink-2 text-base leading-relaxed">
                    Live conditions at a glance — weather, light times, moon phase, wind
                    maps, and satellite imagery. Designed for quick field checks with
                    large touch targets (44px minimum).
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <div className="font-mono text-xs text-ink-3 mb-3">/profiles</div>
                  <h3 className="text-xl font-semibold font-display mb-3">Style profiles</h3>
                  <p className="text-ink-2 text-base leading-relaxed">
                    Photographers set their mood, subjects, and palette preferences. AI
                    briefings adapt — a moody seascape shooter gets different advice than a
                    bright landscape photographer for the same conditions.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Stats — editorial */}
        <section className="bg-surface-alt py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <AnimateOnScroll className="lg:col-span-5">
                <div className="text-[clamp(4rem,10vw,8rem)] leading-none font-semibold font-display tracking-editorial">
                  8
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-3">
                  condition profiles — astro to seascape
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100} className="lg:col-span-6 lg:col-start-7">
                <p className="text-ink-2 text-lg leading-relaxed">
                  <span className="font-mono text-ink-1">7</span> integrated data sources
                  and a <span className="font-mono text-ink-1">16-day</span> forecast
                  horizon that&apos;s honest about confidence decay — with{' '}
                  <span className="font-mono text-ink-1">Claude</span>-powered briefings
                  over the top.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll>
                <div>
                  <div className="section-label mb-3">Design</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-6">Designed for people who notice design</h2>
                  <p className="text-ink-2 leading-relaxed mb-6">
                    Photographers have an eye for detail. The UI had to be premium but
                    functional — dark twilight gradients, golden accent tones that evoke
                    sunrise, and a data-forward layout that gets out of the way.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Dark mode twilight palette (#020408 → #0f172a)',
                      'Golden amber accents for warmth and urgency',
                      'Indigo accents for night and astro features',
                      'Large touch targets for outdoor field use',
                      'Custom typography: Sora, Plus Jakarta Sans, IBM Plex Mono',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-2 text-sm">
                        <span className="font-mono text-ink-3 shrink-0">&mdash;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-surface-card border border-line-soft rounded p-8 lg:p-10">
                  <div className="space-y-6">
                    {[
                      { principle: 'The UI gets out of the way', detail: 'Data forward, chrome minimal — conditions readable at a glance from a car seat at 4:30am.' },
                      { principle: 'Honest first, encouraging second', detail: 'Confidence decays as the forecast horizon stretches, and the app says so. It will never call 100% cloud "prime astro" — trust is the product.' },
                      { principle: 'The physics and the poetry', detail: 'A deterministic engine computes the ephemeris, dark windows, and scores. The AI narrates over the engine\'s output — it never invents what the physics didn\'t compute.' },
                    ].map((item, i) => (
                      <div key={item.principle} className={i > 0 ? 'pt-6 border-t border-line-soft' : ''}>
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-accent-ink shrink-0">0{i + 1}</span>
                          <div>
                            <h4 className="font-semibold font-display text-base mb-1">{item.principle}</h4>
                            <p className="text-ink-2 text-sm leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">Have a project like this?</h2>
              <p className="text-ink-2 mb-8 max-w-xl">
                We build production SaaS platforms with AI integration, real-time data,
                and premium design.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm font-display
                  hover:bg-[#4dc4e8] transition-colors"
              >
                Start a project
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
