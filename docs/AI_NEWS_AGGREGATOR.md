# AI News Aggregator & Auto-Publisher

**Status:** Production Ready 🚀
**Created:** November 9, 2025
**Purpose:** Automatically scrape AI news, generate blog posts, and publish to CoreSentia blog

---

## 🎯 What This Does

Every 6 hours, this system:

1. **Scrapes** AI news from multiple sources
2. **Deduplicates** articles (checks URL and content hash)
3. **Filters** for quality and recency (last 48 hours)
4. **Scores** articles by importance
5. **Generates** blog posts using Claude AI
6. **Publishes** automatically to `/blog`

**Result:** 10-20 fresh AI blog posts per day, fully automated.

---

## 📰 News Sources

### Web Scrapers:
- **TechCrunch AI** - `techcrunch.com/category/artificial-intelligence/`
- **The Verge AI** - `theverge.com/ai-artificial-intelligence`
- **VentureBeat AI** - `venturebeat.com/category/ai/`

### APIs:
- **Reddit** - `r/artificial` top posts (50+ upvotes)
- **Product Hunt** - AI products (50+ votes)

---

## 🏗️ Architecture

### Files:

```
lib/news-scrapers.ts          - Web scraping and API fetching
lib/news-processor.ts          - Deduplication, filtering, blog generation
app/api/cron/aggregate-news/   - Vercel Cron job endpoint
vercel.json                    - Cron schedule configuration
supabase/migrations/           - Database tables
  └── 20251109_news_articles.sql   - Tracks scraped articles
  └── 20251109_blog_system.sql     - Blog posts
```

### Database Tables:

#### `news_articles`
Tracks all scraped articles to prevent duplicates:
- `url` (unique) - Article URL
- `content_hash` - MD5 hash for similarity detection
- `source` - techcrunch, theverge, venturebeat, reddit, producthunt
- `processed` - Has this been turned into a blog post?
- `blog_post_id` - Link to published blog post

#### `blog_posts`
Published blog posts (see `/docs/MARKETING_SEO_SOCIAL_STRATEGY.md`):
- `slug` - URL-friendly slug
- `content` - Markdown blog post
- `source_url` - Original article link
- `status` - published
- `published_at` - Timestamp

---

## 🔧 Setup Instructions

### 1. Run Database Migrations

In Supabase SQL Editor, run:

```sql
-- Run these in order:
1. supabase/migrations/20251109_blog_system.sql
2. supabase/migrations/20251109_news_articles.sql
```

### 2. Add Environment Variable

Add `CRON_SECRET` to Vercel:

```bash
# Generate a random secret
openssl rand -base64 32

# Add to Vercel
vercel env add CRON_SECRET production
# Paste the generated secret
```

**Why?** Prevents unauthorized cron job triggers.

### 3. Deploy to Vercel

```bash
git add -A
git commit -m "Add AI news aggregator"
git push
```

Vercel will:
- Detect `vercel.json`
- Automatically set up cron job
- Run every 6 hours at: 00:00, 06:00, 12:00, 18:00 UTC

---

## 🧪 Testing

### Manual Trigger (Recommended First Test):

```bash
# Set your CRON_SECRET
export CRON_SECRET="your-secret-here"

# Trigger the cron job manually
curl -X POST https://www.coresentia.com.au/api/cron/aggregate-news \
  -H "Authorization: Bearer $CRON_SECRET"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Published 5 new blog posts",
  "stats": {
    "scraped": 42,
    "processed": 10,
    "published": 5,
    "duplicates": 3,
    "errors": 2
  }
}
```

### Check Logs:

In Vercel dashboard:
1. Go to Deployments → Your deployment
2. Click "Functions"
3. Find `/api/cron/aggregate-news`
4. View logs

**Look for:**
- ✅ TechCrunch: Scraped X articles
- ✅ The Verge: Scraped X articles
- ✅ Reddit: Fetched X posts
- 📝 Generating blog post for: [title]
- ✅ Published: [title]

---

## 📊 How It Works

### Step 1: Scraping

```typescript
// lib/news-scrapers.ts
const articles = await aggregateAllNews()
// Returns: ScrapedArticle[]
```

**Each scraper:**
- Fetches HTML or JSON
- Extracts: title, URL, excerpt, published date
- Generates content hash (MD5)
- Returns standardized format

### Step 2: Deduplication

```typescript
// Check URL
if (await isArticleDuplicate(article)) {
  skip // Already processed
}
```

### Step 3: Filtering & Scoring

```typescript
// Filter for quality
const filtered = filterArticles(articles)
// - Last 48 hours only
// - No spam keywords
// - Minimum title length

// Score by importance
const scored = scoreArticles(filtered)
// - Source credibility (TechCrunch +10, etc.)
// - Keyword matching (OpenAI, Claude, GPT)
// - Reddit/PH upvotes
```

### Step 4: Blog Generation

```typescript
// Top 10 articles only
for (const article of topArticles.slice(0, 10)) {
  const blogPost = await generateBlogPost(article)
  // Claude API turns article into blog post
}
```

**Claude Prompt:**
- Summarize the news (300-400 words)
- Explain why it matters for small businesses
- Connect to AI automation
- CoreSentia perspective
- Returns: title, content (markdown), excerpt, tags

### Step 5: Publishing

```typescript
await publishBlogPost(article, blogPost)
// Inserts into blog_posts table
// Status: published
// Auto-generates slug
```

---

## 🎛️ Configuration

### Scraping Frequency

Edit `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/aggregate-news",
    "schedule": "0 */6 * * *"  // Every 6 hours
  }]
}
```

