'use client'
import { useEffect, useState } from 'react'
import { useDemo } from '../_lib/store'
import { STAGES, type Brief, type Stage } from '../_lib/types'
import { fmtDate, fmtDateTime } from '../_lib/format'
import { Field, Label, SlideOver, Tag, btnLink, btnPrimary, btnSecondary, inputClass, selectClass } from './ui'
import { WorkTypeTag } from './TrackerBoard'

export default function BriefDetail({ brief, onClose }: { brief: Brief | null; onClose: () => void }) {
  const { run, actor } = useDemo()
  const [target, setTarget] = useState<Stage>('Mapping')
  const [url, setUrl] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!brief) return
    const next = STAGES[Math.min(STAGES.indexOf(brief.stage) + 1, STAGES.length - 1)]
    setTarget(next)
    setUrl(brief.previewUrl)
    setFeedback('')
  }, [brief?.id, brief?.stage, brief?.previewUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!brief) return <SlideOver open={false} onClose={onClose}>{null}</SlideOver>

  const log = [...brief.changeLog].sort((a, b) => (a.at < b.at ? 1 : -1))
  const canSignOff = brief.stage === 'Production' && brief.signOff !== 'signed off'

  return (
    <SlideOver open onClose={onClose}>
      <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em]">{brief.module}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display leading-tight">{brief.title}</h2>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Tag tone="accent">{brief.stage}</Tag>
        <WorkTypeTag type={brief.workType} />
        <Tag>{brief.priority}</Tag>
        <Tag>{brief.days} days</Tag>
        <Tag tone={brief.signOff === 'signed off' ? 'fill' : 'line'}>
          {brief.signOff === 'signed off' ? 'Signed off' : brief.signOff === 'awaiting' ? 'Awaiting sign-off' : 'Sign-off pending'}
        </Tag>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-end gap-3 border border-line-soft rounded-sm p-4 bg-surface-card">
        <Field label="Move to">
          <select value={target} onChange={(e) => setTarget(e.target.value as Stage)} className={selectClass + ' min-w-[11rem]'}>
            {STAGES.map((s) => (
              <option key={s} value={s} disabled={s === brief.stage}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <button type="button" onClick={() => run({ type: 'moveBrief', id: brief.id, stage: target })} disabled={target === brief.stage} className={btnPrimary}>
          Move
        </button>
        {canSignOff && (
          <button type="button" onClick={() => run({ type: 'signOffBrief', id: brief.id })} className={btnSecondary}>
            Sign off as {actor.name}
          </button>
        )}
        <span className="font-mono text-[0.62rem] w-full">Every move writes to the change log as {actor.name}.</span>
      </div>

      <section className="mt-8">
        <Label className="mb-2">Business outcome</Label>
        <p className="text-base leading-relaxed">{brief.outcome}</p>
      </section>

      <section className="mt-6">
        <Label className="mb-2">Current state</Label>
        <p className="text-base leading-relaxed">{brief.currentState}</p>
      </section>

      <section className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
        <Field label="Owner (SME)">
          <div className="text-sm">{brief.owner}</div>
        </Field>
        <Field label="Internal owner">
          <div className="text-sm">{brief.internalOwner || 'Not yet named'}</div>
        </Field>
        <Field label="Lock date">
          <div className="text-sm">{brief.lockDate ? fmtDate(brief.lockDate) : brief.workType === 'hotfix' ? 'Hotfix path, no lock' : 'Not locked'}</div>
        </Field>
        <Field label="Sign-off by">
          <div className="text-sm">{brief.signOffBy.join(', ') || 'Not set'}</div>
        </Field>
        <Field label="README">
          {brief.readmeUrl ? (
            <a href={brief.readmeUrl} className={btnLink}>
              Module README
            </a>
          ) : (
            <div className="text-sm">Not yet written</div>
          )}
        </Field>
        <Field label="Preview URL">
          <div className="flex gap-2">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" className={inputClass} />
            <button type="button" onClick={() => run({ type: 'setPreviewUrl', id: brief.id, url: url.trim() })} disabled={url.trim() === brief.previewUrl} className={btnSecondary + ' py-2'}>
              Save
            </button>
          </div>
          {brief.previewUrl && (
            <a href={brief.previewUrl} target={brief.previewUrl.startsWith('/') ? undefined : '_blank'} rel="noreferrer" className={btnLink + ' mt-2 inline-block'}>
              Open preview
            </a>
          )}
        </Field>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <Label>Test feedback</Label>
          <span className="font-mono text-[0.62rem]">{brief.feedback.filter((f) => f.status === 'open').length} open</span>
        </div>
        <ul className="mt-3 divide-y divide-line-soft border-t border-b border-line-soft">
          {brief.feedback.length === 0 && <li className="py-3 font-mono text-xs">No feedback yet. It goes here, never in chat.</li>}
          {brief.feedback.map((f) => (
            <li key={f.id} className="py-3 flex items-start gap-4">
              <div className="flex-1">
                <div className="text-sm leading-relaxed">{f.text}</div>
                <div className="mt-1 font-mono text-[0.62rem]">
                  {f.author}, {fmtDateTime(f.at)}
                </div>
              </div>
              <button type="button" onClick={() => run({ type: 'toggleFeedback', id: brief.id, feedbackId: f.id })} className="shrink-0">
                <Tag tone={f.status === 'addressed' ? 'fill' : 'line'}>{f.status}</Tag>
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const text = feedback.trim()
            if (!text) return
            run({ type: 'addFeedback', id: brief.id, text })
            setFeedback('')
          }}
        >
          <input value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder={`Feedback as ${actor.name}`} className={inputClass} />
          <button type="submit" disabled={!feedback.trim()} className={btnSecondary + ' py-2'}>
            Add
          </button>
        </form>
      </section>

      <section className="mt-10">
        <Label>Change log</Label>
        <ol className="mt-3 border-t border-line-soft">
          {log.map((e) => (
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
