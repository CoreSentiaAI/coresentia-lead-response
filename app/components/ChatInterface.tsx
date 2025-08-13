'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Loader2 } from 'lucide-react'
import RealityCheckCard from './RealityCheckCard'
import InlineChatForm from './InlineChatForm'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  leadId: string
}

export default function ChatInterface({ leadId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentLeadId, setCurrentLeadId] = useState(leadId)
  const [persistentCards, setPersistentCards] = useState<string[]>([])
  const [showInlineForm, setShowInlineForm] = useState<'quote' | 'meeting' | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [headerCollapsed, setHeaderCollapsed] = useState(false)

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setHeaderCollapsed(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, persistentCards, showInlineForm])

  const sendMessage = useCallback(async (messageContent?: string) => {
    const messageToSend = messageContent || input
    if (!messageToSend.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: messageToSend }
    setMessages(prev => [...prev, userMessage])
    if (!messageContent) setInput('')
    setIsLoading(true)

    try {
      console.log('Sending to API with leadId:', currentLeadId)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          leadId: currentLeadId,
        })
      })

      const data = await response.json()
      console.log('API Response:', data)
      
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
      
      // Update leadId if a new one was created
      if (data.leadId && data.leadId !== currentLeadId) {
        console.log('Updating leadId from', currentLeadId, 'to', data.leadId)
        setCurrentLeadId(data.leadId)
      }
      
      // Handle persistent cards
      if (data.persistentCards && data.persistentCards.length > 0) {
        console.log('Setting persistent cards:', data.persistentCards)
        setPersistentCards(data.persistentCards)
      }
      
      // Handle actions
      if (data.actions && data.actions.length > 0) {
        console.log('Processing actions:', data.actions)
        for (const action of data.actions) {
          if (action.type === 'generate_quote' && action.data) {
            console.log('Generating quote with data:', action.data)
            await generateQuote(action.data)
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having a technical hiccup. Mind refreshing and trying again?" 
      }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, currentLeadId])

  const generateQuote = async (quoteData: any) => {
    try {
      console.log('Calling quote generation API with:', quoteData)
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      })
      
      const result = await response.json()
      console.log('Quote generation result:', result)
      
      if (result.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `✅ Quote sent successfully to ${quoteData.email}! Check your inbox - it should arrive within a minute or two. The quote is valid for 14 days.` 
        }])
      }
    } catch (error) {
      console.error('Quote generation error:', error)
    }
  }

  // Command button handlers with inline form
  const handleGetQuote = () => {
    const ivyMessage = "Perfect! Fill out the form below and I'll generate your quote immediately:"
    setMessages(prev => [...prev, { role: 'assistant', content: ivyMessage }])
    setShowInlineForm('quote')
  }

  const handleBookCall = () => {
    const ivyMessage = "Excellent choice! Fill out your details below and I'll get you booked in straight away:"
    setMessages(prev => [...prev, { role: 'assistant', content: ivyMessage }])
    setShowInlineForm('meeting')
  }

  const handleFormSubmit = async (formData: any) => {
    // Hide the form
    setShowInlineForm(null)
    
    // Add user's submission as a message
    const userMessage = `Contact Details: ${formData.name} from ${formData.company || 'N/A'}, ${formData.email}, ${formData.phone || 'N/A'}`
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    // Let Ivy process this with the appropriate action
    if (showInlineForm === 'quote') {
      // Trigger quote generation
      await sendMessage(`Please generate a quote for ${formData.name} at ${formData.email} ACTION: GENERATE_QUOTE`)
    } else if (showInlineForm === 'meeting') {
      // Trigger meeting booking
      await sendMessage(`Please book a meeting for ${formData.name} at ${formData.email} ACTION: BOOK_MEETING`)
    }
  }

  const handleCommandClick = (command: string) => {
    switch(command) {
      case 'quote':
        handleGetQuote()
        break
      case 'call':
        handleBookCall()
        break
      case 'essentials':
        sendMessage("Tell me more about the Essentials package - $3k option")
        break
      case 'custom':
        sendMessage("Tell me about the Custom $10k package")
        break
      case 'core':
        sendMessage("What is Core™?")
        break
      case 'explore':
        sendMessage("Show me all products and pricing")
        break
      default:
        break
    }
  }

  const formatMessage = (content: string) => {
    // Remove ACTION: tags from display
    let formatted = content.replace(/ACTION:\s*\w+/g, '').trim()
    
    // Convert **text** to bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Convert line breaks to <br> tags
    formatted = formatted.split('\n').map(line => {
      // Check if line starts with - for bullet points
      if (line.trim().startsWith('- ')) {
        return `<div class="ml-4">• ${line.substring(2)}</div>`
      }
      return line
    }).join('<br>')
    
    return formatted
  }

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto">
      {/* Header */}
      <div className={`transition-all duration-300 ${
        headerCollapsed 
          ? 'bg-black/95 backdrop-blur-2xl border-b border-[#62D4F9]/30 shadow-[0_4px_30px_rgba(98,212,249,0.15)]' 
          : 'bg-black/80 backdrop-blur-xl border-b border-white/10'
      } px-4 sm:px-6 py-3 sm:py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`transition-all duration-300 ${
              headerCollapsed ? 'drop-shadow-[0_0_20px_rgba(98,212,249,0.6)]' : ''
            }`}>
              <span className={`font-montserrat font-light tracking-[0.15em] ${
                headerCollapsed ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
              } text-white`}>
                c o r e s e n t i a
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#62D4F9] text-xs sm:text-sm">
            <span className="hidden sm:inline">MEET IVY</span>
            <span className="text-white/40">•</span>
            <span className="text-white/90">She runs your business while you sleep</span>
          </div>
        </div>
      </div>

      {/* AI Reality Check Card - Persistent at top */}
      {persistentCards.includes('reality_check') && (
        <div className="px-4 sm:px-6 py-4 bg-black/60 backdrop-blur-sm border-b border-white/5">
          <RealityCheckCard />
        </div>
      )}

      {/* Command Center */}
      <div className="px-4 sm:px-6 py-4 bg-black/60 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#62D4F9] text-sm font-bold">⚡</span>
          <span className="text-white/90 text-sm font-medium tracking-wider">COMMAND CENTER</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => handleCommandClick('quote')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">📄</span>
              <span>Get Quote</span>
            </span>
          </button>
          <button
            onClick={() => handleCommandClick('call')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">📅</span>
              <span>Book Call</span>
            </span>
          </button>
          <button
            onClick={() => handleCommandClick('essentials')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">⚡</span>
              <span>Essentials $3k</span>
            </span>
          </button>
          <button
            onClick={() => handleCommandClick('custom')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">🎯</span>
              <span>Custom $10k</span>
            </span>
          </button>
          <button
            onClick={() => handleCommandClick('core')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">💎</span>
              <span>Core™ $25k</span>
            </span>
          </button>
          <button
            onClick={() => handleCommandClick('explore')}
            className="px-4 py-2 bg-black/50 border border-[#2A50DF]/30 rounded-lg text-white text-sm hover:bg-[#2A50DF]/20 hover:border-[#2A50DF] transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#2A50DF] group-hover:text-white">🔍</span>
              <span>Explore All</span>
            </span>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex items-start gap-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
                <div className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_8px_rgba(98,212,249,0.6),0_0_16px_rgba(98,212,249,0.4)]">
                  I
                </div>
                <div className="bg-black/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-[#62D4F9]/30 shadow-[0_0_8px_rgba(98,212,249,0.15),0_0_16px_rgba(98,212,249,0.12)]">
                  <p className="text-white/90">
                    Hi, I'm Ivy - your AI business partner. I can chat, generate quotes, book meetings, and more. What brings you to CoreSentia today?
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    💡 Tip: Use the Command Center below for quick actions, or just chat with me naturally!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%] ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}>
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_8px_rgba(98,212,249,0.6),0_0_16px_rgba(98,212,249,0.4)]">
                    I
                  </div>
                )}
                <div className={`rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-[#2A50DF] text-white shadow-[0_0_12px_rgba(42,80,223,0.5),0_0_20px_rgba(42,80,223,0.3)]'
                    : 'bg-black/90 backdrop-blur-xl text-white/90 border border-[#62D4F9]/30 shadow-[0_0_8px_rgba(98,212,249,0.15),0_0_16px_rgba(98,212,249,0.12)]'
                }`}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    className="prose prose-invert max-w-none [&>div]:mb-2 [&>br]:block"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Inline Form */}
          {showInlineForm && (
            <div className="flex justify-start mb-4 animate-fadeIn">
              <div className="flex items-start gap-3 max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
                <div className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_8px_rgba(98,212,249,0.6),0_0_16px_rgba(98,212,249,0.4)]">
                  I
                </div>
                <InlineChatForm 
                  formType={showInlineForm}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setShowInlineForm(null)}
                />
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#62D4F9] flex items-center justify-center text-black font-bold text-sm animate-pulse shadow-[0_0_8px_rgba(98,212,249,0.6),0_0_16px_rgba(98,212,249,0.4)]">
                  I
                </div>
                <div className="bg-black/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-[#62D4F9]/30">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-[#62D4F9] rounded-full animate-bounce shadow-[0_0_2px_rgba(98,212,249,0.8)]"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 sm:px-6 py-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat with Ivy or use the Command Center above..."
            className="flex-1 px-5 py-3 bg-black/80 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-[#62D4F9] focus:shadow-[0_0_10px_rgba(98,212,249,0.3)] transition-all text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
              isLoading || !input.trim()
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-[#62D4F9] text-black hover:bg-[#40FFD9] hover:shadow-[0_0_20px_rgba(98,212,249,0.6)] hover:scale-105'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </form>
        <p className="text-center text-white/60 text-xs mt-3 font-montserrat tracking-[0.1em]">
          Stop talking about AI. Start closing with it.
        </p>
        <p className="text-center text-white/40 text-xs">
          © CoreSentia 2025
        </p>
      </div>
    </div>
  )
}
