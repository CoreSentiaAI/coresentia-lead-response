'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'https://xrndfmndipazjyqlozic.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybmRmbW5kaXBhemp5cWxvemljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjgyNzgsImV4cCI6MjA2ODE0NDI3OH0.BhRjqnA06Kn0kOogjwW1DcwaHd5cHfbCnr_OdPzfKVw'
)

export default function ChatPage({ params }: { params: { leadId: string } }) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch lead data
    fetchLead()
    // Add initial greeting
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm Ava from CoreSentia. Thanks for taking the time to chat with me. I'd love to learn more about what brought you to us today. What specific challenges are you looking to solve?`
    }])
  }, [])

  const fetchLead = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', params.leadId)
      .single()
    
    if (data) setLead(data)
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Save to conversations table
    await supabase.from('conversations').insert({
      lead_id: params.leadId,
      message: input,
      sender: 'lead'
    })

    // Get AI response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          leadId: params.leadId,
          leadInfo: lead
        })
      })
      
      const data = await response.json()
      const aiMessage = { role: 'assistant', content: data.message }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Save AI response
      await supabase.from('conversations').insert({
        lead_id: params.leadId,
        message: data.message,
        sender: 'bot'
      })
    } catch (error) {
      console.error('Error:', error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Static Network Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#62D4F9] rounded-full filter blur-[150px] opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#2A50DF] rounded-full filter blur-[200px] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#62D4F9] rounded-full filter blur-[250px] opacity-5"></div>
        </div>

        {/* Network grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#62D4F9" opacity="0.5" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#62D4F9" strokeWidth="0.25" opacity="0.3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#62D4F9" strokeWidth="0.25" opacity="0.3" />
            </pattern>
            
            <radialGradient id="networkGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#62D4F9" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2A50DF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Static network connections */}
          <g opacity="0.3">
            <path d="M 20% 30% Q 50% 20% 80% 40%" stroke="url(#networkGradient)" strokeWidth="1" fill="none" />
            <path d="M 10% 60% Q 40% 50% 70% 70%" stroke="url(#networkGradient)" strokeWidth="1" fill="none" />
            <path d="M 30% 80% Q 60% 70% 90% 50%" stroke="url(#networkGradient)" strokeWidth="1" fill="none" />
            <path d="M 5% 20% Q 35% 40% 65% 30%" stroke="url(#networkGradient)" strokeWidth="0.5" fill="none" />
            <path d="M 40% 10% Q 60% 30% 85% 20%" stroke="url(#networkGradient)" strokeWidth="0.5" fill="none" />
          </g>
          
          {/* Network nodes */}
          <g opacity="0.4">
            <circle cx="20%" cy="30%" r="3" fill="#62D4F9" />
            <circle cx="80%" cy="40%" r="4" fill="#2A50DF" />
            <circle cx="10%" cy="60%" r="2" fill="#62D4F9" />
            <circle cx="70%" cy="70%" r="3" fill="#2A50DF" />
            <circle cx="30%" cy="80%" r="2" fill="#62D4F9" />
            <circle cx="90%" cy="50%" r="3" fill="#2A50DF" />
            <circle cx="50%" cy="20%" r="4" fill="#62D4F9" />
            <circle cx="60%" cy="90%" r="2" fill="#2A50DF" />
          </g>
        </svg>

        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-screen">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-sm rounded-t-2xl p-8 border border-white/10">
            <h1 className="text-3xl font-bold gradient-text">coresentia ai consultation</h1>
            <p className="mt-3 text-gray-300">
              Hi {lead?.first_name || 'there'}, let&apos;s explore how we can help you
            </p>
          </div>

          {/* Chat Messages */}
          <div className="bg-black/80 backdrop-blur-sm rounded-b-2xl border border-white/10 border-t-0">
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white'
                        : 'bg-white/5 border border-white/10 text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 text-gray-400 px-5 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4 md:p-6">
              <div className="flex space-x-2 md:space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#62D4F9] transition-colors text-sm md:text-base"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold text-sm md:text-base"
                >
                  Send
                </button>
              </div>
              
              {/* Tagline and Copyright */}
              <div className="mt-4 md:mt-6 text-center space-y-2">
                <p className="text-xs md:text-sm text-gray-400 font-medium">
                  Stop talking about AI. Start closing with it.
                </p>
                <p className="text-xs text-gray-500">
                  Copyright © CoreSentia 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
