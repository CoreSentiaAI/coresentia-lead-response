import type { Brief, PurchaseOrder } from './types'
import { WORKSTREAMS } from './seed'
import { fmtDate, fmtDateTime, aud, lineTotals } from './format'

// "Ask the tracker" for the demo: deterministic answers from the seed, no
// model behind it. In the platform build the same box runs over the real
// data with an AI model and shows the numbers it used.

export type Answer = { text: string; briefs?: Brief[] }

type Ctx = { briefs: Brief[]; pos: PurchaseOrder[]; actor: string; now: Date }

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'what', 'whats', 'which', 'who', 'when', 'where', 'how', 'many', 'of', 'in', 'on', 'for', 'to', 'me', 'my', 'i', 'do', 'does', 'and', 'or', 'about', 'tell', 'show', 'list', 'give', 'please', 'brief', 'briefs', 'status', 'this', 'that', 'with', 'at', 'it', 'its'])

function words(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
}

function matchBriefs(q: string, briefs: Brief[]): Brief[] {
  const ws = words(q)
  if (ws.length === 0) return []
  const scored = briefs
    .map((b) => {
      const hay = `${b.title} ${b.module} ${b.department ?? ''} ${b.outcome} ${b.owner}`.toLowerCase()
      const score = ws.reduce((n, w) => n + (hay.includes(w) ? (b.title.toLowerCase().includes(w) ? 2 : 1) : 0), 0)
      return { b, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  const top = scored[0]?.score ?? 0
  return scored.filter((x) => x.score >= Math.max(1, top - 1)).map((x) => x.b)
}

function describe(b: Brief): string {
  const last = [...b.changeLog].sort((x, y) => (x.at < y.at ? 1 : -1))[0]
  const ws = WORKSTREAMS.find((w) => w.id === b.workstream)?.name ?? b.workstream
  const bits = [
    `${b.title} is in ${b.stage} (${b.priority}, ${ws}).`,
    `Brief owner ${b.owner}${b.smes.length ? `, SMEs ${b.smes.join(' and ')}` : ''}.`,
    b.targetDate ? `Target ${fmtDate(b.targetDate)}.` : '',
    b.signOff === 'awaiting' ? 'Awaiting sign-off.' : b.signOff === 'signed off' ? 'Signed off.' : '',
    last ? `Last entry: ${last.action} (${last.who}, ${fmtDateTime(last.at)}).` : '',
  ]
  return bits.filter(Boolean).join(' ')
}

export function answer(question: string, ctx: Ctx): Answer {
  const q = question.trim().toLowerCase()
  const { briefs, pos, actor, now } = ctx
  const mine = briefs.filter((b) => b.owner === actor || b.smes.includes(actor))

  if (/waiting on me|on my plate|my work|assigned to me|what do i|what should i|my briefs|for me\b/.test(q)) {
    if (actor === 'Ramsay Hatfield') {
      const ready = briefs.filter((b) => b.stage === 'Approved for build').sort((a, b) => a.priority.localeCompare(b.priority))
      const building = briefs.filter((b) => b.stage === 'In build')
      const feedback = briefs.filter((b) => b.feedback.some((f) => f.status === 'open'))
      const closeOut = briefs.filter((b) => b.stage === 'Production' && b.signOff !== 'signed off')
      const parts = [
        building.length ? `In build now: ${building.map((b) => b.title).join(', ')}.` : '',
        ready.length ? `Approved and waiting for you, in rank order: ${ready.map((b) => `${b.title} (${b.priority}, ${b.days}d)`).join('; ')}.` : '',
        feedback.length ? `Open feedback to address on ${feedback.map((b) => b.title).join(', ')}.` : '',
        closeOut.length ? `Waiting on sign-off in production: ${closeOut.map((b) => b.title).join(', ')}.` : '',
      ].filter(Boolean)
      return { text: parts.join(' ') || 'Nothing is waiting on you.', briefs: [...building, ...ready, ...feedback, ...closeOut] }
    }
    const attention = mine.filter((b) => (b.stage === 'Testing' && b.signOff !== 'signed off') || (b.stage === 'Production' && b.signOff === 'awaiting'))
    const poWait = pos.filter((p) => p.status === 'Submitted' && p.approvals.some((a) => a.decision === 'pending' && a.approver === actor))
    const parts: string[] = []
    if (attention.length) parts.push(`${attention.length} brief${attention.length === 1 ? '' : 's'} need${attention.length === 1 ? 's' : ''} you: ${attention.map((b) => `${b.title} (${b.stage === 'Testing' ? 'click-through due' : 'sign-off requested'})`).join('; ')}.`)
    if (poWait.length) parts.push(`${poWait.length} purchase order${poWait.length === 1 ? '' : 's'} waiting for your approval: ${poWait.map((p) => `${p.number} ${aud(lineTotals(p.lines).exGst)} ex GST`).join(', ')}.`)
    if (!parts.length) parts.push(`Nothing is waiting on you right now. You are named on ${mine.length} brief${mine.length === 1 ? '' : 's'}.`)
    return { text: parts.join(' '), briefs: attention }
  }

  if (/what changed|recent|this week|latest|last (few )?days|update me|catch me up/.test(q)) {
    const since = new Date(now.getTime() - 7 * 86400000).toISOString()
    const entries = briefs
      .flatMap((b) => b.changeLog.filter((e) => e.at >= since).map((e) => ({ b, e })))
      .sort((x, y) => (x.e.at < y.e.at ? 1 : -1))
      .slice(0, 6)
    if (!entries.length) return { text: 'Nothing has moved in the last seven days.' }
    return { text: `Last seven days, newest first: ${entries.map(({ b, e }) => `${b.title}: ${e.action} (${e.who}, ${fmtDateTime(e.at)})`).join(' ')}`, briefs: Array.from(new Set(entries.map((x) => x.b))) }
  }

  if (/hotfix|bug|broken|incident/.test(q)) {
    const hot = briefs.filter((b) => b.workType === 'hotfix')
    return hot.length ? { text: `${hot.length} hotfix${hot.length === 1 ? '' : 'es'} this month. ${hot.map(describe).join(' ')}`, briefs: hot } : { text: 'No hotfixes logged.' }
  }

  if (/overdue|late|behind|slipp/.test(q)) {
    const today = now.toISOString().slice(0, 10)
    const late = briefs.filter((b) => b.targetDate && b.targetDate < today && b.stage !== 'Complete')
    return late.length ? { text: `${late.length} past target and not complete: ${late.map((b) => `${b.title} (target ${fmtDate(b.targetDate!)}, now ${b.stage})`).join('; ')}.`, briefs: late } : { text: 'Nothing is past its target date.' }
  }

  if (/due|target|deadline|this month|next month|when/.test(q)) {
    const m = matchBriefs(q, briefs)
    if (m.length === 1 && m[0].targetDate) return { text: `${m[0].title} is targeted for ${fmtDate(m[0].targetDate)} and is currently in ${m[0].stage}.`, briefs: m }
    const month = now.getMonth()
    const year = now.getFullYear()
    const shift = /next month/.test(q) ? 1 : 0
    const d = new Date(year, month + shift, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const due = briefs.filter((b) => b.targetDate?.startsWith(key)).sort((a, b) => a.targetDate!.localeCompare(b.targetDate!))
    return due.length ? { text: `${due.length} targeted for ${d.toLocaleString('en-AU', { month: 'long' })}: ${due.map((b) => `${b.title} (${fmtDate(b.targetDate!)}, ${b.stage})`).join('; ')}.`, briefs: due } : { text: `Nothing is targeted for ${d.toLocaleString('en-AU', { month: 'long' })}.` }
  }

  if (/who (owns|is the owner|is responsible|looks after)|owner of/.test(q)) {
    const m = matchBriefs(q, briefs)
    if (m.length >= 1) return { text: m.slice(0, 3).map((b) => `${b.title}: brief owner ${b.owner}${b.smes.length ? `, SMEs ${b.smes.join(' and ')}` : ''}.`).join(' '), briefs: m.slice(0, 3) }
  }

  if (/how many|count|number of|summary|overview|where are we/.test(q)) {
    const by = (st: string) => briefs.filter((b) => b.stage === st).length
    return { text: `${briefs.length} briefs. Mapping ${by('Mapping')}, Briefed in ${by('Briefed in')}, Approved for build ${by('Approved for build')}, In build ${by('In build')}, Testing ${by('Testing')}, Production ${by('Production')}, Complete ${by('Complete')}. ${briefs.filter((b) => b.signOff === 'awaiting').length} awaiting sign-off.` }
  }

  for (const st of ['Production', 'Testing', 'Complete', 'In build', 'Mapping', 'Briefed in', 'Approved for build'] as const) {
    if (q.includes(st.toLowerCase()) || (st === 'Production' && /\blive\b/.test(q)) || (st === 'Complete' && /\b(done|finished)\b/.test(q))) {
      const list = briefs.filter((b) => b.stage === st)
      return list.length ? { text: `${list.length} in ${st}: ${list.map((b) => `${b.title} (${b.owner})`).join('; ')}.`, briefs: list } : { text: `Nothing in ${st}.` }
    }
  }

  const ws = WORKSTREAMS.find((w) => q.includes(w.name.toLowerCase()) || q.includes(w.id))
  if (ws) {
    const list = briefs.filter((b) => b.workstream === ws.id)
    const done = list.filter((b) => b.stage === 'Complete').length
    return { text: `${ws.name}: ${ws.goal} ${list.length} briefs, ${done} complete, owner ${ws.owner}. ${list.filter((b) => b.stage !== 'Complete').map((b) => `${b.title} (${b.stage})`).join('; ')}.`, briefs: list }
  }

  if (/purchase order|\bpo\b|\bpos\b/.test(q)) {
    const waiting = pos.filter((p) => p.status === 'Submitted')
    const committed = pos.filter((p) => p.status === 'Approved' || p.status === 'Sent to ERP').reduce((s, p) => s + lineTotals(p.lines).exGst, 0)
    const m = briefs.filter((b) => b.module === 'Purchase Orders')
    return { text: `${pos.length} purchase orders. ${waiting.length} waiting for approval, ${aud(committed)} ex GST committed and not yet closed. The module has ${m.length} briefs: ${m.map((b) => `${b.title} (${b.stage})`).join('; ')}.`, briefs: m }
  }

  const m = matchBriefs(q, briefs)
  if (m.length === 1) return { text: describe(m[0]), briefs: m }
  if (m.length > 1) return { text: `${m.length} briefs match: ${m.slice(0, 5).map((b) => `${b.title} (${b.stage}, ${b.owner})`).join('; ')}${m.length > 5 ? ' and more' : ''}. Ask about one of them for the detail.`, briefs: m.slice(0, 5) }
  return { text: "I couldn't find that in the tracker. Try a brief name, a workstream, a stage, or ask what is waiting on you." }
}

export const SUGGESTIONS = ["What's waiting on me?", 'What changed this week?', "What's in production?", 'Who owns the site diary?', 'What is due this month?', 'Anything overdue?']
