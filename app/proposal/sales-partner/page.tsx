import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { COOKIE_NAME, PROPOSAL_PATH, expectedToken } from './gate'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'

// Unlisted proposal page. Not in the sitemap, not linked from the site,
// noindex, and behind a password (PROPOSAL_PASSWORD env var - see gate.ts).
// First name only on purpose - the repo is public, so this file is too.

export const metadata: Metadata = {
  title: 'Sales partner proposal | CoreSentia',
  description: 'A proposal for a sales partner.',
  robots: { index: false, follow: false, nocache: true },
}

const menu = [
  {
    num: '01',
    title: 'Small business websites',
    body: '$990 build, $79 a month. Live in a week. The easy sell, and the way in.',
    href: '/small-business-websites',
    linkText: 'The page they see',
  },
  {
    num: '02',
    title: 'What comes after',
    body: 'Google ranking, review capture, scheduling, job tracking. Priced monthly, one piece at a time, once the client asks for it.',
  },
  {
    num: '03',
    title: 'Custom builds',
    body: 'Automation, integration, replacing software they pay for. Quoted per job. This is where one deal pays properly.',
    href: '/projects/automation-hub',
    linkText: 'The proof',
  },
]

const yourJob = [
  {
    num: '01',
    title: 'Ring after I email',
    body: "I send the first email. Two days later you ring: 'Did you get Ramsay's email? Want a look?' Ten calls a week, lunch breaks, your own phone.",
  },
  {
    num: '02',
    title: 'Ring the leads',
    body: 'A webform comes in, you call within the hour.',
  },
  {
    num: '03',
    title: 'Text the people you already pay',
    body: "Your mowing guy, pool guy, mechanic, the kids' swim school. 'My mate builds these, want a look?'",
  },
  {
    num: '04',
    title: 'Work your network',
    body: "Anyone running an ops team on spreadsheets. That's the custom-build conversation, and it's your world.",
  },
  {
    num: '05',
    title: 'Hold the price',
    body: "I waive fees. You won't.",
  },
  {
    num: '06',
    title: 'Sell the menu',
    body: "Anything off it: 'I'll get Ramsay on a call.'",
  },
]

const myJob = [
  'Send the emails.',
  'Build the prospect lists.',
  'Build a mock for every yes.',
  'Write every proposal and follow-up.',
  'Build the thing, and keep it running.',
]

const money = [
  { figure: '30%', of: 'of every small-site build' },
  { figure: '25%', of: 'of monthly fees on any rung, for as long as the client stays' },
  { figure: '15%', of: 'of invoiced value on custom builds you source and close' },
]

const onePage = [
  'Who owns each client',
  "What you're paid on upsells to clients I found",
  'What happens if one of us stops',
]

export default function SalesPartnerProposalPage({
  searchParams,
}: {
  searchParams?: { wrong?: string }
}) {
  const token = expectedToken()
  const cookie = cookies().get(COOKIE_NAME)?.value
  const open = token !== null && cookie === token
  if (!open) return <Gate wrong={searchParams?.wrong === '1'} />
  return <Proposal />
}

