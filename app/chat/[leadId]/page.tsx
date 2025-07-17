'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'https://xrndfmndipazjyqlozic.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybmRmbW5kaXBhemp5cWxvemljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjgyNzgsImV4cCI6MjA2ODE0NDI3OH0.BhRjqnA06Kn0kOogjwW1DcwaHd5cHfbCnr_OdPzfKVw'
)

// Particle network background
function ParticleNetworkBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function setCanvasSize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    }

    setCanvasSize();

    // Settings
    const nodeCount = Math.floor((width * height) / 8000);
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 2 + 1.2,
      glow: Math.random() > 0.5,
    }));

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Lines between close nodes
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            ctx.save();
            ctx.globalAlpha = 0.11 + (120 - dist) / 400;
            ctx.strokeStyle = '#62D4F9';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Nodes
      for (let i = 0; i < nodeCount; i++) {
        ctx.save();
        if (nodes[i].glow) {
          ctx.shadowColor = '#2A50DF';
          ctx.shadowBlur = 16;
        }
        ctx.globalAlpha = 0.78;
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
        ctx.fillStyle = nodes[i].glow ? '#2A50DF' : '#62D4F9';
        ctx.fill();
        ctx.restore();
      }
    }

    function update() {
      for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edge
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    }

    let frame: number;
    function animate() {
      update();
      draw();
      frame = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    function handleResize() {
      setCanvasSize();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a2330 60%, #060B13 100%)' }}
    />
  );
}

export default function ChatPage({ params }: { params: { leadId: string } }) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch lead data
    async function fetchLead() {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('id', params.leadId)
        .single()
      if (data) setLead(data)
    }
    fetchLead()

    // Add initial greeting
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm Ivy from CoreSentia. Thanks for taking the time to chat with me. I'd love to learn more about what brought you to us today. What specific challenges are you looking to solve?`
    }])
  }, [params.leadId])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    await supabase.from('conversations').insert({
      lead_id: params.leadId,
      message: input,
      sender: 'lead'
    })

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
      {/* Modern animated particle network background */}
      <ParticleNetworkBG />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="bg-black/90 backdrop-blur-sm rounded-t-2xl p-8 border border-white/30">
            <h1 className="text-3xl font-bold gradient-text">coresentia ai consultation</h1>
            <p className="mt-3 text-gray-200">
              Hi {lead?.first_name || 'there'}, let&apos;s explore how we can help you
            </p>
          </div>

          {/* Chat Messages */}
          <div className="bg-black/90 backdrop-blur-sm rounded-b-2xl border border-white/30 border-t-0">
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs font-bold">I</span>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white'
                        : 'bg-white/10 border border-white/30 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] flex items-center justify-center mr-3 animate-pulse">
                    <span className="text-white text-xs font-bold">I</span>
                  </div>
                  <div className="bg-white/10 border border-white/30 text-gray-400 px-5 py-3 rounded-2xl">
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
            <div className="border-t border-white/30 p-4 md:p-6">
              <div className="flex space-x-2 md:space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#62D4F9] transition-colors text-sm md:text-base"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#62D4F9] to-[#2A50DF] text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold text-sm md:text-base"
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
