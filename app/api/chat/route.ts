import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages, leadId, leadInfo } = await request.json()
    
    // Build context for Claude
    const systemPrompt = `You are Ava, CoreSentia's AI assistant. You're having a qualification conversation with ${leadInfo?.first_name || 'a potential client'}.

Your goals:
1. Understand their specific business challenges
2. Identify what tools/platforms they currently use (and monthly spend)
3. Determine their timeline and budget range
4. Assess if they're a decision maker
5. Based on their needs, either:
   - Offer to schedule a meeting with the CoreSentia team
   - Provide a ballpark quote for simple requests
   - Share relevant resources

Be conversational, professional, and genuinely interested in helping them. Keep responses concise.`

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      })
    })

    const data = await response.json()
    
    return NextResponse.json({ 
      message: data.content[0].text 
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}