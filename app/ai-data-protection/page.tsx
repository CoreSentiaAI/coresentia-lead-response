import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

// Public statement of the AI data-protection posture. Framed as a choice of
// posture (sealed / governed / sovereign) - never an absolute "data never
// enters the AI" promise, which would rule out the governed live-access mode
// where AI earns most. Sovereignty remains a first-class selling point.
export const metadata: Metadata = {
  title: 'AI & data protection - CoreSentia',
  description:
    'How CoreSentia governs AI access to client data: sealed builds on synthetic data, governed access to live systems under commercial terms, and an onshore IRAP-scope path for sovereignty-bound work. Your data goes exactly as far as you decide.',
}

const postures = [
  {
    num: '01',
    label: 'Sealed',
    title: 'Real data never goes in',
    points: [
      'The posture for confidentiality-bound work: all AI-assisted development runs against synthetic test data - fabricated records that mimic the shape of real data but contain none of it.',
      'Production credentials are kept out of reach of AI tooling - not in configuration, not in connected services, not in the working environment.',
      'When real data needs loading or migrating, a person runs conventional scripts against systems the AI cannot reach.',
      'Client deliverables, reports and records are never placed anywhere AI tooling can read.',
    ],
    summary:
      'In this posture, the honest answer to "what does the AI provider receive of our data?" is: nothing.',
  },
  {
    num: '02',
    label: 'Governed',
    title: 'AI works with your live systems, under terms',
    points: [
      'The posture most businesses choose, because it is where AI earns the most: reading your data to answer questions, automate work and keep systems in sync.',
      'We standardise on a single, named AI vendor: Claude, by Anthropic - frontier-capability models from the safety-focused AI lab. One tool, one set of published terms, one accountable relationship - not a scatter of AI services with different policies.',
      'Everything runs under a business account governed by Anthropic’s commercial terms and data processing addendum - never consumer or personal accounts. Anthropic may not train models on customer content, retention defaults to deletion within 30 days, and Anthropic holds SOC 2 Type II, ISO 27001 and ISO 42001 certifications.',
      'Access is engineered, not assumed: scoped, read-only where possible, logged, and guarded - the AI touches what its role allows and nothing else.',
    ],
    summary:
      'In this posture your data is processed on Anthropic’s servers, and the protection is contractual. When geography itself is the requirement, the next posture removes even that.',
  },
  {
    num: '03',
    label: 'Sovereign',
    title: 'Onshore, for work that cannot leave',
    points: [
      'Same AI, different venue: the models run on AWS-operated infrastructure via Amazon Bedrock in the Sydney region - and Anthropic, the model’s developer, never receives your data at all. Inputs and outputs stay in Australian data centres and are never used to train any model.',
      'Residency is engineered, not assumed: the deployment is pinned to a single region. AWS commits not to move customer content outside your chosen region, and regions do not fail over offshore on their own - cross-region features exist only if we deliberately enable them.',
      'Bedrock sits within AWS’s IRAP-assessed scope - the assessment framework Australian government agencies rely on.',
      'The honest jurisdictional limit: a US-headquartered provider remains subject to lawful orders wherever the data sits. Where even that is unacceptable, the sealed posture - or a build inside your own sovereign-approved environment - is the answer.',
      'Moving between postures is always a decision made with you, in writing - never a default.',
    ],
    summary: null,
  },
]

const never = [
  'Give AI access to your data beyond the posture you have agreed to in writing',
  'Use consumer or personal AI accounts for client work',
  'Opt into any AI vendor’s training, feedback or data-partner program',
  'Treat AI access as a default rather than a decision',
]

