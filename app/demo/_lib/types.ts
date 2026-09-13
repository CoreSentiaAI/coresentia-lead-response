// Demo tenant data model. No database: the seed lives in seed.ts and state
// lives in the browser (see store.tsx). Everything here is fictional.

export const STAGES = [
  'Mapping',
  'Briefed in',
  'Locked',
  'Build',
  'Preview',
  'Testing',
  'Production',
  'Done',
] as const
export type Stage = (typeof STAGES)[number]

export type WorkType = 'module' | 'integration' | 'hotfix'
export type Priority = 'P1' | 'P2' | 'P3'
export type SignOff = 'not started' | 'awaiting' | 'signed off'

export type Person = { id: string; name: string; role: string }

// Workstreams are per-client configuration: the capability areas the build
// is organised around. Every brief belongs to exactly one.
export type Workstream = { id: string; name: string; goal: string; owner: string; tone: 'blue' | 'purple' | 'green' | 'orange' | 'teal' | 'amber' | 'red' | 'grey' }

export type Feedback = {
  id: string
  author: string
  text: string
  status: 'open' | 'addressed'
  at: string
}

export type LogEntry = { id: string; at: string; who: string; action: string }

export type AttachmentKind = 'pdf' | 'docx' | 'image' | 'file'

export type Attachment = {
  id: string
  name: string
  kind: AttachmentKind
  size: number
  uploadedBy: string
  at: string
  // Seeded files live under /public/demo and have a url. Files added in the
  // browser are held in memory for the session (see files.ts) and have none.
  url?: string
}

export type Brief = {
  id: string
  title: string
  module: string
  workstream: string
  department?: string
  owner: string
  priority: Priority
  workType: WorkType
  days: number
  signOff: SignOff
  signOffBy: string[]
  stage: Stage
  outcome: string
  currentState: string
  lockDate: string | null
  targetDate: string | null
  previewUrl: string
  readmeUrl: string
  internalOwner: string
  feedback: Feedback[]
  changeLog: LogEntry[]
  attachments: Attachment[]
}

export const PO_STATUSES = [
  'Draft',
  'Submitted',
  'Approved',
  'Sent to ERP',
  'Closed',
  'Rejected',
] as const
export type PoStatus = (typeof PO_STATUSES)[number]

export type PoLine = { id: string; description: string; qty: number; unitPrice: number }

export type ApprovalRole = 'Project manager' | 'Head of Finance'

export type Approval = {
  role: ApprovalRole
  approver: string
  decision: 'pending' | 'approved' | 'rejected'
  note: string
  at: string | null
}

export type AuditEntry = { id: string; at: string; who: string; action: string }

export type ErpSync = {
  synced: boolean
  at: string | null
  reference: string | null
  log: { at: string; text: string }[]
}

export type PurchaseOrder = {
  id: string
  number: string
  supplierId: string
  projectId: string
  lines: PoLine[]
  status: PoStatus
  raisedBy: string
  raisedAt: string
  updatedAt: string
  approvals: Approval[]
  erp: ErpSync
  attachments: string[]
  audit: AuditEntry[]
}

export type Supplier = { id: string; name: string; category: string }
export type Project = { id: string; code: string; name: string; manager: string }
