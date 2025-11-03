# CoreSentia Lead Pipeline & Workflow

**Last Updated:** October 27, 2025

This document explains the complete journey from lead to client, clarifying what the AI does automatically and what requires human follow-up.

---

## 🎯 The "Front Gate" Model

**CoreSentia is a lead capture and qualification system, NOT a full-service automation platform.**

**What We DO:**
- ✅ Capture leads 24/7 (SMS + Web Chat)
- ✅ Qualify leads (understand their business and needs)
- ✅ Collect contact information
- ✅ Notify you immediately
- ✅ Book appointments into your pipeline

**What We DON'T DO:**
- ❌ Send quotes automatically (you send them manually)
- ❌ Schedule calendar appointments automatically (you reach out to schedule)
- ❌ Process payments
- ❌ Provide full CRM/job management
- ❌ Handle rescheduling or customer service after initial booking

**Your Role:** Follow up with leads promptly, send personalized quotes, schedule calls, close deals.

---

## 📊 The Complete Pipeline

### Stage 1: Lead Arrives (Automated)

**Entry Points:**
1. **SMS** - Customer texts +61489087491
2. **Web Chat** - Visitor uses chat widget on coresentia.com.au

**What Happens:**
- AI greets them and asks what they need
- Lead is created in database with `status: 'new'`
- Conversation tracked in real-time

---

### Stage 2: Lead Qualification (Automated)

**AI Captures:**
- ✅ Name
- ✅ Email
- ✅ Phone (if via web chat; already have if SMS)
- ✅ Business name / Company
- ✅ Industry / Service type (e.g., "Landscaping", "Beauty Salon")
- ✅ Main challenge / Need (e.g., "Missing calls while on the job")
- ✅ Interest level (SMS Responder or Professional Package)

**Two Ways This Happens:**

#### Option A: Conversational Flow
AI naturally asks questions during chat:
```
AI: "What kind of business are you running?"
Lead: "I run a landscaping business"
AI: "Perfect! What's your biggest challenge with leads right now?"
Lead: "Can't answer my phone when I'm on the mower"
AI: "Makes sense. What's your name and email so I can get you a quote?"
Lead: "John Smith, john@company.com"
AI: "Thanks John! I've passed your details to the CoreSentia team..."
```

#### Option B: Quick Action Buttons
Lead clicks "Get Quote" or "Book Call" button → Form appears with fields:
- Name
- Company
- Email
- Phone
- **Industry / Service Type** (required)
- **What brings you here?** (optional but helpful)

---

### Stage 3: Action Triggered (Automated)

**When lead is qualified, AI triggers ONE of these actions:**

#### 💰 Quote Request (`ACTION: GENERATE_QUOTE`)
**What AI Says to Lead:**
> "Thanks [Name]! I've passed your details to the CoreSentia team. They'll email you a custom quote within 24 hours. Any other questions in the meantime?"

**What Happens in Backend:**
1. Lead saved to database
2. **You get SMS notification:**
   ```
   💰 QUOTE REQUEST
   Lead: John Smith
   Phone: 0400 123 456
   Email: john@company.com
   Industry: Landscaping
   Package: SMS Responder
   Challenge: Can't answer phone while working

   Check dashboard for full conversation.
   ```
3. Lead marked as `status: 'contacted'` in admin dashboard

**Your Action Required:**
- Open admin dashboard at https://www.coresentia.com.au/admin
- Review conversation history
- Send personalized quote via email (manually)
- Follow up if no response within 3-5 days

---

#### 📞 Meeting Request (`ACTION: BOOK_MEETING`)
**What AI Says to Lead:**
> "Perfect! The team has been notified and will reach out within a few hours to schedule your call. Is there anything else you'd like to know about our packages?"

**What Happens in Backend:**
1. Lead saved to database
2. **You get SMS notification:**
   ```
   📞 MEETING REQUEST
   Lead: Sarah Johnson
   Phone: 0411 234 567
   Email: sarah@beautybiz.com.au
   Industry: Beauty Salon
   Need: Need website with booking system

   Reach out to schedule a call.
   ```
3. Lead marked as `status: 'contacted'` in admin dashboard

**Your Action Required:**
- Review their info in admin dashboard
- Email or call them to schedule a time
- Add to your calendar (Google Calendar, Outlook, etc.)
- Prepare for the call with their specific needs in mind

---

#### 🚨 Human Handoff (`ACTION: HUMAN_HANDOFF`)
**When This Triggers:**
- Lead explicitly asks to speak with a human
- Lead asks complex/custom questions beyond AI knowledge
- AI detects frustration or confusion

