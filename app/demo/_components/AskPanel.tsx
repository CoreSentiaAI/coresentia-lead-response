'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useDemo } from '../_lib/store'
import { SUGGESTIONS, answer } from '../_lib/ask'
import type { Brief } from '../_lib/types'
import { STAGE_TONE } from '../_lib/tones'
import { Button, Chip, inputClass } from './ui'
import { Icon } from './icons'

type Msg = { role: 'you' | 'tracker'; text: string; briefs?: Brief[] }

// Ask the tracker a question instead of reading through the briefs.
export default function AskPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, actor } = useDemo()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [q, setQ] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  if (!open) return null

  const ask = (text: string) => {
    const question = text.trim()
    if (!question) return
    const a = answer(question, { briefs: state.briefs, pos: state.pos, actor: actor.name, now: new Date() })
    setMsgs((m) => [...m, { role: 'you', text: question }, { role: 'tracker', text: a.text, briefs: a.briefs }])
    setQ('')
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(16,24,40,0.18)]" />
      <div className="relative h-full w-full max-w-[460px] bg-pm-surface border-l border-pm-border shadow-[0_0_60px_rgba(16,24,40,0.2)] flex flex-col">
        <div className="px-5 py-4 border-b border-pm-border flex items-center gap-3">
          <span className="h-8 w-8 rounded-md bg-pm-primary-soft text-pm-primary flex items-center justify-center">
            <Icon name="spark" size={16} />
          </span>
          <div>
            <div className="text-[15px] font-semibold">Ask the tracker</div>
            <div className="text-[12px] text-pm-muted">Answers come from the briefs, with the source shown.</div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto" aria-label="Close">
            <Icon name="close" size={14} />
          </Button>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">
          {msgs.length === 0 && (
            <div>
              <p className="text-[13px] text-pm-muted">Try one of these, or type your own.</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)} className="h-8 px-3 rounded-full border border-pm-border text-[12.5px] hover:bg-pm-hover hover:border-pm-border-strong transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((m, i) =>
            m.role === 'you' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-br-sm bg-pm-primary text-white px-3.5 py-2 text-[13px] leading-relaxed">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="flex gap-2.5">
                <span className="h-7 w-7 shrink-0 rounded-md bg-pm-primary-soft text-pm-primary flex items-center justify-center mt-0.5">
                  <Icon name="spark" size={14} />
                </span>
                <div className="min-w-0">
                  <div className="rounded-lg rounded-tl-sm bg-pm-hover border border-pm-border px-3.5 py-2 text-[13px] leading-relaxed">{m.text}</div>
                  {m.briefs && m.briefs.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.briefs.map((b) => (
                        <Link key={b.id} href={`/demo/tracker?ws=${b.workstream}&brief=${b.id}`} onClick={onClose} className="inline-flex items-center gap-1.5 h-7 pl-1.5 pr-2.5 rounded-full border border-pm-border bg-pm-surface text-[12px] hover:border-pm-primary hover:text-pm-primary transition-colors">
                          <Chip tone={STAGE_TONE[b.stage]} dot className="h-[18px] text-[10.5px] px-1.5">
                            {b.stage}
                          </Chip>
                          <span className="truncate max-w-[220px]">{b.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        <form
          className="px-5 py-4 border-t border-pm-border flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            ask(q)
          }}
        >
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about the work" className={inputClass} autoFocus />
          <Button type="submit" variant="primary" disabled={!q.trim()}>
            Ask
          </Button>
        </form>
        <div className="px-5 pb-3 text-[11.5px] text-pm-muted">Demo answers come from the seed data. In the platform build this runs over the live data with an AI model.</div>
      </div>
    </div>
  )
}
