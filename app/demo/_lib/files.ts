import type { Attachment, AttachmentKind } from './types'

// Front-end only file handling for the demo. Uploaded files are kept as
// object URLs in memory for the session; their metadata persists with the
// rest of the state, so after a reload the row remains but the bytes do not.

const urls = new Map<string, string>()

export function rememberFile(id: string, file: File) {
  urls.set(id, URL.createObjectURL(file))
}

export function fileUrl(a: Attachment): string | null {
  return a.url ?? urls.get(a.id) ?? null
}

export function kindOf(name: string): AttachmentKind {
  const ext = name.toLowerCase().split('.').pop() ?? ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'doc' || ext === 'docx') return 'docx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image'
  return 'file'
}

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

let seq = 0
export function newFileId(): string {
  seq += 1
  return `file-${Date.now().toString(36)}-${seq}`
}

export const ACCEPT = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp'
