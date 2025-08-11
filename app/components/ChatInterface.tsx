'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'

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

// Always-visible Reality Check Card
const AIRealityCheckCard = ({ onBook }: { onBook: () => void }) => {
  return (
    <div className="bg-gradient-to-r from-[#2A50DF]/10 to-[#62D4F9]/10 backdrop-blur-xl border border-[#62D4F9]/50 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-[#62D4F9]/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">🎯</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#62D4F9] font-montserrat tracking-[0.1em]">
            AI Reality Check™ - Free 40-min Strategy Session
          </h3>
          <p className="text-white/80 text-sm">
            Let's analyze your current AI spend and show you exactly how CoreSentia can replace multiple subscriptions with one solution you own forever.
          </p>
        </div>
      </div>
      <button 
        onClick={onBook}
        className="bg-[#62D4F9] text-black font-bold px-6 py-2 rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-sm whitespace-nowrap ml-4"
        style={{
          boxShadow: '0 0 15px rgba(98, 212, 249, 0.5)'
        }}
      >
        Book Your Session →
      </button>
    </div>
  )
}

// Quick Actions Component
const QuickActions = ({ onProductClick }: { onProductClick: (product: string) => void }) => {
  return (
    <div className="flex items-center gap-2 py-3 px-4 bg-black/50 backdrop-blur border-t border-[#62D4F9]/20">
      <span className="text-white/80 text-sm mr-2">💡 Quick Start:</span>
      <button 
        onClick={() => onProductClick('essentials')}
        className="px-4 py-2 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-sm"
      >
        Essentials $3k
      </button>
      <button 
        onClick={() => onProductClick('custom')}
        className="px-4 py-2 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-sm"
      >
        Custom $10k
      </button>
      <button 
        onClick={() => onProductClick('core')}
        className="px-4 py-2 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-sm"
      >
        Core™ $25k
      </button>
    </div>
  )
}

// Helper function to strip ACTION: tags from messages
const stripActionTags = (content: string): string => {
  return content
    .replace(/\(?\s*ACTION:\s*[A-Z_]+\s*\)?/g, '')
    .trim()
}

