'use client'
import { useMemo, useState } from 'react'
import { PROJECTS, SUPPLIERS, useDemo } from '../_lib/store'
import { PO_STATUSES, type PoLine, type PoStatus, type PurchaseOrder } from '../_lib/types'
import { aud, fmtDate, fmtDateTime, lineTotals, newId } from '../_lib/format'
import { APPROVAL_THRESHOLD, ROUTING_RULE, routeFor, routeLabel } from '../_lib/routing'
import { Field, Label, SlideOver, Tag, btnLink, btnPrimary, btnSecondary, inputClass, selectClass } from './ui'

const supplierName = (id: string) => SUPPLIERS.find((s) => s.id === id)?.name ?? id
const project = (id: string) => PROJECTS.find((p) => p.id === id)
const projectLabel = (id: string) => {
  const p = project(id)
  return p ? `${p.code} ${p.name}` : id
}

function StatusTag({ status }: { status: PoStatus }) {
  const tone = status === 'Approved' || status === 'Sent to ERP' ? 'fill' : status === 'Submitted' ? 'accent' : 'line'
  return <Tag tone={tone}>{status}</Tag>
}

function currentApprover(po: PurchaseOrder) {
  const pending = po.approvals.find((a) => a.decision === 'pending')
  if (pending) return `${pending.approver} (waiting)`
  const last = [...po.approvals].reverse().find((a) => a.decision !== 'pending')
  return last ? last.approver : ''
}

