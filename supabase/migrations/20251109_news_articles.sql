-- News Articles Table
-- Tracks scraped articles to prevent duplicates and store original content

CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Article Details
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  source TEXT NOT NULL, -- 'techcrunch', 'theverge', 'venturebeat', 'reddit', 'producthunt'

  -- Publishing
  published_at TIMESTAMPTZ NOT NULL,

  -- Deduplication
  content_hash TEXT, -- MD5 hash of title + excerpt for similarity detection

  -- Processing Status
  processed BOOLEAN DEFAULT FALSE, -- Has this been turned into a blog post?
  blog_post_id UUID REFERENCES blog_posts(id),

  -- Quality Signals (for filtering)
  score INTEGER DEFAULT 0, -- Reddit upvotes, or manual quality score

  -- Timestamps
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_news_articles_url ON news_articles(url);
CREATE INDEX IF NOT EXISTS idx_news_articles_content_hash ON news_articles(content_hash);
CREATE INDEX IF NOT EXISTS idx_news_articles_processed ON news_articles(processed);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_source ON news_articles(source);

-- Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Public can't read news_articles (internal only)
-- Only service role can access
CREATE POLICY "Service role can do everything"
  ON news_articles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON news_articles TO service_role;

COMMENT ON TABLE news_articles IS 'Tracks scraped AI news articles for deduplication and blog post generation';
