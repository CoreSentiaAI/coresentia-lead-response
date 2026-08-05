import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'
import ContactForm from '../components/ContactForm'

// Dedicated ad landing page for consulting-intent search (custom software /
// systems integration / process automation, Brisbane). Noindex by design -
// organic search belongs to the main pages; this one exists for message
// match and a clean conversion path.
export const metadata: Metadata = {
  title: 'Custom software development, Brisbane - CoreSentia',
  description:
    'Brisbane studio building custom platforms that replace SaaS sprawl - process automation, systems integration, AI-native software. $1M+ delivered, running 24/7.',
  robots: { index: false, follow: true },
}

const offers = [
  {
    num: '01',
    title: 'Process automation',
    description:
      'We find where work stalls - quotes, jobs, approvals, handoffs - and remove the manual steps.',
  },
  {
    num: '02',
    title: 'Systems integration',
    description:
      'CRM, quoting, accounting, inventory - one pipeline, one source of truth, on your stack.',
  },
  {
    num: '03',
    title: 'SaaS replacement',
    description:
      'Custom platforms that replace the subscriptions you’ve outgrown. Owned outright, no seat fees.',
  },
]

const stats = [
  ['$1M+', 'in platform value delivered'],
  ['320K+', 'lines of production TypeScript'],
  ['15+', 'SaaS platforms integrated'],
  ['24/7', 'in production right now'],
]

export default function CustomSoftwarePage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-40 pb-0">
        {/* Hero */}
        <section className="relative px-6 lg:px-8 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-struts.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              priority
              quality={82}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, #111110 0%, rgba(17,17,16,0.85) 40%, rgba(17,17,16,0.3) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="section-label mb-3">Custom software development &middot; Brisbane</div>
              <h1 className="text-4xl md:text-6xl font-semibold font-display max-w-3xl mb-6">
                We build the platform your business should be running on
              </h1>
              <p className="text-ink-2 leading-relaxed max-w-xl mb-8">
                Custom software that replaces the spreadsheets and SaaS sprawl -
                process automation, systems integration, and AI-native platforms,
                owned outright by you. Built in weeks, not years.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="#contact"
                  className="px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm
                    hover:bg-[#4dc4e8] transition-colors text-base"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/capability"
                  className="btn text-ink-1 transition-opacity hover:opacity-70 group"
                >
                  Get the capability document <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Proof stats */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {stats.map(([value, label], i) => (
                <AnimateOnScroll key={label} delay={i * 60}>
                  <div className="border-t border-line-soft pt-4">
                    <div className="text-4xl lg:text-5xl font-semibold font-display tracking-editorial">
                      {value}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-2">
                      {label}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Services</div>
              <h2 className="text-3xl font-semibold mb-8 font-display">What we build</h2>
            </AnimateOnScroll>
            <div>
              {offers.map((offer, i) => (
                <AnimateOnScroll key={offer.num} delay={i * 60}>
                  <div className="group grid lg:grid-cols-12 gap-2 lg:gap-8 py-5 border-b border-line-soft items-baseline">
                    <div className="lg:col-span-1 font-mono text-sm group-hover:text-accent-ink transition-colors">
                      {offer.num}
                    </div>
                    <h3 className="lg:col-span-4 text-xl lg:text-2xl font-medium font-display">
                      {offer.title}
                    </h3>
                    <p className="lg:col-span-7 leading-snug text-base">{offer.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll>
              <p className="text-ink-2 max-w-2xl mt-10">
                Proven at enterprise scale: we built the operations platform a
                national Australian solar company now runs on - one pipeline
                connecting fifteen SaaS platforms, in production three weeks
                after the first commit, processing hundreds of sales every month.{' '}
                <Link href="/projects/automation-hub" className="text-accent-ink hover:text-ink-1 transition-colors">
                  Read the case study
                </Link>
                .
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              <div className="lg:col-span-4">
                <AnimateOnScroll>
                  <div className="section-label mb-3">Contact</div>
                  <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">
                    Tell us what&apos;s<br />slowing you down.
                  </h2>
                  <p className="text-ink-2">
                    Where does work stall? What do you pay for and barely use?
                    We&apos;ll tell you what we&apos;d build first - within 24 hours.
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
      </main>

      <Footer />
    </div>
  )
}