**What AI Says to Lead:**
> "No problem! I'll let the CoreSentia team know you'd like to chat, and they'll reach out ASAP."

**What Happens in Backend:**
1. **You get SMS notification:**
   ```
   🚨 HUMAN REQUEST
   Lead: Tom Davidson
   Phone: 0422 345 678
   Email: tom@tomstrades.com
   Source: sms

   They want to speak with you! Check dashboard for conversation.
   ```
2. Lead marked as `status: 'contacted'` with HIGH urgency

**Your Action Required:**
- Respond ASAP (same day if possible)
- Review conversation to understand their concern
- Reach out via their preferred channel (SMS, email, or call)

---

### Stage 4: Your Follow-Up (Manual)

**Timeline Expectations (Set by AI):**
- **Quote Requests:** "Within 24 hours"
- **Meeting Requests:** "Within a few hours"
- **Human Handoff:** "ASAP" / "Promptly"

**Best Practices:**
1. **Respond Quickly** - Speed matters for lead conversion
2. **Reference Their Needs** - Personalize based on industry and challenge
3. **Be Clear About Next Steps** - What happens after they sign up?
4. **Use Their Preferred Channel** - SMS leads prefer SMS, web leads prefer email

**Tools You Use:**
- Admin Dashboard: https://www.coresentia.com.au/admin
- Email client (Gmail, Outlook, etc.)
- Your phone for calls/SMS
- Calendar app (Google Calendar, etc.)

---

### Stage 5: Deal Closed - Payment & Onboarding (Manual)

**When Lead Becomes Client:**

#### Step 1: Agreement & Deposit
1. Lead agrees to sign up
2. You send them:
   - **SERVICE_AGREEMENT_TEMPLATE.md** to review and sign
   - **Invoice for 50% deposit** ($499.50 for SMS Responder OR $1,250 for Professional)
   - Explain: "We require a 50% deposit to start work, with the remaining 50% due before go-live"

3. Once deposit received:
   - Mark them as `status: 'qualified'` in admin dashboard
   - Send them the onboarding form link

#### Step 2: Onboarding Form
4. Send client the onboarding form URL:
   - **https://www.coresentia.com.au/onboarding**
   - This is a web form they fill out online (takes 10-15 minutes)
   - Data automatically syncs to your admin dashboard

5. Once form submitted:
   - You receive notification
   - Review their responses in admin dashboard
   - If they booked optional setup call: Schedule 15-30 min chat to clarify details
   - Otherwise: Begin build immediately with form details

#### Step 3: Build & Setup
6. Build their AI receptionist system:
   - **SMS Responder:** 2-3 business days
   - **Professional Package:** 5-7 business days
7. Keep them updated on progress via email

#### Step 4: Testing & Final Payment
8. When ready for testing:
   - Send them access to test the system
   - Walk them through the dashboard
   - Make any final adjustments

9. Once they approve:
   - Send invoice for **remaining 50%** ($499.50 or $1,250)
   - Explain: "Final payment due before we go live"

#### Step 5: Go Live!
10. Once final payment received:
    - Activate their system (SMS number, website, etc.)
    - Send them login credentials
    - Provide training/walkthrough
    - Set up first monthly invoice (due 1st of next month)

**Payment Options:**
- **Option A (Recommended):** 50% deposit + 50% before go-live
  - Pro: Shows commitment, protects you from time wasters
  - Con: Two invoices to manage
- **Option B:** Full payment upfront
  - Pro: Simple, immediate cash flow
  - Con: Higher barrier to entry, may lose some leads
- **Option C:** Invoice on completion (Net 7)
  - Pro: Builds trust, easier for client
  - Con: Risk of non-payment after work done

**Recommendation:** Start with Option A (50/50 split). It's the industry standard for custom setup work and protects both parties.

**Files for This Stage:**
- Onboarding Form: https://www.coresentia.com.au/onboarding (live web form)
- Service Agreement: `/docs/SERVICE_AGREEMENT_TEMPLATE.md` (send as PDF)
- Both accessible from your docs folder

---

## 📱 Admin Dashboard Overview

**URL:** https://www.coresentia.com.au/admin

**What You Can See:**
- All leads in one view
- Filter by source (SMS / Web Chat)
- Filter by status (New / Contacted / Qualified / Closed)
- Full conversation history for each lead
- Lead contact info, industry, challenge

**What You Can Do:**
- View all conversations
- Update lead status (mark as contacted, qualified, closed)
- See stats (total leads, new leads, SMS vs web)
- Export lead data (coming soon)

