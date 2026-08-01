import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import AnimateOnScroll from './components/AnimateOnScroll'
import HowItWorks from './components/HowItWorks'

const services = [
  {
    num: '01',
    title: 'Process automation',
    description:
      'We map how work actually moves through your business — quotes, jobs, approvals, handoffs — then remove the manual steps. What took a team an afternoon happens in minutes, without anyone touching it.',
  },
  {
    num: '02',
    title: 'Systems integration',
    description:
      'CRM, quoting, accounting, inventory, documents, team comms — most businesses run on systems that don’t talk to each other. We connect them into one pipeline with a single source of truth. And we build on your stack — Microsoft, Google, AWS — whatever your security and governance require.',
  },
  {
    num: '03',
    title: 'SaaS replacement',
    description:
      'The CRM you use 15% of. The per-seat licences that grow with headcount. We build custom platforms that replace the subscriptions you’ve outgrown — designed around your team, owned outright, no seat fees, forever. We’ve replaced a $40K/year enterprise CRM with a purpose-built pipeline in 12 days.',
  },
  {
    num: '04',
    title: 'AI-native software',
    description:
      'Systems with intelligence designed in from the start: validating data before it propagates, drafting the routine work, and answering questions your team used to dig for.',
  },
  {
    num: '05',
    title: 'Company-native AI',
    description:
      'A private AI workspace built into your platform. Claude, GPT, or any frontier model — running against your own data: jobs, customers, documents, history. Every prompt and response logged for full auditability. No per-seat subscriptions, no staff pasting company data into public chatbots. Sanctioned AI, governed properly, owned by you.',
  },
]

const pipelineSteps = [
  { label: 'Contract signed', detail: 'webhook received' },
  { label: 'Data validated', detail: 'AI quality checks' },
  { label: 'Job created in CRM', detail: '28+ fields populated' },
  { label: 'Field team dispatched', detail: 'tasks + documents' },
  { label: 'Inventory ordered', detail: 'draft sales order' },
  { label: 'Team notified', detail: 'real-time chat update' },
]

