'use client'
import { useEffect, useRef, useState } from 'react'

/* One pipeline, five businesses. The spine never changes - the product does.
   Loops continuously while in view; pauses off-screen; static when reduced motion. */
const ANIMATION = {
  tickMs: 1600,      // ms per stage advance
  fadeMs: 450,       // element reveal duration
  holdTicks: 2,      // ticks to hold the completed state before the next business
  threshold: 0.3,    // intersection ratio that starts / resumes the loop
  countMs: 700,      // variables counter run-up
}

/* The universal spine. Labels never change between businesses. */
const STAGES = ['lead in', 'record', 'quote', 'accepted', 'scheduled', 'fulfilled', 'invoiced']

/* Side effects that fire off the spine as it runs - the layer around the pipeline. */
const SPARKS: [number, string][] = [
  [3, 'chat - team notified'],
  [4, 'calendar - booked'],
  [5, 'drive - archived'],
  [6, 'dashboard - updated'],
]

type Industry = {
  kind: string
  sector: string
  vars: number
  plus?: boolean
  details: string[] // one line per stage, in STAGES order
}

/* Ordered by climbing complexity - the variables count is the quiet argument. */
const INDUSTRIES: Industry[] = [
  {
    kind: 'local trade',
    sector: 'Garden maintenance',
    vars: 12,
    details: [
      'web form - fortnightly garden care, two properties',
      'client record created - address, access notes, gate code',
      'quote drafted from site photos - $190 per visit, sent',
      'accepted by SMS - card saved for auto-billing',
      'recurring slot locked - every second Tuesday',
      'crew checklist done - before and after photos attached',
      'invoice sent and paid - review request queued',
    ],
  },
  {
    kind: 'independent practitioner',
    sector: 'Allied health',
    vars: 26,
    details: [
      'referral received - GP care plan attached',
      'patient record created - history, consent, Medicare details',
      'fees confirmed - intake forms sent automatically',
      'intake signed digitally - file complete before session one',
      'six sessions booked - reminders queued',
      'session notes filed - care plan updated',
      'claim lodged, gap invoiced - rebooking prompt sent',
    ],
  },
  {
    kind: 'building trade',
    sector: 'Home renovations',
    vars: 58,
    details: [
      'phone inquiry transcribed - kitchen and laundry',
      'project record created - rooms, finishes, budget band',
      'itemised quote assembled - forty line items, sent',
      'contract signed - deposit received and receipted',
      'trades sequenced - certifier and skip bins booked',
      'stage claims tracked - variations priced and logged',
      'final claim issued - handover pack delivered',
    ],
  },
  {
    kind: 'sales SME',
    sector: 'Residential solar',
    vars: 90,
    details: [
      'quote request - 6.6 kW system with battery',
      'job created - every field populated, hands-free',
      'proposal generated - rebates applied automatically',
      'contract signed - webhook received, validated',
      'install booked - inventory ordered the same minute',
      'inspection passed - grid application lodged',
      'invoice reconciled - commissions calculated',
    ],
  },
  {
    kind: 'large-scale contractor',
    sector: 'Industrial engineering',
    vars: 150,
    plus: true,
    details: [
      'tender shortlisted - scope pack ingested',
      'project stood up - WBS, compliance register, contacts',
      'estimate built - procurement schedule attached',
      'contract executed - milestones baselined',
      'crews and plant scheduled - long-lead items ordered',
      'progress claims certified - QA records filed',
      'milestone invoiced - retention tracked to release',
    ],
  },
]

const TICKS_PER_CYCLE = STAGES.length + ANIMATION.holdTicks

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* Fades children in on mount - remount via key to swap content */
function Swap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(r)
  }, [])
  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(6px)',
        transition: `opacity ${ANIMATION.fadeMs}ms ease-out, transform ${ANIMATION.fadeMs}ms ease-out`,
      }}
    >
      {children}
    </div>
  )
}

/* Counter that runs up to its target each time the business changes */
function CountUp({ target, plus, trigger }: { target: number; plus?: boolean; trigger: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reducedMotion()) {
      setN(target)
      return
    }
    setN(0)
    const steps = 20
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(Math.round((target * i) / steps))
      if (i >= steps) clearInterval(id)
    }, ANIMATION.countMs / steps)
    return () => clearInterval(id)
  }, [target, trigger])
  return (
    <span>
      {n}
      {plus ? '+' : ''}
    </span>
  )
}

