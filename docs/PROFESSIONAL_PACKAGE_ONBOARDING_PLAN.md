# Professional Package Onboarding Plan

**Package:** Professional Package - $2,500 setup + $250/month
**Deliverables:** SMS Lead Capture Bot + Professional Website + Web Chat Widget + Custom Domain

---

## 🎯 What Makes Professional Package Different

### SMS Responder ($499)
- SMS bot only
- Dashboard access
- Simple setup

### Professional Package ($2,500)
- Everything in SMS Responder PLUS:
- Custom one-page website
- Web chat widget (same AI as SMS)
- Custom domain (yourname.com.au)
- Professional branding/design
- Your colors, logo, style
- Embedded booking system
- Mobile-optimized

---

## 📝 Additional Information Required

### 1. Branding & Design Assets

**Logo:**
- ❓ Do you have a professional logo?
  - YES → Upload file (PNG, SVG, AI preferred)
  - NO → CoreSentia creates logo ($250 included in package)
- Logo file formats accepted
- Logo variations (if any): color, white, black

**Brand Colors:**
- ❓ Do you have brand colors/style guide?
  - YES → Specify colors (hex codes or names)
  - NO → CoreSentia creates brand palette (included)
- Primary color
- Secondary color
- Accent color (optional)

**Design Style Preference:**
- Modern & minimal
- Bold & vibrant
- Classic & professional
- Tradie/industrial
- Elegant & refined

**Design Inspiration:**
- Any websites you like? (optional, helps us match your vision)
- Competitors' websites to reference
- Specific design elements you want

---

### 2. Domain & Website

**Domain Name:**
- Preferred domain: _______________.com.au
- Do you already own this domain?
  - YES → We'll need access to DNS settings
  - NO → We'll register it for you ($15/year domain fee)
- Alternative domain options (backup choices)

**Website Content:**

**Tagline/Headline:**
- Main headline for your website (e.g., "Brisbane's Best Mobile Mechanic")
- Subheadline (supporting text)

**About Section:**
- Brief business description (2-3 sentences)
- Years in business
- Qualifications/certifications
- Why choose you? (key differentiators)

**Service Area:**
- Where do you operate? (suburbs, regions, radius)
- Do you travel? Maximum distance?

---

### 3. Visual Content