**Quick Actions:**
- Click "Mark Contacted" after you reach out
- Click "Mark Qualified" when they agree to sign up
- Click "Mark Closed" if they're not interested or go quiet

---

## 🔄 Lead Stages & Statuses

| Status | Meaning | Your Action |
|--------|---------|-------------|
| **New** | Just came in, not yet contacted | Review and reach out ASAP |
| **Contacted** | You've reached out (quote sent, call scheduled) | Wait for response, follow up if needed |
| **Qualified** | They've agreed to sign up | Send invoice, get forms signed, start onboarding |
| **Closed** | Deal won (client onboarded) or lost (not interested) | Archive or mark as client |

---

## 📋 Quick Reference: What Happens When?

### Lead Requests Quote
1. ✅ AI captures: Name, Email, Phone, Industry, Challenge
2. ✅ AI confirms: "Quote will be sent within 24 hours"
3. ✅ AI triggers: `ACTION: GENERATE_QUOTE`
4. ✅ You get SMS with all details
5. ❌ **AI does NOT send quote** - You send it manually

### Lead Requests Call/Meeting
1. ✅ AI captures: Name, Email, Phone, Industry, Need
2. ✅ AI confirms: "Team will reach out to schedule"
3. ✅ AI triggers: `ACTION: BOOK_MEETING`
4. ✅ You get SMS with all details
5. ❌ **AI does NOT book calendar** - You schedule it manually

### Lead Wants to Speak with Human
1. ✅ AI confirms: "Team will reach out ASAP"
2. ✅ AI triggers: `ACTION: HUMAN_HANDOFF`
3. ✅ You get SMS notification
4. ✅ You respond directly via their preferred channel

---

## 🎓 Training: How to Handle Different Leads

### 1. **Hot Lead** (Ready to Buy)
**Signals:**
- "I want to sign up"
- "Send me the invoice"
- "Let's do this"

**Your Response:**
1. Confirm package choice (SMS Responder or Professional)
2. Send invoice immediately
3. Send onboarding form and service agreement
4. Set expectations for setup timeline (2-3 or 5-7 days)

---

### 2. **Warm Lead** (Interested, Needs Info)
**Signals:**
- "Tell me more about..."
- "How does it work exactly?"
- "What's included?"

**Your Response:**
1. Answer their questions personally (more detailed than AI can provide)
2. Offer a quick call to walk them through
3. Send case study or testimonial if you have one
4. Follow up in 3-5 days if no response

---

### 3. **Cold Lead** (Just Browsing)
**Signals:**
- "Just looking"
- "Not ready yet"
- "I'll think about it"

**Your Response:**
1. Add to nurture list (email them once a month with tips)
2. Offer to stay in touch
3. Don't pressure, but don't ghost them
4. Check in after 2-4 weeks

---

## ❓ FAQs About the Pipeline

### Q: Why doesn't the AI just send quotes automatically?
**A:** Because every business is different, and personalized quotes convert better. You can tailor pricing, messaging, and offers based on their specific situation. The AI captures the data, you close the deal.

### Q: What if I can't respond within the promised timeframe?
**A:** Be honest. Send a quick message: "Got your request! I'm swamped today, but I'll get you a detailed quote by tomorrow morning." Transparency builds trust.

### Q: Where is the CLIENT_ONBOARDING_FORM used?
**A:** AFTER someone signs up and pays. That form gathers all the technical details needed to set up their AI receptionist (business hours, services, tone, etc.). It's NOT for leads - it's for paying clients.

### Q: Can I integrate a calendar booking system?
**A:** Yes! You can add Calendly or Cal.com links later. For now, manual scheduling lets you qualify leads better and prevents unqualified people from booking your time.

### Q: What if a lead doesn't respond?
**A:** Follow up once after 3-5 days. If still no response, mark as "Closed - No Response" in dashboard. Don't chase forever.

---

## 🚀 Next Steps

Now that you understand the pipeline:

1. **Test It:** Use the web chat to trigger a quote request yourself
2. **Check Admin Dashboard:** Make sure you can see the lead and conversation
3. **Practice Your Follow-Up:** Draft email templates for quotes and meeting confirmations
4. **Set Expectations:** Decide your realistic response times (4 hours? Same day? 24 hours?)
5. **Start Small:** Get 5-10 leads through the system before scaling up

---

**Questions?** Review this doc anytime you're unclear on the workflow. The key takeaway: **AI captures and qualifies, YOU close the deal.**
