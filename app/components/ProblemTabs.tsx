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
        <div className="relative bg-dark-bg-elevated border border-dark-border rounded-2xl p-4">
          <div className="space-y-3">
            {/* Notification 1 */}
            <div className="bg-dark-bg-tertiary p-3 rounded-xl border border-rose-500/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-dt-primary">Missed Call</div>
                <div className="text-[10px] text-dt-tertiary">Potential Customer &middot; 2m ago</div>
              </div>
            </div>
            {/* Notification 2 */}
            <div className="bg-dark-bg-tertiary/60 p-3 rounded-xl border border-rose-500/10 flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400/60">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-dt-primary">Missed Call</div>
                <div className="text-[10px] text-dt-tertiary">Unknown Number &middot; 15m ago</div>
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">3</div>
        </div>
      )
    },
    {
      title: 'Slow Responses',
      icon: Clock,
      description: "By the time you text back at 8pm, they've already booked someone else.",
      visual: (
        <div className="bg-dark-bg-elevated border border-dark-border rounded-2xl p-5 relative">
          {/* Message 1 */}
          <div className="flex justify-start mb-6">
            <div className="bg-dark-bg-tertiary border border-dark-border text-dt-secondary px-3 py-2 rounded-xl rounded-tl-none text-xs max-w-[80%]">
              Hi, can you give me a quote?
            </div>
          </div>
          <div className="absolute left-6 top-[3.2rem] h-8 w-0.5 border-l-2 border-dark-border-light border-dashed"></div>
          <div className="absolute left-8 top-[3.8rem] text-[10px] text-amber-400 font-medium bg-amber-500/10 px-1 rounded border border-amber-500/20">10 hrs later</div>

          {/* Message 2 */}
          <div className="flex justify-end mt-4">
            <div className="bg-gradient-to-r from-brand-accent to-brand-primary text-white px-3 py-2 rounded-xl rounded-tr-none text-xs shadow-lg shadow-brand-accent/20 max-w-[80%]">
              Hey mate, sorry just saw this.
            </div>
          </div>

          <div className="text-center mt-2 text-[10px] text-dt-tertiary">Read 9:15 PM</div>
        </div>
      )
    },
    {
      title: 'Playing Phone Tag',
      icon: Calendar,
      description: '"Can you do Tuesday?" "No." "Wednesday?" Stop the back-and-forth. The AI checks your calendar, books the lead, then you confirm with one tap.',
      visual: (
        <div className="bg-dark-bg-elevated border border-dark-border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4 border-b border-dark-border pb-2">
            <span className="text-xs font-bold text-dt-primary">Tue, Sep 24</span>
            <span className="text-[10px] text-dt-tertiary">Schedule</span>
          </div>

          <div className="space-y-2 relative">
            {/* Time Slot 9 AM */}
            <div className="flex gap-3 items-center opacity-60">
              <span className="text-[10px] text-dt-tertiary w-8">09:00</span>
              <div className="bg-dark-bg-tertiary border border-dark-border h-8 rounded-lg w-full flex items-center px-3 text-[10px] text-dt-tertiary">
                Busy
              </div>
            </div>

            {/* Time Slot 10 AM (Target) */}
            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold text-dt-secondary w-8">10:00</span>
              <div className="relative w-full h-10 bg-dark-bg-tertiary rounded-lg border border-dashed border-dark-border-light">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-accent to-brand-primary rounded-lg flex items-center px-3 gap-2 shadow-md animate-slot-fill w-0 overflow-hidden">
                  <Check className="w-3 h-3 text-white flex-shrink-0" />
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">John S. - Lawn Mowing</span>
                </div>
              </div>
            </div>

            {/* Time Slot 11 AM */}
            <div className="flex gap-3 items-center opacity-60">
              <span className="text-[10px] text-dt-tertiary w-8">11:00</span>
              <div className="bg-dark-bg-tertiary border border-dark-border h-8 rounded-lg w-full flex items-center px-3 text-[10px] text-dt-tertiary">
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
      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {problems.map((problem, index) => {
          const Icon = problem.icon
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
              <div className="group relative">
                {/* Layered Shadow */}
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>

                {/* Main Card */}
                <div className="relative h-full bg-dark-bg-tertiary border border-dark-border rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:flex-1 order-1">
                      {problem.visual}
                    </div>
                    <div className="w-full md:flex-1 order-2 text-center md:text-left">
                      <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-brand-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-dt-primary font-raleway">{problem.title}</h3>
                      </div>
                      <p className="text-dt-secondary text-sm leading-relaxed">
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
