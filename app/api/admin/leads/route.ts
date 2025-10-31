import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Admin API: Fetch all leads with their conversations
 * GET /api/admin/leads
 */
export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase with validation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if env vars are set and not placeholders
    const isValidUrl = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here') && supabaseUrl.startsWith('http')
    const isValidKey = supabaseKey && !supabaseKey.includes('your_') && supabaseKey.length > 20

    if (!isValidUrl || !isValidKey) {
      console.error('Missing or invalid Supabase environment variables')
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get filter parameters from query string
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') // 'sms', 'web_chat', or null for all
    const status = searchParams.get('status') // 'new', 'contacted', etc.
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build query
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    // Apply filters
    if (source) {
      query = query.eq('source', source)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data: leads, error: leadsError } = await query

    if (leadsError) {
      console.error('Error fetching leads:', leadsError)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    // Fetch conversations for each lead
    const leadsWithConversations = await Promise.all(
      (leads || []).map(async (lead) => {
        const { data: conversations } = await supabase
          .from('conversations')
          .select('*')
          .eq('lead_id', lead.id)
          .order('timestamp', { ascending: true })

        return {
          ...lead,
          conversations: conversations || [],
          conversationCount: conversations?.length || 0,
          lastMessage: conversations?.[conversations.length - 1]?.message || lead.initial_message
        }
      })
    )

    return NextResponse.json({
      leads: leadsWithConversations,
      total: leadsWithConversations.length
    })
  } catch (error) {
    console.error('Admin leads API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Update lead status
 * PATCH /api/admin/leads
 */
export async function PATCH(request: NextRequest) {
  try {
    // Initialize Supabase with validation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if env vars are set and not placeholders
    const isValidUrl = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here') && supabaseUrl.startsWith('http')
    const isValidKey = supabaseKey && !supabaseKey.includes('your_') && supabaseKey.length > 20

    if (!isValidUrl || !isValidKey) {
      console.error('Missing or invalid Supabase environment variables')
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await request.json()
    const { leadId, status, notes } = body

    if (!leadId || !status) {
      return NextResponse.json(
        { error: 'Missing leadId or status' },
        { status: 400 }
      )
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    // Add notes if provided (we'll need to add a notes column later)
    // if (notes) {
    //   updateData.notes = notes
    // }

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)

    if (error) {
      console.error('Error updating lead:', error)
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin leads PATCH error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
