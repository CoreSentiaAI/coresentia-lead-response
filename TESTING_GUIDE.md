# Authentication System - Testing Guide
## Test the Complete Client Experience Flow

---

## 🎯 What We Built

**Authentication System (A)** ✅
- Email/password login for clients
- Protected dashboards - can't access without login
- Clients can only see their own business data
- Sign out functionality

**Tutorial Booking (B)** ✅
- Automatic demo booking created for new clients
- Shows them how the system works
- They can delete it when ready

---

## 📋 Prerequisites

Before testing, you need to:

1. **Run the database migration** (creates the auth tables)
2. **Have Supabase credentials set** in your Vercel env vars

---

## ⚙️ Step 1: Run Database Migration

**Go to:** [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → SQL Editor

**Copy and paste** the migration from:
`supabase/migrations/20251101_client_authentication.sql`

**Or run this SQL:**

```sql
-- Create user_businesses junction table
CREATE TABLE IF NOT EXISTS user_businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL,
  role VARCHAR(50) DEFAULT 'owner',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

CREATE INDEX IF NOT EXISTS idx_user_businesses_user_id ON user_businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_businesses_business_id ON user_businesses(business_id);

ALTER TABLE user_businesses ENABLE ROW LEVEL SECURITY;

-- Tutorial bookings tracking
CREATE TABLE IF NOT EXISTS tutorial_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tutorial_bookings_business_id ON tutorial_bookings(business_id);

-- Function to create tutorial booking
CREATE OR REPLACE FUNCTION create_tutorial_booking(p_business_id UUID)
RETURNS UUID AS $$
DECLARE
  v_booking_id UUID;
BEGIN
  INSERT INTO bookings (
    business_id,
    customer_name,
    customer_email,
    customer_phone,
    service,
    date_time,
    scheduled_time,
    status,
    notes,
    job_duration
  ) VALUES (
    p_business_id,
    'Tutorial Demo',
    'demo@example.com',
    '0400 000 000',
    'Demo Service - Delete Me When Ready',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '2 days',
    'confirmed',
    '📚 DEMO BOOKING: This is an example booking to show you how the system works. Click to view details, then delete it when you''re ready!',
    60
  )
  RETURNING id INTO v_booking_id;

  INSERT INTO tutorial_bookings (business_id) VALUES (p_business_id);

  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql;
```

**Click:** Run

**Expected:** Success message ✅

---

## 🧪 Step 2: Create a Test Business & User

### Option A: Use Supabase Dashboard (Quick Test)

**1. Create a test business:**
- Go to Supabase → Table Editor → `businesses`
- Insert row:
  ```
  business_name: "Test Tradie Business"
  phone_number: "+61400000000"
  status: "active"
  subscription_status: "active"
  ```
- **Copy the generated `id` (businessId)** - you'll need this!

**2. Create a test user via API:**

Use this curl command (replace the businessId):

```bash
curl -X POST https://www.coresentia.com.au/api/admin/create-client-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "businessId": "YOUR_BUSINESS_ID_HERE",
    "businessName": "Test Tradie Business"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "test@example.com"
  },
  "businessId": "...",
  "tutorialCreated": true,
  "message": "Client user account created successfully"
}
```

### Option B: Via Postman/Insomnia (Same API Call)

Use the same endpoint but with your preferred HTTP client.

---

## 🎬 Step 3: Test the Complete Flow

### 3.1: Test Login

**Go to:** https://www.coresentia.com.au/login

**Enter:**
- Email: `test@example.com`
- Password: `testpass123`

**Click:** Sign In

**Expected:**
- ✅ Redirects to `/dashboard/[businessId]`
- ✅ Shows the dashboard with your business data
- ✅ Shows **1 booking** (the tutorial booking!)

---

### 3.2: Explore the Dashboard

**You should see:**

1. **Header:**
   - "Bookings Dashboard"
   - List/Calendar toggle
   - Sign Out button

2. **Stats:**
   - 1 Upcoming booking
   - 1 Total booking
   - 1 Confirmed booking

3. **Bookings List:**
   - Tutorial Demo booking
   - Customer: "Tutorial Demo"
   - Service: "Demo Service - Delete Me When Ready"
   - Notes: "📚 DEMO BOOKING: This is an example..."
   - Status: Confirmed (green badge)
   - Date: 2 days from now

4. **Actions:**
   - Can switch to Calendar view
   - Can see the booking on the calendar
   - Can delete the demo booking
   - **Can sign out**

---

### 3.3: Test Calendar View

**Click:** Calendar View toggle

**Expected:**
- ✅ Shows calendar with the demo booking
- ✅ Booking appears 2 days from today
- ✅ Color-coded (green = confirmed)
- ✅ Can click to view details

---

### 3.4: Test Unauthorized Access

**Open incognito window**

**Go to:** `https://www.coresentia.com.au/dashboard/[businessId]`

**Expected:**
- ✅ Redirects to `/login`
- ✅ Can't see dashboard without logging in

**After logging in:**
- ✅ Redirects back to the dashboard

---

### 3.5: Test Sign Out

**Click:** Sign Out button

**Expected:**
- ✅ Logs out
- ✅ Redirects to `/login`
- ✅ Can't access dashboard anymore until logging in again

---

## 👥 Step 4: Test With Your Friend

Now that you've tested it yourself, test the **real client experience**:

### Simulate the Real Flow:

**1. Provision your friend as a client:**

```bash
curl -X POST https://www.coresentia.com.au/api/admin/create-client-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yourfriend@email.com",
    "password": "SecurePassword123!",
    "businessId": "[generate new UUID for their business]",
    "businessName": "Your Friends Business Name"
  }'
```

**2. Create their business record first** (if it doesn't exist):
- Supabase → `businesses` table
- Insert with their business details
- Copy the `id` to use as `businessId` in the API call above

**3. Send them their credentials:**

Email template:
```
Subject: 🚀 Your CoreSentia Dashboard is Ready!

Hi [Name],

Your SMS lead capture system is all set up!

Here's how to access your dashboard:

🔗 Dashboard: https://www.coresentia.com.au/login
📧 Email: yourfriend@email.com
🔐 Password: SecurePassword123!

What you'll see:
- A demo booking to show you how it works (feel free to delete it)
- Your leads from SMS conversations
- Your booking calendar
- Stats and insights

Questions? Just reply to this email!

Cheers,
[Your Name]
```

**4. Watch them test it:**
- Can they log in easily?
- Is the dashboard intuitive?
- Do they understand the demo booking?
- Can they navigate between list/calendar views?
- Any confusion or friction points?

---

## 🐛 Troubleshooting

### "Invalid login credentials"
- Check email/password are correct
- Check the user was created successfully
- Check Supabase Auth dashboard for the user

### "Database not configured" error
- Check Supabase env vars are set in Vercel
- Redeploy if needed

### Dashboard doesn't load after login
- Check browser console for errors
- Verify `user_businesses` table has the link
- Check businessId matches the URL

### Tutorial booking doesn't appear
- Check `bookings` table for the demo booking
- Verify `create_tutorial_booking` function ran successfully
- Check the business_id matches

---

## ✅ Success Criteria

You'll know it's working when:

- [  ] Migration runs successfully
- [  ] Can create user via API
- [  ] Can log in at /login
- [  ] Dashboard loads with correct data
- [  ] Tutorial booking appears
- [  ] Can switch between list/calendar views
- [  ] Can sign out
- [  ] Can't access dashboard when logged out
- [  ] Your friend can log in and use it

---

## 🎉 What's Next

Once testing is successful:

1. **Update PROVISIONING_SOP.md** with your learnings
2. **Test with a real client** (not just a friend)
3. **Gather feedback** on the UX
4. **Iterate** on any pain points

---

## 📝 Feedback to Track

When testing with your friend, ask:

1. **First impressions:** Was login easy? Intuitive?
2. **Dashboard clarity:** Did you immediately understand what you were looking at?
3. **Demo booking:** Did it help? Was it clear you should delete it?
4. **Navigation:** Easy to find everything?
5. **Confusion points:** What was unclear or confusing?
6. **Missing features:** What did you expect to see that wasn't there?

Take notes! These insights will drive your next iteration.

---

## 🚨 Known Limitations

Current system doesn't have:
- Password reset flow (they need to email you)
- Email verification (auto-confirmed)
- Multi-user per business (only 1 owner)
- Admin vs. staff roles
- Mobile app (web only)

These are fine for MVP - add if clients request!
