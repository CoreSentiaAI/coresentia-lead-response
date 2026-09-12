'use client'
import { useState } from 'react'
import { useDemo } from '../_lib/store'
import { Avatar, Button, Chip, selectClass } from './ui'

// Slim top bar for a standalone production mock-up. No tracker navigation.
export default function MockShell({ children }: { children: React.ReactNode }) {
  const { state, actor, actors, run } = useDemo()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="min-h-14 bg-pm-surface border-b border-pm-border px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[14px] font-semibold">Operations platform</span>
        <Chip tone="grey">Production mock-up</Chip>
        <div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="flex items-center gap-2">
            <Avatar name={actor.name} size={24} />
            <span className="sr-only">Acting as</span>
            <select value={state.actingAs} onChange={(e) => run({ type: 'setActingAs', id: e.target.value })} className={selectClass + ' h-8 text-[12.5px]'} aria-label="Acting as">
              {actors.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
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
            <Button variant="ghost" size="sm" onClick={() => setConfirmReset(true)}>
              Reset demo data
            </Button>
          )}
        </div>
      </header>
      {children}
    </div>
  )
}
