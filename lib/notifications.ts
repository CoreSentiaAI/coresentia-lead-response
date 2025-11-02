// CoreSentia notification system
// Sends SMS and email alerts to the CoreSentia team

import { sendSMS } from './twilio'

// Your contact details for notifications
const ADMIN_PHONE = process.env.ADMIN_PHONE || '+61467723694' // Your phone number
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@coresentia.com'

interface NotificationData {
  type: 'human_handoff' | 'quote_request' | 'new_lead' | 'high_value' | 'meeting_request'
  leadName: string
  leadEmail?: string
  leadPhone?: string
  leadSource?: string
  packageType?: string
  industry?: string
  challenge?: string
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
${data.industry ? `Industry: ${data.industry}` : ''}
Package: ${data.packageType || 'Unknown'}
${data.challenge ? `Challenge: ${data.challenge}` : ''}

Check dashboard for full conversation.`
        break

      case 'meeting_request':
        smsBody = `📞 MEETING REQUEST
Lead: ${data.leadName}
${data.leadPhone ? `Phone: ${data.leadPhone}` : ''}
${data.leadEmail ? `Email: ${data.leadEmail}` : ''}
${data.industry ? `Industry: ${data.industry}` : ''}
${data.challenge ? `Need: ${data.challenge}` : ''}

Reach out to schedule a call.`
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
        // =====================================================
        // SALES PIPELINE ACTIONS (for CoreSentia)
        // =====================================================

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
            industry: action.data.industry,
            challenge: action.data.challenge,
            packageType: action.data.packageType,
            conversationSummary: action.data.conversationSummary
          })
          break

        case 'book_meeting':
          await notifyAdmin({
            type: 'meeting_request',
            leadName: action.data.clientName || 'Unknown',
            leadEmail: action.data.email,
            leadPhone: action.data.phone,
            industry: action.data.industry,
            challenge: action.data.need,
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

        // =====================================================
        // CLIENT BOOKING ACTIONS (for client businesses)
        // =====================================================

        case 'create_booking':
          await handleBookingCreation(action.data)
          break

        case 'client_human_handoff':
          await handleClientHumanHandoff(action.data)
          break
      }
    } catch (error) {
      console.error(`Error handling ${action.type} notification:`, error)
    }
  }
}

/**
 * Create a pending booking and notify the business owner
 */
async function handleBookingCreation(data: any): Promise<void> {
  try {
    console.log('Creating pending booking:', data)

    // Create booking via API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: data.businessId,
        leadId: data.leadId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        service: data.service,
        dateTime: data.dateTime,
        jobDuration: data.jobDuration,
        notes: data.notes
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to create booking: ${response.status}`)
    }

    const booking = await response.json()
    console.log('Booking created:', booking)

    // Get business phone to send SMS
    // TODO: Look up business owner's phone from business_id
    // For now, sending to admin phone
    const businessOwnerPhone = ADMIN_PHONE // Replace with actual business owner lookup

    // Format booking date/time nicely
    const bookingDate = new Date(data.dateTime)
    const dateStr = bookingDate.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })
    const timeStr = bookingDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })

    // Send SMS to business owner
    await sendSMS({
      to: businessOwnerPhone,
      body: `📅 NEW BOOKING REQUEST

Customer: ${data.customerName}
Phone: ${data.customerPhone}
Service: ${data.service}
Date: ${dateStr} @ ${timeStr}
${data.fullAddress ? `Address: ${data.fullAddress}` : ''}

Tap to confirm or decline:
${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/${data.businessId}`
    })

    console.log('Booking notification sent to business owner')
  } catch (error) {
    console.error('Error handling booking creation:', error)
  }
}

/**
 * Notify business owner that customer wants human contact
 */
async function handleClientHumanHandoff(data: any): Promise<void> {
  try {
    console.log('Client human handoff:', data)

    // Get business owner's phone
    // TODO: Look up business owner's phone from business_id
    const businessOwnerPhone = ADMIN_PHONE // Replace with actual business owner lookup

    // Send SMS to business owner
    await sendSMS({
      to: businessOwnerPhone,
      body: `🚨 CUSTOMER WANTS TO CHAT

${data.customerName} wants to discuss a project
Phone: ${data.customerPhone}
${data.reason ? `Reason: ${data.reason}` : ''}

Please call them ASAP.`
    })

    console.log('Human handoff notification sent to business owner')
  } catch (error) {
    console.error('Error handling client human handoff:', error)
  }
}
