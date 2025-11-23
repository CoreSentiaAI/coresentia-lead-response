-- Voice Call Sessions Table
-- Stores conversation state for active phone calls
-- TTL: 1 hour (sessions auto-expire)

CREATE TABLE IF NOT EXISTS voice_call_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_sid TEXT UNIQUE NOT NULL,
  business_id UUID,
  customer_phone TEXT,
  conversation_history JSONB DEFAULT '[]',
  customer_data JSONB DEFAULT '{}',
  booking_state JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active', -- active, completed, failed
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_voice_sessions_call_sid ON voice_call_sessions(call_sid);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_expires ON voice_call_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_business ON voice_call_sessions(business_id);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_status ON voice_call_sessions(status);

-- Add source column to leads table to track voice/sms/webchat origin
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'sms';

COMMENT ON COLUMN leads.source IS 'Lead origin: sms, webchat, or voice';
COMMENT ON TABLE voice_call_sessions IS 'Temporary storage for active phone call conversations with 1-hour TTL';
