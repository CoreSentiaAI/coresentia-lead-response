# CoreSentia Project Status

**Last Updated:** November 25, 2025 (Voice Feature Planning + UX Polish)
**Current Phase:** Phase 1 COMPLETE + Marketing/SEO Active + Design Excellence ✅
**Live URL:** https://www.coresentia.com.au
**Live SMS:** +61 489 087 491
**Blog:** https://www.coresentia.com.au/blog
**Deployment:** Vercel (CLI integrated, auto-deploy via GitHub)
**Design Process:** Claude Code + **Gemini 3.0 Flash** (added Nov 23, 2025)

---

## 🎯 Quick Context

**What This Is:**
CoreSentia is an **AI Automation Agency** building custom AI solutions for Australian small businesses. Our first product: AI-powered SMS + web chat system for tradies/service businesses.

**Current Products:**
1. **SMS Responder** - $499 setup + $150/month (with existing website)
2. **Professional Package** - $2,500 setup + $250/month (includes website build)

**Two-Bot System:**
1. **Sales Bot** (+61489087491) - Sells CoreSentia subscriptions
2. **Client Bot** (multi-tenant) - Books appointments for your clients' customers

**Tech Stack:** Next.js 13, TypeScript, Tailwind, Supabase, Twilio, Anthropic Claude, Vercel Cron

---

## ✅ What's Working (Nov 9, 2025 - Latest)

### Core Features - Production Ready
- [x] Website with pricing at coresentia.com.au
- [x] **AI Bot phone number prominently displayed** (+61 489 087 491) - 3 CTA locations
- [x] Web chat interface (homepage-visitor route)
- [x] SMS integration LIVE with Twilio webhook
- [x] Bulletproof dual-layer notification system (LLM + rule-based fallback)
- [x] 100% reliable SMS alerts to admin (with audit logging)
- [x] Lead capture & tracking (SMS + web)
- [x] Admin dashboard at /admin with conversation history
- [x] Two-bot routing system (sales vs client)

### Marketing & SEO - LIVE (Nov 9 Evening) 🎉
- [x] **Blog system with markdown rendering** at /blog
- [x] **AI News Aggregator fully deployed and automated:**
  - Scrapes: TechCrunch, The Verge, VentureBeat AI sections
  - Fetches: Reddit r/artificial (top daily posts)
  - Fetches: Product Hunt (AI products)
  - Runs every 6 hours via Vercel Cron (0 */6 * * *)
  - Deduplicates by URL and content hash
  - Filters for quality (48hr recency, engagement, credibility)
  - Scores and ranks by importance
  - Generates blog posts with Claude AI (300-400 words)
  - Auto-publishes top 10 articles
  - Expected: 20-40 high-quality posts per day
- [x] **Blog positioning:** "Welcome to CoreSentia - Australia's AI Automation Agency"
- [x] SEO-optimized blog posts with proper meta tags
- [x] **Cron endpoint secured** with Vercel User-Agent authentication
- [x] Manual trigger available: `curl -X POST .../api/cron/aggregate-news -H "User-Agent: vercel-cron/1.0"`
- [x] Database tracking: `news_articles` table for deduplication, `blog_posts` for published content
- [x] Comprehensive documentation at `docs/AI_NEWS_AGGREGATOR.md`

### Client Onboarding - Complete
- [x] SMS Responder onboarding form at /onboarding (optional setup calls)
- [x] Professional Package onboarding form at /onboarding-professional
- [x] Comprehensive 9-section form (branding, website design, domain setup)
- [x] Complete email template suite (Emails 2a, 4, 5a, 6)
- [x] Database schema for tracking builds, logos, revisions
- [x] 10 working day timeline for Professional Package builds

### Deployment & DevOps - Complete
- [x] Vercel CLI installed and authenticated
- [x] All environment variables configured:
  - Twilio SMS credentials (Account SID, Auth Token, Phone Number)
  - Admin phone number for notifications
  - Anthropic API key for AI
  - Supabase credentials (URL, Anon Key, **Service Role Key** - fixed!)
  - CRON_SECRET for Vercel Cron authentication
- [x] Production deployment successful
- [x] Custom domains configured (coresentia.com.au, coresentia.com)
- [x] SSL certificates active
- [x] GitHub auto-deploy to Vercel working

