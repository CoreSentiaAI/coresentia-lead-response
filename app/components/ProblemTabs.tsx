'use client'
import { useState } from 'react'
import { Phone, Clock, Calendar, Check } from 'lucide-react'

export default function ProblemTabs() {
  const [activeTab, setActiveTab] = useState(0)

  const problems = [
    {
      title: 'Missing Calls',
      icon: Phone,
      description: "You're on the tools, can't answer your phone. Leads call your competitors instead.",
      visual: (
        <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
          <div className="space-y-3">
            {/* Notification 1 */}
            <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">Missed Call</div>
                <div className="text-[10px] text-slate-400">Potential Customer • 2m ago</div>
              </div>
            </div>
            {/* Notification 2 (Blurred) */}
            <div className="bg-white/60 p-3 rounded-xl border border-rose-50 flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">Missed Call</div>
                <div className="text-[10px] text-slate-400">Unknown Number • 15m ago</div>
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-white">3</div>
        </div>
      )
    },
    {
      title: 'Slow Responses',
      icon: Clock,
      description: "By the time you text back at 8pm, they've already booked someone else.",
      visual: (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner relative">
          {/* Message 1 */}
          <div className="flex justify-start mb-6">
            <div className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl rounded-tl-none text-xs shadow-sm max-w-[80%]">
              Hi, can you give me a quote?
            </div>
          </div>
          <div className="absolute left-6 top-[3.2rem] h-8 w-0.5 bg-dashed border-l-2 border-slate-200 border-dashed"></div>
          <div className="absolute left-8 top-[3.8rem] text-[10px] text-amber-500 font-medium bg-amber-50 px-1 rounded">10 hrs later</div>

          {/* Message 2 */}
          <div className="flex justify-end mt-4">
            <div className="bg-gradient-to-r from-brand-accent to-brand-primary text-white px-3 py-2 rounded-xl rounded-tr-none text-xs shadow-lg shadow-brand-accent/20 max-w-[80%]">
              Hey mate, sorry just saw this.
            </div>
          </div>

          {/* Status */}
          <div className="text-center mt-2 text-[10px] text-slate-400">Read 9:15 PM</div>
        </div>
      )
    },
    {
      title: 'Playing Phone Tag',
      icon: Calendar,
      description: '"Can you do Tuesday?" "No." "Wednesday?" Stop the back-and-forth. The AI checks your calendar, books the lead, then you confirm with one tap.',
      visual: (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
          <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-700">Tue, Sep 24</span>
            <span className="text-[10px] text-slate-400">Schedule</span>
          </div>

          <div className="space-y-2 relative">
            {/* Time Slot 9 AM */}
            <div className="flex gap-3 items-center opacity-60">
              <span className="text-[10px] text-slate-400 w-8">09:00</span>
              <div className="bg-white border border-slate-200 h-8 rounded-lg w-full flex items-center px-3 text-[10px] text-slate-500">
                Busy
              </div>
            </div>

            {/* Time Slot 10 AM (Target) */}
            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold text-slate-600 w-8">10:00</span>
              <div className="relative w-full h-10 bg-slate-100 rounded-lg border border-dashed border-slate-300">
                {/* Animated Booking Card */}
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-accent to-brand-primary rounded-lg flex items-center px-3 gap-2 shadow-md animate-slot-fill w-0 overflow-hidden">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">John S. - Lawn Mowing</span>
                </div>
              </div>
            </div>

            {/* Time Slot 11 AM */}
            <div className="flex gap-3 items-center opacity-60">
              <span className="text-[10px] text-slate-400 w-8">11:00</span>
              <div className="bg-white border border-slate-200 h-8 rounded-lg w-full flex items-center px-3 text-[10px] text-slate-500">
                Available
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tabs - Mobile friendly */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {problems.map((problem, index) => {
          const Icon = problem.icon
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
              <Icon className="w-4 h-4" />
              {problem.title}
            </button>
          )
        })}
      </div>

      {/* Active Tab Content */}
      <div className="relative">
        {problems.map((problem, index) => {
          const Icon = problem.icon
          return (
            <div
              key={index}
              className={`transition-all duration-300 ${
                activeTab === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Card Layout - Responsive */}
              <div className="group relative">
                {/* Layered Shadow Element */}
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>

                {/* Main Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Visual */}
                    <div className="w-full md:flex-1 order-1">
                      {problem.visual}
                    </div>

                    {/* Content */}
                    <div className="w-full md:flex-1 order-2 text-center md:text-left">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-brand-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{problem.title}</h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
