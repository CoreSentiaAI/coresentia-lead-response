'use client'
import Link from 'next/link'
import { useDemo } from '../_lib/store'
import type { Notification, NotifyPref } from '../_lib/types'
import { fmtDateTime } from '../_lib/format'
import { Button, Chip } from './ui'
import { Icon } from './icons'

const KIND: Record<Notification['kind'], { label: string; tone: 'blue' | 'purple' | 'amber' | 'green' | 'red' | 'teal' }> = {
  assigned: { label: 'Assigned', tone: 'blue' },
  stage: { label: 'Stage', tone: 'purple' },
  feedback: { label: 'Feedback', tone: 'amber' },
  signoff: { label: 'Sign-off', tone: 'green' },
  hotfix: { label: 'Hotfix', tone: 'red' },
  po: { label: 'Purchase order', tone: 'teal' },
}

// Per-person notification centre. Everything that happens to a brief or a
// PO you are named on lands here, and, by preference, in your email.
export default function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, actor, run } = useDemo()
  if (!open) return null
  const mine = state.notifications.filter((n) => n.to === actor.name).sort((a, b) => (a.at < b.at ? 1 : -1))
  const unread = mine.filter((n) => !n.read).length
  const pref: NotifyPref = state.notifyPrefs[actor.name] ?? 'immediate'
  const hrefFor = (n: Notification) => {
    if (!n.briefId) return '/demo/purchase-orders'
    const b = state.briefs.find((x) => x.id === n.briefId)
    return b ? `/demo/tracker?ws=${b.workstream}&brief=${b.id}` : '/demo/tracker'
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button type="button" aria-label="Close notifications" onClick={onClose} className="absolute inset-0 bg-[rgba(16,24,40,0.18)]" />
      <div className="relative h-full w-full max-w-[420px] bg-pm-surface border-l border-pm-border shadow-[0_0_60px_rgba(16,24,40,0.2)] flex flex-col">
        <div className="px-5 py-4 border-b border-pm-border flex items-center gap-3">
          <div>
            <div className="text-[15px] font-semibold">Notifications</div>
            <div className="text-[12px] text-pm-muted">
              {actor.name}, {unread} unread
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {unread > 0 && (
              <Button variant="ghost" size="sm" onClick={() => run({ type: 'markAllRead', who: actor.name })}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
              <Icon name="close" size={14} />
            </Button>
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-pm-border">
          {mine.length === 0 && <li className="px-5 py-8 text-[13px] text-pm-muted">Nothing yet. You will hear about briefs and purchase orders you are named on.</li>}
          {mine.map((n) => (
            <li key={n.id} className={`px-5 py-3.5 ${n.read ? '' : 'bg-pm-primary-soft/40'}`}>
              <Link href={hrefFor(n)} onClick={() => { run({ type: 'markRead', id: n.id }); onClose() }} className="block group">
                <div className="flex items-center gap-2">
                  {!n.read && <span className="h-2 w-2 rounded-full bg-pm-primary shrink-0" />}
                  <Chip tone={KIND[n.kind].tone}>{KIND[n.kind].label}</Chip>
                  <span className="ml-auto text-[11.5px] text-pm-muted whitespace-nowrap">{fmtDateTime(n.at)}</span>
                </div>
                <div className={`mt-1.5 text-[13px] leading-snug group-hover:text-pm-primary ${n.read ? 'text-pm-text' : 'font-medium'}`}>{n.text}</div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-5 py-4 border-t border-pm-border bg-pm-hover">
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-pm-muted">Email alerts</div>
          <div className="mt-2 inline-flex rounded-md border border-pm-border bg-pm-surface p-0.5">
            {(['immediate', 'daily', 'off'] as NotifyPref[]).map((p) => (
              <button key={p} type="button" onClick={() => run({ type: 'setNotifyPref', who: actor.name, pref: p })} aria-pressed={pref === p} className={`h-8 px-3 rounded-[5px] text-[12.5px] font-medium transition-colors ${pref === p ? 'bg-pm-primary-soft text-pm-primary' : 'text-pm-muted hover:text-pm-text'}`}>
                {p === 'immediate' ? 'Immediately' : p === 'daily' ? 'Daily digest' : 'Off'}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[12px] text-pm-muted">{pref === 'off' ? 'No emails. Everything still lands here.' : pref === 'daily' ? 'One email each morning with what changed.' : 'An email the moment something needs you.'}</div>
        </div>
      </div>
    </div>
  )
}
