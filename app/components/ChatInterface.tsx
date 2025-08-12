'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Target, 
  Sparkles, 
  FileText, 
  Calendar,
  MessageSquare,
  Zap,
  Brain,
  DollarSign,
  Briefcase,
  ChevronDown,
  HelpCircle,
  Send,
  Mic,
  PaletteIcon
} from 'lucide-react'

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

// Interactive Palette Tools
const PaletteTools = ({ onToolClick }: { onToolClick: (tool: string) => void }) => {
  const [showHelp, setShowHelp] = useState(false)
  
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-8 z-20">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onToolClick('quote')}
          className="group relative w-12 h-12 lg:w-14 lg:h-14 bg-black/60 backdrop-blur-xl border border-[#62D4F9]/30 rounded-xl flex items-center justify-center hover:border-[#62D4F9] hover:bg-[#62D4F9]/10 transition-all hover:scale-110"
          title="Get a quote"
        >
          <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-[#62D4F9]" />
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-opacity pointer-events-none">
            Get instant quote
          </span>
        </button>
        
        <button
          onClick={() => onToolClick('meeting')}
          className="group relative w-12 h-12 lg:w-14 lg:h-14 bg-black/60 backdrop-blur-xl border border-[#2A50DF]/30 rounded-xl flex items-center justify-center hover:border-[#2A50DF] hover:bg-[#2A50DF]/10 transition-all hover:scale-110"
          title="Book meeting"
        >
          <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-[#2A50DF]" />
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-opacity pointer-events-none">
            Book consultation
          </span>
        </button>
        
        <button
          onClick={() => onToolClick('products')}
          className="group relative w-12 h-12 lg:w-14 lg:h-14 bg-black/60 backdrop-blur-xl border border-[#40FFD9]/30 rounded-xl flex items-center justify-center hover:border-[#40FFD9] hover:bg-[#40FFD9]/10 transition-all hover:scale-110"
          title="Explore products"
        >
          <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-[#40FFD9]" />
          <span className="absolute left-16 opacity-0 group-hover:opacity-100 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-opacity pointer-events-none">
            Explore solutions
          </span>
        </button>
      </div>
    </div>
  )
}

// Enhanced Reality Check Card with Lucide icons
const AIRealityCheckCard = ({ onBook }: { onBook: () => void }) => {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="bg-gradient-to-r from-[#2A50DF]/10 to-[#62D4F9]/10 backdrop-blur-xl border border-[#62D4F9]/50 rounded-xl">
      {/* Mobile view - collapsible */}
      <div className="md:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#62D4F9]" />
            <span className="text-sm font-bold text-[#62D4F9]">AI Reality Check™</span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-[#62D4F9] transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
        {expanded && (
          <div className="px-3 pb-3 space-y-3 animate-fadeIn">
            <p className="text-white/80 text-xs">
              Free 40-min session to analyze your AI spend and show you how to own your solution.
            </p>
            <button 
              onClick={onBook}
              className="w-full bg-[#62D4F9] text-black font-bold px-4 py-2 rounded-full hover:bg-[#40FFD9] transition-all text-sm"
              style={{ boxShadow: '0 0 10px rgba(98, 212, 249, 0.5)' }}
            >
              Book Session →
            </button>
          </div>
        )}
      </div>
      
      {/* Desktop view - full display */}
      <div className="hidden md:flex p-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-[#62D4F9]/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-[#62D4F9]" />
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
          style={{ boxShadow: '0 0 15px rgba(98, 212, 249, 0.5)' }}
        >
          Book Your Session →
        </button>
      </div>
    </div>
  )
}

// Enhanced Quick Actions with more context
const QuickActions = ({ onProductClick }: { onProductClick: (product: string) => void }) => {
  const [showHelp, setShowHelp] = useState(false)
  
  return (
    <div className="bg-black/50 backdrop-blur border-t border-[#62D4F9]/20">
      <div className="px-3 py-2 md:px-4 md:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#62D4F9]" />
            <span className="text-white/80 text-xs md:text-sm">Quick Start</span>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="ml-1 text-white/40 hover:text-white/80 transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onProductClick('essentials')}
              className="px-3 py-1.5 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-xs md:text-sm whitespace-nowrap flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              Essentials $3k
            </button>
            <button 
              onClick={() => onProductClick('custom')}
              className="px-3 py-1.5 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-xs md:text-sm whitespace-nowrap flex items-center gap-1"
            >
              <Brain className="w-3 h-3" />
              Custom $10k
            </button>
            <button 
              onClick={() => onProductClick('core')}
              className="px-3 py-1.5 bg-[#2A50DF]/20 text-[#62D4F9] border border-[#62D4F9]/30 rounded-lg hover:bg-[#2A50DF]/30 transition-all text-xs md:text-sm whitespace-nowrap flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3" />
              Core™ $25k
            </button>
          </div>
        </div>
        
        {showHelp && (
          <div className="mt-2 pt-2 border-t border-white/10 text-white/60 text-xs">
            Click any product to explore • Type to chat • Use tools on the left • Ivy can generate quotes, book meetings, and more
          </div>
        )}
      </div>
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
  const [isThinking, setIsThinking] = useState(false)
  
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
      content: "Hi, I'm Ivy - your AI business partner. I can chat, generate quotes, book meetings, and more. What brings you to CoreSentia today?"
    }])
  }, [leadId])

  // Handle booking Reality Check
  const handleBookRealityCheck = () => {
    window.open('https://calendar.app.google/X6T7MdmZCxF3mGBe7', '_blank')
  }

  // Handle tool clicks
  const handleToolClick = (tool: string) => {
    let message = '';
    switch(tool) {
      case 'quote':
        message = 'I need a quote';
        break;
      case 'meeting':
        message = 'I want to book a consultation';
        break;
      case 'products':
        message = 'Show me your solutions';
        break;
    }
    setInput(message);
    setTimeout(() => {
      const sendButton = document.querySelector('[data-send-button]') as HTMLButtonElement;
      if (sendButton) sendButton.click();
    }, 100);
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
    setIsThinking(true)

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
    setIsThinking(false)
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-black relative">
      {/* Network canvas background effect */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isThinking ? 'opacity-100' : 'opacity-30'}`}
        style={{
          background: `radial-gradient(circle at center, rgba(98, 212, 249, ${isThinking ? '0.15' : '0.05'}), transparent 70%)`,
        }}
      />
      
      <style jsx global>{`
        /* Hide scrollbar for horizontal scroll */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
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

      {/* Interactive Palette Tools */}
      <PaletteTools onToolClick={handleToolClick} />

      {/* Enhanced Header */}
      <div className="bg-black/80 backdrop-blur-md py-2 md:py-3 z-20 flex-shrink-0 border-b border-white/10">
        <div className="max-w-full px-3 md:px-6 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <Image 
                src="/CoreSentia_Transparent_Logo.png" 
                alt="CoreSentia" 
                width={200}
                height={80}
                className="h-6 md:h-8 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(98, 212, 249, 0.8))'
                }}
              />
              <div className="hidden md:flex items-center gap-2">
                <PaletteIcon className="w-5 h-5 text-[#62D4F9]" />
                <span className="text-white/80 text-lg montserrat-header">Ivy • Where conversation becomes action</span>
              </div>
            </div>
            
            <Link 
              href="/"
              className="inline-block px-3 py-1.5 md:px-6 md:py-2 bg-[#62D4F9] text-black font-semibold rounded-full hover:bg-[#40FFD9] transition-all transform hover:scale-105 text-xs md:text-sm hover:shadow-[0_0_20px_#62D4F9]"
            >
              <span className="hidden md:inline">← Back to Homepage</span>
              <span className="md:hidden">← Back</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Ivy Palette Area - Now using full screen width */}
      <div className="flex-1 p-2 md:p-4 lg:px-20 overflow-hidden min-h-0 relative z-10">
        <div 
          className="h-full w-full flex flex-col"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(98, 212, 249, 0.3)',
            borderRadius: '16px',
            position: 'relative',
          }}
        >
          {/* Reality Check Card */}
          <div className="flex-shrink-0 p-3 md:p-4 border-b border-[#62D4F9]/20">
            <AIRealityCheckCard onBook={handleBookRealityCheck} />
          </div>

          {/* Quick Actions Bar */}
          <QuickActions onProductClick={handleProductClick} />

          {/* Messages Container - The Core Interaction Area */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 lg:p-8 custom-scrollbar min-h-0"
          >
            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {message.role === 'assistant' && (
                    <div 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#62D4F9] flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 ${
                        loading && index === messages.length - 1 ? 'animate-pulse' : ''
                      }`}
                      style={{
                        boxShadow: isThinking && index === messages.length - 1 
                          ? '0 0 20px #62D4F9, 0 0 40px #62D4F9' 
                          : '0 0 8px #62D4F9, 0 0 16px #62D4F9'
                      }}
                    >
                      <span className="text-black text-xs md:text-sm font-bold">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[90%] md:max-w-[85%] lg:max-w-[75%] px-3 py-2 md:px-5 md:py-3 rounded-2xl text-sm md:text-base leading-relaxed text-white ${
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
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#62D4F9] flex items-center justify-center mr-2 md:mr-3"
                    style={{
                      animation: 'glowPulse 2s ease-in-out infinite',
                    }}
                  >
                    <span className="text-black text-xs md:text-sm font-bold">I</span>
                  </div>
                  <div 
                    className="bg-black/90 backdrop-blur-xl border border-[#62D4F9]/30 text-white px-3 py-2 md:px-5 md:py-3 rounded-2xl"
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

          {/* Enhanced Input Area with Voice Option */}
          <div className="flex-shrink-0 px-3 pb-2 pt-3 md:p-6 border-t border-[#62D4F9]/30">
            <div className="flex space-x-2 md:space-x-3 mb-2 md:mb-4">
              <button
                className="p-2 md:p-3 bg-black/80 backdrop-blur-xl border border-white/30 rounded-xl hover:border-[#62D4F9] transition-all"
                title="Voice input coming soon"
              >
                <Mic className="w-4 h-4 md:w-5 md:h-5 text-white/50" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type to Ivy, or use the tools..."
                style={{ fontSize: '16px' }}
                className="flex-1 px-3 py-2 md:px-5 md:py-3 bg-black/80 backdrop-blur-xl border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#62D4F9] transition-all duration-300 text-sm md:text-base"
              />
              <button
                data-send-button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 md:px-6 lg:px-8 md:py-3 bg-[#62D4F9] text-black rounded-full hover:bg-[#40FFD9] hover:scale-105 disabled:bg-white/10 disabled:text-white/50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm md:text-base flex items-center gap-2"
                style={{
                  boxShadow: !loading && input.trim() 
                    ? '0 0 8px #62D4F9, 0 0 16px #62D4F9'
                    : 'none'
                }}
              >
                <Send className="w-4 h-4" />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-[10px] md:text-sm text-white font-medium montserrat-header mb-0.5" style={{ textShadow: '0 0 2px rgba(255, 255, 255, 0.25)' }}>
                Stop talking about AI. Start closing with it.
              </p>
              <p className="text-[10px] md:text-xs text-white/60">
                © CoreSentia 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