export default function AiDataProtectionPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-40 pb-0">
        {/* Hero */}
        <section className="relative px-6 lg:px-8 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-core.jpg"
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
              <div className="section-label mb-3">AI &amp; data protection</div>
              <h1 className="text-4xl md:text-6xl font-semibold font-display max-w-3xl mb-6">
                AI builds the software. You decide what it sees.
              </h1>
              <p className="text-ink-2 leading-relaxed mb-8">
                AI-native development is how we work - it is why platforms ship
                in weeks, not months. How far the AI reaches into your business
                is a decision we make with you, in writing: sealed away from
                real data entirely, working with your live systems under
                governed terms, or fully onshore. This page sets out the
                postures and the protections behind them.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/capability"
                  className="px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm
                    hover:bg-[#4dc4e8] transition-colors text-base"
                >
                  Get the capability document
                </Link>
                <Link
                  href="/#contact"
                  className="btn text-ink-1 transition-opacity hover:opacity-70 group"
                >
                  Start a conversation <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* The short version */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">The short version</div>
              <p className="text-2xl lg:text-3xl font-display leading-snug">
                Your data does not have to enter the AI. Every engagement
                chooses a posture deliberately - sealed away from real data
                entirely, governed access to live systems, or fully onshore for
                sovereignty-bound work. It is a choice made in writing, never
                an accident.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* The reality */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">First, the reality</div>
              <p className="text-ink-2 leading-relaxed">
                When a developer works with an AI assistant, whatever the AI is
                shown - prompts, files it reads, query results - is transmitted
                to the AI provider&apos;s servers. Nothing more, nothing less:
                the AI sees exactly what we choose to show it, and that choice
                follows your business requirements. There is a genuine
                trade-off inside the choice - the more the AI can see, the
                faster it builds and the more it can do for you; the less it
                sees, the stronger the isolation. The three postures below are
                how that trade-off is made deliberately, under known terms -
                and which one you run is your call, not ours.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Three postures */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Three postures</div>
              <h2 className="text-3xl font-semibold mb-8 font-display">
                Sealed, governed, or sovereign
              </h2>
            </AnimateOnScroll>
            <div>
              {postures.map((posture, i) => (
                <AnimateOnScroll key={posture.num} delay={i * 60}>
                  <div className="group grid lg:grid-cols-12 gap-2 lg:gap-8 py-8 border-b border-line-soft">
                    <div className="lg:col-span-1 font-mono text-sm group-hover:text-accent-ink transition-colors">
                      {posture.num}
                    </div>
                    <div className="lg:col-span-4">
                      <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mb-2">
                        {posture.label}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-medium font-display">
                        {posture.title}
                      </h3>
                    </div>
                    <div className="lg:col-span-7">
                      <ul className="space-y-3">
                        {posture.points.map((point) => (
                          <li key={point} className="flex gap-3 leading-snug text-base">
                            <span aria-hidden className="font-mono text-ink-3 select-none">-</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      {posture.summary && (
                        <p className="mt-5 pt-4 border-t border-line-soft font-medium">
                          {posture.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Structure break - full bleed */}
        <section className="relative h-[36vh] lg:h-[46vh] overflow-hidden dark-only" aria-hidden>
          <Image
            src="/structure-sweep.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-60"
            quality={82}
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
        </section>

        {/* Never / honest limits */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <AnimateOnScroll>
              <div className="border border-line-soft rounded-sm p-8 h-full hover:border-accent transition-colors">
                <h3 className="text-xl font-medium font-display mb-5">
                  What will never happen
                </h3>
                <ul className="space-y-3">
                  {never.map((item) => (
                    <li key={item} className="flex gap-3 leading-snug text-base">
                      <span aria-hidden className="font-mono text-accent-ink select-none">&times;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={60}>
              <div className="border border-line-soft rounded-sm p-8 h-full hover:border-accent transition-colors">
                <h3 className="text-xl font-medium font-display mb-5">
                  The honest limits
                </h3>
                <p className="leading-snug text-base mb-4">
                  No provider can promise absolute zero risk for data it
                  actually processes: even under commercial terms, a 30-day
                  retention window and standard legal-process exceptions exist.
                  Knowing that is the point. It is why the sealed posture
                  exists for material that cannot carry any risk at all, and
                  why governed access is scoped, logged and read-only wherever
                  possible - the protection is matched to what the data
                  actually is.
                </p>
                <p className="leading-snug text-base">
                  Whatever the posture, you will know exactly what is
                  processed, where, and under which terms - before it happens.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Who this is for + proof */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Who this is for</div>
              <p className="text-ink-2 leading-relaxed mb-6">
                Most clients run governed - it is how the enterprise platform
                we built for a national Australian solar company works every
                day, with AI holding governed, read-only, logged access to the
                business and nothing else.{' '}
                <Link href="/projects/automation-hub" className="text-accent-ink hover:text-ink-1 transition-colors">
                  Read the case study
                </Link>
                . And if your client agreements carry data-sovereignty
                obligations - government work, regulated industries,
                confidentiality you cannot delegate - the sealed and sovereign
                postures are how we meet them, on your stack and under your
                governance.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3">
                Vendor facts on this page - terms, retention, certifications,
                regions - are accurate as at August 2026. References:{' '}
                <a href="https://www.anthropic.com/legal/commercial-terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">Anthropic commercial terms</a>,{' '}
                <a href="https://trust.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">Anthropic trust centre</a>,{' '}
                <a href="https://aws.amazon.com/bedrock/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">AWS Bedrock</a>.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Structure break - full bleed, pre-CTA */}
        <section className="relative h-[36vh] lg:h-[46vh] overflow-hidden dark-only" aria-hidden>
          <Image
            src="/structure-grid.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            quality={82}
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">
                Bring your governance. We&apos;ll meet it.
              </h2>
              <p className="text-ink-2 mb-8">
                Tell us the agreements you operate under and we will show you,
                in writing, which posture honours them - before any work
                starts.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/#contact"
                  className="px-7 py-3 btn bg-accent text-[#0d0d0c] font-medium rounded-sm
                    hover:bg-[#4dc4e8] transition-colors text-base"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/faq"
                  className="btn text-ink-1 transition-opacity hover:opacity-70 group"
                >
                  Read the FAQ <span className="inline-block group-hover:translate-x-0.5 transition-transform">&rarr;</span>
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
