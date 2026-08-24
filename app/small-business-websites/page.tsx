import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import { SMALL_SITES_LIVE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Small Business Websites Brisbane - $990, Live in a Week | CoreSentia',
  description:
    'A proper website for your trade or small business - $990, live in a week. Your own .com.au domain, professional email, and a site that shows up when locals search for your trade. No lock-in contracts, you own everything.',
  alternates: {
    canonical: '/small-business-websites',
  },
  // Hidden from search until launch - flipped by SMALL_SITES_LIVE in app/lib/site.ts
  robots: SMALL_SITES_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

const included = [
  'Your own .com.au domain - registered in your name, not ours',
  'Professional email - you@yourbusiness.com.au instead of a gmail address',
  'A fast, modern site that works properly on phones',
  'Set up to show up on Google for your suburb and trade',
  'Your phone number front and centre - most customers will just call',
  '$79/month keep-it-running: hosting, changes, backups - contact us anytime for fast updates, most done same day, always within two business days',
]

const steps = [
  'Fill in the form below - your business name and trade is enough. Two minutes.',
  'We build the whole thing and send you a private preview link to look at on your phone. Change anything you like.',
  'Happy? We put it live on your own domain. Done inside a week.',
]

const faqs = [
  {
    q: 'What does it cost after the first year?',
    a: '$79/month covers hosting, updates and support; the domain renewal (about $20-30 a year) is billed at cost in your name.',
  },
  {
    q: 'Do I need to write anything?',
    a: "No. We build from what's already public (your Facebook page, existing site, Google listing) and you correct anything that's wrong.",
  },
  {
    q: 'Can I keep my current email/number?',
    a: 'Yes. Nothing changes unless you want it to.',
  },
  {
    q: 'What if I already have a website?',
    a: 'We rebuild it properly on your own domain and switch it over with no downtime.',
  },
]

// Proof cards go live once the first real rebuild (Springs Mowing) ships.
// Add real before/after screenshots to /public and list them here - never
// placeholder or invented assets.
const SHOW_PROOF = false
const proofCards: {
  business: string
  trade: string
  beforeSrc: string
  afterSrc: string
}[] = []

export default function SmallBusinessWebsitesPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main>
        {/* ========== HERO ========== */}
        <section className="relative px-6 pt-36 pb-14 lg:pt-44 lg:pb-24 overflow-hidden">
          {/* Structure: concrete curve in raking light - softest form in the set, right for this audience */}
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-curve.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              priority
              quality={82}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, #111110 0%, rgba(17,17,16,0.85) 45%, rgba(17,17,16,0.3) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
          </div>
          <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.05fr,1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="section-label mb-4">Small business websites</div>
              <h1 className="text-4xl sm:text-5xl font-semibold font-display">
                A proper website for your trade or small business.
              </h1>
              <p className="mt-6 text-lg">
                <span className="font-medium">$990, live in a week.</span> Your own
                .com.au domain, professional email, and a site that shows up when
                locals Google you. You own all of it.
              </p>

              <div className="mt-9">
                <a
                  href="#contact"
                  className="btn flex sm:inline-flex w-full sm:w-auto items-center justify-center
                    bg-accent text-[#0d0d0c] font-medium rounded-sm px-10 py-5
                    hover:bg-[#4dc4e8] transition-colors"
                >
                  Get started
                </a>
              </div>
            </div>

            {/* First client, live - the page's answer to "what will mine look like" */}
            <a
              href="https://springsmowing.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-sm border border-line-soft bg-surface-raised overflow-hidden transition-colors group-hover:border-accent">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line-soft">
                  <span className="w-2 h-2 rounded-full bg-line-soft" aria-hidden />
                  <span className="w-2 h-2 rounded-full bg-line-soft" aria-hidden />
                  <span className="w-2 h-2 rounded-full bg-line-soft" aria-hidden />
                  <span className="ml-2 font-mono text-[0.65rem] tracking-wide text-ink-3">
                    springsmowing.com.au
                  </span>
                </div>
                <Image
                  src="/springs-mowing-site.jpg"
                  alt="The Springs Mowing and Maintenance website, built by CoreSentia"
                  width={1400}
                  height={1050}
                  priority
                  quality={85}
                />
              </div>
              <p className="section-label mt-3">
                Springs Mowing, Flagstone - live now
              </p>
            </a>
          </div>
        </section>

        {/* ========== WHAT YOU GET ========== */}
        <section className="px-6 py-14 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-2">
              What you get
            </h2>
            <ul>
              {included.map((item) => (
                <li
                  key={item}
                  className="border-b border-line-soft py-4 text-base leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========== NO CATCHES ========== */}
        <section className="px-6 py-14 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-4">
              No catches
            </h2>
            <p className="text-lg">
              No lock-in contracts. No 12-month marketing packages. No upsell
              calls. The domain and the site are registered to you - if we part
              ways, everything goes with you. Success to us is you staying
              because it&apos;s working, not because you&apos;re stuck.
            </p>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="px-6 py-14 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-2">
              How it works
            </h2>
            <div>
              {steps.map((step, i) => (
                <div
                  key={step}
                  className="flex gap-4 border-b border-line-soft py-5"
                >
                  <span className="font-mono text-sm text-accent-ink pt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <p className="text-base leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== PROOF - flagged off until Springs Mowing ships ========== */}
        {SHOW_PROOF && proofCards.length > 0 && (
          <section className="px-6 py-14 border-t border-line-soft">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-6">
                Before and after
              </h2>
              <div className="space-y-8">
                {proofCards.map((card) => (
                  <div
                    key={card.business}
                    className="border border-line-soft rounded-sm p-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="section-label mb-2">Before</div>
                        <div className="relative aspect-[4/3] border border-line-soft rounded-sm overflow-hidden">
                          <Image
                            src={card.beforeSrc}
                            alt={`${card.business} - old site`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="section-label mb-2">After</div>
                        <div className="relative aspect-[4/3] border border-line-soft rounded-sm overflow-hidden">
                          <Image
                            src={card.afterSrc}
                            alt={`${card.business} - new site`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="text-lg font-medium font-display">
                        {card.business}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.08em]">
                        {card.trade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========== STRUCTURE BREAK - full bleed ========== */}
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

        {/* ========== CTA ========== */}
        <section id="contact" className="px-6 py-16 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <div className="section-label mb-3">Get started</div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-4">
              Tell us your business name and trade.
            </h2>
            <p className="text-base mb-8">
              We&apos;ll take it from there and get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="px-6 py-14 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-2">
              Questions
            </h2>
            <div>
              {faqs.map((item) => (
                <div key={item.q} className="border-b border-line-soft py-5">
                  <h3 className="text-lg font-medium font-display mb-2">
                    {item.q}
                  </h3>
                  <p className="text-base leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
