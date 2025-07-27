import { createClient } from '@supabase/supabase-js'

export async function getXeroTokens() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
  
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'xero_tokens')
    .single()
  
  if (!data?.value) throw new Error('No Xero tokens found')
  
  // Check if token expired and refresh if needed
  const tokens = data.value
  const expiresAt = new Date(tokens.expires_at || 0)
  
  if (expiresAt < new Date()) {
    // Token expired, refresh it
    return await refreshXeroTokens(tokens.refresh_token)
  }
  
  return tokens.access_token
}

async function refreshXeroTokens(refreshToken: string) {
  const response = await fetch('https://identity.xero.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.XERO_CLIENT_ID}:${process.env.XERO_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })
  
  const newTokens = await response.json()
  
  // Update stored tokens
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
  
  await supabase
    .from('settings')
    .update({ 
      value: newTokens,
      updated_at: new Date().toISOString()
    })
    .eq('key', 'xero_tokens')
  
  return newTokens.access_token
}

export async function createXeroQuote(quoteData: any) {
  const accessToken = await getXeroTokens()
  
  // Get tenant ID
  const tenantResponse = await fetch('https://api.xero.com/connections', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  const connections = await tenantResponse.json()
  const tenantId = connections[0].tenantId
  
  // Create contact first (or find existing)
  const contact = {
    Name: quoteData.companyName || quoteData.clientName,
    EmailAddress: quoteData.email,
    Phones: [{
      PhoneType: 'DEFAULT',
      PhoneNumber: quoteData.phone
    }]
  }
  
  const contactResponse = await fetch('https://api.xero.com/api.xro/2.0/Contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Contacts: [contact] })
  })
  const contactResult = await contactResponse.json()
  const contactId = contactResult.Contacts[0].ContactID
  
  // Create quote
  const quote = {
    Contact: { ContactID: contactId },
    Date: new Date().toISOString().split('T')[0],
    ExpiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    Status: 'DRAFT',
    Reference: quoteData.quoteNumber,
    LineAmountTypes: 'Exclusive',
    LineItems: [{
      Description: quoteData.description,
      Quantity: 1,
      UnitAmount: quoteData.amount,
      AccountCode: '200' // Sales account - adjust as needed
    }]
  }
  
  const quoteResponse = await fetch('https://api.xero.com/api.xro/2.0/Quotes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'xero-tenant-id': tenantId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Quotes: [quote] })
  })
  
  return await quoteResponse.json()
}
