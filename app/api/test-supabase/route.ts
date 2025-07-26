import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test 1: Create client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    // Test 2: Read from leads table
    const { data: leads, error: readError } = await supabase
      .from('leads')
      .select('*')
      .limit(5)
    
    // Test 3: Insert test lead
    const testLead = {
      name: 'Test Lead',
      email: `test-${Date.now()}@example.com`,
      company: 'Test Company',
      initial_message: 'Testing Supabase connection',
      status: 'test'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('leads')
      .insert([testLead])
      .select()
    
    return NextResponse.json({
      success: true,
      connection: 'OK',
      readTest: { success: !readError, error: readError?.message, count: leads?.length },
      writeTest: { success: !insertError, error: insertError?.message, data: insertData }
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
