// Formatting pinned to Brisbane so server and client render the same string.

const TZ = 'Australia/Brisbane'

const dateFmt = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TZ,
})

const dateTimeFmt = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: TZ,
})

const audFmt = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const fmtDate = (iso: string) => dateFmt.format(new Date(iso))
export const fmtDateTime = (iso: string) => dateTimeFmt.format(new Date(iso))
export const aud = (n: number) => audFmt.format(n)

export const GST_RATE = 0.1

export function lineTotals(lines: { qty: number; unitPrice: number }[]) {
  const exGst = lines.reduce((sum, l) => sum + (l.qty || 0) * (l.unitPrice || 0), 0)
  const gst = Math.round(exGst * GST_RATE * 100) / 100
  return { exGst, gst, incGst: exGst + gst }
}

let counter = 0
export function newId(prefix: string) {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}-${counter}`
}
