'use client'

import { useState, useEffect, useCallback } from 'react'
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
      content: `Hi! I'm Ava from CoreSentia. Thanks for taking the time to chat with me. I'd love to learn more about what brought you to us today. What specific challenges are you looking to solve?`
    }])
  }, [fetchLead])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

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
      {/* --- REFINED STATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
          <defs>
            <radialGradient id="aurora-grad-1" cx="20%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#2A50DF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2A50DF" stopOpacity="0" />
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-black/80 backdrop-blur-md rounded-t-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#62D4F9] to-[#2A50DF]">
              coresentia ai consultation
            </h1>
            {/* THIS IS THE FIX: "let's" is now "let's" */}
            <p className="mt-3 text-gray-200">
              Hi {lead?.first_name || 'there'}, let's explore how we can help you
            </p>
          </div>

          {/* Chat Messages */}
          <div className="bg-black/80 backdrop-blur-md rounded-b-2xl border border-white/20 border-t-0">
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
                        : 'bg-white/10 border border-white/20 text-gray-100'
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
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#62D4F9] transition-colors text-sm md:text-base"
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
