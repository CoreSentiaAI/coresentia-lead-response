'use client'
// Demo state. No database: the seed is the starting point, every action runs
// in the browser, and the result is kept in localStorage so a page refresh
// mid-demo does not lose the click-through. "Reset demo data" in the shell
// returns everything to the seed.

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Attachment, Brief, Person, PoLine, Priority, PurchaseOrder, Stage, WorkType } from './types'
import { ACTORS, BRIEFS, DEFAULT_ACTOR, DEPARTMENTS, MODULES, NEXT_PO_SEQUENCE, PEOPLE, PROJECTS, PURCHASE_ORDERS, SUPPLIERS, WORKSTREAMS } from './seed'
import { lineTotals, newId } from './format'
import { routeFor } from './routing'

const STORAGE_KEY = 'cs-demo-state'
const VERSION = 4

type State = {
  version: number
  briefs: Brief[]
  pos: PurchaseOrder[]
  actingAs: string
  poSeq: number
}

const seedState = (): State => ({
  version: VERSION,
  briefs: BRIEFS,
  pos: PURCHASE_ORDERS,
  actingAs: DEFAULT_ACTOR,
  poSeq: NEXT_PO_SEQUENCE,
})

type Stamp = { at: string; who: string }

type Action =
  | { type: 'reset' }
  | { type: 'hydrate'; state: State }
  | { type: 'setActingAs'; id: string }
  | ({ type: 'addBrief'; title: string; module: string; workstream: string; department?: string; owner: string; priority: Priority; workType: WorkType; days: number; targetDate: string | null; outcome: string } & Stamp)
  | ({ type: 'moveBrief'; id: string; stage: Stage } & Stamp)
  | ({ type: 'addFeedback'; id: string; text: string } & Stamp)
  | ({ type: 'toggleFeedback'; id: string; feedbackId: string } & Stamp)
  | ({ type: 'setPreviewUrl'; id: string; url: string } & Stamp)
  | ({ type: 'addAttachment'; id: string; attachment: Omit<Attachment, 'uploadedBy' | 'at'> } & Stamp)
  | ({ type: 'removeAttachment'; id: string; attachmentId: string } & Stamp)
  | ({ type: 'signOffBrief'; id: string } & Stamp)
  | ({ type: 'createPo'; supplierId: string; projectId: string; lines: PoLine[]; submit: boolean } & Stamp)
  | ({ type: 'submitPo'; id: string } & Stamp)
  | ({ type: 'approvePo'; id: string; note: string } & Stamp)
  | ({ type: 'rejectPo'; id: string; note: string } & Stamp)
  | ({ type: 'sendToErp'; id: string } & Stamp)
  | ({ type: 'closePo'; id: string } & Stamp)

const logEntry = (s: Stamp, action: string) => ({ id: newId('log'), at: s.at, who: s.who, action })

function updateBrief(state: State, id: string, fn: (b: Brief) => Brief): State {
  return { ...state, briefs: state.briefs.map((b) => (b.id === id ? fn(b) : b)) }
}

