# Two-Bot System Implementation Summary

**Date:** November 2, 2025
**Status:** ✅ COMPLETE - Ready for Database Migration & Testing

---

## 🎯 What We Built

CoreSentia now has **TWO COMPLETELY SEPARATE BOT SYSTEMS**:

### 1️⃣ Sales Pipeline Bot (Your Business)
- **Phone:** +61489087491
- **Purpose:** Acquire clients who want to BUY CoreSentia
- **Talks About:** $499 SMS Responder & $2,500 Professional Package
- **Actions:** Generates quotes, books meetings with YOU

### 2️⃣ Client Booking Bot (Multi-tenant)
- **Phones:** All OTHER numbers (your clients' business numbers)
- **Purpose:** Book appointments for YOUR CLIENTS' customers
- **Talks About:** The services YOUR CLIENT offers
- **Actions:** Creates pending bookings, sends SMS to client for approval

---

## 📁 Files Created

### 1. Database Migration
**File:** `supabase/migrations/20251102_business_phones.sql`
**Purpose:** Maps phone numbers to businesses for routing

**Key Table:** `business_phones`
- `phone_number` - Business SMS number
- `business_id` - Reference to business
- `business_name` - For bot context
- `services` - Array of services offered
- `bot_personality` - Tone customization

**Pre-populated:** +61489087491 → CoreSentia Sales

### 2. Bot System Prompts
**File:** `lib/bot-prompts.ts`

**Exports:**
- `SALES_PIPELINE_PROMPT` - Sales bot (unchanged from original)
- `getClientBookingPrompt(businessContext)` - Dynamic client booking bot
- `getBotType(phoneNumber)` - Routing function

**Client Bot Capabilities:**
- Collects: name, phone, service, address, preferred time
- Triggers: CHECK_AVAILABILITY, CREATE_BOOKING, HUMAN_HANDOFF
- Creates: Pending bookings (awaits client approval)

### 3. SMS Webhook Routing
**File:** `app/api/sms/webhook/route.ts`

**New Logic:**
1. Extract `To` number (which business number received SMS)
2. Look up business in `business_phones` table
3. Determine bot type: sales vs client
4. Create/find lead (scoped to business for client bot)
5. Call chat API with appropriate context

### 4. Chat API Updates
**File:** `app/api/chat/route.ts`

**New Parameters:**
- `botType` - 'sales' or 'client'
- `businessContext` - Business name, services, personality
- `businessId` - For data scoping

**New Actions:**
- `check_availability` - Query calendar
- `create_booking` - Create pending booking
- `client_human_handoff` - Alert business owner

### 5. Notification Handlers
**File:** `lib/notifications.ts`

**New Functions:**
- `handleBookingCreation()` - Creates booking + SMS to business owner
- `handleClientHumanHandoff()` - SMS to business owner for callback

---

## 📊 Database Changes Required

**IMPORTANT:** You must run the migration before the system will work!

### Step 1: Run Migration SQL
1. Open Supabase Dashboard → SQL Editor
2. Load file: `supabase/migrations/20251102_business_phones.sql`
3. Click **RUN**
4. Verify table created: Check "Table Editor" → `business_phones`

### Step 2: Verify CoreSentia Number
Check that +61489087491 was inserted:
```sql
SELECT * FROM business_phones WHERE phone_number = '+61489087491';
```

### Step 3: Add First Test Client (When Ready)
```sql
INSERT INTO business_phones (
  phone_number,
  business_id,
  business_name,
  industry_type,
  services,
  is_active,
  bot_personality
) VALUES (
  '+61400000000', -- Replace with actual Twilio number
  'client-business-uuid', -- Replace with actual business ID
  'Test Lawn Services',
  'Landscaping',
  ARRAY['Lawn Mowing', 'Hedge Trimming', 'Garden Cleanup'],
  true,
  'friendly'
);
```

---

## 🧪 How to Test

### Test 1: Sales Bot (Should Already Work)
1. **SMS:** Send text to +61489087491
2. **Expected:** Bot talks about CoreSentia packages ($499/$2,500)
3. **Expected:** You (admin) get SMS notification for quotes/meetings

### Test 2: Client Booking Bot (After Migration)
1. **Setup:** Add test client phone number to `business_phones` table
2. **SMS:** Send text to that number: "I need my lawn mowed"
3. **Expected:** Bot asks for name, address, preferred time
4. **Expected:** Bot creates PENDING booking
5. **Expected:** Business owner (you for now) gets SMS: "NEW BOOKING REQUEST"
6. **Expected:** You can confirm/decline in dashboard

### Test 3: Routing Logic
1. **Send same message to BOTH numbers**
2. **+61489087491:** Should talk about buying CoreSentia
3. **Client number:** Should talk about booking that client's service

---

## 🔧 Configuration for New Clients

When you onboard a new client:

### Step 1: Get Twilio Number
- Buy dedicated Twilio number for client
- Configure webhook: `https://www.coresentia.com.au/api/sms/webhook`

### Step 2: Add to Database
```sql
INSERT INTO business_phones (
  phone_number,
  business_id,
  business_name,
  industry_type,
  services,
  bot_personality
) VALUES (
  '+61412345678', -- Client's new number
  'their-business-uuid', -- From client_onboarding table
  'Client Business Name',
  'Their Industry',
  ARRAY['Service 1', 'Service 2', 'Service 3'],
  'friendly' -- or 'professional', 'casual'
);
```

### Step 3: Test Immediately
Send test SMS to verify routing works

---

## 📋 Workflow Reference

### Sales Pipeline Bot Workflow
1. Customer texts +61489087491
2. Bot qualifies: industry, challenge, interest
3. Bot triggers: GENERATE_QUOTE or BOOK_MEETING
4. You get SMS notification
5. You follow up manually

### Client Booking Bot Workflow
1. Customer texts client's business number
2. Bot qualifies: name, service, address, time
3. Bot triggers: CREATE_BOOKING
4. Pending booking created in database
5. Client gets SMS: "NEW BOOKING REQUEST"
6. Client confirms/declines in dashboard
7. Customer gets confirmation SMS

---

## 🚨 Critical Differences

| Aspect | Sales Bot | Client Bot |
|--------|----------|------------|
| **Phone** | +61489087491 only | Any other number |
| **Represents** | CoreSentia | Client's business |
| **Sells** | CoreSentia packages | Client's services |
| **Pricing** | $499/$2,500 | Client's pricing (or N/A) |
| **Calendar** | N/A | Client's calendar |
| **Notifications** | To YOU (admin) | To CLIENT (business owner) |
| **Booking Status** | N/A | Pending → Confirmed |
| **Human Handoff** | Contact YOU | Contact CLIENT |

---

## 📚 Documentation Updated

✅ `/docs/README.md` - Two-bot system overview
✅ `/docs/CLIENT_BOOKING_WORKFLOW.md` - Complete booking workflow
✅ `/docs/CORESENTIA_SALES_PIPELINE.md` - Sales pipeline
✅ `/README.md` - Main project README with routing logic
✅ `/docs/TWO_BOT_SYSTEM_IMPLEMENTATION.md` - This file

---

## ⚠️ Before You Start a New Terminal Session

**Critical Context Files to Review:**
1. `/docs/README.md` - Start here every time
2. `/docs/CLIENT_BOOKING_WORKFLOW.md` - For client booking system work
3. `/docs/CORESENTIA_SALES_PIPELINE.md` - For sales pipeline work
4. This file - For technical implementation details

**Key Concept to Remember:**
> **Sales bot (+61489087491) sells CoreSentia.**
> **Client bot (other numbers) books appointments FOR YOUR CLIENTS.**

These are TWO SEPARATE SYSTEMS with DIFFERENT purposes. Never confuse them.

---

## 🎉 What's Complete

- ✅ Database schema for phone routing
- ✅ Separate bot system prompts
- ✅ SMS webhook routing logic
- ✅ Chat API bot selection
- ✅ Booking creation flow
- ✅ Client SMS notifications
- ✅ Human handoff for both bots
- ✅ Documentation sweep
- ✅ README updates

## 🔜 Next Steps

1. **Run database migration** (5 minutes)
2. **Test sales bot** - Should work immediately (already live)
3. **Purchase test Twilio number** for fake client business
4. **Add test client to database**
5. **Test client booking bot** end-to-end
6. **Verify business owner gets SMS notifications**

---

**Built:** November 2, 2025
**Ready for:** Production deployment (after migration)
