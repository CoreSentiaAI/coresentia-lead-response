import { createBrowserClient as createClient } from '@supabase/ssr'

// Client-side Supabase client with auth support
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if we have valid environment variables
  // During build time or if env vars are placeholders, we'll use dummy values
  const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http') && !supabaseUrl.includes('your_')
  const isValidKey = supabaseAnonKey && !supabaseAnonKey.includes('your_')

  if (!isValidUrl || !isValidKey) {
    // Return a dummy client that won't be used (build-time only)
    // This prevents build errors while allowing static generation to complete
    return createClient(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder'
    )
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
