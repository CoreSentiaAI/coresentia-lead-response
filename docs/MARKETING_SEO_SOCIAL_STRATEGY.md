# CoreSentia Marketing, SEO & Social Media Strategy

**Phase:** Marketing & Brand Visibility
**Started:** November 9, 2025
**Status:** Planning & Implementation
**Goal:** Establish CoreSentia as the AI industry expert for Australian service businesses

---

## 🎯 Primary Objectives

### 1. **SEO: Fix Google Discoverability**
**Problem:** Searching "CoreSentia" shows "Coresental" (different company)
**Goal:** Own the first page of Google for "CoreSentia" and related terms

### 2. **Content Authority**
**Goal:** Position CoreSentia as AI industry thought leader
**Strategy:** Regular content showing expertise in AI, automation, and local business technology

### 3. **Social Media Presence**
**Assets:** Facebook page ✅ | Twitter/X account ✅
**Goal:** Consistent posting schedule with valuable content

### 4. **Automated Content Pipeline**
**Vision:** AI-powered news aggregation → blog posts → social media distribution

---

## 🔍 SEO IMMEDIATE FIXES

### Critical SEO Issues to Address:

#### 1. **Google Search Console Setup**
- [ ] Verify ownership of coresentia.com.au
- [ ] Submit sitemap
- [ ] Request indexing for key pages
- [ ] Monitor search performance

#### 2. **Schema Markup (Structured Data)**
- [ ] Add LocalBusiness schema
- [ ] Add Organization schema
- [ ] Add Product schema (SMS Responder, Professional Package)
- [ ] Add FAQ schema

#### 3. **Content Optimization**
- [ ] Add blog/news section to website
- [ ] Create "About Us" content (currently minimal)
- [ ] Add case studies section (when you have clients)
- [ ] Create landing pages for key terms:
  - "AI receptionist Australia"
  - "SMS automation for tradies"
  - "AI booking system Australia"

#### 4. **Technical SEO**
- [ ] Add meta descriptions to all pages
- [ ] Optimize title tags
- [ ] Add Open Graph tags for social sharing
- [ ] Create XML sitemap
- [ ] Add robots.txt
- [ ] Implement canonical URLs

#### 5. **Backlinks & Citations**
- [ ] List on Google My Business ⚠️ CRITICAL
- [ ] Australian business directories
- [ ] Tech/AI product directories
- [ ] Industry forums and communities

---

## 📰 BLOG/NEWS SYSTEM ARCHITECTURE

### Option 1: Manual Blog (Quick Start)
**Timeline:** 1-2 hours to implement
**Tech Stack:** Next.js + MDX files
**Content:** You write posts manually
**Pros:** Full control, high quality
**Cons:** Time-consuming

### Option 2: Semi-Automated (Recommended)
**Timeline:** 4-6 hours to implement
**Architecture:**
1. **RSS Aggregator** - Monitors AI news sources
2. **Content Curator** - Claude AI filters relevant articles
3. **Draft Generator** - Creates blog post drafts with your perspective
4. **Human Review** - You approve/edit before publishing
5. **Auto-Publish** - Scheduled publishing

**Tech Stack:**
- RSS feed parser (TechCrunch, VentureBeat, AI news sites)
- Claude API for content curation and generation
- Supabase for storing drafts
- Next.js blog pages (dynamic routes)
- Social media APIs for cross-posting

**Pros:** Scalable, consistent, maintains quality
**Cons:** Requires more upfront dev work

### Option 3: Fully Automated (Future)
**Timeline:** 2-3 weeks
**Similar to Option 2 but auto-publishes without review**
**Concern:** Risk of low-quality or off-brand content

---

## 📝 CONTENT STRATEGY

### Content Pillars:

#### 1. **AI Industry News & Trends**
**Frequency:** 2-3x per week
**Format:**
- Short summary of AI news
- Your take on how it affects Australian small businesses
- Call-to-action linking to CoreSentia services

