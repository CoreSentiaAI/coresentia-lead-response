// CoreSentia notification system
// Sends SMS and email alerts to the CoreSentia team

import { sendSMS } from './twilio'

// Your contact details for notifications
const ADMIN_PHONE = process.env.ADMIN_PHONE || '+61467723694' // Your phone number
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@coresentia.com'

interface NotificationData {
  type: 'human_handoff' | 'quote_request' | 'new_lead' | 'high_value'
  leadName: string
  leadEmail?: string
  leadPhone?: string
  leadSource?: string
  packageType?: string
  conversationSummary?: string
  urgency?: 'high' | 'normal'
}

/**
 * Send notification to CoreSentia admin
 * Currently SMS only - email to be added
 */
export async function notifyAdmin(data: NotificationData): Promise<{ success: boolean; error?: string }> {
  try {
    // Format SMS message based on notification type
    let smsBody = ''

    switch (data.type) {
      case 'human_handoff':
        smsBody = `🚨 HUMAN REQUEST
Lead: ${data.leadName}
${data.leadPhone ? `Phone: ${data.leadPhone}` : ''}
${data.leadEmail ? `Email: ${data.leadEmail}` : ''}
Source: ${data.leadSource || 'Unknown'}

They want to speak with you! Check dashboard for conversation.`
        break

      case 'quote_request':
        smsBody = `💰 QUOTE REQUEST
Lead: ${data.leadName}
${data.leadPhone ? `Phone: ${data.leadPhone}` : ''}
${data.leadEmail ? `Email: ${data.leadEmail}` : ''}
Package: ${data.packageType || 'Unknown'}

Check dashboard to generate quote in Xero.`
        break

      case 'new_lead':
        smsBody = `🎯 NEW LEAD
Name: ${data.leadName}
${data.leadPhone ? `Phone: ${data.leadPhone}` : ''}
${data.leadEmail ? `Email: ${data.leadEmail}` : ''}
Source: ${data.leadSource || 'Unknown'}

New conversation started!`
        break

      case 'high_value':
        smsBody = `⭐ HIGH VALUE LEAD
Lead: ${data.leadName}
${data.leadPhone ? `Phone: ${data.leadPhone}` : ''}
${data.leadEmail ? `Email: ${data.leadEmail}` : ''}

AI flagged this as high-value. Check conversation!`
        break
    }

    // Send SMS notification
    const smsResult = await sendSMS({
      to: ADMIN_PHONE,
      body: smsBody
    })

    if (!smsResult.success) {
      console.error('Failed to send SMS notification:', smsResult.error)
      return { success: false, error: smsResult.error }
    }

    console.log('Admin notification sent successfully:', data.type)

    // TODO: Add email notification
    // await sendEmail({
    //   to: ADMIN_EMAIL,
    //   subject: `CoreSentia: ${data.type}`,
    //   body: formatEmailBody(data)
    // })

    return { success: true }
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Send notification when actions are detected
 */
export async function handleActionNotifications(actions: Array<{ type: string; status: string; data?: any }>): Promise<void> {
  for (const action of actions) {
    try {
      // Skip if no data provided
      if (!action.data) {
        console.warn(`Action ${action.type} has no data, skipping notification`)
        continue
      }

      switch (action.type) {
        case 'human_handoff':
          await notifyAdmin({
            type: 'human_handoff',
            leadName: action.data.leadName || 'Unknown',
            leadEmail: action.data.email,
            leadPhone: action.data.phone,
            leadSource: action.data.source,
            conversationSummary: action.data.conversationSummary,
            urgency: 'high'
          })
          break

        case 'generate_quote':
          await notifyAdmin({
            type: 'quote_request',
            leadName: action.data.clientName || 'Unknown',
            leadEmail: action.data.email,
            leadPhone: action.data.phone,
            packageType: action.data.packageType,
            conversationSummary: action.data.conversationSummary
          })
          break

        case 'high_value_alert':
          await notifyAdmin({
            type: 'high_value',
            leadName: action.data.leadData?.name || 'Unknown',
            leadEmail: action.data.leadData?.email,
            leadPhone: action.data.leadData?.phone,
            leadSource: action.data.leadData?.source
          })
          break
      }
    } catch (error) {
      console.error(`Error handling ${action.type} notification:`, error)
    }
  }
}
