import { NextResponse } from 'next/server'
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

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    // Fetch all bookings without business_id filter (for admin view)
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date_time', { ascending: true })

    if (error) {
      console.error('Error fetching all bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('GET all bookings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
