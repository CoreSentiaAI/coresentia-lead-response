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
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#62D4F9] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2A50DF] rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="glass rounded-t-2xl p-8 border-b border-white/10">
            <h1 className="text-3xl font-bold gradient-text">coresentia ai consultation</h1>
            <p className="mt-3 text-gray-300">
              Hi {lead?.first_name || 'there'}, let's explore how we can help you
            </p>
          </div>

          {/* Chat Messages */}
          <div className="glass rounded-b-2xl">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
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
                        : 'glass text-gray-200'
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
                  <div className="glass text-gray-400 px-5 py-3 rounded-2xl">
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
            <div className="border-t border-white/10 p-6">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#62D4F9] transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold"
                >
                  Send
                </button>
              </div>
              {!lead?.email && (
                <p className="text-xs text-gray-500 mt-3">
                  I'm drowning in AI subscriptions - spending over $2k/month on different platforms but they don't talk to each other
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
