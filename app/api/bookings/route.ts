import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if env vars are set and not placeholders
const isValidUrl = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here') && supabaseUrl.startsWith('http')
const isValidKey = supabaseKey && !supabaseKey.includes('your_') && supabaseKey.length > 20

if (!isValidUrl || !isValidKey) {
  console.error('Missing or invalid Supabase environment variables')
}

const supabase = isValidUrl && isValidKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { leadId, customerName, customerEmail, customerPhone, service, dateTime, jobDuration, notes, businessId } = body

    // Validate required fields (leadId is optional for manual bookings)
    if (!customerName || !customerEmail || !dateTime) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, dateTime' },
        { status: 400 }
      )
    }

    // Validate dateTime format (ISO 8601)
    const requestedDateTime = new Date(dateTime)
    if (isNaN(requestedDateTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid dateTime format. Use ISO 8601 (e.g., 2025-10-27T10:00:00Z)' },
        { status: 400 }
      )
    }

    // Check for double-booking
    // Look for existing bookings within ±2 hours of requested time
    const twoHoursBefore = new Date(requestedDateTime.getTime() - 2 * 60 * 60 * 1000).toISOString()
    const twoHoursAfter = new Date(requestedDateTime.getTime() + 2 * 60 * 60 * 1000).toISOString()

    let conflictQuery = supabase
      .from('bookings')
      .select('id, date_time, customer_name')
      .gte('date_time', twoHoursBefore)
      .lte('date_time', twoHoursAfter)
      .in('status', ['pending', 'confirmed'])

    if (businessId) {
      conflictQuery = conflictQuery.eq('business_id', businessId)
    }

    const { data: conflicts, error: conflictError } = await conflictQuery

    if (conflictError) {
      console.error('Error checking conflicts:', conflictError)
      // Don't block booking on conflict check error, just log it
    }

    // Check for exact time match or overlapping bookings
    if (conflicts && conflicts.length > 0) {
      const exactMatch = conflicts.find(b => {
        const existingTime = new Date(b.date_time).getTime()
        const requestedTime = requestedDateTime.getTime()
        // Within 1 hour = conflict
        return Math.abs(existingTime - requestedTime) < 60 * 60 * 1000
      })

      if (exactMatch) {
        return NextResponse.json(
          {
            error: 'Time slot not available',
            message: 'This time slot is already booked. Please choose another time.',
            conflictingBooking: {
              time: exactMatch.date_time,
              customer: exactMatch.customer_name
            }
          },
          { status: 409 } // 409 Conflict
        )
      }
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        lead_id: leadId || null,
        business_id: businessId || null,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        service: service || 'General',
        date_time: dateTime,
        job_duration: jobDuration || 60,
        notes: notes || '',
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json(
        { error: 'Failed to create booking', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully'
    })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const businessId = searchParams.get('businessId')

    if (!leadId && !businessId) {
      return NextResponse.json(
        { error: 'Either leadId or businessId required' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('bookings')
      .select('*')
      .order('date_time', { ascending: true })

    if (leadId) {
      query = query.eq('lead_id', leadId)
    }

    if (businessId) {
      query = query.eq('business_id', businessId)
    }

    const { data: bookings, error } = await query

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('GET bookings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { bookingId, status, customerName, customerEmail, customerPhone, service, dateTime, jobDuration, notes } = body

    if (!bookingId) {
      return NextResponse.json(
        { error: 'bookingId required' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: any = {}
    if (status !== undefined) updateData.status = status
    if (customerName !== undefined) updateData.customer_name = customerName
    if (customerEmail !== undefined) updateData.customer_email = customerEmail
    if (customerPhone !== undefined) updateData.customer_phone = customerPhone
    if (service !== undefined) updateData.service = service
    if (dateTime !== undefined) updateData.date_time = dateTime
    if (jobDuration !== undefined) updateData.job_duration = jobDuration
    if (notes !== undefined) updateData.notes = notes

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      console.error('Error updating booking:', error)
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      booking: data
    })
  } catch (error) {
    console.error('PATCH booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking id required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId)

    if (error) {
      console.error('Error deleting booking:', error)
      return NextResponse.json(
        { error: 'Failed to delete booking', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    console.error('DELETE booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
