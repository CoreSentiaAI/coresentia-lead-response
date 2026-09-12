'use client'
import { useMemo, useState } from 'react'
import { useDemo } from '../_lib/store'
import { STAGES, type Brief, type WorkType } from '../_lib/types'
import { Tag, selectClass } from './ui'
import BriefDetail from './BriefDetail'

const WORK_TYPES: WorkType[] = ['module', 'integration', 'hotfix']

export function WorkTypeTag({ type }: { type: WorkType }) {
  if (type === 'hotfix') return <Tag tone="fill">Hotfix</Tag>
  if (type === 'integration') return <Tag tone="accent">Integration</Tag>
  return <Tag>Module</Tag>
}

function signOffLabel(b: Brief) {
  if (b.signOff === 'signed off') return 'Signed off'
  if (b.signOff === 'awaiting') return 'Awaiting sign-off'
  return 'Sign-off pending'
}

function Card({ brief, onOpen }: { brief: Brief; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left bg-surface-card border border-line-soft rounded-sm p-3 hover:border-accent transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] leading-tight">{brief.module}</span>
        <span className="font-mono text-[0.62rem] leading-tight">{brief.priority}</span>
      </div>
      <div className="mt-2 text-[0.95rem] leading-snug font-medium">{brief.title}</div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <WorkTypeTag type={brief.workType} />
        <Tag>{brief.days}d</Tag>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2 font-mono text-[0.62rem] leading-tight">
        <span>{brief.owner}</span>
        <span className={brief.signOff === 'signed off' ? 'text-accent-ink' : ''}>{signOffLabel(brief)}</span>
      </div>
    </button>
  )
}

export default function TrackerBoard() {
  const { state } = useDemo()
  const [module, setModule] = useState('')
  const [workType, setWorkType] = useState('')
  const [owner, setOwner] = useState('')
  const [integrationCycle, setIntegrationCycle] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const modules = useMemo(() => Array.from(new Set(state.briefs.map((b) => b.module))).sort(), [state.briefs])
  const owners = useMemo(() => Array.from(new Set(state.briefs.map((b) => b.owner))).sort(), [state.briefs])

  const visible = state.briefs.filter(
    (b) =>
      (!module || b.module === module) &&
      (!owner || b.owner === owner) &&
      (integrationCycle ? b.workType === 'integration' : !workType || b.workType === workType),
  )

  const selected = state.briefs.find((b) => b.id === selectedId) ?? null
  const priorityRank = { P1: 0, P2: 1, P3: 2 }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="section-label mb-3">Tracker</div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display">The backlog, ranked.</h1>
          <p className="mt-3 max-w-2xl text-base">
            Every request enters here. The change lead ranks it. A brief moves left to right and nothing skips a column.
          </p>
        </div>
        <div className="font-mono text-xs">
          {state.briefs.length} briefs, {visible.length} shown
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <select value={module} onChange={(e) => setModule(e.target.value)} className={selectClass + ' min-w-[10rem]'} aria-label="Filter by module">
          <option value="">All modules</option>
          {modules.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={integrationCycle ? 'integration' : workType}
          onChange={(e) => setWorkType(e.target.value)}
          disabled={integrationCycle}
          className={selectClass + ' min-w-[10rem]'}
          aria-label="Filter by work type"
        >
          <option value="">All work types</option>
          {WORK_TYPES.map((t) => (
            <option key={t} value={t}>
              {t[0].toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select value={owner} onChange={(e) => setOwner(e.target.value)} className={selectClass + ' min-w-[10rem]'} aria-label="Filter by owner">
          <option value="">All owners</option>
          {owners.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setIntegrationCycle((v) => !v)}
          aria-pressed={integrationCycle}
          className={`btn rounded-sm px-4 py-2.5 border transition-colors ${integrationCycle ? 'bg-accent border-accent text-[#0d0d0c]' : 'border-line-strong hover:border-accent'}`}
        >
          Integration cycle
        </button>
        {(module || owner || workType || integrationCycle) && (
          <button
            type="button"
            onClick={() => {
              setModule('')
              setOwner('')
              setWorkType('')
              setIntegrationCycle(false)
            }}
            className="btn hover:underline underline-offset-4"
          >
            Clear
          </button>
        )}
      </div>

      {integrationCycle && (
        <p className="mt-4 font-mono text-xs max-w-3xl">
          Integration cycle: cross-module links only. Every third or fourth cycle builds these and nothing else.
        </p>
      )}

      <div className="mt-8 overflow-x-auto pb-4">
        <div className="grid grid-flow-col auto-cols-[minmax(166px,1fr)] gap-2">
          {STAGES.map((stage, i) => {
            const cards = visible
              .filter((b) => b.stage === stage)
              .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
            return (
              <div key={stage} className="min-h-[24rem] bg-surface-alt border border-line-soft rounded-sm">
                <div className="flex items-baseline justify-between px-3 py-2.5 border-b border-line-soft">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em]">
                    {String(i + 1).padStart(2, '0')} {stage}
                  </span>
                  <span className="font-mono text-[0.68rem]">{cards.length}</span>
                </div>
                <div className="p-2 space-y-2">
                  {cards.map((b) => (
                    <Card key={b.id} brief={b} onOpen={() => setSelectedId(b.id)} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BriefDetail brief={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}
