'use client'
import Link from 'next/link'
import { useDemo } from '../_lib/store'
import type { Brief } from '../_lib/types'
import { Button, Card, Chip, PageHeader } from './ui'
import type { Tone } from '../_lib/tones'

// The platform is the thing the client ends up owning: one module at a time.
// Each card's status is derived from the tracker, so moving a brief moves the card.

const MODULE_CARDS: { name: string; title: string; body: string; href?: string }[] = [
  { name: 'Purchase Orders', title: 'Purchase orders', body: 'Raise against a project, route by value, approve, post to the ERP. Audit trail on every step.', href: '/demo/platform/purchase-orders' },
  { name: 'Project Register', title: 'Project register', body: 'One record per project: code, client, contract value, key dates, manager. Everything else hangs off it.' },
  { name: 'Progress Claims', title: 'Progress claims', body: 'Monthly claims built from the register and the schedule of rates. Certified tracked against claimed.' },
  { name: 'Variations Log', title: 'Variations log', body: 'Every variation raised, priced, submitted and approved in one list against the project.' },
  { name: 'Site Diary', title: 'Site diary', body: 'Weather, crew, plant, delays and visitors, logged from a phone. The record when a delay claim comes.' },
  { name: 'Subcontractor Onboarding', title: 'Subcontractor onboarding', body: 'Insurances, licences and inductions submitted once, expiry dates tracked, green tick before site.' },
  { name: 'ERP Sync', title: 'ERP sync', body: 'Approved POs post as committed cost with no re-keying. Status flows back when the invoice is matched.' },
  { name: 'Board Reporting', title: 'Board reporting', body: 'The monthly pack from live numbers, each one traceable to its source.' },
]

type Status = { label: string; tone: Tone; live: boolean }

function statusFor(briefs: Brief[], hasPage: boolean): Status {
  const stages = new Set(briefs.filter((b) => b.workType !== 'hotfix').map((b) => b.stage))
  if (stages.has('Done') || stages.has('Production')) return hasPage ? { label: 'Live', tone: 'green', live: true } : { label: 'Built', tone: 'slate', live: false }
  if (stages.has('Testing') || stages.has('Preview') || stages.has('Build')) return { label: 'In build', tone: 'amber', live: false }
  if (stages.has('Locked') || stages.has('Briefed in') || stages.has('Mapping')) return { label: 'Next cycle', tone: 'grey', live: false }
  return { label: 'Planned', tone: 'grey', live: false }
}

export default function PlatformIndex() {
  const { state } = useDemo()
  return (
    <div>
      <PageHeader title="Platform" subtitle="One platform, one module at a time. Each module is live and in use before the next one starts. The tracker decides the order." />
      <div className="px-6 lg:px-8 py-5">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MODULE_CARDS.map((m) => {
            const briefs = state.briefs.filter((b) => b.module === m.name)
            const s = statusFor(briefs, Boolean(m.href))
            const open = briefs.filter((b) => b.stage !== 'Done').length
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold">{m.title}</h3>
                  <Chip tone={s.tone} dot>
                    {s.label}
                  </Chip>
                </div>
                <p className="mt-2 text-[13px] text-pm-muted leading-relaxed">{m.body}</p>
                <div className="mt-4 flex items-center justify-between text-[12px] text-pm-muted">
                  <span>
                    {briefs.length} {briefs.length === 1 ? 'brief' : 'briefs'} on the tracker{open > 0 ? `, ${open} open` : ''}
                  </span>
                  {s.live && (
                    <Button variant="primary" size="sm" className="pointer-events-none">
                      Open
                    </Button>
                  )}
                  {!s.live && s.label === 'Built' && <span>Not part of this demo</span>}
                </div>
              </>
            )
            return m.href && s.live ? (
              <Link key={m.name} href={m.href} className="block bg-pm-surface border border-pm-border rounded-md p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:border-pm-border-strong hover:shadow-[0_3px_8px_rgba(16,24,40,0.08)] transition">
                {inner}
              </Link>
            ) : (
              <Card key={m.name} className={`p-5 ${s.live ? '' : 'bg-[#fbfbfc]'}`}>
                {inner}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
