'use client'
import { useEffect, useRef, useState } from 'react'

/* All timing in one place per the brief */
const ANIMATION = {
  duration: 500,       // ms — base transition
  stagger: 120,        // ms — between staggered children
  pathDraw: 900,       // ms — SVG line drawing
  frameFlip: 600,      // ms — track -> run crossfade
  threshold: 0.45,     // intersection ratio to activate a stage
}

const STAGES = [
  {
    label: 'Map',
    caption: 'Stakeholder sessions, process mapped end-to-end. Every meeting transcribed — nothing lost.',
  },
  {
    label: 'Build',
    caption: 'Your platform takes shape module by module. Humans stay in the loop.',
  },
  {
    label: 'Track',
    caption: 'No Notion, no status decks. The platform is the project tracker — watch progress inside the tool you’re buying.',
  },
  {
    label: 'Run',
    caption: 'The tracker becomes the operating system. SaaS subscriptions retire behind it.',
  },
]

/* Stage 1 — people at a table, flowchart draws itself out */
function MapVisual({ active }: { active: boolean }) {
  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset ${ANIMATION.pathDraw}ms ease-out ${delay}ms`,
  })
  const fade = (delay: number) => ({
    opacity: active ? 1 : 0,
    transition: `opacity ${ANIMATION.duration}ms ease-out ${delay}ms`,
  })
  return (
    <svg viewBox="0 0 220 170" className="w-full h-auto text-ink-3" fill="none" aria-hidden>
      {/* table */}
      <line x1="30" y1="46" x2="130" y2="46" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(0)} />
      {/* three people */}
      {[46, 80, 114].map((cx, i) => (
        <g key={cx} style={fade(i * ANIMATION.stagger)}>
          <circle cx={cx} cy="28" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d={`M${cx - 8} 44 q8 -8 16 0`} stroke="currentColor" strokeWidth="1.5" />
        </g>
      ))}
      {/* flowchart drawing itself out from the table */}
      <path d="M80 52 v22" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 0.4)} />
      <rect x="55" y="76" width="50" height="22" rx="2" stroke="var(--accent)" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 0.55)} />
      <path d="M80 98 v16 M80 114 h-42 v14 M80 114 h42 v14" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 0.8)} />
      <rect x="16" y="130" width="44" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 1.05)} />
      <rect x="100" y="130" width="44" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 1.05)} />
      <rect x="160" y="76" width="44" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 1.2)} />
      <path d="M105 87 h55" stroke="currentColor" strokeWidth="1.5" pathLength={1} style={draw(ANIMATION.pathDraw * 1.2)} />
    </svg>
  )
}

/* Stage 2 — flowchart nodes snap into a dashboard grid */
function BuildVisual({ active }: { active: boolean }) {
  const cards = [
    { scatter: 'translate(-18px, -26px) rotate(-7deg)', label: 'jobs' },
    { scatter: 'translate(22px, -14px) rotate(5deg)', label: 'quotes' },
    { scatter: 'translate(-24px, 18px) rotate(4deg)', label: 'stock' },
    { scatter: 'translate(16px, 26px) rotate(-5deg)', label: 'finance' },
  ]
  return (
    <div className="border border-line-soft rounded bg-surface-card p-3" aria-hidden>
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 pb-2 border-b border-line-soft mb-3">
        platform / modules
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className="border border-line-strong rounded bg-surface-raised px-2.5 py-3"
            style={{
              transform: active ? 'none' : card.scatter,
              opacity: active ? 1 : 0.35,
              transition: `transform ${ANIMATION.duration + 200}ms cubic-bezier(0.22, 1, 0.36, 1) ${i * ANIMATION.stagger}ms, opacity ${ANIMATION.duration}ms ease-out ${i * ANIMATION.stagger}ms`,
            }}
          >
            <div className="font-mono text-[10px] text-ink-3 mb-1.5">{card.label}</div>
            <div className="h-1 bg-line-strong rounded-sm mb-1 w-full" />
            <div className="h-1 bg-line-soft rounded-sm w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Stages 3 + 4 — the same frame, changing state. That's the point. */
function TrackerFrame({ tracking, running }: { tracking: boolean; running: boolean }) {
  const cols = ['mapped', 'in build', 'live']
  return (
    <div className="border border-line-soft rounded bg-surface-card p-3 relative overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 pb-2 border-b border-line-soft mb-3">
        <span>{running ? 'platform / operations' : 'platform / build board'}</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            style={{ opacity: tracking ? 1 : 0, transition: `opacity ${ANIMATION.duration}ms` }}
          />
          {running ? 'live' : 'in progress'}
        </span>
      </div>

      {/* Track state — project board */}
      <div
        className="grid grid-cols-3 gap-2"
        style={{
          opacity: running ? 0 : 1,
          transition: `opacity ${ANIMATION.frameFlip}ms ease-out`,
        }}
      >
        {cols.map((col, c) => (
          <div key={col}>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-3 mb-2">{col}</div>
            <div className="space-y-1.5">
              {[...Array(c === 0 ? 3 : 2)].map((_, i) => (
                <div key={i} className="h-5 border border-line-strong rounded-sm bg-surface-raised" />
              ))}
              {/* the card that moves across the board */}
              {c === 1 && (
                <div
                  className="h-5 border border-accent rounded-sm bg-surface-raised"
                  style={{
                    transform: tracking ? 'translateX(calc(100% + 0.5rem))' : 'translateX(-105%)',
                    transition: `transform ${ANIMATION.duration + 300}ms cubic-bezier(0.22, 1, 0.36, 1) ${ANIMATION.stagger * 3}ms`,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Run state — live ops, same frame */}
      <div
        className="absolute inset-x-3 top-11 bottom-3"
        style={{
          opacity: running ? 1 : 0,
          pointerEvents: 'none',
          transition: `opacity ${ANIMATION.frameFlip}ms ease-out ${running ? ANIMATION.frameFlip * 0.5 : 0}ms`,
        }}
      >
        <div className="space-y-1.5">
          {['job #4118 — contract signed', 'job #4117 — inventory ordered', 'job #4116 — install booked'].map((row, i) => (
            <div
              key={row}
              className="flex items-center gap-2 border border-line-strong rounded-sm bg-surface-raised px-2 py-1"
              style={{
                opacity: running ? 1 : 0,
                transform: running ? 'none' : 'translateY(6px)',
                transition: `opacity ${ANIMATION.duration}ms ease-out ${i * ANIMATION.stagger + ANIMATION.frameFlip}ms, transform ${ANIMATION.duration}ms ease-out ${i * ANIMATION.stagger + ANIMATION.frameFlip}ms`,
              }}
            >
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
              <span className="font-mono text-[9px] text-ink-2 truncate">{row}</span>
            </div>
          ))}
        </div>
        {/* revenue sparkline */}
        <svg viewBox="0 0 200 40" className="w-full h-8 mt-2" fill="none">
          <path
            d="M0 34 L30 30 L60 31 L90 24 L120 20 L150 12 L180 10 L200 4"
            stroke="var(--accent)"
            strokeWidth="1.5"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: running ? 0 : 1,
              transition: `stroke-dashoffset ${ANIMATION.pathDraw}ms ease-out ${ANIMATION.frameFlip + ANIMATION.stagger * 2}ms`,
            }}
          />
        </svg>
        {/* notification toast */}
        <div
          className="absolute top-0 right-0 border border-line-strong rounded-sm bg-surface-base px-2 py-1 font-mono text-[9px] text-ink-2"
          style={{
            opacity: running ? 1 : 0,
            transform: running ? 'none' : 'translateX(12px)',
            transition: `opacity ${ANIMATION.duration}ms ease-out ${ANIMATION.frameFlip + ANIMATION.stagger * 4}ms, transform ${ANIMATION.duration}ms ease-out ${ANIMATION.frameFlip + ANIMATION.stagger * 4}ms`,
          }}
        >
          team notified &middot; 6 min
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const [activated, setActivated] = useState<boolean[]>([false, false, false, false])
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Reduced motion: show everything in its final state, no transforms
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActivated([true, true, true, true])
      return
    }
    const observers = refs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivated((prev) => {
              if (prev[i]) return prev
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: ANIMATION.threshold }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const activeCount = activated.filter(Boolean).length
  const running = activated[3]

  const StageHeading = ({ i }: { i: number }) => (
    <div>
      <div className="flex items-baseline gap-3 mb-2">
        <span
          className="font-mono text-xs"
          style={{
            color: activated[i] ? 'var(--accent-ink)' : 'var(--ink-3)',
            transition: `color ${ANIMATION.duration}ms`,
          }}
        >
          0{i + 1}
        </span>
        <h3 className="text-lg font-semibold font-display">{STAGES[i].label}</h3>
      </div>
      <p className="text-ink-2 text-sm leading-relaxed">{STAGES[i].caption}</p>
    </div>
  )

  return (
    <div>
      {/* Progress line — desktop */}
      <div className="hidden lg:block h-px bg-line-soft mb-10 relative">
        <div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{
            width: `${(activeCount / STAGES.length) * 100}%`,
            transition: `width ${ANIMATION.duration + 300}ms ease-out`,
          }}
        />
      </div>

      <div className="grid lg:grid-cols-4 gap-x-8 gap-y-6">
        {/* Stage 1 */}
        <div ref={(el) => { refs.current[0] = el }} className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <StageHeading i={0} />
        </div>
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-2">
          <MapVisual active={activated[0]} />
        </div>

        {/* Stage 2 */}
        <div ref={(el) => { refs.current[1] = el }} className="order-3 lg:order-none lg:col-start-2 lg:row-start-1">
          <StageHeading i={1} />
        </div>
        <div className="order-4 lg:order-none lg:col-start-2 lg:row-start-2">
          <BuildVisual active={activated[1]} />
        </div>

        {/* Stage 3 + 4 headings */}
        <div ref={(el) => { refs.current[2] = el }} className="order-5 lg:order-none lg:col-start-3 lg:row-start-1">
          <StageHeading i={2} />
        </div>
        <div ref={(el) => { refs.current[3] = el }} className="order-7 lg:order-none lg:col-start-4 lg:row-start-1">
          <StageHeading i={3} />
        </div>

        {/* Shared frame — one screen changing state, spans stages 3-4 */}
        <div className="order-6 lg:order-none lg:col-start-3 lg:col-span-2 lg:row-start-2">
          <TrackerFrame tracking={activated[2]} running={running} />
        </div>
      </div>
    </div>
  )
}
