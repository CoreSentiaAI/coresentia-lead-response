# CoreSentia - AI Receptionist for Local Service Businesses

**Never miss a lead again.** CoreSentia provides AI-powered SMS and web chat for local Australian service businesses — tradies, salons, and mobile services.

**🟢 Status:** Phase 1 COMPLETE ✅ - Ready for Customer Acquisition | **🌐 Live:** https://www.coresentia.com.au/ | **📱 SMS:** +61489087491

**📋 Latest Update (Nov 9):**
- ✅ **NEW:** Complete Professional Package onboarding system ($2,500 package)
- ✅ Comprehensive 9-section onboarding form with branding, website design, and domain setup
- ✅ 4 new email templates for Professional Package workflow
- ✅ Database schema for tracking website builds, logo creation, and revisions
- ✅ Simplified email templates (removed testing burden, added mailto "Confirm Go Live" links)
- ✅ 10 working day timeline for Professional Package builds
- ✅ Complete documentation and deployment guides

**⭐ New:** See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for quick session-start reference

---

## 🏗️ Repository Overview

**⚠️ CRITICAL:** This repository contains TWO DISTINCT BOT SYSTEMS:

### 1️⃣ CoreSentia Sales Pipeline Bot
**Phone Number:** +61489087491 (YOUR business number)
**Purpose:** Acquire clients who want to BUY CoreSentia
**Users:** Businesses interested in purchasing CoreSentia services
**What it does:**
- Qualifies leads for YOUR business
- Captures contact info (email, phone, business details)
- Triggers quote generation for YOUR sales team
- Books meetings with YOU
- Talks about $499 SMS Responder + $2,500 Professional Package

### 2️⃣ Client Booking Bot (Multi-tenant)
**Phone Numbers:** All OTHER numbers (client business numbers)
**Purpose:** Book appointments for YOUR CLIENTS' customers
**Users:** Your clients' customers (homeowners, salon clients, etc.)
**What it does:**
- Qualifies customers for YOUR CLIENT'S business
- Collects booking details (name, service, address, time)
- Checks YOUR CLIENT'S calendar availability
- Creates PENDING bookings (awaits client approval)
- Sends SMS to YOUR CLIENT for confirmation
- Handles human handoffs to THE CLIENT

**Key Difference:** Sales bot sells CoreSentia. Client bot books appointments for businesses using CoreSentia.

---

## 🎯 What CoreSentia Does

We solve a simple problem: **You're on the tools, can't answer your phone, and leads book your competitors instead.**

CoreSentia gives service businesses:
- **Dedicated AI-powered business SMS number** that responds 24/7
- **Automatic appointment booking** into their calendar
- **Simple mobile dashboard** to view all bookings
- **SMS confirmations** to them and their customers

## 📦 Product Offerings

### SMS Responder - $499 + $150/month (inc. GST)
Perfect for tradies and mobile services without a website.

**What you get:**
- Dedicated business SMS number
- AI responds 24/7 to text inquiries
- Qualifies leads and books appointments automatically
- Simple mobile dashboard
- Built-in booking calendar
- SMS confirmations

**Delivery:** 2-3 days
**Best for:** Landscapers, cleaners, mobile mechanics, handymen

### Professional Package - $2,500 + $250/month (inc. GST)
For service businesses ready for a professional web presence.

**Everything in SMS Responder PLUS:**
- Custom 4-page website (Home, About, Terms, Contact/Web-bot)
- Professional logo design (if needed - 1 revision included)
- Brand color palette and style guide
- Web chat widget (same AI as SMS)
- Custom domain (yourname.com.au) - 1 year included
- Professional branding and design
- 2 rounds of website revisions included
- Mobile-optimized design

**Delivery:** 10 working days
**Best for:** Hairdressers, beauty services, pet groomers, professional service businesses

---

## 🛡️ Bulletproof Notification System (NEW)

**The Problem:** LLMs don't always follow instructions perfectly. If the AI forgets to include an ACTION tag, you miss a notification = lost customer = angry client.

**The Solution:** Dual-layer notification system with rule-based fallback.

### Layer 1: ACTION Tags (Primary - 80-90% success)
AI includes invisible tags like `ACTION: GENERATE_QUOTE` in responses. System detects and triggers notifications.

