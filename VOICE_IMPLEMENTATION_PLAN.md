# Voice Call Feature Implementation Plan

**Created:** November 25, 2025
**Status:** Ready to Implement
**Priority:** High - Major Product Enhancement
**Estimated Time:** 2-3 days

---

## 🎯 Feature Overview

Add voice call capability to both SMS Responder and Professional packages. When customers call the Twilio number, they get a natural AI conversation that qualifies leads and books appointments.

### User Experience
1. Customer calls business number
2. AI answers with friendly greeting
3. Natural back-and-forth conversation (not robotic menu)
4. AI gathers: service needed, preferred time, customer details
5. AI creates PENDING booking in calendar
6. AI confirms verbally + sends SMS to business owner for approval
7. Business owner approves/declines via dashboard
8. Customer gets SMS confirmation once approved

---

## 🔧 Technical Architecture

### Voice Provider Decision: ✅ **Google Cloud Neural TTS via Twilio**

**Rationale:**
- **Quality:** 8.5/10 - Natural, professional, not robotic
- **Cost:** ~$0.10/min (voice + STT + TTS combined)
- **Integration:** Built directly into Twilio - zero extra complexity
- **Australian Accent:** `Google.en-AU-Neural2-A` available
- **Scale:** Production-ready, handles everything

**Alternative Considered:**
- ElevenLabs: 9.5/10 quality but 2x cost, separate integration, more complexity
- Decision: Start with Google, upgrade later if needed

### Cost Estimate
- 100 calls/month × 3min avg = ~$30/month
- Very reasonable for professional voice AI

---

## 📋 Implementation Checklist

### Phase 1: Core Voice Webhook (Day 1)
- [ ] Create `/api/voice/webhook` endpoint
  - Handles incoming calls from Twilio
  - Returns TwiML greeting with `<Gather>` for speech input
  - Uses Google Neural TTS voice: `Google.en-AU-Neural2-A`
  - Initial greeting: "Hi, you've reached [Business Name]. I'm the AI assistant. How can I help you today?"

- [ ] Create `/api/voice/conversation` endpoint
  - Receives speech-to-text from Twilio
  - Maintains conversation state (use session storage or database)
  - Sends to Claude Sonnet with voice-specific system prompt
  - Returns TwiML with AI response using `<Say>`
  - Loops back to `<Gather>` for continued conversation

- [ ] Voice-specific conversation state management
  - Store: call_sid, conversation_history, customer_data, booking_state
  - Use Supabase table: `voice_call_sessions`
  - TTL: 1 hour (auto-cleanup old sessions)

### Phase 2: Conversation Logic (Day 1-2)
- [ ] Adapt `lib/bot-prompts.ts` for voice
  - **Key Differences from SMS:**
    - Shorter responses (voice needs brevity)
    - Confirmation repeats: "Let me confirm: Thursday at 2pm for lawn mowing, is that correct?"
    - Verbal spelling: "Can you spell that for me?" for emails
    - Natural pauses: Use SSML `<break time="300ms"/>` for clarity
    - "I didn't catch that" handling

- [ ] Voice conversation flow
  1. Greeting & service inquiry
  2. Gather customer details (name, phone, address)
  3. Discuss timing & availability
  4. Confirm booking details verbally
  5. Create PENDING booking
  6. Close: "Perfect! I've penciled you in. [Business] will confirm via SMS shortly. Have a great day!"

- [ ] Action triggers (reuse existing)
  - `ACTION: CREATE_BOOKING` - same as SMS flow
  - `ACTION: HUMAN_HANDOFF` - take message + notify owner

### Phase 3: Integration with Existing System (Day 2)
- [ ] Reuse booking creation logic from `lib/notifications.ts`
  - `handleBookingCreation()` already exists
  - Works for both SMS and voice sources
  - Creates PENDING booking + sends SMS to owner

- [ ] Call recording setup
  - Enable in Twilio: `record="true"` in TwiML
  - Store recording URL in database
  - Link to booking record for quality/training

- [ ] Add call source tracking
  - Update `leads` table: add `source: 'sms' | 'webchat' | 'voice'`
  - Track conversion metrics by channel

### Phase 4: Fallback & Error Handling (Day 2-3)
- [ ] "I didn't understand" flow
  - After 3 failed attempts: "I'm having trouble hearing you. Let me take a message for the team."
  - Gather name + phone + brief message
  - Trigger `ACTION: HUMAN_HANDOFF`

- [ ] Dead air detection
  - If no speech detected for 10 seconds: "Are you still there?"
  - After 20 seconds total: "I'll let the team know you called. They'll reach out shortly."

- [ ] Timeout handling
  - Max call duration: 10 minutes (prevent runaway costs)
  - Graceful close: "I need to wrap up now. The team will call you back to continue."

### Phase 5: Business Hours & Routing (Day 3)
- [ ] 24/7 operation (as requested)
  - Voice AI answers all calls, any time
  - Same as SMS behavior

- [ ] Optional future: Business hours message
  - Store in business settings
  - After-hours variant: "Thanks for calling outside business hours. I can still help book your appointment..."

### Phase 6: Testing & Polish (Day 3)
- [ ] Test call scenarios
  - Happy path: Customer books successfully
  - Unclear speech: AI asks for clarification
  - Complex request: Triggers human handoff
  - Timeout/dropout: Graceful degradation

