import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import JobWriter from '../../components/JobWriter'
import Backdrop from '../../components/Backdrop'

function Tag({ children }: { children: string }) {
  return (
    <span className="px-2.5 py-1 rounded-sm bg-surface-raised border border-line-soft text-ink-3 font-mono text-[11px]">
      {children}
    </span>
  )
}

const ideas = [
  {
    num: '01',
    title: 'One record of truth',
    description:
      'Every job lives as a single canonical record from lead to final closeout. Every module — sales, scheduling, field operations, finance — is a UI reading from and writing into that same record. There are no parallel truths to reconcile.',
  },
  {
    num: '02',
    title: 'Provenance on every write',
    description:
      'Every field records where it came from, who changed it, and why. When a manager asks "why does this say what it says?", the answer is one click away — not an archaeology project.',
  },
  {
    num: '03',
    title: 'Facts vs artifacts',
    description:
      'If someone would ask "what\'s the X on this job?" — it\'s a fact, and it lives on the record. Photos, signed PDFs, and checklist responses are artifacts, and hang off it. The distinction is what keeps a wide truth table elegant instead of chaotic.',
  },
  {
    num: '04',
    title: 'Forms are UIs, not submission blobs',
    description:
      'An installer filling out a site inspection isn\'t "submitting a form" — they\'re populating thirty facts on the job record that happen to be captured in the field. Design for the data, and the workflows take care of themselves.',
  },
]

