'use client'
import { useState } from 'react'
import { DEPARTMENTS, MODULES, PEOPLE, WORKSTREAMS, useDemo } from '../_lib/store'
import type { Priority, WorkType } from '../_lib/types'
import { Button, Field, Modal, ModalHeader, inputClass, selectClass, textareaClass } from './ui'

// The single intake. A new request always lands in Mapping.
export default function NewRequest({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { run, actor } = useDemo()
  const [title, setTitle] = useState('')
  const [module, setModule] = useState(MODULES[2])
  const [workstream, setWorkstream] = useState(WORKSTREAMS[0].id)
  const [department, setDepartment] = useState('')
  const [owner, setOwner] = useState(PEOPLE[1].name)
  const [priority, setPriority] = useState<Priority>('P2')
  const [workType, setWorkType] = useState<WorkType>('module')
  const [days, setDays] = useState(3)
  const [targetDate, setTargetDate] = useState('')
  const [outcome, setOutcome] = useState('')

  const valid = title.trim().length > 2 && outcome.trim().length > 0

  const submit = () => {
    run({ type: 'addBrief', title: title.trim(), module, workstream, department: department || undefined, owner, priority, workType, days, targetDate: targetDate || null, outcome: outcome.trim() })
    setTitle('')
    setOutcome('')
    setTargetDate('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <ModalHeader kicker="New request" title="Raise a request" subtitle={`Raised by ${actor.name}. It enters Mapping and waits for the change lead to rank it.`} onClose={onClose} />
      <div className="px-6 lg:px-8 py-6 overflow-y-auto">
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to exist" className={inputClass} autoFocus />
        </Field>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Field label="Workstream">
            <select value={workstream} onChange={(e) => setWorkstream(e.target.value)} className={selectClass + ' w-full'}>
              {WORKSTREAMS.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Department" hint="Optional tag.">
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass + ' w-full'}>
              <option value="">None</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Module">
            <select value={module} onChange={(e) => setModule(e.target.value)} className={selectClass + ' w-full'}>
              {MODULES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Owner (SME)">
            <select value={owner} onChange={(e) => setOwner(e.target.value)} className={selectClass + ' w-full'}>
              {PEOPLE.filter((p) => p.id !== 'ramsay').map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Priority">
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={selectClass + ' w-full'}>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </select>
          </Field>
          <Field label="Work type">
            <select value={workType} onChange={(e) => setWorkType(e.target.value as WorkType)} className={selectClass + ' w-full'}>
              <option value="module">Module</option>
              <option value="integration">Integration</option>
              <option value="hotfix">Hotfix</option>
            </select>
          </Field>
          <Field label="Days estimate">
            <input type="number" min={0.5} step={0.5} value={days} onChange={(e) => setDays(Number(e.target.value))} className={inputClass} />
          </Field>
          <Field label="Target date" hint="Optional. Shows on the calendar.">
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className={inputClass} />
          </Field>
        </div>
        <Field label="Business outcome" className="mt-4">
          <textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="What is true once this exists" className={textareaClass} />
        </Field>
        <div className="mt-6 flex gap-3">
          <Button variant="primary" disabled={!valid} onClick={submit}>
            Raise request
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
