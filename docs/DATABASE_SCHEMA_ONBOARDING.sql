-- CoreSentia Client Onboarding Table
-- Run this SQL in your Supabase SQL Editor to create the client_onboarding table

CREATE TABLE IF NOT EXISTS client_onboarding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Business Information
  business_name TEXT NOT NULL,
  trading_name TEXT,
  abn TEXT NOT NULL,
  business_address TEXT,
  contact_person TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT NOT NULL,
  industry_type TEXT NOT NULL,

  -- Services Offered
  services TEXT[] NOT NULL,
  pricing_structure TEXT NOT NULL,
  typical_job_value TEXT NOT NULL,
  pricing_notes TEXT,

  -- Working Hours (stored as JSONB)
  working_hours JSONB,
  appointment_duration TEXT,
  advance_booking TEXT,

  -- Service Area
  service_areas TEXT,
  travel_radius TEXT,
  travel_charges TEXT,

  -- Communication Preferences
  ai_personality TEXT NOT NULL,
  key_phrases TEXT,
  mentions TEXT[],
  things_not_to_say TEXT,

  -- Package Selection
  selected_package TEXT NOT NULL CHECK (selected_package IN ('sms-responder', 'professional')),

  -- Professional Package Details (nullable - only for Professional package)
  preferred_domain TEXT,
  alternative_domain TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  has_logo TEXT,
  tagline TEXT,
  about TEXT,
  has_photos TEXT,

  -- Current Setup
  existing_phone TEXT,
  phone_preference TEXT,
  existing_website TEXT,

  -- Setup Preferences
  preferred_go_live TEXT,
  best_time_for_call TEXT,
  questions TEXT,

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
CREATE INDEX idx_client_onboarding_email ON client_onboarding(email);

-- Create index on status for filtering
CREATE INDEX idx_client_onboarding_status ON client_onboarding(status);

-- Create index on created_at for sorting
CREATE INDEX idx_client_onboarding_created_at ON client_onboarding(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE client_onboarding ENABLE ROW LEVEL SECURITY;

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
-- 7. Verify the table was created in the "Table Editor"