export default function AutomationHubPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1 relative overflow-x-hidden">
      <Header />

      <main className="pt-32 pb-0">
        {/* Back to Work */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent-ink hover:text-ink-1 btn transition-colors"
            >
              &larr; Back to work
            </Link>
          </div>
        </section>

        {/* Hero Section — concrete fins: repeated modules, one rhythm */}
        <section className="relative px-6 lg:px-8 pb-16 pt-8 -mt-8 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-fins.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              priority
              quality={82}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, #111110 0%, rgba(17,17,16,0.88) 40%, rgba(17,17,16,0.3) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Live in production
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Enterprise platform &middot; Solar industry</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display mb-6 leading-tight">
                  Enterprise Operations Platform
                </h1>

                <p className="text-lg md:text-xl text-ink-2 mb-8 leading-relaxed">
                  Mission-critical operations platform for a national Australian solar
                  company. What began as sales automation now runs the business
                  end-to-end — 15+ integrated SaaS platforms, 500+ API endpoints, and
                  every job managed from signed contract to final closeout. Hundreds of
                  sales processed, hands-free — on a custom pipeline built to replace
                  the enterprise CRM at the centre of the old stack.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Claude AI', 'OAuth 2.0', 'HMAC-SHA256', 'Vercel', 'React Flow'].map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
                  Client anonymised by design &mdash; every engagement gets the same discretion.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Scale — editorial, one number huge */}
        <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-curve.jpg" opacity={0.22} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <AnimateOnScroll className="lg:col-span-6">
                <div className="text-[clamp(4.5rem,12vw,10rem)] leading-none font-semibold font-display tracking-editorial">
                  320K+
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-3">
                  lines of production TypeScript
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100} className="lg:col-span-5 lg:col-start-8">
                <p className="text-ink-2 text-lg leading-relaxed">
                  <span className="font-mono text-ink-1">500+</span> API endpoints.{' '}
                  <span className="font-mono text-ink-1">15+</span> integrated SaaS
                  platforms. <span className="font-mono text-ink-1">2,100+</span> commits
                  and <span className="font-mono text-ink-1">289</span> database
                  migrations — shipped by one person in nine months.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Watch a sale become a job — the platform writing a job page, live */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-14">
                <div className="lg:col-span-5">
                  <div className="section-label mb-3">Live sequence</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display">Watch a sale become a job</h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                  This is the real sequence the platform runs when a contract is signed —
                  compressed to fourteen seconds. Watch it write the job
                  page.
                </p>
              </div>
            </AnimateOnScroll>
            <JobWriter />
          </div>
        </section>

        {/* What It Does */}
        <section className="relative overflow-hidden py-16 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-struts.jpg" opacity={0.13} />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-12">
                <div className="lg:col-span-5">
                  <div className="section-label mb-3">The platform</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display">It started with sales automation</h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                  The first two products: a sales automation engine and a complete job
                  management pipeline — both running on the same infrastructure, connected
                  to every system the business uses.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-6">
              <AnimateOnScroll>
                <div className="bg-surface-card border border-line-soft rounded p-8 h-full">
                  <div className="mb-6">
                    <div className="font-mono text-xs text-accent-ink mb-2">/engine</div>
                    <h3 className="text-xl font-medium font-display">Sales Automation Engine</h3>
                    <p className="text-ink-3 font-mono text-xs mt-1">webhook-driven, zero manual entry</p>
                  </div>
                  <p className="text-ink-2 text-base leading-relaxed mb-6">
                    When a contract is signed on the quoting platform, the Hub takes over.
                    It validates the data with AI, creates jobs in the CRM, dispatches tasks
                    to the field team, generates Google Drive folders, creates inventory
                    orders, and updates the sales pipeline — all in minutes, hands-free.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Dual-platform support (two separate quoting systems)',
                      'AI validation catches data quality issues before they propagate',
                      'Parallel processing with graceful degradation',
                      'Automatic Google Drive folder structure per job',
                      'Signed contract PDF archival and permanent linking',
                      'Real-time team notifications via Google Chat',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-2">
                        <span className="font-mono text-ink-3 shrink-0">&mdash;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-surface-card border border-line-soft rounded p-8 h-full">
                  <div className="mb-6">
                    <div className="font-mono text-xs text-accent-ink mb-2">/pipeline</div>
                    <h3 className="text-xl font-medium font-display">Job Management Hub</h3>
                    <p className="text-ink-3 font-mono text-xs mt-1">custom CRM pipeline — the enterprise CRM replacement</p>
                  </div>
                  <p className="text-ink-2 text-base leading-relaxed mb-6">
                    A complete 17-stage installation pipeline across 7 phases — from
                    preliminary assessment through to final closeout. First version live
                    within two weeks. Built to replace an enterprise CRM the business
                    used a fraction of.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      '17 stages across 7 pipeline phases with linear progression',
                      'Per-stage task management with owner classification',
                      'Exit criteria validation with "warn don\'t block" philosophy',
                      'Job Overview drawer — helicopter view of all stages',
                      'Inline-editable fields with optimistic UI updates',
                      'Activity timeline, SLA tracking, and full audit trail',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-2">
                        <span className="font-mono text-ink-3 shrink-0">&mdash;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Platform domains */}
            <AnimateOnScroll>
              <div className="mt-12 pt-10 border-t border-line-soft">
                <p className="text-ink-2 mb-6 max-w-2xl">
                  <span className="text-ink-1 font-medium">Then it kept growing.</span>{' '}
                  Over nine months the platform absorbed one operational domain after
                  another — each one replacing a manual process, a spreadsheet, or a
                  licence the business no longer needed:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sales pipeline',
                    'Job management',
                    'Installation operations',
                    'Scheduling & installer allocation',
                    'Inventory & purchasing',
                    'Commissions & finance',
                    'Field safety & forms',
                    'Fleet & asset management',
                    'Helpdesk & internal ops',
                    'Leave management',
                    'Executive reporting',
                  ].map((domain) => (
                    <span key={domain} className="px-3 py-1.5 rounded-sm bg-surface-card border border-line-soft text-ink-2 text-sm font-display">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Integration Architecture */}
        <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-grid.jpg" opacity={0.18} />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-12">
                <div className="lg:col-span-5">
                  <div className="section-label mb-3">Architecture</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display">15+ platforms, one nervous system</h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                  Every integration has its own authentication pattern, error handling, and
                  retry logic. The platform sits at the centre and orchestrates them all.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: '01', title: 'Solar Design & Quoting', description: 'OpenSolar, Pylon, and SolarQuotes — webhook receivers processing signed contracts and inbound leads with isolated failure domains.' },
                { num: '02', title: 'CRM & Sales', description: 'HubSpot and Accelo — bidirectional sync that auto-creates jobs, populates 28+ custom fields, and manages the full lifecycle.' },
                { num: '03', title: 'Field Service & Jobs', description: 'AroFlo, ServiceM8, and FastField — job dispatch, mobile field forms, and installation workflows in both directions.' },
                { num: '04', title: 'Finance & Inventory', description: 'Xero, Unleashed, and Stripe — smart product matching, draft sales orders, invoicing, and commission reconciliation.' },
                { num: '05', title: 'Google Workspace', description: 'Gmail, Drive, Chat, and Workspace admin — structured document hierarchies, contract archival, and real-time team notifications.' },
                { num: '06', title: 'AI & Data', description: 'An AI layer validates incoming data before it propagates, and Nearmap aerial imagery feeds site assessment workflows.' },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 80}>
                  <div className="bg-surface-card border border-line-soft rounded p-6 h-full hover:border-accent transition-colors">
                    <div className="font-mono text-xs text-ink-3 mb-3">{item.num}</div>
                    <h3 className="text-base font-medium font-display mb-2">{item.title}</h3>
                    <p className="text-ink-2 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll>
              <p className="mt-10 text-ink-2 text-lg">
                Different stack? Every integration above was learned from scratch.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="mb-12 max-w-2xl">
                <div className="section-label mb-3">Enterprise-grade</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">No corners cut</h2>
                <p className="text-ink-2">
                  HMAC webhook validation, role-based access control, atomic database
                  operations, and comprehensive audit logging throughout.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-6">
              <AnimateOnScroll>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <h3 className="text-lg font-medium font-display mb-4">Security &amp; reliability</h3>
                  <div className="space-y-3 font-mono text-sm">
                    {[
                      'HMAC-SHA256 webhook signature validation',
                      'RBAC with Google Workspace SSO',
                      'PostgreSQL atomic operations (race condition prevention)',
                      'OAuth 2.0 token management with auto-refresh',
                      'Complete audit trail — every action logged',
                      'Replay capability — reprocess any event at any time',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="text-accent-ink shrink-0">&mdash;</span>
                        <span className="text-ink-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <h3 className="text-lg font-medium font-display mb-4">Scale &amp; architecture</h3>
                  <div className="space-y-3 font-mono text-sm">
                    {[
                      '1,300+ source files across app, API, lib, and types',
                      '500+ API endpoints serving frontend and integrations',
                      '289 database migrations tracking schema evolution',
                      'Dual-table architecture with isolated failure domains',
                      'Parallel processing with graceful degradation',
                      'Vercel serverless — auto-scaling, zero ops',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="text-ink-3 shrink-0">&mdash;</span>
                        <span className="text-ink-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-shadowstairs.jpg" opacity={0.15} />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="mb-4 max-w-2xl">
                <div className="section-label mb-3">Design philosophy</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">The ideas that keep it elegant</h2>
                <p className="text-ink-2">
                  A platform this size stays maintainable because of a few disciplines,
                  applied without exception.
                </p>
              </div>
            </AnimateOnScroll>

            <div>
              {ideas.map((idea, i) => (
                <AnimateOnScroll key={idea.num} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-line-soft items-baseline">
                    <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
                      {idea.num}
                    </div>
                    <h3 className="md:col-span-4 text-lg lg:text-xl font-medium font-display">
                      {idea.title}
                    </h3>
                    <p className="md:col-span-7 text-ink-2 leading-relaxed text-base">
                      {idea.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Structure break — full bleed */}
        <section className="relative h-[40vh] lg:h-[52vh] overflow-hidden dark-only" aria-hidden>
          <Image
            src="/structure-sweep.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-60"
            quality={82}
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-0 h-36" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 h-36" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
        </section>

        {/* The Build Story */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-6">Three weeks to production. Nine months to a platform.</h2>
                  <p className="text-ink-2 leading-relaxed mb-8">
                    The first automation was live in production three weeks after the
                    first commit. The full v1 platform took fifteen weeks. Nine months
                    in, it runs most of the business — 320,000+ lines of production code
                    that an equivalent agency build would scope well past $1M.
                  </p>
                  <div className="space-y-6">
                    {[
                      { title: 'Iteration in hours, not sprint cycles', body: 'Same-day bug fixes. Features shaped with the people who use them, shipped while the conversation is still warm.' },
                      { title: 'Complete ownership', body: 'Client owns every line of code. No vendor lock-in, no external dependencies, no retainer agreements.' },
                      { title: 'Built to replace an enterprise CRM', body: 'Custom Job Management Hub, first version live within two weeks. 17 stages, task management, exit criteria — purpose-built for the business.' },
                    ].map((item, i) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <span className="font-mono text-xs text-ink-3 mt-1.5 shrink-0">0{i + 1}</span>
                        <div>
                          <h4 className="font-semibold font-display text-sm mb-1">{item.title}</h4>
                          <p className="text-ink-2 text-sm">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-surface-card border border-line-soft rounded p-8">
                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-accent-ink">{'// Platform at a glance'}</div>
                    <div className="text-ink-3">
                      const platform = {'{'}
                    </div>
                    {[
                      ['integrations', '15+'],
                      ['apiEndpoints', '500+'],
                      ['linesOfCode', '320,000+'],
                      ['commits', '2,100+'],
                      ['buildTime', '9 months, ongoing'],
                      ['equivalentScope', '$1M+'],
                      ['security', 'enterprise-grade'],
                      ['status', 'live in production'],
                    ].map(([key, value]) => (
                      <div key={key} className="pl-4 text-ink-3">
                        {key}: <span className="text-ink-1">&apos;{value}&apos;</span>,
                      </div>
                    ))}
                    <div className="text-ink-3">{'}'}</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">Need this kind of automation?</h2>
              <p className="text-ink-2 mb-8 max-w-xl">
                We build mission-critical platforms that connect your entire business — at
                a fraction of the traditional cost.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm font-display
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
