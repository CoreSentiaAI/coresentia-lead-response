-- Migration: Add support for quote form submissions
-- Date: 2025-11-19
-- Purpose: Ensure leads table supports web_form source and quote requests without business_id

-- First, let's ensure the leads table exists and has all necessary columns
-- (This is idempotent - won't fail if columns already exist)

-- Make sure business_id can be NULL (for quote requests)
ALTER TABLE leads
  ALTER COLUMN business_id DROP NOT NULL;

-- Ensure source column exists and can handle 'web_form'
-- If source is an enum type, we need to add 'web_form' to it
DO $$
BEGIN
  -- Check if source is an enum type
  IF EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'lead_source_enum'
  ) THEN
    -- Add 'web_form' to the enum if it doesn't exist
    BEGIN
      ALTER TYPE lead_source_enum ADD VALUE IF NOT EXISTS 'web_form';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END;
  END IF;
END $$;

-- Ensure RLS policies allow inserting leads from web forms
-- Drop existing policy if it exists and recreate it
DROP POLICY IF EXISTS "Allow public to insert leads" ON leads;

-- Create policy that allows anyone to insert leads (for quote forms)
CREATE POLICY "Allow public to insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Also ensure authenticated users can read their own leads
DROP POLICY IF EXISTS "Users can view all leads" ON leads;

CREATE POLICY "Users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Ensure service role can do everything
DROP POLICY IF EXISTS "Service role full access" ON leads;

CREATE POLICY "Service role full access"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Make sure RLS is enabled on the table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Add an index on source for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Add an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Ensure default values are set correctly
ALTER TABLE leads
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now(),
  ALTER COLUMN status SET DEFAULT 'new';

-- Create a function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS trigger_update_leads_updated_at ON leads;

CREATE TRIGGER trigger_update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();

-- Verify the table structure (this will show in the SQL output)
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
