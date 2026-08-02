'use client'
import { useEffect, useRef, useState } from 'react'

/* Timing - one config object. The real sequence takes minutes in
   production; this compresses it to ~14 seconds. */
const ANIMATION = {
  stepGap: 1500,      // ms between sequence steps
  typeSpeed: 26,      // ms per character when a field types itself
  fadeMs: 450,        // element reveal duration
  threshold: 0.35,    // intersection ratio that starts the sequence
}

/* The sequence. Each step lands one log line and one mutation on the job page. */
const STEPS = [
  { time: '16:42:07', source: 'webhook', text: 'contract signed - residential, $14,820' },
  { time: '16:42:08', source: 'ai', text: 'validation passed - every field checked' },
  { time: '16:42:09', source: 'crm', text: 'job created - 28 fields populated' },
  { time: '16:42:11', source: 'pipeline', text: 'stage 1 of 17 - preliminary assessment' },
  { time: '16:42:12', source: 'drive', text: 'folder structure created, contract archived' },
  { time: '16:42:13', source: 'inventory', text: 'draft sales order SO-4119 raised' },
  { time: '16:42:14', source: 'field', text: 'site inspection dispatched' },
  { time: '16:42:15', source: 'chat', text: 'team notified' },
]
const DONE = STEPS.length // step value when the sequence has finished

/* A value that types itself in when activated */
function Typed({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) {
      setN(0)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length)
      return
    }
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const t = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) clearInterval(interval)
      }, ANIMATION.typeSpeed)
    }, delay)
    return () => {
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [active, text, delay])
  return (
    <span>
      {text.slice(0, n)}
      {active && n < text.length && <span className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-px" />}
    </span>
  )
}

