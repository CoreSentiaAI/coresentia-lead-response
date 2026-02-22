'use client'
import { useState } from 'react'
import { MessageSquare, Calendar, CheckCircle, Check } from 'lucide-react'

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const steps = [
    {
      number: '01',
      title: 'Lead texts your business',
      description: '"Can you mow my lawn this week?" Your customer reaches out via SMS just like they always do.',
      icon: MessageSquare,
      visual: (
        <div className="bg-dark-bg-tertiary p-4 rounded-2xl border border-dark-border transform transition-transform duration-500 hover:scale-105">
          {/* Notification UI */}
          <div className="bg-dark-bg-elevated backdrop-blur text-dt-primary p-4 rounded-xl border border-dark-border-light flex items-center gap-4 max-w-sm">
            <div className="w-10 h-10 rounded-full bg-dark-bg-primary flex items-center justify-center text-xl">💬</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="font-semibold text-sm text-dt-primary">New Message</span>
                <span className="text-xs text-dt-tertiary">Now</span>
              </div>
              <p className="text-sm truncate text-dt-secondary">Can you mow my lawn this week?</p>
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
        <div className="bg-dark-bg-tertiary p-6 rounded-3xl border border-dark-border transform transition-transform duration-500 hover:scale-105 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-primary"></div>
          {/* Chat Snippet */}
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-accent/30">AI</div>
              <div className="bg-dark-bg-elevated p-3 rounded-2xl rounded-tl-none text-dt-secondary max-w-[240px] border border-dark-border">
                I'd be happy to help! We have Thursday at 10am available. Does that work?
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-dark-bg-elevated flex items-center justify-center text-dt-tertiary text-xs border border-dark-border">JS</div>
              <div className="bg-brand-accent text-white p-3 rounded-2xl rounded-tr-none shadow-md max-w-[200px]">
                Thursday 10am is perfect.
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-accent/30">AI</div>
              <div className="bg-dark-bg-elevated p-3 rounded-2xl rounded-tl-none text-dt-secondary max-w-[240px] border border-dark-border">
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
        <div className="bg-dark-bg-tertiary p-5 rounded-2xl border border-dark-border transform transition-transform duration-500 hover:scale-105">
          {/* Confirmation Card */}
          <div className="border border-dark-border-light rounded-xl p-4 bg-dark-bg-elevated">
            <div className="flex justify-between items-start mb-4">
              <div>
                {/* SMS Alert Badge */}
                <div className="flex gap-2 mb-2">
                  <div className="text-[10px] font-bold text-white bg-dark-bg-primary px-2 py-0.5 rounded flex items-center gap-1 border border-dark-border">
                    <span>📱 SMS Alert</span>
                  </div>
                  <div className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Action Required</div>
                </div>

                <div className="font-bold text-dt-primary">Lawn Mowing - John Smith</div>
                <div className="text-xs text-dt-tertiary">Thu, 10:00 AM &middot; $80 Est</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-500/30 transition-colors">
                ✓ Approve & Notify
              </button>
              <button className="px-4 py-2 border border-dark-border-light rounded-lg text-sm font-medium text-dt-tertiary hover:bg-dark-bg-primary transition-colors">
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
      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all
                ${activeTab === index
                  ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/20'
                  : 'bg-dark-bg-tertiary text-dt-secondary border border-dark-border hover:border-brand-accent hover:text-dt-primary'
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
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={`w-full md:flex-1 ${index % 2 === 0 ? 'order-1 md:order-2' : 'order-1 md:order-1'}`}>
                  {step.visual}
                </div>

                <div className={`w-full md:flex-1 text-center md:text-left ${index % 2 === 0 ? 'order-2 md:order-1' : 'order-2 md:order-2'}`}>
                  <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-accent text-xs font-bold uppercase border border-brand-primary/20">
                    Step {step.number}
                  </div>
                  {step.badge && (
                    <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase ml-2 border border-amber-500/20">
                      {step.badge}
                    </div>
                  )}
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-dt-primary font-raleway">{step.title}</h3>
                  </div>
                  <p className="text-dt-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats Footer */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-8 text-center border-t border-dark-border pt-12">
        <div>
          <div className="text-3xl font-bold gradient-text mb-1 font-montserrat">24/7</div>
          <div className="text-xs text-dt-tertiary font-medium uppercase tracking-wide">Availability</div>
        </div>
        <div>
          <div className="text-3xl font-bold gradient-text mb-1 font-montserrat">&lt;10s</div>
          <div className="text-xs text-dt-tertiary font-medium uppercase tracking-wide">Response Time</div>
        </div>
        <div>
          <div className="text-3xl font-bold gradient-text mb-1 font-montserrat">2 sec</div>
          <div className="text-xs text-dt-tertiary font-medium uppercase tracking-wide">To Confirm</div>
        </div>
      </div>
    </div>
  )
}
