'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { WORKSTREAMS, useDemo } from '../_lib/store'
import { TONES } from '../_lib/tones'
import { Avatar, Button, selectClass } from './ui'
import { Icon } from './icons'
import NotificationsPanel from './NotificationsPanel'
import AskPanel from './AskPanel'

const NAV = [
  { href: '/demo/tracker', label: 'Tracker', icon: 'board' },
  { href: '/demo/platform', label: 'Platform', icon: 'grid' },
] as const

const SIDEBAR_KEY = 'cs-demo-sidebar'

// App shell: collapsible left sidebar with navigation and the demo controls.
export default function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const search = useSearchParams()
  const { state, actor, actors, run } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [framed, setFramed] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [askOpen, setAskOpen] = useState(false)
  const unread = state.notifications.filter((n) => n.to === actor.name && !n.read).length

  const previewing = pathname === '/demo/preview'
  const previewDevice = previewing ? search.get('device') ?? 'phone' : 'desktop'
  const previewPath = previewing ? search.get('path') ?? '/demo/tracker' : pathname
  const DEVICES = [
    { key: 'desktop', label: 'Desktop', href: previewing ? previewPath : pathname, icon: 'desktop' as const },
    { key: 'tablet', label: 'Tablet', href: `/demo/preview?device=tablet&path=${encodeURIComponent(previewing ? previewPath : pathname)}`, icon: 'tablet' as const },
    { key: 'phone', label: 'Phone', href: `/demo/preview?device=phone&path=${encodeURIComponent(previewing ? previewPath : pathname)}`, icon: 'phone' as const },
  ]

  useEffect(() => {
    setFramed(window.self !== window.top)
  }, [])

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
        className={`lg:shrink-0 lg:fixed lg:inset-y-0 lg:left-0 ${collapsed ? 'lg:w-[48px]' : 'lg:w-[232px]'} bg-pm-surface border-b lg:border-b-0 lg:border-r border-pm-border flex flex-row flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 lg:flex-col lg:flex-nowrap lg:items-stretch lg:gap-0 lg:px-0 lg:py-0 z-20 lg:transition-[width] lg:duration-200 lg:overflow-hidden`}
        data-collapsed={collapsed || undefined}
      >

        {/* Header: logo and the collapse toggle */}
        <div className={`flex items-start ${collapsed ? 'lg:flex-col lg:items-center lg:px-0 lg:gap-2' : 'lg:px-5 gap-3'} lg:pt-5 lg:pb-4`}>
          {!collapsed ? (
            <div className="min-w-0 flex-1">
              <Image src="/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width={625} height={125} className="h-6 w-auto" priority />
              <span className="hidden lg:inline-block mt-3 rounded-[4px] bg-pm-primary-soft text-pm-primary text-[11px] font-medium px-2 py-1 whitespace-nowrap">Example project management tool</span>
            </div>
          ) : (
            <Image src="/CoreSentia_Original_Logo_Symbol_Cropped.png" alt="CoreSentia" width={405} height={421} className="hidden lg:block h-7 w-auto" priority />
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

        <nav className={`flex lg:flex-col gap-1 ${collapsed ? 'lg:px-2' : 'lg:px-3'}`}>
          {NAV.map((item) => {
            const onTracker = item.href === '/demo/tracker'
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            const wsParam = onTracker && pathname === '/demo/tracker' ? search.get('ws') ?? 'all' : null
            return (
              <div key={item.href} className="lg:contents">
                <Link
                  href={item.href}
                  data-tour={item.href === '/demo/platform' ? 'nav-platform' : undefined}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors ${collapsed ? 'lg:justify-center lg:px-0 lg:h-9' : ''} px-3 py-2 ${active && !(onTracker && wsParam && wsParam !== 'all') ? 'bg-pm-primary-soft text-pm-primary' : active ? 'text-pm-primary' : 'text-pm-text hover:bg-pm-hover'}`}
                >
                  <span className={active ? 'text-pm-primary' : 'text-pm-muted'}>
                    <Icon name={item.icon} />
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
                {onTracker && !collapsed && (
                  <div className="hidden lg:block pl-4 pb-1" data-tour="workstreams">
                    <div className="pl-4 pt-1.5 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-pm-muted">Workstreams</div>
                    <div className="border-l border-pm-border pl-2 space-y-0.5">
                      <Link href="/demo/tracker" className={`flex items-center gap-2 h-8 rounded-md px-2 text-[12.5px] transition-colors ${wsParam === 'all' ? 'bg-pm-primary-soft text-pm-primary font-medium' : 'text-pm-text hover:bg-pm-hover'}`}>
                        <span className="h-2 w-2 rounded-full border border-pm-border-strong" />
                        <span className="truncate">All work</span>
                        <span className="ml-auto text-[11px] text-pm-muted">{state.briefs.length}</span>
                      </Link>
                      {WORKSTREAMS.map((w) => {
                        const mine = state.briefs.filter((b) => b.workstream === w.id)
                        const done = mine.filter((b) => b.stage === 'Complete').length
                        const on = wsParam === w.id
                        return (
                          <Link key={w.id} href={`/demo/tracker?ws=${w.id}`} className={`flex items-center gap-2 h-8 rounded-md px-2 text-[12.5px] transition-colors ${on ? 'bg-pm-primary-soft text-pm-primary font-medium' : 'text-pm-text hover:bg-pm-hover'}`}>
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: TONES[w.tone].dot }} />
                          <span className="truncate">{w.name}</span>
                          <span className="ml-auto text-[11px] text-pm-muted whitespace-nowrap">
                            {done}/{mine.length}
                          </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Notifications and Ask */}
        <div className={`flex lg:flex-col gap-1 ${collapsed ? 'lg:px-2 lg:items-center' : 'lg:px-3'} lg:mt-3`}>
          <button
            type="button"
            onClick={() => setNotifOpen(true)}
            data-tour="notifications"
            title="Notifications"
            className={`relative flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors text-pm-text hover:bg-pm-hover ${collapsed ? 'lg:justify-center lg:px-0 lg:h-9 lg:w-9' : 'px-3 py-2'}`}
          >
            <span className="text-pm-muted relative">
              <Icon name="bell" />
              {unread > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#c93b3b] text-white text-[10px] font-semibold flex items-center justify-center">{unread}</span>}
            </span>
            {!collapsed && <span>Notifications</span>}
            {!collapsed && unread > 0 && <span className="ml-auto text-[11px] text-pm-muted">{unread} new</span>}
          </button>
          <button
            type="button"
            onClick={() => setAskOpen(true)}
            data-tour="ask"
            title="Ask the tracker"
            className={`flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-colors text-pm-text hover:bg-pm-hover ${collapsed ? 'lg:justify-center lg:px-0 lg:h-9 lg:w-9' : 'px-3 py-2'}`}
          >
            <span className="text-pm-primary">
              <Icon name="spark" />
            </span>
            {!collapsed && <span>Ask the tracker</span>}
          </button>
        </div>

        {/* Preview on: desktop, tablet, phone. Desktop only, and never inside the preview frame itself. */}
        {!framed && (
          <div className={`hidden lg:block lg:mt-auto ${collapsed ? 'px-2 pb-2' : 'px-3 pb-3'}`}>
            {!collapsed && <div className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted">Preview on</div>}
            <div className={collapsed ? 'flex flex-col items-center gap-1' : 'grid grid-cols-3 gap-1.5'} data-tour="preview">
              {DEVICES.map((d) => {
                const active = previewDevice === d.key
                return (
                  <Link
                    key={d.key}
                    href={d.href}
                    title={d.label}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-center rounded-md font-medium transition-colors ${collapsed ? 'h-9 w-9' : 'flex-col gap-1 h-[52px] text-[11px]'} ${active ? 'bg-pm-primary text-white shadow-[0_2px_6px_rgba(45,91,209,0.35)]' : 'border border-pm-border text-pm-muted hover:text-pm-text hover:border-pm-border-strong hover:bg-pm-hover'}`}
                  >
                    <Icon name={d.icon} />
                    {!collapsed && <span>{d.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer: acting-as, reset, sign out */}
        {collapsed ? (
          <div className={`hidden lg:flex ${framed ? 'mt-auto' : ''} flex-col items-center gap-3 py-4 border-t border-pm-border`}>
            <Avatar name={actor.name} size={26} />
          </div>
        ) : (
          <div className={`ml-auto lg:ml-0 ${framed ? 'lg:mt-auto' : ''} lg:px-5 lg:py-4 lg:border-t border-pm-border flex lg:flex-col flex-wrap items-center lg:items-stretch gap-2 lg:gap-3`}>
            <label className="flex items-center gap-2 min-w-0">
              <Avatar name={actor.name} size={26} />
              <span className="sr-only">Acting as</span>
              <select value={state.actingAs} onChange={(e) => run({ type: 'setActingAs', id: e.target.value })} className={selectClass + ' h-8 text-[12.5px] lg:w-full'} aria-label="Acting as">
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
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <AskPanel open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  )
}