### Recent Work (Nov 23 Session - Design Excellence)
- [x] **MAJOR: Integrated Gemini 3.0 Flash into design workflow** 🎨
  - Gemini now collaborates with Claude Code on UI/UX design
  - Workflow: Gemini creates mockups → Claude implements with accurate content
  - Best of both worlds: Gemini's design aesthetic + Claude's technical precision
- [x] **Fixed misleading auto-booking claims across homepage:**
  - BEFORE: "Auto-booked to Calendar", "Auto-Booking Enabled", "Booking Confirmed"
  - AFTER: "Ready to confirm", "One-Tap Confirmation", "Booking Requested"
  - Accurately reflects PENDING booking workflow (business owner confirms manually)
  - Updated 10+ locations: hero chat mockup, bento cards, how-it-works, packages, etc.
  - All messaging now emphasizes: "AI pencils in → SMS to owner → Owner confirms → Customer notified"
- [x] **Enhanced logo presence:**
  - Increased logo size by 40% (h-20 → h-28, ~112px height)
  - Combined with updated logo file featuring heavier font weight
  - Much stronger brand presence in header
- [x] **Fixed chat mockup visual bug:**
  - "Booking Requested" card was cut off behind input field
  - Increased chat area: pb-20 → pb-32, h-400 → h-450
  - Card now fully visible with proper spacing
- [x] **Integrated Gemini's beautiful timeline design ("The Process"):**
  - Interactive 3-step zigzag timeline with pulsing markers
  - Step 1: SMS notification card visual
  - Step 2: Chat conversation showing PENDING workflow
  - Step 3: Mobile confirmation card ("Approve & Notify" button)
  - Alternating left/right layout (desktop) with hover animations
  - Stats footer: 24/7, <10s, 2 sec metrics
  - Added CSS: @keyframes pulseRing for timeline markers
