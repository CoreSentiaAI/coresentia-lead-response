# Client Booking Workflow

**Last Updated:** November 2, 2025

This document describes how YOUR CLIENTS' customers book appointments through their AI receptionist.

---

## 🎯 Overview

This is the **PRODUCT** that your clients use after they're onboarded. When someone buys CoreSentia, this is the system they get for managing their customer bookings.

**Important:** This is NOT about how you acquire CoreSentia clients. For that, see `CORESENTIA_SALES_PIPELINE.md`.

---

## 👥 Key Players

1. **Your Client** - The business owner (tradie, salon, etc.) who bought CoreSentia
2. **End Customer** - The person booking with your client (homeowner, beauty client, etc.)
3. **AI Receptionist** - The bot that handles bookings for your client
4. **You (CoreSentia)** - Only involved in setup, not day-to-day operations

---

## 📱 The Booking Flow

### Step 1: Customer Initiates Contact

**Entry Points:**
- **SMS** - Customer texts your client's dedicated business number
- **Web Chat** - Customer uses chat widget on your client's website

**Example:**
```
Customer: "Hi, I need my lawn mowed this week"
AI: "G'day! I can help with that. What's your address?"
```

---

### Step 2: AI Qualifies & Gathers Info

**AI Collects:**
- ✅ Customer name
- ✅ Contact details (phone/email)
- ✅ Service needed
- ✅ Location/address (for travel time calculation)
- ✅ Any special requirements

**Example:**
```
Customer: "123 Smith St, Brisbane. Just standard lawn mowing"
AI: "Perfect! Let me check available times..."
```

---

### Step 3: AI Suggests Available Times

**How It Works:**
- AI checks your client's calendar
- Considers working hours, existing bookings, blocked times
- Calculates travel time if needed
- Suggests 2-3 options in user-friendly format

**Example:**
```
AI: "I have these times available:
• Thursday 2:00 PM
• Friday 10:30 AM
• Saturday 9:00 AM

Which works best for you?"
```

---

### Step 4: Customer Agrees to Book

**What Happens:**
- Customer picks a time
- AI creates **PENDING** booking in calendar
- Booking shows as yellow/orange in client's dashboard
- **AI does NOT confirm yet** - needs client approval

**Example:**
```
Customer: "Thursday 2pm works"
AI: "Great! I've penciled you in for Thursday, November 5th at 2:00 PM.
The team will confirm shortly via SMS. Anything else you need?"
```

**Behind the Scenes:**
- Booking created with `status: 'pending'`
- Stored in database with all details
- Appears in client's calendar as unconfirmed

---

### Step 5: Client Gets SMS Notification

**SMS to YOUR CLIENT:**
```
📅 NEW BOOKING REQUEST

Customer: John Smith
Phone: 0400 123 456
Service: Lawn Mowing
Date: Thu, Nov 5 @ 2:00 PM
Address: 123 Smith St, Brisbane

Tap to confirm or decline:
[Link to booking dashboard]
```

**What Your Client Sees:**
- Booking in dashboard with "Confirm" and "Cancel" buttons
- All customer details
- Calendar view showing the time slot
- Can edit time/details if needed

---

### Step 6: Client Confirms or Declines

#### Option A: Client Confirms ✅

**Your Client Clicks "Confirm"**

**SMS to End Customer:**
```
✅ Booking Confirmed!

Your lawn mowing is booked for:
Thursday, Nov 5 at 2:00 PM

123 Smith St, Brisbane

[Business Name]
Ph: [Business Number]

Need to reschedule? Reply to this SMS
```

**SMS to Your Client (confirmation copy):**
```
✅ Booking Confirmed

John Smith - Lawn Mowing
Thu, Nov 5 @ 2:00 PM
123 Smith St, Brisbane

Added to your calendar.
```

**In Dashboard:**
- Booking turns green
- Status: `confirmed`
- Appears in confirmed bookings list
- Can still edit or cancel if needed

