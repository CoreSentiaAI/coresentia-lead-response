-- ========================================
-- CoreSentia Professional Package Database Schema
-- Created: November 9, 2025
-- ========================================

-- Professional Package Onboarding Table
-- Stores all data from Professional Package onboarding form
-- Includes: SMS bot + Custom website + Branding + Domain setup

CREATE TABLE IF NOT EXISTS client_onboarding_professional (
  -- Primary Key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Basic Business Information
  business_name TEXT NOT NULL,
  abn TEXT,
  contact_person TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  industry_type TEXT NOT NULL,
  years_in_business INTEGER,
  qualifications TEXT,

  -- Package Selection
  selected_package TEXT DEFAULT 'Professional Package',

  -- Branding & Design
  has_logo BOOLEAN DEFAULT FALSE,
  logo_notes TEXT,
  logo_file_urls TEXT[], -- Array of uploaded logo file URLs
  has_brand_colors BOOLEAN DEFAULT FALSE,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  design_style TEXT, -- 'modern', 'bold', 'professional', 'tradie', 'elegant'
  design_inspiration TEXT, -- URLs or descriptions

  -- Domain & Website Content
  preferred_domain TEXT NOT NULL,
  owns_domain BOOLEAN DEFAULT FALSE,
  domain_registrar TEXT,
  alternative_domains TEXT, -- Comma-separated alternatives
  website_tagline TEXT NOT NULL,
  website_subheadline TEXT,
  about_business TEXT NOT NULL,

  -- Visual Content & Social Media
  has_photos BOOLEAN DEFAULT FALSE,
  photo_urls TEXT[], -- Array of uploaded photo URLs
  use_stock_photos BOOLEAN DEFAULT FALSE,
  photo_notes TEXT,
  facebook_url TEXT,
  instagram_handle TEXT,
  google_business_url TEXT,
  linkedin_url TEXT,
  other_social TEXT,

  -- Services & Pricing
  services_list TEXT NOT NULL, -- Detailed service descriptions
  pricing_display TEXT, -- 'exact', 'from', 'quote'
  current_promotions TEXT,

  -- Service Coverage
  service_city TEXT NOT NULL,
  service_state TEXT NOT NULL,
  service_radius TEXT NOT NULL,
  service_notes TEXT,

  -- Phone Setup (SMS Bot)
  current_phone TEXT NOT NULL,
  phone_setup TEXT DEFAULT 'new', -- 'new' or 'port'
  port_number TEXT, -- If porting existing number

  -- Technical Requirements
  existing_booking_system TEXT,
  calendar_system TEXT DEFAULT 'none', -- 'google', 'outlook', 'other', 'none'
  crm_system TEXT,
  email_hosting TEXT DEFAULT 'new', -- 'keep_existing' or 'new'

  -- Scheduling
  go_live_date DATE NOT NULL,
  special_requests TEXT,

  -- Build Progress & Status
  status TEXT DEFAULT 'submitted', -- 'submitted', 'in_progress', 'review', 'approved', 'live'
  logo_created BOOLEAN DEFAULT FALSE,
  website_built BOOLEAN DEFAULT FALSE,
  staging_url TEXT, -- Preview URL before going live
  staging_approved BOOLEAN DEFAULT FALSE,
  live_domain TEXT, -- Final live domain
  sms_number TEXT, -- Assigned SMS number

  -- Revisions & Feedback
  revision_notes TEXT,
  revision_count INTEGER DEFAULT 0,
  client_feedback TEXT,

  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  go_live_at TIMESTAMPTZ, -- When system went live

  -- Links to other systems
  dashboard_url TEXT,
  lead_id UUID REFERENCES leads(id) -- Link to original lead if applicable
);

-- ========================================
-- Indexes for Performance
-- ========================================

CREATE INDEX idx_prof_onboarding_email ON client_onboarding_professional(email);
CREATE INDEX idx_prof_onboarding_status ON client_onboarding_professional(status);
CREATE INDEX idx_prof_onboarding_submitted ON client_onboarding_professional(submitted_at);
CREATE INDEX idx_prof_onboarding_business ON client_onboarding_professional(business_name);
CREATE INDEX idx_prof_onboarding_domain ON client_onboarding_professional(preferred_domain);

-- ========================================
-- Row Level Security (RLS)
-- ========================================

ALTER TABLE client_onboarding_professional ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access to professional onboarding"
  ON client_onboarding_professional
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to read their own submissions
CREATE POLICY "Users can view their own professional onboarding"
  ON client_onboarding_professional
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- ========================================
-- Triggers
-- ========================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_professional_onboarding_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_professional_onboarding_timestamp
  BEFORE UPDATE ON client_onboarding_professional
  FOR EACH ROW
  EXECUTE FUNCTION update_professional_onboarding_updated_at();

-- ========================================
-- Comments for Documentation
-- ========================================

COMMENT ON TABLE client_onboarding_professional IS 'Stores Professional Package ($2,500) onboarding data including website design, branding, and SMS bot configuration';
COMMENT ON COLUMN client_onboarding_professional.design_style IS 'modern, bold, professional, tradie, or elegant';
COMMENT ON COLUMN client_onboarding_professional.pricing_display IS 'exact prices, from pricing, or quote only';
COMMENT ON COLUMN client_onboarding_professional.status IS 'submitted > in_progress > review > approved > live';
COMMENT ON COLUMN client_onboarding_professional.revision_count IS 'Track number of revision rounds (2 included in package)';
COMMENT ON COLUMN client_onboarding_professional.staging_url IS 'Preview URL for client to review before going live';

-- ========================================
-- Sample Queries
-- ========================================

-- Get all pending professional package submissions
-- SELECT * FROM client_onboarding_professional WHERE status = 'submitted' ORDER BY submitted_at DESC;

-- Get all live professional package clients
-- SELECT business_name, live_domain, sms_number, go_live_at FROM client_onboarding_professional WHERE status = 'live' ORDER BY go_live_at DESC;

-- Get clients needing logo creation
-- SELECT business_name, email, contact_person FROM client_onboarding_professional WHERE has_logo = FALSE AND logo_created = FALSE AND status IN ('submitted', 'in_progress');

-- Get clients in review/approval stage
-- SELECT business_name, staging_url, submitted_at FROM client_onboarding_professional WHERE status = 'review' AND staging_approved = FALSE;

-- Track revision counts
-- SELECT business_name, revision_count, status FROM client_onboarding_professional WHERE revision_count > 0 ORDER BY revision_count DESC;

-- ========================================
-- Migration Notes
-- ========================================

-- This table is separate from the SMS-only onboarding table (client_onboarding)
-- Professional Package includes everything in SMS package PLUS custom website
-- File uploads (logos, photos) are handled via external storage (email for now, can be upgraded to S3/Supabase Storage later)
-- Arrays are used for multiple file URLs and alternative domains
-- Status workflow: submitted → in_progress → review → approved → live
