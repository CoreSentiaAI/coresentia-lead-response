import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, PROPOSAL_PATH, expectedToken, passwordMatches } from '../gate'

// Plain form POST from the gate. Right password: set the cookie, back to the
// page. Wrong (or no password configured): back to the page with ?wrong=1.
export async function POST(req: NextRequest) {
  const form = await req.formData()
  const input = String(form.get('password') ?? '').trim()
  const token = expectedToken()
  const target = new URL(PROPOSAL_PATH, req.nextUrl)

  if (!token || !passwordMatches(input)) {
    target.searchParams.set('wrong', '1')
    return NextResponse.redirect(target, 303)
  }

  const res = NextResponse.redirect(target, 303)
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/proposal',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
