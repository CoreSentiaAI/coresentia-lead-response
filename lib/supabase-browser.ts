import { createBrowserClient as createClient } from '@supabase/ssr'

// Client-side Supabase client with auth support
export const createBrowserClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
