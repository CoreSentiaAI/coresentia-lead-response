// Twilio SMS helper functions

interface SendSMSParams {
  to: string
  body: string
}

interface SendSMSResponse {
  success: boolean
  messageSid?: string
  error?: string
}

/**
 * Send an SMS via Twilio API
 */
export async function sendSMS({ to, body }: SendSMSParams): Promise<SendSMSResponse> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !fromNumber) {
    console.error('Twilio credentials not configured')
    return {
      success: false,
      error: 'Twilio credentials not configured'
    }
  }

  try {
    // Twilio API endpoint
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`

    // Prepare form data
    const params = new URLSearchParams()
    params.append('To', to)
    params.append('From', fromNumber)
    params.append('Body', body)

    // Make request with Basic Auth
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Twilio API error:', response.status, errorText)
      return {
        success: false,
        error: `Twilio API error: ${response.status}`
      }
    }

    const data = await response.json()
    console.log('SMS sent successfully:', data.sid)

    return {
      success: true,
      messageSid: data.sid
    }
  } catch (error) {
    console.error('Error sending SMS:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Format phone number to E.164 format (+61...)
 * Handles Australian numbers
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')

  // If starts with 0, replace with 61
  if (cleaned.startsWith('0')) {
    cleaned = '61' + cleaned.substring(1)
  }

  // If doesn't start with country code, add 61
  if (!cleaned.startsWith('61')) {
    cleaned = '61' + cleaned
  }

  return '+' + cleaned
}
