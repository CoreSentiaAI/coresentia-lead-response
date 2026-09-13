'use client'
// Demo state. No database: the seed is the starting point, every action runs
// in the browser, and the result is kept in localStorage so a page refresh
// mid-demo does not lose the click-through. "Reset demo data" in the shell
// returns everything to the seed.

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Attachment, Brief, Notification, NotifyPref, Person, PoLine, Priority, PurchaseOrder, Stage, WorkType } from './types'
import { ACTORS, BRIEFS, DEFAULT_ACTOR, DEPARTMENTS, MODULES, NEXT_PO_SEQUENCE, NOTIFICATIONS, PEOPLE, PROJECTS, PURCHASE_ORDERS, SUPPLIERS, WORKSTREAMS } from './seed'
import { lineTotals, newId } from './format'
import { routeFor } from './routing'

const STORAGE_KEY = 'cs-demo-state'
const VERSION = 7

type State = {
  version: number
  briefs: Brief[]
  pos: PurchaseOrder[]
  actingAs: string
  poSeq: number
  notifications: Notification[]
  notifyPrefs: Record<string, NotifyPref>
}

const seedState = (): State => ({
  version: VERSION,
  briefs: BRIEFS,
  pos: PURCHASE_ORDERS,
  actingAs: DEFAULT_ACTOR,
  poSeq: NEXT_PO_SEQUENCE,
  notifications: NOTIFICATIONS,
  notifyPrefs: {},
})

type Stamp = { at: string; who: string }

type Action =
  | { type: 'reset' }
  | { type: 'hydrate'; state: State }
  | { type: 'setActingAs'; id: string }
  | { type: 'markRead'; id: string }
  | { type: 'markAllRead'; who: string }
  | { type: 'setNotifyPref'; who: string; pref: NotifyPref }
  | ({ type: 'addBrief'; title: string; module: string; workstream: string; department?: string; owner: string; smes: string[]; priority: Priority; workType: WorkType; days: number; targetDate: string | null; outcome: string } & Stamp)
  | ({ type: 'moveBrief'; id: string; stage: Stage } & Stamp)
  | ({ type: 'updateBrief'; id: string; patch: Partial<Brief>; changed: string[] } & Stamp)
  | ({ type: 'addFeedback'; id: string; text: string } & Stamp)
  | ({ type: 'toggleFeedback'; id: string; feedbackId: string } & Stamp)
  | ({ type: 'setPreviewUrl'; id: string; url: string } & Stamp)
  | ({ type: 'addAttachment'; id: string; attachment: Omit<Attachment, 'uploadedBy' | 'at'> } & Stamp)
  | ({ type: 'removeAttachment'; id: string; attachmentId: string } & Stamp)
  | ({ type: 'signOffBrief'; id: string } & Stamp)
  | ({ type: 'toggleDone'; id: string; key: 'readme' | 'tests' } & Stamp)
  | ({ type: 'createPo'; supplierId: string; projectId: string; lines: PoLine[]; submit: boolean } & Stamp)
  | ({ type: 'submitPo'; id: string } & Stamp)
  | ({ type: 'approvePo'; id: string; note: string } & Stamp)
  | ({ type: 'rejectPo'; id: string; note: string } & Stamp)
  | ({ type: 'sendToErp'; id: string } & Stamp)
  | ({ type: 'closePo'; id: string } & Stamp)

const logEntry = (s: Stamp, action: string) => ({ id: newId('log'), at: s.at, who: s.who, action })

const BUILDER = 'Ramsay Hatfield'

