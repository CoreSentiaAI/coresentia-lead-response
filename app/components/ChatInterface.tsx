'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  MessageSquare,
  Send,
  ArrowLeft,
  Loader2
} from 'lucide-react'
import InlineChatForm from './InlineChatForm'

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

// Helper function to strip ACTION: tags
const stripActionTags = (content: string): string => {
  return content.replace(/\(?\s*ACTION:\s*[A-Z_]+\s*\)?/g, '').trim()
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
        elements.push(<strong key={`bold-${match.index}`} className="font-semibold text-brand-navy">{match[2]}</strong>);
      } else if (match[3]) {
        elements.push(
          <a
            key={`link-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange underline hover:text-orange-600 transition-colors"
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
          <span className="mr-2 text-brand-orange">•</span>
          <span>{processInlineFormatting(bulletContent)}</span>
        </div>
      );
    }

    const numberedMatch = line.trim().match(/^(\d+\.)\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={lineIndex} className="flex items-start mb-2 ml-2">
          <span className="mr-2 text-brand-orange">{numberedMatch[1]}</span>
          <span>{processInlineFormatting(numberedMatch[2])}</span>
        </div>
      );
    }

    if (line.trim().startsWith('##')) {
      const headerContent = line.trim().substring(2).trim();
      return (
        <div key={lineIndex} className="font-semibold text-lg mb-3 mt-4 text-brand-navy">
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
  const [showInlineForm, setShowInlineForm] = useState<'quote' | 'meeting' | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
    const timeoutId = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timeoutId)
  }, [messages, showInlineForm])

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
      content: "Hi! I'm your AI assistant. I can help you learn about our services, answer questions, and get you set up with a package that works for your business. What brings you here today?"
    }])
  }, [leadId])

  // Handle form functions
  const handleGetQuote = () => {
    const message = "Perfect! Let me get some details from you:"
    setMessages(prev => [...prev, { role: 'assistant', content: message }])
    setShowInlineForm('quote')
  }

  const handleBookCall = () => {
    const message = "Great! Let me get your details to book a call:"
    setMessages(prev => [...prev, { role: 'assistant', content: message }])
    setShowInlineForm('meeting')
  }

  const handleFormSubmit = async (formData: any) => {
    setShowInlineForm(null)

    const userMessage = `Contact Details: ${formData.name} from ${formData.company || 'N/A'}, ${formData.email}, ${formData.phone || 'N/A'}, Industry: ${formData.industry || 'N/A'}, Challenge: ${formData.challenge || 'N/A'}`
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    if (showInlineForm === 'quote') {
      await sendMessageWithContent(`Please generate a quote for ${formData.name} (${formData.industry}) at ${formData.email}. Their challenge: ${formData.challenge || 'Not specified'}. Phone: ${formData.phone || 'Not provided'}. ACTION: GENERATE_QUOTE`)
    } else if (showInlineForm === 'meeting') {
      await sendMessageWithContent(`Please book a meeting for ${formData.name} (${formData.industry}) at ${formData.email}. Their need: ${formData.challenge || 'Not specified'}. Phone: ${formData.phone || 'Not provided'}. ACTION: BOOK_MEETING`)
    }
  }

  // Handle quote generation
  // Legacy quote generation removed - now handled server-side with SMS notifications
  const handleGenerateQuote = async (actionData: any) => {
    // No longer calls /api/quotes/generate
    // Notifications are sent server-side via SMS when quote action is triggered
    // This function can be removed in future cleanup
    return;
  };

  const sendMessageWithContent = async (messageContent: string) => {
    const userMessage = { role: 'user', content: messageContent }

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

      let messageContent = '';

      if (data.error) {
        messageContent = 'Sorry, I had a technical issue. Please try again or email us at info@coresentia.com';
      } else if (data.blocked) {
        messageContent = data.message || "Thanks for chatting! Let's continue this conversation. Contact us at info@coresentia.com";
      } else if (data.message) {
        messageContent = stripActionTags(data.message);
      } else {
        messageContent = 'Sorry, I encountered an unexpected error. Please try again.';
      }

      const aiMessage = { role: 'assistant', content: messageContent }
      setMessages(prev => [...prev, aiMessage])

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
        content: 'Sorry, I had a technical issue. Please try again or email us at info@coresentia.com'
      }])
    }

    setLoading(false)
  }

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

      let messageContent = '';

      if (data.error) {
        messageContent = 'Sorry, I had a technical issue. Please try again or email us at info@coresentia.com';
      } else if (data.blocked) {
        messageContent = data.message || "Thanks for chatting! Let's continue this conversation. Contact us at info@coresentia.com";
      } else if (data.message) {
        messageContent = stripActionTags(data.message);
      } else {
        messageContent = 'Sorry, I encountered an unexpected error. Please try again.';
      }

      const aiMessage = { role: 'assistant', content: messageContent }
      setMessages(prev => [...prev, aiMessage])

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
        content: 'Sorry, I had a technical issue. Please try again or email us at info@coresentia.com'
      }])
    }

    setLoading(false)
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 58, 95, 0.05);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF6B35;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #E55A2B;
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
      `}</style>

      {/* Header */}
      <div style={{ backgroundColor: '#E5E7EB' }} className="shadow-lg py-4 px-6 flex items-center justify-between">
        <Image
          src="/CoreSentia_Full_Logo.png"
          alt="CoreSentia"
          width={300}
          height={60}
          className="h-12 w-auto"
        />

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-700">
            <MessageSquare className="w-5 h-5 text-brand-orange" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Homepage</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">

          {/* Quick Actions Bar */}
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={handleGetQuote}
                className="px-4 py-2 bg-white text-brand-navy border border-brand-navy rounded-lg hover:bg-brand-navy hover:text-white transition-all text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Get Quote
              </button>

              <button
                onClick={handleBookCall}
                className="px-4 py-2 bg-brand-orange text-white border border-brand-orange rounded-lg hover:bg-orange-600 transition-all text-sm font-medium flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Call
              </button>

              <button
                onClick={() => setInput('Tell me about your packages')}
                className="px-4 py-2 bg-white text-brand-navy border border-gray-300 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium"
              >
                View Packages
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-white"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center mr-3 flex-shrink-0 font-bold text-sm">
                      CS
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-brand-navy text-white'
                        : 'bg-gray-100 text-text-primary border border-gray-200'
                    }`}
                  >
                    {message.role === 'user' ? message.content : formatMessage(message.content)}
                  </div>
                </div>
              ))}

              {/* Inline Form */}
              {showInlineForm && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      CS
                    </div>
                    <InlineChatForm
                      formType={showInlineForm}
                      onSubmit={handleFormSubmit}
                      onCancel={() => setShowInlineForm(null)}
                    />
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center mr-3 flex-shrink-0 font-bold text-sm">
                    CS
                  </div>
                  <div className="bg-gray-100 text-text-primary px-4 py-3 rounded-2xl border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all text-sm md:text-base"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-brand-orange text-white rounded-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-semibold text-sm md:text-base flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2025 CoreSentia. Never miss a lead again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
