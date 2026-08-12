import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'
import Backdrop from '../components/Backdrop'

const principles = [
  {
    num: '01',
    title: 'Ship real code',
    description:
      'No WordPress templates, no drag-and-drop, no six-month discovery phases. We write production code using modern frameworks, and working software shows up early in the engagement - not at the end.',
  },
  {
    num: '02',
    title: 'Start from how the business works',
    description:
      'Software fails when it ignores how the business actually runs. We can do the mapping - who touches what, where the time goes, what breaks. If your transformation team is already doing it or has done it, we build straight from their map. The system design follows the process either way.',
  },
  {
    num: '03',
    title: 'AI-native thinking',
    description:
      "We don't bolt AI on as an afterthought. We design systems with intelligence at the core - validating data before it propagates, drafting the routine work, answering the questions your team used to dig for.",
  },
  {
    num: '04',
    title: 'You own everything',
    description:
      'Every line of code, the infrastructure, the documentation. No vendor lock-in, no licensing fees on your own system, no retainer required to keep what you paid for.',
  },
]

export default function AboutPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-40 pb-0">
        {/* Hero Section - coffered grid: repeated elements resolving into one form */}
        <section className="relative px-6 lg:px-8 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-grid.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-35"
              priority
              quality={82}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, #111110 0%, rgba(17,17,16,0.85) 40%, rgba(17,17,16,0.3) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-end">
                <h1 className="lg:col-span-5 text-5xl md:text-6xl font-semibold font-display">
                  Software that ships
                </h1>
                <p className="lg:col-span-6 lg:col-start-7 text-ink-2 leading-relaxed">
                  CoreSentia is an AI-native development studio based in Brisbane. We build
                  the systems that make established businesses run better - automation,
                  integration, and production software.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">The story</div>
              <h2 className="text-3xl font-semibold mb-10 font-display">Order out of complexity</h2>
            </AnimateOnScroll>
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <AnimateOnScroll>
                  <div className="space-y-5 text-ink-2 leading-relaxed">
                    <p>
                      I&apos;m Ramsay Hatfield, and CoreSentia is my studio. I&apos;ve spent
                      the last few years inside a national Australian solar company, where I
                      built the operations platform the business now runs on - 320,000+
                      lines of production TypeScript, fifteen integrated SaaS platforms,
                      hundreds of sales processed every month.
                    </p>
                    <p>
                      That work taught me where software earns its keep: in the gap between
                      how a business thinks it runs and how it actually runs - where quotes
                      stall, data gets re-keyed, and time quietly disappears. Closing that
                      gap doesn&apos;t take more meetings or mockups. It takes working
                      software in production, built by someone who&apos;s taken the time to
                      understand the operation.
                    </p>
                    <p>
                      That&apos;s what CoreSentia does. I take projects from process mapping
                      to production, and every system is built to run 24/7 without me
                      standing next to it.
                    </p>
                    <p>
                      Outside of software, I&apos;m a landscape and astrophotographer.
                      It&apos;s the same instinct in a different medium - finding the order
                      in complexity.
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>

              {/* The founder, then the proof - both his photographs */}
              <AnimateOnScroll delay={100} className="lg:col-span-2 order-1 lg:order-2">
                <figure>
                  <div className="rounded overflow-hidden border border-line-soft">
                    <Image
                      src="/ramsay-headshot.jpg"
                      alt="Ramsay Hatfield, founder of CoreSentia - black and white portrait with his framed prints behind him"
                      width={1600}
                      height={1201}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-ink-3">
                    Ramsay Hatfield - founder. Photographed by Ramsay.
                  </figcaption>
                </figure>
                <figure className="mt-8">
                  <div className="rounded overflow-hidden border border-line-soft">
                    <Image
                      src="/ramsay-milky-way.jpg"
                      alt="The Milky Way galactic core over granite rock pools and cypress trees - astrophotography by Ramsay Hatfield"
                      width={1708}
                      height={2000}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-ink-3">
                    The Milky Way core over granite country - photographed by Ramsay.
                  </figcaption>
                </figure>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* AI section - how he works */}
        <section className="relative overflow-hidden py-32 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-curve.jpg" opacity={0.15} />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              <AnimateOnScroll className="lg:col-span-4">
                <div className="section-label mb-3">Method</div>
                <h2 className="text-3xl lg:text-4xl font-semibold font-display">
                  AI isn&apos;t a feature I add. It&apos;s how I work.
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100} className="lg:col-span-7 lg:col-start-6">
                <div className="space-y-5 text-ink-2 leading-relaxed">
                  <p>
                    Every platform I build is developed AI-natively - frontier models wired
                    into the work from the first working session to production, governed and
                    logged. I&apos;ve reorganised my entire working method around what these
                    tools make possible. It&apos;s why one person ships what used to take a
                    team, and why the platforms I deliver come with that same capability
                    built in for your staff.
                  </p>
                  <p>
                    Most businesses are still deciding whether to take AI seriously. You can
                    hire someone who already has - and has the shipped platforms to prove it.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="relative overflow-hidden py-16 px-6 lg:px-8 border-t border-line-soft">
          <Backdrop src="/structure-shadowstairs.jpg" opacity={0.12} />
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="section-label mb-3">Principles</div>
              <h2 className="text-3xl font-semibold mb-4 font-display">How we work</h2>
            </AnimateOnScroll>
            <div>
              {principles.map((p, i) => (
                <AnimateOnScroll key={p.num} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-line-soft items-baseline">
                    <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
                      {p.num}
                    </div>
                    <h3 className="md:col-span-3 text-xl font-medium font-display">
                      {p.title}
                    </h3>
                    <p className="md:col-span-8 md:col-start-5 text-ink-2 leading-relaxed text-base">
                      {p.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Track record</div>
            </AnimateOnScroll>
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <AnimateOnScroll className="lg:col-span-6">
                <div className="text-[clamp(4rem,10vw,8rem)] leading-none font-semibold font-display tracking-editorial">
                  320K+
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mt-3">
                  lines of production TypeScript shipped
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100} className="lg:col-span-5 lg:col-start-8">
                <p className="text-ink-2 leading-relaxed">
                  <span className="font-mono text-ink-1">$1M+</span> in platform value
                  delivered, running <span className="font-mono text-ink-1">24/7</span> in
                  production right now.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-semibold mb-4 font-display">
                Have a project in mind?
              </h2>
              <p className="text-ink-2 mb-8">
                Let&apos;s talk about what you need built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm hover:bg-[#4dc4e8] transition-colors text-center"
                >
                  Get in touch
                </Link>
                <Link
                  href="/projects"
                  className="px-7 py-3 btn rounded-sm border border-line-strong text-ink-1 hover:border-accent transition-colors text-center"
                >
                  View the work
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Legal Info */}
        <section className="py-8 px-6 border-t border-line-soft">
          <div className="max-w-6xl mx-auto text-sm text-ink-3 font-mono">
            <p>CoreSentia &middot; ABN: 69 267 271 132 &middot; Brisbane, Queensland, Australia &middot;{' '}
              <Link href="mailto:info@coresentia.com.au" className="text-accent-ink hover:text-ink-1 transition-colors">
                info@coresentia.com.au
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
