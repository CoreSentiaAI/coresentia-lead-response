# Google Search Console Setup Guide

**Purpose:** Fix CoreSentia's Google discoverability issue (searching "CoreSentia" shows "Coresental" instead)
**Time Required:** 15-20 minutes
**Prerequisites:** Google account, website ownership verification

---

## 🎯 Why This Matters

**Current Problem:**
- Searching "CoreSentia" on Google shows "Coresental" (a different company)
- Zero Google presence for CoreSentia brand
- Potential customers can't find you via search

**What This Will Fix:**
- Proper Google indexing of coresentia.com.au
- Track search performance and rankings
- Submit sitemap for faster indexing
- Monitor for errors and SEO issues
- Build towards #1 ranking for "CoreSentia"

---

## ✅ Prerequisites (Already Complete)

Your site now has:
- [x] Comprehensive SEO meta tags (title, description, keywords)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Sitemap.xml (generated at /sitemap.xml)
- [x] Robots.txt (generated at /robots.txt)
- [x] Canonical URLs configured
- [x] Blog infrastructure for content marketing

**You're ready to submit to Google!**

---

## 📋 Step-by-Step Setup

### Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account (use a business account if you have one)
3. Click **"Add Property"** or **"Start Now"**

---

### Step 2: Add Your Property

**Choose Property Type:**
- Select **"URL prefix"** (not Domain)
- Enter: `https://www.coresentia.com.au`
- Click **"Continue"**

**Why URL prefix?**
- Easier verification via HTML file upload
- Tracks www.coresentia.com.au specifically
- No DNS configuration required

---

### Step 3: Verify Ownership

Google will present several verification methods. **Choose HTML File Upload** (easiest):

1. **Download the HTML verification file**
   - Google provides a file like: `google1234567890abcdef.html`
   - Download it to your computer

2. **Upload to your website**
   - Place the file in: `/public/` directory of your Next.js project
   - This makes it accessible at: `https://www.coresentia.com.au/google1234567890abcdef.html`

3. **Deploy to Vercel**
   ```bash
   git add public/google1234567890abcdef.html
   git commit -m "Add Google Search Console verification file"
   git push
   ```

4. **Verify in Google Search Console**
   - Click **"Verify"** button
   - Google will check if the file exists
   - You should see: ✅ "Ownership verified"

**Alternative Verification Methods:**
- HTML tag (add to `<head>` of layout.tsx)
- Google Analytics (if you use it)
- Google Tag Manager (if you use it)
- DNS record (requires domain provider access)

---

### Step 4: Submit Your Sitemap

Once verified:

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

**What this does:**
- Tells Google about all your pages (/about, /faq, /blog, etc.)
- Prioritizes pages (blog = 0.9, homepage = 1.0)
- Suggests crawl frequency (blog = daily, terms = monthly)
- Speeds up indexing process

---

### Step 5: Request Indexing for Key Pages

Don't wait for Google to find you organically. Request immediate indexing:

1. In Search Console, go to **"URL Inspection"** (top search bar)
2. Enter each important page URL:
   - `https://www.coresentia.com.au/`
   - `https://www.coresentia.com.au/about`
   - `https://www.coresentia.com.au/blog`
   - `https://www.coresentia.com.au/faq`
3. Click **"Request Indexing"** for each page

**Note:** Google may take 24-48 hours to index. Be patient!

---

### Step 6: Add Verification Code to Your Site (Optional)

For redundancy, add the verification meta tag to your site permanently:

1. **Get the meta tag from Google Search Console:**
   - Settings → Ownership verification → HTML tag method
   - Copy the meta tag like: `<meta name="google-site-verification" content="ABC123..." />`

2. **Update your Next.js metadata:**

Edit `/app/layout.tsx` and replace the verification section:

```typescript
verification: {
  google: 'ABC123...', // Replace with your actual code
},
```

This ensures verification persists even if the HTML file is removed.

---

## 📊 What to Monitor (First 30 Days)

### Week 1: Indexing Progress
- **Check:** "Coverage" report in Search Console
- **Goal:** See 5-10 pages indexed (homepage, about, faq, blog, etc.)
- **Expected:** 2-7 days for first pages to appear

### Week 2-4: Search Appearance
- **Check:** "Performance" report for queries and impressions
- **Goal:** Start seeing impressions for "CoreSentia" queries
- **Expected:** Low impressions (10-50/day initially)

### Ongoing Monitoring:
- **Coverage Issues:** Any pages blocked from indexing?
- **Mobile Usability:** Any mobile-specific errors?
- **Core Web Vitals:** Performance metrics
- **Manual Actions:** Any Google penalties? (Should be none)

---

## 🎯 SEO Strategy After Setup

