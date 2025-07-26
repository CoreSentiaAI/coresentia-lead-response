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

## LEAD CAPTURE (for direct visitors)
If no lead context provided and after initial rapport:
- Naturally ask for their email to "send information" or "keep them updated"
- Once email provided, you'll have their details tracked
- Keep it conversational: "Where should I send the details?" or "What's the best email to reach you?"
- Never mention forms or technical tracking

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

    let actualLeadId = leadId

    // If no leadId, check if we need to collect details
    if (!actualLeadId && messages.length > 2) { // After a couple messages
      // Check if latest message might contain contact info
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || ''
      
      // Simple email detection
      const emailMatch = lastUserMessage.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
      
      if (emailMatch) {
        // Extract name if mentioned (simple pattern)
        const nameMatch = lastUserMessage.match(/(?:name is|i'm|i am|call me)\s+([A-Z][a-z]+)/i)
        const firstName = nameMatch ? nameMatch[1] : 'Direct Chat'
        
        // Extract company if mentioned
        const companyMatch = lastUserMessage.match(/(?:from|at|work for|company is)\s+([A-Z][A-Za-z\s&]+)/i)
        const company = companyMatch ? companyMatch[1].trim() : 'Via Ivy'
        
        // Create lead record
   const { data: newLead, error: leadError } = await supabase
     .from('leads')
     .insert({
       first_name: firstName,
       company: company,
       phone: 'Pending',
       email: emailMatch[0],
       initial_message: messages[0]?.content || 'Direct chat access',
       status: 'new',
       source: 'direct_chat'
  })
  .select('id')
  .single()

   if (leadError) {
     console.error('Failed to create lead:', leadError)
     console.error('Lead data attempted:', {
       first_name: firstName,
       company: company,
       email: emailMatch[0]
  })
} else {
  console.log('Lead created successfully:', newLead)
  actualLeadId = newLead?.id
}
    // Check rate limits if leadId provided
    if (actualLeadId) {
      const { data: lead } = await supabase
        .from('leads')
        .select('total_tokens, message_count, last_message_at')
        .eq('id', actualLeadId)
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

    // Get the current user message
    const currentUserMessage = messages[messages.length - 1]?.content || ''

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

    const ivyResponse = data.content[0].text

    // Save conversations to Supabase (only if we have a real leadId, not test)
    if (actualLeadId && actualLeadId !== 'test123') {
      try {
        // Save user message
        await supabase.from('conversations').insert({
          lead_id: actualLeadId,
          message: currentUserMessage,
          sender: 'user',
          timestamp: new Date().toISOString()
        })

        // Save Ivy's response
        await supabase.from('conversations').insert({
          lead_id: actualLeadId,
          message: ivyResponse,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        })

        console.log('Conversations saved for lead:', actualLeadId)
      } catch (error) {
        console.error('Failed to save conversations:', error)
        // Don't fail the request if conversation saving fails
      }
    }

    // Update token usage and message count if leadId provided
    if (actualLeadId && data.usage) {
      const { data: currentLead } = await supabase
        .from('leads')
        .select('total_tokens, message_count')
        .eq('id', actualLeadId)
        .single()

      await supabase
        .from('leads')
        .update({ 
          total_tokens: (currentLead?.total_tokens || 0) + data.usage.total_tokens,
          message_count: (currentLead?.message_count || 0) + 1,
          last_message_at: new Date().toISOString()
        })
        .eq('id', actualLeadId)
    }

    // Extract any actions from the response
    const actions = extractActions(ivyResponse)
    
    // Check if Ivy has collected enough info for a quote
    if (actions.some(a => a.type === 'generate_quote')) {
      // Extract qualification data from conversation
      const qualificationData = await extractQualificationFromConversation(actualLeadId, messages, supabase)
      if (qualificationData) {
        actions.push({ 
          type: 'quote_data_ready', 
          status: 'ready',
          data: qualificationData 
        })
      }
    }
    
    return NextResponse.json({ 
      message: ivyResponse,
      actions: actions,
      leadId: actualLeadId // Return the leadId so frontend can track it
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function extractActions(message: string): Array<{ type: string; status: string; data?: any }> {
  const actions: Array<{ type: string; status: string; data?: any }> = []
  
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

// Helper function to extract qualification data from conversation
async function extractQualificationFromConversation(leadId: string, messages: any[], supabase: any) {
  try {
    // Get lead details
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single()
    
    if (!lead) return null

    // Analyze conversation for package type mentioned
    const conversationText = messages.map(m => m.content).join(' ').toLowerCase()
    let packageType = 'Lead Response Starter' // Default
    let amount = 2500
    
    if (conversationText.includes('custom') || conversationText.includes('5000') || conversationText.includes('5,000')) {
      packageType = 'Lead Response System'
      amount = 5000
    }
    
    return {
      clientName: lead.first_name || lead.name || 'Valued Client',
      companyName: lead.company || 'Your Company',
      email: lead.email,
      phone: lead.phone || 'Not provided',
      packageType,
      amount,
      description: `${packageType} - AI-powered lead response system`
    }
  } catch (error) {
    console.error('Failed to extract qualification data:', error)
    return null
  }
}
