# Client Provisioning SOP
## From Deposit Paid → Client Live

---

## ✅ STEP 1: Deposit Received
**Trigger:** Xero invoice marked as paid

**Actions:**
- [ ] Send confirmation email: "Great! Let's get you set up..."
- [ ] Move to "Onboarding" status in CRM/spreadsheet

---

## ✅ STEP 2: Onboarding Form Completed
**Trigger:** Client submits form at `/onboarding`

**What You Get:**
- Business name, contact info
- Services offered
- Working hours
- Current booking process
- Business goals

**Actions:**
- [ ] Review submission in database (check `client_onboarding` table in Supabase)
- [ ] Note their businessId (UUID generated on submission)

---

## ✅ STEP 3: Provision Twilio Number

**Go to:** [Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/search)

**Actions:**
1. [ ] Search for available number (Australian mobile preferred)
2. [ ] Purchase number (~$1.50/month)
3. [ ] Configure SMS webhook:
   - **Webhook URL:** `https://www.coresentia.com.au/api/sms/webhook`
   - **HTTP Method:** POST
   - **Save** the number

**Record:**
- Phone number: `________________`
- SID: `________________`

---

## ✅ STEP 4: Create Business Record

**Go to:** Supabase Dashboard → `businesses` table

**Actions:**
1. [ ] Click "Insert Row"
2. [ ] Fill in:
   ```
   id: [use the businessId from onboarding, or generate new UUID]
   business_name: [from onboarding form]
   phone_number: [Twilio number from Step 3]
   status: 'active'
   subscription_status: 'active'
   created_at: [now]
   ```
3. [ ] Save record

**Record the businessId:**
- Business ID: `________________`

---

## ✅ STEP 5: Configure Business Settings

**Go to:** Supabase Dashboard → `business_settings` table

**Actions:**
1. [ ] Click "Insert Row"
2. [ ] Fill in:
   ```
   business_id: [businessId from Step 4]
   working_hours: {
     "monday": {"enabled": true, "start": "09:00", "end": "17:00"},
     "tuesday": {"enabled": true, "start": "09:00", "end": "17:00"},
     "wednesday": {"enabled": true, "start": "09:00", "end": "17:00"},
     "thursday": {"enabled": true, "start": "09:00", "end": "17:00"},
     "friday": {"enabled": true, "start": "09:00", "end": "17:00"},
     "saturday": {"enabled": false, "start": "09:00", "end": "13:00"},
     "sunday": {"enabled": false, "start": "09:00", "end": "17:00"}
   }
   default_travel_buffer: 30
   default_job_duration: 60
   ```
3. [ ] Customize based on onboarding form responses
4. [ ] Save

---

## ✅ STEP 6: Create Client Login Credentials

**CURRENT SYSTEM:** Manual - we need to build this

**FUTURE:**
- Generate magic link or email/password
- Send welcome email with login instructions

**For Now (Manual):**
- [ ] Email client: "Your dashboard: https://www.coresentia.com.au/dashboard/[businessId]"
- [ ] Include temporary password (once auth is built)

---

## ✅ STEP 7: Test The System

**Actions:**
1. [ ] Send test SMS to their new Twilio number
2. [ ] Verify:
   - AI responds appropriately
   - Lead appears in their dashboard
   - Conversation is captured
3. [ ] Check dashboard at `/dashboard/[businessId]`:
   - Loads correctly
   - Shows demo/tutorial booking
   - Calendar works
   - Stats display

---

## ✅ STEP 8: Client Handoff

**Send Welcome Email:**

```
Subject: 🚀 You're Live! Here's Your CoreSentia Dashboard

Hi [Name],

Great news - your SMS lead capture system is live!

📱 Your Number: [phone number]
🔗 Your Dashboard: https://www.coresentia.com.au/dashboard/[businessId]
🔐 Password: [temporary password]

What You Can Do:
• View all leads and conversations
• Manage your booking calendar
• Update your availability
• Track response rates

Getting Started:
1. Log in to your dashboard
2. You'll see a demo booking - feel free to delete it
3. Test the system by texting your number
4. Watch the magic happen!

Questions? Reply to this email or text me on [your number].

Welcome aboard!
[Your Name]
CoreSentia
```

---

## ✅ STEP 9: Monitor First Week

**Actions:**
- [ ] Day 1: Check they've logged in
- [ ] Day 3: Check for any incoming SMS activity
- [ ] Day 7: Follow up: "How's it going? Any questions?"

**Watch For:**
- Login issues
- Confusion about features
- AI response quality concerns
- Feature requests

---

## 🚨 BREAKS IN THE CHAIN (To Be Built)

### HIGH PRIORITY:
- [ ] **Authentication system** for client dashboards
- [ ] **Automated provisioning** (auto-buy Twilio number, auto-configure webhook)
- [ ] **Welcome email automation** triggered on onboarding completion

### MEDIUM PRIORITY:
- [ ] Tutorial/demo booking in dashboard
- [ ] First-login walkthrough
- [ ] Client settings UI (so they can update working hours themselves)

---

## 📊 Provisioning Checklist Template

**Client:** ________________
**Date:** ________________
**Provisioner:** ________________

- [ ] Step 1: Deposit confirmed
- [ ] Step 2: Onboarding form reviewed
- [ ] Step 3: Twilio number purchased & configured
- [ ] Step 4: Business record created
- [ ] Step 5: Business settings configured
- [ ] Step 6: Login credentials sent
- [ ] Step 7: System tested
- [ ] Step 8: Client handoff email sent
- [ ] Step 9: Day 1 check-in scheduled

**Notes:**
_______________________________________
_______________________________________
_______________________________________

**Time Taken:** ________ minutes
