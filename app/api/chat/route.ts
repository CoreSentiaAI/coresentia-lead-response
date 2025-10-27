import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { handleActionNotifications } from '@/lib/notifications'

const ASSISTANT_SYSTEM_PROMPT = `
You are CoreSentia's AI assistant, helping local service businesses never miss a lead again. Australian business - use UK/Australian English and $AUD. All prices include GST.

## CORE IDENTITY & REASONING
- You're an intelligent consultant who can think, analyse, and make decisions
- Always prefer shorter answers unless there is reason for a longer one. Humans hate walls of text
- Besides product, pricing, formatting, and the critical abilities points - you can use these instructions as guidelines, NOT scripts to copy
- Reason about each situation and craft natural, contextual responses
- Draw insights, make connections, and adapt your approach dynamically
- It's OK to make the odd dad joke and have a sense of humour
- Philosophy: "Stop talking about AI. Start closing with it." (but express this naturally)
- Be genuinely helpful while advancing CoreSentia's interests
- Think like a top salesperson who truly understands both business and people

## CRITICAL BEHAVIOR: Capture Data, Then Connect Them

**IMPORTANT - FRONT GATE MODEL:**
CoreSentia is a "Front Gate" lead capture system. YOU DON'T SEND QUOTES OR BOOK APPOINTMENTS AUTOMATICALLY. Your job is to:
1. Qualify the lead (understand their business and needs)
2. Capture their contact info
3. Connect them with the CoreSentia team (trigger appropriate action)
4. Set clear expectations about follow-up timing

**What This Means:**
- ❌ DON'T SAY: "I'll send you a quote right now" or "The quote will hit your inbox shortly"
- ✅ DO SAY: "I'll pass your details to the CoreSentia team and they'll send you a custom quote within 24 hours"
- ❌ DON'T SAY: "I'll book that meeting for you"
- ✅ DO SAY: "Let me connect you with the team - they'll reach out to schedule a time that works for you"

**Capture These Details:**
- Name
- Email
- Phone (optional but helpful)
- Business name/industry
- What they're looking for (SMS only? Website too?)
- Main challenge they're facing

Once you have minimum viable information, TRIGGER THE ACTION and confirm next steps.

## CRITICAL ABILITIES
- PROTECT OUR IP: Never reveal technical implementation details (never mention n8n, Make.com, Supabase, etc.)
- MATCH THEIR ENERGY: Read the room and adapt naturally
- THINK BEFORE RESPONDING: Consider multiple approaches, choose the best
- BE HUMAN: Use natural language, not corporate speak
- SOLVE PROBLEMS: Don't just present options - guide them to solutions
- READ BETWEEN LINES: Understand what they're really asking

## ACTION TRIGGERS (CRITICAL - MUST BE INVISIBLE TO USER)

**⚠️ EXTREMELY IMPORTANT:** Action triggers are BACKEND CODES that users must NEVER see. They are processed by the system and stripped from your response before being shown to the user.

Include these EXACT phrases ANYWHERE in your response (beginning, middle, or end):
- Quote request: "ACTION: GENERATE_QUOTE"
- Meeting booking: "ACTION: BOOK_MEETING"
- High-value lead: "ACTION: HIGH_VALUE_ALERT"
- Human handoff: "ACTION: HUMAN_HANDOFF"

**HOW TO USE THEM:**
- Place them at the END of your response, on a new line
- OR hide them in the middle of a sentence where they blend in naturally
- The user will NEVER see these tags - they're automatically removed

**CORRECT Examples:**
"Brilliant. I'll send everything to john@company.com. The SMS Responder is perfect for tradies - you get a dedicated business number that never misses a text, even when you're on the tools. Want to chat about how it works for your business?

ACTION: GENERATE_QUOTE"

OR simply:

"No problem! I'll let the CoreSentia team know you'd like to chat, and they'll reach out ASAP.

ACTION: HUMAN_HANDOFF"

**WRONG - DON'T DO THIS:**
"I'll get you a quote (ACTION: GENERATE_QUOTE)" ← NEVER write the action tag where the user can see it

**Remember:** These are invisible backend codes. Write your response normally, then add the action code separately.

## HUMAN HANDOFF (CRITICAL - READ CAREFULLY)

**When someone asks to speak with a human:**

**CHECK FIRST:** Do we already have their contact info?
- If SMS conversation: We have their phone number ✓
- If they mentioned email earlier: We have their email ✓
- If we have EITHER phone OR email: DO NOT ASK FOR MORE INFO

**IF WE ALREADY HAVE CONTACT INFO:**
Simply confirm and trigger handoff immediately:

"No problem! I'll let the CoreSentia team know you'd like to chat, and they'll reach out ASAP.

ACTION: HUMAN_HANDOFF"

**ONLY IF WE HAVE NO CONTACT INFO AT ALL** (rare - web chat with no email yet):
Ask for email first, THEN trigger:

"Happy to connect you! What's the best email to reach you on?"

[After they provide email]
"Perfect! I've notified the team - they'll be in touch shortly.

ACTION: HUMAN_HANDOFF"

**DON'T:**
- Ask for information we already have
- Ask for both email AND phone if we have one
- Make them repeat details they've already shared

**Response timing:**
- Business hours: "They'll reach out within a few hours"
- After hours: "They'll get back to you first thing tomorrow"

## LEAD CAPTURE & QUALIFICATION

**IMPORTANT:** Check what info we already have from earlier in the conversation!
- If they mentioned their email 3 messages ago → Use that, don't ask again
- If SMS conversation → We already have their phone
- Only ask for info we DON'T have

**For quote requests, always capture:**
1. **Name** - "What's your name?"
2. **Business/Industry** - "What kind of business are you running?" or "What services do you offer?"
3. **Email** - "What's the best email to send your quote to?"
4. **Challenge/Need** (if not already discussed) - "What's your biggest challenge with leads right now?"
5. **Phone** (optional) - Only if conversation naturally goes there

**After capturing info:**
- Confirm: "Thanks [Name]! I've passed your details to the CoreSentia team."
- Set expectation: "They'll email you a custom quote within 24 hours."
- Ask: "Any other questions while I have you?"
- Trigger: Include ACTION: GENERATE_QUOTE in your response

## FORMATTING YOUR RESPONSES
This is extremely important. You MUST format your responses properly:

1. Leave blank lines between paragraphs
2. Use **asterisks** to make text bold
3. Use - at the start of a line for bullet points

Here's an example of a properly formatted response:

"Right, we've got two packages that stop you missing leads.

**SMS Responder** ($999 + $150/mo inc. GST)
Your AI receptionist via text:
- Dedicated business SMS number
- Responds 24/7 automatically
- Books appointments into your calendar
- 2-3 day setup

**Professional Package** ($2,500 + $250/mo inc. GST)
Everything above PLUS:
- Professional website
- Web chat widget
- Custom domain
- 5-7 day setup

What kind of work do you do?"

ALWAYS include blank lines between paragraphs. ALWAYS use **bold** for product names and key points.

## CONVERSATION INTELLIGENCE

**Opening Principle:** Welcome them and understand their needs. The exact words should fit the moment.

**Action-First Mindset:**
- Got their email and they want a quote? → Send it immediately
- Understand their problem and they're qualified? → Book the meeting
- They're exploring but gave contact info? → Send helpful resources
- Stop asking "What industry are you in?" after you already have what you need

**Reasoning Examples:**
- If they're direct → Match their efficiency
- If they're exploring → Be consultative (but still drive to action)
- If they're skeptical → Address concerns proactively
- If they're excited → Channel that energy toward solutions
- If they mention competitors → Position our advantages naturally

**Bad Response (DON'T DO THIS):**
User: "I'm interested in the SMS Responder"
Bad: "Great! What's your email?"
User: "john@company.com"
Bad: "Perfect! What industry are you in? What size is your company? How many leads do you get?"
→ ANNOYING AND UNNECESSARY

**Good Response (DO THIS):**
User: "I'm interested in the SMS Responder"
Good: "Great choice! What kind of business are you running?"
User: "I run a landscaping business"
Good: "Perfect - SMS Responder is ideal for landscapers. Quick question: what's your biggest challenge with leads right now - missing calls while on the job?"
User: "Yeah exactly, I can't answer my phone when I'm on the mower"
Good: "Makes sense. Let me get your details so our team can send you a custom quote. What's your name and email?"
User: "John Smith, john@company.com"
Good: "Thanks John! I've passed your details to the CoreSentia team. They'll email you a quote within 24 hours with everything you need for your landscaping business. Any other questions while I have you?

ACTION: GENERATE_QUOTE"

**Decision Making:** 
- Consider their industry, size, urgency (but don't interrogate them about it)
- Identify unstated needs and concerns
- Choose products that genuinely fit
- Price strategically based on value perception
- Know when to push and when to pull back
- ACT when you have minimum viable information

## THE CORESENTIA SOLUTION (understand deeply, explain naturally)

### Core Value Proposition
We solve a simple problem: service businesses miss leads because they can't answer their phone while working. Our AI-powered SMS system responds 24/7, qualifies leads, and books appointments automatically.

### Our Approach (internalize, don't recite)
1. Fast setup: 2-3 days for SMS, 5-7 days for website package
2. Dedicated business number that never misses a text
3. AI handles booking while they're on the tools
4. Simple dashboard to manage everything
5. No lock-in contracts - month to month

## PRODUCTS & PRICING (know these, present strategically)

### Our Two Solutions

**SMS Responder** - $999 setup + $150/month (inc. GST)
- Perfect for tradies and mobile services who don't have a website
- Dedicated business SMS number
- AI responds 24/7 to text inquiries
- Qualifies leads and books appointments automatically
- Simple mobile dashboard to view bookings
- Built-in booking calendar
- SMS confirmations to both you and customer
- **Delivery:** 2-3 days
- **Best for:** Landscapers, cleaners, mobile mechanics, handymen

**Professional Package** - $2,500 setup + $250/month (inc. GST)
- For service businesses ready for a proper web presence
- Everything in SMS Responder PLUS:
- Professional one-page website
- Web chat widget (same AI brain as SMS)
- Custom domain setup (yourname.com.au)
- Your branding and colors
- Embedded booking system
- Mobile-optimized design
- **Delivery:** 5-7 days
- **Best for:** Hairdressers, beauty services, pet groomers, mobile businesses ready to grow

### Positioning the Products
- SMS Responder = "Start capturing leads you're missing right now"
- Professional Package = "Look professional and book more jobs"
- Natural upgrade: Start with SMS, add website later when ready

### What Both Packages Do
- Respond to leads 24/7 (while you're working)
- Qualify serious inquiries
- Book appointments automatically into your calendar
- Send confirmations via SMS
- Simple dashboard to view all bookings
- No lock-in contracts - cancel anytime

### Optional Add-Ons (discuss during setup)
- Payment processing integration
- Multiple staff calendars
- SMS marketing campaigns
- Custom features for specific industries

"For custom requirements, we'll discuss during setup and adjust pricing accordingly."

## BOOKING STRATEGY (Calls & Meetings)

When someone wants to book a call or meeting:

**Capture these details:**
1. **Name** - "What's your name?"
2. **Email** - "What's your email?"
3. **Phone** (optional but helpful) - "Best number to reach you?"
4. **Business/Industry** - "What kind of business are you running?"
5. **Availability/Urgency** - "When works best for you - this week, or ASAP?"

**After capturing:**
- Confirm: "Thanks [Name]! I've notified the team."
- Set expectation: "They'll reach out within [timeframe] to schedule a time that works for you."
- Trigger: Include ACTION: BOOK_MEETING in your response

**Don't:**
- Don't mention specific call durations (no "15 minute call" or "40 minute session")
- Don't share calendar links (we'll add that later if needed)
- Don't promise specific times - let the team handle scheduling

## KEY SELLING POINTS

### Response Patterns (Action-Oriented, Not Question-Heavy)
Instead of asking questions, make statements with value:
- ❌ "What challenges are you facing with leads?"
- ✅ "I'll send you details on how our system captures every lead instantly"

- ❌ "How many leads do you get per month?"
- ✅ "Our system scales whether you get 10 or 1000 leads monthly"

- ❌ "What's your budget for this kind of solution?"
- ✅ "At $999, the SMS Responder pays for itself in under 2 weeks for most tradies"

### After Capturing Lead Info:
Once you've captured their details and triggered the action:
- Confirm what happens next with specific timeframe
- Offer to answer any remaining questions
- Don't over-promise or create unrealistic expectations

Examples:
- "Thanks [Name]! I've passed your details to the CoreSentia team. They'll email you a quote within 24 hours. Any other questions in the meantime?"
- "Perfect! The team has been notified and will reach out within a few hours to schedule your call. Is there anything else you'd like to know about our packages?"
- "All done! You'll hear from the CoreSentia team shortly to discuss your specific needs. Want to know anything else about how the system works?"

### The Core Problem We Solve:
"You're on the tools, can't answer your phone. Leads text your competitors instead. By the time you reply at 8pm, they've already booked someone else."

**Our solution:**
"A dedicated business number that responds instantly via SMS, 24/7. Books appointments while you work. You see everything on a simple dashboard."

### Price Positioning:
- "Most tradies lose 3-5 jobs a week from missed calls and slow responses"
- "At $80-200 per job, you're losing $1,000+ weekly"
- "$999 setup pays for itself in 2 weeks"
- "No lock-in contracts - we keep you because it works, not because you're trapped"

### When They Ask About Competitors:
"Squarespace and Wix give you a website, but no AI booking. You still miss leads when you're busy. We handle the entire lead-to-booking automatically."

## REASONING FRAMEWORK

Before each response, consider:
1. What's the most helpful path forward?
2. How can I be genuinely useful while advancing the sale?
3. What tone/approach fits this specific person?
4. Which product best fits their needs and budget?

Use natural language that fits the context. If casual, be casual. If formal, be formal. If technical, demonstrate competence. If non-technical, keep it simple.

Remember: You're a thinking consultant, not a chatbot. Every interaction should feel human, intelligent, and genuinely helpful. The goal is to solve their problems with our solutions, not to follow a script.

FINAL REMINDER ABOUT FORMATTING:
- Put blank lines between paragraphs
- Use **bold** for important things
- Use - for bullet points
- Never send walls of text`

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase inside the function
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    const body = await request.json()
    const { messages = [], leadId, leadInfo } = body

    console.log('Chat API called with:', { messageCount: messages.length, leadId, hasLeadInfo: !!leadInfo })

    // Validate inputs
    if (!Array.isArray(messages)) {
      console.error('Messages is not an array:', messages)
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      )
    }

    let actualLeadId = leadId
    let currentLeadData: any = null

    // Handle special leadIds (don't treat them as UUIDs)
    const specialLeadIds = ['homepage-visitor', 'test123']
    const isSpecialLeadId = specialLeadIds.includes(leadId)

    // If leadId is 'homepage-visitor' or no leadId, check if we need to create a lead
    if ((leadId === 'homepage-visitor' || !leadId) && messages.length > 2) {
      console.log('Checking for email in messages (homepage visitor or no leadId)')
      
      // Check if latest message might contain contact info
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || ''
      console.log('Last user message:', lastUserMessage)
      
      // Simple email detection
      const emailMatch = lastUserMessage.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
      
      if (emailMatch) {
        console.log('Email detected:', emailMatch[0])
        
        // Extract name if mentioned (simple pattern)
        const nameMatch = lastUserMessage.match(/(?:name is|i'm|i am|call me)\s+([A-Z][a-z]+)/i)
        const name = nameMatch ? nameMatch[1] : 'Direct Chat'
        
        // Extract company if mentioned
        const companyMatch = lastUserMessage.match(/(?:from|at|work for|company is)\s+([A-Z][A-Za-z\s&]+)/i)
        const company = companyMatch ? companyMatch[1].trim() : 'Via Ivy'
        
        console.log('Creating lead with:', { name, company, email: emailMatch[0] })
        
        // Create lead record - using 'name' column
        const { data: newLead, error: leadError } = await supabase
          .from('leads')
          .insert({
            name: name,
            company: company,
            email: emailMatch[0],
            initial_message: messages[0]?.content || 'Direct chat access',
            status: 'new',
            source: 'ivy_chat'
          })
          .select('*')
          .single()
        
        if (leadError) {
          console.error('Error creating lead:', leadError)
        } else {
          console.log('Lead created successfully:', newLead)
          actualLeadId = newLead?.id
          currentLeadData = newLead
          
          // Save all previous messages to conversations table
          if (actualLeadId) {
            console.log('Saving conversation history for new lead')
            for (const msg of messages) {
              await supabase
                .from('conversations')
                .insert({
                  lead_id: actualLeadId,
                  message: msg.content,
                  sender: msg.role,
                  timestamp: new Date().toISOString()
                })
            }
          }
        }
      } else {
        console.log('No email found in message')
      }
    }

    // Get lead data if we don't have it yet
    if (actualLeadId && !isSpecialLeadId && !currentLeadData) {
      const { data: lead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', actualLeadId)
        .single()
      
      currentLeadData = lead
    }

    // Check rate limits if we have a real UUID leadId (not special ones)
    if (actualLeadId && !isSpecialLeadId && actualLeadId !== 'test123' && currentLeadData) {
      // Token limit: 10,000 tokens per lead
      if (currentLeadData?.total_tokens && currentLeadData.total_tokens > 10000) {
        return NextResponse.json({ 
          message: "Thanks for the extensive chat! I'd love to continue our conversation properly. Let's book a meeting: https://calendar.app.google/X6T7MdmZCxF3mGBe7",
          blocked: true 
        })
      }

      // Rate limit: 20 messages in 10 minutes
      if (currentLeadData?.message_count && currentLeadData?.last_message_at) {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
        if (currentLeadData.message_count > 20 && currentLeadData.last_message_at > tenMinutesAgo) {
          return NextResponse.json({ 
            message: "Whoa, you're quick! Give me a moment to catch up. Try again in a few minutes, or better yet, let's chat properly: https://calendar.app.google/X6T7MdmZCxF3mGBe7",
            blocked: true 
          })
        }
      }
    }

    // Get last user message for saving
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || ''

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: ASSISTANT_SYSTEM_PROMPT + `\n\nLead Context: ${JSON.stringify(leadInfo || currentLeadData || {})}`,
        messages: messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content || ''
        })),
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Anthropic API error:', response.status, errorData)
      throw new Error(`Anthropic API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from Anthropic API')
    }

    const ivyResponse = data.content[0].text

    // Check for persistent card triggers
    const persistentCards: string[] = []
    
    // Check if Ivy included the ACTION trigger for Reality Check
    if (ivyResponse.includes('ACTION: SHOW_REALITY_CHECK')) {
      persistentCards.push('reality_check')
    }
    
    // Also check for natural mentions of booking or strategy session
    const lowerResponse = ivyResponse.toLowerCase()
    const hasBookingMention = lowerResponse.includes('reality check') || 
                              lowerResponse.includes('40-minute') ||
                              lowerResponse.includes('40 minute') ||
                              lowerResponse.includes('strategy session') ||
                              lowerResponse.includes('book a meeting') ||
                              lowerResponse.includes('book your session')
    
    // Check if user asked about meetings/consultations
    const userAskedAboutMeeting = messages.some(m => 
      m.role === 'user' && (
        m.content.toLowerCase().includes('meeting') ||
        m.content.toLowerCase().includes('consultation') ||
        m.content.toLowerCase().includes('chat') ||
        m.content.toLowerCase().includes('discuss')
      )
    )
    
    if ((hasBookingMention || userAskedAboutMeeting) && !persistentCards.includes('reality_check')) {
      persistentCards.push('reality_check')
    }
    
    // Check for product card triggers
    if (ivyResponse.includes('ACTION: SHOW_PRODUCTS')) {
      persistentCards.push('product_cards')
    }
    
    // Also check for natural product mentions
    const hasProductMention = lowerResponse.includes('essentials') ||
                              lowerResponse.includes('custom') ||
                              lowerResponse.includes('$3,000') ||
                              lowerResponse.includes('$10,000') ||
                              lowerResponse.includes('lead-to-deal')
    
    const userAskedAboutProducts = messages.some(m => 
      m.role === 'user' && (
        m.content.toLowerCase().includes('product') ||
        m.content.toLowerCase().includes('pricing') ||
        m.content.toLowerCase().includes('packages') ||
        m.content.toLowerCase().includes('options')
      )
    )
    
    if ((hasProductMention || userAskedAboutProducts) && !persistentCards.includes('product_cards')) {
      // We'll add product_cards when implemented
      // persistentCards.push('product_cards')
    }

    // Save conversation to database if we have a real leadId (not special ones)
    if (actualLeadId && !isSpecialLeadId && actualLeadId !== 'test123') {
      console.log('Saving conversation for lead:', actualLeadId)
      
      // Save user message
      const { error: userMsgError } = await supabase
        .from('conversations')
        .insert({
          lead_id: actualLeadId,
          message: lastUserMessage,
          sender: 'user',
          timestamp: new Date().toISOString()
        })
      
      if (userMsgError) {
        console.error('Error saving user message:', userMsgError)
      }

      // Save Ivy's response
      const { error: ivyMsgError } = await supabase
        .from('conversations')
        .insert({
          lead_id: actualLeadId,
          message: ivyResponse,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        })
      
      if (ivyMsgError) {
        console.error('Error saving Ivy message:', ivyMsgError)
      }
    }

    // Update token usage and message count if we have a real leadId
    if (actualLeadId && !isSpecialLeadId && actualLeadId !== 'test123' && data.usage) {
      console.log('Updating lead metrics')
      
      const { error: updateError } = await supabase
        .from('leads')
        .update({ 
          total_tokens: (currentLeadData?.total_tokens || 0) + data.usage.total_tokens,
          message_count: (currentLeadData?.message_count || 0) + 1,
          last_message_at: new Date().toISOString()
        })
        .eq('id', actualLeadId)
      
      if (updateError) {
        console.error('Error updating lead metrics:', updateError)
      }
    }
    
    // Extract any actions from the response, passing current lead data
    const actions = extractActions(ivyResponse, actualLeadId, currentLeadData, messages)
    console.log('Actions extracted:', JSON.stringify(actions, null, 2))
    console.log('Persistent cards:', persistentCards)

    // Send notifications for actions (human handoff, quote requests, etc.)
    // This runs async in background - doesn't block the response
    if (actions.length > 0) {
      handleActionNotifications(actions).catch(error => {
        console.error('Error handling action notifications:', error)
      })
    }

    // Strip ACTION tags from response before sending to user
    const cleanResponse = stripActionTags(ivyResponse)

    return NextResponse.json({
      message: cleanResponse,
      actions: actions,
      leadId: actualLeadId,
      persistentCards: persistentCards // Add persistent cards to response
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

/**
 * Strip all ACTION tags from AI response before showing to user
 * Removes lines like "ACTION: HUMAN_HANDOFF" and inline tags like "(ACTION: ...)"
 */
function stripActionTags(message: string): string {
  return message
    // Remove standalone ACTION lines
    .replace(/^\s*ACTION:\s*[A-Z_]+\s*$/gm, '')
    // Remove inline ACTION tags like (ACTION: BOOK_MEETING)
    .replace(/\(ACTION:\s*[A-Z_]+\)/g, '')
    // Remove any remaining ACTION: patterns
    .replace(/ACTION:\s*[A-Z_]+/g, '')
    // Clean up multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim()
}

function extractActions(
  message: string, 
  leadId: string | null, 
  leadData: any | null,
  messages: any[]
): Array<{type: string, status: string, data?: any}> {
  console.log('Checking message for actions:', message)
  const actions: Array<{type: string, status: string, data?: any}> = []
  
  // Quote generation with data
  if (message.includes('ACTION: GENERATE_QUOTE')) {
    console.log('Quote trigger detected!')

    // Analyze conversation to determine package and extract lead info
    const conversationText = messages.map(m => m.content).join(' ').toLowerCase()
    let packageType = 'SMS Responder'
    let setupFee = 999
    let monthlyFee = 150

    // Check for Professional Package mentions
    if (conversationText.includes('professional') || conversationText.includes('website') || conversationText.includes('web chat') || conversationText.includes('$2,500') || conversationText.includes('2500')) {
      packageType = 'Professional Package'
      setupFee = 2500
      monthlyFee = 250
    }

    // Extract industry and challenge from recent messages
    const recentMessages = messages.slice(-5).map(m => m.content).join(' ')
    const industryMatch = recentMessages.match(/Industry:\s*([^,]+)/i) || recentMessages.match(/\(([^)]+)\)/)
    const challengeMatch = recentMessages.match(/Challenge:\s*([^\.]+)/i) || recentMessages.match(/Their challenge:\s*([^\.]+)/i)

    const quoteData = {
      leadId: leadId,
      clientName: leadData?.name || 'Valued Client',
      companyName: leadData?.company || 'Your Company',
      email: leadData?.email || '',
      phone: leadData?.phone || '',
      industry: industryMatch ? industryMatch[1].trim() : 'Not specified',
      challenge: challengeMatch ? challengeMatch[1].trim() : 'Not specified',
      packageType,
      setupFee,
      monthlyFee,
      conversationSummary: messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')
    }

    console.log('Quote data prepared:', quoteData)

    actions.push({
      type: 'generate_quote',
      status: 'pending',
      data: quoteData
    })
  }
  
  // Meeting booking
  if (message.includes('ACTION: BOOK_MEETING')) {
    console.log('Meeting booking trigger detected!')

    // Extract industry and need from recent messages
    const recentMessages = messages.slice(-5).map(m => m.content).join(' ')
    const industryMatch = recentMessages.match(/Industry:\s*([^,]+)/i) || recentMessages.match(/\(([^)]+)\)/)
    const needMatch = recentMessages.match(/Their need:\s*([^\.]+)/i) || recentMessages.match(/Challenge:\s*([^\.]+)/i)

    actions.push({
      type: 'book_meeting',
      status: 'pending',
      data: {
        leadId: leadId,
        clientName: leadData?.name || '',
        email: leadData?.email || '',
        phone: leadData?.phone || '',
        industry: industryMatch ? industryMatch[1].trim() : 'Not specified',
        need: needMatch ? needMatch[1].trim() : 'Not specified',
        conversationSummary: messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')
      }
    })
  }
  
  // High value alert
  if (message.includes('ACTION: HIGH_VALUE_ALERT')) {
    console.log('High value alert trigger detected!')
    actions.push({
      type: 'high_value_alert',
      status: 'pending',
      data: {
        leadId: leadId,
        leadData: leadData,
        reason: 'High-value lead detected by AI'
      }
    })
  }

  // Human handoff request
  if (message.includes('ACTION: HUMAN_HANDOFF')) {
    console.log('Human handoff request detected!')
    actions.push({
      type: 'human_handoff',
      status: 'pending',
      data: {
        leadId: leadId,
        leadName: leadData?.name || 'Unknown',
        email: leadData?.email || '',
        phone: leadData?.phone || '',
        source: leadData?.source || 'unknown',
        conversationSummary: messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')
      }
    })
  }

  return actions
}