function Gate({ wrong }: { wrong: boolean }) {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />
      <main className="px-6 lg:px-8 pt-36 pb-32 lg:pt-44 lg:pb-40">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-5">Proposal</div>
          <h1 className="text-4xl sm:text-5xl font-semibold font-display max-w-2xl">
            You&apos;ll need the password.
          </h1>
          <form method="post" action={`${PROPOSAL_PATH}/unlock`} className="mt-10 max-w-sm">
            <label htmlFor="proposal-password" className="btn block text-ink-1 mb-2">
              Password
            </label>
            <input
              type="password"
              id="proposal-password"
              name="password"
              required
              autoComplete="off"
              autoFocus
              className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
                text-ink-1 font-mono
                focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            />
            {wrong && (
              <p className="mt-3 font-mono text-sm text-accent-ink">Not it. Ask Ramsay.</p>
            )}
            <button
              type="submit"
              className="btn mt-6 inline-flex items-center justify-center
                bg-accent text-[#0d0d0c] font-medium rounded-sm px-10 py-5
                hover:bg-[#4dc4e8] transition-colors"
            >
              Open
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Proposal() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main>
        {/* ========== HERO ========== */}
        <section className="px-6 lg:px-8 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="section-label mb-5">Proposal - for Todd - September 2026</div>
            <h1 className="text-display font-semibold font-display max-w-4xl">
              I build. You sell.
            </h1>
            <p className="mt-8 text-xl max-w-2xl">
              You&apos;ve seen the Springs Mowing site. Building it is the easy part
              for me. What I find hard is selling the product, getting clients.
              That&apos;s where you come in and work your TD magic.
            </p>
          </div>
        </section>

        {/* ========== THE MENU ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">What you would be selling</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                The menu
              </h2>
            </AnimateOnScroll>
            <div>
              {menu.map((m, i) => (
                <AnimateOnScroll key={m.num} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-line-soft items-baseline">
                    <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
                      {m.num}
                    </div>
                    <h3 className="md:col-span-3 text-xl font-medium font-display">
                      {m.title}
                    </h3>
                    <div className="md:col-span-8 md:col-start-5">
                      <p className="text-ink-2 leading-relaxed text-base">{m.body}</p>
                      {m.href && (
                        <Link
                          href={m.href}
                          className="btn inline-block mt-3 text-accent-ink hover:underline underline-offset-4"
                        >
                          {m.linkText}
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ========== YOUR JOB ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">A few hours a week, by phone</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                Your job
              </h2>
            </AnimateOnScroll>
            <div>
              {yourJob.map((j, i) => (
                <AnimateOnScroll key={j.num} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-line-soft items-baseline">
                    <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
                      {j.num}
                    </div>
                    <h3 className="md:col-span-3 text-xl font-medium font-display">
                      {j.title}
                    </h3>
                    <p className="md:col-span-8 md:col-start-5 text-ink-2 leading-relaxed text-base">
                      {j.body}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ========== MY JOB ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
            <AnimateOnScroll className="lg:col-span-4">
              <div className="section-label mb-3">Everything else</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display">
                My job
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll className="lg:col-span-8" delay={80}>
              <ul>
                {myJob.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line-soft py-4 text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base max-w-xl">
                The emails haven&apos;t gone out because I hate bugging people.
                They go out because you&apos;re ringing.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== THE MONEY ========== */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Your cut</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-12">
                The money
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {money.map((m, i) => (
                <AnimateOnScroll key={m.figure} delay={i * 100}>
                  <div className="border-t border-line-strong pt-6">
                    <div className="text-[clamp(4rem,9vw,7rem)] leading-none font-semibold font-display tracking-editorial">
                      {m.figure}
                    </div>
                    <p className="mt-4 text-base max-w-xs">{m.of}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll delay={200}>
              <div className="mt-16 max-w-2xl">
                <p className="text-lg">
                  Small sites are pocket money per client. The monthly line
                  compounds. The custom-build line is where one deal pays
                  properly.
                </p>
                <p className="mt-6 text-lg">
                  Commission only for the first 90 days. One target: three
                  paying clients at list price. Hit it and we talk partnership.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== STRAIGHT TALK ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
            <AnimateOnScroll className="lg:col-span-4">
              <div className="section-label mb-3">Before the first call</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display">
                Straight talk
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll className="lg:col-span-8" delay={80}>
              <p className="text-lg max-w-xl">
                A few hours a week gets us the first paying clients. It won&apos;t
                get either of us out for a year or more.
              </p>
              <p className="mt-6 text-lg max-w-xl">
                Mates and money. One page, written down first:
              </p>
              <ul className="mt-4 max-w-xl">
                {onePage.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-line-soft py-4 text-base"
                  >
                    <span className="font-mono text-sm text-accent-ink pt-1 shrink-0">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== CLOSE ========== */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl font-semibold font-display max-w-3xl">
                One word back and the first twenty emails go out this week.
              </h2>
              <p className="section-label mt-12">
                Unlisted page. Not linked from the site.
              </p>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
