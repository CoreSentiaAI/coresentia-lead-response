-- Business Phones Table
-- Maps phone numbers to businesses for SMS routing
-- This allows us to route incoming SMS to the correct client booking bot

-- =====================================================
-- 1. BUSINESS_PHONES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS business_phones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Phone number (normalized format: +61489087491)
  phone_number VARCHAR(20) NOT NULL UNIQUE,

  -- Business this phone belongs to
  -- For MVP: references client_onboarding.id
  -- Later: can be changed to reference businesses.id when that table exists
  business_id UUID NOT NULL,

  -- Phone details
  phone_type VARCHAR(20) DEFAULT 'sms' CHECK (phone_type IN ('sms', 'voice', 'both')),
  is_active BOOLEAN DEFAULT true,

  -- Business context for AI
  business_name TEXT NOT NULL,
  industry_type TEXT,

  -- Bot configuration (can override default bot settings)
  bot_personality TEXT, -- 'professional', 'casual', 'friendly'
  custom_greeting TEXT, -- Optional custom first message

  -- Service offerings (for bot to reference)
  services TEXT[], -- Array of services: ['Lawn Mowing', 'Hedge Trimming', 'Garden Cleanup']

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activated_at TIMESTAMP WITH TIME ZONE,
  deactivated_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_business_phones_number ON business_phones(phone_number);
CREATE INDEX IF NOT EXISTS idx_business_phones_business_id ON business_phones(business_id);
CREATE INDEX IF NOT EXISTS idx_business_phones_active ON business_phones(is_active) WHERE is_active = true;

-- Row Level Security
ALTER TABLE business_phones ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access
CREATE POLICY "Enable full access for service role"
  ON business_phones
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Authenticated users can read their own business phones
CREATE POLICY "Enable read access for business owners"
  ON business_phones
  FOR SELECT
  USING (
    business_id IN (
      SELECT business_id FROM user_businesses WHERE user_id = auth.uid()
    )
  );

-- Update trigger
CREATE TRIGGER update_business_phones_updated_at
  BEFORE UPDATE ON business_phones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. INSERT CORESENTIA SALES NUMBER
-- =====================================================
-- Insert the CoreSentia sales number as a special case
-- This number routes to the sales pipeline bot (not client booking bot)

INSERT INTO business_phones (
  phone_number,
  business_id,
  business_name,
  industry_type,
  is_active,
  phone_type,
  services,
  bot_personality
) VALUES (
  '+61489087491',
  '00000000-0000-0000-0000-000000000000', -- Special UUID for CoreSentia internal
  'CoreSentia',
  'Lead Generation & Booking Platform',
  true,
  'both',
  ARRAY['SMS Responder', 'Professional Package'],
  'professional'
) ON CONFLICT (phone_number) DO NOTHING;

-- =====================================================
-- 3. HELPER FUNCTIONS
-- =====================================================

-- Function to get business context from phone number
CREATE OR REPLACE FUNCTION get_business_from_phone(p_phone_number VARCHAR)
RETURNS TABLE (
  business_id UUID,
  business_name TEXT,
  industry_type TEXT,
  services TEXT[],
  bot_personality TEXT,
  custom_greeting TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    bp.business_id,
    bp.business_name,
    bp.industry_type,
    bp.services,
    bp.bot_personality,
    bp.custom_greeting
  FROM business_phones bp
  WHERE bp.phone_number = p_phone_number
    AND bp.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Function to check if phone number is CoreSentia sales
CREATE OR REPLACE FUNCTION is_coresentia_sales_number(p_phone_number VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_phone_number = '+61489087491';
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE business_phones IS 'Maps phone numbers to businesses for SMS routing and bot context';
COMMENT ON FUNCTION get_business_from_phone IS 'Retrieves business context for incoming SMS routing';
COMMENT ON FUNCTION is_coresentia_sales_number IS 'Checks if phone number is CoreSentia sales number (routes to sales bot)';
