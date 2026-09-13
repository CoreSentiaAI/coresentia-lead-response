'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { WORKSTREAMS, useDemo } from '../_lib/store'
import { STAGES, type Brief, type Priority, type Stage, type WorkType, type Workstream } from '../_lib/types'
import { fmtDate } from '../_lib/format'
import { PRIORITY_LABEL, PRIORITY_TONE, STAGE_TONE, TONES, WORK_TYPE_TONE } from '../_lib/tones'
import { Avatar, Button, Card, Chip, PageHeader, Person, Stat, Tabs, inputClass, selectClass } from './ui'
import { Icon } from './icons'
import Tour, { startTour, type TourStep } from './Tour'
import BriefDetail from './BriefDetail'
import NewRequest from './NewRequest'

type View = 'board' | 'table' | 'calendar'
const WORK_TYPES: WorkType[] = ['module', 'integration', 'hotfix']
const PRIORITY_RANK = { P1: 0, P2: 1, P3: 2 }

const TOUR: TourStep[] = [
  {
    id: 'title',
    title: 'The internal software project tracker',
    body: 'Business requests are briefed in here and follow the development pipeline to production. All work is prioritised by the business. If it is not on the board, it is not happening.',
    placement: 'bottom',
    anchor: 'tl',
  },
  {
    id: 'workstreams',
    title: 'Workstreams',
    body: 'The build is organised into workstreams. Pick one and its briefs are the board. All work is the whole backlog, ranked once, so the change lead still has one list.',
    placement: 'right',
    anchor: 'r',
  },
  {
    id: 'new-request',
    title: 'Single intake',
    body: 'Every request starts here and lands in Mapping. Anyone can raise one. Nothing reaches the builder by direct message.',
    placement: 'bottom',
  },
  {
    id: 'col-mapping',
    title: 'Ranked, not first come',
    body: 'The change lead sets priority against everything else on the board. P1 sits at the top of the column, and the builder takes the top of the ranked backlog.',
    placement: 'bottom',
    anchor: 'tl',
  },
  {
    id: 'col-locked',
    title: 'Approved before build',
    body: 'The approved brief is what gets built. Ideas raised mid-build go back to Mapping as new requests, ranked against everything else.',
    placement: 'bottom',
  },
  {
    id: 'card-hotfix',
    title: 'Hotfix path',
    body: 'Production bugs skip the queue. Logged, fixed and promoted, usually within hours, and visible on the board so nothing happens in the dark.',
    placement: 'left',
  },
  {
    id: 'card-example',
    title: 'Click any card',
    body: 'Business outcome, current state, attachments, test feedback, sign-off and an audit trail written automatically on every move, with who and when.',
    placement: 'left',
  },
  {
    id: 'integration-cycle',
    title: 'Integration cycles',
    body: 'Cross-module links are filed as their own work type and batched. Every third or fourth cycle builds these and nothing else.',
    placement: 'bottom',
  },
  {
    id: 'nav-platform',
    title: 'Included with the platform',
    body: 'This tracker is a pre-built CoreSentia module. It drops into the new platform once the foundations are in, styled to match your business, at no cost. Reminders, notifications and a question box that reads the briefs come next.',
    placement: 'right',
    anchor: 'r',
  },
  {
    id: 'preview',
    title: 'Built for every screen',
    body: 'The same build on a phone or a tablet, in a frame you can click around in.',
    placement: 'right',
    anchor: 'r',
  },
]

export function signOffLabel(b: Brief) {
  if (b.signOff === 'signed off') return 'Signed off'
  if (b.signOff === 'awaiting') return 'Awaiting sign-off'
  return 'Not yet'
}

