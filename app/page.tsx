import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import AnimateOnScroll from './components/AnimateOnScroll'

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
      'CRM, quoting, accounting, inventory, documents, team comms — most businesses run on systems that don’t talk to each other. We connect them into one pipeline with a single source of truth.',
  },
  {
    num: '03',
    title: 'Internal platforms',
    description:
      'Custom dashboards, job pipelines, and operational tools built around the way your team works — replacing the spreadsheets and the enterprise licences you only use 15% of.',
  },
  {
    num: '04',
    title: 'AI-native software',
    description:
      'Systems with intelligence designed in from the start: validating data before it propagates, drafting the routine work, and answering questions your team used to dig for.',
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-1 relative overflow-x-hidden">
      <Header />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[100dvh] flex items-center px-6 lg:px-8 pt-24 pb-8 overflow-hidden">
        {/* Background: atmospheric image (dark) / quiet gradient (light) */}
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/hero-bg.jpeg"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
            quality={80}
          />
          {/* Top fade — ensures header area stays clean */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-bg-primary to-transparent" />
          {/* Bottom fade — blends into next section */}
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-dark-bg-primary to-transparent" />
          {/* Left fade — protects text readability */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark-bg-primary to-transparent" />
        </div>
        <div
          className="absolute inset-0 z-0 pointer-events-none light-only"
          style={{
            background:
              'radial-gradient(80% 60% at 85% 20%, rgba(42, 80, 223, 0.07) 0%, transparent 70%), radial-gradient(60% 50% at 10% 90%, rgba(98, 212, 249, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left column — 60% */}
            <div className="lg:col-span-3">
              <h1 className="text-display font-bold font-raleway">
                We make<br />
                good businesses<br />
                run better
              </h1>

              {/* Grouped subtext + CTA — pulled away from headline */}
              <div className="mt-12 lg:mt-16">
                <p className="text-lg text-ink-2 max-w-md mb-8 leading-relaxed">
                  We map how your business works, then build the software that
                  makes it faster — automation, integration, and AI-native
                  systems. Brisbane.
                </p>

                <div className="flex items-center gap-6">
                  <Link
                    href="#contact"
                    className="px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg
                      hover:bg-[#4dc4e8] transition-colors text-base
                      shadow-[0_0_20px_rgba(98,212,249,0.3)]"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/projects"
                    className="text-ink-3 hover:text-ink-1 font-medium transition-colors text-sm group inline-flex items-center gap-1.5"
                  >
                    View our work
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column — stats with left border anchor */}
            <div className="lg:col-span-2 hidden lg:flex flex-col gap-10 border-l border-line-soft pl-10 py-4">
              <div>
                <div className="text-5xl font-bold font-mono text-ink-1 tracking-editorial">13</div>
                <div className="text-sm text-ink-3 mt-2">business systems connected for one client</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-mono text-ink-1 tracking-editorial">6 min</div>
                <div className="text-sm text-ink-3 mt-2">from signed contract to scheduled job</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-mono text-ink-1 tracking-editorial">24/7</div>
                <div className="text-sm text-ink-3 mt-2">systems running in production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE BUILD ========== */}
      <section className="relative py-[6vh] lg:py-[8vh] px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="mb-4 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">What we build</h2>
              <p className="text-ink-2">
                For businesses that are already making money — and losing time.
              </p>
            </div>
          </AnimateOnScroll>

          <div>
            {services.map((service, i) => (
              <AnimateOnScroll key={service.num} delay={i * 80}>
                <div className="group grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 border-b border-line-soft items-baseline">
                  <div className="lg:col-span-1 font-mono text-sm text-ink-3 group-hover:text-brand-accent transition-colors">
                    {service.num}
                  </div>
                  <h3 className="lg:col-span-4 text-xl lg:text-2xl font-semibold font-raleway">
                    {service.title}
                  </h3>
                  <p className="lg:col-span-7 text-ink-2 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SELECTED WORK ========== */}
      <section className="relative py-[6vh] lg:py-[8vh] px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Selected work</h2>
            </div>
          </AnimateOnScroll>

          {/* Enterprise Automation Hub — editorial split */}
          <AnimateOnScroll>
            <Link href="/projects/automation-hub" className="block group">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* Left — project details */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold">Live</span>
                    <span className="text-ink-3 text-xs">Enterprise automation</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-raleway mb-4 group-hover:text-brand-accent transition-colors">
                    Enterprise Automation Hub
                  </h3>
                  <p className="text-ink-2 mb-8 leading-relaxed max-w-xl">
                    Mission-critical sales and operations platform for a major Australian
                    energy company. Thirteen business systems connected, a custom CRM
                    pipeline that replaced a $40K/year platform, and hundreds of sales
                    processed every month — hands-free.
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    View case study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Right — automation pipeline visual */}
                <div className="lg:col-span-2 hidden lg:block">
                  <div className="bg-surface-card rounded-2xl p-6 border border-line-soft
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs text-ink-3">contract-to-job pipeline</span>
                      <span className="font-mono text-xs text-brand-accent">~6 min</span>
                    </div>
                    <div className="space-y-0">
                      {pipelineSteps.map((step, i) => (
                        <div key={step.label} className="flex gap-4">
                          {/* Rail */}
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${i === 0 ? 'bg-brand-highlight' : 'bg-brand-primary/60'}`} />
                            {i < pipelineSteps.length - 1 && (
                              <div className="w-px flex-1 bg-line-strong my-1" />
                            )}
                          </div>
                          <div className={i < pipelineSteps.length - 1 ? 'pb-4' : ''}>
                            <div className="text-sm text-ink-1 font-medium leading-tight">{step.label}</div>
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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold">Live</span>
                    <span className="text-ink-3 text-xs">Consumer SaaS</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-raleway group-hover:text-brand-accent transition-colors">
                    FirstLight
                  </h3>
                </div>
                <p className="lg:col-span-2 text-ink-2 text-sm leading-relaxed">
                  AI-powered conditions platform for nature photographers — live weather,
                  astronomy data, and intelligent shoot briefings across 150+ Australian locations.
                </p>
              </div>
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-12 pt-8 border-t border-line-soft">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-line-strong text-ink-2 text-sm font-medium
                  hover:border-brand-highlight hover:text-brand-highlight transition-all"
              >
                View all projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== TRACK RECORD ========== */}
      <section className="relative py-[6vh] lg:py-[8vh] px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-10">Track record</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-4 gap-10 md:gap-12">
            {[
              { value: '$350K+', label: 'In automation value delivered' },
              { value: '80K+', label: 'Lines of production TypeScript shipped' },
              { value: '20+', label: 'APIs and business systems integrated' },
              { value: '24/7', label: 'Production systems, running right now' },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div>
                  <div className="text-5xl md:text-6xl font-bold font-mono text-ink-1 mb-3 tracking-editorial">{stat.value}</div>
                  <div className="text-ink-3 text-sm">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative py-[6vh] lg:py-[8vh] px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left — heading */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">
                  Let&apos;s build<br />something.
                </h2>
                <p className="text-ink-2">
                  Tell us what&apos;s slowing your business down. We&apos;ll get back to you within 24 hours.
                </p>
              </AnimateOnScroll>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll delay={100}>
                <ContactForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  )
}
