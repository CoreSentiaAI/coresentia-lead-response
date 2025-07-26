import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?error=no_code')
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://identity.xero.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.XERO_CLIENT_ID}:${process.env.XERO_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://ivy.coresentia.com/api/xero/callback'
      })
    })

    const tokens = await tokenResponse.json()
    
    // Store tokens in Supabase (we'll create settings table next)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    await supabase
      .from('settings')
      .upsert({
        key: 'xero_tokens',
        value: tokens,
        updated_at: new Date().toISOString()
      })

    return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?xero=connected')
  } catch (error) {
    console.error('Xero OAuth error:', error)
    return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?error=oauth_failed')
  }
}