export default function Tracker() {
  const { state } = useDemo()
  const [view, setView] = useState<View>('board')
  const params = useSearchParams()
  const router = useRouter()
  const ws = WORKSTREAMS.some((w) => w.id === params.get('ws')) ? (params.get('ws') as string) : 'all'
  const [lanes, setLanes] = useState(false)
  const [search, setSearch] = useState('')
  const [workType, setWorkType] = useState('')
  const [owner, setOwner] = useState('')
  const [priority, setPriority] = useState('')
  const [integrationCycle, setIntegrationCycle] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [newOpen, setNewOpen] = useState(false)

  const owners = useMemo(() => Array.from(new Set(state.briefs.map((b) => b.owner))).sort(), [state.briefs])

  const q = search.trim().toLowerCase()
  const scoped = ws === 'all' ? state.briefs : state.briefs.filter((b) => b.workstream === ws)
  const current = WORKSTREAMS.find((w) => w.id === ws)
  const visible = scoped.filter(
    (b) =>
      (!q || `${b.title} ${b.module} ${b.owner} ${b.department ?? ''}`.toLowerCase().includes(q)) &&
      (!owner || b.owner === owner) &&
      (!priority || b.priority === priority) &&
      (integrationCycle ? b.workType === 'integration' : !workType || b.workType === workType),
  )
  const filtered = Boolean(q || owner || priority || workType || integrationCycle)
  const selected = state.briefs.find((b) => b.id === selectedId) ?? null

  return (
    <div>
      <PageHeader
        icon={<Icon name="board" size={22} />}
        kicker={current ? 'Workstream' : 'Tracker'}
        title={current ? current.name : 'All work'}
        subtitle={current ? current.goal : 'The internal software project tracker. Business requests are briefed in here and follow the development pipeline to production. All work is prioritised by the business.'}
        dataTour="title"
        tabs={
          <Tabs
            value={view}
            onChange={setView}
            options={[
              { value: 'board', label: 'Board' },
              { value: 'table', label: 'Table' },
              { value: 'calendar', label: 'Calendar' },
            ]}
          />
        }
        actions={
          <>
            <Button onClick={startTour} className="gap-2">
              <Icon name="spark" size={14} className="text-pm-primary" />
              Tour
            </Button>
            <Button variant="primary" onClick={() => setNewOpen(true)} data-tour="new-request">
              New request
            </Button>
          </>
        }
        meta={
          <>
            {current && (
              <span className="inline-flex items-center gap-2 text-[12.5px] whitespace-nowrap">
                <span className="text-pm-muted">Owner</span>
                <Person name={current.owner} size={18} />
              </span>
            )}
            <Stat value={scoped.length} label="briefs" />
            <Stat value={scoped.filter((b) => b.stage === 'Mapping').length} label="in mapping" />
            <Stat value={scoped.filter((b) => b.stage === 'In build' || b.stage === 'Preview' || b.stage === 'Testing').length} label="in build" tone="amber" />
            <Stat value={scoped.filter((b) => b.stage === 'Production').length} label="in production" tone="green" />
            <Stat value={scoped.filter((b) => b.signOff === 'awaiting').length} label="awaiting sign-off" tone="primary" />
            <Stat value={scoped.filter((b) => b.stage === 'Done').length} label="done" />
            <Stat value={scoped.filter((b) => b.workType === 'hotfix').length} label="hotfix this month" tone="red" />
          </>
        }
      />

      {/* Small screens have no sidebar list, so the workstream switch lives here */}
      <div className="lg:hidden px-6 py-3 border-b border-pm-border bg-pm-surface flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-pm-muted">Workstream</span>
        <select value={ws} onChange={(e) => router.push(e.target.value === 'all' ? '/demo/tracker' : `/demo/tracker?ws=${e.target.value}`)} className={selectClass + ' flex-1'} aria-label="Workstream">
          <option value="all">All work</option>
          {WORKSTREAMS.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <div className="px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-[16px] font-semibold mr-2 flex items-baseline gap-2">
            Briefs
            <span className="text-[12.5px] font-normal text-pm-muted">
              {filtered ? `${visible.length} of ${scoped.length}` : scoped.length}
            </span>
          </h2>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search briefs" className={inputClass + ' max-w-[224px]'} aria-label="Search briefs" />
          <select value={integrationCycle ? 'integration' : workType} onChange={(e) => setWorkType(e.target.value)} disabled={integrationCycle} className={selectClass} aria-label="Filter by work type">
            <option value="">All work types</option>
            {WORK_TYPES.map((t) => (
              <option key={t} value={t}>
                {t[0].toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <select value={owner} onChange={(e) => setOwner(e.target.value)} className={selectClass} aria-label="Filter by owner">
            <option value="">All brief owners</option>
            {owners.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={selectClass} aria-label="Filter by priority">
            <option value="">All priorities</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <Button variant={integrationCycle ? 'primary' : 'secondary'} onClick={() => setIntegrationCycle((v) => !v)} aria-pressed={integrationCycle} data-tour="integration-cycle">
            Integration cycle
          </Button>
          {filtered && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearch('')
                setOwner('')
                setPriority('')
                setWorkType('')
                setIntegrationCycle(false)
              }}
            >
              Clear
            </Button>
          )}
          {view === 'board' && ws === 'all' && (
            <Button variant={lanes ? 'primary' : 'secondary'} onClick={() => setLanes((v) => !v)} aria-pressed={lanes}>
              Swimlanes
            </Button>
          )}

        </div>
        {integrationCycle && <p className="mt-2 text-[12.5px] text-pm-muted">Integration cycle: cross-module links only. Every third or fourth cycle builds these and nothing else.</p>}

        <div className="mt-4">
          {view === 'board' && <BoardView briefs={visible} onOpen={setSelectedId} lanes={ws === 'all' && lanes ? WORKSTREAMS : undefined} />}
          {view === 'table' && <TableView briefs={visible} onOpen={setSelectedId} />}
          {view === 'calendar' && <CalendarView briefs={visible} onOpen={setSelectedId} />}
        </div>
      </div>

      <BriefDetail brief={selected} onClose={() => setSelectedId(null)} />
      <NewRequest open={newOpen} onClose={() => setNewOpen(false)} />
      {view === 'board' && <Tour steps={TOUR} />}
    </div>
  )
}

// ---------- Board ----------

function BoardCard({ brief, onOpen }: { brief: Brief; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-tour={brief.workType === 'hotfix' ? 'card-hotfix' : brief.id === 'b03' ? 'card-example' : undefined}
      className="w-full text-left bg-pm-surface border border-pm-border rounded-md p-3 pl-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:border-pm-border-strong hover:shadow-[0_3px_8px_rgba(16,24,40,0.08)] transition"
      style={{ boxShadow: `inset 3px 0 0 ${TONES[WORKSTREAMS.find((w) => w.id === brief.workstream)?.tone ?? 'grey'].dot}, 0 1px 2px rgba(16,24,40,0.05)` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-pm-muted truncate">
          {brief.module}
          {brief.department && brief.department !== brief.module ? `, ${brief.department}` : ''}
        </span>
        <Chip tone={PRIORITY_TONE[brief.priority]} tip={PRIORITY_LABEL[brief.priority]}>
          {brief.priority}
        </Chip>
      </div>
      <div className="mt-1.5 text-[13.5px] font-medium leading-snug">{brief.title}</div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Chip tone={WORK_TYPE_TONE[brief.workType]}>{brief.workType}</Chip>
          <span className="text-[11.5px] text-pm-muted whitespace-nowrap">{brief.days}d</span>
        </div>
        <Avatar name={brief.owner} size={22} />
      </div>
      {brief.signOff !== 'not started' && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11.5px]" style={{ color: brief.signOff === 'signed off' ? TONES.green.fg : TONES.amber.fg }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: brief.signOff === 'signed off' ? TONES.green.dot : TONES.amber.dot }} />
          {signOffLabel(brief)}
        </div>
      )}
    </button>
  )
}

function Columns({ briefs, onOpen, compact }: { briefs: Brief[]; onOpen: (id: string) => void; compact?: boolean }) {
  return (
    <div className="grid grid-flow-col auto-cols-[minmax(150px,1fr)] gap-2">
      {STAGES.map((stage) => {
        const cards = briefs.filter((b) => b.stage === stage).sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
        return (
          <div key={stage} className={`rounded-md bg-[#eaedf1] p-2 ${compact ? 'min-h-[9rem]' : 'min-h-[26rem]'}`}>
            <div className="flex items-center justify-between px-1 pb-2" data-tour={!compact && stage === 'Mapping' ? 'col-mapping' : !compact && stage === 'Approved for build' ? 'col-locked' : undefined}>
              <span className="flex items-center gap-2 text-[12.5px] font-semibold">
                <span className="h-2 w-2 rounded-full" style={{ background: TONES[STAGE_TONE[stage]].dot }} />
                {stage}
              </span>
              <span className="text-[12px] text-pm-muted">{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map((b) => (
                <BoardCard key={b.id} brief={b} onOpen={() => onOpen(b.id)} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function BoardView({ briefs, onOpen, lanes }: { briefs: Brief[]; onOpen: (id: string) => void; lanes?: Workstream[] }) {
  if (!lanes) {
    return (
      <div className="overflow-x-auto pb-3 scrollbar-thin">
        <Columns briefs={briefs} onOpen={onOpen} />
      </div>
    )
  }
  return (
    <div className="overflow-x-auto pb-3 scrollbar-thin space-y-4">
      {lanes.map((w) => {
        const mine = briefs.filter((b) => b.workstream === w.id)
        if (mine.length === 0) return null
        return (
          <section key={w.id}>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="h-5 w-1.5 rounded-full" style={{ background: TONES[w.tone].dot }} />
              <h3 className="text-[13.5px] font-semibold">{w.name}</h3>
              <span className="text-[12px] text-pm-muted">{mine.length} briefs</span>
              <span className="text-[12px] text-pm-muted hidden md:inline">{w.goal}</span>
            </div>
            <Columns briefs={mine} onOpen={onOpen} compact />
          </section>
        )
      })}
    </div>
  )
}

// ---------- Table ----------

type SortKey = 'title' | 'workstream' | 'department' | 'module' | 'stage' | 'workType' | 'priority' | 'owner' | 'days' | 'lockDate' | 'targetDate' | 'signOff'

const COLUMNS: { key: SortKey; label: string; align?: 'right' }[] = [
  { key: 'title', label: 'Brief' },
  { key: 'workstream', label: 'Workstream' },
  { key: 'department', label: 'Department' },
  { key: 'module', label: 'Module' },
  { key: 'stage', label: 'Stage' },
  { key: 'workType', label: 'Type' },
  { key: 'priority', label: 'Priority' },
  { key: 'owner', label: 'Brief owner' },
  { key: 'days', label: 'Days', align: 'right' },
  { key: 'lockDate', label: 'Approved for build' },
  { key: 'targetDate', label: 'Target' },
  { key: 'signOff', label: 'Sign-off' },
]

function sortValue(b: Brief, key: SortKey): string | number {
  if (key === 'stage') return STAGES.indexOf(b.stage)
  if (key === 'workstream') return WORKSTREAMS.findIndex((w) => w.id === b.workstream)
  if (key === 'priority') return PRIORITY_RANK[b.priority]
  if (key === 'days') return b.days
  const v = b[key]
  return v ?? ''
}

function TableView({ briefs, onOpen }: { briefs: Brief[]; onOpen: (id: string) => void }) {
  const [sortKey, setSortKey] = useState<SortKey>('stage')
  const [dir, setDir] = useState<1 | -1>(1)
  const rows = [...briefs].sort((a, b) => {
    const x = sortValue(a, sortKey)
    const y = sortValue(b, sortKey)
    if (x === y) return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
    return (x < y ? -1 : 1) * dir
  })
  const toggle = (key: SortKey) => {
    if (key === sortKey) setDir((d) => (d === 1 ? -1 : 1))
    else {
      setSortKey(key)
      setDir(1)
    }
  }
  return (
    <Card className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[1240px] text-[13px]">
        <thead>
          <tr className="bg-pm-hover border-b border-pm-border">
            {COLUMNS.map((c) => (
              <th key={c.key} className={`px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted whitespace-nowrap ${c.align === 'right' ? 'text-right' : 'text-left'}`}>
                <button type="button" onClick={() => toggle(c.key)} className="inline-flex items-center gap-1 hover:text-pm-text">
                  {c.label}
                  {sortKey === c.key && <span className="text-pm-faint">{dir === 1 ? '↑' : '↓'}</span>}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.id} onClick={() => onOpen(b.id)} className="border-b border-pm-border last:border-b-0 hover:bg-pm-hover cursor-pointer">
              <td className="px-3 py-2.5 font-medium max-w-[26rem]">{b.title}</td>
              <td className="px-3 py-2.5 whitespace-nowrap">
                {(() => {
                  const w = WORKSTREAMS.find((x) => x.id === b.workstream)
                  return w ? <Chip tone={w.tone}>{w.name}</Chip> : null
                })()}
              </td>
              <td className="px-3 py-2.5 text-pm-muted whitespace-nowrap">{b.department ?? ''}</td>
              <td className="px-3 py-2.5 text-pm-muted whitespace-nowrap">{b.module}</td>
              <td className="px-3 py-2.5">
                <Chip tone={STAGE_TONE[b.stage]} dot>
                  {b.stage}
                </Chip>
              </td>
              <td className="px-3 py-2.5">
                <Chip tone={WORK_TYPE_TONE[b.workType]}>{b.workType}</Chip>
              </td>
              <td className="px-3 py-2.5">
                <Chip tone={PRIORITY_TONE[b.priority]} tip={PRIORITY_LABEL[b.priority]}>
                  {b.priority}
                </Chip>
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <Person name={b.owner} />
              </td>
              <td className="px-3 py-2.5 text-right font-pm-mono text-[12.5px]">{b.days}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-pm-muted">{b.lockDate ? fmtDate(b.lockDate) : ''}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-pm-muted">{b.targetDate ? fmtDate(b.targetDate) : ''}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-pm-muted">{signOffLabel(b)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="px-3 py-8 text-center text-pm-muted">
                Nothing matches those filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  )
}

// ---------- Calendar ----------

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const key = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

type CalItem = { brief: Brief; kind: 'target' | 'lock' | 'hotfix' }

function CalendarView({ briefs, onOpen }: { briefs: Brief[]; onOpen: (id: string) => void }) {
  const [mounted, setMounted] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return { y: d.getFullYear(), m: d.getMonth() }
  })
  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(max-width: 639px)')
    const apply = () => setNarrow(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const items = useMemo(() => {
    const map = new Map<string, CalItem[]>()
    const push = (k: string, item: CalItem) => map.set(k, [...(map.get(k) ?? []), item])
    for (const b of briefs) {
      if (b.workType === 'hotfix') {
        const at = b.changeLog[0]?.at
        if (at) push(at.slice(0, 10), { brief: b, kind: 'hotfix' })
        continue
      }
      if (b.targetDate) push(b.targetDate, { brief: b, kind: 'target' })
      if (b.lockDate) push(b.lockDate, { brief: b, kind: 'lock' })
    }
    return map
  }, [briefs])

  if (!mounted) return <Card className="min-h-[30rem]" />

  const now = new Date()
  const todayKey = key(now.getFullYear(), now.getMonth(), now.getDate())
  const first = new Date(cursor.y, cursor.m, 1)
  const lead = (first.getDay() + 6) % 7
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
  const cells = Math.ceil((lead + daysInMonth) / 7) * 7
  const days = Array.from({ length: cells }, (_, i) => {
    const d = new Date(cursor.y, cursor.m, i - lead + 1)
    return { date: d, inMonth: d.getMonth() === cursor.m, k: key(d.getFullYear(), d.getMonth(), d.getDate()) }
  })
  const move = (delta: number) => {
    const d = new Date(cursor.y, cursor.m + delta, 1)
    setCursor({ y: d.getFullYear(), m: d.getMonth() })
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-pm-border">
        <div className="text-[15px] font-semibold">
          {MONTHS[cursor.m]} {cursor.y}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => move(-1)} aria-label="Previous month">
            Prev
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCursor({ y: now.getFullYear(), m: now.getMonth() })}>
            Today
          </Button>
          <Button variant="ghost" size="sm" onClick={() => move(1)} aria-label="Next month">
            Next
          </Button>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2 text-[12px] text-pm-muted">
          <Chip tone="green" dot>
            Target production date
          </Chip>
          <Chip tone="purple" dot>
            Brief approved
          </Chip>
          <Chip tone="red" dot>
            Hotfix logged
          </Chip>
        </div>
      </div>
      {narrow ? (
        <ol className="divide-y divide-pm-border">
          {days
            .filter((d) => d.inMonth && (items.get(d.k) ?? []).length > 0)
            .map((d) => (
              <li key={d.k} className="px-4 py-3">
                <div className={`text-[12px] font-medium ${d.k === todayKey ? 'text-pm-primary' : 'text-pm-muted'}`}>
                  {WEEKDAYS[(d.date.getDay() + 6) % 7]} {d.date.getDate()}
                  {d.k === todayKey ? ', today' : ''}
                </div>
                <div className="mt-1.5 space-y-1">
                  {(items.get(d.k) ?? []).map((it) => {
                    const tone = it.kind === 'hotfix' ? 'red' : it.kind === 'lock' ? 'purple' : STAGE_TONE[it.brief.stage]
                    const t = TONES[tone]
                    return (
                      <button key={it.brief.id + it.kind} type="button" onClick={() => onOpen(it.brief.id)} className="w-full text-left flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-[12.5px] font-medium leading-snug" style={{ background: t.bg, color: t.fg }}>
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: t.dot }} />
                        <span>
                          {it.kind === 'lock' ? 'Approved: ' : it.kind === 'hotfix' ? 'Hotfix: ' : ''}
                          {it.brief.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </li>
            ))}
          {days.every((d) => !d.inMonth || (items.get(d.k) ?? []).length === 0) && <li className="px-4 py-6 text-[12.5px] text-pm-muted">Nothing dated this month.</li>}
        </ol>
      ) : (
        <>
      <div className="grid grid-cols-7 border-b border-pm-border">
        {WEEKDAYS.map((d) => (
          <div key={d} className="px-2 py-2 text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const list = items.get(d.k) ?? []
          const weekend = i % 7 >= 5
          const today = d.k === todayKey
          return (
            <div key={d.k} className={`min-h-[104px] border-b border-r border-pm-border p-1.5 ${weekend ? 'bg-pm-hover' : ''} ${!d.inMonth ? 'opacity-45' : ''} ${i % 7 === 6 ? 'border-r-0' : ''}`}>
              <div className={`inline-flex items-center justify-center h-6 min-w-6 px-1 rounded-full text-[12px] ${today ? 'bg-pm-primary text-white font-semibold' : 'text-pm-muted'}`}>{d.date.getDate()}</div>
              <div className="mt-1 space-y-1">
                {list.map((it) => {
                  const tone = it.kind === 'hotfix' ? 'red' : it.kind === 'lock' ? 'purple' : STAGE_TONE[it.brief.stage]
                  const t = TONES[tone]
                  return (
                    <button
                      key={it.brief.id + it.kind}
                      type="button"
                      onClick={() => onOpen(it.brief.id)}
                      title={it.brief.title}
                      className="w-full text-left flex items-center gap-1.5 rounded-[4px] px-1.5 py-1 text-[11.5px] font-medium leading-none truncate hover:brightness-95"
                      style={{ background: t.bg, color: t.fg }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: t.dot }} />
                      <span className="truncate">
                        {it.kind === 'lock' ? 'Approved: ' : it.kind === 'hotfix' ? 'Hotfix: ' : ''}
                        {it.brief.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
        </>
      )}
    </Card>
  )
}
