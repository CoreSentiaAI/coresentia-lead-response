'use client'
import { useState } from 'react'
import { MessageSquare, Calendar, CheckCircle } from 'lucide-react'

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const steps = [
    {
      number: '01',
      title: 'Lead texts your business',
      description: '"Can you mow my lawn this week?" Your customer reaches out via SMS just like they always do.',
      icon: MessageSquare,
      visual: (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 transform transition-transform duration-500 hover:scale-105">
          {/* Notification UI */}
          <div className="bg-slate-800/90 backdrop-blur text-white p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-sm">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-xl">💬</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="font-semibold text-sm">New Message</span>
                <span className="text-xs text-slate-400">Now</span>
              </div>
              <p className="text-sm truncate text-slate-300">Can you mow my lawn this week?</p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'AI responds & pencils it in',
      description: 'The AI checks your availability, negotiates the time, and marks the slot as a PENDING request. No accidental double bookings.',
      icon: Calendar,
      badge: 'PENDING',
      visual: (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 transform transition-transform duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-primary"></div>
          {/* Chat Snippet */}
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-accent/30">AI</div>
              <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-slate-600 max-w-[240px]">
                I'd be happy to help! We have Thursday at 10am available. Does that work?
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">JS</div>
              <div className="bg-brand-accent text-white p-3 rounded-2xl rounded-tr-none shadow-md max-w-[200px]">
                Thursday 10am is perfect.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-accent/30">AI</div>
              <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-slate-600 max-w-[240px]">
                Great. I've penciled you in for Thursday 10am. The team will confirm shortly via SMS.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'You confirm with one tap',
      description: 'You get an SMS alert: "New Booking Request". Review the details, tap Confirm, and only then do we notify the customer. You maintain full control.',
      icon: CheckCircle,
      badge: 'MANUAL CONFIRM',
      visual: (
        <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100 transform transition-transform duration-500 hover:scale-105">
          {/* Confirmation Card */}
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
            <div className="flex justify-between items-start mb-4">
              <div>
                {/* SMS Alert Badge */}
                <div className="flex gap-2 mb-2">
                  <div className="text-[10px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    <span>📱 SMS Alert</span>
                  </div>
                  <div className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">Action Required</div>
                </div>

                <div className="font-bold text-slate-900">Lawn Mowing - John Smith</div>
                <div className="text-xs text-slate-500">Thu, 10:00 AM • $80 Est</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-500/30 transition-colors">
                ✓ Approve & Notify
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50">
                Decline
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tabs - Mobile friendly */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all
                ${activeTab === index
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-accent hover:text-brand-accent'
                }`}
            >
              <span className="text-xs opacity-70">STEP {step.number}</span>
              <Icon className="w-4 h-4" />
            </button>
          )
        })}
      </div>

      {/* Active Tab Content */}
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={index}
              className={`transition-all duration-300 ${
                activeTab === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Desktop: Side-by-side layout, Mobile: Stacked */}
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Visual - Order changes based on step */}
                <div className={`w-full md:flex-1 ${index % 2 === 0 ? 'order-1 md:order-2' : 'order-1 md:order-1'}`}>
                  {step.visual}
                </div>

                {/* Content */}
                <div className={`w-full md:flex-1 text-center md:text-left ${index % 2 === 0 ? 'order-2 md:order-1' : 'order-2 md:order-2'}`}>
                  <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                    Step {step.number}
                  </div>
                  {step.badge && (
                    <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase ml-2">
                      {step.badge}
                    </div>
                  )}
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-montserrat">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats Footer - Always visible */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-8 text-center border-t border-slate-100 pt-12">
        <div>
          <div className="text-3xl font-bold text-brand-primary mb-1">24/7</div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Availability</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-brand-accent mb-1">&lt;10s</div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Response Time</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-brand-light-blue mb-1">2 sec</div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">To Confirm</div>
        </div>
      </div>
    </div>
  )
}
