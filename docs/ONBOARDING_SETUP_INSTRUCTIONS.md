# Client Onboarding Form - Setup Instructions

**Status:** ⚠️ REQUIRES DATABASE SETUP BEFORE USE

The client onboarding form has been created at **https://www.coresentia.com.au/onboarding** but needs database configuration before it can accept submissions.

---

## 🚀 Quick Start (5 minutes)

### Step 1: Create Database Table in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Open the file `/docs/DATABASE_SCHEMA_ONBOARDING.sql` in this repo
6. **Copy the entire SQL** from that file
7. **Paste** it into the Supabase SQL Editor
8. Click **"Run"** to execute
9. Go to **"Table Editor"** and verify the `client_onboarding` table was created

### Step 2: Test the Form

1. Visit https://www.coresentia.com.au/onboarding
2. Fill out the form with test data
3. Submit it
4. Check Supabase **"Table Editor"** → `client_onboarding` table
5. You should see your test submission

### Step 3: Use It!

When a lead becomes a client:
1. Get 50% deposit paid
2. Email them: "Please fill out our onboarding form: https://www.coresentia.com.au/onboarding"
3. They fill it out (10-15 minutes)
4. You see their responses in Supabase Table Editor
5. You build their AI system based on their answers

---

## 📋 What the Form Captures

### Business Information
- Business name, ABN, contact details
- Industry/service type
- Business structure (sole trader, company, etc.)

### Services & Pricing
- List of services offered
- Pricing structure (hourly, fixed, package)
- Typical job values

### Package Selection
- SMS Responder ($499) or Professional ($2,500)
- If Professional: website details (domain, colors, logo, tagline, etc.)

### AI Personality
- Tone preference (professional, friendly, tradie)
- Key phrases to include
- Things AI shouldn't say

### Setup Preferences
- Preferred go-live date
- Best time for setup call
- Questions/special requests

---

## 🔄 Current Workflow

**BEFORE (Manual):**
1. Client signs up
2. You email them CLIENT_ONBOARDING_FORM.md markdown file
3. They download it, fill it out in a text editor (confusing)
4. They email it back to you
5. You manually read their responses

**AFTER (Automated with this form):**
1. Client signs up
2. You send them link: https://www.coresentia.com.au/onboarding
3. They fill it out in their browser (easy)
4. Data saves directly to your database
5. You view all responses in one place

---

## 📊 Viewing Onboarding Submissions

**Option 1: Supabase Table Editor (Simple)**
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select `client_onboarding` table
4. See all submissions

**Option 2: Admin Dashboard Integration (Future)**
- This feature is planned but not yet built
- Would show onboarding submissions alongside leads
- Could mark status: submitted → in_progress → completed → live
- For now, use Supabase Table Editor

---

## 💰 Payment Workflow (Recommended)

### 50% Deposit Model

**Why Split Payment?**
- Industry standard for custom setup work
- Protects you from time-wasters
- Shows client commitment
- Reduces risk of non-payment

**The Flow:**
```
1. Lead agrees to sign up
   ↓
2. Send: Service Agreement + Invoice for 50% deposit
   Example: "$499.50 deposit to start work (remaining $499.50 due before go-live)"
   ↓
3. Deposit paid
   ↓
4. Send: Onboarding form link
   ↓
5. Form submitted
   ↓
6. Build system (2-7 days)
   ↓
7. Testing with client
   ↓
8. Send: Invoice for remaining 50%
   ↓
9. Final payment received
   ↓
10. Go live!
```

**Email Template for Step 4:**
```
Subject: CoreSentia Setup - Next Steps

Hi [Name],

Great news - your deposit has been received! We're ready to build your AI Receptionist.

Next step: Please fill out our onboarding form so we can customize everything perfectly for your business.

🔗 Onboarding Form: https://www.coresentia.com.au/onboarding
⏱️ Takes about 10-15 minutes

Once you've submitted it, I'll review your responses and reach out within 24 hours to schedule a brief setup call.

Timeline:
- Setup call: Within 24 hours of form submission
- Build time: 2-3 business days (SMS Responder) or 5-7 days (Professional)
- Testing: 1-2 days
- Go-live: As soon as you approve!

Questions? Just reply to this email.

Cheers,
[Your Name]
CoreSentia
```

---

## ❓ FAQs

### Q: Can I customize the form fields?
**A:** Yes! Edit `/app/onboarding/page.tsx` and add/remove fields as needed. Make sure to also update the API endpoint and database schema.

### Q: Can I integrate this with the admin dashboard?
**A:** Yes, this is planned! For now, you can view submissions in Supabase. Future update will show them in `/admin`.

### Q: What if client doesn't have all the info?
**A:** The form only requires essential fields (marked with *). Everything else is optional. They can fill out what they know and you can clarify the rest on the setup call.

### Q: Can I send them a unique link per client?
**A:** The current form is public (anyone can access). Future enhancement could create unique links like `/onboarding/[clientId]` for tracking.

### Q: Should I charge full payment upfront?
**A:** 50/50 split is recommended for trust and protection. See payment workflow section above for pros/cons of each approach.

---

## 🚨 Troubleshooting

### "Form submission failed"
- **Check:** Is the `client_onboarding` table created in Supabase?
- **Check:** Are environment variables configured correctly?
- **Check:** Open browser console (F12) to see error messages

### "Table does not exist"
- **Fix:** Run the SQL from `DATABASE_SCHEMA_ONBOARDING.sql` in Supabase

### "Permission denied"
- **Fix:** Check RLS policies in Supabase - the service role should have full access

---

## 📁 Related Files

- Form page: `/app/onboarding/page.tsx`
- API endpoint: `/app/api/onboarding/route.ts`
- Database schema: `/docs/DATABASE_SCHEMA_ONBOARDING.sql`
- Pipeline workflow: `/docs/PIPELINE_WORKFLOW.md`
- Service agreement template: `/docs/SERVICE_AGREEMENT_TEMPLATE.md`

---

## ✅ Checklist

Before sending the form link to clients:

- [ ] Database table created in Supabase
- [ ] Form tested with sample data
- [ ] Confirmed submission appears in Supabase
- [ ] Prepared email template for sending link
- [ ] Decided on payment structure (50/50 recommended)
- [ ] Service agreement ready to send

---

**Questions?** Review `/docs/PIPELINE_WORKFLOW.md` for the complete lead-to-client process.