- [ ] Voice prompt refinement
  - Test actual voice output (not just text)
  - Adjust phrasing for natural speech
  - Add pauses/emphasis with SSML

- [ ] Dashboard integration
  - Show voice calls in conversation history
  - Link to call recording
  - Display transcript (generated from conversation log)

---

## 📁 Files to Create/Modify

### New Files
1. `/app/api/voice/webhook/route.ts` - Initial call handler
2. `/app/api/voice/conversation/route.ts` - Multi-turn conversation handler
3. `/lib/voice-prompts.ts` - Voice-specific system prompts (adapted from bot-prompts.ts)
4. `/lib/twilio-voice.ts` - TwiML generation helpers

### Modified Files
1. `/lib/bot-prompts.ts` - Export base prompts for reuse
2. `/lib/notifications.ts` - Add call recording URL storage
3. Database migration: Add `voice_call_sessions` table
4. Database migration: Add `source` column to leads table

---

## 🗄️ Database Schema Changes

### New Table: `voice_call_sessions`
```sql
CREATE TABLE voice_call_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  call_sid TEXT UNIQUE NOT NULL,
  business_id UUID REFERENCES businesses(id),
  customer_phone TEXT,
  conversation_history JSONB DEFAULT '[]',
  customer_data JSONB DEFAULT '{}',
  booking_state JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active', -- active, completed, failed
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

CREATE INDEX idx_voice_sessions_call_sid ON voice_call_sessions(call_sid);
CREATE INDEX idx_voice_sessions_expires ON voice_call_sessions(expires_at);
```

### Modified Table: `leads`
```sql
ALTER TABLE leads ADD COLUMN source TEXT DEFAULT 'sms';
-- Values: 'sms', 'webchat', 'voice'
```

---

## 🎙️ Voice-Specific Prompt Adaptations

### Key Differences from SMS/Chat
1. **Brevity:** Voice responses should be ~50% shorter
2. **Confirmation:** Always repeat back important details
3. **Clarity:** Use simple, unambiguous language
4. **Pacing:** Natural pauses between questions
5. **Error recovery:** Graceful handling of misheard speech

### Example Voice Prompt (from bot-prompts.ts)
```typescript
export const VOICE_SYSTEM_PROMPT = `
You are a friendly AI receptionist for ${business.name}. You're speaking on the phone.

VOICE GUIDELINES:
- Keep responses SHORT (1-2 sentences max)
- Speak naturally, like a receptionist would
- Always confirm important details: "Just to confirm, that's Thursday at 2pm?"
- If you didn't understand: "Sorry, I didn't catch that. Could you repeat?"
- Be warm and professional

${baseBusinessContext}

CONVERSATION FLOW:
1. Greet: "Hi, you've reached ${business.name}. How can I help you?"
2. Understand service needed
3. Gather customer details (name, phone)
4. Discuss timing: "When would work best for you?"
5. Confirm booking: "Perfect! I've got you down for..."
6. Close: "The team will confirm via text shortly. Have a great day!"
`;
```

---

## 🔐 Security & Privacy

- [ ] Call recording consent (if required by AU law)
  - Check: NSW, QLD, VIC recording laws
  - May need: "This call may be recorded for quality purposes"

- [ ] PII handling in transcripts
  - Don't log credit card numbers (shouldn't come up, but guard against)
  - Encrypt call recordings at rest

- [ ] Rate limiting
  - Max 100 calls/hour per number (prevent abuse)
  - Block numbers after 10 failed calls

---

## 📊 Success Metrics

Track these post-launch:
- Call volume per day
- Average call duration
- Booking conversion rate (voice vs SMS)
- Customer satisfaction (follow-up survey?)
- Cost per call

---

## 🚀 Launch Strategy

1. **Internal Testing** (Day 3)
   - Test with your own calls
   - Verify booking flow end-to-end
   - Check SMS notifications work

2. **Soft Launch** (Day 4)
   - Enable for 1-2 test clients
   - Monitor closely for issues
   - Gather feedback

3. **Full Launch** (Week 2)
   - Enable for all clients
   - Update marketing materials
   - Add "Call or Text" messaging to website

4. **Pricing Update**
   - Voice included in both packages (no extra charge)
   - Highlight as major feature: "AI answers your calls 24/7"

---

## 💡 Future Enhancements (Post-MVP)

- [ ] Multi-language support (Mandarin, Vietnamese for AU market)
- [ ] Sentiment analysis on calls
- [ ] Automatic follow-up if call drops
- [ ] Integration with Google/Apple Business listings
- [ ] Voicemail transcription
- [ ] Call transfer to business owner (emergency override)

---

## 🎯 Next Session Action Items

1. Start with Phase 1: Create `/api/voice/webhook` endpoint
2. Test with simple TwiML response
3. Make test call to verify Twilio routing works
4. Then proceed to conversation handling

---

**Questions to Resolve:**
- ✅ Voice provider: Google Cloud Neural TTS via Twilio
- ✅ Call recording: Yes, enable
- ✅ Fallback: Take a message
- ✅ Hours: 24/7 operation

**Ready to Build!** 🚀
