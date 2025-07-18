'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'https://xrndfmndipazjyqlozic.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybmRmbW5kaXBhemp5cWxvemljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjgyNzgsImV4cCI6MjA2ODE0NDI3OH0.BhRjqnA06Kn0kOogjwW1DcwaHd5cHfbCnr_OdPzfKVw'
)

interface Message {
  role: string
  content: string
}

interface Lead {
  id: string
  first_name?: string
  last_name?: string
  company?: string
  phone?: string
  email?: string
  initial_message?: string
}

export default function ChatPage({ params }: { params: { leadId: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchLead = useCallback(async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', params.leadId)
      .single()
    
    if (data) setLead(data)
  }, [params.leadId])

  useEffect(() => {
    fetchLead()
    setMessages([{
      role: 'assistant',
      content: `Hi, I'm Ivy - here to help you get what you need, fast. What brings you to CoreSentia today, and what are you hoping to solve?`
    }])
  }, [fetchLead])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Save user message to database
    await supabase.from('conversations').insert({
      lead_id: params.leadId,
      message: input,
      sender: 'lead'
    })

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
      
      // Save AI response to database
      await supabase.from('conversations').insert({
        lead_id: params.leadId,
        message: data.message,
        sender: 'bot'
      })

      // Check for any actions to take based on response
      if (data.actions) {
        // Handle quote generation, meeting booking, etc.
        console.log('Actions to take:', data.actions)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I had a technical issue. Please try again or email us at hello@coresentia.com' 
      }])
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background with aurora effect */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
          <defs>
            <radialGradient id="aurora-grad-1" cx="20%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="aurora-grad-2" cx="80%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#62D4F9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#62D4F9" stopOpacity="0" />
            </radialGradient>
            <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="rgba(255, 255, 255, 0.1)"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="black" />
          <rect width="100%" height="100%" fill="url(#aurora-grad-1)" />
          <rect width="100%" height="100%" fill="url(#aurora-grad-2)" />
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      {/* Chat interface */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-md rounded-t-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g fill="#0066ff">
                  <circle cx="50" cy="20" r="3"/>
                  <circle cx="30" cy="30" r="3"/>
                  <circle cx="70" cy="30" r="3"/>
                  <circle cx="20" cy="50" r="3"/>
                  <circle cx="80" cy="50" r="3"/>
                  <circle cx="30" cy="70" r="3"/>
                  <circle cx="70" cy="70" r="3"/>
                  <circle cx="50" cy="80" r="3"/>
                </g>
                <g stroke="#0066ff" strokeWidth="1" fill="none">
                  <line x1="50" y1="20" x2="30" y2="30"/>
                  <line x1="50" y1="20" x2="70" y2="30"/>
                  <line x1="30" y1="30" x2="20" y2="50"/>
                  <line x1="70" y1="30" x2="80" y2="50"/>
                  <line x1="20" y1="50" x2="30" y2="70"/>
                  <line x1="80" y1="50" x2="70" y2="70"/>
                  <line x1="30" y1="70" x2="50" y2="80"/>
                  <line x1="70" y1="70" x2="50" y2="80"/>
                </g>
              </svg>
              <span className="text-2xl font-light text-white">coresentia</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              AI Consultation
            </h1>
            <p className="mt-3 text-gray-200">
              Hi {lead?.first_name || 'there'}, let&apos;s explore how we can help you.
            </p>
          </div>

          {/* Messages */}
          <div className="bg-black/80 backdrop-blur-md rounded-b-2xl border border-white/20 border-t-0">
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0066ff] to-[#62D4F9] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs font-bold">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#0066ff] to-[#62D4F9] text-white'
                        : 'bg-white/10 border border-white/20 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0066ff] to-[#62D4F9] flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-white text-xs font-bold">I</span>
                  </div>
                  <div className="bg-white/10 border border-white/20 text-gray-400 px-5 py-3 rounded-2xl">
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
            <div className="border-t border-white/20 p-4 md:p-6">
              <div className="flex space-x-2 md:space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#0066ff] transition-colors text-sm md:text-base"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#0066ff] to-[#62D4F9] text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold text-sm md:text-base"
                >
                  Send
                </button>
              </div>
              
              <div className="mt-4 md:mt-6 text-center space-y-2">
                <p className="text-xs md:text-sm text-gray-300 font-medium">
                  Stop talking about AI. Start closing with it.
                </p>
                <p className="text-xs text-gray-400">
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