**Photos:**
- ❓ Do you have professional business photos?
  - YES → Upload (work in progress, team, completed jobs)
  - NO → Stock photos ok? (we'll select relevant industry images)
- Minimum 3-5 photos needed
- Accepted formats: JPG, PNG (high resolution preferred)

**Social Media & Online Presence:**
- Facebook page URL
- Instagram handle
- Google My Business link
- LinkedIn (if applicable)
- Other social profiles

---

### 4. Services & Pricing (Enhanced)

Same as SMS package but with more detail for website display:

**Service List:**
- Service 1 name + description + typical price
- Service 2 name + description + typical price
- Service 3 name + description + typical price
- (Continue for all services)

**Pricing Display Preference:**
- Show exact prices on website?
- Show "from $X" pricing?
- Show "Get a Quote" only?

**Special Offers:**
- Any current promotions?
- First-time customer discount?
- Seasonal specials?

---

### 5. Technical Requirements

**Domain Setup:**
- Existing domain registrar (GoDaddy, Namecheap, etc.)
- Access to domain management (we'll need this)
- Email hosting preference
  - Keep existing email
  - New email with CoreSentia hosting

**Integrations:**
- Existing booking system to integrate?
- Xero/MYOB for invoicing?
- Calendar (Google, Outlook, other)?
- CRM system?

---

### 6. Timeline & Expectations

**Build Time:** 10 working days (vs 2-3 for SMS only)

**Process:**
1. Onboarding form completed
2. Optional setup call (if needed)
3. We build your website + bot
4. Review period (1-2 rounds of revisions included)
5. Final approval + payment
6. Go live!

**Revisions Included:**
- Logo: 1 revision only
- Website design: 2 rounds of revisions
- Unlimited bot conversation tweaks
- Color/text adjustments

**Pages Included in Package:**
- Homepage (main landing page)
- About page
- Terms & Conditions page
- Web-bot/Contact page (integrated chat widget)
**Total: 4 pages**

**Extra Revisions:**
- Additional logo revisions: $50 each
- Major design overhaul after 2 rounds: $200
- Additional pages beyond included 4: $150/page
- Custom integrations not in package: Quote on request

---

## 📧 Email Sequence Changes

### Email 2a: Professional Package Onboarding (NEW)
**Different from SMS version:**
- Link to Professional Package form
- Mentions website design process
- Sets expectation for 5 to 10 working days build
- Mentions branding/logo creation if needed

### Email 3: Setup Call (SAME)
- Optional, client's choice
- More likely for Professional clients (discuss design preferences)

### Email 4: Progress Update (NEW VERSION)
**Professional Package specific:**
- "Your website is taking shape..."
- Preview link to staging site
- Request for feedback on design direction

### Email 5a: Completion Email - Professional (NEW)
**Different from SMS version:**
- Website URL (staging)
- Dashboard URL
- SMS number
- Instructions to review website + test SMS
- "Confirm Go Live" for both systems

### Email 6: Go-Live (ENHANCED)
**Updated for Professional:**
- Website is live at your domain
- SMS bot is live
- How to share your website
- SEO tips / Google My Business setup reminder

---

## 🗄️ Database Schema Extensions

### Table: `client_onboarding`

**New fields for Professional Package:**

```sql
-- Branding
has_logo BOOLEAN DEFAULT FALSE,
logo_file_url TEXT,
logo_notes TEXT,
has_brand_colors BOOLEAN DEFAULT FALSE,
primary_color TEXT,
secondary_color TEXT,
accent_color TEXT,
design_style TEXT, -- 'modern', 'bold', 'classic', 'tradie', 'elegant'
design_inspiration_urls TEXT[], -- Array of URLs

-- Domain
preferred_domain TEXT,
owns_domain BOOLEAN DEFAULT FALSE,
domain_registrar TEXT,
alternative_domains TEXT[],

-- Website Content
website_tagline TEXT,
website_subheadline TEXT,
about_business TEXT,
years_in_business INTEGER,
qualifications TEXT,
service_area TEXT,
max_travel_distance TEXT,

-- Visual Content
has_photos BOOLEAN DEFAULT FALSE,
photo_urls TEXT[], -- Array of uploaded photo URLs
use_stock_photos BOOLEAN DEFAULT FALSE,
facebook_url TEXT,
instagram_handle TEXT,
google_business_url TEXT,
linkedin_url TEXT,
other_social TEXT,

-- Pricing Display
show_exact_prices BOOLEAN DEFAULT FALSE,
show_from_pricing BOOLEAN DEFAULT TRUE,
current_promotions TEXT,

-- Technical
existing_domain_access BOOLEAN DEFAULT FALSE,
email_hosting_preference TEXT, -- 'keep_existing', 'new_coresentia'
existing_booking_system TEXT,
calendar_system TEXT, -- 'google', 'outlook', 'other', 'none'
crm_system TEXT,

-- Revisions
revision_notes TEXT,
revision_count INTEGER DEFAULT 0,

-- Staging
staging_url TEXT,
staging_approved BOOLEAN DEFAULT FALSE
```

---

## 🎨 Form Design Considerations

### Progressive Disclosure
- Show branding section ONLY if Professional Package selected
- Hide logo upload if "No, create one for me" selected
- Conditional fields based on previous answers

### File Uploads
- Logo upload (PNG, SVG, AI, JPG)
- Photo uploads (multiple, up to 10)
- Style guide PDF upload (optional)

### Visual Helpers
- Color picker for brand colors
- Design style examples (show preview images)
- Domain availability checker (optional enhancement)

### Validation
- Domain format validation (.com.au format)
- Hex color code validation
- File type and size validation
- Required fields clearly marked

---

## 💰 Pricing Breakdown Transparency

**Professional Package - $2,500 setup:**
- SMS Bot setup: $500
- Website design (4 pages): $1,200
- Custom domain registration (1 year): $15
- Hosting setup (1 year): $135
- Logo creation (if needed): $150
- Brand style guide: $200
- Integration & testing: $300

**Monthly - $250:**
- SMS/AI costs: $100
- Website hosting: $50
- Domain renewal (prorated): $2
- Maintenance & updates: $50
- Support: $48

**Yearly Option (Consider):**
- $2,750/year ($229/month equivalent)
- Saves $250 vs monthly
- Upfront commitment = better cash flow

---

## 🚀 Next Steps

1. ✅ Build Professional Package onboarding form
2. ✅ Create email templates (2a, 4, 5a, 6 enhanced)
3. ✅ Update database schema
4. ✅ Add file upload functionality
5. ✅ Create form routing (detect which package, show appropriate form)
6. ✅ Test end-to-end flow

---

## ✅ CONFIRMED DETAILS (Nov 9, 2025)

1. **Logo creation:** Included in $2,500 via Fiverr (~$150), **1 revision only**
2. **Website revisions:** 2 rounds standard
3. **Domain registration:** 1 year included in package (~$15)
4. **Hosting:** Included while client pays monthly subscription
5. **Photos:** Client uploads OR stock sourcing (client/Todd sources or Gemini creates)
6. **Pages included:** Homepage + Terms + Web-bot/Contact + About = **4 pages total**
7. **Approval process:** Manual email process (no automated workflow for now)
8. **Timeline:** **10 working days** (not 5-7)

**Yearly subscription option:** Consider offering $2,750/year vs $3,000 for monthly

---

**Status: READY TO BUILD** 🚀