// Enhanced markdown formatter
const formatMessage = (text: string) => {
  if (!text || typeof text !== 'string') {
    return 'Sorry, I encountered an error. Please try again.';
  }
  
  const cleanedText = stripActionTags(text);
  
  const processInlineFormatting = (str: string) => {
    const elements = [];
    let lastIndex = 0;
    
    const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let match;
    
    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        elements.push(str.substring(lastIndex, match.index));
      }
      
      if (match[1]) {
        elements.push(<strong key={`bold-${match.index}`} className="font-semibold text-[#40FFD9]">{match[2]}</strong>);
      } else if (match[3]) {
        elements.push(
          <a 
            key={`link-${match.index}`}
            href={match[5]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#62D4F9] underline hover:text-[#40FFD9] transition-colors duration-300"
            style={{ textShadow: '0 0 5px #62D4F9' }}
          >
            {match[4]}
          </a>
        );
      }
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < str.length) {
      elements.push(str.substring(lastIndex));
    }
    
    return elements.length > 0 ? elements : str;
  };
  
  const lines = cleanedText.split('\n');
  
  return lines.map((line, lineIndex) => {
    if (!line.trim()) {
      return <div key={lineIndex} className="mb-2" />;
    }
    
    if (line.trim().match(/^[•\-\*]\s/)) {
      const bulletContent = line.trim().substring(2);
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-[#40FFD9]" style={{ textShadow: '0 0 4px #40FFD9' }}>•</span>
          <span>{processInlineFormatting(bulletContent)}</span>
        </div>
      );
    }
    
    const numberedMatch = line.trim().match(/^(\d+\.)\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-[#40FFD9]" style={{ textShadow: '0 0 4px #40FFD9' }}>{numberedMatch[1]}</span>
          <span>{processInlineFormatting(numberedMatch[2])}</span>
        </div>
      );
    }
    
    if (line.trim().startsWith('##')) {
      const headerContent = line.trim().substring(2).trim();
      return (
        <div key={lineIndex} className="font-semibold text-lg mb-3 mt-4 text-[#62D4F9]" style={{ textShadow: '0 0 6px #62D4F9' }}>
          {processInlineFormatting(headerContent)}
        </div>
      );
    }
    
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
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
  }, []);

  // Initialize lead
  useEffect(() => {
    const initializeLead = async () => {
      const specialLeadIds = ['homepage-visitor', 'test123', 'new-visitor'];
      
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

  // Handle booking Reality Check
  const handleBookRealityCheck = () => {
    window.open('https://calendar.app.google/X6T7MdmZCxF3mGBe7', '_blank')
  }

  // Handle product click
  const handleProductClick = (product: string) => {
    let message = '';
    switch(product) {
      case 'essentials':
        message = 'Tell me about the Essentials package';
        break;
      case 'custom':
        message = 'I want to know about the Custom solution';
        break;
      case 'core':
        message = 'What is Core™?';
        break;
    }
    setInput(message);
    // Trigger send
    setTimeout(() => {
      const sendButton = document.querySelector('[data-send-button]') as HTMLButtonElement;
      if (sendButton) sendButton.click();
    }, 100);
  }

  // Handle quote generation
  const handleGenerateQuote = async (actionData: any) => {
    console.log('handleGenerateQuote called with data:', actionData);
    
    if (!actionData?.data?.email) {
      console.log('Quote generation skipped - no email address yet');
      return;
    }
    
    try {
      const quoteResponse = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionData.data)
      })
      
      const quoteResult = await quoteResponse.json()
      
      if (quoteResult.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `✅ Quote #${quoteResult.quoteNumber} has been created!`
        }])
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ There was an issue creating your quote. Please email us at hello@coresentia.com and we'll sort it out right away.`
        }])
      }
    } catch (quoteError) {
      console.error('Error calling quote API:', quoteError)
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
      console.log('Full API response:', data)
      
      let messageContent = '';
      
      if (data.error) {
        messageContent = 'Sorry, I had a technical issue. Please try again or email us at hello@coresentia.com';
      } else if (data.blocked) {
        messageContent = data.message || "Thanks for chatting! Let's continue this conversation properly. Book a meeting: https://calendar.app.google/X6T7MdmZCxF3mGBe7";
      } else if (data.message) {
        messageContent = stripActionTags(data.message);
      } else {
        messageContent = 'Sorry, I encountered an unexpected error. Please try again.';
      }
      
      const aiMessage = { role: 'assistant', content: messageContent }
      setMessages(prev => [...prev, aiMessage])
      
      // Update sessionId if a new lead was created
      if (data.leadId && data.leadId !== sessionId) {
        setSessionId(data.leadId)
        
        const { data: newLead } = await supabase
          .from('leads')
          .select('*')
          .eq('id', data.leadId)
          .single()
        
        if (newLead) {
          setLead(newLead)
        }
      }

      // Check for actions
      if (data.actions && Array.isArray(data.actions)) {
        for (const action of data.actions) {
          if (action.type === 'generate_quote') {
            await handleGenerateQuote(action)
          }
        }
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
      <style jsx global>{`
        /* Custom Scrollbar Styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #62D4F9;
          border-radius: 4px;
          box-shadow: 0 0 2px #62D4F9;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #40FFD9;
          box-shadow: 0 0 5px #40FFD9;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #62D4F9 rgba(255, 255, 255, 0.05);
        }

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

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 8px #62D4F9, 0 0 16px #62D4F9;
          }
          50% {
            box-shadow: 0 0 12px #62D4F9, 0 0 20px #62D4F9;
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

      {/* Slim Header */}
      <div 
        className={`transition-all duration-300 ease-out z-20 flex-shrink-0 ${
          headerCollapsed 
            ? 'bg-black/95 backdrop-blur-xl py-2' 
            : 'bg-black/80 backdrop-blur-md py-3'
        }`}
        style={{
          borderBottom: headerCollapsed ? '2px solid rgba(98, 212, 249, 0.15)' : '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/CoreSentia_Transparent_Logo.png" 
                alt="CoreSentia" 
                width={200}
                height={80}
                className={`${headerCollapsed ? 'h-8' : 'h-12'} w-auto transition-all duration-300`}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(98, 212, 249, 0.8))'
                }}
              />
              <span className="text-white/80 text-lg montserrat-header">Welcome to Ivy</span>
            </div>
            
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-sm hover:shadow-[0_0_20px_#62D4F9]"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Main Chat Area with Glass Container */}
      <div className="flex-1 p-4 overflow-hidden">
        <div 
          className="h-full max-w-7xl w-full mx-auto flex flex-col"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(98, 212, 249, 0.3)',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Always Visible Reality Check Card */}
          <div className="flex-shrink-0 p-4 border-b border-[#62D4F9]/20">
            <AIRealityCheckCard onBook={handleBookRealityCheck} />
          </div>

          {/* Quick Actions Bar */}
          <QuickActions onProductClick={handleProductClick} />

          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar"
            style={{ minHeight: 0 }}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {message.role === 'assistant' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center mr-3 flex-shrink-0"
                      style={{
                        boxShadow: '0 0 8px #62D4F9, 0 0 16px #62D4F9'
                      }}
                    >
                      <span className="text-black text-sm font-bold">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] px-5 py-3 rounded-2xl text-base leading-relaxed text-white ${
                      message.role === 'user' 
                        ? 'bg-[#2A50DF] border border-[#2A50DF]' 
                        : 'bg-black/90 backdrop-blur-xl border border-[#62D4F9]/30'
                    }`}
                    style={{
                      boxShadow: message.role === 'user'
                        ? '0 0 12px #2A50DF, 0 0 20px #2A50DF'
                        : '0 0 8px rgba(98, 212, 249, 0.15), 0 0 16px rgba(98, 212, 249, 0.12)'
                    }}
                  >
                    {message.role === 'user' ? message.content : formatMessage(message.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div 
                    className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center mr-3 animate-pulse"
                    style={{
                      animation: 'glowPulse 2s ease-in-out infinite',
                    }}
                  >
                    <span className="text-black text-sm font-bold">I</span>
                  </div>
                  <div 
                    className="bg-black/90 backdrop-blur-xl border border-[#62D4F9]/30 text-white px-5 py-3 rounded-2xl"
                    style={{
                      boxShadow: '0 0 8px rgba(98, 212, 249, 0.15), 0 0 16px rgba(98, 212, 249, 0.12)'
                    }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{ animationDelay: '0ms', boxShadow: '0 0 2px #62D4F9' }}></div>
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{ animationDelay: '150ms', boxShadow: '0 0 2px #62D4F9' }}></div>
                      <div className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce" style={{ animationDelay: '300ms', boxShadow: '0 0 2px #62D4F9' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 p-6 border-t border-[#62D4F9]/30">
            <div className="flex space-x-3 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                style={{ fontSize: '16px' }}
                className="flex-1 px-5 py-3 bg-black/80 backdrop-blur-xl border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#62D4F9] transition-all duration-300 text-base"
              />
              <button
                data-send-button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 lg:px-8 py-3 bg-[#62D4F9] text-black rounded-full hover:bg-[#40FFD9] hover:scale-105 disabled:bg-white/10 disabled:text-white/50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-base"
                style={{
                  boxShadow: !loading && input.trim() 
                    ? '0 0 8px #62D4F9, 0 0 16px #62D4F9'
                    : 'none'
                }}
              >
                Send
              </button>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-sm text-white font-medium montserrat-header" style={{ textShadow: '0 0 2px rgba(255, 255, 255, 0.25)' }}>
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
