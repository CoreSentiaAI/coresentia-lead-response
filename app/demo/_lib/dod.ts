import type { Brief } from './types'

// Definition of done. A brief is Complete when every line is true.
export type DodItem = { key: string; label: string; ok: boolean; manual?: 'readme' | 'tests'; source?: string }

export function dod(b: Brief): DodItem[] {
  return [
    { key: 'live', label: 'On production', ok: b.stage === 'Production' || b.stage === 'Complete', source: 'from the stage' },
    { key: 'signoff', label: 'Signed off by the business SMEs', ok: b.signOff === 'signed off', source: 'from the SME sign-off' },
    { key: 'readme', label: 'Module README written', ok: b.done.readme || Boolean(b.readmeUrl), manual: 'readme' },
    { key: 'tests', label: 'Tests on every cross-module path', ok: b.done.tests, manual: 'tests' },
    { key: 'smes', label: 'Business SMEs named', ok: b.smes.length > 0, source: 'from the brief' },
    { key: 'trail', label: 'Audit trail from brief to production', ok: b.changeLog.length > 0, source: 'from the audit trail' },
  ]
}

export const dodComplete = (b: Brief) => dod(b).every((i) => i.ok)
export const dodCount = (b: Brief) => {
  const items = dod(b)
  return { done: items.filter((i) => i.ok).length, total: items.length }
}
