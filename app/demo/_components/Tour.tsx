'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './ui'
import { Icon } from './icons'

// Guided tour. Numbered beacons sit on the components that matter; each opens
// a popover with the explanation, and Next walks through them. Targets are
// found by data-tour attributes, so the tour lives alongside the real UI
// rather than replacing it with a page of text.

export type TourStep = {
  id: string
  title: string
  body: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  anchor?: 'tr' | 'tl' | 'r' | 'l' | 'br'
}

const KEY = 'cs-demo-tour'
const POP_W = 328
const POP_H = 210
const GAP = 14

export const TOUR_START = 'cs-tour:start'

type Rects = Record<string, DOMRect>

export default function Tour({ steps }: { steps: TourStep[] }) {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [rects, setRects] = useState<Rects>({})
  const [vp, setVp] = useState({ w: 0, h: 0 })
  const popRef = useRef<HTMLDivElement>(null)
  const [popH, setPopH] = useState(POP_H)

  const measure = useCallback(() => {
    const next: Rects = {}
    for (const s of steps) {
      const el = document.querySelector<HTMLElement>(`[data-tour="${s.id}"]`)
      if (el) next[s.id] = el.getBoundingClientRect()
    }
    setRects(next)
    setVp({ w: window.innerWidth, h: window.innerHeight })
  }, [steps])

  useEffect(() => {
    setMounted(true)
    try {
      setHidden(localStorage.getItem(KEY) === 'hidden')
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    measure()
    const on = () => measure()
    window.addEventListener('scroll', on, true)
    window.addEventListener('resize', on)
    const ro = new ResizeObserver(on)
    ro.observe(document.body)
    const t = setInterval(on, 700)
    return () => {
      window.removeEventListener('scroll', on, true)
      window.removeEventListener('resize', on)
      ro.disconnect()
      clearInterval(t)
    }
  }, [mounted, measure])

  const open = useCallback(
    (i: number) => {
      const s = steps[i]
      const el = s && document.querySelector<HTMLElement>(`[data-tour="${s.id}"]`)
      if (!el) return
      el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
      setHidden(false)
      try {
        localStorage.setItem(KEY, 'shown')
      } catch {
        // ignore
      }
      setActive(i)
      setTimeout(measure, 350)
    },
    [steps, measure],
  )

  useEffect(() => {
    const start = () => open(0)
    window.addEventListener(TOUR_START, start)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener(TOUR_START, start)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (active === null || !popRef.current) return
    setPopH(popRef.current.getBoundingClientRect().height)
  }, [active])

  const hideAll = () => {
    setActive(null)
    setHidden(true)
    try {
      localStorage.setItem(KEY, 'hidden')
    } catch {
      // ignore
    }
  }

  if (!mounted) return null

  const step = active !== null ? steps[active] : null
  const rect = step ? rects[step.id] : undefined

  // Popover position: preferred placement, flipped when it would leave the viewport, then clamped.
  let pop: { top: number; left: number; placement: TourStep['placement'] } | null = null
  if (step && rect) {
    let placement = step.placement ?? 'bottom'
    if (placement === 'bottom' && rect.bottom + GAP + popH > vp.h - 12) placement = 'top'
    if (placement === 'top' && rect.top - GAP - popH < 12) placement = 'bottom'
    if (placement === 'right' && rect.right + GAP + POP_W > vp.w - 12) placement = 'left'
    if (placement === 'left' && rect.left - GAP - POP_W < 12) placement = 'right'
    let top = 0
    let left = 0
    if (placement === 'bottom') {
      top = rect.bottom + GAP
      left = rect.left
    } else if (placement === 'top') {
      top = rect.top - GAP - popH
      left = rect.left
    } else if (placement === 'right') {
      top = rect.top - 8
      left = rect.right + GAP
    } else {
      top = rect.top - 8
      left = rect.left - GAP - POP_W
    }
    left = Math.max(12, Math.min(left, vp.w - POP_W - 12))
    top = Math.max(12, Math.min(top, vp.h - popH - 12))
    pop = { top, left, placement }
  }

  const beaconPos = (s: TourStep, r: DOMRect) => {
    const a = s.anchor ?? 'tr'
    if (a === 'tl') return { top: r.top - 9, left: r.left - 9 }
    if (a === 'r') return { top: r.top + r.height / 2 - 9, left: r.right - 9 }
    if (a === 'l') return { top: r.top + r.height / 2 - 9, left: r.left - 9 }
    if (a === 'br') return { top: r.bottom - 9, left: r.right - 9 }
    return { top: r.top - 9, left: r.right - 9 }
  }

  return createPortal(
    <div className="pm">
      {/* Beacons */}
      {!hidden &&
        steps.map((s, i) => {
          const r = rects[s.id]
          if (!r || r.width === 0) return null
          const p = beaconPos(s, r)
          const isActive = active === i
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => open(i)}
              aria-label={`Tour step ${i + 1}: ${s.title}`}
              className={`tour-beacon fixed z-[45] h-[18px] w-[18px] rounded-full text-[10px] font-semibold text-white flex items-center justify-center transition-transform hover:scale-110 ${isActive ? 'scale-110' : ''}`}
              style={{ top: p.top, left: p.left, background: '#2d5bd1', boxShadow: '0 0 0 2px #fff, 0 2px 6px rgba(16,24,40,0.25)' }}
            >
              {i + 1}
            </button>
          )
        })}

      {/* Click-away layer, highlight and popover */}
      {step && rect && pop && (
        <>
          <button type="button" aria-label="Close tour step" onClick={() => setActive(null)} className="fixed inset-0 z-[44] cursor-default bg-[rgba(16,24,40,0.12)]" />
          <div
            className="fixed z-[45] pointer-events-none rounded-lg"
            style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12, boxShadow: '0 0 0 2px #2d5bd1, 0 0 0 8px rgba(45,91,209,0.18), 0 12px 30px rgba(45,91,209,0.25)' }}
          />
          <div
            ref={popRef}
            role="dialog"
            aria-label={step.title}
            className="tour-pop fixed z-[46] bg-pm-surface border border-pm-border rounded-lg shadow-[0_18px_50px_rgba(16,24,40,0.28)] p-4"
            style={{ top: pop.top, left: pop.left, width: POP_W }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.04em] text-pm-primary">
                {active! + 1} of {steps.length}
              </span>
              <button type="button" onClick={() => setActive(null)} className="text-pm-muted hover:text-pm-text" aria-label="Close">
                <Icon name="close" size={14} />
              </button>
            </div>
            <div className="mt-1.5 text-[15px] font-semibold leading-snug">{step.title}</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-pm-text">{step.body}</p>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="primary" size="sm" onClick={() => (active! < steps.length - 1 ? open(active! + 1) : setActive(null))}>
                {active! < steps.length - 1 ? 'Next' : 'Done'}
              </Button>
              {active! > 0 && (
                <Button variant="ghost" size="sm" onClick={() => open(active! - 1)}>
                  Back
                </Button>
              )}
              <button type="button" onClick={hideAll} className="ml-auto text-[12px] text-pm-muted hover:text-pm-text">
                Hide tips
              </button>
            </div>
          </div>
        </>
      )}
    </div>,
    document.body,
  )
}

export function startTour() {
  window.dispatchEvent(new Event(TOUR_START))
}
