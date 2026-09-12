import Link from 'next/link'

// The module index. Two are live in the demo. The rest are named so the
// shape of the platform is visible, with nothing behind them yet.

const LIVE = [
  {
    href: '/demo/tracker',
    title: 'Tracker',
    body: 'The ranked backlog and the cycle every brief moves through. Change log on every move.',
  },
  {
    href: '/demo/purchase-orders',
    title: 'Purchase orders',
    body: 'Raise against a project, route by value, approve, post to the ERP. Audit trail on every step.',
  },
]

const NEXT = [
  { title: 'Project register', body: 'One record per project. Everything else hangs off it.' },
  { title: 'Progress claims', body: 'Monthly claims built from the register and the schedule of rates.' },
  { title: 'Site diary', body: 'Weather, crew, plant, delays and visitors, logged from a phone.' },
  { title: 'Board reporting', body: 'The monthly pack from live numbers, each one traceable to source.' },
]

export default function ModulesPage() {
  return (
    <div>
      <div className="section-label mb-3">Modules</div>
      <h1 className="text-3xl sm:text-4xl font-semibold font-display">One platform, one module at a time.</h1>
      <p className="mt-3 max-w-2xl text-base">
        Each module is live and in use before the next one starts. The tracker decides the order.
      </p>

      <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {LIVE.map((m) => (
          <Link key={m.href} href={m.href} className="group block bg-surface-card border border-line-soft rounded-sm p-5 hover:border-accent transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium font-display">{m.title}</h3>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-accent-ink">Live</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{m.body}</p>
            <span className="btn mt-4 inline-block text-accent-ink group-hover:underline underline-offset-4">Open</span>
          </Link>
        ))}
        {NEXT.map((m) => (
          <div key={m.title} className="bg-surface-alt border border-dashed border-line-strong rounded-sm p-5 opacity-70">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium font-display">{m.title}</h3>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] border border-line-strong rounded-sm px-1.5 py-1">Next cycle</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{m.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
