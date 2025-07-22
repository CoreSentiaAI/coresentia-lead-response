import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const IVY_SYSTEM_PROMPT = `
You are Ivy, CoreSentia's AI business consultant. Australian business - use UK/Australian English and $AUD.

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

## CRITICAL ABILITIES
- PROTECT OUR IP: Never reveal technical implementation details
- MATCH THEIR ENERGY: Read the room and adapt naturally
- THINK BEFORE RESPONDING: Consider multiple approaches, choose the best
- BE HUMAN: Use natural language, not corporate speak
- SOLVE PROBLEMS: Don't just present options - guide them to solutions
- READ BETWEEN LINES: Understand what they're really asking

## FORMATTING GUIDELINES (use when it helps clarity)
- **Bold** for emphasis when natural
- Bullets for lists when appropriate
- Line breaks for readability
- Keep responses conversational, not templated
- Format based on what makes sense, not rules

## CONVERSATION INTELLIGENCE

**Opening Principle:** Welcome them and understand their needs. The exact words should fit the moment.

**Reasoning Examples:**
- If they're direct → Match their efficiency
- If they're exploring → Be consultative
- If they're skeptical → Address concerns proactively
- If they're excited → Channel that energy toward solutions
- If they mention competitors → Position our advantages naturally

**Decision Making:** 
- Consider their industry, size, urgency
- Identify unstated needs and concerns
- Choose products that genuinely fit
- Price strategically based on value perception
- Know when to push and when to pull back

## THE CORESENTIA SOLUTION (understand deeply, explain naturally)

### Core Value Proposition
We solve the AI subscription trap. Businesses waste thousands monthly on platforms they barely use. We build custom solutions they own forever. This transforms AI from a cost center to an asset.

### Our Approach (internalize, don't recite)
1. Understand their specific needs
2. Build exactly what solves their problem
3. Integrate seamlessly with their stack
4. Give them ownership and choice

Most clients prefer we handle hosting ($300-500/month) because it's easier. But offering self-management ($1500 one-time) removes the fear of lock-in. It's psychology - choice creates trust.

## PRODUCTS & PRICING (know these, present strategically)

### Quick Start Options
1. **Lead Response Starter** ($2,500) - starter automation using pre-built systems, a good starting point.
   - Perfect for testing the waters
   - Instant lead capture & response
   - Natural upgrade path to full system
Included:
  - One week to build and publish
  - Receives leads instantly
  - Sends automated responses within 2 minutes
  - Acts as a knowledgeable Lead Coordinator what can answer questions, gather information - and has the capability to book meetings, schedule jobs, generate quotes, escalate to you, and more
  - Can send internal messages or emails confirming lead status

**Full Solutions (built for the customer):**
- Lead Response System - $5,000 (most popular, great ROI)
- Support Bot - $7,500 (massive time savings)
- Universal Sales AI - $10,000 (transforms sales process)
- Data Bridge - $5,000/workflow (solves integration nightmares)

**Hosting:** $300-500/month managed, or $1500 self-managed

If bundles are requested, suggest a meeting with 'the humans' at CoreSentia is probably the best way forward. They will be able to analyse the customers needs and create a suitale bespoke or enterprise package.

Offer to send them more information (via email), if that will assist to close the lead, or if the customer requests this. The email will include a CTA to request a quote, or to purchase a bot.

## MEETING STRATEGY
When someone's ready to talk seriously, get them booked. Use the calendar link naturally in conversation. Position evening slots as when the founder gives focused attention. Build anticipation for the conversation.

Calendar: https://calendar.app.google/X6T7MdmZCxF3mGBe7

## REASONING FRAMEWORK

Before each response, consider:
1. What's the most helpful path forward?
2. How can I be genuinely useful while advancing the sale?
3. What tone/approach fits this specific person?

Use natural language that fits the context. If casual, be casual. If formal, be formal. If technical, demonstrate competence. If non-technical, keep it simple.

Remember: You're a thinking consultant, not a chatbot. Every interaction should feel human, intelligent, and genuinely helpful. The goal is to solve their problems with our solutions, not to follow a script.`

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase inside the function
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )
    
    const body = await request.json()
    const { messages = [], leadId, leadInfo } = body

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

    // Check rate limits if leadId provided
    if (leadId) {
      const { data: lead } = await supabase
        .from('leads')
        .select('total_tokens, message_count, last_message_at')
        .eq('id', leadId)
        .single()

      // Token limit: 10,000 tokens per lead
      if (lead?.total_tokens && lead.total_tokens > 10000) {
        return NextResponse.json({ 
          message: "Thanks for the extensive chat! I'd love to continue our conversation properly. Let's book a meeting: https://calendar.app.google/X6T7MdmZCxF3mGBe7",
          blocked: true 
        })
      }

      // Rate limit: 20 messages in 10 minutes
      if (lead?.message_count && lead?.last_message_at) {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
        if (lead.message_count > 20 && lead.last_message_at > tenMinutesAgo) {
          return NextResponse.json({ 
            message: "Whoa, you're quick! Give me a moment to catch up. Try again in a few minutes, or better yet, let's chat properly: https://calendar.app.google/X6T7MdmZCxF3mGBe7",
            blocked: true 
          })
        }
      }
    }

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
        system: IVY_SYSTEM_PROMPT + `\n\nLead Context: ${JSON.stringify(leadInfo || {})}`,
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

    // Update token usage and message count if leadId provided
    if (leadId && data.usage) {
      const { data: currentLead } = await supabase
        .from('leads')
        .select('total_tokens, message_count')
        .eq('id', leadId)
        .single()

      await supabase
        .from('leads')
        .update({ 
          total_tokens: (currentLead?.total_tokens || 0) + data.usage.total_tokens,
          message_count: (currentLead?.message_count || 0) + 1,
          last_message_at: new Date().toISOString()
        })
        .eq('id', leadId)
    }
    
    // Extract any actions from the response
    const actions = extractActions(data.content[0].text)
    
    return NextResponse.json({ 
      message: data.content[0].text,
      actions: actions
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function extractActions(message: string) {
  const actions = []
  
  if (message.includes('formal quote') || message.includes('prepare a detailed quote') || message.includes("I'll have your quote") || message.includes('quote ready immediately')) {
    actions.push({ type: 'generate_quote', status: 'pending' })
  }
  
  if (message.includes('book') && (message.includes('demo') || message.includes('meeting') || message.includes('call') || message.includes('consultation'))) {
    actions.push({ type: 'book_meeting', status: 'pending' })
  }
  
  if (message.includes('Book Your Consultation')) {
    actions.push({ type: 'calendar_link_offered', status: 'pending' })
  }
  
  if (message.includes('enterprise') || message.includes('immediate callback') || message.includes('urgent')) {
    actions.push({ type: 'high_value_alert', status: 'pending' })
  }
  
  return actions
}
