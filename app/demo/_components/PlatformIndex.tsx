'use client'
import { WORKSTREAMS, useDemo } from '../_lib/store'
import type { Brief } from '../_lib/types'
import { Card, Chip, PageHeader } from './ui'
import { TONES } from '../_lib/tones'
import { Icon } from './icons'
import type { Tone } from '../_lib/tones'

// The platform is the thing the client ends up owning: one module at a time.
// Each card's status is derived from the tracker, so moving a brief moves the card.
// Live modules open their production mock-up in a new tab, outside this shell.

const MODULE_CARDS: { name: string; title: string; body: string; href?: string }[] = [
  { name: 'Identity', title: 'Identity and roles', body: 'Sign in with the account you already have. Roles from the directory groups IT already manages.' },
  { name: 'Tracker', title: 'Tracker', body: 'The ranked backlog and the cycle every brief moves through. This tool.' },
  { name: 'Project Record', title: 'Project record', body: 'One record per project: connection point, voltage, contract, dates, stage. Everything else hangs off it.' },
  { name: 'Audit', title: 'Audit log', body: 'Who changed what, when, on every record. Read-only, exportable, kept for seven years.' },
  { name: 'Grid Connection', title: 'Grid connection', body: 'Study milestones and network operator submissions per job.' },
  { name: 'Engineering', title: 'Engineering', body: 'Design register with revisions and issued-for-construction status.' },
  { name: 'Construction', title: 'Construction progress', body: 'Percent complete by work area each week, against plan, feeding claims.' },
  { name: 'Commissioning', title: 'Commissioning and testing', body: 'Test sheets, hold points and energisation approvals recorded on site with the witness named.' },
  { name: 'Handover', title: 'Handover and compliance', body: 'As-builts, test records and certificates in one pack from the job record.' },
  { name: 'Purchase Orders', title: 'Purchase orders', body: 'Raise against a project, route by value, approve, post to the ERP. Audit trail on every step.', href: '/demo/purchase-orders' },
  { name: 'Progress Claims', title: 'Progress claims', body: 'Monthly claims built from the project record, the schedule of rates and site progress.' },
  { name: 'Variations Log', title: 'Variations log', body: 'Every variation raised, priced, submitted and approved in one list against the project.' },
  { name: 'ERP Sync', title: 'ERP sync', body: 'Approved POs post as committed cost with no re-keying. Status flows back when the invoice is matched.' },
  { name: 'Site Diary', title: 'Site diary', body: 'Weather, crew, plant, delays and visitors, logged from a phone. The record when a delay claim comes.' },
  { name: 'Subcontractor Onboarding', title: 'Subcontractor onboarding', body: 'Insurances, licences and inductions submitted once, expiry dates tracked, green tick before site.' },
  { name: 'HSEQ', title: 'HSEQ', body: 'Inductions and competencies at the gate. Incidents and hazards reported from the field in minutes.' },
  { name: 'Board Reporting', title: 'Board reporting', body: 'The monthly pack from live numbers, each one traceable to its source.' },
  { name: 'Dashboards', title: 'Dashboards and questions', body: 'Stage, cost and risk per project and across all of them. A plain-English question box over the data.' },
]

type Status = { label: string; tone: Tone; live: boolean }

function statusFor(briefs: Brief[], hasPage: boolean): Status {
  const stages = new Set(briefs.filter((b) => b.workType !== 'hotfix').map((b) => b.stage))
  if (stages.has('Complete') || stages.has('Production')) return hasPage ? { label: 'Live', tone: 'green', live: true } : { label: 'Built', tone: 'slate', live: false }
  if (stages.has('Testing') || stages.has('In build')) return { label: 'In build', tone: 'amber', live: false }
  if (stages.has('Approved for build') || stages.has('Briefed in') || stages.has('Mapping')) return { label: 'Next cycle', tone: 'grey', live: false }
  return { label: 'Planned', tone: 'grey', live: false }
}

export default function PlatformIndex() {
  const { state } = useDemo()
  return (
    <div>
      <PageHeader icon={<Icon name="grid" size={22} />} kicker="What the business gets" title="Platform" subtitle="One module at a time. Each is live before the next starts. The tracker decides the order." />
      <div className="px-6 lg:px-8 py-5 space-y-8">
        {WORKSTREAMS.map((w) => {
          const cards = MODULE_CARDS.filter((m) => {
            const briefs = state.briefs.filter((b) => b.module === m.name)
            if (briefs.length === 0) return false
            const counts = new Map<string, number>()
            for (const b of briefs) counts.set(b.workstream, (counts.get(b.workstream) ?? 0) + 1)
            return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0] === w.id
          })
          if (cards.length === 0) return null
          const done = state.briefs.filter((b) => b.workstream === w.id && b.stage === 'Complete').length
          const total = state.briefs.filter((b) => b.workstream === w.id).length
          return (
            <section key={w.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <span className="h-2.5 w-2.5 rounded-full self-center" style={{ background: TONES[w.tone].dot }} />
                <h2 className="text-[15px] font-semibold">{w.name}</h2>
                <span className="text-[12.5px] text-pm-muted">{w.goal}</span>
                <span className="ml-auto text-[12px] text-pm-muted">
                  {done} of {total} briefs complete
                </span>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {cards.map((m) => {
                  const briefs = state.briefs.filter((b) => b.module === m.name)
                  const s = statusFor(briefs, Boolean(m.href))
                  const open = briefs.filter((b) => b.stage !== 'Complete').length
                  return (
                    <Card key={m.name} className={`p-5 ${s.live ? '' : 'bg-[#fbfbfc]'}`}>
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
                        {s.live && m.href && (
                          <a href={m.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-pm-primary text-white text-[12.5px] font-medium hover:bg-pm-primary-hover transition-colors">
                            See production mock-up
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M4.5 2H2v8h8V7.5M7 2h3v3M10 2L5.5 6.5" />
                            </svg>
                          </a>
                        )}
                        {!s.live && s.label === 'Built' && <span>Not part of this demo</span>}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