**Example Topics:**
- "OpenAI releases new GPT model - what this means for tradie automation"
- "Google announces AI phone assistant - why SMS-first still wins for tradies"
- "AI chatbot market grows 40% - here's why Australian businesses are behind"

#### 2. **How-To Guides & Tips**
**Frequency:** 1x per week
**Format:** Educational content for your target market

**Example Topics:**
- "5 signs you're missing leads (and how AI fixes it)"
- "How to set up Google My Business to capture more customers"
- "Why tradies should care about SMS automation"

#### 3. **Case Studies & Success Stories**
**Frequency:** When you have them
**Format:** Before/after, results-driven

**Example:**
- "How [Tradie Name] went from missing 60% of leads to capturing 95%"

#### 4. **Product Updates**
**Frequency:** As needed
**Format:** Announcements, new features, improvements

---

## 📱 SOCIAL MEDIA STRATEGY

### Platform-Specific Approach:

#### **Facebook** (Primary for Tradies)
**Target:** Australian tradies, small business owners
**Posting Frequency:** 5x per week
**Content Mix:**
- 40% Industry news & trends (shared from blog)
- 30% Educational tips & how-tos
- 20% Product highlights & testimonials
- 10% Engagement posts (questions, polls)

**Tone:** Helpful, straightforward, no corporate BS

#### **Twitter/X** (Tech & AI Audience)
**Target:** Tech community, AI enthusiasts, journalists
**Posting Frequency:** Daily (can be automated)
**Content Mix:**
- 50% Industry commentary & news
- 30% Product updates & features
- 20% Engagement with AI community

**Tone:** Expert, informed, thought leader

#### **LinkedIn** (Future - Recommended)
**Target:** Business owners, decision makers
**Posting Frequency:** 3x per week
**Content Mix:**
- Long-form thought leadership
- Success stories
- Business insights

---

## 🤖 AUTOMATION SYSTEM PROPOSAL

### "CoreSentia Content Engine"

#### **Phase 1: RSS News Aggregator**
**What it does:**
- Monitors 10-15 AI/tech news sources via RSS
- Filters for relevant articles (AI, automation, small business, Australia)
- Stores in Supabase with metadata

**Sources:**
- TechCrunch AI section
- VentureBeat AI
- The Verge AI
- Australian tech blogs
- AI product launches (Product Hunt)

#### **Phase 2: Content Generator**
**What it does:**
- Takes filtered news articles
- Uses Claude API to:
  - Summarize the article
  - Add CoreSentia's perspective
  - Tie back to Australian small business context
  - Generate blog post draft (300-500 words)
  - Create 3 social media variants (Facebook, Twitter, LinkedIn)

**Human-in-Loop:**
- Drafts saved to admin dashboard
- You review, edit, approve
- One-click publish to blog + socials

#### **Phase 3: Auto-Distribution**
**What it does:**
- Publishes approved content to blog
- Cross-posts to Facebook, Twitter
- Schedules posts for optimal times
- Tracks engagement metrics

---

## 🛠️ TECHNICAL IMPLEMENTATION PLAN

### Immediate (Today/Tomorrow):

1. **Add Blog Infrastructure**
   - [ ] Create `/blog` route in Next.js
   - [ ] Create `/blog/[slug]` dynamic route
   - [ ] Create `/api/blog` CRUD endpoints
   - [ ] Add blog posts table to Supabase
   - [ ] Create simple blog post editor in admin

2. **SEO Foundations**
   - [ ] Add meta tags to all pages
   - [ ] Create sitemap.xml
   - [ ] Add robots.txt
   - [ ] Set up Google Search Console
   - [ ] Submit for indexing

3. **Social Sharing**
   - [ ] Add Open Graph meta tags
   - [ ] Add Twitter Card meta tags
   - [ ] Add social sharing buttons to blog posts

### Week 1:

