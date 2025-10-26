# CoreSentia - AI Receptionist for Local Service Businesses

**Never miss a lead again.** CoreSentia provides AI-powered SMS and web chat for local Australian service businesses — tradies, salons, and mobile services.

## 🎯 What We Do

We solve a simple problem: **You're on the tools, can't answer your phone, and leads book your competitors instead.**

CoreSentia gives you:
- **Dedicated AI-powered business SMS number** that responds 24/7
- **Automatic appointment booking** into your calendar
- **Simple mobile dashboard** to view all bookings
- **SMS confirmations** to you and your customers

## 📦 Product Offerings

### SMS Responder - $1,200 + $150/month (inc. GST)
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
- Professional one-page website
- Web chat widget (same AI)
- Custom domain (yourname.com.au)
- Your branding and colors
- Embedded booking system
- Mobile-optimized design

**Delivery:** 5-7 days
**Best for:** Hairdressers, beauty services, pet groomers, mobile businesses

## 🛠 Tech Stack

- **Frontend:** Next.js 13 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (Navy/Orange/Sage palette)
- **AI:** Anthropic Claude Sonnet 4
- **Database:** Supabase (PostgreSQL)
- **SMS:** Twilio (planned)
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

## 📁 Project Structure

```
coresentia-lead-response/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI chat endpoint
│   │   ├── bookings/route.ts      # Booking management
│   │   ├── quotes/generate/       # Quote generation (legacy)
│   │   └── xero/callback/         # Xero OAuth (legacy)
│   ├── chat/[leadId]/page.tsx     # Chat interface
│   ├── components/
│   │   ├── ChatInterface.tsx      # Main chat UI
│   │   ├── Header.tsx             # Navigation
│   │   ├── InlineChatForm.tsx     # Lead capture forms
│   │   └── NetworkCanvas.tsx      # Background animation
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Global styles
│   └── layout.tsx                 # Root layout
├── public/                        # Static assets
├── docs/                          # Documentation
│   ├── ARCHIVE_V1.md              # Original Ivy build docs
│   └── PROJECT_PLAN.md            # Current roadmap
└── README.md                      # This file
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
AI chat conversation endpoint.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "I'm interested in the SMS Responder"}
  ],
  "leadId": "uuid-or-homepage-visitor",
  "leadInfo": {"email": "john@example.com"}
}
```

**Response:**
```json
{
  "message": "AI response text",
  "leadId": "uuid",
  "actions": [{"type": "book_meeting"}]
}
```

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

## 🚧 What's Next (Roadmap)

See [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) for detailed roadmap.

**High Priority:**
- [ ] Twilio SMS integration
- [ ] Availability checking system
- [ ] Customer dashboard (view bookings)
- [ ] SMS confirmation system

**Medium Priority:**
- [ ] Website template system (Tier 2)
- [ ] Multi-business support
- [ ] Payment processing integration
- [ ] Staff calendar management

**Future:**
- [ ] Voice AI (phone calls)
- [ ] WhatsApp integration
- [ ] Advanced analytics
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
