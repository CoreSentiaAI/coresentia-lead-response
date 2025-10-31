import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json({ error: 'businessId is required' }, { status: 400 })
    }

    // Fetch blocked times for this business
    const { data: blockedTimes, error } = await supabase
      .from('blocked_times')
      .select('*')
      .eq('business_id', businessId)
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Error fetching blocked times:', error)
      return NextResponse.json({ error: 'Failed to fetch blocked times' }, { status: 500 })
    }

    return NextResponse.json({ blockedTimes: blockedTimes || [] })
  } catch (error) {
    console.error('Blocked times API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { business_id, start_time, end_time, reason, notes } = body

    if (!business_id || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'business_id, start_time, and end_time are required' },
        { status: 400 }
      )
    }

    // Validate that end_time is after start_time
    if (new Date(end_time) <= new Date(start_time)) {
      return NextResponse.json(
        { error: 'end_time must be after start_time' },
        { status: 400 }
      )
    }

    // Insert blocked time
    const { data: blockedTime, error } = await supabase
      .from('blocked_times')
      .insert({
        business_id,
        start_time,
        end_time,
        reason: reason || null,
        notes: notes || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating blocked time:', error)
      return NextResponse.json({ error: 'Failed to create blocked time' }, { status: 500 })
    }

    return NextResponse.json({ blockedTime, success: true })
  } catch (error) {
    console.error('Blocked times POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    // Delete blocked time
    const { error } = await supabase
      .from('blocked_times')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blocked time:', error)
      return NextResponse.json({ error: 'Failed to delete blocked time' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blocked times DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
