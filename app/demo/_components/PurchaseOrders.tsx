'use client'
import { useMemo, useState } from 'react'
import { PROJECTS, SUPPLIERS, useDemo } from '../_lib/store'
import { PO_STATUSES, type PoLine, type PurchaseOrder } from '../_lib/types'
import { aud, fmtDate, fmtDateTime, lineTotals, newId } from '../_lib/format'
import { APPROVAL_THRESHOLD, ROUTING_RULE, routeFor, routeLabel } from '../_lib/routing'
import { DECISION_TONE, PO_STATUS_TONE } from '../_lib/tones'
import { Avatar, Button, Card, Chip, Field, Kicker, Modal, ModalHeader, PageHeader, Person, SectionTitle, StatCard, inputClass, selectClass } from './ui'

const supplierName = (id: string) => SUPPLIERS.find((s) => s.id === id)?.name ?? id
const project = (id: string) => PROJECTS.find((p) => p.id === id)
const projectLabel = (id: string) => {
  const p = project(id)
  return p ? `${p.code} ${p.name}` : id
}

function currentApprover(po: PurchaseOrder): { name: string; waiting: boolean } | null {
  const pending = po.approvals.find((a) => a.decision === 'pending')
  if (pending) return { name: pending.approver, waiting: true }
  const last = [...po.approvals].reverse().find((a) => a.decision !== 'pending')
  return last ? { name: last.approver, waiting: false } : null
}

const TH = 'px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted whitespace-nowrap text-left'