### Immediate Next Steps:
1. **Write 5-10 blog posts** with target keywords:
   - "AI receptionist Australia"
   - "SMS automation for tradies"
   - "AI booking system"
   - "automated lead capture"

2. **Build backlinks:**
   - Google My Business listing ⚠️ **CRITICAL**
   - Australian business directories
   - Tech/AI product directories (Product Hunt, etc.)
   - Industry forums (Whirlpool, ProductReview)

3. **Create landing pages** for key search terms:
   - `/services/ai-receptionist-australia`
   - `/services/sms-automation-tradies`
   - `/industries/plumbers` (etc.)

### 3-Month Goals:
- [ ] Rank #1 for "CoreSentia" on Google
- [ ] Rank top 10 for "AI receptionist Australia"
- [ ] 500+ monthly organic visitors
- [ ] Domain Authority score of 20+

---

## 🐛 Troubleshooting

### Problem: "Ownership verification failed"
**Solution:**
- Check the HTML file is accessible: Visit `https://www.coresentia.com.au/google....html` in browser
- Ensure file is in `/public/` directory
- Redeploy if needed: `git push` (Vercel auto-deploys)
- Try alternative verification (HTML tag in layout.tsx)

### Problem: "Sitemap couldn't be read"
**Solution:**
- Check sitemap is accessible: Visit `https://www.coresentia.com.au/sitemap.xml`
- Should show XML with all page URLs
- If 404, rebuild Next.js: `npm run build`
- Redeploy to Vercel

### Problem: "Page is not indexed"
**Common Reasons:**
- Robots.txt blocking (check: `/robots.txt` should allow all)
- Page is new (Google takes 2-7 days)
- Duplicate content detected
- No internal links pointing to the page

**Solution:**
- Request indexing again via URL Inspection
- Add internal links from homepage
- Wait 24-48 hours and check again

### Problem: "Mobile usability issues"
**Solution:**
- Your site is already mobile-responsive (Tailwind CSS)
- If issues appear, check specific pages in report
- Test on real mobile devices

---

## 📈 Schema Markup (Next Level SEO)

After basic setup is working, add structured data:

### LocalBusiness Schema
Tells Google you're a Queensland business:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CoreSentia",
  "description": "AI Receptionist for Australian Service Businesses",
  "url": "https://www.coresentia.com.au",
  "telephone": "+61489087491",
  "email": "info@coresentia.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brisbane",
    "addressRegion": "QLD",
    "addressCountry": "AU"
  },
  "areaServed": "AU",
  "priceRange": "$499-$2500"
}
```

### Product Schema
For your two packages (SMS Responder, Professional):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "CoreSentia SMS Responder",
  "description": "24/7 AI-powered SMS receptionist for Australian businesses",
  "offers": {
    "@type": "Offer",
    "price": "499",
    "priceCurrency": "AUD",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock"
  }
}
```

**How to add:**
- Create `/app/layout.tsx` with JSON-LD script tag
- Or use a dedicated `/app/schema.ts` file
- Google will parse and display rich results

---

## 🔗 Additional Resources

**Google Documentation:**
- Search Console Help: https://support.google.com/webmasters
- SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide
- Schema Markup: https://developers.google.com/search/docs/appearance/structured-data

**Tools:**
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev/

---

## ✅ Completion Checklist

Before moving to content creation:

- [ ] Google Search Console account created
- [ ] Property added (https://www.coresentia.com.au)
- [ ] Ownership verified (HTML file or meta tag)
- [ ] Sitemap submitted (sitemap.xml)
- [ ] Key pages requested for indexing
- [ ] Verification meta tag added to layout.tsx (optional but recommended)
- [ ] First blog post published (for content to index)

---

## 🚀 Next Steps

Once Google Search Console is set up:

1. **Create Google My Business** ⚠️ CRITICAL
   - Guide: /docs/GOOGLE_MY_BUSINESS_SETUP.md (to be created)
   - This is THE most important local SEO signal

2. **Start Publishing Content**
   - Write or generate 5-10 blog posts
   - Target keywords: "AI receptionist", "SMS automation", "tradie automation"
   - Publish 2-3x per week

3. **Build Automated Content Pipeline**
   - Refer to: /docs/MARKETING_SEO_SOCIAL_STRATEGY.md
   - RSS aggregator → AI content generator → social cross-posting

4. **Monitor Rankings**
   - Use Google Search Console "Performance" report
   - Track impressions, clicks, CTR, position
   - Adjust strategy based on data

---

**Questions?**
- Google Search Console Help: https://support.google.com/webmasters
- CoreSentia docs: /docs/MARKETING_SEO_SOCIAL_STRATEGY.md

**Ready to dominate Google for "CoreSentia"? Let's go! 🚀**
