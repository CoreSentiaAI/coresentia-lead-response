// Password gate for the unlisted demo tenant. Same pattern as the proposal
// pages: the password lives in an env var (Vercel / .env.local), never in
// source, and the gate fails closed when it is unset.
//
//   DEMO_PASSWORD  the demo password
import { createHash, timingSafeEqual } from 'crypto'

export const COOKIE_NAME = 'cs-demo'
export const DEMO_PATH = '/demo'
export const DEMO_HOME = '/demo/tracker'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

// Cookie value is a hash bound to this path, not the password itself.
export function expectedToken(): string | null {
  const pw = process.env.DEMO_PASSWORD
  if (!pw) return null
  return sha256(`${DEMO_PATH}:${pw}`)
}

export function passwordMatches(input: string): boolean {
  const pw = process.env.DEMO_PASSWORD
  if (!pw) return false
  return timingSafeEqual(Buffer.from(sha256(input)), Buffer.from(sha256(pw)))
}

export function isOpen(cookieValue: string | undefined): boolean {
  const token = expectedToken()
  return token !== null && cookieValue === token
}
