import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, customerName, customerEmail, customerPhone, service, dateTime, notes } = body

    // Validate required fields
    if (!leadId || !customerName || !customerEmail || !dateTime) {
      return NextResponse.json(
        { error: 'Missing required fields: leadId, customerName, customerEmail, dateTime' },
        { status: 400 }
      )
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        lead_id: leadId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        service: service || 'General',
        date_time: dateTime,
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
      booking
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
  try {
    const body = await request.json()
    const { bookingId, status } = body

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'bookingId and status required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
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