- [x] **Enhanced pricing section design:**
  - Cleaner, more modern card aesthetic (Gemini's design)
  - SMS Responder: Simple white card with green checkmarks
  - Professional Package: Floating "Most Popular" badge, elevated card design, gradient CTA
  - Preserved ALL detailed feature descriptions (our superior content)
  - Better visual hierarchy, typography, spacing
- [x] **All changes maintain brand consistency:**
  - Montserrat for headings (H1-H6)
  - Accurate PENDING booking workflow throughout
  - CoreSentia brand colors (#2A50DF, #1099E7, #62D4F9)

### Recent Work (Nov 25 Session - UX Polish + Voice Planning)
- [x] **Major UX improvements based on user feedback:**
  - Reduced ALL section spacing by 50% (py-24 → py-12) for tighter layout
  - Trust strip: py-8 → py-4 (less wasted space)
  - Result: More content above fold, faster mobile scroll to pricing
- [x] **Pricing cards now symmetrical with equal visual weight:**
  - SMS Responder: Added "Quick Start" badge, royal blue border-2, shadow-xl, gradient button
  - Professional: Removed elevation offset, now same height as SMS Responder
  - Both cards: items-stretch + flex-col = exactly same height
  - $499 product no longer looks "lesser" - equal prominence
- [x] **Created mobile-optimized tabbed interfaces:**
  - ProblemTabs component: "Sound familiar?" section now has 3 clickable tabs (Missing Calls, Slow Responses, Phone Tag)
  - TimelineTabs component: "The Process" section now has 3 step tabs (01, 02, 03)
  - Massive scroll reduction on mobile - users reach pricing ~50% faster
  - Desktop: Maintains beautiful side-by-side layouts
- [x] **Extended hero background throughout entire page:**
  - Dot grid + glowing orbs now cover full page height
  - Added 4 orbs at different scroll positions for coverage
  - Unified white canvas with subtle depth everywhere
- [x] **Voice feature architecture planned:**
  - Created comprehensive VOICE_IMPLEMENTATION_PLAN.md
  - Selected Google Cloud Neural TTS via Twilio (best balance)
  - Ready to build: 2-3 day implementation estimate
  - Will add AI voice answering to both packages

### Previous Work (Nov 9 Evening Session)
- [x] **Fixed blog system database migration** (blog_posts, news_articles tables)
- [x] **Built complete AI News Aggregator** (5 sources, 6-hour cron, Claude generation)
- [x] **Fixed environment variable bug:** SUPABASE_SERVICE_KEY → SUPABASE_SERVICE_ROLE_KEY
- [x] **Added phone number CTAs** throughout homepage (+61 489 087 491)

---

## 🔧 Key Files to Know

**Bot & Chat:**
- `/app/api/chat/route.ts` - Main chat engine (lines 6-430 = ASSISTANT_SYSTEM_PROMPT)
- `/lib/bot-prompts.ts` - Sales vs Client bot prompts

**Notifications:**
- `/lib/notifications.ts` - SMS notification handler
- `/lib/twilio.ts` - Twilio SMS functions

**Blog & News Aggregator (NEW):**
- `/lib/news-scrapers.ts` - Web scraping (TechCrunch, Verge, VentureBeat, Reddit, Product Hunt)
- `/lib/news-processor.ts` - Deduplication, filtering, Claude generation, publishing
- `/app/api/cron/aggregate-news/route.ts` - Vercel Cron endpoint (every 6 hours)
- `/app/blog/[slug]/page.tsx` - Dynamic blog post pages
- `/app/blog/components/MarkdownRenderer.tsx` - Client-side markdown rendering
- `/vercel.json` - Cron schedule configuration
- `/docs/AI_NEWS_AGGREGATOR.md` - Complete documentation

**Lead Management:**
- `/app/admin/page.tsx` - Admin dashboard
- `/app/api/admin/leads/route.ts` - Lead API

**Onboarding:**
- `/app/onboarding/page.tsx` - SMS Responder form
- `/app/onboarding-professional/page.tsx` - Professional Package form
- `/app/api/onboarding/route.ts` - SMS Responder handler
- `/app/api/onboarding-professional/route.ts` - Professional Package handler

**Database:**
- Supabase (PostgreSQL)
- Tables: leads, bookings, business_phones, businesses, client_onboarding, client_onboarding_professional, **blog_posts** (NEW), **news_articles** (NEW)

---

## 🚀 What's Next (Phase 2)

**Marketing & Growth (In Progress):**
- [x] Blog system deployed and automated
- [ ] Google Search Console verification and sitemap submission
- [ ] Social media integration (auto-post blog articles)
- [ ] SEO optimization based on analytics
- [ ] Email newsletter integration

**🎙️ VOICE CALL FEATURE (HIGH PRIORITY - In Progress Nov 25):**
- [ ] Add AI voice answering to both SMS Responder and Professional packages
- [ ] Natural conversation handling (not robotic menu system)
- [ ] Same qualifying/booking logic as SMS flow
- [ ] Google Cloud Neural TTS via Twilio (Australian accent)
- [ ] Call recording for quality/training
- [ ] 24/7 operation with "take a message" fallback
- [ ] Cost: ~$0.10/min (~$30/month for 100 calls)
- [ ] **See VOICE_IMPLEMENTATION_PLAN.md for full technical details**
- [ ] Status: Architecture finalized, ready to build

**Client Product Development (Not Started):**
- [ ] Multi-business architecture (multi-tenant client bot system)
- [ ] Business profile management
- [ ] Website builder automation (for Professional Package delivery)
- [ ] Per-client AI customization
- [ ] White-label dashboard for clients
- [ ] Automated staging site generation

**Professional Package Enhancements (Future):**
- [ ] Direct file uploads in onboarding form (logo, photos)
- [ ] Client portal for tracking build progress
- [ ] Design approval workflow with visual feedback
- [ ] Revision request system

---

## ⚠️ Known Issues / Technical Debt

**None Critical - System Stable**

**Minor:**
- Build warnings: React hooks exhaustive-deps (non-blocking)
- Supabase critical dependency warnings (library issue, not ours)
- Legacy `/api/quotes/generate` route exists but unused (can be deleted)
- News aggregator quality filters may need tuning after a few days of data

---

## 📋 Important Context for New Sessions

### AI News Aggregator How It Works
**Every 6 hours (Vercel Cron):**
1. Scrapes latest AI news from 5 sources
2. Filters for quality (48hr recency, 50+ upvotes, spam keywords)
3. Scores by importance (source credibility + keywords)
4. Selects top 10 articles
5. Checks for duplicates (URL + content hash)
6. Generates blog posts with Claude (CoreSentia perspective, 300-400 words)
7. Auto-publishes to /blog
8. Rate-limited: 2 seconds between Claude API calls

**Expected Output:** 20-40 high-quality AI news blog posts per day targeting keywords like:
- "AI receptionist Australia"
- "AI automation small business"
- "AI news tradies"
- "Artificial intelligence business automation"

### Two-Bot System (CRITICAL TO UNDERSTAND)
**Sales Bot (+61489087491):**
- Purpose: Acquire clients who want to BUY CoreSentia
- Talks about: $499 SMS Responder & $2,500 Professional Package
- Actions: GENERATE_QUOTE, BOOK_MEETING, HUMAN_HANDOFF
- Notifications: Send to YOUR phone (+61467723694)

**Client Bot (other numbers):**
- Purpose: Book appointments for YOUR CLIENTS' customers
- Talks about: Client's services (lawn mowing, haircuts, etc.)
- Actions: CREATE_BOOKING, CHECK_AVAILABILITY, client_human_handoff
- Notifications: Send to CLIENT'S phone

**Never confuse these two!** They serve completely different purposes.

### Environment Variables (Vercel)
Check these if issues arise:
- `ADMIN_PHONE` = +61467723694
- `TWILIO_ACCOUNT_SID` = ACxxxxxxxx
- `TWILIO_AUTH_TOKEN` = [hidden]
- `TWILIO_PHONE_NUMBER` = +61489087491
- `ANTHROPIC_API_KEY` = [hidden]
- `NEXT_PUBLIC_SUPABASE_URL` = [hidden]
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [hidden]
- `SUPABASE_SERVICE_ROLE_KEY` = [hidden] ⚠️ **NOT** SUPABASE_SERVICE_KEY!
- `CRON_SECRET` = [hidden] (for Vercel Cron authentication)

---

## 🐛 Debugging Tips

### Blog Posts Not Publishing?
1. Check Vercel cron logs: `vercel logs www.coresentia.com.au --since=6h`
2. Test manual trigger: `curl -X POST https://www.coresentia.com.au/api/cron/aggregate-news -H "User-Agent: vercel-cron/1.0"`
3. Check database: `news_articles` table for scraped content, `blog_posts` for published
4. Look for "No articles found" vs "Duplicates" vs "Errors" in response
5. Check scraper logs for fetch failures (403, 404, network errors)

### SMS Notifications Not Sending?
1. Check Vercel logs for "=== NOTIFY ADMIN CALLED ==="
2. Look for "❌ Twilio credentials not configured"
3. Check if fallback triggered: "⚠️ FALLBACK TRIGGERED"
4. Verify environment variables in Vercel dashboard

### Bot Not Capturing Data?
1. Check logs for "=== FALLBACK DETECTION AUDIT ==="
2. Look for "Has required data: false"
3. Check name extraction patterns in `/app/api/chat/route.ts:475`

---

## 📊 Metrics to Track

**Conversion Funnel:**
1. Homepage visitors → Chat starts
2. Chat starts → Email captured
3. Email captured → Quote generated
4. Quote generated → Deposit paid
5. Deposit paid → Go-live

**Blog Metrics (NEW):**
1. Articles published per day
2. Duplicate detection accuracy
3. Claude API success rate
4. Average blog post quality score
5. SEO traffic from blog posts (after 2-4 weeks)

**Drop-off Points to Watch:**
- Long bot responses (fixed with buying intent detection)
- Missing data in SMS alerts (fixed with better extraction)
- Notification failures (fixed with dual-layer system)

---

## 🎓 Lessons Learned (Latest Sessions)

### Gemini 3.0 as Design Collaborator (Nov 23) 🎨
**Discovery:** Gemini 3.0 Flash excels at modern UI/UX design patterns
**Workflow:**
1. Give Gemini context about our product and brand
2. Gemini creates beautiful HTML/CSS mockups
3. Claude Code implements with Next.js/React + accurate content
4. Result: Gemini's polished aesthetics + our precise messaging
**Key Insight:** Two-AI workflow beats single-AI approach - leverage each model's strengths

### Marketing Copy Must Match Reality (Nov 23)
**Problem:** Homepage claimed "auto-booking" but system requires manual confirmation
**Impact:** Misleading customers = broken trust = lower conversions
**Solution:** Global search for "auto" → updated 10+ locations to say "pending booking"
**Key Insight:** Always review marketing copy against actual codebase (lib/bot-prompts.ts, lib/notifications.ts)

### Visual Bugs Are Subtle But Critical (Nov 23)
**Problem:** "Booking Requested" card was 2/3 hidden behind input field
**Solution:** Increased padding-bottom (pb-20 → pb-32) + height (h-400 → h-450)
**Key Insight:** Always check designs at actual device widths - screenshots reveal UX issues

### Environment Variable Naming Matters (Nov 9)
**Problem:** Code used `SUPABASE_SERVICE_KEY` but Vercel had `SUPABASE_SERVICE_ROLE_KEY`
**Solution:** Global search/replace across all TypeScript files
**Key Insight:** Always verify exact env var names when setting up production

### Blog Post Positioning (Nov 9)
**Problem:** Original post positioned CoreSentia as just SMS/website provider
**Solution:** Rewrote to emphasize AI Automation Agency with broader vision
**Key Insight:** Positioning is critical - don't limit yourself to first products

---

## 🚀 Ready to Start?

**Quick Health Check:**
1. Visit: https://www.coresentia.com.au ✅
2. Test chat: /chat/homepage-visitor ✅
3. Check blog: /blog ✅
4. Check admin: /admin (requires auth) ✅
5. SMS test: Text +61489087491 ✅
6. Test cron: `curl -X POST .../api/cron/aggregate-news -H "User-Agent: vercel-cron/1.0"` ✅

**Common Tasks:**
- Update bot prompt: `/app/api/chat/route.ts` (ASSISTANT_SYSTEM_PROMPT)
- Check notifications: `/lib/notifications.ts`
- View leads: Supabase dashboard → leads table
- View blog posts: Supabase → blog_posts table
- View scraped articles: Supabase → news_articles table
- Deploy: `git push` (auto-deploys to Vercel)
- Manual deploy: `vercel --prod --yes`
- Check cron status: Vercel dashboard → Cron Jobs
- Test cron manually: See command above
- View cron logs: `vercel logs www.coresentia.com.au --since=6h`

**Latest Git Commits (Nov 23):**
```
9eb9e64 - Integrate Gemini's enhanced timeline and pricing designs
40bafea - Fix misleading auto-booking claims - clarify pending booking workflow
ad1e87c - Fix chat mockup: Show full booking card above input field
01c2b60 - Increase chat area height to fully show booking card
76eae29 - Add Gemini design updates: Trust Strip, enhanced bento grid, animations
4664aa9 - Increase logo size by 40% for stronger brand presence
```

**Latest Git Commits (Nov 9 Evening):**
```
69ff7e1 - Add AI Bot phone number CTAs throughout homepage
9a67741 - Fix environment variable name: SUPABASE_SERVICE_KEY → SUPABASE_SERVICE_ROLE_KEY
bc483b5 - Allow Vercel Cron User-Agent for authentication
... (see git log for full history)
```

---

## 🎨 Design Process (NEW)

**Two-AI Workflow:**
1. **Claude Code** (Anthropic Sonnet 4.5) - Technical implementation, accurate content, codebase integration
2. **Gemini 3.0 Flash** (Google) - UI/UX design, modern aesthetics, visual mockups

**When to Use Each:**
- **Claude Code**: All coding, file operations, git commits, deployments, technical accuracy
- **Gemini**: Generate HTML/CSS mockups for new sections, modern design patterns, visual concepts

**Workflow Example (Nov 23):**
1. User explains product workflow to Gemini (pending bookings, not auto-booking)
2. Gemini creates beautiful timeline + pricing card designs in HTML
3. Claude Code implements as Next.js/React components
4. Claude Code blends Gemini's design with accurate product descriptions
5. Result: Professional design + truthful marketing copy

---

**Everything is working. Blog system deployed. News aggregator automated. Design excellence achieved. Ready for scale.** 🎉🚀

**Phone Number Visible:** +61 489 087 491 now prominently displayed in 3 locations on homepage!
