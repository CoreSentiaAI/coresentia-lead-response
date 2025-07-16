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
      {/* Bold Static Network Background */}
      <div className="absolute inset-0">
        {/* Bright gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#62D4F9] rounded-full filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#2A50DF] rounded-full filter blur-[120px] opacity-30"></div>
        <div className="absolute top-[50%] left-[30%] w-[400px] h-[400px] bg-[#62D4F9] rounded-full filter blur-[80px] opacity-20"></div>
        
        {/* Bright network visualization */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#62D4F9" stopOpacity="1" />
              <stop offset="100%" stopColor="#2A50DF" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Bright network lines */}
          <g filter="url(#glow)">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#62D4F9" strokeWidth="2" opacity="0.6" />
            <line x1="30%" y1="40%" x2="60%" y2="30%" stroke="#62D4F9" strokeWidth="2" opacity="0.6" />
            <line x1="60%" y1="30%" x2="85%" y2="50%" stroke="#62D4F9" strokeWidth="2" opacity="0.6" />
            <line x1="85%" y1="50%" x2="70%" y2="80%" stroke="#2A50DF" strokeWidth="2" opacity="0.6" />
            <line x1="70%" y1="80%" x2="40%" y2="70%" stroke="#2A50DF" strokeWidth="2" opacity="0.6" />
            <line x1="40%" y1="70%" x2="20%" y2="90%" stroke="#2A50DF" strokeWidth="2" opacity="0.6" />
            
            <line x1="20%" y1="10%" x2="50%" y2="20%" stroke="#62D4F9" strokeWidth="1.5" opacity="0.4" />
            <line x1="50%" y1="20%" x2="80%" y2="15%" stroke="#62D4F9" strokeWidth="1.5" opacity="0.4" />
            <line x1="15%" y1="60%" x2="45%" y2="55%" stroke="#2A50DF" strokeWidth="1.5" opacity="0.4" />
            <line x1="45%" y1="55%" x2="75%" y2="65%" stroke="#2A50DF" strokeWidth="1.5" opacity="0.4" />
          </g>
          
          {/* Glowing nodes */}
          <g filter="url(#glow)">
            <circle cx="10%" cy="20%" r="6" fill="#62D4F9" opacity="0.8" />
            <circle cx="30%" cy="40%" r="8" fill="#62D4F9" opacity="0.9" />
            <circle cx="60%" cy="30%" r="10" fill="url(#blueGradient)" opacity="1" />
            <circle cx="85%" cy="50%" r="7" fill="#2A50DF" opacity="0.8" />
            <circle cx="70%" cy="80%" r="9" fill="#2A50DF" opacity="0.9" />
            <circle cx="40%" cy="70%" r="6" fill="url(#blueGradient)" opacity="0.8" />
            <circle cx="20%" cy="90%" r="5" fill="#2A50DF" opacity="0.7" />
            
            <circle cx="20%" cy="10%" r="4" fill="#62D4F9" opacity="0.6" />
            <circle cx="50%" cy="20%" r="5" fill="#62D4F9" opacity="0.7" />
            <circle cx="80%" cy="15%" r="4" fill="#62D4F9" opacity="0.6" />
            <circle cx="15%" cy="60%" r="4" fill="#2A50DF" opacity="0.6" />
            <circle cx="45%" cy="55%" r="5" fill="url(#blueGradient)" opacity="0.7" />
            <circle cx="75%" cy="65%" r="4" fill="#2A50DF" opacity="0.6" />
          </g>
          
          {/* Pulse rings around major nodes */}
          <circle cx="60%" cy="30%" r="20" fill="none" stroke="#62D4F9" strokeWidth="0.5" opacity="0.3" />
          <circle cx="60%" cy="30%" r="30" fill="none" stroke="#62D4F9" strokeWidth="0.3" opacity="0.2" />
          <circle cx="30%" cy="40%" r="25" fill="none" stroke="#62D4F9" strokeWidth="0.3" opacity="0.2" />
          <circle cx="70%" cy="80%" r="22" fill="none" stroke="#2A50DF" strokeWidth="0.3" opacity="0.2" />
        </svg>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#62D4F9 1px, transparent 1px),
              linear-gradient(90deg, #62D4F9 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 0'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-black/90 backdrop-blur-md rounded-t-2xl p-8 border border-white/20">
            <h1 className="text-3xl font-bold gradient-text">coresentia ai consultation</h1>
            <p className="mt-3 text-gray-300">
              Hi {lead?.first_name || 'there'}, let&apos;s explore how we can help you
            </p>
          </div>

          {/* Chat Messages */}
          <div className="bg-black/90 backdrop-blur-md rounded-b-2xl border border-white/20 border-t-0">
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 flex-shrink-0 shadow-[0_0_20px_rgba(98,212,249,0.5)]">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white shadow-[0_0_30px_rgba(98,212,249,0.3)]'
                        : 'bg-white/10 border border-white/20 text-gray-200 backdrop-blur-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 animate-pulse shadow-[0_0_20px_rgba(98,212,249,0.5)]">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="bg-white/10 border border-white/20 text-gray-400 px-5 py-3 rounded-2xl backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce shadow-[0_0_10px_rgba(98,212,249,0.8)]" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce shadow-[0_0_10px_rgba(98,212,249,0.8)]" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce shadow-[0_0_10px_rgba(98,212,249,0.8)]" style={{animationDelay: '300ms'}}></div>
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
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#62D4F9] focus:shadow-[0_0_20px_rgba(98,212,249,0.3)] transition-all text-sm md:text-base backdrop-blur-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white rounded-xl hover:opacity-90 hover:shadow-[0_0_30px_rgba(98,212,249,0.5)] disabled:opacity-50 transition-all font-semibold text-sm md:text-base"
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