export default function PipelineLoop() {
  const [tick, setTick] = useState(-1) // -1 = not started
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Start on first scroll into view; pause while off-screen
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setTick((t) => {
            if (t >= 0) return t
            // Reduced motion: land on the completed final business, no loop
            return reducedMotion()
              ? (INDUSTRIES.length - 1) * TICKS_PER_CYCLE + STAGES.length - 1
              : 0
          })
        }
      },
      { threshold: ANIMATION.threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // The loop
  useEffect(() => {
    if (!inView || tick < 0 || reducedMotion()) return
    const id = setInterval(() => setTick((t) => t + 1), ANIMATION.tickMs)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, tick < 0])

  const started = tick >= 0
  const cycle = started ? Math.floor(tick / TICKS_PER_CYCLE) % INDUSTRIES.length : 0
  const stepInCycle = started ? tick % TICKS_PER_CYCLE : -1
  const step = Math.max(0, Math.min(stepInCycle, STAGES.length - 1))
  const ind = INDUSTRIES[cycle]
  const lit = (i: number) => started && stepInCycle >= i
  const firedSparks = SPARKS.filter(([i]) => lit(i))

  return (
    <div ref={rootRef} className="border border-line-soft rounded bg-surface-card overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line-soft font-mono text-[10px] uppercase tracking-[0.08em]">
        <span>lead to cash &middot; hands-free</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${started ? 'bg-accent' : 'bg-line-soft'}`} />
          {started ? `business ${cycle + 1} of ${INDUSTRIES.length}` : 'waiting'}
        </span>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {/* The business - morphs each cycle. The variables counter is the argument. */}
        <div className="flex items-end justify-between gap-4 min-h-[3.6em]">
          <Swap key={`sector-${started ? cycle : 'idle'}`}>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60 mb-1">
              {ind.kind}
            </div>
            <div className="text-xl lg:text-2xl font-medium font-display leading-tight">
              {ind.sector}
            </div>
          </Swap>
          <div className="text-right shrink-0">
            <div className="font-mono text-2xl lg:text-3xl leading-none">
              {started ? <CountUp target={ind.vars} plus={ind.plus} trigger={cycle} /> : '0'}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60 mt-1">
              variables managed
            </div>
          </div>
        </div>

        {/* The spine */}
        <div>
          <div className="hidden sm:grid grid-cols-7 gap-[3px] mb-2">
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={`font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                  stepInCycle === i && started
                    ? 'text-accent-ink'
                    : lit(i)
                      ? 'text-ink-1'
                      : 'text-ink-1 opacity-40'
                }`}
                style={{ transitionDuration: `${ANIMATION.fadeMs}ms` }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-sm ${lit(i) ? 'bg-accent' : 'bg-line-soft'}`}
                style={{ transition: `background-color ${ANIMATION.fadeMs}ms` }}
              />
            ))}
          </div>
          {/* What just happened - swaps every stage */}
          <div className="mt-3 min-h-[3em]">
            {started && (
              <Swap key={`detail-${cycle}-${step}`}>
                <div className="font-mono text-xs lg:text-sm leading-relaxed">
                  <span className="text-accent-ink">{STAGES[step]}</span>
                  <span className="opacity-60"> &middot; </span>
                  <span>{ind.details[step]}</span>
                </div>
              </Swap>
            )}
          </div>
        </div>

        {/* The layer around the spine - comms, docs, reporting firing on their own */}
        <div className="flex flex-wrap gap-2 min-h-[2.2em]">
          {firedSparks.map(([i, text]) => (
            <Swap key={`spark-${cycle}-${i}`}>
              <span className="inline-block px-2 py-1 rounded-sm border border-line-strong bg-surface-raised font-mono text-[10px]">
                {text}
              </span>
            </Swap>
          ))}
        </div>
      </div>

      {/* Governance footer - always on, never a stage */}
      <div className="px-4 py-2.5 border-t border-line-soft font-mono text-[10px] uppercase tracking-[0.08em] opacity-70 flex flex-wrap gap-x-4 gap-y-1">
        <span>every action logged</span>
        <span>access controlled</span>
        <span>data stays in your environment</span>
      </div>
    </div>
  )
}