4. **RSS Aggregator**
   - [ ] Build RSS feed parser
   - [ ] Add news sources
   - [ ] Create curation filters
   - [ ] Store in Supabase

5. **Content Generator**
   - [ ] Integrate Claude API for content generation
   - [ ] Create prompt templates for blog posts
   - [ ] Create prompt templates for social posts
   - [ ] Build review interface in admin

### Week 2:

6. **Social Media Integration**
   - [ ] Facebook API integration
   - [ ] Twitter API integration
   - [ ] Scheduling system
   - [ ] Cross-posting functionality

7. **Analytics**
   - [ ] Blog post view tracking
   - [ ] Social engagement tracking
   - [ ] SEO ranking monitoring

---

## 📊 SUCCESS METRICS

### SEO Goals (3 months):
- [ ] Rank #1 for "CoreSentia" on Google
- [ ] Rank in top 10 for "AI receptionist Australia"
- [ ] 500+ monthly organic visitors
- [ ] Domain Authority score of 20+

### Content Goals (3 months):
- [ ] 30+ blog posts published
- [ ] 100+ social media posts
- [ ] 500+ social media followers combined
- [ ] 1,000+ blog page views

### Business Goals (3 months):
- [ ] 10+ leads from organic search
- [ ] 5+ leads from social media
- [ ] First client success story published

---

## 💰 BUDGET CONSIDERATIONS

### Free/Low Cost:
- Google Search Console (Free)
- Facebook posting (Free)
- Twitter posting (Free)
- RSS feed parsing (Free)
- Claude API for content (~$20-50/month)

### Paid Options (Optional):
- Google My Business ads ($100-300/month)
- Facebook ads ($200-500/month)
- SEO tools (Ahrefs/SEMrush ~$99/month)
- Social media scheduling (Buffer/Hootsuite ~$15/month)

**Recommended Start:** Free tools + Claude API only

---

## 🎯 PRIORITY ACTION ITEMS

### This Week:
1. ✅ Set up Google Search Console
2. ✅ Create Google My Business listing
3. ✅ Add blog infrastructure to website
4. ✅ Write first 3 blog posts (or generate with AI)
5. ✅ Add SEO meta tags
6. ✅ Submit sitemap

### Next Week:
1. Build RSS news aggregator
2. Integrate Claude for content generation
3. Set up social media cross-posting
4. Publish 5 blog posts
5. Post daily on Facebook/Twitter

---

## 🤔 DECISION POINTS

**I need your input on:**

1. **Blog Automation Level:**
   - Manual (you write everything)
   - Semi-automated (AI drafts, you approve)
   - Fully automated (risky for brand)

2. **Content Focus:**
   - AI industry news (thought leader)
   - Practical tips for tradies (helpful expert)
   - Mix of both

3. **Publishing Frequency:**
   - Daily blog posts (aggressive, needs automation)
   - 2-3x per week (sustainable manually)
   - Weekly (conservative start)

4. **Social Media Priority:**
   - Facebook only (focus on tradies)
   - Facebook + Twitter (broader reach)
   - Add LinkedIn too (B2B focus)

5. **First Blog Posts:**
   - Should I write the first 3-5 posts now?
   - Build automation first, then generate?
   - Mix: You write 1-2, I build automation for rest?

---

## 🚀 LET'S START!

**What would you like to tackle first?**

Option A: **Quick Wins** - Add blog infrastructure + write first 3 posts manually (2-3 hours)
Option B: **Build Automation** - RSS aggregator + content generator (4-6 hours)
Option C: **SEO Foundations** - Meta tags, Search Console, sitemap (1-2 hours)
Option D: **All of the Above** - Comprehensive build (full session)

**Tell me:**
1. Which option sounds best?
2. What's your preferred automation level?
3. Do you want to review/edit AI-generated content, or fully auto-publish?
4. What AI news sources do you already follow?

Let's build this! 🎨
