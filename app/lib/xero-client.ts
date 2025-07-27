import { createClient } from '@supabase/supabase-js'

export async function getXeroTokens() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
  
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'xero_tokens')
    .single()
  
  if (error) {
    console.error('Error fetching Xero tokens from database:', error)
    throw new Error('Failed to fetch Xero tokens from database')
  }
  
  if (!data?.value) {
    throw new Error('No Xero tokens found in database')
  }
  
  // Check if token expired and refresh if needed
  const tokens = data.value
  console.log('Token data retrieved, checking expiry...')
  
  // Handle expires_at which might be a timestamp or ISO string
  const expiresAt = tokens.expires_at ? new Date(tokens.expires_at) : new Date(0)
  const now = new Date()
  
  console.log('Token expires at:', expiresAt.toISOString())
  console.log('Current time:', now.toISOString())
  
  if (expiresAt < now) {
    console.log('Token expired, refreshing...')
    return await refreshXeroTokens(tokens.refresh_token)
  }
  
  console.log('Token still valid, returning access token')
  return tokens.access_token
}

async function refreshXeroTokens(refreshToken: string) {
  console.log('Refreshing Xero tokens...')
  
  if (!process.env.XERO_CLIENT_ID || !process.env.XERO_CLIENT_SECRET) {
    throw new Error('Xero client credentials not configured')
  }
  
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
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Failed to refresh Xero token:', response.status, errorText)
    throw new Error(`Failed to refresh Xero token: ${response.status}`)
  }
  
  const newTokens = await response.json()
  console.log('New tokens received, updating database...')
  
  // Calculate new expiry time (tokens usually expire in 30 minutes)
  const expiresIn = newTokens.expires_in || 1800 // Default to 30 minutes
  const expiresAt = new Date(Date.now() + (expiresIn * 1000))
  
  // Update stored tokens with expiry time
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
  
  const tokenData = {
    ...newTokens,
    expires_at: expiresAt.toISOString()
  }
  
  const { error } = await supabase
    .from('settings')
    .update({ 
      value: tokenData,
      updated_at: new Date().toISOString()
    })
    .eq('key', 'xero_tokens')
  
  if (error) {
    console.error('Failed to update tokens in database:', error)
    throw new Error('Failed to update tokens in database')
  }
  
  console.log('Tokens refreshed successfully')
  return newTokens.access_token
}

export async function createXeroQuote(quoteData: any) {
  console.log('Creating Xero quote with data:', quoteData)
  
  try {
    const accessToken = await getXeroTokens()
    console.log('Access token obtained')
    
    // Get tenant ID with error checking
    console.log('Fetching Xero connections...')
    const tenantResponse = await fetch('https://api.xero.com/connections', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!tenantResponse.ok) {
      const errorText = await tenantResponse.text()
      console.error('Failed to get Xero connections:', tenantResponse.status, errorText)
      throw new Error(`Failed to connect to Xero: ${tenantResponse.status}`)
    }
    
    const connections = await tenantResponse.json()
    console.log('Xero connections response:', JSON.stringify(connections, null, 2))
    
    if (!connections || !Array.isArray(connections) || connections.length === 0) {
      throw new Error('No Xero tenant connections found')
    }
    
    const tenantId = connections[0].tenantId
    console.log('Using tenant ID:', tenantId)
    
    // Create or find contact
    const contact = {
      Name: quoteData.companyName || quoteData.clientName || 'Unknown Client',
      EmailAddress: quoteData.email,
      ...(quoteData.phone && {
        Phones: [{
          PhoneType: 'DEFAULT',
          PhoneNumber: quoteData.phone
        }]
      })
    }
    
    console.log('Creating contact:', contact)
    
    const contactResponse = await fetch('https://api.xero.com/api.xro/2.0/Contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'xero-tenant-id': tenantId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Contacts: [contact] })
    })
    
    if (!contactResponse.ok) {
      const errorText = await contactResponse.text()
      console.error('Failed to create contact:', contactResponse.status, errorText)
      throw new Error(`Failed to create contact: ${contactResponse.status}`)
    }
    
    const contactResult = await contactResponse.json()
    console.log('Contact response:', JSON.stringify(contactResult, null, 2))
    
    if (!contactResult.Contacts || contactResult.Contacts.length === 0) {
      throw new Error('No contact returned from Xero')
    }
    
    const contactId = contactResult.Contacts[0].ContactID
    console.log('Contact created/found with ID:', contactId)
    
    // Create quote
    const quote = {
      Contact: { ContactID: contactId },
      Date: new Date().toISOString().split('T')[0],
      ExpiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      Status: 'DRAFT',
      Reference: quoteData.quoteNumber,
      LineAmountTypes: 'Exclusive',
      LineItems: [{
        Description: quoteData.description || 'AI-powered lead response system',
        Quantity: 1,
        UnitAmount: quoteData.amount || 0,
        AccountCode: '200' // Sales account - adjust as needed
      }]
    }
    
    console.log('Creating quote:', JSON.stringify(quote, null, 2))
    
    const quoteResponse = await fetch('https://api.xero.com/api.xro/2.0/Quotes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'xero-tenant-id': tenantId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Quotes: [quote] })
    })
    
    if (!quoteResponse.ok) {
      const errorText = await quoteResponse.text()
      console.error('Failed to create quote:', quoteResponse.status, errorText)
      throw new Error(`Failed to create quote: ${quoteResponse.status}`)
    }
    
    const quoteResult = await quoteResponse.json()
    console.log('Quote created successfully:', JSON.stringify(quoteResult, null, 2))
    
    return quoteResult
  } catch (error) {
    console.error('Error in createXeroQuote:', error)
    throw error
  }
}