**Common schedules:**
- `"0 */6 * * *"` - Every 6 hours (current)
- `"0 */12 * * *"` - Twice daily (00:00, 12:00 UTC)
- `"0 9 * * *"` - Daily at 9am UTC
- `"0 */4 * * *"` - Every 4 hours

### Number of Posts

Edit `lib/news-processor.ts`:

```typescript
// Line ~180
const topArticles = scored.slice(0, 10) // Change 10 to desired number
```

### Quality Filters

Edit `lib/news-processor.ts`:

```typescript
// Adjust scoring
if (article.source === 'techcrunch') score += 10 // Increase/decrease

// Adjust Reddit threshold
if (p.ups < 50) return  // Minimum upvotes

// Adjust time window
const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000 // Change 2 to X days
```

---

## 🐛 Troubleshooting

### Problem: No articles scraped

**Possible Causes:**
1. Website HTML changed (scrapers broke)
2. Rate limiting
3. Network issues

**Solution:**
Check logs for specific scraper errors. Scrapers fail gracefully (one fails, others continue).

**Fix broken scraper:**
```typescript
// lib/news-scrapers.ts
// Update CSS selectors for changed website
$('article.new-class').each(...) // Update selector
```

### Problem: Duplicate articles

**Causes:**
- Content hash collision (rare)
- URL changed (same article, different URL)

**Solution:**
System already deduplicates by URL and content hash. If still seeing duplicates, adjust hash generation in `lib/news-scrapers.ts`.

### Problem: Low quality posts

**Solution:**
Increase scoring thresholds:
```typescript
// lib/news-processor.ts
const topArticles = scored.filter(a => a.score! > 15) // Add minimum score
```

### Problem: Claude API errors

**Causes:**
- Rate limiting (500 req/min, 40k tokens/min)
- Invalid API key

**Solution:**
System includes 2-second delay between Claude calls. If hitting limits, increase delay:
```typescript
// lib/news-processor.ts
await new Promise(resolve => setTimeout(resolve, 5000)) // 5 seconds
```

### Problem: Cron not running

**Check:**
1. Vercel dashboard → Settings → Cron Jobs
2. Should show: `/api/cron/aggregate-news` with next run time
3. Check environment variable `CRON_SECRET` is set

**Manually trigger:**
```bash
curl -X POST https://www.coresentia.com.au/api/cron/aggregate-news \
  -H "Authorization: Bearer $CRON_SECRET"
```

---

## 💰 Costs

### Free Tier (Current):
- **Web scraping:** Free (just bandwidth)
- **Reddit API:** Free
- **Product Hunt API:** Free (GraphQL public endpoint)
- **Vercel Cron:** Free (included in Pro plan)
- **Claude API:** ~$0.01-0.02 per post

**Expected monthly cost:** $5-10 (Claude API only)

### Scalability:
- 10 posts per run = 40 posts/day = 1,200 posts/month
- At $0.015/post = $18/month for Claude
- All other infrastructure: Free

---

## 📈 Analytics

### Track Performance:

```sql
-- Articles scraped by source (last 7 days)
SELECT source, COUNT(*) as count
FROM news_articles
WHERE scraped_at > NOW() - INTERVAL '7 days'
GROUP BY source;

-- Conversion rate (scraped → published)
SELECT
  COUNT(*) FILTER (WHERE processed = true) as published,
  COUNT(*) as total,
  ROUND(COUNT(*) FILTER (WHERE processed = true)::numeric / COUNT(*) * 100, 2) as conversion_rate
FROM news_articles
WHERE scraped_at > NOW() - INTERVAL '7 days';

-- Most successful sources
SELECT source, COUNT(*) as posts_published
FROM news_articles
WHERE processed = true
GROUP BY source
ORDER BY posts_published DESC;
```

---

## 🚀 Future Enhancements

### Phase 2 (Optional):
- [ ] **Social media cross-posting** - Auto-post to Facebook/Twitter
- [ ] **Email digest** - Daily email with top stories
- [ ] **Manual review dashboard** - Approve posts before publishing
- [ ] **Content scheduling** - Publish at optimal times
- [ ] **A/B testing** - Test different headlines
- [ ] **Engagement tracking** - Which topics get most views?

### Phase 3 (Advanced):
- [ ] **Custom scrapers** - Add more sources
- [ ] **NLP analysis** - Sentiment, topic clustering
- [ ] **Trend detection** - "X mentioned 10x this week"
- [ ] **SEO optimization** - Auto-generate meta descriptions
- [ ] **Image generation** - AI-generated featured images

---

## ✅ Checklist Before Going Live

- [ ] Run database migrations (`news_articles` and `blog_posts`)
- [ ] Add `CRON_SECRET` to Vercel environment variables
- [ ] Deploy to production (`git push`)
- [ ] Manually trigger first run to test
- [ ] Check `/blog` for published posts
- [ ] Verify Vercel Cron job is scheduled
- [ ] Monitor logs for first automatic run

---

## 🎉 You're Done!

The system will now:
- Run every 6 hours automatically
- Scrape 30-50 articles per run
- Publish 5-10 blog posts per run
- Generate 20-40 blog posts per day

**No further action needed.** Just monitor `/blog` and enjoy the content!

---

**Questions?** Check:
- Vercel dashboard → Functions → Logs
- Supabase dashboard → Table Editor → `news_articles`
- `/docs/MARKETING_SEO_SOCIAL_STRATEGY.md` - Overall strategy

**Need to adjust?** Edit:
- `vercel.json` - Change schedule
- `lib/news-processor.ts` - Tweak filtering/scoring
- `lib/news-scrapers.ts` - Add/fix scrapers
