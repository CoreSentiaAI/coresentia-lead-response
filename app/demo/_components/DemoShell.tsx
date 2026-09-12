'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDemo } from '../_lib/store'
import { TENANT } from '../_lib/seed'
import { selectClass } from './ui'

const NAV = [
  { href: '/demo/tracker', label: 'Tracker' },
  { href: '/demo/purchase-orders', label: 'Purchase orders' },
  { href: '/demo/modules', label: 'Modules' },
]

export default function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state, actor, actors, run } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line-soft">
        <div className="max-w-[1720px] mx-auto px-6 min-h-16 py-3 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/demo/tracker" className="flex items-center gap-4 shrink-0">
            <Image src="/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width={625} height={125} className="h-7 w-auto" priority />
            <span className="hidden md:inline font-mono text-[0.68rem] uppercase tracking-[0.1em] border-l border-line-strong pl-4">
              {TENANT.name}
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`btn py-1 border-b ${active ? 'border-accent text-ink-1' : 'border-transparent hover:border-line-strong'}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2">
            <label className="hidden lg:flex items-center gap-2">
              <span className="btn whitespace-nowrap">Acting as</span>
              <select
                value={state.actingAs}
                onChange={(e) => run({ type: 'setActingAs', id: e.target.value })}
                className={selectClass + ' py-1.5 text-xs'}
              >
                {actors.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>

            {confirmReset ? (
              <span className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    run({ type: 'reset' })
                    setConfirmReset(false)
                  }}
                  className="btn text-accent-ink hover:underline underline-offset-4"
                >
                  Confirm reset
                </button>
                <button type="button" onClick={() => setConfirmReset(false)} className="btn hover:underline underline-offset-4">
                  Keep
                </button>
              </span>
            ) : (
              <button type="button" onClick={() => setConfirmReset(true)} className="btn hover:underline underline-offset-4">
                Reset demo data
              </button>
            )}

            <form method="post" action="/demo/signout">
              <button type="submit" className="btn hover:underline underline-offset-4">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-6 py-8">{children}</main>

      <footer className="border-t border-line-soft">
        <div className="max-w-[1720px] mx-auto px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.08em]">
          <span>Demo tenant. Fictional data.</span>
          <span>Signed in as {actor.name}, {actor.role}.</span>
          <span>Nothing here leaves the browser.</span>
        </div>
      </footer>
    </div>
  )
}
