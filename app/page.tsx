import Link from 'next/link'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import AnimateOnScroll from './components/AnimateOnScroll'
import PipelineLoop from './components/PipelineLoop'
import Backdrop from './components/Backdrop'

const services = [
  {
    num: '01',
    title: 'Process automation',
    description:
      "We find where work actually stalls - quotes, jobs, approvals, handoffs - and remove the manual steps. Bring us a blank page or your team's in-flight or finished process map: either way, what your team keyed in by hand - now happens in seconds, automatically.",
  },
  {
    num: '02',
    title: 'Systems integration',
    description:
      'CRM, quoting, accounting, inventory - one pipeline, one source of truth, on your stack: Microsoft, Google, AWS.',
  },
  {
    num: '03',
    title: 'SaaS replacement',
    description:
      'Custom platforms that replace the subscriptions you’ve outgrown. Owned outright, no seat fees - built to replace the enterprise CRM you use a fraction of.',
  },
  {
    num: '04',
    title: 'AI-native software',
    description:
      'Intelligence designed in from the start - validating data, drafting the routine work, answering the questions your team used to dig for.',
  },
  {
    num: '05',
    title: 'Company-native AI',
    description:
      'A private AI workspace on your own data - every prompt logged, governed, owned by you. We\u2019ve shipped this: a governed workspace where leadership asks in plain English and gets live dashboards back.',
  },
]

const processStages = [
  {
    num: '01',
    label: 'Map',
    caption:
      'Stakeholder sessions, process mapped end-to-end - or we build straight from the map your team already owns.',
  },
  {
    num: '02',
    label: 'Build',
    caption: 'Your platform takes shape module by module. Humans stay in the loop.',
  },
  {
    num: '03',
    label: 'Track',
    caption:
      'No Notion, no status decks. The platform is the project tracker - watch progress inside the tool you’re buying.',
  },
  {
    num: '04',
    label: 'Run',
    caption: 'The tracker becomes the operating system. SaaS subscriptions retire behind it.',
  },
]

export default function HomePage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1 relative overflow-x-hidden">
      <Header />

      {/* ========== HERO ========== */}
      <section className="relative px-6 lg:px-8 pt-44 pb-32 lg:pt-56 lg:pb-44 overflow-hidden">
        {/* Structure: shallow steps in raking light - confirmed hero image */}
        <div className="absolute inset-0 z-0 pointer-events-none dark-only">
          <Image
            src="/structure-steps.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-55"
            priority
            quality={82}
          />
          {/* directional darken on the text side + dissolve into the page */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, #111110 0%, rgba(17,17,16,0.82) 34%, rgba(17,17,16,0.25) 62%, rgba(17,17,16,0.05) 100%)' }} />
          <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-display font-semibold font-display">
              We make<br />
              good businesses<br />
              run better
            </h1>

            <div className="mt-12 lg:mt-16">
              <p className="text-ink-2 max-w-md mb-8">
                We replace the spreadsheets and SaaS sprawl your business runs
                on with one intelligent platform - built in weeks, not years.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="#contact"
                  className="px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm
                    hover:bg-[#4dc4e8] transition-colors text-base"
                >
                  Start a project
                </Link>
                <Link
                  href="/projects"
                  className="btn text-ink-1 transition-opacity hover:opacity-70 group"
                >
                  View the work <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </Link>
              </div>

              <div className="mt-14 font-mono text-xs uppercase tracking-[0.08em] text-ink-1">
                15+ SaaS platforms connected &middot; in production three weeks after first commit &middot; 24/7, hands-free
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ONE PIPELINE ========== */}
      <section className="relative py-16 px-6 lg:px-8 border-t border-line-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-10">
              <div className="lg:col-span-5">
                <div className="section-label mb-3">One pipeline</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">
                  Every business runs on the same pipeline
                </h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                The product changes. The spine doesn&apos;t. Watch one platform run five
                very different businesses - and watch what it takes off their hands as
                the work gets more complex.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <PipelineLoop />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                five illustrative businesses &middot; one real method
              </span>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 btn text-accent-ink hover:opacity-70 transition-opacity group"
              >
                Built from real systems - view the work{' '}
                <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== WHAT WE BUILD ========== */}
      <section className="relative overflow-hidden py-16 px-6 lg:px-8 border-t border-line-soft">
        <Backdrop src="/structure-struts.jpg" opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-4">
              <div className="lg:col-span-4">
                <div className="section-label mb-3">Services</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">What we build</h2>
              </div>
              <p className="lg:col-span-6 lg:col-start-6 text-ink-2 self-end">
                For businesses that are already making money - and losing time. Come with
                a blank page or a half-finished process map - we run the whole
                transformation end to end, or plug in as the build engine behind your
                internal change lead.
              </p>
            </div>
          </AnimateOnScroll>

          <div>
            {services.map((service, i) => (
              <AnimateOnScroll key={service.num} delay={i * 60}>
                <div className="group grid lg:grid-cols-12 gap-2 lg:gap-8 py-5 border-b border-line-soft items-baseline">
                  <div className="lg:col-span-1 font-mono text-sm group-hover:text-accent-ink transition-colors">
                    {service.num}
                  </div>
                  <h3 className="lg:col-span-4 text-xl lg:text-2xl font-medium font-display">
                    {service.title}
                  </h3>
                  <p className="lg:col-span-7 leading-snug text-base">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Process - condensed strip */}
          <AnimateOnScroll>
            <div className="mt-14 pt-10">
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-8">
                <div className="lg:col-span-5">
                  <div className="section-label mb-3">Process</div>
                  <h3 className="text-xl lg:text-2xl font-medium font-display">The build documents itself</h3>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 self-end">
                  One process from first meeting to live platform. No status decks - you
                  watch it happen inside the product.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                {processStages.map((stage) => (
                  <div key={stage.num} className="border-t border-line-soft pt-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-mono text-sm text-accent-ink">{stage.num}</span>
                      <span className="text-lg font-medium font-display">{stage.label}</span>
                    </div>
                    <p className="text-sm leading-snug text-ink-2">{stage.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== STRUCTURE BREAK - full bleed ========== */}
      <section className="relative h-[46vh] lg:h-[60vh] overflow-hidden dark-only" aria-hidden>
        <Image
          src="/structure-sweep.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-60"
          quality={82}
          sizes="100vw"
        />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
      </section>

      {/* ========== TRACK RECORD ========== */}
      <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-t border-line-soft">
        <Backdrop src="/structure-curve.jpg" opacity={0.18} />
        <div className="max-w-7xl mx-auto relative z-10">
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
                platforms integrated - running{' '}
                <span className="font-mono text-ink-1">24/7</span> for businesses that
                used to do it by hand.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative overflow-hidden py-16 px-6 lg:px-8 border-t border-line-soft">
        <Backdrop src="/structure-shadowstairs.jpg" opacity={0.1} />
        <div className="max-w-7xl mx-auto relative z-10">
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