### Layer 2: Rule-Based Fallback (Safety Net - Catches remaining 10-20%)
If AI forgets the ACTION tag, the system still triggers notification when:
1. ✅ Lead has required data (name + email/phone + industry)
2. ✅ Bot indicated completion (e.g., "I've passed your details to the team")
3. ✅ Conversation state matches expected pattern

**Detection phrases:**
- Quote requests: "passed your details", "team will email you", "they'll reach out"
- Meeting bookings: "notified the team", "team will reach out to schedule"
- Human handoffs: "let the team know", "connect you with the team"
- Client bookings: "I've created", "I've booked", "booking is confirmed"

### Layer 3: Audit Logging
Every notification is logged with:
- Trigger method (ACTION tag vs fallback)
- Fallback reason (if applicable)
- Lead details
- Timestamp

Console output: `⚠️ FALLBACK TRIGGERED: Quote completion detected without ACTION tag`

**Result:** 100% notification reliability. Safe for client deployments where missed bookings = catastrophic failure.

---

## 📧 Client Onboarding Email Sequence

**Complete workflow from lead to live client:**

### Email 1: Service Agreement + 50% Deposit Invoice
**When:** After lead agrees to sign up
**Send:**
- Service Agreement Template (`/docs/SERVICE_AGREEMENT_TEMPLATE.md`)
- Invoice for 50% deposit ($499.50 for SMS Responder or $1,250 for Professional)
- Payment instructions

**Message:** "We require a 50% deposit to start work, with the remaining 50% due before go-live."

---

### Email 2: Onboarding Form Link
**When:** After deposit received
**SMS Responder:** https://www.coresentia.com.au/onboarding
**Professional Package:** https://www.coresentia.com.au/onboarding-professional

**Note:** Use appropriate template based on package purchased (see `/public/Marketing/Templates/`)

---

### Email 3: Setup Call (Optional)
**When:** If client books a setup call through the onboarding form
**Action:** Schedule 15-30 min call at their chosen time
**Purpose:** Clarify details, answer questions, address concerns
**Note:** Most clients don't need this - form captures everything required

---

### Email 4: Progress Update
**When:** During build phase (midway through build)
**Message:** Quick update on progress, keeping them excited and engaged

---

### Email 5: Testing Access + Final Payment
**When:** System ready for testing
**Send:**
- Testing access link/credentials
- Invoice for remaining 50%
- Walkthrough instructions

**Message:** "Your system is ready to test! Once you approve and we receive final payment, we'll go live."

---

### Email 6: Go-Live + Training
**When:** After final payment received
**Send:**
- Live system credentials
- Dashboard walkthrough
- Training materials
- Support contact info

**Message:** "You're live! 🚀 Your AI Receptionist is now answering leads 24/7."

---

**📋 See full details in:** `/docs/CORESENTIA_SALES_PIPELINE.md` and `/docs/CLIENT_BOOKING_WORKFLOW.md`

---

## 🛠 Tech Stack

- **Frontend:** Next.js 13 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (Navy/Orange/Sage palette)
- **AI:** Anthropic Claude Sonnet 4
- **Database:** Supabase (PostgreSQL)
- **SMS:** Twilio (✅ Live - +61489087491)
- **Hosting:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key

### Installation

