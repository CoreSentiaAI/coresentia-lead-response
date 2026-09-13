// Semantic colour lozenges for the demo. One tone per state; the same tone
// carries the same meaning everywhere (green is done or approved, red is a
// hotfix or a rejection).

import type { PoStatus, Priority, Stage, WorkType } from './types'

export type Tone = 'grey' | 'blue' | 'purple' | 'amber' | 'teal' | 'orange' | 'green' | 'red' | 'slate'

export const TONES: Record<Tone, { bg: string; fg: string; dot: string }> = {
  grey: { bg: '#eef1f4', fg: '#3f4a57', dot: '#8a94a3' },
  slate: { bg: '#e2e6eb', fg: '#2b3441', dot: '#5b6675' },
  blue: { bg: '#e8effc', fg: '#1e48b8', dot: '#2d5bd1' },
  purple: { bg: '#efeafb', fg: '#5636b5', dot: '#6f4bd8' },
  amber: { bg: '#fff3dc', fg: '#8a5300', dot: '#c77700' },
  teal: { bg: '#e0f4f4', fg: '#0b6666', dot: '#0f8a8a' },
  orange: { bg: '#fdebe0', fg: '#9a3f12', dot: '#d9642b' },
  green: { bg: '#e3f5ec', fg: '#166a42', dot: '#1e8e5a' },
  red: { bg: '#fce8e8', fg: '#9b2c2c', dot: '#c93b3b' },
}

export const STAGE_LABEL: Record<Stage, string> = {
  Mapping: 'Stage 1 of 8. Request raised, current state being mapped, waiting to be ranked.',
  'Briefed in': 'Stage 2 of 8. Brief submitted with the process map attached.',
  'Approved for build': 'Stage 3 of 8. Approved by the change lead. Scope is fixed. This is what gets built.',
  'In build': 'Stage 4 of 8. Being built. Nothing is added mid-build.',
  Preview: 'Stage 5 of 8. On a preview link for the business to click through.',
  Testing: 'Stage 6 of 8. Feedback captured against the brief. One iteration round.',
  Production: 'Stage 7 of 8. Live. Waiting on README, owner and sign-off.',
  Done: 'Stage 8 of 8. On production, signed off, documented, owned.',
}

export const STAGE_TONE: Record<Stage, Tone> = {
  Mapping: 'grey',
  'Briefed in': 'blue',
  'Approved for build': 'purple',
  'In build': 'amber',
  Preview: 'teal',
  Testing: 'orange',
  Production: 'green',
  Done: 'slate',
}

export const PRIORITY_TONE: Record<Priority, Tone> = { P1: 'red', P2: 'amber', P3: 'grey' }

export const PRIORITY_LABEL: Record<Priority, string> = {
  P1: 'Priority 1. Top priority, always built first.',
  P2: 'Priority 2. Next in line once P1 work is clear.',
  P3: 'Priority 3. Worth doing when there is room.',
}

export const WORK_TYPE_TONE: Record<WorkType, Tone> = { module: 'blue', integration: 'purple', hotfix: 'red' }

export const PO_STATUS_TONE: Record<PoStatus, Tone> = {
  Draft: 'grey',
  Submitted: 'blue',
  Approved: 'green',
  'Sent to ERP': 'teal',
  Closed: 'slate',
  Rejected: 'red',
}

export const DECISION_TONE = { pending: 'amber', approved: 'green', rejected: 'red' } as const

// Avatar colours, picked by name so the same person always gets the same one.
const AVATARS = ['#2d5bd1', '#6f4bd8', '#0f8a8a', '#1e8e5a', '#c77700', '#d9642b', '#9b2c2c', '#5b6675']
export function avatarColor(name: string): string {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return AVATARS[h % AVATARS.length]
}
export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')
}
