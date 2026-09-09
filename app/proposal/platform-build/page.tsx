import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { COOKIE_NAME, PROPOSAL_PATH, expectedToken, proposalVars } from './gate'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'

// Unlisted proposal page for a corporate platform build. Not in the sitemap,
// not linked from the site, noindex, and behind a password (see gate.ts).
// The client, the contact, their finance system and the day rate come from
// env vars, never from this file - the repo is public.

export const metadata: Metadata = {
  title: 'Platform build proposal | CoreSentia',
  description: 'A proposal for an internal platform build.',
  robots: { index: false, follow: false, nocache: true },
}

// Stack figures as quoted by email: vendor list prices, AUD ex GST.
const STACK_BUILD_PM = 2450
const STACK_RUN_PM = 460

const aud = (n: number) => `$${n.toLocaleString('en-AU')}`

export default function PlatformBuildProposalPage({
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

type Row = { num: string; title: string; body: string }

function Rows({ rows }: { rows: Row[] }) {
  return (
    <div>
      {rows.map((r, i) => (
        <AnimateOnScroll key={r.num} delay={i * 80}>
          <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-line-soft items-baseline">
            <div className="md:col-span-1 font-mono text-sm text-ink-3 group-hover:text-accent-ink transition-colors">
              {r.num}
            </div>
            <h3 className="md:col-span-3 text-xl font-medium font-display">{r.title}</h3>
            <p className="md:col-span-8 md:col-start-5 text-ink-2 leading-relaxed text-base">
              {r.body}
            </p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}

function Proposal() {
  const { client, contact, erp, rate } = proposalVars()

  // Four days a week. Twelve months carries four unpaid weeks off.
  const perMonth = rate ? Math.round((rate * 4 * 52) / 12) : null
  const sixMonths = rate ? rate * 4 * 26 : null
  const twelveMonths = rate ? rate * 4 * 48 : null
  const retainer = rate ? rate * 6 : null

  const scope: Row[] = [
    {
      num: '01',
      title: 'Purchase orders and approvals',
      body: `Raise, route, approve and post to ${erp} from one screen. Rules the finance team sets, an audit trail on every step. First module, first month.`,
    },
    {
      num: '02',
      title: 'Projects and claims',
      body: 'Project tracking, progress claims and subcontractor paperwork in one place, with the numbers flowing to finance without re-keying.',
    },
    {
      num: '03',
      title: 'Forms in the field',
      body: 'HSEQ, site and inspection forms on a phone, straight into the record they belong to.',
    },
    {
      num: '04',
      title: 'Dashboards that answer questions',
      body: 'Live views for finance and operations, and a plain-English question box over the data for the people who run the business.',
    },
    {
      num: '05',
      title: 'Integrations',
      body: `${erp}, Microsoft 365 and Entra ID, and whatever else the business runs. Two-way where it matters.`,
    },
  ]

  const process: Row[] = [
    {
      num: '01',
      title: 'Map',
      body: 'Six to eight weeks with your process owner. Half a day a week of their time. Every process written down before any code.',
    },
    {
      num: '02',
      title: 'Build',
      body: 'Modules land one at a time. Each one is live and in use before the next starts. First module in production inside the first month of build.',
    },
    {
      num: '03',
      title: 'Track',
      body: "The platform is the progress tracker. A visible backlog and a shipped list, updated as it happens. No 'what are we paying for' conversation.",
    },
    {
      num: '04',
      title: 'Run',
      body: 'After the build, a retainer. Six days a month at the same rate, extra days billed as used. Software is never finished. A business this size generates requirements faster than one person clears them.',
    },
  ]

  const shape: Row[] = [
    {
      num: '01',
      title: 'Basis',
      body: "Time and materials. No milestone payments. Milestones create 'what counts as done' disputes. The shipped list is the evidence.",
    },
    {
      num: '02',
      title: 'Commitment',
      body: 'Four days a week for twelve months. Non-exclusive. Other clients get the fifth day.',
    },
    { num: '03', title: 'Invoicing', body: 'Monthly, 14-day terms.' },
    {
      num: '04',
      title: 'After the build',
      body: 'Retainer. Minimum six days a month for twelve months at the same rate, in the same agreement.',
    },
    {
      num: '05',
      title: 'Notice',
      body: 'Thirty days either side after the first three months.',
    },
    {
      num: '06',
      title: 'New modules',
      body: 'A scope note and a day estimate. No change orders.',
    },
    {
      num: '07',
      title: 'Accounts',
      body: `Every platform account in ${client}'s name and on ${client}'s card. I never hold your keys. AI development tools run on CoreSentia's own account and are recharged at cost with an agreed monthly cap.`,
    },
    {
      num: '08',
      title: 'Ownership',
      body: `${client} owns the application. I keep the right to reuse general know-how, techniques and non-client-specific components in other work.`,
    },
    {
      num: '09',
      title: 'Non-compete',
      body: 'Not for a direct competitor for twelve months.',
    },
    {
      num: '10',
      title: 'Structure',
      body: 'Engaged through CoreSentia as a company. Professional indemnity and public liability in place before day one.',
    },
  ]

  const youProvide = [
    'One process owner who can make decisions on the spot. Half a day a week during mapping.',
    `Accounts in ${client}'s name: Vercel, Supabase, GitHub.`,
    'One DNS record on your existing domain.',
    `API access to ${erp}.`,
    'The people who use each module decide when it is done.',
  ]

  const straight: Row[] = [
    {
      num: '01',
      title: 'Why is the stack so cheap?',
      body: 'The cost moved from licences to build days. SaaS prices per seat and per module. This prices per developer-day plus commodity infrastructure, which is why the platform cost barely moves with scope.',
    },
    {
      num: '02',
      title: 'One person is a risk.',
      body: 'One builder is the reason for the speed and the price. The mitigation is ownership: your accounts, your repository, documentation the build writes as it goes, and a written handover from month one. A competent developer can pick it up.',
    },
    {
      num: '03',
      title: 'What about our IT team?',
      body: 'The platform sits inside your tenancy. Entra ID login, your DNS, your accounts, your admin. IT keeps control of access and can see everything.',
    },
    {
      num: '04',
      title: 'Why a contractor?',
      body: 'The build has an end and the retainer has a shape. That is a project cost line. Headcount does not end.',
    },
  ]

  const proof = [
    { figure: '320K+', of: 'lines of production code' },
    { figure: '500+', of: 'API endpoints' },
    { figure: '15+', of: 'platforms integrated' },
  ]

  const label = contact
    ? `Proposal - for ${contact} - September 2026`
    : 'Proposal - September 2026'

  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main>
        {/* ========== HERO ========== */}
        <section className="px-6 lg:px-8 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="section-label mb-5">{label}</div>
            <h1 className="text-display font-semibold font-display max-w-4xl">
              Automate the business from the inside.
            </h1>
            <p className="mt-8 text-xl max-w-2xl">
              You&apos;ve watched an AI-native build take an operations stack apart
              and put it back together as one system. This is what that looks
              like as a contract. {client} gets the platform and owns it. What
              you pay for is build days and commodity infrastructure.
            </p>
          </div>
        </section>

        {/* ========== WHAT GETS BUILT ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Scope follows the process map</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                What gets built
              </h2>
              <p className="text-lg max-w-2xl mb-4">
                One platform around {erp}. {erp} stays the ledger. The platform
                does the work around it.
              </p>
            </AnimateOnScroll>
            <Rows rows={scope} />
            <AnimateOnScroll delay={200}>
              <p className="mt-8 text-base max-w-xl">
                The process map decides the order. Nothing on this list is fixed
                until it is mapped.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== HOW IT RUNS ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Map, build, track, run</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                How it runs
              </h2>
            </AnimateOnScroll>
            <Rows rows={process} />
          </div>
        </section>

        {/* ========== THE SHAPE ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">Time and materials, written down first</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                The commercial shape
              </h2>
            </AnimateOnScroll>
            <Rows rows={shape} />
          </div>
        </section>

        {/* ========== THE MONEY ========== */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">All of it, AUD ex GST</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-12">
                The money
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {[
                { figure: rate ? aud(rate) : 'TBC', of: 'a day, four days a week' },
                { figure: perMonth ? aud(perMonth) : 'TBC', of: 'a month in build days' },
                { figure: aud(STACK_RUN_PM), of: 'a month for the stack after the build' },
              ].map((m, i) => (
                <AnimateOnScroll key={m.of} delay={i * 100}>
                  <div className="border-t border-line-strong pt-6">
                    <div className="text-[clamp(3rem,7vw,5.5rem)] leading-none font-semibold font-display tracking-editorial">
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
                  Six months of build is about {sixMonths ? aud(sixMonths) : 'TBC'}.
                  Twelve months is about {twelveMonths ? aud(twelveMonths) : 'TBC'},
                  with four unpaid weeks off built in.
                </p>
                <p className="mt-6 text-lg">
                  The stack runs at about {aud(STACK_BUILD_PM)} a month during the
                  build with the AI cap fully used, and about {aud(STACK_RUN_PM)} a
                  month after. Staff seats cost nothing. What scales is build days.
                </p>
                <p className="mt-6 text-lg">
                  Retainer months after the build: {retainer ? aud(retainer) : 'TBC'} for
                  six days, extra days as used.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== YOUR SIDE ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
            <AnimateOnScroll className="lg:col-span-4">
              <div className="section-label mb-3">Your side</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display">
                What {client} provides
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll className="lg:col-span-8" delay={80}>
              <ul>
                {youProvide.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-line-soft py-4 text-lg"
                  >
                    <span className="font-mono text-sm text-accent-ink pt-1.5 shrink-0">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== THE PROOF ========== */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">One builder, nine months</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-12">
                The proof
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {proof.map((p, i) => (
                <AnimateOnScroll key={p.figure} delay={i * 100}>
                  <div className="border-t border-line-strong pt-6">
                    <div className="text-[clamp(3rem,7vw,5.5rem)] leading-none font-semibold font-display tracking-editorial">
                      {p.figure}
                    </div>
                    <p className="mt-4 text-base max-w-xs">{p.of}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll delay={200}>
              <div className="mt-16 max-w-2xl">
                <p className="text-lg">
                  You watched this one get built. The case study on the site is
                  anonymised by design. The capability document goes deeper.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <Link
                    href="/projects/automation-hub"
                    className="btn text-accent-ink hover:underline underline-offset-4"
                  >
                    The case study
                  </Link>
                  <Link
                    href="/capability"
                    className="btn text-accent-ink hover:underline underline-offset-4"
                  >
                    Capability document
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ========== STRAIGHT TALK ========== */}
        <section className="py-24 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="section-label mb-3">The questions your people will ask</div>
              <h2 className="text-3xl sm:text-4xl font-semibold font-display mb-4">
                Straight talk
              </h2>
            </AnimateOnScroll>
            <Rows rows={straight} />
          </div>
        </section>

        {/* ========== CLOSE ========== */}
        <section className="py-32 px-6 lg:px-8 border-t border-line-soft">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl font-semibold font-display max-w-3xl">
                One word back and mapping starts on the first Monday we agree.
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
