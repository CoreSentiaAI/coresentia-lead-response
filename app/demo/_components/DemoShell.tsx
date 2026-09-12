'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDemo } from '../_lib/store'
import { Avatar, Button, selectClass } from './ui'

const NAV = [
  { href: '/demo/tracker', label: 'Tracker', hint: 'Requests and delivery' },
  { href: '/demo/platform', label: 'Platform', hint: 'Modules built so far' },
]

// App shell: left sidebar with navigation and the demo controls, content on the right.
export default function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state, actor, actors, run } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="min-h-screen lg:flex">
      <aside className="lg:w-[232px] lg:shrink-0 lg:fixed lg:inset-y-0 lg:left-0 bg-pm-surface border-b lg:border-b-0 lg:border-r border-pm-border flex flex-col z-20">
        <div className="px-5 pt-5 pb-4">
          <Image src="/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width={625} height={125} className="h-6 w-auto" priority />
          <span className="mt-3 inline-block rounded-[4px] bg-pm-primary-soft text-pm-primary text-[11px] font-medium px-2 py-1">Example project management tool</span>
        </div>

        <nav className="px-3 flex lg:flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${active ? 'bg-pm-primary-soft text-pm-primary' : 'text-pm-text hover:bg-pm-hover'}`}
              >
                <span>{item.label}</span>
                <span className={`hidden lg:inline text-[11px] font-normal ${active ? 'text-pm-primary' : 'text-pm-faint'}`}>{item.hint}</span>
              </Link>
            )
          })}
        </nav>

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
      </aside>

      <div className="flex-1 min-w-0 lg:pl-[232px]">{children}</div>
    </div>
  )
}
