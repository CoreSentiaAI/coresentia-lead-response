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

/**
 * Create Client User Account
 * POST /api/admin/create-client-user
 *
 * Creates a Supabase auth user and links them to a business
 * Called during client provisioning process
 */
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { email, password, businessId, businessName } = body

    // Validate required fields
    if (!email || !password || !businessId) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, businessId' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skip email verification
      user_metadata: {
        business_id: businessId,
        business_name: businessName || 'Unknown Business',
      }
    })

    if (authError) {
      console.error('Error creating user:', authError)
      return NextResponse.json(
        { error: authError.message || 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Link user to business in user_businesses table
    const { error: linkError } = await supabase
      .from('user_businesses')
      .insert({
        user_id: authData.user.id,
        business_id: businessId,
        role: 'owner'
      })

    if (linkError) {
      console.error('Error linking user to business:', linkError)
      // Try to clean up the user if linking fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Failed to link user to business' },
        { status: 500 }
      )
    }

    // Create tutorial booking for the business
    const { data: tutorialBooking, error: tutorialError } = await supabase
      .rpc('create_tutorial_booking', { p_business_id: businessId })

    if (tutorialError) {
      console.error('Error creating tutorial booking:', tutorialError)
      // Not fatal - user can still proceed
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email
      },
      businessId,
      tutorialCreated: !tutorialError,
      message: 'Client user account created successfully'
    })

  } catch (error) {
    console.error('Create client user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