#### Option B: Client Declines ❌

**Your Client Clicks "Cancel" or "Decline"**

**SMS to End Customer:**
```
Sorry, that time slot is no longer available.

Would you like to book a different time?

Available slots:
• Friday 10:30 AM
• Saturday 9:00 AM

Reply with your choice or call us at [Business Number]
```

**In Dashboard:**
- Booking marked as `cancelled`
- Time slot freed up for other bookings
- Customer can request alternative time

---

### Step 7: Alternative Flow - Customer Requests Human

**When This Happens:**
- Customer asks complex questions
- Special requirements beyond standard booking
- Customer prefers speaking to a human

**Example:**
```
Customer: "Actually, I need to talk to someone about a larger project"
AI: "No worries! I'll have the team give you a call.
What's the best number to reach you on?"
```

**SMS to Your Client:**
```
🚨 CUSTOMER WANTS TO CHAT

John Smith wants to discuss a project
Phone: 0400 123 456
Context: Larger landscaping work beyond standard mowing

Please call them ASAP.
```

**Your Client's Action:**
- Call or SMS the customer directly
- Discuss their needs
- Manually create booking if agreed

---

## 📊 Booking States & What They Mean

| Status | Color | Meaning | Action Needed |
|--------|-------|---------|---------------|
| **Pending** | Yellow/Orange | AI created, awaiting client approval | Client must confirm or decline |
| **Confirmed** | Green | Client approved, customer notified | No action unless rescheduling needed |
| **Completed** | Blue | Job finished | Mark complete to track history |
| **Cancelled** | Red | Declined or cancelled by either party | Archived |

---

## 🔧 Client Dashboard Features

**What Your Clients Can Do:**

### Calendar View
- See all bookings visually
- Click booking to view details
- Edit time/duration
- Delete if needed
- Block time off (holidays, breaks)

### List View
- Filter by upcoming/past
- Search by customer name
- Sort by date
- Quick status updates

### Booking Management
- **Confirm** pending bookings
- **Edit** details (time, service, notes)
- **Delete** unwanted bookings
- **Mark Complete** when job done
- **Add Manual Booking** (walk-ins, phone calls)

### Time Management
- Block out holidays
- Set recurring blocked times
- Adjust working hours
- Set travel buffer times

---

## 🔔 Notification System

### SMS Notifications Sent To Clients:

1. **New Booking Request** (immediate)
   - When AI creates pending booking
   - Includes all details + confirm/decline actions

2. **Booking Confirmed** (confirmation receipt)
   - After client clicks confirm
   - Serves as reminder

3. **Customer Wants Human** (high priority)
   - When customer requests to speak with someone
   - Requires immediate response

4. **Booking Reminder** (optional, 24hrs before)
   - Reminds client of upcoming appointment
   - Coming soon feature

### SMS Notifications Sent To Customers:

1. **Booking Pending** (after AI suggests time)
   - "We've penciled you in, confirmation coming soon"

2. **Booking Confirmed** (after client approves)
   - Full details + business contact info

3. **Booking Cancelled** (if client declines)
   - Offer alternative times or invite them to call

4. **Booking Reminder** (optional, 24hrs before)
   - Reminder of their appointment
   - Coming soon feature

---

## 🚀 Setup Process (When Client First Onboards)

1. **You configure their system:**
   - Dedicated SMS number
   - Business hours
   - Service offerings
   - Pricing (if applicable)
   - AI tone/personality

2. **Client gets access:**
   - Dashboard URL: `coresentia.com.au/dashboard/[their-business-id]`
   - Login credentials
   - SMS notifications start

3. **Client starts receiving bookings:**
   - AI handles initial contact
   - Bookings appear in dashboard
   - Client confirms/manages from there

---

## ⚙️ Technical Flow (For Reference)