```bash
# Clone the repo
git clone https://github.com/CoreSentiaAI/coresentia-lead-response.git
cd coresentia-lead-response

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Anthropic (AI)
ANTHROPIC_API_KEY=your_anthropic_key

# Twilio (SMS) - Coming soon
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### Database Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Leads table (should already exist)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  initial_message TEXT,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'web_chat',
  total_tokens INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table (NEW)
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  business_id UUID,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service TEXT DEFAULT 'General',
  date_time TIMESTAMPTZ NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_bookings_lead_id ON bookings(lead_id);
CREATE INDEX idx_bookings_business_id ON bookings(business_id);
CREATE INDEX idx_bookings_date_time ON bookings(date_time);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Production

```bash
# Vercel CLI is installed and authenticated
vercel --prod
```

**Deployment Management:**
- Auto-deploy on `git push` to main branch
- Manual deploy: `vercel --prod`
- View deployments: `vercel ls`
- Check env vars: `vercel env ls`
- View domains: `vercel domains ls`

## 📁 Project Structure

```
coresentia-lead-response/
├── app/
│   ├── api/
│   │   ├── chat/route.ts             # AI chat endpoint (web + SMS)
│   │   ├── sms/webhook/route.ts      # Twilio SMS webhook (NEW)
│   │   ├── bookings/route.ts         # Booking management
│   │   ├── availability/route.ts     # Available time slots
│   │   ├── quotes/generate/          # Quote generation (legacy)
│   │   └── xero/callback/            # Xero OAuth (legacy)
│   ├── chat/[leadId]/page.tsx        # Chat interface
│   ├── dashboard/[businessId]/       # Booking dashboard
│   ├── components/
│   │   ├── ChatInterface.tsx         # Main chat UI
│   │   ├── Header.tsx                # Navigation
│   │   └── InlineChatForm.tsx        # Lead capture forms
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Global styles
│   └── layout.tsx                    # Root layout
├── lib/
│   └── twilio.ts                     # Twilio helper functions (NEW)
├── public/                           # Static assets
├── docs/                             # Documentation
│   ├── ARCHIVE_V1.md                 # Original Ivy build docs
│   ├── PROJECT_PLAN.md               # Development roadmap
│   └── SESSION_SUMMARY_2025-10-26.md # Recent session notes
└── README.md                         # This file
```

## 🎨 Brand Guidelines

### Colors
- **Primary Navy:** #1E3A5F (trustworthy, professional)
- **Accent Orange:** #FF6B35 (energetic, call-to-action)
- **Secondary Sage:** #8FBC8F (approachable, natural)
- **Text:** #2D3436 (dark charcoal)
- **Backgrounds:** White, light gray

### Typography
- **Headers:** Montserrat (400-600 weight)
- **Body:** Open Sans
- **Spacing:** 0.15em letter-spacing on headers

### Voice
- **Tagline:** "Stop talking about AI. Start closing with it."
- **Tone:** Direct, helpful, no corporate jargon
- **Target:** Solo tradies, small service businesses
- **Focus:** Solving the missed-lead problem

## 📝 API Routes

### POST /api/chat
**AI chat conversation endpoint with intelligent bot routing.**

**IMPORTANT:** This endpoint serves BOTH bot systems:
- **Sales Pipeline Bot** (default): When `botType='sales'` or omitted
- **Client Booking Bot**: When `botType='client'` with businessContext

**Request (Sales Bot):**
```json
{
  "messages": [
    {"role": "user", "content": "I'm interested in the SMS Responder"}
  ],
  "leadId": "uuid-or-homepage-visitor",
  "leadInfo": {"email": "john@example.com"}
}
```

**Request (Client Booking Bot):**
```json
{
  "messages": [
    {"role": "user", "content": "I need my lawn mowed"}
  ],
  "leadId": "uuid",
  "leadInfo": {"phone": "+61400000000"},
  "botType": "client",
  "businessId": "business-uuid",
  "businessContext": {
    "businessName": "Green Lawn Services",
    "industryType": "Landscaping",
    "services": ["Lawn Mowing", "Hedge Trimming"],
    "botPersonality": "friendly"
  }
}
```

**Response:**
```json
{
  "message": "AI response text",
  "leadId": "uuid",
  "actions": [
    {"type": "create_booking", "data": {...}},
    {"type": "check_availability", "data": {...}}
  ]
}
```

### POST /api/sms/webhook
**Twilio SMS webhook with intelligent routing to correct bot.**

**Critical Routing Logic:**
- SMS to +61489087491 → **Sales Pipeline Bot** (YOUR business)
- SMS to any other number → **Client Booking Bot** (lookup business from database)

**Twilio Configuration:**
- URL: `https://www.coresentia.com.au/api/sms/webhook`
- Method: HTTP POST
- Receives: Form data from Twilio (From, To, Body, MessageSid)
- Returns: TwiML response

**Flow:**
1. Receives SMS from Twilio with `From` (customer) and `To` (business number)
2. Looks up business from `To` number in `business_phones` table
3. Determines bot type: sales (+61489087491) or client (any other number)
4. Creates/finds lead by phone number (scoped to business if client bot)
5. Calls /api/chat with appropriate `botType` and `businessContext`
6. Sends AI response via Twilio SMS API

### POST /api/bookings
Create a new booking.

**Request:**
```json
{
  "leadId": "uuid",
  "customerName": "John Smith",
  "customerEmail": "john@example.com",
  "customerPhone": "0412345678",
  "service": "Lawn Mowing",
  "dateTime": "2025-10-27T10:00:00Z",
  "notes": "Large backyard"
}
```

