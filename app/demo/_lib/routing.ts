import type { Approval, Project } from './types'

// The routing rule shown on screen. Threshold is ex GST.
export const APPROVAL_THRESHOLD = 25000
export const HEAD_OF_FINANCE = 'Helen Marsh'

export const ROUTING_RULE = [
  `Under $${APPROVAL_THRESHOLD.toLocaleString('en-AU')} ex GST: the project manager approves.`,
  `$${APPROVAL_THRESHOLD.toLocaleString('en-AU')} ex GST and over: the project manager, then the Head of Finance.`,
]

export function routeFor(exGst: number, project: Project): Approval[] {
  const pm: Approval = {
    role: 'Project manager',
    approver: project.manager,
    decision: 'pending',
    note: '',
    at: null,
  }
  if (exGst < APPROVAL_THRESHOLD) return [pm]
  return [
    pm,
    { role: 'Head of Finance', approver: HEAD_OF_FINANCE, decision: 'pending', note: '', at: null },
  ]
}

export function routeLabel(exGst: number): string {
  return exGst < APPROVAL_THRESHOLD
    ? 'Single approval: project manager'
    : 'Two approvals: project manager, then Head of Finance'
}