function updatePo(state: State, id: string, fn: (p: PurchaseOrder) => PurchaseOrder): State {
  return { ...state, pos: state.pos.map((p) => (p.id === id ? fn(p) : p)) }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return seedState()
    case 'hydrate':
      return action.state
    case 'setActingAs':
      return { ...state, actingAs: action.id }

    case 'addBrief': {
      const brief: Brief = {
        id: newId('brief'),
        title: action.title,
        module: action.module,
        workstream: action.workstream,
        department: action.department,
        owner: action.owner,
        priority: action.priority,
        workType: action.workType,
        days: action.days,
        signOff: 'not started',
        signOffBy: [action.owner],
        stage: 'Mapping',
        outcome: action.outcome,
        currentState: '',
        lockDate: null,
        targetDate: action.targetDate,
        previewUrl: '',
        readmeUrl: '',
        internalOwner: '',
        feedback: [],
        changeLog: [logEntry(action, 'Request raised. Entered Mapping.')],
        attachments: [],
      }
      return { ...state, briefs: [brief, ...state.briefs] }
    }

    case 'moveBrief':
      return updateBrief(state, action.id, (b) => {
        if (b.stage === action.stage) return b
        const notes: string[] = [`Moved from ${b.stage} to ${action.stage}.`]
        let lockDate = b.lockDate
        if (action.stage === 'Locked' && !lockDate) {
          lockDate = action.at.slice(0, 10)
          notes.push('Lock date set.')
        }
        if (action.stage === 'Production') notes.push('Promoted to production.')
        return { ...b, stage: action.stage, lockDate, changeLog: [...b.changeLog, logEntry(action, notes.join(' '))] }
      })

    case 'addFeedback':
      return updateBrief(state, action.id, (b) => ({
        ...b,
        feedback: [...b.feedback, { id: newId('fb'), author: action.who, text: action.text, status: 'open', at: action.at }],
        changeLog: [...b.changeLog, logEntry(action, 'Test feedback added.')],
      }))

    case 'toggleFeedback':
      return updateBrief(state, action.id, (b) => {
        const item = b.feedback.find((f) => f.id === action.feedbackId)
        if (!item) return b
        const status = item.status === 'open' ? 'addressed' : 'open'
        return {
          ...b,
          feedback: b.feedback.map((f) => (f.id === action.feedbackId ? { ...f, status } : f)),
          changeLog: [...b.changeLog, logEntry(action, status === 'addressed' ? 'Feedback marked addressed.' : 'Feedback reopened.')],
        }
      })

    case 'setPreviewUrl':
      return updateBrief(state, action.id, (b) => ({
        ...b,
        previewUrl: action.url,
        changeLog: [...b.changeLog, logEntry(action, action.url ? 'Preview URL added.' : 'Preview URL removed.')],
      }))

    case 'addAttachment':
      return updateBrief(state, action.id, (b) => ({
        ...b,
        attachments: [...b.attachments, { ...action.attachment, uploadedBy: action.who, at: action.at }],
        changeLog: [...b.changeLog, logEntry(action, `Attachment added: ${action.attachment.name}`)],
      }))

    case 'removeAttachment':
      return updateBrief(state, action.id, (b) => {
        const a = b.attachments.find((x) => x.id === action.attachmentId)
        if (!a) return b
        return {
          ...b,
          attachments: b.attachments.filter((x) => x.id !== action.attachmentId),
          changeLog: [...b.changeLog, logEntry(action, `Attachment removed: ${a.name}`)],
        }
      })

    case 'signOffBrief':
      return updateBrief(state, action.id, (b) => ({
        ...b,
        signOff: 'signed off',
        changeLog: [...b.changeLog, logEntry(action, `Signed off by ${action.who}.`)],
      }))

    case 'createPo': {
      const project = PROJECTS.find((p) => p.id === action.projectId)
      if (!project) return state
      const { exGst } = lineTotals(action.lines)
      const number = `PO-2026-${String(state.poSeq).padStart(4, '0')}`
      const approvals = action.submit ? routeFor(exGst, project) : []
      const audit = [{ id: newId('aud'), at: action.at, who: action.who, action: action.submit ? 'Raised.' : 'Raised. Saved as draft.' }]
      if (action.submit) {
        audit.push({ id: newId('aud'), at: action.at, who: action.who, action: `Submitted for approval. Routed to ${approvals.map((a) => a.role.toLowerCase()).join(', then ')}.` })
      }
      const po: PurchaseOrder = {
        id: newId('po'),
        number,
        supplierId: action.supplierId,
        projectId: action.projectId,
        lines: action.lines,
        status: action.submit ? 'Submitted' : 'Draft',
        raisedBy: action.who,
        raisedAt: action.at,
        updatedAt: action.at,
        approvals,
        erp: { synced: false, at: null, reference: null, log: [] },
        attachments: [],
        audit,
      }
      return { ...state, pos: [po, ...state.pos], poSeq: state.poSeq + 1 }
    }

    case 'submitPo':
      return updatePo(state, action.id, (p) => {
        if (p.status !== 'Draft') return p
        const project = PROJECTS.find((x) => x.id === p.projectId)
        if (!project) return p
        const approvals = routeFor(lineTotals(p.lines).exGst, project)
        return {
          ...p,
          status: 'Submitted',
          approvals,
          updatedAt: action.at,
          audit: [...p.audit, { id: newId('aud'), at: action.at, who: action.who, action: `Submitted for approval. Routed to ${approvals.map((a) => a.role.toLowerCase()).join(', then ')}.` }],
        }
      })

    case 'approvePo':
      return updatePo(state, action.id, (p) => {
        const idx = p.approvals.findIndex((a) => a.decision === 'pending')
        if (p.status !== 'Submitted' || idx === -1) return p
        const step = p.approvals[idx]
        const approvals = p.approvals.map((a, i) => (i === idx ? { ...a, decision: 'approved' as const, note: action.note, at: action.at } : a))
        const done = approvals.every((a) => a.decision === 'approved')
        const note = action.note ? ` Note: ${action.note}` : ''
        return {
          ...p,
          approvals,
          status: done ? 'Approved' : 'Submitted',
          updatedAt: action.at,
          audit: [...p.audit, { id: newId('aud'), at: action.at, who: step.approver, action: `Approved as ${step.role.toLowerCase()}.${note}` }],
        }
      })

    case 'rejectPo':
      return updatePo(state, action.id, (p) => {
        const idx = p.approvals.findIndex((a) => a.decision === 'pending')
        if (p.status !== 'Submitted' || idx === -1) return p
        const step = p.approvals[idx]
        const approvals = p.approvals.map((a, i) => (i === idx ? { ...a, decision: 'rejected' as const, note: action.note, at: action.at } : a))
        const note = action.note ? ` Note: ${action.note}` : ''
        return {
          ...p,
          approvals,
          status: 'Rejected',
          updatedAt: action.at,
          audit: [...p.audit, { id: newId('aud'), at: action.at, who: step.approver, action: `Rejected as ${step.role.toLowerCase()}.${note}` }],
        }
      })

    case 'sendToErp':
      return updatePo(state, action.id, (p) => {
        if (p.status !== 'Approved') return p
        const reference = `ERP-${88400 + (state.poSeq % 100) * 3 + p.lines.length}`
        return {
          ...p,
          status: 'Sent to ERP',
          updatedAt: action.at,
          erp: {
            synced: true,
            at: action.at,
            reference,
            log: [{ at: action.at, text: `Posted to ERP as ${reference}. Committed cost recorded against the project.` }],
          },
          audit: [...p.audit, { id: newId('aud'), at: action.at, who: 'System', action: `Sent to ERP as ${reference}.` }],
        }
      })

    case 'closePo':
      return updatePo(state, action.id, (p) => {
        if (p.status !== 'Sent to ERP') return p
        return {
          ...p,
          status: 'Closed',
          updatedAt: action.at,
          audit: [...p.audit, { id: newId('aud'), at: action.at, who: action.who, action: 'Closed. Goods received and invoice matched.' }],
        }
      })

    default:
      return state
  }
}

