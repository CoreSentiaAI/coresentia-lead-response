'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600']
})

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

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Check URL parameters for leadId
    const urlParams = new URLSearchParams(window.location.search)
    const leadIdFromUrl = urlParams.get('id')
    
    const initializeLead = async () => {
      if (leadIdFromUrl) {
        // If we have a leadId from the URL, fetch that specific lead
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', leadIdFromUrl)
          .single()
        
        if (data) {
          setLead(data)
          setSessionId(leadIdFromUrl)
        } else {
          // Fallback if lead not found
          createNewSessionLead()
        }
      } else {
        // No leadId in URL, create a new session
        createNewSessionLead()
      }
    }
    
    const createNewSessionLead = async () => {
      const newSessionId = `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      setSessionId(newSessionId)
      
      const { data, error } = await supabase
        .from('leads')
        .insert({
          id: newSessionId,
          first_name: 'Web',
          last_name: 'Visitor',
          initial_message: 'Direct chat from ivy.coresentia.com',
          status: 'new',
          score: 0
        })
        .select()
        .single()
      
      if (data) {
        setLead(data)
      } else {
        // If insert fails, just use a mock lead
        setLead({
          id: newSessionId,
          first_name: 'Web',
          last_name: 'Visitor'
        })
      }
    }
    
    initializeLead()
    
    setMessages([{
      role: 'assistant',
      content: "Hi, I'm Ivy - What brings you to CoreSentia today? If you already know what you want or just need pricing, say the word and I'll skip straight to it."
    }])
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Save user message to database
    await supabase.from('conversations').insert({
      lead_id: sessionId,
      message: input,
      sender: 'lead'
    })

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          leadId: sessionId,
          leadInfo: lead
        })
      })
      
      const data = await response.json()
      const aiMessage = { role: 'assistant', content: data.message }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Save AI response to database
      await supabase.from('conversations').insert({
        lead_id: sessionId,
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
    <div 
      className="min-h-screen bg-black flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/CoreSentia_page_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Chat interface */}
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="bg-black rounded-t-2xl p-8 border border-white/10">
          <div className="mb-4">
            <Image 
              src="/CoreSentia_Transparent_Logo.png" 
              alt="CoreSentia" 
              width={300}
              height={120}
              className="h-20 w-auto -ml-1"
            />
          </div>
          <h5 className={"text-white text-lg font-normal " + montserrat.className}>
            Hi {lead?.first_name && lead.first_name !== 'Web' ? lead.first_name : 'there'}, thank you for visiting CoreSentia. Chat with Ivy below to get started.
          </h5>
        </div>

        {/* Messages */}
        <div className="bg-black rounded-b-2xl border border-white/10 border-t-0">
          <div className="h-[600px] overflow-y-auto p-8 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={"flex " + (message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#62D4F9] flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-black text-xs font-bold">I</span>
                  </div>
                )}
                <div
                  className={"max-w-[80%] px-5 py-3 rounded-2xl " + 
                    (message.role === 'user' 
                      ? 'bg-[#2A50DF] text-white' 
                      : 'bg-black border border-white/20 text-white')
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-[#62D4F9] flex items-center justify-center mr-3 animate-pulse">
                  <span className="text-black text-xs font-bold">I</span>
                </div>
                <div className="bg-black border border-white/20 text-white px-5 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-8">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-5 py-3 bg-black border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#62D4F9] transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-8 py-3 bg-[#62D4F9] text-black rounded-xl hover:bg-[#62D4F9]/90 disabled:bg-white/10 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Send
              </button>
            </div>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-white/60 font-medium">
                Stop talking about AI. Start closing with it.
              </p>
              <p className="text-xs text-white/40">
                Copyright © CoreSentia 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