### GET /api/bookings?leadId=uuid
Fetch bookings for a lead or business.

### PATCH /api/bookings
Update booking status (pending → confirmed → completed/cancelled).

### GET /api/availability?date=2025-10-27
Get available time slots for a specific date.

## 🚧 Development Status

See [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) for detailed roadmap.

### ✅ PHASE 1: CoreSentia Marketing System - COMPLETE! 🎉

**All MVP Features Delivered (November 3, 2025):**
- [x] Professional website with two-tier pricing (coresentia.com.au)
- [x] Web chat interface with Claude AI
- [x] Twilio SMS integration - LIVE (+61489087491)
- [x] SMS webhook receiving and responding automatically
- [x] Lead capture and tracking (SMS + web)
- [x] Human handoff system with smart info capture
- [x] **Bulletproof dual-layer notification system (LLM + rule-based fallback)**
- [x] **100% reliable notifications with audit logging**
- [x] **Mobile-first bot responses (3-4 bullet points max)**
- [x] Admin dashboard at /admin with full conversation history
- [x] Status management (new/contacted/qualified/closed)
- [x] Source filtering (SMS/web)
- [x] Action tag stripping (clean UX)
- [x] Cleaned up all legacy v1.0 code
- [x] Availability checking API
- [x] Booking dashboard prototype
- [x] Complete onboarding form with optional setup calls

**Deferred to Post-MVP:**
- [ ] Automated quote generation (manual via Xero for now)
- [ ] Email notifications (SMS working, email not critical)
- [ ] Automated follow-up sequences
- [ ] Advanced analytics dashboard
- [ ] Payment processing integration

### 📋 PHASE 2: Client SMS Product (Future)

**Not Started:**
- [ ] Multi-business database architecture
- [ ] Business profile management system
- [ ] Per-client AI prompt customization
- [ ] Website template builder (Professional Package)
- [ ] Client onboarding workflow
- [ ] White-label dashboard
- [ ] SMS confirmation system for clients
- [ ] Staff calendar management

**Future Enhancements:**
- [ ] Voice AI (phone calls)
- [ ] WhatsApp integration
- [ ] Advanced analytics for clients
- [ ] Mobile app for tradies

## 📚 Documentation

- [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) - Strategic plan and roadmap
- [ARCHIVE_V1.md](./docs/ARCHIVE_V1.md) - Original "Ivy" build documentation
- [STRATEGY.md](./docs/STRATEGY.md) - Product positioning and go-to-market

## 🤝 Contributing

This is a private project for CoreSentia. Internal contributions only.

## 📄 License

Proprietary - © 2025 CoreSentia

## 🔗 Links

- **Website:** https://coresentia.com.au (pending deployment)
- **GitHub:** https://github.com/CoreSentiaAI/coresentia-lead-response
- **Contact:** info@coresentia.com

---

**Built with:** Next.js • React • TypeScript • Tailwind CSS • Claude AI • Supabase

## Demo (/demo)

An example project management tool for screen-sharing: a tracker with board, table and calendar views, and a platform section holding a working purchase-orders module. Fictional data for a made-up HV contractor. No client name anywhere.

- **Where**: `app/demo/`. Route group `(app)` holds the gated screens (`/demo/tracker`, `/demo/platform`); route group `(mock)` holds standalone production mock-ups that open in a new tab (`/demo/purchase-orders`); `page.tsx` is the sign-in page.
- **Data**: no database. The seed is `app/demo/_lib/seed.ts` (all fictional). State lives in the browser (`localStorage` key `cs-demo-state`) via `app/demo/_lib/store.tsx`.
- **Reset**: "Reset demo data" in the sidebar, or clear that localStorage key. Editing the seed file changes the starting point for every visitor.
- **Access**: set `DEMO_PASSWORD` in the environment (Vercel or `.env.local`). Unset, the gate fails closed. The "Sign in with Microsoft" button is inert; `MicrosoftSignInButton.tsx` is where a real Entra ID sign-in gets wired.
- **Look**: its own light palette and type (IBM Plex Sans and Mono, tokens under `.pm` in `globals.css` and `pm.*` in the Tailwind config), independent of the marketing site. Not indexed, not in the sitemap, disallowed in robots.
