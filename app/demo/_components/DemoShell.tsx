'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDemo } from '../_lib/store'
import { Avatar, Button, selectClass } from './ui'

const NAV = [
  { href: '/demo/tracker', label: 'Tracker', icon: 'board' },
  { href: '/demo/platform', label: 'Platform', icon: 'grid' },
] as const

const SIDEBAR_KEY = 'cs-demo-sidebar'

function Icon({ name }: { name: 'board' | 'grid' | 'collapse' | 'expand' }) {
  const common = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'board')
    return (
      <svg {...common}>
        <rect x="2" y="2.5" width="3.5" height="11" rx="0.8" />
        <rect x="6.25" y="2.5" width="3.5" height="7" rx="0.8" />
        <rect x="10.5" y="2.5" width="3.5" height="9" rx="0.8" />
      </svg>
    )
  if (name === 'grid')
    return (
      <svg {...common}>
        <rect x="2" y="2" width="5" height="5" rx="0.8" />
        <rect x="9" y="2" width="5" height="5" rx="0.8" />
        <rect x="2" y="9" width="5" height="5" rx="0.8" />
        <rect x="9" y="9" width="5" height="5" rx="0.8" />
      </svg>
    )
  if (name === 'collapse')
    return (
      <svg {...common}>
        <path d="M10 3L5 8l5 5" />
        <path d="M13 3v10" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M6 3l5 5-5 5" />
      <path d="M3 3v10" />
    </svg>
  )
}

// App shell: collapsible left sidebar with navigation and the demo controls.
export default function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state, actor, actors, run } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(SIDEBAR_KEY) === 'closed')
    } catch {
      // ignore
    }
  }, [])

  const toggle = () => {
    setCollapsed((c) => {
      try {
        localStorage.setItem(SIDEBAR_KEY, c ? 'open' : 'closed')
      } catch {
        // ignore
      }
      return !c
    })
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside
        className={`lg:shrink-0 lg:fixed lg:inset-y-0 lg:left-0 ${collapsed ? 'lg:w-[48px]' : 'lg:w-[232px]'} bg-pm-surface border-b lg:border-b-0 lg:border-r border-pm-border flex flex-col z-20 lg:transition-[width] lg:duration-200 lg:overflow-hidden`}
        data-collapsed={collapsed || undefined}
      >

        {/* Header: logo and the collapse toggle */}
        <div className={`flex items-start ${collapsed ? 'lg:flex-col lg:items-center lg:px-0' : ''} px-5 pt-5 pb-4 gap-3`}>
          {!collapsed ? (
            <div className="min-w-0 flex-1">
              <Image src="/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width={625} height={125} className="h-6 w-auto" priority />
              <span className="mt-3 inline-block rounded-[4px] bg-pm-primary-soft text-pm-primary text-[11px] font-medium px-2 py-1 whitespace-nowrap">Example project management tool</span>
            </div>
          ) : (
            <Image src="/CoreSentia_Original_Logo_Symbol_Cropped.png" alt="CoreSentia" width={120} height={120} className="hidden lg:block h-6 w-6" priority />
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded-md text-pm-muted hover:bg-pm-hover hover:text-pm-text transition-colors"
          >
            <Icon name={collapsed ? 'expand' : 'collapse'} />
          </button>
        </div>

        <nav className={`flex lg:flex-col gap-1 ${collapsed ? 'lg:px-2' : 'px-3'} px-3`}>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors ${collapsed ? 'lg:justify-center lg:px-0 lg:h-9' : ''} px-3 py-2 ${active ? 'bg-pm-primary-soft text-pm-primary' : 'text-pm-text hover:bg-pm-hover'}`}
              >
                <span className={active ? 'text-pm-primary' : 'text-pm-muted'}>
                  <Icon name={item.icon} />
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer: acting-as, reset, sign out */}
        {collapsed ? (
          <div className="hidden lg:flex mt-auto flex-col items-center gap-3 py-4 border-t border-pm-border">
            <Avatar name={actor.name} size={26} />
          </div>
        ) : (
          <div className="lg:mt-auto px-5 py-4 lg:border-t border-pm-border flex lg:flex-col flex-wrap items-center lg:items-stretch gap-3">
            <label className="flex items-center gap-2 min-w-0">
              <Avatar name={actor.name} size={26} />
              <span className="sr-only">Acting as</span>
              <select value={state.actingAs} onChange={(e) => run({ type: 'setActingAs', id: e.target.value })} className={selectClass + ' h-8 text-[12.5px] w-full'} aria-label="Acting as">
                {actors.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden lg:block text-[11px] text-pm-muted -mt-1">{actor.role}</div>
            <div className="flex items-center gap-2">
              {confirmReset ? (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      run({ type: 'reset' })
                      setConfirmReset(false)
                    }}
                  >
                    Confirm reset
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                    Keep
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmReset(true)} className="-ml-3">
                  Reset demo data
                </Button>
              )}
              <form method="post" action="/demo/signout" className="lg:ml-auto">
                <Button type="submit" variant="ghost" size="sm">
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        )}
      </aside>

      <div className={`flex-1 min-w-0 ${collapsed ? 'lg:pl-[48px]' : 'lg:pl-[232px]'} lg:transition-[padding] lg:duration-200`}>{children}</div>
    </div>
  )
}
