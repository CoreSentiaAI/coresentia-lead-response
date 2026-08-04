import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import {
  SMALL_SITES_LIVE,
  CORESENTIA_MOBILE_DISPLAY,
  CORESENTIA_MOBILE_E164,
} from '../lib/site'

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
  'Text or call - tell us your business name and trade. Five minutes.',
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

function CallButton() {
  return (
    <a
      href={`tel:${CORESENTIA_MOBILE_E164}`}
      className="btn flex sm:inline-flex w-full sm:w-auto items-center justify-center
        bg-accent text-[#0d0d0c] font-medium rounded-sm px-10 py-5
        hover:bg-[#4dc4e8] transition-colors"
    >
      Call {CORESENTIA_MOBILE_DISPLAY}
    </a>
  )
}

export default function SmallBusinessWebsitesPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main>
        {/* ========== HERO ========== */}
        <section className="px-6 pt-36 pb-14 lg:pt-44 lg:pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="section-label mb-4">Small business websites</div>
            <h1 className="text-4xl sm:text-5xl font-semibold font-display">
              A proper website for your trade or small business.
            </h1>
            <p className="mt-6 text-lg">
              <span className="font-medium">$990, live in a week.</span> Your own
              .com.au domain, professional email, and a site that shows up when
              locals Google you. You own all of it.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
              <CallButton />
              <a
                href={`sms:${CORESENTIA_MOBILE_E164}`}
                className="btn text-ink-1 hover:opacity-70 transition-opacity text-center sm:text-left"
              >
                or text us your business name &rarr;
              </a>
            </div>
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

        {/* ========== CTA ========== */}
        <section id="contact" className="px-6 py-16 border-t border-line-soft">
          <div className="max-w-2xl mx-auto">
            <div className="section-label mb-3">Get started</div>
            <h2 className="text-2xl sm:text-3xl font-semibold font-display mb-6">
              Start with a call or a text.
            </h2>

            <a
              href={`tel:${CORESENTIA_MOBILE_E164}`}
              className="block font-display font-semibold text-[clamp(2.4rem,10vw,4rem)] leading-none tracking-editorial hover:text-accent-ink transition-colors"
            >
              {CORESENTIA_MOBILE_DISPLAY}
            </a>

            <div className="mt-8">
              <CallButton />
            </div>

            <p className="mt-5 text-base">
              or{' '}
              <a
                href={`sms:${CORESENTIA_MOBILE_E164}`}
                className="text-accent-ink underline underline-offset-4"
              >
                text us
              </a>{' '}
              your business name and we&apos;ll take it from there.
            </p>

            {/* Secondary contact path only - no booking calendars, no qualification forms */}
            <div className="mt-14 pt-10 border-t border-line-soft">
              <p className="text-base mb-6">
                Rather type it out? Leave your details and we&apos;ll call you
                back.
              </p>
              <ContactForm />
            </div>
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
