-- Blog Posts Table
-- Stores blog articles for SEO and content marketing

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'CoreSentia',

  -- SEO
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,

  -- Categorization
  category TEXT NOT NULL DEFAULT 'news', -- news, guide, case-study, product-update
  tags TEXT[],

  -- Source tracking (for automated content)
  source_url TEXT, -- Original article URL if aggregated
  source_name TEXT, -- e.g., "TechCrunch", "VentureBeat"

  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft', -- draft, review, published, archived
  published_at TIMESTAMPTZ,

  -- Engagement
  view_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published' AND published_at IS NOT NULL);

-- Admin can do everything (will be configured with service key)
CREATE POLICY "Service role can do everything"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON blog_posts TO anon;
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON blog_posts TO service_role;

-- Sample seed data (can be removed after first real post)
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  meta_description,
  status,
  published_at
) VALUES (
  'Welcome to CoreSentia - AI Receptionists for Australian Businesses',
  'welcome-to-coresentia',
  'Introducing CoreSentia: Never miss a lead again with our 24/7 AI-powered SMS and web chat receptionist built specifically for Australian tradies and service businesses.',
  E'# Welcome to CoreSentia\n\nWe''re excited to introduce CoreSentia, Australia''s first AI receptionist designed specifically for tradies and service businesses.\n\n## The Problem\n\nEvery day, thousands of Australian small businesses miss leads because:\n- They can''t answer calls while on job sites\n- Weekend inquiries go unanswered\n- After-hours messages pile up\n- Manual booking takes too much time\n\n## Our Solution\n\nCoreSentia provides 24/7 AI-powered SMS and web chat that:\n- **Responds instantly** to every customer inquiry\n- **Qualifies leads** automatically\n- **Books appointments** into your calendar\n- **Captures contact details** so you never lose a potential customer\n\n## Built for Australian Businesses\n\n- GST-inclusive pricing\n- Australian phone numbers\n- No overseas call centers\n- Local support\n- Understands Aussie slang and business culture\n\n## Two Packages\n\n**SMS Responder** ($499 + $150/month) - Perfect if you already have a website\n\n**Professional Package** ($2,500 + $250/month) - Includes a complete website build\n\nBoth include up to 500 SMS per month.\n\n## Get Started\n\nReady to stop missing leads? Visit [coresentia.com.au](https://www.coresentia.com.au) or text us at +61 489 087 491.\n\nWelcome to the future of small business customer service.',
  'product-update',
  ARRAY['announcement', 'launch', 'AI receptionist', 'tradies'],
  'Introducing CoreSentia: 24/7 AI-powered SMS and web chat for Australian tradies and service businesses. Never miss a lead again.',
  'published',
  NOW()
);

COMMENT ON TABLE blog_posts IS 'Blog articles for SEO, thought leadership, and content marketing';