type Unstamped<A> = A extends Stamp ? Omit<A, 'at' | 'who'> : A
type Command = Unstamped<Action>

type Ctx = {
  state: State
  actor: Person
  actors: Person[]
  run: (command: Command) => void
}

const DemoContext = createContext<Ctx | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, seedState)

  // Load a saved click-through after mount (server and first client render use the seed).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw) as State
      if (saved && saved.version === VERSION && Array.isArray(saved.briefs) && Array.isArray(saved.pos)) {
        dispatch({ type: 'hydrate', state: saved })
      }
    } catch {
      // Storage unavailable or corrupt: stay on the seed.
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage unavailable: the demo still runs in memory.
    }
  }, [state])

  const actor = PEOPLE.find((p) => p.id === state.actingAs) ?? PEOPLE[0]
  const actors = useMemo(() => ACTORS.map((id) => PEOPLE.find((p) => p.id === id)!).filter(Boolean), [])

  const run = useCallback(
    (command: Command) => {
      if (command.type === 'reset') {
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          // ignore
        }
        dispatch({ type: 'reset' })
        return
      }
      if (command.type === 'hydrate' || command.type === 'setActingAs') {
        dispatch(command)
        return
      }
      dispatch({ ...command, at: new Date().toISOString(), who: actor.name } as Action)
    },
    [actor.name],
  )

  return <DemoContext.Provider value={{ state, actor, actors, run }}>{children}</DemoContext.Provider>
}

export function useDemo(): Ctx {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider')
  return ctx
}

export { PEOPLE, SUPPLIERS, PROJECTS, MODULES, WORKSTREAMS, DEPARTMENTS }
