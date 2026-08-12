-- CoreSentia Client Onboarding Table (Simplified Version)
-- Run this SQL in your Supabase SQL Editor to update the client_onboarding table

-- Drop the old table if it exists (WARNING: This deletes all data!)
-- Comment this out if you want to keep existing data
-- DROP TABLE IF EXISTS client_onboarding CASCADE;

-- Create the simplified onboarding table
CREATE TABLE IF NOT EXISTS client_onboarding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Business Basics
  business_name TEXT NOT NULL,
  abn TEXT,
  contact_person TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  industry_type TEXT NOT NULL,

  -- Package Selection
  selected_package TEXT NOT NULL DEFAULT 'SMS Responder',

  -- Service Coverage (Critical for AI)
  service_city TEXT NOT NULL,
  service_state TEXT NOT NULL,
  service_radius TEXT NOT NULL,
  service_notes TEXT,

  -- Phone Setup
  current_phone TEXT NOT NULL,
  phone_setup TEXT NOT NULL CHECK (phone_setup IN ('new', 'port')),
  port_number TEXT,

  -- Scheduling
  go_live_date DATE NOT NULL,
  call_time TEXT NOT NULL,

  -- Additional Information
  special_requests TEXT,

  -- Status tracking
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_progress', 'completed', 'live')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Link to lead (if applicable)
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_client_onboarding_email ON client_onboarding(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_client_onboarding_status ON client_onboarding(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_client_onboarding_created_at ON client_onboarding(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE client_onboarding ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable full access for service role" ON client_onboarding;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON client_onboarding;

-- Create policy to allow service role full access
CREATE POLICY "Enable full access for service role" ON client_onboarding
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create policy to allow authenticated users to read
CREATE POLICY "Enable read access for authenticated users" ON client_onboarding
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add a trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_client_onboarding_updated_at ON client_onboarding;

CREATE TRIGGER update_client_onboarding_updated_at
  BEFORE UPDATE ON client_onboarding
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- INSTRUCTIONS:
-- 1. Copy this entire SQL file
-- 2. Go to your Supabase project dashboard
-- 3. Click "SQL Editor" in the left sidebar
-- 4. Click "New Query"
-- 5. Paste this SQL
-- 6. Click "Run" to execute
-- 7. Verify the table structure in the "Table Editor"

-- NOTES:
-- - This simplified version only includes fields from the streamlined onboarding form
-- - Detailed business info (services, pricing, hours) will be collected on the 15-minute setup call
-- - ABN is now optional (for hobbyists/sole traders without ABN)
-- - Package is pre-filled based on their purchase
