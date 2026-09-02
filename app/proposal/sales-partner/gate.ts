// Password gate for the unlisted proposal page.
// The password lives in PROPOSAL_PASSWORD (Vercel env / .env.local), never in
// source - this repo is public. With the variable unset the gate fails closed.
import { createHash, timingSafeEqual } from 'crypto'

export const COOKIE_NAME = 'cs-proposal-sp'
export const PROPOSAL_PATH = '/proposal/sales-partner'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

// Cookie value is a hash bound to this page, not the password itself.
export function expectedToken(): string | null {
  const pw = process.env.PROPOSAL_PASSWORD
  if (!pw) return null
  return sha256(`${PROPOSAL_PATH}:${pw}`)
}

export function passwordMatches(input: string): boolean {
  const pw = process.env.PROPOSAL_PASSWORD
  if (!pw) return false
  return timingSafeEqual(Buffer.from(sha256(input)), Buffer.from(sha256(pw)))
}
