'use client'
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import Link from 'next/link'
import { TONES, avatarColor, initials, type Tone } from '../_lib/tones'

// Primitives for the demo project-management tool. Dense, neutral, one blue.

const RING = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,91,209,0.3)]'

const VARIANTS = {
  primary: 'bg-pm-primary text-white border border-transparent hover:bg-pm-primary-hover',
  secondary: 'bg-pm-surface text-pm-text border border-pm-border hover:bg-pm-hover hover:border-pm-border-strong',
  ghost: 'bg-transparent text-pm-muted border border-transparent hover:bg-pm-hover hover:text-pm-text',
  danger: 'bg-pm-surface text-[#9b2c2c] border border-pm-border hover:bg-[#fce8e8] hover:border-[#f0c2c2]',
} as const

const SIZES = { md: 'h-9 px-3.5 text-[13px]', sm: 'h-8 px-3 text-[12.5px]' } as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES }

export function Button({ variant = 'secondary', size = 'md', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${RING} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
}

export function Chip({ tone, children, dot = false, className = '', tip }: { tone: Tone; children: ReactNode; dot?: boolean; className?: string; tip?: string }) {
  const t = TONES[tone]
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-[22px] px-2 rounded-[4px] text-[12px] font-medium leading-none whitespace-nowrap ${tip ? 'pm-tip' : ''} ${className}`}
      style={{ background: t.bg, color: t.fg }}
      data-tip={tip}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: t.dot }} />}
      {children}
    </span>
  )
}

export function Avatar({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <span
      title={name}
      className={`inline-flex items-center justify-center rounded-full text-white font-semibold shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42), background: avatarColor(name) }}
    >
      {initials(name)}
    </span>
  )
}

export function Person({ name, size = 22, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 min-w-0 ${className}`}>
      <Avatar name={name} size={size} />
      <span className="truncate">{name}</span>
    </span>
  )
}

export const inputClass =
  'h-9 w-full rounded-md border border-pm-border bg-pm-surface px-3 text-[13px] text-pm-text focus:border-pm-primary focus:outline-none focus:ring-2 focus:ring-[rgba(45,91,209,0.2)] transition-colors'

export const selectClass =
  'h-9 rounded-md border border-pm-border bg-pm-surface pl-3 pr-8 text-[13px] text-pm-text appearance-none bg-no-repeat bg-[right_0.6rem_center] bg-[length:0.6rem] select-arrow focus:border-pm-primary focus:outline-none focus:ring-2 focus:ring-[rgba(45,91,209,0.2)] transition-colors'

export const textareaClass =
  'w-full min-h-[88px] rounded-md border border-pm-border bg-pm-surface px-3 py-2 text-[13px] text-pm-text focus:border-pm-primary focus:outline-none focus:ring-2 focus:ring-[rgba(45,91,209,0.2)] transition-colors'

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted ${className}`}>{children}</div>
}

export function Field({ label, children, hint, className = '' }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <div className={className}>
      <Kicker className="mb-1.5">{label}</Kicker>
      {children}
      {hint && <div className="mt-1.5 text-[12px] text-pm-muted">{hint}</div>}
    </div>
  )
}

export function Card({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={`bg-pm-surface border border-pm-border rounded-md shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}>{children}</div>
}

export function StatCard({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <Card className="p-4">
      <Kicker>{label}</Kicker>
      <div className="mt-1.5 text-[22px] font-semibold leading-none tracking-[-0.01em]">{value}</div>
      {hint && <div className="mt-1.5 text-[12px] text-pm-muted">{hint}</div>}
    </Card>
  )
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-[13px] font-semibold">{children}</h3>
      {right && <div className="text-[12px] text-pm-muted">{right}</div>}
    </div>
  )
}

export function EmptyText({ children }: { children: ReactNode }) {
  return <div className="py-3 text-[12.5px] text-pm-muted">{children}</div>
}

export function Tabs<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="inline-flex rounded-md border border-pm-border bg-pm-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`h-8 px-3 rounded-[5px] text-[12.5px] font-medium transition-colors ${RING} ${value === o.value ? 'bg-pm-primary-soft text-pm-primary' : 'text-pm-muted hover:text-pm-text'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function PageHeader({
  title,
  subtitle,
  crumbs,
  tabs,
  actions,
  icon,
  kicker,
  meta,
  dataTour,
}: {
  title: string
  subtitle?: string
  crumbs?: { label: string; href?: string }[]
  tabs?: ReactNode
  actions?: ReactNode
  icon?: ReactNode
  kicker?: string
  meta?: ReactNode
  dataTour?: string
}) {
  return (
    <div className="bg-pm-surface border-b border-pm-border px-6 lg:px-8 pt-5 pb-5">
      {crumbs && crumbs.length > 0 && (
        <div className="flex items-center gap-1.5 text-[12px] text-pm-muted mb-3">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-pm-faint">/</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-pm-text">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        <div className="flex items-start gap-4 min-w-0 max-w-3xl" data-tour={dataTour}>
          {icon && <div className="h-11 w-11 shrink-0 rounded-lg bg-pm-primary-soft text-pm-primary flex items-center justify-center">{icon}</div>}
          <div className="min-w-0">
            {kicker && <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-pm-primary">{kicker}</div>}
            <h1 className="mt-0.5 text-[24px] font-semibold leading-tight tracking-[-0.01em]">{title}</h1>
            {subtitle && <p className="mt-1.5 text-[13.5px] leading-relaxed text-pm-muted">{subtitle}</p>}
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3 lg:pt-1">
          {tabs}
          {actions}
        </div>
      </div>
      {meta && <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div>}
    </div>
  )
}

export function Stat({ value, label, tone }: { value: ReactNode; label: string; tone?: 'primary' | 'green' | 'amber' | 'red' }) {
  const dot = tone === 'green' ? '#1e8e5a' : tone === 'amber' ? '#c77700' : tone === 'red' ? '#c93b3b' : tone === 'primary' ? '#2d5bd1' : undefined
  return (
    <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-pm-border bg-pm-surface text-[12.5px]">
      {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
      <span className="font-semibold">{value}</span>
      <span className="text-pm-muted">{label}</span>
    </span>
  )
}

export function Modal({ open, onClose, children, size = 'xl' }: { open: boolean; onClose: () => void; children: ReactNode; size?: 'xl' | 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  const box = size === 'xl' ? 'max-w-[1480px] h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]' : 'max-w-[640px] max-h-[calc(100vh-3rem)]'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(16,24,40,0.45)]" />
      <div role="dialog" aria-modal="true" className={`relative w-full ${box} bg-pm-surface border border-pm-border rounded-lg shadow-[0_24px_64px_rgba(16,24,40,0.28)] flex flex-col overflow-hidden`}>
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ kicker, title, subtitle, chips, onClose }: { kicker?: string; title: string; subtitle?: ReactNode; chips?: ReactNode; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-6 px-6 lg:px-8 py-5 border-b border-pm-border">
      <div className="min-w-0">
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2 className="mt-1 text-[20px] font-semibold leading-tight">{title}</h2>
        {subtitle && <div className="mt-1 text-[13px] text-pm-muted">{subtitle}</div>}
        {chips && <div className="mt-3 flex flex-wrap items-center gap-2">{chips}</div>}
      </div>
      <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0">
        Close
      </Button>
    </div>
  )
}
