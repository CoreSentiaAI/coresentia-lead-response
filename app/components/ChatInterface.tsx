'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

interface ChatInterfaceProps {
  leadId: string
}

// Helper function to strip ACTION: tags from messages
const stripActionTags = (content: string): string => {
  // Remove ACTION: tags and any surrounding parentheses
  return content
    .replace(/\(?\s*ACTION:\s*[A-Z_]+\s*\)?/g, '')
    .trim()
}

// Enhanced markdown formatter for messages
const formatMessage = (text: string) => {
  // Ensure text is a string
  if (!text || typeof text !== 'string') {
    return 'Sorry, I encountered an error. Please try again.';
  }
  
  // Strip ACTION: tags first
  const cleanedText = stripActionTags(text);
  
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
  const lines = cleanedText.split('\n');
  
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

export default function ChatInterface({ leadId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>(leadId)
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100)
    
    return () => clearTimeout(timeoutId)
  }, [messages])

  useEffect(() => {
    const initializeLead = async () => {
      const specialLeadIds = ['homepage-visitor', 'test123', 'new-visitor'];
      
      // Only fetch lead data if it's not a special leadId
      if (leadId && !specialLeadIds.includes(leadId)) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', leadId)
          .single()
        
        if (data) {
          setLead(data)
          setSessionId(leadId)
        }
      }
      
      // If no lead found or new visitor, we'll let the backend create it when email is provided
      if (!lead) {
        setLead({
          id: leadId,
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
  }, [leadId])

  // Extract quote generation into its own function
  const handleGenerateQuote = async (actionData: any) => {
    console.log('handleGenerateQuote called with data:', actionData);
    
    // Check if we have minimum required data
    if (!actionData?.data?.email) {
      console.log('Quote generation skipped - no email address yet');
      // Don't show an error to the user since Ivy will handle asking for email
      return;
    }
    
    try {
      console.log('Calling quote generation API with data:', actionData.data)
      
      const quoteResponse = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionData.data)
      })
      
      console.log('Quote API response status:', quoteResponse.status)
      
      const quoteResult = await quoteResponse.json()
      console.log('Quote API response:', quoteResult)
      
      if (quoteResult.success) {
        console.log('Quote generated successfully:', quoteResult.quoteNumber)
        // Add a system message about quote being sent
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `✅ Quote #${quoteResult.quoteNumber} has been created in Xero!`
        }])
      } else {
        console.error('Quote generation failed:', quoteResult.error || 'Unknown error')
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ There was an issue creating your quote. Please email us at hello@coresentia.com and we'll sort it out right away.`
        }])
      }
    } catch (quoteError) {
      console.error('Error calling quote API:', quoteError)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ I couldn't generate your quote automatically. Please email us at hello@coresentia.com and we'll send it right over.`
      }])
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

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
      console.log('Full API response:', data) // Debug log
      
      // Handle different response formats and ensure we have a message
      let messageContent = '';
      
      if (data.error) {
        // API returned an error
        messageContent = 'Sorry, I had a technical issue. Please try again or email us at hello@coresentia.com';
      } else if (data.blocked) {
        // Rate limited
        messageContent = data.message || "Thanks for chatting! Let's continue this conversation properly. Book a meeting: https://calendar.app.google/X6T7MdmZCxF3mGBe7";
      } else if (data.message) {
        // Normal response - strip ACTION: tags before displaying
        messageContent = stripActionTags(data.message);
      } else if (typeof data === 'string') {
        // Fallback if API returns plain string
        messageContent = stripActionTags(data);
      } else {
        // Unknown format
        messageContent = 'Sorry, I encountered an unexpected error. Please try again.';
      }
      
      const aiMessage = { role: 'assistant', content: messageContent }
      setMessages(prev => [...prev, aiMessage])
      
      // Update sessionId if a new lead was created
      if (data.leadId && data.leadId !== sessionId) {
        setSessionId(data.leadId)
        
        // Fetch the new lead data
        const { data: newLead } = await supabase
          .from('leads')
          .select('*')
          .eq('id', data.leadId)
          .single()
        
        if (newLead) {
          setLead(newLead)
        }
      }

      // Check for any actions to take based on response
      if (data.actions && Array.isArray(data.actions)) {
        console.log('Actions found in response:', data.actions) // Debug log
        
        for (const action of data.actions) {
          console.log('Processing action:', JSON.stringify(action, null, 2))
          
          // Handle quote generation
          if (action.type === 'generate_quote') {
            console.log('Quote generation action found')
            await handleGenerateQuote(action)
          }
          
          // Handle meeting booking (future implementation)
          if (action.type === 'book_meeting') {
            console.log('Meeting booking requested - implement calendar integration')
          }
          
          // Handle high value alerts (future implementation)
          if (action.type === 'high_value_alert') {
            console.log('High value lead detected - send internal notification')
          }
        }
      } else {
        console.log('No actions found in response')
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
          <div 
            ref={messagesContainerRef}
            className="h-[60vh] sm:h-[65vh] md:h-[600px] lg:h-[600px] max-h-[700px] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4" 
            style={{ touchAction: 'pan-y' }}
          >
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
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
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
