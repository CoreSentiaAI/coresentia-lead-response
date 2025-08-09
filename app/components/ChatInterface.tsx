'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

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
        elements.push(<strong key={`bold-${match.index}`} className="font-semibold text-[#40FFD9]">{match[2]}</strong>);
      } else if (match[3]) {
        // Link
        elements.push(
          <a 
            key={`link-${match.index}`}
            href={match[5]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#62D4F9] underline hover:text-[#40FFD9] transition-colors"
            style={{ textShadow: '0 0 8px #62D4F9' }}
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
          <span className="mr-2 text-[#40FFD9]" style={{ textShadow: '0 0 6px #40FFD9' }}>•</span>
          <span>{processInlineFormatting(bulletContent)}</span>
        </div>
      );
    }
    
    // Check if line is a numbered list
    const numberedMatch = line.trim().match(/^(\d+\.)\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-[#40FFD9]" style={{ textShadow: '0 0 6px #40FFD9' }}>{numberedMatch[1]}</span>
          <span>{processInlineFormatting(numberedMatch[2])}</span>
        </div>
      );
    }
    
    // Check if line is a header (starts with ##)
    if (line.trim().startsWith('##')) {
      const headerContent = line.trim().substring(2).trim();
      return (
        <div key={lineIndex} className="font-semibold text-lg mb-3 mt-4 text-[#62D4F9]" style={{ textShadow: '0 0 10px #62D4F9' }}>
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
  const [headerCollapsed, setHeaderCollapsed] = useState(false)
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Load Montserrat font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
    
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100)
    
    return () => clearTimeout(timeoutId)
  }, [messages])

  // Handle scroll for header collapse
  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current) {
        const scrollTop = messagesContainerRef.current.scrollTop;
        setHeaderCollapsed(scrollTop > 50);
      }
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lead]); // Add lead as dependency to satisfy ESLint

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
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Add custom scrollbar styles and font */}
      <style jsx global>{`
        /* Custom Scrollbar Styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #62D4F9, #2A50DF);
          border-radius: 5px;
          box-shadow: 0 0 6px #62D4F9;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #40FFD9, #62D4F9);
          box-shadow: 0 0 10px #40FFD9;
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #62D4F9 rgba(0, 0, 0, 0.3);
        }

        /* Fade in animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Glow pulse animation */
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 10px #62D4F9, 0 0 20px #62D4F9, 0 0 30px rgba(98, 212, 249, 0.4);
          }
          50% {
            box-shadow: 0 0 15px #62D4F9, 0 0 25px #62D4F9, 0 0 40px rgba(98, 212, 249, 0.6);
          }
        }

        .montserrat-header {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          letter-spacing: 0.15em;
        }
        
        body {
          font-family: 'Open Sans', system-ui, sans-serif;
        }
      `}</style>

      {/* Header - Collapsible with HDR effect */}
      <div 
        className={`transition-all duration-300 ease-out z-20 flex-shrink-0 ${
          headerCollapsed 
            ? 'bg-black/90 backdrop-blur-2xl py-2' 
            : 'bg-black/70 backdrop-blur-xl py-4 sm:py-6'
        }`}
        style={{
          borderBottom: headerCollapsed 
            ? '2px solid rgba(98, 212, 249, 0.3)' 
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: headerCollapsed 
            ? '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(98, 212, 249, 0.15)' 
            : '0 2px 10px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-300 ${headerCollapsed ? 'scale-75 origin-left' : ''}`}>
            <Image 
              src="/CoreSentia_Transparent_Logo.png" 
              alt="CoreSentia" 
              width={300}
              height={120}
              className={`${headerCollapsed ? 'h-10' : 'h-16 sm:h-20'} w-auto transition-all duration-300`}
              style={{
                filter: 'drop-shadow(0 0 25px rgba(98, 212, 249, 0.9)) drop-shadow(0 0 50px rgba(98, 212, 249, 0.4))'
              }}
            />
          </div>
          <h5 
            className={`text-white font-normal transition-all duration-300 montserrat-header ${
              headerCollapsed 
                ? 'opacity-0 max-h-0 overflow-hidden' 
                : 'opacity-100 max-h-20 mt-2 text-base sm:text-lg'
            }`}
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Hi {lead?.first_name && lead.first_name !== 'Web' ? lead.first_name : 'there'}, thank you for visiting CoreSentia. Chat with Ivy below to get started.
          </h5>
        </div>
      </div>

      {/* Main Chat Area with Enhanced Glass Container */}
      <div className="flex-1 p-4 overflow-hidden">
        <div 
          className="h-full max-w-6xl w-full mx-auto flex flex-col"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(98, 212, 249, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(98, 212, 249, 0.03)'
          }}
        >
          {/* Messages Container - Fixed height constraint */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar"
            style={{ minHeight: 0 }} // Important for flexbox overflow
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {message.role === 'assistant' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 flex-shrink-0"
                      style={{
                        boxShadow: '0 0 20px #62D4F9, 0 0 40px rgba(98, 212, 249, 0.5), 0 4px 15px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <span className="text-black text-sm font-bold">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] px-5 py-3 rounded-2xl text-base leading-relaxed text-white ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-[#2A50DF] to-[#2A50DF]/90' 
                        : ''
                    }`}
                    style={{
                      ...(message.role === 'assistant' ? {
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(98, 212, 249, 0.2)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(98, 212, 249, 0.08), inset 0 0 20px rgba(98, 212, 249, 0.02)'
                      } : {
                        border: '1px solid rgba(42, 80, 223, 0.3)',
                        boxShadow: '0 4px 24px rgba(42, 80, 223, 0.5), 0 0 30px rgba(42, 80, 223, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                      })
                    }}
                  >
                    {message.role === 'user' ? message.content : formatMessage(message.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3"
                    style={{
                      animation: 'glowPulse 2s ease-in-out infinite',
                    }}
                  >
                    <span className="text-black text-sm font-bold">I</span>
                  </div>
                  <div 
                    className="text-white px-5 py-3 rounded-2xl"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(98, 212, 249, 0.2)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(98, 212, 249, 0.08)'
                    }}
                  >
                    <div className="flex space-x-1">
                      <div 
                        className="w-2 h-2 bg-gradient-to-br from-[#40FFD9] to-[#62D4F9] rounded-full animate-bounce"
                        style={{
                          animationDelay: '0ms',
                          boxShadow: '0 0 6px #40FFD9'
                        }}
                      ></div>
                      <div 
                        className="w-2 h-2 bg-gradient-to-br from-[#40FFD9] to-[#62D4F9] rounded-full animate-bounce"
                        style={{
                          animationDelay: '150ms',
                          boxShadow: '0 0 6px #40FFD9'
                        }}
                      ></div>
                      <div 
                        className="w-2 h-2 bg-gradient-to-br from-[#40FFD9] to-[#62D4F9] rounded-full animate-bounce"
                        style={{
                          animationDelay: '300ms',
                          boxShadow: '0 0 6px #40FFD9'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area with HDR styling */}
          <div className="flex-shrink-0 p-6 border-t border-white/10">
            <div className="flex space-x-3 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                style={{ fontSize: '16px' }}
                className="flex-1 px-5 py-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#62D4F9] focus:shadow-[0_0_20px_rgba(98,212,249,0.3)] transition-all text-base"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 lg:px-8 py-3 bg-gradient-to-r from-[#62D4F9] to-[#40FFD9] text-black rounded-xl hover:from-[#40FFD9] hover:to-[#62D4F9] disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed transition-all font-semibold text-base"
                style={{
                  boxShadow: !loading && input.trim() 
                    ? '0 4px 20px rgba(98, 212, 249, 0.4), 0 0 30px rgba(64, 255, 217, 0.3)'
                    : 'none'
                }}
              >
                Send
              </button>
            </div>
            
            <div className="text-center space-y-1">
              <p 
                className="text-sm text-white font-medium montserrat-header"
                style={{ 
                  textShadow: '0 0 8px rgba(98, 212, 249, 0.5)',
                  letterSpacing: '0.1em'
                }}
              >
                Stop talking about AI. Start closing with it.
              </p>
              <p className="text-xs text-white/60">
                Copyright © CoreSentia 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
