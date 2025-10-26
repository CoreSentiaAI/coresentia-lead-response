import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

interface BusinessHours {
  timezone: string
  booking_duration: number
  buffer_time: number
  hours: {
    [key: string]: {
      enabled: boolean
      start: string
      end: string
    }
  }
}

// GET /api/availability?date=2025-10-27&businessId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // Format: YYYY-MM-DD
    const businessId = searchParams.get('businessId')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter required (format: YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Get business settings
    let businessSettings: BusinessHours

    if (businessId) {
      // Future: Get specific business settings
      const { data: businessData, error: businessError } = await supabase
        .from('business_settings')
        .select('*')
        .eq('business_id', businessId)
        .single()

      if (businessError || !businessData) {
        // Fall back to default
        businessSettings = await getDefaultSettings()
      } else {
        businessSettings = {
          timezone: businessData.timezone,
          booking_duration: businessData.booking_duration,
          buffer_time: businessData.buffer_time,
          hours: businessData.hours
        }
      }
    } else {
      // Use default settings for MVP
      businessSettings = await getDefaultSettings()
    }

    // Get day of week
    const requestedDate = new Date(date + 'T00:00:00')
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayOfWeek = dayNames[requestedDate.getDay()]

    // Check if business is open on this day
    const daySettings = businessSettings.hours[dayOfWeek]
    if (!daySettings || !daySettings.enabled) {
      return NextResponse.json({
        date,
        available: false,
        reason: 'Business closed on this day',
        slots: []
      })
    }

    // Generate time slots for the day
    const slots = generateTimeSlots(
      daySettings.start,
      daySettings.end,
      businessSettings.booking_duration,
      businessSettings.buffer_time
    )

    // Get existing bookings for this date
    const startOfDay = `${date}T00:00:00Z`
    const endOfDay = `${date}T23:59:59Z`

    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('date_time, service')
      .gte('date_time', startOfDay)
      .lte('date_time', endOfDay)
      .in('status', ['pending', 'confirmed'])

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
    }

    // Filter out booked slots
    const bookedTimes = new Set(
      (bookings || []).map(b => {
        const dt = new Date(b.date_time)
        return `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`
      })
    )

    const availableSlots = slots.filter(slot => !bookedTimes.has(slot.time))

    return NextResponse.json({
      date,
      dayOfWeek,
      available: availableSlots.length > 0,
      totalSlots: slots.length,
      availableSlots: availableSlots.length,
      bookedSlots: bookedTimes.size,
      slots: availableSlots,
      businessHours: {
        start: daySettings.start,
        end: daySettings.end,
        duration: businessSettings.booking_duration
      }
    })

  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper: Get default business settings
async function getDefaultSettings(): Promise<BusinessHours> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'default_business_hours')
    .single()

  if (error || !data) {
    // Fallback to hardcoded defaults
    return {
      timezone: 'Australia/Brisbane',
      booking_duration: 60,
      buffer_time: 0,
      hours: {
        monday: { enabled: true, start: '09:00', end: '17:00' },
        tuesday: { enabled: true, start: '09:00', end: '17:00' },
        wednesday: { enabled: true, start: '09:00', end: '17:00' },
        thursday: { enabled: true, start: '09:00', end: '17:00' },
        friday: { enabled: true, start: '09:00', end: '17:00' },
        saturday: { enabled: false, start: '09:00', end: '13:00' },
        sunday: { enabled: false, start: '09:00', end: '17:00' }
      }
    }
  }

  return data.value as BusinessHours
}

// Helper: Generate time slots
function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  buffer: number
): Array<{ time: string; label: string }> {
  const slots = []
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)

  let currentMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  const slotSize = duration + buffer

  while (currentMinutes + duration <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60)
    const mins = currentMinutes % 60
    const time = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`

    // Format label (e.g., "9:00 AM")
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours)
    const label = `${displayHour}:${String(mins).padStart(2, '0')} ${period}`

    slots.push({ time, label })
    currentMinutes += slotSize
  }

  return slots
}