export default function PurchaseOrders() {
  const { state } = useDemo()
  const [status, setStatus] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [raising, setRaising] = useState(false)

  const visible = state.pos.filter((p) => !status || p.status === status)
  const selected = state.pos.find((p) => p.id === selectedId) ?? null
  const committed = useMemo(
    () => state.pos.filter((p) => p.status === 'Approved' || p.status === 'Sent to ERP').reduce((s, p) => s + lineTotals(p.lines).exGst, 0),
    [state.pos],
  )
  const waiting = state.pos.filter((p) => p.status === 'Submitted').length

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="section-label mb-3">Purchase orders</div>
          <h1 className="text-3xl sm:text-4xl font-semibold font-display">Raise, route, approve, post.</h1>
          <p className="mt-3 max-w-2xl text-base">
            One screen from raise to ERP. The routing rule is on the page, and every step is in the audit trail.
          </p>
        </div>
        <button type="button" onClick={() => setRaising(true)} className={btnPrimary}>
          Raise a PO
        </button>
      </div>

      <div className="mt-8 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 border border-line-soft rounded-sm bg-surface-card p-4">
          <Label className="mb-2">Routing rule</Label>
          <ul className="space-y-1">
            {ROUTING_RULE.map((r) => (
              <li key={r} className="text-sm leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="border border-line-soft rounded-sm bg-surface-card p-4">
            <Label className="mb-2">Waiting for approval</Label>
            <div className="text-3xl font-semibold font-display leading-none">{waiting}</div>
          </div>
          <div className="border border-line-soft rounded-sm bg-surface-card p-4">
            <Label className="mb-2">Committed, not yet closed</Label>
            <div className="text-2xl sm:text-3xl font-semibold font-display leading-none break-words">{aud(committed)}</div>
            <div className="mt-1 font-mono text-[0.62rem]">ex GST</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass + ' min-w-[10rem]'} aria-label="Filter by status">
          <option value="">All statuses</option>
          {PO_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="font-mono text-xs">
          {state.pos.length} purchase orders, {visible.length} shown
        </span>
      </div>

      <div className="mt-4 overflow-x-auto border border-line-soft rounded-sm bg-surface-card">
        <table className="w-full text-sm min-w-[64rem]">
          <thead>
            <tr className="border-b border-line-strong text-left">
              {['PO', 'Supplier', 'Project', 'Amount ex GST', 'Status', 'Raised by', 'Approver', 'Raised', 'Updated'].map((h) => (
                <th key={h} className="font-mono font-normal text-[0.62rem] uppercase tracking-[0.08em] px-3 py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((po) => (
              <tr key={po.id} onClick={() => setSelectedId(po.id)} className="border-b border-line-soft last:border-b-0 hover:bg-surface-alt cursor-pointer">
                <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap">{po.number}</td>
                <td className="px-3 py-2.5">{supplierName(po.supplierId)}</td>
                <td className="px-3 py-2.5">{projectLabel(po.projectId)}</td>
                <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap text-right">{aud(lineTotals(po.lines).exGst)}</td>
                <td className="px-3 py-2.5">
                  <StatusTag status={po.status} />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">{po.raisedBy}</td>
                <td className="px-3 py-2.5 whitespace-nowrap">{currentApprover(po)}</td>
                <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap">{fmtDate(po.raisedAt)}</td>
                <td className="px-3 py-2.5 font-mono text-xs whitespace-nowrap">{fmtDate(po.updatedAt)}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-6 font-mono text-xs">
                  Nothing with that status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PoDetail po={selected} onClose={() => setSelectedId(null)} />
      <RaisePo open={raising} onClose={() => setRaising(false)} />
    </div>
  )
}

function PoDetail({ po, onClose }: { po: PurchaseOrder | null; onClose: () => void }) {
  const { run } = useDemo()
  const [note, setNote] = useState('')

  if (!po) return <SlideOver open={false} onClose={onClose}>{null}</SlideOver>

  const totals = lineTotals(po.lines)
  const pending = po.approvals.find((a) => a.decision === 'pending')
  const audit = [...po.audit].sort((a, b) => (a.at < b.at ? 1 : -1))
  const proj = project(po.projectId)

  const act = (type: 'approvePo' | 'rejectPo') => {
    run({ type, id: po.id, note: note.trim() })
    setNote('')
  }

  return (
    <SlideOver open onClose={onClose}>
      <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em]">{po.number}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display leading-tight">{supplierName(po.supplierId)}</h2>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusTag status={po.status} />
        {po.erp.synced && <Tag tone="accent">Synced to ERP</Tag>}
      </div>

      <section className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
        <Field label="Project">
          <div className="text-sm">{projectLabel(po.projectId)}</div>
        </Field>
        <Field label="Project manager">
          <div className="text-sm">{proj?.manager}</div>
        </Field>
        <Field label="Raised by">
          <div className="text-sm">
            {po.raisedBy}, {fmtDateTime(po.raisedAt)}
          </div>
        </Field>
        <Field label="Last updated">
          <div className="text-sm">{fmtDateTime(po.updatedAt)}</div>
        </Field>
      </section>

      <section className="mt-8">
        <Label className="mb-2">Lines</Label>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line-strong text-left">
              <th className="font-mono font-normal text-[0.62rem] uppercase tracking-[0.08em] py-2 pr-3">Description</th>
              <th className="font-mono font-normal text-[0.62rem] uppercase tracking-[0.08em] py-2 px-3 text-right">Qty</th>
              <th className="font-mono font-normal text-[0.62rem] uppercase tracking-[0.08em] py-2 px-3 text-right">Unit ex GST</th>
              <th className="font-mono font-normal text-[0.62rem] uppercase tracking-[0.08em] py-2 pl-3 text-right">Line ex GST</th>
            </tr>
          </thead>
          <tbody>
            {po.lines.map((l) => (
              <tr key={l.id} className="border-b border-line-soft">
                <td className="py-2 pr-3">{l.description}</td>
                <td className="py-2 px-3 text-right font-mono text-xs">{l.qty}</td>
                <td className="py-2 px-3 text-right font-mono text-xs">{aud(l.unitPrice)}</td>
                <td className="py-2 pl-3 text-right font-mono text-xs">{aud(l.qty * l.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-mono text-xs">
            <tr>
              <td colSpan={3} className="pt-3 text-right">
                Subtotal ex GST
              </td>
              <td className="pt-3 pl-3 text-right">{aud(totals.exGst)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="pt-1 text-right">
                GST 10%
              </td>
              <td className="pt-1 pl-3 text-right">{aud(totals.gst)}</td>
            </tr>
            <tr className="font-medium">
              <td colSpan={3} className="pt-1 text-right">
                Total inc GST
              </td>
              <td className="pt-1 pl-3 text-right">{aud(totals.incGst)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-8 border border-line-soft rounded-sm bg-surface-card p-4">
        <Label className="mb-2">Approval routing</Label>
        <div className="text-sm">{routeLabel(totals.exGst)}</div>
        {po.approvals.length > 0 ? (
          <ol className="mt-3 space-y-2">
            {po.approvals.map((a, i) => (
              <li key={a.role} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-mono text-[0.62rem]">{i + 1}</span>
                <span>
                  {a.approver}, {a.role.toLowerCase()}
                </span>
                <Tag tone={a.decision === 'approved' ? 'fill' : a.decision === 'pending' ? 'accent' : 'line'}>{a.decision}</Tag>
                {a.at && <span className="font-mono text-[0.62rem]">{fmtDateTime(a.at)}</span>}
                {a.note && <span className="w-full text-sm pl-5">Note: {a.note}</span>}
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-2 font-mono text-xs">Routing is set when the PO is submitted.</div>
        )}

        {po.status === 'Draft' && (
          <button type="button" onClick={() => run({ type: 'submitPo', id: po.id })} className={btnPrimary + ' mt-4'}>
            Submit for approval
          </button>
        )}

        {po.status === 'Submitted' && pending && (
          <div className="mt-4">
            <Field label={`Note from ${pending.approver}`}>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" className={inputClass} />
            </Field>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" onClick={() => act('approvePo')} className={btnPrimary}>
                Approve as {pending.approver}
              </button>
              <button type="button" onClick={() => act('rejectPo')} className={btnSecondary}>
                Reject
              </button>
            </div>
          </div>
        )}

        {po.status === 'Approved' && (
          <button type="button" onClick={() => run({ type: 'sendToErp', id: po.id })} className={btnPrimary + ' mt-4'}>
            Send to ERP
          </button>
        )}

        {po.status === 'Sent to ERP' && (
          <button type="button" onClick={() => run({ type: 'closePo', id: po.id })} className={btnSecondary + ' mt-4'}>
            Close PO
          </button>
        )}
      </section>

      <section className="mt-8">
        <Label className="mb-2">ERP sync</Label>
        {po.erp.synced && po.erp.at ? (
          <div>
            <div className="text-sm">
              Synced {fmtDateTime(po.erp.at)} as <span className="font-mono text-xs">{po.erp.reference}</span>
            </div>
            <ul className="mt-2 border-t border-line-soft">
              {po.erp.log.map((e) => (
                <li key={e.at + e.text} className="py-2 border-b border-line-soft font-mono text-xs leading-relaxed">
                  {fmtDateTime(e.at)} {e.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="font-mono text-xs">Not synced. Posts to the ERP once approved and sent.</div>
        )}
      </section>

      <section className="mt-8">
        <Label className="mb-2">Attachments</Label>
        {po.attachments.length > 0 ? (
          <ul className="space-y-1">
            {po.attachments.map((a) => (
              <li key={a} className="font-mono text-xs">
                {a}
              </li>
            ))}
          </ul>
        ) : (
          <div className="font-mono text-xs">None attached.</div>
        )}
      </section>

      <section className="mt-10">
        <Label>Audit trail</Label>
        <ol className="mt-3 border-t border-line-soft">
          {audit.map((e) => (
            <li key={e.id} className="grid grid-cols-[7.5rem_1fr] gap-4 py-2.5 border-b border-line-soft">
              <div className="font-mono text-[0.62rem] leading-relaxed pt-0.5">
                {fmtDateTime(e.at)}
                <br />
                {e.who}
              </div>
              <div className="text-sm leading-relaxed">{e.action}</div>
            </li>
          ))}
        </ol>
      </section>
    </SlideOver>
  )
}

const blankLine = (): PoLine => ({ id: newId('line'), description: '', qty: 1, unitPrice: 0 })

function RaisePo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { run, actor } = useDemo()
  const [supplierId, setSupplierId] = useState('')
  const [projectId, setProjectId] = useState('')
  const [lines, setLines] = useState<PoLine[]>([blankLine()])

  const totals = lineTotals(lines)
  const proj = project(projectId)
  const valid = supplierId && projectId && lines.some((l) => l.description.trim() && l.qty > 0 && l.unitPrice > 0)

  const reset = () => {
    setSupplierId('')
    setProjectId('')
    setLines([blankLine()])
  }

  const submit = (send: boolean) => {
    const clean = lines.filter((l) => l.description.trim() && l.qty > 0 && l.unitPrice > 0)
    run({ type: 'createPo', supplierId, projectId, lines: clean, submit: send })
    reset()
    onClose()
  }

  const setLine = (id: string, patch: Partial<PoLine>) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  return (
    <SlideOver open={open} onClose={onClose}>
      <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em]">New purchase order</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display leading-tight">Raise a PO</h2>
      <p className="mt-2 text-sm">Raised by {actor.name}. Routing is decided by the ex GST total when you submit.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Field label="Supplier">
          <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className={selectClass + ' w-full'}>
            <option value="">Choose a supplier</option>
            {SUPPLIERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project">
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={selectClass + ' w-full'}>
            <option value="">Choose a project</option>
            {PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code} {p.name}
              </option>
            ))}
          </select>
          {proj && <div className="mt-1.5 font-mono text-[0.62rem]">Project manager: {proj.manager}</div>}
        </Field>
      </div>

      <section className="mt-8">
        <Label className="mb-2">Line items</Label>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_4.5rem_7rem_7rem_3rem] gap-2 font-mono text-[0.62rem] uppercase tracking-[0.08em]">
            <span>Description</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Unit ex GST</span>
            <span className="text-right">Line ex GST</span>
            <span />
          </div>
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-[1fr_4.5rem_7rem_7rem_3rem] gap-2 items-center">
              <input value={l.description} onChange={(e) => setLine(l.id, { description: e.target.value })} placeholder="What is being bought" className={inputClass} />
              <input type="number" min={0} step={1} value={l.qty} onChange={(e) => setLine(l.id, { qty: Number(e.target.value) })} className={inputClass + ' text-right'} />
              <input type="number" min={0} step={0.01} value={l.unitPrice || ''} onChange={(e) => setLine(l.id, { unitPrice: Number(e.target.value) })} placeholder="0.00" className={inputClass + ' text-right'} />
              <div className="font-mono text-xs text-right">{aud(l.qty * l.unitPrice)}</div>
              <button type="button" onClick={() => setLines((ls) => (ls.length > 1 ? ls.filter((x) => x.id !== l.id) : ls))} className="btn text-right hover:underline underline-offset-4" aria-label="Remove line">
                Del
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setLines((ls) => [...ls, blankLine()])} className={btnLink + ' mt-3'}>
          Add a line
        </button>

        <div className="mt-4 ml-auto max-w-xs font-mono text-xs space-y-1">
          <div className="flex justify-between">
            <span>Subtotal ex GST</span>
            <span>{aud(totals.exGst)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST 10%</span>
            <span>{aud(totals.gst)}</span>
          </div>
          <div className="flex justify-between font-medium border-t border-line-strong pt-1">
            <span>Total inc GST</span>
            <span>{aud(totals.incGst)}</span>
          </div>
        </div>
      </section>

      <section className="mt-6 border border-line-soft rounded-sm bg-surface-card p-4">
        <Label className="mb-2">This PO will route to</Label>
        {proj ? (
          <ol className="space-y-1 text-sm">
            {routeFor(totals.exGst, proj).map((a, i) => (
              <li key={a.role}>
                {i + 1}. {a.approver}, {a.role.toLowerCase()}
              </li>
            ))}
          </ol>
        ) : (
          <div className="font-mono text-xs">Choose a project to see the route.</div>
        )}
        <div className="mt-2 font-mono text-[0.62rem]">Threshold {aud(APPROVAL_THRESHOLD)} ex GST.</div>
      </section>

      <section className="mt-6">
        <Label className="mb-2">Attachments</Label>
        <div className="border border-dashed border-line-strong rounded-sm p-6 text-center font-mono text-xs">
          Drop quotes and supporting documents here. Placeholder in the demo.
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" disabled={!valid} onClick={() => submit(true)} className={btnPrimary}>
          Submit for approval
        </button>
        <button type="button" disabled={!valid} onClick={() => submit(false)} className={btnSecondary}>
          Save as draft
        </button>
      </div>
    </SlideOver>
  )
}
