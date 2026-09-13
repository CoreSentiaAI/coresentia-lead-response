'use client'
import { useEffect, useRef, useState } from 'react'
import { WORKSTREAMS, useDemo } from '../_lib/store'
import { STAGES, type Attachment, type Brief, type Stage } from '../_lib/types'
import { ACCEPT, fmtBytes, kindOf, newFileId, rememberFile } from '../_lib/files'
import FileViewer, { KindTile } from './FileViewer'
import { fmtDate, fmtDateTime } from '../_lib/format'
import { DECISION_TONE, PRIORITY_LABEL, PRIORITY_TONE, STAGE_LABEL, STAGE_TONE } from '../_lib/tones'
import { Avatar, Button, Card, Chip, Field, Modal, ModalHeader, Person, SectionTitle, inputClass, selectClass } from './ui'

// Brief detail. Left: what it is, the actions, test feedback. Right: the change log.
export default function BriefDetail({ brief, onClose }: { brief: Brief | null; onClose: () => void }) {
  const { run, actor } = useDemo()
  const [target, setTarget] = useState<Stage>('Mapping')
  const [url, setUrl] = useState('')
  const [feedback, setFeedback] = useState('')
  const [viewing, setViewing] = useState<Attachment | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | File[]) => {
    if (!brief) return
    for (const file of Array.from(files)) {
      const id = newFileId()
      rememberFile(id, file)
      run({ type: 'addAttachment', id: brief.id, attachment: { id, name: file.name, kind: kindOf(file.name), size: file.size } })
    }
  }

  useEffect(() => {
    if (!brief) return
    const next = STAGES[Math.min(STAGES.indexOf(brief.stage) + 1, STAGES.length - 1)]
    setTarget(next)
    setUrl(brief.previewUrl)
    setFeedback('')
  }, [brief?.id, brief?.stage, brief?.previewUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!brief) return <Modal open={false} onClose={onClose}>{null}</Modal>

  const log = [...brief.changeLog].sort((a, b) => (a.at < b.at ? 1 : -1))
  const canSignOff = brief.stage === 'Production' && brief.signOff !== 'signed off'
  const openFeedback = brief.feedback.filter((f) => f.status === 'open').length
  const ws = WORKSTREAMS.find((w) => w.id === brief.workstream)

  return (
    <Modal open onClose={onClose}>
      <ModalHeader
        kicker="Brief"
        title={brief.title}
        onClose={onClose}
        chips={
          <>
            <Chip tone={STAGE_TONE[brief.stage]} dot tip={STAGE_LABEL[brief.stage]}>
              {brief.stage}
            </Chip>
            <Chip tone={PRIORITY_TONE[brief.priority]} tip={PRIORITY_LABEL[brief.priority]}>
              {brief.priority}
            </Chip>
          </>
        }
      />

      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7 lg:overflow-y-auto px-6 lg:px-8 py-6 lg:border-r border-pm-border scrollbar-thin">
          <Card className="p-4 flex flex-wrap items-end gap-3">
            <Field label="Move to">
              <select value={target} onChange={(e) => setTarget(e.target.value as Stage)} className={selectClass + ' min-w-[11rem]'}>
                {STAGES.map((s) => (
                  <option key={s} value={s} disabled={s === brief.stage}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Button variant="primary" onClick={() => run({ type: 'moveBrief', id: brief.id, stage: target })} disabled={target === brief.stage}>
              Move
            </Button>
            {canSignOff && <Button onClick={() => run({ type: 'signOffBrief', id: brief.id })}>Sign off as {actor.name}</Button>}
            <span className="w-full text-[12px] text-pm-muted">Every move writes to the change log as {actor.name}.</span>
          </Card>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <section>
              <SectionTitle>Business outcome</SectionTitle>
              <p className="mt-1.5 text-[13.5px] leading-relaxed">{brief.outcome}</p>
            </section>
            <section>
              <SectionTitle>Current state</SectionTitle>
              <p className="mt-1.5 text-[13.5px] leading-relaxed">{brief.currentState || 'Not mapped yet.'}</p>
            </section>
          </div>

          <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            <Field label="Workstream">
              <div>{ws ? ws.name : brief.workstream}</div>
              {ws && <div className="mt-0.5 text-[12px] text-pm-muted">{ws.goal}</div>}
            </Field>
            <Field label="Department">
              <div>{brief.department ?? 'Not tagged'}</div>
            </Field>
            <Field label="Module">
              <div>{brief.module}</div>
            </Field>
            <Field label="Work type">
              <div className="capitalize">{brief.workType}</div>
            </Field>
            <Field label="Estimate">
              <div>{brief.days} {brief.days === 1 ? 'day' : 'days'}</div>
            </Field>
            <Field label="Brief owner">
              <Person name={brief.owner} />
            </Field>
            <Field label="Business SMEs" className="sm:col-span-2 md:col-span-2">
              {brief.smes.length > 0 ? (
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {brief.smes.map((n) => (
                    <Person key={n} name={n} />
                  ))}
                </div>
              ) : (
                <span className="text-pm-muted">None yet</span>
              )}
            </Field>
            <Field label="Sign-off">
              <div>
                {brief.signOff === 'signed off' ? 'Signed off' : brief.signOff === 'awaiting' ? 'Awaiting' : 'Not started'}
                {brief.signOffBy.length > 0 ? `, by ${brief.signOffBy.join(' and ')}` : ''}
              </div>
            </Field>
            <Field label="Lock date">
              <div>{brief.lockDate ? fmtDate(brief.lockDate) : brief.workType === 'hotfix' ? 'Hotfix path, no lock' : 'Not locked'}</div>
            </Field>
            <Field label="Target date">
              <div>{brief.targetDate ? fmtDate(brief.targetDate) : 'Not set'}</div>
            </Field>
            <Field label="README">
              {brief.readmeUrl ? (
                <a href={brief.readmeUrl} className="font-medium text-pm-primary hover:underline underline-offset-4">
                  Module README
                </a>
              ) : (
                <span className="text-pm-muted">Not yet written</span>
              )}
            </Field>
            <Field label="Preview URL" className="sm:col-span-2 md:col-span-3">
              <div className="flex gap-2 max-w-xl">
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" className={inputClass} />
                <Button onClick={() => run({ type: 'setPreviewUrl', id: brief.id, url: url.trim() })} disabled={url.trim() === brief.previewUrl}>
                  Save
                </Button>
              </div>
              {brief.previewUrl && (
                <a href={brief.previewUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[12.5px] font-medium text-pm-primary hover:underline underline-offset-4">
                  Open preview
                </a>
              )}
            </Field>
          </section>

          <section className="mt-8">
            <SectionTitle right={`${brief.attachments.length} ${brief.attachments.length === 1 ? 'file' : 'files'}`}>Attachments</SectionTitle>
            <ul className="mt-2 divide-y divide-pm-border border-t border-b border-pm-border">
              {brief.attachments.length === 0 && <li className="py-3 text-[12.5px] text-pm-muted">No files yet. Process maps, quotes, screenshots and the brief itself go here.</li>}
              {brief.attachments.map((a) => (
                <li key={a.id} className="py-2.5 flex items-center gap-3">
                  <button type="button" onClick={() => setViewing(a)} className="flex items-center gap-3 min-w-0 flex-1 text-left group">
                    <KindTile kind={a.kind} />
                    <span className="min-w-0">
                      <span className="block text-[13px] font-medium truncate group-hover:text-pm-primary">{a.name}</span>
                      <span className="block text-[11.5px] text-pm-muted">
                        {fmtBytes(a.size)}, {a.uploadedBy}, {fmtDateTime(a.at)}
                      </span>
                    </span>
                  </button>
                  <Button size="sm" variant="ghost" onClick={() => setViewing(a)}>
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => run({ type: 'removeAttachment', id: brief.id, attachmentId: a.id })} aria-label={`Remove ${a.name}`}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                addFiles(e.dataTransfer.files)
              }}
              className={`mt-3 rounded-md border border-dashed px-4 py-4 text-center transition-colors ${dragging ? 'border-pm-primary bg-pm-primary-soft' : 'border-pm-border-strong bg-pm-hover'}`}
            >
              <input ref={fileInput} type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => e.target.files && addFiles(e.target.files)} data-testid="attachment-input" />
              <div className="text-[13px]">
                Drop files here, or{' '}
                <button type="button" onClick={() => fileInput.current?.click()} className="font-medium text-pm-primary hover:underline underline-offset-4">
                  choose files
                </button>
              </div>
              <div className="mt-1 text-[11.5px] text-pm-muted">PDF, Word, PNG, JPEG. Kept in this browser for the demo.</div>
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle right={`${openFeedback} open`}>Test feedback</SectionTitle>
            <ul className="mt-2 divide-y divide-pm-border border-t border-b border-pm-border">
              {brief.feedback.length === 0 && <li className="py-3 text-[12.5px] text-pm-muted">No feedback yet. It goes here, never in chat.</li>}
              {brief.feedback.map((f) => (
                <li key={f.id} className="py-3 flex items-start gap-3">
                  <Avatar name={f.author} size={24} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-relaxed">{f.text}</div>
                    <div className="mt-0.5 text-[11.5px] text-pm-muted">
                      {f.author}, {fmtDateTime(f.at)}
                    </div>
                  </div>
                  <button type="button" onClick={() => run({ type: 'toggleFeedback', id: brief.id, feedbackId: f.id })} className="shrink-0" title="Toggle status">
                    <Chip tone={f.status === 'addressed' ? DECISION_TONE.approved : 'amber'} dot>
                      {f.status}
                    </Chip>
                  </button>
                </li>
              ))}
            </ul>
            <form
              className="mt-3 flex gap-2 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault()
                const text = feedback.trim()
                if (!text) return
                run({ type: 'addFeedback', id: brief.id, text })
                setFeedback('')
              }}
            >
              <input value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder={`Feedback as ${actor.name}`} className={inputClass} />
              <Button type="submit" disabled={!feedback.trim()}>
                Add
              </Button>
            </form>
          </section>
        </div>

        <div className="lg:col-span-5 lg:overflow-y-auto px-6 lg:px-8 py-6 bg-pm-hover scrollbar-thin">
          <SectionTitle right={`${log.length} entries`}>Change log</SectionTitle>
          <ol className="mt-3">
            {log.map((e, i) => (
              <li key={e.id} className="relative flex gap-3 pb-4">
                {i < log.length - 1 && <span className="absolute left-[11px] top-6 bottom-0 w-px bg-pm-border" />}
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
      <FileViewer attachment={viewing} onClose={() => setViewing(null)} />
    </Modal>
  )
}
