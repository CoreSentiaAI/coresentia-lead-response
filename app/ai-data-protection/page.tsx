import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

// Public statement of the AI data-protection posture. Generalised from the
// client assurance work of Aug 2026 - the sovereignty story is a first-class
// selling point for government-adjacent and confidentiality-bound clients.
export const metadata: Metadata = {
  title: 'AI & data protection - CoreSentia',
  description:
    'How CoreSentia uses AI to build software without client data ever entering it: synthetic data by default, commercial terms with the AI provider, and an onshore IRAP-scope path for sensitive work.',
}

const layers = [
  {
    num: '01',
    label: 'Architectural',
    title: 'Real data never goes in',
    points: [
      'All AI-assisted development runs against synthetic test data - fabricated records that mimic the shape of real data but contain none of it.',
      'Production credentials are never accessible to AI tooling - not in configuration, not in connected services, not in the working environment.',
      'When real data needs loading or migrating, a person runs conventional scripts against systems the AI cannot reach.',
      'Client deliverables, reports and records are never placed anywhere AI tooling can read.',
    ],
    summary:
      'Because of this layer, the honest answer to "what does the AI provider receive of our data?" is: nothing.',
  },
  {
    num: '02',
    label: 'Contractual',
    title: 'Business terms with the AI provider',
    points: [
      'All AI-assisted work runs under a business account governed by Anthropic’s commercial terms and data processing addendum - never consumer or personal accounts.',
      'Under those terms Anthropic may not train models on customer content. Content is treated as confidential, and clients retain all rights to inputs and outputs.',
      'Server-side retention defaults to deletion within 30 days, encrypted in transit and at rest. Anthropic holds SOC 2 Type II, ISO 27001 and ISO 42001 certifications.',
      'Optional feedback and telemetry channels that could transmit session content are disabled. No training or data-sharing programs are opted into.',
    ],
    summary: null,
  },
  {
    num: '03',
    label: 'Jurisdictional',
    title: 'An onshore path for sensitive work',
    points: [
      'Where a system should process real data with AI - document analysis, governed query access - that is a separate, deliberate decision made with you first. It is never a default.',
      'For sensitive or government-adjacent material, deployment runs via Amazon Bedrock in the AWS Sydney region: data stays in Australia, inputs and outputs are never shared with the model’s developer, and nothing is used to train any model.',
      'Bedrock sits within AWS’s IRAP-assessed scope - the assessment framework Australian government agencies rely on.',
      'No AI processing of real data happens without prior written approval.',
    ],
    summary: null,
  },
]

const never = [
  'Enter client data, reports or deliverables into any AI tool without written consent',
  'Use consumer or personal AI accounts for client work',
  'Opt into any AI vendor’s training, feedback or data-partner program',
  'Store client material anywhere AI tooling can read',
]

export default function AiDataProtectionPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-40 pb-0">
        {/* Hero */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">AI &amp; data protection</div>
              <h1 className="text-4xl md:text-6xl font-semibold font-display max-w-3xl mb-6">
                AI builds the software. Your data never meets it.
              </h1>
              <p className="text-ink-2 leading-relaxed max-w-xl mb-8">
                AI-native development is how we work - it is why platforms ship
                in weeks, not months. This page sets out, in plain terms, how
                client information is protected in that process: what is
                guaranteed, and what we deliberately never do.
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
              <p className="text-2xl lg:text-3xl font-display leading-snug max-w-3xl">
                Your data does not enter the AI. AI tools are used to build your
                systems, working only against fabricated test data. Real data is
                handled by conventional software and people - never submitted to
                an AI service unless you have approved a specific exception in
                writing.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* The reality */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">First, the reality</div>
              <p className="text-ink-2 leading-relaxed max-w-2xl">
                When a developer works with an AI coding assistant, everything
                the AI is shown - prompts, files it reads, query results - is
                transmitted to the AI provider&apos;s servers. So the meaningful
                question is not whether a provider&apos;s marketing sounds
                reassuring. It is what actually gets sent, under which terms,
                and what never gets sent at all. The three layers below are
                built on that reality, strongest first.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Three layers */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Three layers</div>
              <h2 className="text-3xl font-semibold mb-8 font-display">
                How the protection is built
              </h2>
            </AnimateOnScroll>
            <div>
              {layers.map((layer, i) => (
                <AnimateOnScroll key={layer.num} delay={i * 60}>
                  <div className="group grid lg:grid-cols-12 gap-2 lg:gap-8 py-8 border-b border-line-soft">
                    <div className="lg:col-span-1 font-mono text-sm group-hover:text-accent-ink transition-colors">
                      {layer.num}
                    </div>
                    <div className="lg:col-span-4">
                      <div className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 mb-2">
                        {layer.label}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-medium font-display">
                        {layer.title}
                      </h3>
                    </div>
                    <div className="lg:col-span-7">
                      <ul className="space-y-3">
                        {layer.points.map((point) => (
                          <li key={point} className="flex gap-3 leading-snug text-base">
                            <span aria-hidden className="font-mono text-ink-3 select-none">-</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      {layer.summary && (
                        <p className="mt-5 pt-4 border-t border-line-soft font-medium">
                          {layer.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
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
                  That is exactly why the architectural layer is the default
                  posture - the strongest protection is that your data never
                  goes there at all.
                </p>
                <p className="leading-snug text-base">
                  If any AI processing of real data is ever agreed, you will be
                  told exactly what is processed, where, and under which terms -
                  before it happens.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Sovereignty + proof */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Who this is for</div>
              <p className="text-ink-2 leading-relaxed max-w-2xl mb-6">
                If your client agreements carry data-sovereignty obligations -
                government work, regulated industries, confidentiality you
                cannot delegate - this is the operating model we bring, on your
                stack and under your governance. The same posture runs in
                production today: the enterprise platform we built for a
                national Australian solar company gives its AI governed,
                read-only, logged access - and nothing else.{' '}
                <Link href="/projects/automation-hub" className="text-accent-ink hover:text-ink-1 transition-colors">
                  Read the case study
                </Link>
                .
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 max-w-2xl">
                Vendor facts on this page - terms, retention, certifications,
                regions - are accurate as at August 2026. References:{' '}
                <a href="https://www.anthropic.com/legal/commercial-terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">Anthropic commercial terms</a>,{' '}
                <a href="https://trust.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">Anthropic trust centre</a>,{' '}
                <a href="https://aws.amazon.com/bedrock/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-1 transition-colors">AWS Bedrock</a>.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-semibold font-display mb-4">
                Bring your governance. We&apos;ll meet it.
              </h2>
              <p className="text-ink-2 max-w-xl mb-8">
                Tell us the agreements you operate under and we will show you,
                in writing, how the build honours them - before any work
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