function LiveTag({ children = 'Live' }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      {children}
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1 relative overflow-x-hidden">
      <Header />

      {/* ========== HERO ========== */}
      <section className="relative px-6 lg:px-8 pt-44 pb-32 lg:pt-56 lg:pb-40">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Headline — deliberately disproportionate */}
            <div className="lg:col-span-8">
              <h1 className="text-display font-semibold font-display">
                We make<br />
                good businesses<br />
                run better
              </h1>

              <div className="mt-12 lg:mt-16">
                <p className="text-ink-2 max-w-md mb-8">
                  We map how your business works, then build the software that
                  makes it faster — automation, integration, and AI-native
                  systems. Brisbane.
                </p>

                <div className="flex items-center gap-6 font-display">
                  <Link
                    href="#contact"
                    className="px-7 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm
                      hover:bg-[#0d86cc] transition-colors text-base"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/projects"
                    className="text-ink-3 hover:text-ink-1 font-medium transition-colors text-sm group"
                  >
                    View the work <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* One number huge, others small */}
            <div className="lg:col-span-3 lg:col-start-10 hidden lg:block border-l border-line-soft pl-8">
              <div className="text-7xl font-semibold font-display text-ink-1 tracking-editorial">15+</div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-2 mb-8">
                SaaS platforms connected for one client
              </div>
              <div className="font-mono text-sm text-ink-2">6 min &mdash; contract to scheduled job</div>
              <div className="font-mono text-sm text-ink-2 mt-2">24/7 &mdash; in production right now</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE BUILD ========== */}
      <section className="relative py-16 px-6 lg:px-8 border-t border-line-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-4">
              <div className="lg:col-span-4">
                <div className="section-label mb-3">Services</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">What we build</h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-6 text-ink-2 self-end">
                For businesses that are already making money — and losing time.
              </p>
            </div>
          </AnimateOnScroll>

          <div>
            {services.map((service, i) => (
              <AnimateOnScroll key={service.num} delay={i * 80}>
                <div className="group grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 border-b border-line-soft items-baseline">
                  <div className="lg:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
                    {service.num}
                  </div>
                  <h3 className="lg:col-span-3 text-xl lg:text-2xl font-semibold font-display">
                    {service.title}
                  </h3>
                  <p className="lg:col-span-8 lg:col-start-5 text-ink-2 leading-relaxed max-w-3xl text-base">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-14">
              <div className="lg:col-span-5">
                <div className="section-label mb-3">Process</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">The build documents itself</h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                One process from first meeting to live platform. No status decks — you
                watch it happen inside the product.
              </p>
            </div>
          </AnimateOnScroll>

          <HowItWorks />
        </div>
      </section>

      {/* ========== SELECTED WORK ========== */}
      <section className="relative py-16 px-6 lg:px-8 border-t border-line-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="mb-12">
              <div className="section-label mb-3">Work</div>
              <h2 className="text-3xl lg:text-4xl font-semibold font-display">Selected work</h2>
            </div>
          </AnimateOnScroll>

          {/* Enterprise Operations Platform — editorial split */}
          <AnimateOnScroll>
            <Link href="/projects/automation-hub" className="block group">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4 mb-6">
                    <LiveTag />
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Enterprise platform &middot; Solar</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold font-display mb-4 group-hover:text-accent-ink transition-colors">
                    Enterprise Operations Platform
                  </h3>
                  <p className="text-ink-2 mb-8 leading-relaxed max-w-xl">
                    Mission-critical operations platform for a national Australian solar
                    company. Fifteen SaaS platforms integrated, 500+ API endpoints, a
                    custom CRM pipeline that replaced a $40K/year platform — and hundreds
                    of sales processed every month, hands-free.
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-ink font-medium text-sm font-display group-hover:gap-3 transition-all">
                    View case study &rarr;
                  </span>
                </div>

                {/* Right — automation pipeline visual */}
                <div className="lg:col-span-2 hidden lg:block">
                  <div className="bg-surface-card rounded p-6 border border-line-soft group-hover:border-accent transition-colors">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs text-ink-3">contract-to-job pipeline</span>
                      <span className="font-mono text-xs text-accent-ink">~6 min</span>
                    </div>
                    <div className="space-y-0">
                      {pipelineSteps.map((step, i) => (
                        <div key={step.label} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${i === 0 ? 'bg-accent' : 'bg-line-strong'}`} />
                            {i < pipelineSteps.length - 1 && (
                              <div className="w-px flex-1 bg-line-soft my-1" />
                            )}
                          </div>
                          <div className={i < pipelineSteps.length - 1 ? 'pb-4' : ''}>
                            <div className="text-sm text-ink-1 font-medium leading-tight font-display">{step.label}</div>
                            <div className="font-mono text-xs text-ink-3 mt-0.5">{step.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* FirstLight — slim secondary row */}
          <AnimateOnScroll>
            <Link href="/projects/firstlight" className="block group mt-12 pt-10 border-t border-line-soft">
              <div className="grid lg:grid-cols-5 gap-4 lg:gap-12 items-baseline">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4 mb-3">
                    <LiveTag />
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Consumer SaaS</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold font-display group-hover:text-accent-ink transition-colors">
                    FirstLight
                  </h3>
                </div>
                <p className="lg:col-span-2 text-ink-2 text-sm leading-relaxed">
                  A conditions-first decision engine for nature photographers — ephemeris,
                  weather, and place synthesised into an honest answer: where to be, and when.
                </p>
              </div>
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-12 pt-8 border-t border-line-soft font-display">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border border-line-strong text-ink-2 text-sm font-medium
                  hover:border-accent hover:text-accent-ink transition-colors"
              >
                View all projects &rarr;
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== TRACK RECORD ========== */}
      <section className="relative py-32 px-6 lg:px-8 border-t border-line-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="section-label mb-3">Track record</div>
          </AnimateOnScroll>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <AnimateOnScroll className="lg:col-span-6">
              {/* The one disproportionately large element on this page */}
              <div className="text-[clamp(5rem,14vw,11rem)] leading-none font-semibold font-display tracking-editorial">
                $1M+
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-3">
                in platform value delivered
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100} className="lg:col-span-5 lg:col-start-8">
              <p className="text-ink-2 text-lg leading-relaxed">
                <span className="font-mono text-ink-1">320K+</span> lines of production
                TypeScript. <span className="font-mono text-ink-1">500+</span> API
                endpoints. <span className="font-mono text-ink-1">15+</span> SaaS
                platforms integrated — running{' '}
                <span className="font-mono text-ink-1">24/7</span> for businesses that
                used to do it by hand.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative py-16 px-6 lg:px-8 border-t border-line-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-4">
              <AnimateOnScroll>
                <div className="section-label mb-3">Contact</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">
                  Let&apos;s build<br />something.
                </h2>
                <p className="text-ink-2">
                  Tell us what&apos;s slowing your business down. We&apos;ll get back to you within 24 hours.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <AnimateOnScroll delay={100}>
                <ContactForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
