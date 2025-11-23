-- Migration: Add support for quote form submissions
-- Date: 2025-11-19
-- Purpose: Ensure leads table supports web_form source and quote requests

-- 1. Add updated_at column to leads table (for consistency with other tables)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- 2. Add first_name and last_name columns (used by quote form API)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text;

-- 3. Business_id is already nullable, but let's ensure it explicitly
-- (This won't error if already nullable)
ALTER TABLE public.leads
  ALTER COLUMN business_id DROP NOT NULL;

-- 4. Ensure source column can handle any text value (it's already text type, so no enum issues)
-- Add a comment to document the valid sources
COMMENT ON COLUMN public.leads.source IS 'Valid sources: web_chat, sms, web_form';

-- 5. Set up Row Level Security (RLS) policies
-- Enable RLS on the leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert leads" ON public.leads;
DROP POLICY IF EXISTS "Users can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Service role full access" ON public.leads;

-- Create policy that allows anyone to insert leads (for quote forms and chat)
CREATE POLICY "Allow public to insert leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view all leads (for admin dashboard)
CREATE POLICY "Users can view all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update leads (for status changes)
CREATE POLICY "Users can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure service role can do everything
CREATE POLICY "Service role full access"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_business_id ON public.leads(business_id) WHERE business_id IS NOT NULL;

-- 7. Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_leads_updated_at ON public.leads;

CREATE TRIGGER trigger_update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();

-- 8. Verify the table structure
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'leads'
ORDER BY ordinal_position;
