import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, DEMO_HOME, DEMO_PATH, expectedToken, passwordMatches } from '../gate'

// Plain form POST from the entry page. Right password: set the cookie and go
// to the tracker. Wrong (or no password configured): back to the entry page
// with ?wrong=1.
export async function POST(req: NextRequest) {
  const form = await req.formData()
  const input = String(form.get('password') ?? '').trim()
  const token = expectedToken()

  if (!token || !passwordMatches(input)) {
    const back = new URL(DEMO_PATH, req.nextUrl)
    back.searchParams.set('wrong', '1')
    return NextResponse.redirect(back, 303)
  }

  const res = NextResponse.redirect(new URL(DEMO_HOME, req.nextUrl), 303)
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: DEMO_PATH,
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