// Fan a notification out to everyone on the list except whoever did the thing.
function notify(state: State, s: Stamp, to: string[], kind: Notification['kind'], text: string, briefId?: string): State {
  const recipients = Array.from(new Set(to)).filter((n) => n && n !== s.who)
  if (recipients.length === 0) return state
  const fresh = recipients.map((n) => ({ id: newId('n'), to: n, kind, text, briefId, at: s.at, read: false }))
  return { ...state, notifications: [...fresh, ...state.notifications] }
}

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
    case 'markRead':
      return { ...state, notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n)) }
    case 'markAllRead':
      return { ...state, notifications: state.notifications.map((n) => (n.to === action.who ? { ...n, read: true } : n)) }
    case 'setNotifyPref':
      return { ...state, notifyPrefs: { ...state.notifyPrefs, [action.who]: action.pref } }

    case 'addBrief': {
      const brief: Brief = {
        id: newId('brief'),
        title: action.title,
        module: action.module,
        workstream: action.workstream,
        department: action.department,
        owner: action.owner,
        smes: action.smes,
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
        feedback: [],
        changeLog: [logEntry(action, 'Request raised. Entered Mapping.')],
        attachments: [],
        done: { readme: false, tests: false },
      }
      const withBrief = { ...state, briefs: [brief, ...state.briefs] }
      const assigned = notify(withBrief, action, [action.owner, ...action.smes], 'assigned', `${action.who} raised ${action.title} and named you on it.`, brief.id)
      return notify(assigned, action, [BUILDER, 'Helen Marsh'], action.workType === 'hotfix' ? 'hotfix' : 'assigned', action.workType === 'hotfix' ? `Hotfix logged by ${action.who}: ${action.title}.` : `New request to rank: ${action.title}, raised by ${action.who}.`, brief.id)
    }

    case 'updateBrief': {
      const before = state.briefs.find((b) => b.id === action.id)
      const next = updateBrief(state, action.id, (b) => ({
        ...b,
        ...action.patch,
        changeLog: action.changed.length ? [...b.changeLog, logEntry(action, `Details updated: ${action.changed.join(', ')}.`)] : b.changeLog,
      }))
      if (!before) return next
      const after = next.briefs.find((b) => b.id === action.id)!
      const newlyNamed = [after.owner, ...after.smes].filter((n) => n !== before.owner && !before.smes.includes(n))
      return notify(next, action, newlyNamed, 'assigned', `${action.who} named you on ${after.title}.`, after.id)
    }

    case 'moveBrief': {
      const target = state.briefs.find((b) => b.id === action.id)
      const moved = updateBrief(state, action.id, (b) => {
        if (b.stage === action.stage) return b
        const notes: string[] = [`Moved from ${b.stage} to ${action.stage}.`]
        let lockDate = b.lockDate
        if (action.stage === 'Approved for build' && !lockDate) {
          lockDate = action.at.slice(0, 10)
          notes.push('Approval date set.')
        }
        if (action.stage === 'Production') notes.push('Promoted to production.')
        return { ...b, stage: action.stage, lockDate, changeLog: [...b.changeLog, logEntry(action, notes.join(' '))] }
      })
      if (!target || target.stage === action.stage) return moved
      const kind = action.stage === 'Production' ? 'signoff' : 'stage'
      const text =
        action.stage === 'Production'
          ? `Sign-off requested: ${target.title} is in production.`
          : action.stage === 'Testing'
            ? `${target.title} moved to Testing. Your click-through is due.`
            : `${action.who} moved ${target.title} to ${action.stage}.`
      return notify(moved, action, [target.owner, ...target.smes, BUILDER], kind, text, target.id)
    }

    case 'addFeedback': {
      const target = state.briefs.find((b) => b.id === action.id)
      const next = updateBrief(state, action.id, (b) => ({
        ...b,
        feedback: [...b.feedback, { id: newId('fb'), author: action.who, text: action.text, status: 'open', at: action.at }],
        changeLog: [...b.changeLog, logEntry(action, 'Test feedback added.')],
      }))
      return target ? notify(next, action, [BUILDER, target.owner], 'feedback', `${action.who} added test feedback on ${target.title}.`, target.id) : next
    }

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

    case 'toggleDone':
      return updateBrief(state, action.id, (b) => {
        const next = !b.done[action.key]
        const label = action.key === 'readme' ? 'README written' : 'Tests on cross-module paths'
        return { ...b, done: { ...b.done, [action.key]: next }, changeLog: [...b.changeLog, logEntry(action, `Definition of done: ${label} ${next ? 'confirmed' : 'unticked'}.`)] }
      })

    case 'signOffBrief': {
      const target = state.briefs.find((b) => b.id === action.id)
      const next = updateBrief(state, action.id, (b) => ({
        ...b,
        signOff: 'signed off',
        changeLog: [...b.changeLog, logEntry(action, `Signed off by ${action.who}.`)],
      }))
      return target ? notify(next, action, [BUILDER, target.owner, ...target.smes], 'signoff', `${action.who} signed off ${target.title}.`, target.id) : next
    }

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

    case 'approvePo': {
      const po = state.pos.find((p) => p.id === action.id)
      const next = updatePo(state, action.id, (p) => {
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
      if (!po) return next
      const after = next.pos.find((p) => p.id === action.id)!
      const step = po.approvals.find((a) => a.decision === 'pending')
      const pendingNext = after.approvals.find((a) => a.decision === 'pending')
      const stamp = { at: action.at, who: step?.approver ?? action.who }
      const told = notify(next, stamp, [po.raisedBy], 'po', after.status === 'Approved' ? `${po.number} approved. Ready to send to the ERP.` : `${po.number} approved by ${step?.approver}. Waiting on ${pendingNext?.approver}.`)
      return pendingNext ? notify(told, stamp, [pendingNext.approver], 'po', `${po.number} is waiting for your approval.`) : told
    }

    case 'rejectPo': {
      const po = state.pos.find((p) => p.id === action.id)
      const next = updatePo(state, action.id, (p) => {
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
      if (!po) return next
      const step = po.approvals.find((a) => a.decision === 'pending')
      return notify(next, { at: action.at, who: step?.approver ?? action.who }, [po.raisedBy], 'po', `${po.number} rejected by ${step?.approver}.${action.note ? ` Note: ${action.note}` : ''}`)
    }

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
      if (command.type === 'hydrate' || command.type === 'setActingAs' || command.type === 'markRead' || command.type === 'markAllRead' || command.type === 'setNotifyPref') {
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
