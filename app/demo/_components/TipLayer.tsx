'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// One tooltip for the whole demo. Any element with data-tip gets it on
// hover. Rendered above the page so scrolling containers cannot clip it.
export default function TipLayer() {
  const [tip, setTip] = useState<{ text: string; x: number; y: number; below: boolean } | null>(null)

  useEffect(() => {
    const show = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tip]') as HTMLElement | null
      if (!el) return
      const text = el.getAttribute('data-tip') ?? ''
      if (!text) return
      const r = el.getBoundingClientRect()
      const below = r.top < 64
      setTip({ text, x: Math.min(Math.max(r.left + r.width / 2, 150), window.innerWidth - 150), y: below ? r.bottom + 8 : r.top - 8, below })
    }
    const hide = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tip]')
      if (el) setTip(null)
    }
    const clear = () => setTip(null)
    document.addEventListener('mouseover', show)
    document.addEventListener('mouseout', hide)
    document.addEventListener('scroll', clear, true)
    return () => {
      document.removeEventListener('mouseover', show)
      document.removeEventListener('mouseout', hide)
      document.removeEventListener('scroll', clear, true)
    }
  }, [])

  if (!tip) return null
  return createPortal(
    <div
      className="pm fixed z-[70] pointer-events-none max-w-[280px] w-max rounded-md px-2.5 py-1.5 text-[12px] leading-snug text-white bg-[#1c2430] shadow-[0_6px_20px_rgba(16,24,40,0.2)]"
      style={{ left: tip.x, top: tip.y, transform: `translate(-50%, ${tip.below ? '0' : '-100%'})`, background: '#1c2430' }}
      role="tooltip"
    >
      {tip.text}
    </div>,
    document.body,
  )
}
