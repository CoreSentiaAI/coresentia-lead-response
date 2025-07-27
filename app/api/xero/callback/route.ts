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
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Failed to exchange code for tokens:', tokenResponse.status, errorText)
      return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?error=token_exchange_failed')
    }
    
    const tokens = await tokenResponse.json()
    console.log('Tokens received from Xero:', {
      has_access_token: !!tokens.access_token,
      has_refresh_token: !!tokens.refresh_token,
      expires_in: tokens.expires_in
    })
    
    // Calculate expiry time
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000))
    
    // Create structured token data
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      token_type: tokens.token_type,
      expires_at: expiresAt.toISOString(),
      id_token: tokens.id_token,
      scope: tokens.scope
    }
    
    // Store tokens in Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    const { error } = await supabase
      .from('settings')
      .upsert({
        key: 'xero_tokens',
        value: tokenData,
        updated_at: new Date().toISOString()
      })
    
    if (error) {
      console.error('Failed to save Xero tokens:', error)
      return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?error=token_save_failed')
    }
    
    console.log('Xero tokens saved successfully with expiry:', expiresAt.toISOString())
    
    return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?xero=connected')
  } catch (error) {
    console.error('Xero OAuth error:', error)
    return NextResponse.redirect('https://ivy.coresentia.com/chat/homepage-visitor?error=oauth_failed')
  }
}
