import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

const principles = [
  {
    num: '01',
    title: 'Ship real code',
    description:
      'No WordPress templates, no drag-and-drop, no six-month discovery phases. We write production code using modern frameworks, and working software shows up early in the engagement — not at the end.',
  },
  {
    num: '02',
    title: 'Map before you build',
    description:
      'Software fails when it ignores how the business actually works. We start with the process — who touches what, where the time goes, what breaks — and let the system design follow.',
  },
  {
    num: '03',
    title: 'AI-native thinking',
    description:
      "We don't bolt AI on as an afterthought. We design systems with intelligence at the core — validating data before it propagates, drafting the routine work, answering the questions your team used to dig for.",
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
    <div className="min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 font-fraunces">
                Software that ships
              </h1>
              <p className="text-xl text-ink-2 leading-relaxed max-w-2xl">
                CoreSentia is an AI-native development studio based in Brisbane. We build
                the systems that make established businesses run better — automation,
                integration, and production software.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-semibold mb-8 font-fraunces">The story</h2>
            </AnimateOnScroll>
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <AnimateOnScroll>
                  <div className="space-y-5 text-ink-2 leading-relaxed text-lg">
                <p>
                  CoreSentia was founded by Ramsay Hatfield — an astrophotographer who
                  builds software. Years of standing alone in the dark, composing images
                  of things most people never see, taught him a particular way of working:
                  find the order in complexity, and make it feel right. He sees no real
                  boundary between art and engineering — a well-designed system and a
                  well-composed photograph are both acts of imposing clarity on chaos.
                </p>
                <p>
                  He brought that eye inside a national Australian solar company, where he
                  designed and built the operations platform that now runs the business —
                  320,000+ lines of production TypeScript, fifteen integrated SaaS
                  platforms, hundreds of sales processed every month. Not advising on it,
                  not wireframing it: building it.
                </p>
                <p>
                  That experience shaped a simple conviction: the gap between what
                  businesses need and what most agencies deliver is enormous. Businesses
                  don&apos;t need more mockups, decks, or discovery phases. They need
                  working software in production, built by someone who understands how the
                  operation actually runs — where the quotes stall, where the data gets
                  re-keyed, where the time disappears.
                </p>
                    <p>
                      CoreSentia exists to close that gap. We take projects from process
                      mapping to production, and every system we build is designed to run
                      24/7 without us standing next to it — honest, considered, and worth
                      the effort.
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>

              {/* The proof — his photograph */}
              <AnimateOnScroll delay={100} className="lg:col-span-2 order-1 lg:order-2">
                <figure>
                  <div className="rounded-2xl overflow-hidden border border-line-soft">
                    <Image
                      src="/ramsay-milky-way.jpg"
                      alt="The Milky Way galactic core over granite rock pools and cypress trees — astrophotography by Ramsay Hatfield"
                      width={1708}
                      height={2000}
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-ink-3">
                    The Milky Way core over granite country — photographed by Ramsay.
                  </figcaption>
                </figure>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="py-20 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-semibold mb-4 font-fraunces">How we work</h2>
            </AnimateOnScroll>
            <div>
              {principles.map((p, i) => (
                <AnimateOnScroll key={p.num} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-line-soft items-baseline">
                    <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-brand-accent transition-colors">
                      {p.num}
                    </div>
                    <h3 className="md:col-span-4 text-xl font-semibold font-raleway">
                      {p.title}
                    </h3>
                    <p className="md:col-span-7 text-ink-2 leading-relaxed text-sm md:text-base">
                      {p.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section className="py-20 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-semibold mb-10 font-fraunces">Track record</h2>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { value: '$1M+', label: 'In platform value delivered' },
                  { value: '320K+', label: 'Lines of production TypeScript shipped' },
                  { value: '24/7', label: 'Production systems, running right now' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl md:text-5xl font-bold font-mono text-ink-1 mb-3 tracking-editorial">{stat.value}</div>
                    <div className="text-ink-3 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-semibold mb-4 font-fraunces">
                Have a project in mind?
              </h2>
              <p className="text-xl text-ink-2 mb-8">
                Let&apos;s talk about what you need built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg hover:bg-[#4dc4e8] transition-colors text-center"
                >
                  Get in touch
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3.5 rounded-lg border border-line-strong text-ink-1 font-semibold hover:border-brand-accent transition-colors text-center"
                >
                  View our work
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Legal Info */}
        <section className="py-8 px-6 border-t border-line-soft">
          <div className="max-w-4xl mx-auto text-sm text-ink-3">
            <p>CoreSentia &middot; ABN: 69 267 271 132 &middot; Brisbane, Queensland, Australia &middot;{' '}
              <Link href="mailto:info@coresentia.com" className="text-brand-accent hover:text-brand-highlight transition-colors">
                info@coresentia.com
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
