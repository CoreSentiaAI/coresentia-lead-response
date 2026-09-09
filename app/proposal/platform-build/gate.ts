// Password gate for the unlisted platform-build proposal page.
// Everything confidential lives in env vars (Vercel / .env.local), never in
// source - this repo is public. With the password unset the gate fails closed.
//
//   PROPOSAL_PB_PASSWORD  the password
//   PROPOSAL_PB_CLIENT    client's business name, e.g. "Acme Group"
//   PROPOSAL_PB_CONTACT   first name of the person the proposal is for
//   PROPOSAL_PB_ERP       the client's finance system, e.g. "their ERP"
//   PROPOSAL_PB_RATE      day rate in whole AUD ex GST, e.g. "1500"
import { createHash, timingSafeEqual } from 'crypto'

export const COOKIE_NAME = 'cs-proposal-pb'
export const PROPOSAL_PATH = '/proposal/platform-build'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

// Cookie value is a hash bound to this page, not the password itself.
export function expectedToken(): string | null {
  const pw = process.env.PROPOSAL_PB_PASSWORD
  if (!pw) return null
  return sha256(`${PROPOSAL_PATH}:${pw}`)
}

export function passwordMatches(input: string): boolean {
  const pw = process.env.PROPOSAL_PB_PASSWORD
  if (!pw) return false
  return timingSafeEqual(Buffer.from(sha256(input)), Buffer.from(sha256(pw)))
}

// Confidential values with safe fallbacks so the page renders generically
// when a variable is missing (local preview, or before Vercel is set up).
export function proposalVars() {
  const rateRaw = Number.parseInt(process.env.PROPOSAL_PB_RATE ?? '', 10)
  return {
    client: process.env.PROPOSAL_PB_CLIENT?.trim() || 'your business',
    contact: process.env.PROPOSAL_PB_CONTACT?.trim() || '',
    erp: process.env.PROPOSAL_PB_ERP?.trim() || 'your ERP',
    rate: Number.isFinite(rateRaw) && rateRaw > 0 ? rateRaw : null,
  }
}