```
Customer SMS/Web Chat
    ↓
AI Conversation (Claude API)
    ↓
Booking Details Collected
    ↓
AI Creates Booking (status: pending)
    ↓
Database (Supabase) ← booking saved
    ↓
SMS Notification → YOUR CLIENT (Twilio)
    ↓
Client Views Dashboard
    ↓
Client Clicks "Confirm" or "Cancel"
    ↓
Booking Status Updated
    ↓
SMS Notifications → Customer + Client
```

---

## 🎯 Success Metrics (What Clients Track)

- **Booking Conversion Rate** - % of conversations that become bookings
- **Response Time** - How fast client confirms bookings
- **Missed Bookings** - Pending bookings that expire/get ignored
- **Customer Satisfaction** - Feedback from their customers
- **Time Saved** - Hours not spent answering phones

---

## 📋 Common Scenarios

### Scenario 1: Simple Booking (Happy Path)
1. Customer texts: "Need lawn mowed"
2. AI collects details, suggests times
3. Customer picks time
4. Booking created (pending)
5. Client confirms
6. Both parties get SMS confirmation
7. Job completed

### Scenario 2: Customer Can't Make Suggested Times
1. AI suggests 3 times
2. Customer: "None of those work"
3. AI: "What day works best for you?"
4. Customer: "Next Wednesday morning"
5. AI checks availability, suggests Wednesday slots
6. Customer agrees → booking created
7. Client confirms

### Scenario 3: Customer Needs Custom Quote
1. Customer: "Need full backyard renovation"
2. AI: "That's a bigger project - let me get someone to call you"
3. Triggers HUMAN_HANDOFF
4. Client gets SMS immediately
5. Client calls customer directly
6. Discusses scope, provides quote
7. If agreed, client manually creates booking in dashboard

### Scenario 4: Client is Unavailable
1. Booking request comes in
2. Client doesn't respond for 2 hours
3. **Reminder SMS** sent to client (coming soon)
4. Still no response after 4 hours
5. Booking expires, customer gets SMS:
   "Sorry, we couldn't confirm your booking. Please call [number] to schedule."

---

## ❓ FAQs

### Q: What if the client's calendar is full?
**A:** AI sees no available slots and says "We're fully booked this week. Can I get your details and we'll reach out with next available times?" Creates a lead instead of booking.

### Q: Can customers reschedule?
**A:** Yes, they can reply to the SMS or contact the business. Client updates booking in dashboard or AI handles it via conversation.

### Q: What if customer is a no-show?
**A:** Client marks booking as "no-show" or "cancelled". Can block that customer if repeat offender.

### Q: How does travel time work?
**A:** AI calculates drive time between jobs and blocks appropriate buffer time in calendar. Prevents overbooking.

### Q: Can clients have multiple staff calendars?
**A:** Coming soon feature. Currently one calendar per business.

---

## 🔄 Workflow Summary Diagram

```
CUSTOMER          AI              DATABASE        YOUR CLIENT
   |              |                  |                |
   |----SMS------>|                  |                |
   |              |                  |                |
   |<--Qualify----|                  |                |
   |              |                  |                |
   |---"Book"---->|                  |                |
   |              |                  |                |
   |              |---Save Pending-->|                |
   |              |                  |                |
   |<-"Penciled   |                  |----SMS-------->|
   |   in"--------|                  |                |
   |              |                  |                |
   |              |                  |<---Confirm-----|
   |              |                  |                |
   |<-Confirm SMS------------------------<------------|
   |              |                  |                |
```

---

## 📞 Support & Handoff

**When Client Has Issues:**
- Login problems → You help (CoreSentia support)
- Booking not showing up → You check database
- Customer service issues → Client handles (their customer)
- AI saying wrong things → You adjust prompts
- Calendar sync issues → You troubleshoot

**Clear Boundary:**
- **You handle:** Technical platform issues
- **Client handles:** Their customer relationships

---

**This is the product your clients pay for. Your job is to make sure it works seamlessly so they never miss a booking.**
