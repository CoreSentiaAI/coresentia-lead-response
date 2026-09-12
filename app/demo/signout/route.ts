import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, DEMO_PATH } from '../gate'

// Clears the demo cookie and returns to the entry page.
export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL(DEMO_PATH, req.nextUrl), 303)
  res.cookies.set(COOKIE_NAME, '', { path: DEMO_PATH, maxAge: 0 })
  return res
}
