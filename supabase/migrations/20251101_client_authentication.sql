-- Client Authentication System
-- Links Supabase Auth users to businesses for dashboard access

-- Create user_businesses junction table
CREATE TABLE IF NOT EXISTS user_businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL,
  role VARCHAR(50) DEFAULT 'owner',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_businesses_user_id ON user_businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_businesses_business_id ON user_businesses(business_id);

-- RLS Policies
ALTER TABLE user_businesses ENABLE ROW LEVEL SECURITY;

-- Users can only see their own business associations
DO $$
BEGIN
  CREATE POLICY "Users can view own business associations"
    ON user_businesses FOR SELECT
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Service role can manage all associations
DO $$
BEGIN
  CREATE POLICY "Service role can manage all"
    ON user_businesses FOR ALL
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Add tutorial booking for new clients
-- This will be inserted when a new business is provisioned
CREATE TABLE IF NOT EXISTS tutorial_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for tutorial bookings
CREATE INDEX IF NOT EXISTS idx_tutorial_bookings_business_id ON tutorial_bookings(business_id);

-- Function to create tutorial booking for new business
CREATE OR REPLACE FUNCTION create_tutorial_booking(p_business_id UUID)
RETURNS UUID AS $$
DECLARE
  v_booking_id UUID;
BEGIN
  -- Insert tutorial booking
  INSERT INTO bookings (
    business_id,
    customer_name,
    customer_email,
    customer_phone,
    service,
    date_time,
    scheduled_time,
    status,
    notes,
    job_duration
  ) VALUES (
    p_business_id,
    'Tutorial Demo',
    'demo@example.com',
    '0400 000 000',
    'Demo Service - Delete Me When Ready',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '2 days',
    'confirmed',
    '📚 DEMO BOOKING: This is an example booking to show you how the system works. Click to view details, then delete it when you''re ready!',
    60
  )
  RETURNING id INTO v_booking_id;

  -- Track that tutorial was created
  INSERT INTO tutorial_bookings (business_id) VALUES (p_business_id);

  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE user_businesses IS 'Links authenticated users to their businesses for dashboard access';
COMMENT ON FUNCTION create_tutorial_booking IS 'Creates a demo booking for new businesses to help them understand the system';
