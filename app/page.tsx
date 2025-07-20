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

// Enhanced markdown formatter for messages
const formatMessage = (text: string) => {
  // Process the entire text for inline formatting first
  const processInlineFormatting = (str: string) => {
    const elements = [];
    let lastIndex = 0;
    
    // Combined regex for bold (**text**), links [text](url)
    const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let match;
    
    while ((match = regex.exec(str)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(str.substring(lastIndex, match.index));
      }
      
      if (match[1]) {
        // Bold text
        elements.push(<strong key={`bold-${match.index}`}>{match[2]}</strong>);
      } else if (match[3]) {
        // Link
        elements.push(
          <a 
            key={`link-${match.index}`}
            href={match[5]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#62D4F9] underline hover:text-[#62D4F9]/80 transition-colors"
          >
            {match[4]}
          </a>
        );
      }
      
      lastIndex = regex.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < str.length) {
      elements.push(str.substring(lastIndex));
    }
    
    return elements.length > 0 ? elements : str;
  };
  
  // Split by newlines to handle line structure
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Skip empty lines but add spacing
    if (!line.trim()) {
      return <div key={lineIndex} className="mb-2" />;
    }
    
    // Check if line is a bullet point
    if (line.trim().match(/^[•\-\*]\s/)) {
      const bulletContent = line.trim().substring(2);
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-[#62D4F9]">•</span>
          <span>{processInlineFormatting(bulletContent)}</span>
        </div>
      );
    }
    
    // Check if line is a numbered list
    const numberedMatch = line.trim().match(/^(\d+\.)\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-[#62D4F9]">{numberedMatch[1]}</span>
          <span>{processInlineFormatting(numberedMatch[2])}</span>
        </div>
      );
    }
    
    // Check if line is a header (starts with ##)
    if (line.trim().startsWith('##')) {
      const headerContent = line.trim().substring(2).trim();
      return (
        <div key={lineIndex} className="font-semibold text-lg mb-3 mt-4 text-[#62D4F9]">
          {processInlineFormatting(headerContent)}
        </div>
      );
    }
    
    // Regular line
    return (
      <div key={lineIndex} className={lineIndex < lines.length - 1 ? "mb-2" : ""}>
        {processInlineFormatting(line)}
      </div>
    );
  });
};

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
      className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-4"
      style={{
        backgroundImage: 'url(/CoreSentia_page_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        WebkitTextSizeAdjust: '100%',
        textSizeAdjust: '100%'
      } as React.CSSProperties}
    >
      {/* Chat interface */}
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-black rounded-t-2xl p-4 sm:p-6 md:p-8 border border-white/10">
          <div className="mb-4">
            <Image 
              src="/CoreSentia_Transparent_Logo.png" 
              alt="CoreSentia" 
              width={300}
              height={120}
              className="h-16 sm:h-20 w-auto -ml-1"
            />
          </div>
          <h5 className={"text-white text-base sm:text-lg font-normal " + montserrat.className}>
            Hi {lead?.first_name && lead.first_name !== 'Web' ? lead.first_name : 'there'}, thank you for visiting CoreSentia. Chat with Ivy below to get started.
          </h5>
        </div>

        {/* Messages */}
        <div className="bg-black rounded-b-2xl border border-white/10 border-t-0">
          <div className="h-[60vh] sm:h-[65vh] md:h-[600px] lg:h-[600px] max-h-[700px] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4" style={{ touchAction: 'pan-y' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={"flex " + (message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#62D4F9] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <span className="text-black text-xs font-bold">I</span>
                  </div>
                )}
                <div
                  className={"max-w-[92%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] px-4 sm:px-5 py-3 rounded-2xl text-base leading-relaxed " + 
                    (message.role === 'user' 
                      ? 'bg-[#2A50DF] text-white' 
                      : 'bg-black border border-white/20 text-white')
                  }
                >
                  {message.role === 'user' ? message.content : formatMessage(message.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-[#62D4F9] flex items-center justify-center mr-2 sm:mr-3 animate-pulse">
                  <span className="text-black text-xs font-bold">I</span>
                </div>
                <div className="bg-black border border-white/20 text-white px-4 sm:px-5 py-3 rounded-2xl max-w-[92%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%]">
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
          <div className="border-t border-white/10 p-4 sm:p-6 md:p-8">
            <div className="flex space-x-2 sm:space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                style={{ fontSize: '16px' }}
                className="flex-1 px-4 sm:px-5 py-3 bg-black border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#62D4F9] transition-colors text-base"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-5 sm:px-6 md:px-8 py-3 bg-[#62D4F9] text-black rounded-xl hover:bg-[#62D4F9]/90 disabled:bg-white/10 disabled:cursor-not-allowed transition-all font-semibold text-base"
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