/* Reveal wrapper - opacity/translate only, per DESIGN.md */
function Reveal({ on, children, className = '' }: { on: boolean; children: React.ReactNode; className?: string }) {
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

export default function JobWriter() {
  const [step, setStep] = useState(-1) // -1 = not started
  const [runId, setRunId] = useState(0)
  const started = step >= 0
  const rootRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Start on scroll into view
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStep((s) => (s < 0 ? 0 : s))
          obs.disconnect()
        }
      },
      { threshold: ANIMATION.threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Advance the sequence
  useEffect(() => {
    if (!started) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(DONE)
      return
    }
    for (let s = step + 1; s <= DONE; s++) {
      // the CRM step types four fields - give it extra room
      const extra = s > 2 ? 1200 : 0
      timers.current.push(setTimeout(() => setStep(s), (s - step) * ANIMATION.stepGap + extra))
    }
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, runId])

  const replay = () => {
    timers.current.forEach(clearTimeout)
    setStep(0)
    setRunId((r) => r + 1)
  }

  const at = (n: number) => step >= n

  return (
    <div ref={rootRef} className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
      {/* Event log */}
      <div className="lg:col-span-2 font-mono text-xs leading-relaxed">
        <div className="flex items-center justify-between border-b border-line-soft pb-2 mb-3 uppercase tracking-[0.08em] text-[10px]">
          <span>event log</span>
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${at(DONE) ? 'bg-accent' : started ? 'bg-line-strong' : 'bg-line-soft'}`} />
            {at(DONE) ? 'complete' : started ? 'running' : 'waiting'}
          </span>
        </div>
        <div className="space-y-2">
          {STEPS.map((s, i) => (
            <Reveal key={`${runId}-${s.time}`} on={at(i)}>
              <div className="flex gap-3">
                <span className="shrink-0 opacity-60">{s.time}</span>
                <span className={`shrink-0 w-16 ${i === 1 || i === DONE - 1 ? 'text-accent-ink' : ''}`}>{s.source}</span>
                <span>{s.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal on={at(DONE)} className="mt-6">
          <p className="font-serif text-base text-ink-1 normal-case tracking-normal">
            Minutes in production. Fourteen seconds here. No human touched any of it.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] opacity-60">
            real sequence &middot; illustrative data
          </p>
          <button
            onClick={replay}
            className="btn mt-4 px-4 py-2 rounded-sm border border-line-strong hover:border-accent transition-colors"
          >
            &#8635; replay
          </button>
        </Reveal>
      </div>

      {/* The job page, writing itself */}
      <div className="lg:col-span-3">
        <Reveal on={at(0)}>
          <div className="border border-line-soft rounded bg-surface-card overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-line-soft font-mono text-[10px] uppercase tracking-[0.08em]">
              <span>platform / job #4119</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${at(DONE) ? 'bg-accent' : 'bg-line-strong'}`} />
                {at(DONE) ? 'ready' : 'writing'}
              </span>
            </div>

            <div className="p-4 lg:p-6 space-y-5">
              {/* Validation */}
              <Reveal on={at(1)}>
                <div className="font-mono text-[10px] uppercase tracking-[0.08em]">
                  <span className="text-accent-ink">all checks passed</span>
                  <span className="opacity-60"> &middot; data validated before it propagates</span>
                </div>
              </Reveal>

              {/* Fields - typed in by the CRM step */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { label: 'customer', value: 'S. Mitchell', delay: 0 },
                  { label: 'site', value: 'Kenmore QLD 4069', delay: 400 },
                  { label: 'system', value: '6.6 kW + 10 kWh battery', delay: 800 },
                  { label: 'contract value', value: '$14,820 inc GST', delay: 1400 },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60 mb-1">{f.label}</div>
                    <div className="font-mono text-sm min-h-[1.5em]">
                      <Typed key={runId} text={f.value} active={at(2)} delay={f.delay} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pipeline */}
              <Reveal on={at(3)}>
                <div>
                  <div className="flex gap-[3px] mb-1.5">
                    {[...Array(17)].map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-sm ${i === 0 && at(3) ? 'bg-accent' : 'bg-line-soft'}`}
                        style={{ transition: `background-color ${ANIMATION.fadeMs}ms` }}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60">
                    stage 1 of 17 &middot; preliminary assessment
                  </div>
                </div>
              </Reveal>

              {/* Documents */}
              <Reveal on={at(4)}>
                <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                  {['contract.pdf - archived', 'site-photos/', 'approvals/'].map((doc) => (
                    <span key={doc} className="px-2 py-1 rounded-sm border border-line-strong bg-surface-raised">
                      {doc}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Inventory */}
              <Reveal on={at(5)}>
                <div className="border border-line-soft rounded-sm">
                  <div className="px-3 py-1.5 border-b border-line-soft font-mono text-[10px] uppercase tracking-[0.08em] opacity-60">
                    draft sales order &middot; SO-4119
                  </div>
                  <div className="px-3 py-2 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between"><span>440W panel</span><span>&times; 15</span></div>
                    <div className="flex justify-between"><span>6kW hybrid inverter</span><span>&times; 1</span></div>
                    <div className="flex justify-between"><span>10kWh battery</span><span>&times; 1</span></div>
                  </div>
                </div>
              </Reveal>

              {/* Task */}
              <Reveal on={at(6)}>
                <div className="flex items-center justify-between border border-line-soft rounded-sm px-3 py-2 font-mono text-[11px]">
                  <span>site inspection - dispatched to field team</span>
                  <span className="opacity-60">due Thu</span>
                </div>
              </Reveal>
            </div>

            {/* Toast */}
            <div className="relative h-0">
              <div
                className="absolute right-3 -top-2 border border-line-strong rounded-sm bg-surface-base px-2.5 py-1.5 font-mono text-[10px]"
                style={{
                  opacity: at(7) ? 1 : 0,
                  transform: at(7) ? 'translateY(-100%)' : 'translateY(calc(-100% + 8px))',
                  transition: `opacity ${ANIMATION.fadeMs}ms ease-out, transform ${ANIMATION.fadeMs}ms ease-out`,
                }}
              >
                google chat &middot; team notified
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
