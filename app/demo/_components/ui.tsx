'use client'
import { useEffect } from 'react'

// Small shared pieces for the demo screens, styled to the site's flat-card
// language: 1px lines, radius no larger than 4px, mono for controls.

const fieldBase =
  'px-3 py-2 bg-surface-raised border border-line-strong rounded-sm font-mono text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors'

export const inputClass = fieldBase + ' w-full'

// Selects size to content unless a caller adds w-full
export const selectClass = fieldBase + ' pr-8 appearance-none bg-no-repeat bg-[right_0.6rem_center] bg-[length:0.6rem] select-arrow'

export const btnPrimary =
  'btn inline-flex items-center justify-center bg-accent text-[#0d0d0c] font-medium rounded-sm px-5 py-3 hover:bg-[#4dc4e8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export const btnSecondary =
  'btn inline-flex items-center justify-center border border-line-strong rounded-sm px-5 py-3 hover:border-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

export const btnLink = 'btn text-accent-ink hover:underline underline-offset-4'

type Tone = 'line' | 'accent' | 'fill'

export function Tag({ children, tone = 'line', className = '' }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  const tones: Record<Tone, string> = {
    line: 'border border-line-strong',
    accent: 'border border-accent text-accent-ink',
    fill: 'bg-accent text-[#0d0d0c] border border-accent',
  }
  return (
    <span className={`inline-flex items-center font-mono text-[0.62rem] uppercase tracking-[0.08em] leading-none px-1.5 py-1 rounded-sm whitespace-nowrap ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`section-label ${className}`}>{children}</div>
}

export function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
    </div>
  )
}

export function SlideOver({ open, onClose, children, width = 'max-w-2xl' }: { open: boolean; onClose: () => void; children: React.ReactNode; width?: string }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(22,22,21,0.35)]" />
      <div className={`relative h-full w-full ${width} bg-surface-base border-l border-line-strong overflow-y-auto`}>
        <div className="sticky top-0 z-10 flex justify-end px-6 pt-4 bg-surface-base">
          <button type="button" onClick={onClose} className={btnLink}>
            Close
          </button>
        </div>
        <div className="px-6 pb-16 pt-2">{children}</div>
      </div>
    </div>
  )
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-xs py-3">{children}</div>
}