export default function PurchaseOrders() {
  const { state } = useDemo()
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [raising, setRaising] = useState(false)

  const q = search.trim().toLowerCase()
  const visible = state.pos.filter((p) => (!status || p.status === status) && (!q || `${p.number} ${supplierName(p.supplierId)} ${projectLabel(p.projectId)} ${p.raisedBy}`.toLowerCase().includes(q)))
  const selected = state.pos.find((p) => p.id === selectedId) ?? null
  const committed = useMemo(() => state.pos.filter((p) => p.status === 'Approved' || p.status === 'Sent to ERP').reduce((s, p) => s + lineTotals(p.lines).exGst, 0), [state.pos])
  const waiting = state.pos.filter((p) => p.status === 'Submitted').length

  return (
    <div>
      <PageHeader
        crumbs={[{ label: 'Platform', href: '/demo/platform' }, { label: 'Purchase orders' }]}
        title="Purchase orders"
        subtitle="Raise against a project, route by value, approve, post to the ERP. Every step in the audit trail."
        actions={
          <Button variant="primary" onClick={() => setRaising(true)}>
            Raise a PO
          </Button>
        }
      />

      <div className="px-6 lg:px-8 py-5">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="p-4 xl:col-span-2">
            <Kicker>Routing rule</Kicker>
            <ul className="mt-1.5 space-y-1 text-[13px]">
              {ROUTING_RULE.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <StatCard label="Waiting for approval" value={waiting} hint="Submitted, not yet decided" />
          <StatCard label="Committed, not yet closed" value={aud(committed)} hint="Approved or sent to ERP, ex GST" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search POs" className={inputClass + ' max-w-[224px]'} aria-label="Search purchase orders" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass} aria-label="Filter by status">
            <option value="">All statuses</option>
            {PO_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {(status || q) && (
            <Button
              variant="ghost"
              onClick={() => {
                setStatus('')
                setSearch('')
              }}
            >
              Clear
            </Button>
          )}
          <span className="ml-auto text-[12.5px] text-pm-muted">
            {visible.length} of {state.pos.length} purchase orders
          </span>
        </div>

        <Card className="mt-4 overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[1080px] text-[13px]">
            <thead>
              <tr className="bg-pm-hover border-b border-pm-border">
                <th className={TH}>PO</th>
                <th className={TH}>Supplier</th>
                <th className={TH}>Project</th>
                <th className={TH + ' text-right'}>Amount ex GST</th>
                <th className={TH}>Status</th>
                <th className={TH}>Raised by</th>
                <th className={TH}>Approver</th>
                <th className={TH}>Raised</th>
                <th className={TH}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((po) => {
                const appr = currentApprover(po)
                return (
                  <tr key={po.id} onClick={() => setSelectedId(po.id)} className="border-b border-pm-border last:border-b-0 hover:bg-pm-hover cursor-pointer">
                    <td className="px-3 py-2.5 font-pm-mono text-[12.5px] whitespace-nowrap">{po.number}</td>
                    <td className="px-3 py-2.5 font-medium">{supplierName(po.supplierId)}</td>
                    <td className="px-3 py-2.5 text-pm-muted">{projectLabel(po.projectId)}</td>
                    <td className="px-3 py-2.5 text-right font-pm-mono text-[12.5px] whitespace-nowrap">{aud(lineTotals(po.lines).exGst)}</td>
                    <td className="px-3 py-2.5">
                      <Chip tone={PO_STATUS_TONE[po.status]} dot>
                        {po.status}
                      </Chip>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <Person name={po.raisedBy} />
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {appr ? (
                        <span className="inline-flex items-center gap-2">
                          <Person name={appr.name} />
                          {appr.waiting && <Chip tone="amber">waiting</Chip>}
                        </span>
                      ) : (
                        <span className="text-pm-faint">Not routed</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-pm-muted">{fmtDate(po.raisedAt)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-pm-muted">{fmtDate(po.updatedAt)}</td>
                  </tr>
                )
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-pm-muted">
                    Nothing matches.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      <PoDetail po={selected} onClose={() => setSelectedId(null)} />
      <RaisePo open={raising} onClose={() => setRaising(false)} />
    </div>
  )
}

function LinesTable({ lines }: { lines: PoLine[] }) {
  const totals = lineTotals(lines)
  return (
    <table className="w-full text-[13px]">
      <thead>
        <tr className="border-b border-pm-border">
          <th className={TH + ' pl-0'}>Description</th>
          <th className={TH + ' text-right'}>Qty</th>
          <th className={TH + ' text-right'}>Unit ex GST</th>
          <th className={TH + ' text-right pr-0'}>Line ex GST</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l) => (
          <tr key={l.id} className="border-b border-pm-border">
            <td className="py-2 pr-3">{l.description}</td>
            <td className="py-2 px-3 text-right font-pm-mono text-[12.5px]">{l.qty}</td>
            <td className="py-2 px-3 text-right font-pm-mono text-[12.5px]">{aud(l.unitPrice)}</td>
            <td className="py-2 pl-3 text-right font-pm-mono text-[12.5px]">{aud(l.qty * l.unitPrice)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot className="text-[12.5px]">
        <tr>
          <td colSpan={3} className="pt-3 text-right text-pm-muted">
            Subtotal ex GST
          </td>
          <td className="pt-3 pl-3 text-right font-pm-mono">{aud(totals.exGst)}</td>
        </tr>
        <tr>
          <td colSpan={3} className="pt-1 text-right text-pm-muted">
            GST 10%
          </td>
          <td className="pt-1 pl-3 text-right font-pm-mono">{aud(totals.gst)}</td>
        </tr>
        <tr className="font-semibold">
          <td colSpan={3} className="pt-1 text-right">
            Total inc GST
          </td>
          <td className="pt-1 pl-3 text-right font-pm-mono">{aud(totals.incGst)}</td>
        </tr>
      </tfoot>
    </table>
  )
}

function PoDetail({ po, onClose }: { po: PurchaseOrder | null; onClose: () => void }) {
  const { run } = useDemo()
  const [note, setNote] = useState('')

  if (!po) return <Modal open={false} onClose={onClose}>{null}</Modal>

  const totals = lineTotals(po.lines)
  const pending = po.approvals.find((a) => a.decision === 'pending')
  const audit = [...po.audit].sort((a, b) => (a.at < b.at ? 1 : -1))
  const proj = project(po.projectId)

  const act = (type: 'approvePo' | 'rejectPo') => {
    run({ type, id: po.id, note: note.trim() })
    setNote('')
  }

  return (
    <Modal open onClose={onClose}>
      <ModalHeader
        kicker={po.number}
        title={supplierName(po.supplierId)}
        subtitle={projectLabel(po.projectId)}
        onClose={onClose}
        chips={
          <>
            <Chip tone={PO_STATUS_TONE[po.status]} dot>
              {po.status}
            </Chip>
            {po.erp.synced && <Chip tone="teal">Synced to ERP</Chip>}
            <Chip tone="grey">{aud(totals.exGst)} ex GST</Chip>
          </>
        }
      />

      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7 lg:overflow-y-auto px-6 lg:px-8 py-6 lg:border-r border-pm-border scrollbar-thin">
          <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <Field label="Project manager">
              <Person name={proj?.manager ?? ''} />
            </Field>
            <Field label="Raised by">
              <Person name={po.raisedBy} />
              <div className="mt-1 text-[12px] text-pm-muted">{fmtDateTime(po.raisedAt)}</div>
            </Field>
            <Field label="Last updated">
              <div>{fmtDateTime(po.updatedAt)}</div>
            </Field>
          </section>

          <section className="mt-6">
            <SectionTitle>Lines</SectionTitle>
            <div className="mt-2">
              <LinesTable lines={po.lines} />
            </div>
          </section>

          <Card className="mt-6 p-4">
            <SectionTitle>Approval routing</SectionTitle>
            <div className="mt-1 text-[13px] text-pm-muted">{routeLabel(totals.exGst)}</div>
            {po.approvals.length > 0 ? (
              <ol className="mt-3 space-y-2.5">
                {po.approvals.map((a, i) => (
                  <li key={a.role} className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="h-5 w-5 rounded-full bg-pm-hover border border-pm-border text-[11px] font-semibold inline-flex items-center justify-center">{i + 1}</span>
                    <Person name={a.approver} />
                    <span className="text-pm-muted">{a.role.toLowerCase()}</span>
                    <Chip tone={DECISION_TONE[a.decision]} dot>
                      {a.decision}
                    </Chip>
                    {a.at && <span className="text-[12px] text-pm-muted">{fmtDateTime(a.at)}</span>}
                    {a.note && <span className="w-full pl-7 text-[12.5px] text-pm-muted">Note: {a.note}</span>}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-2 text-[12.5px] text-pm-muted">Routing is set when the PO is submitted.</div>
            )}

            {po.status === 'Draft' && (
              <Button variant="primary" className="mt-4" onClick={() => run({ type: 'submitPo', id: po.id })}>
                Submit for approval
              </Button>
            )}
            {po.status === 'Submitted' && pending && (
              <div className="mt-4">
                <Field label={`Note from ${pending.approver}`}>
                  <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" className={inputClass + ' max-w-xl'} />
                </Field>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="primary" onClick={() => act('approvePo')}>
                    Approve as {pending.approver}
                  </Button>
                  <Button variant="danger" onClick={() => act('rejectPo')}>
                    Reject
                  </Button>
                </div>
              </div>
            )}
            {po.status === 'Approved' && (
              <Button variant="primary" className="mt-4" onClick={() => run({ type: 'sendToErp', id: po.id })}>
                Send to ERP
              </Button>
            )}
            {po.status === 'Sent to ERP' && (
              <Button className="mt-4" onClick={() => run({ type: 'closePo', id: po.id })}>
                Close PO
              </Button>
            )}
          </Card>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <section>
              <SectionTitle>ERP sync</SectionTitle>
              {po.erp.synced && po.erp.at ? (
                <div className="mt-1.5">
                  <div className="text-[13px]">
                    Synced {fmtDateTime(po.erp.at)} as <span className="font-pm-mono text-[12.5px]">{po.erp.reference}</span>
                  </div>
                  <ul className="mt-2 border-t border-pm-border">
                    {po.erp.log.map((e) => (
                      <li key={e.at + e.text} className="py-2 border-b border-pm-border text-[12.5px] text-pm-muted leading-relaxed">
                        <span className="font-pm-mono">{fmtDateTime(e.at)}</span> {e.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-1.5 text-[12.5px] text-pm-muted">Not synced. Posts to the ERP once approved and sent.</div>
              )}
            </section>
            <section>
              <SectionTitle>Attachments</SectionTitle>
              {po.attachments.length > 0 ? (
                <ul className="mt-1.5 space-y-1">
                  {po.attachments.map((a) => (
                    <li key={a} className="text-[12.5px] font-pm-mono">
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-1.5 text-[12.5px] text-pm-muted">None attached.</div>
              )}
            </section>
          </div>
        </div>

        <div className="lg:col-span-5 lg:overflow-y-auto px-6 lg:px-8 py-6 bg-pm-hover scrollbar-thin">
          <SectionTitle right={`${audit.length} entries`}>Audit trail</SectionTitle>
          <ol className="mt-3">
            {audit.map((e, i) => (
              <li key={e.id} className="relative flex gap-3 pb-4">
                {i < audit.length - 1 && <span className="absolute left-[11px] top-6 bottom-0 w-px bg-pm-border" />}
                <Avatar name={e.who} size={24} className="relative mt-0.5" />
                <div className="min-w-0">
                  <div className="text-[13px] leading-relaxed">{e.action}</div>
                  <div className="mt-0.5 text-[11.5px] text-pm-muted">
                    {e.who}, {fmtDateTime(e.at)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Modal>
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
    <Modal open={open} onClose={onClose}>
      <ModalHeader kicker="New purchase order" title="Raise a PO" subtitle={`Raised by ${actor.name}. Routing is decided by the ex GST total when you submit.`} onClose={onClose} />

      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8 lg:overflow-y-auto px-6 lg:px-8 py-6 lg:border-r border-pm-border scrollbar-thin">
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
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
            <Field label="Project" hint={proj ? `Project manager: ${proj.manager}` : undefined}>
              <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={selectClass + ' w-full'}>
                <option value="">Choose a project</option>
                {PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} {p.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <section className="mt-6">
            <SectionTitle>Line items</SectionTitle>
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-[1fr_4.5rem_7rem_7rem_3.5rem] gap-2 text-[11px] font-medium uppercase tracking-[0.04em] text-pm-muted">
                <span>Description</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Unit ex GST</span>
                <span className="text-right">Line ex GST</span>
                <span />
              </div>
              {lines.map((l) => (
                <div key={l.id} className="grid grid-cols-[1fr_4.5rem_7rem_7rem_3.5rem] gap-2 items-center">
                  <input value={l.description} onChange={(e) => setLine(l.id, { description: e.target.value })} placeholder="What is being bought" className={inputClass} />
                  <input type="number" min={0} step={1} value={l.qty} onChange={(e) => setLine(l.id, { qty: Number(e.target.value) })} className={inputClass + ' text-right'} />
                  <input type="number" min={0} step={0.01} value={l.unitPrice || ''} onChange={(e) => setLine(l.id, { unitPrice: Number(e.target.value) })} placeholder="0.00" className={inputClass + ' text-right'} />
                  <div className="text-right font-pm-mono text-[12.5px]">{aud(l.qty * l.unitPrice)}</div>
                  <Button variant="ghost" size="sm" onClick={() => setLines((ls) => (ls.length > 1 ? ls.filter((x) => x.id !== l.id) : ls))} aria-label="Remove line">
                    Del
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-2 -ml-3" onClick={() => setLines((ls) => [...ls, blankLine()])}>
              Add a line
            </Button>
            <div className="mt-5 ml-auto max-w-xs text-[12.5px] space-y-1">
              <div className="flex justify-between text-pm-muted">
                <span>Subtotal ex GST</span>
                <span className="font-pm-mono">{aud(totals.exGst)}</span>
              </div>
              <div className="flex justify-between text-pm-muted">
                <span>GST 10%</span>
                <span className="font-pm-mono">{aud(totals.gst)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-pm-border pt-1">
                <span>Total inc GST</span>
                <span className="font-pm-mono">{aud(totals.incGst)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 lg:overflow-y-auto px-6 lg:px-8 py-6 bg-pm-hover scrollbar-thin">
          <Card className="p-4">
            <Kicker>This PO will route to</Kicker>
            {proj ? (
              <ol className="mt-2 space-y-2 text-[13px]">
                {routeFor(totals.exGst, proj).map((a, i) => (
                  <li key={a.role} className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-pm-hover border border-pm-border text-[11px] font-semibold inline-flex items-center justify-center">{i + 1}</span>
                    <Person name={a.approver} />
                    <span className="text-pm-muted">{a.role.toLowerCase()}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-2 text-[12.5px] text-pm-muted">Choose a project to see the route.</div>
            )}
            <div className="mt-3 text-[12px] text-pm-muted">Threshold {aud(APPROVAL_THRESHOLD)} ex GST.</div>
          </Card>

          <section className="mt-5">
            <Kicker className="mb-1.5">Attachments</Kicker>
            <div className="border border-dashed border-pm-border-strong rounded-md p-6 text-center text-[12.5px] text-pm-muted bg-pm-surface">Drop quotes and supporting documents here. Placeholder in the demo.</div>
          </section>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary" disabled={!valid} onClick={() => submit(true)}>
              Submit for approval
            </Button>
            <Button disabled={!valid} onClick={() => submit(false)}>
              Save as draft
            </Button>
          </div>
          {!valid && <p className="mt-3 text-[12px] text-pm-muted">Choose a supplier and a project and enter at least one priced line.</p>}
        </div>
      </div>
    </Modal>
  )
}
