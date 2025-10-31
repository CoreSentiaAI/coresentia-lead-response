-- Calendar System Migration
-- Creates tables and updates for calendar functionality with travel time management

-- =====================================================
-- 1. BUSINESS SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,

  -- Working Hours (JSONB format)
  -- Example: {"mon": {"start": "08:00", "end": "17:00", "enabled": true}, ...}
  working_hours JSONB DEFAULT '{
    "mon": {"start": "09:00", "end": "17:00", "enabled": true},
    "tue": {"start": "09:00", "end": "17:00", "enabled": true},
    "wed": {"start": "09:00", "end": "17:00", "enabled": true},
    "thu": {"start": "09:00", "end": "17:00", "enabled": true},
    "fri": {"start": "09:00", "end": "17:00", "enabled": true},
    "sat": {"start": "09:00", "end": "13:00", "enabled": false},
    "sun": {"start": "09:00", "end": "17:00", "enabled": false}
  }'::jsonb,

  -- Travel Settings
  default_travel_buffer INTEGER DEFAULT 30, -- minutes
  use_smart_travel BOOLEAN DEFAULT false,
  travel_calculation_method VARCHAR(20) DEFAULT 'fixed', -- 'fixed', 'distance', 'maps_api'

  -- Service Area
  service_area_suburbs TEXT[], -- Array of suburbs they service
  max_travel_distance INTEGER DEFAULT 50, -- km

  -- Job Settings
  default_job_duration INTEGER DEFAULT 60, -- minutes

  -- Booking Settings
  min_notice_hours INTEGER DEFAULT 24, -- Minimum hours notice for bookings
  max_bookings_per_day INTEGER DEFAULT 10,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_business_settings_business_id ON business_settings(business_id);

-- =====================================================
-- 2. BLOCKED TIMES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blocked_times (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,

  -- Time Range
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,

  -- Details
  reason VARCHAR(255),
  notes TEXT,

  -- Recurrence (for future: weekly lunch breaks, etc)
  recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly'
  recurrence_end_date DATE,

  -- Metadata
  created_by UUID, -- Admin user who created the block
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraint: end time must be after start time
  CONSTRAINT blocked_times_valid_range CHECK (end_time > start_time)
);

-- Indexes for efficient availability queries
CREATE INDEX IF NOT EXISTS idx_blocked_times_business_id ON blocked_times(business_id);
CREATE INDEX IF NOT EXISTS idx_blocked_times_time_range ON blocked_times(business_id, start_time, end_time);

-- =====================================================
-- 3. UPDATE BOOKINGS TABLE
-- =====================================================

-- Add location and travel fields
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS service_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS full_address TEXT,
ADD COLUMN IF NOT EXISTS suburb VARCHAR(100),
ADD COLUMN IF NOT EXISTS location_lat DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS location_lng DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS estimated_travel_time INTEGER DEFAULT 0, -- minutes from previous job
ADD COLUMN IF NOT EXISTS job_duration INTEGER DEFAULT 60, -- minutes
ADD COLUMN IF NOT EXISTS actual_start_time TIMESTAMP,
ADD COLUMN IF NOT EXISTS actual_end_time TIMESTAMP;

-- Index for location-based queries
CREATE INDEX IF NOT EXISTS idx_bookings_location ON bookings(business_id, scheduled_time);
CREATE INDEX IF NOT EXISTS idx_bookings_suburb ON bookings(suburb);

-- =====================================================
-- 4. UPDATE LEADS TABLE
-- =====================================================

-- Add conversation stage tracking
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS conversation_stage VARCHAR(50) DEFAULT 'intent',
ADD COLUMN IF NOT EXISTS address_only TEXT,
ADD COLUMN IF NOT EXISTS proposed_times JSONB,
ADD COLUMN IF NOT EXISTS selected_time TIMESTAMP;

-- Conversation stages: 'intent' -> 'address_collected' -> 'time_selected' -> 'booking_confirmed'

-- =====================================================
-- 5. CREATE AVAILABILITY CACHE TABLE (OPTIONAL - FOR PERFORMANCE)
-- =====================================================
CREATE TABLE IF NOT EXISTS availability_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available_slots JSONB, -- Array of {start: "14:00", end: "15:00", available: true}
  generated_at TIMESTAMP DEFAULT NOW(),

  -- Cache expires after 15 minutes
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '15 minutes'),

  UNIQUE(business_id, date)
);

CREATE INDEX IF NOT EXISTS idx_availability_cache_lookup ON availability_cache(business_id, date, expires_at);

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Function to check if a time slot is available
CREATE OR REPLACE FUNCTION is_time_slot_available(
  p_business_id UUID,
  p_start_time TIMESTAMP,
  p_end_time TIMESTAMP
) RETURNS BOOLEAN AS $$
DECLARE
  v_conflict_count INTEGER;
BEGIN
  -- Check for conflicts with existing bookings
  SELECT COUNT(*) INTO v_conflict_count
  FROM bookings
  WHERE business_id = p_business_id
    AND status != 'cancelled'
    AND (
      (scheduled_time <= p_start_time AND (scheduled_time + (job_duration || ' minutes')::INTERVAL) > p_start_time)
      OR
      (scheduled_time < p_end_time AND scheduled_time >= p_start_time)
    );

  IF v_conflict_count > 0 THEN
    RETURN false;
  END IF;

  -- Check for blocked times
  SELECT COUNT(*) INTO v_conflict_count
  FROM blocked_times
  WHERE business_id = p_business_id
    AND (
      (start_time <= p_start_time AND end_time > p_start_time)
      OR
      (start_time < p_end_time AND start_time >= p_start_time)
    );

  IF v_conflict_count > 0 THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. SEED DEFAULT SETTINGS FOR EXISTING BUSINESSES
-- =====================================================

-- Insert default settings for any existing businesses that don't have settings yet
INSERT INTO business_settings (business_id)
SELECT id FROM businesses
WHERE id NOT IN (SELECT business_id FROM business_settings WHERE business_id IS NOT NULL)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS (only if not already enabled)
DO $$ BEGIN
  ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE availability_cache ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Policies will be added based on your existing auth setup
-- For now, allowing all operations (you'll want to restrict this in production)
DO $$ BEGIN
  CREATE POLICY "Allow all operations on business_settings" ON business_settings FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow all operations on blocked_times" ON blocked_times FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow all operations on availability_cache" ON availability_cache FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

COMMENT ON TABLE business_settings IS 'Stores business configuration for calendar, working hours, and travel settings';
COMMENT ON TABLE blocked_times IS 'Manually blocked time slots for holidays, breaks, or unavailability';
COMMENT ON TABLE availability_cache IS 'Cached availability calculations for performance optimization';
