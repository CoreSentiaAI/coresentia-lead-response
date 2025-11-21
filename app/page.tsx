import Image from 'next/image'
import Link from 'next/link'
import { Zap, MessageSquare, Globe, Calendar, Check, Clock, DollarSign, Users, Phone, TrendingUp, Shield, Rocket } from 'lucide-react'
import Header from './components/Header'
import QuoteForm from './components/QuoteForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-text-primary relative overflow-x-hidden font-opensans">
      {/* Background with Dot Grid & Glowing Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Radial Masks to fade edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50"></div>

        {/* Glowing Orbs using Brand Colors - Enhanced */}
        {/* Top Right: Light Blue */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-multiply" style={{
          background: 'rgba(98, 212, 249, 0.25)' // brand-light-blue - increased opacity
        }}></div>
        {/* Bottom Left: Royal Blue */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 mix-blend-multiply" style={{
          background: 'rgba(42, 80, 223, 0.18)' // brand-primary - increased opacity
        }}></div>
        {/* Center: Medium Blue for extra depth */}
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-multiply" style={{
          background: 'rgba(16, 153, 231, 0.12)' // brand-accent
        }}></div>
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 scroll-smooth">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="min-h-screen w-full flex items-center px-6 lg:px-8 pt-32 lg:pt-0 relative overflow-hidden"
          style={{ perspective: '2000px' }}>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10">
            {/* Left: Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col justify-center">

              {/* Live in Brisbane Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-primary text-xs font-semibold uppercase tracking-wide mb-2 mx-auto lg:mx-0 w-fit">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                Live in Brisbane
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-brand-primary">
                Stop talking about AI.
                <br />
                <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
                  Start closing with it.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
                Your AI receptionist responds 24/7, qualifies leads, and books jobs into your calendar—while you focus on the work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#quote-form"
                  className="btn-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg relative overflow-hidden"
                >
                  <span className="relative z-10">Request a Quote</span>
                  {/* Enhanced Shimmer Effect */}
                  <span className="shimmer-span"></span>
                </Link>
                <Link
                  href="/chat/homepage-visitor"
                  className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
                >
                  Chat Now
                </Link>
              </div>

              {/* SMS CTA */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-700 pt-2">
                <span className="text-sm">or text our AI:</span>
                <a
                  href="sms:+61489087491"
                  className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent-hover font-semibold text-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +61 489 087 491
                </a>
              </div>

              {/* Micro-metrics */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4 text-brand-orange" />
                  <span>Avg reply &lt;10s</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-brand-sage" />
                  <span>2–10 working days to launch</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-brand-navy" />
                  <span>100% Australian</span>
                </div>
              </div>
            </div>

            {/* Right: 3D Perspective Product Mock */}
            <div className="lg:col-span-6 flex items-center justify-center relative h-[600px]">

              {/* Floating Badge (Breaking out of the card) */}
              <div className="absolute -right-4 lg:-right-8 top-20 z-20 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                style={{
                  animation: 'gentleBounce 4.5s ease-in-out infinite'
                }}>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Check className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <p className="text-xs font-bold text-slate-800">Lead Qualified</p>
                  <p className="text-[10px] text-slate-500">Auto-booked to Calendar</p>
                </div>
              </div>

              {/* 3D Perspective Card */}
              <div className="relative w-full max-w-[360px] bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem]"
                style={{
                  transform: 'perspective(1000px) rotateY(-8deg) rotateX(3deg)',
                  transformStyle: 'preserve-3d',
                  animation: 'float 9s ease-in-out infinite',
                  boxShadow: '0 30px 60px -15px rgba(42, 80, 223, 0.25)'
                }}>

                {/* Phone Header */}
                <div className="px-6 py-6 border-b border-slate-100/50 flex items-center justify-between bg-white/40 rounded-t-[2rem]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ boxShadow: '0 4px 14px rgba(16, 153, 231, 0.3)' }}>
                      AI
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">CoreSentia Assistant</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Active now
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="p-6 space-y-4 h-[400px] overflow-hidden bg-gradient-to-b from-white/20 to-white/60">

                  {/* Message 1 (User) */}
                  <div className="flex justify-end" style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s'
                  }}>
                    <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                      Can you mow my lawn this week?
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 text-right pr-1 -mt-2" style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s'
                  }}>2:47 PM</div>

                  {/* Message 2 (AI) */}
                  <div className="flex justify-start" style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.5s'
                  }}>
                    <div className="flex flex-col gap-1 max-w-[90%]">
                      <div className="bg-brand-primary text-white px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-lg"
                        style={{ boxShadow: '0 4px 14px rgba(42, 80, 223, 0.25)' }}>
                        I'd be happy to help! We have Thursday at 10am or Friday at 2pm. Which works?
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 pl-1 -mt-1" style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.5s'
                  }}>2:47 PM</div>

                  {/* Message 3 (User) */}
                  <div className="flex justify-end" style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 2.5s'
                  }}>
                    <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                      Thursday 10am please.
                    </div>
                  </div>

                  {/* Booking Confirm Card */}
                  <div style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 2.5s'
                  }} className="mt-2">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-md flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Booking Confirmed</p>
                        <p className="text-xs text-slate-500">Thu, 10:00 AM • Lawn Mowing</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Input Area (Visual Only) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/60 backdrop-blur-md rounded-b-[2rem] border-t border-white/50">
                  <div className="h-10 bg-slate-100/50 rounded-full flex items-center px-4 text-xs text-slate-400">
                    Type a message...
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip / Social Proof */}
        <section className="border-y border-slate-100 bg-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by local businesses in</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-400 font-bold text-lg opacity-60">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Brisbane
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-light-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14.25c2.25 0 3-2.25 5.25-2.25 2.25 0 3 2.25 5.25 2.25 2.25 0 3-2.25 5.25-2.25"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10.25c2.25 0 3-2.25 5.25-2.25 2.25 0 3 2.25 5.25 2.25 2.25 0 3-2.25 5.25-2.25"></path>
                </svg>
                Gold Coast
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                Sunshine Coast
              </div>
            </div>
          </div>
        </section>

        {/* Problem + Solution Combined Section */}
        <section style={{ backgroundColor: '#E5E7EB' }} className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy mb-4 leading-[1.2] font-montserrat">
                Sound familiar?
              </h2>
              <p className="text-lg text-text-primary max-w-2xl mx-auto">
                You're losing leads while you're on the tools. Your AI receptionist changes that.
              </p>
            </div>

            {/* Problem Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">

              {/* Card 1: Missing Calls */}
              <div className="group relative lg:col-span-1">
                {/* Layered Shadow Element */}
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>

                {/* Main Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] overflow-hidden">
                  {/* Visual: Missed Call Notification List */}
                  <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 shadow-inner">
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

                  <h3 className="text-xl font-bold text-slate-900 mb-2">Missing Calls</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    You're on the tools, can't answer your phone. Leads call your competitors instead.
                  </p>
                </div>
              </div>

              {/* Card 2: Slow Responses */}
              <div className="group relative lg:col-span-2">
                {/* Layered Shadow Element */}
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>

                {/* Main Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] overflow-hidden flex flex-col md:flex-row gap-8 items-center">

                  {/* Content Side */}
                  <div className="flex-1 order-2 md:order-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Slow Responses</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      By the time you text back at 8pm, they've already booked someone else.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      <Clock className="w-3 h-3" />
                      Avg response: 6 hours
                    </div>
                  </div>

                  {/* Visual: Chat Gap Timeline */}
                  <div className="flex-1 w-full order-1 md:order-2">
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
                  </div>
                </div>
              </div>

              {/* Card 3: Playing Phone Tag */}
              <div className="group relative lg:col-span-3">
                {/* Layered Shadow Element */}
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>

                {/* Main Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] overflow-hidden flex flex-col md:flex-row gap-8 items-center">

                  {/* Visual: Calendar Slot Animation */}
                  <div className="w-full md:w-1/2 bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
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

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Playing Phone Tag</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      "Can you do Tuesday?" "No." "Wednesday?" Stop the back-and-forth. The AI checks your calendar and locks in a time instantly.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-slate-500">Auto-Booking Enabled</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Solution */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 font-montserrat text-brand-primary">
                Meet Your AI Receptionist
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-text-primary">
                An intelligent assistant that responds to leads via SMS and web chat 24/7, qualifies them, and books jobs into your calendar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <MessageSquare className="w-10 h-10 text-brand-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-brand-primary">Instant Response</h3>
                <p className="text-sm text-text-secondary">Replies in seconds, not hours</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <Calendar className="w-10 h-10 text-brand-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-brand-primary">Auto Booking</h3>
                <p className="text-sm text-text-secondary">Jobs booked automatically</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <Shield className="w-10 h-10 text-brand-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-brand-primary">Lead Qualification</h3>
                <p className="text-sm text-text-secondary">Filters serious inquiries</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <Zap className="w-10 h-10 text-brand-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-brand-primary">24/7 Available</h3>
                <p className="text-sm text-text-secondary">Never miss a weekend lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Simple Workflow */}
        <section className="min-h-screen w-full flex items-center py-16 px-4 md:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-3 font-montserrat">
              Simple. Automatic. Effective.
            </h2>
            <p className="text-lg md:text-xl text-text-primary text-center mb-10 max-w-2xl mx-auto">
              Here's how it works in the real world
            </p>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 md:p-8 mb-8">
              <div className="space-y-6 md:space-y-8">
                {/* Step 1 */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg md:text-xl text-brand-navy mb-2">Lead texts your business number</h3>
                    <p className="text-sm md:text-base text-text-secondary mb-3 italic">
                      "Can you mow my lawn this week?"
                    </p>
                    <div className="bg-white border border-gray-300 rounded-lg p-3 md:p-4 text-sm">
                      <p className="text-gray-600 text-xs md:text-sm mb-1">📱 To: Your business (0412 XXX XXX)</p>
                      <p className="text-text-primary">"Hi, can you mow my lawn this week?"</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg md:text-xl text-brand-navy mb-3">AI responds instantly & books them in</h3>
                    <div className="bg-white border border-gray-300 rounded-lg p-3 md:p-4 text-sm space-y-2 md:space-y-3">
                      <p className="text-text-primary"><strong>AI:</strong> "I'd be happy to help! We have Thursday at 10am or Friday at 2pm. Which works for you?"</p>
                      <p className="text-gray-600"><strong>Lead:</strong> "Thursday 10am"</p>
                      <p className="text-text-primary"><strong>AI:</strong> "Perfect! You're booked for Thursday 10am. I've sent a confirmation."</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg md:text-xl text-brand-navy mb-3">You confirm with one tap</h3>
                    <div className="bg-white border border-brand-navy rounded-lg p-3 md:p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs md:text-sm font-medium text-yellow-700 bg-yellow-100 px-2 md:px-3 py-1 rounded-full border border-yellow-300">● Pending</span>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                      <p className="font-semibold text-brand-navy mb-2 text-sm md:text-base">Thursday, 10:00 AM - Lawn Mowing</p>
                      <p className="text-xs md:text-sm text-text-secondary mb-3 md:mb-4">John Smith • 0412 XXX XXX</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-green-600 text-white py-2 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm">
                          ✓ Confirm
                        </button>
                        <button className="flex-1 bg-white border-2 border-gray-300 text-text-primary py-2 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-300 text-center">
                <p className="text-brand-navy font-semibold text-base md:text-lg">
                  That's it. You just booked a job without lifting a finger.
                </p>
                <p className="text-text-primary mt-2 text-sm md:text-base">
                  No phone tag. No missed calls. No back-and-forth. Just bookings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">24/7</div>
                <p className="text-text-secondary">Never miss a lead, even at midnight</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">&lt;10s</div>
                <p className="text-text-secondary">Average response time</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand-orange mb-2">2 sec</div>
                <p className="text-text-secondary">To confirm a booking</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="min-h-screen w-full flex items-center py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-5 font-montserrat">
                Choose Your Package
              </h2>
              <p className="text-xl text-text-primary max-w-2xl mx-auto">
                Simple pricing. Fast delivery. Start capturing leads you're currently missing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto lg:items-stretch">
              {/* Tier 1: SMS Responder */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 hover:border-brand-orange transition-all shadow-lg flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-10 h-10 text-brand-orange" />
                  <h3 className="text-2xl font-bold text-brand-navy font-montserrat">SMS Responder</h3>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-brand-navy">$499</p>
                  <p className="text-lg text-text-primary">+ $150/month</p>
                  <p className="text-xs text-text-primary mt-1">(inc. GST)</p>
                  <p className="text-sm text-brand-orange font-semibold mt-2 flex items-center gap-1 justify-center"><Zap className="w-4 h-4" /> Delivered within 3 working days</p>
                </div>

                <p className="text-text-secondary mb-6">
                  Perfect for tradies and mobile services who need to respond fast but don't have a website.
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Dedicated business SMS number</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Up to 500 SMS/month included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">AI responds 24/7 to text inquiries</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Qualifies leads and books appointments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Simple mobile dashboard</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Built-in booking calendar</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">SMS confirmations to you and customer</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="btn-primary w-full py-3 rounded-full font-semibold text-center block"
                  >
                    Get Started
                  </Link>

                  <p className="text-sm text-text-secondary mt-4 italic">
                    Best for: Landscapers, cleaners, mobile mechanics, handymen
                  </p>
                </div>
              </div>

              {/* Tier 2: Professional Package */}
              <div className="bg-white border-2 border-brand-accent rounded-2xl p-10 relative shadow-2xl flex flex-col">
                {/* Header with Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-10 h-10 text-brand-accent" />
                    <h3 className="text-2xl font-bold font-montserrat text-brand-primary">Professional Package</h3>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-brand-accent bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent whitespace-nowrap">
                    Most popular
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-brand-primary">$2,500</p>
                  <p className="text-lg text-text-primary">+ $250/month</p>
                  <p className="text-xs text-text-primary mt-1">(inc. GST)</p>
                  <p className="text-sm text-brand-accent font-semibold mt-2 flex items-center gap-1 justify-center"><Rocket className="w-4 h-4" /> Delivery in 5 to 10 working days</p>
                </div>

                <p className="text-text-primary mb-6">
                  For service businesses ready to look professional with a complete web presence.
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="font-semibold text-brand-primary">Everything in SMS Responder, PLUS:</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Professional one-page website</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Web chat widget (same AI brain)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Custom domain setup (yourname.com.au)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Your branding and colors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Embedded booking system</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-text-primary">Mobile-optimized design</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="bg-brand-accent text-white hover:bg-brand-accent-hover w-full py-3 rounded-full font-semibold text-center block transition-all"
                  >
                    Get Started
                  </Link>

                  <p className="text-sm text-text-secondary mt-4 italic">
                    Best for: Hairdressers, beauty services, pet groomers, mobile businesses ready to grow
                  </p>
                </div>
              </div>
            </div>

            {/* Add-ons note */}
            <div className="mt-12 text-center">
              <p className="text-text-primary">
                Optional add-ons: Payment processing, multiple staff calendars, SMS marketing — discuss during setup
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-3 font-montserrat">
              How It Works
            </h2>
            <p className="text-center text-lg text-text-primary mb-12 max-w-3xl mx-auto">
              We're your "front gate" — capturing leads and booking appointments automatically. You take over from there and manage jobs your way.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Customer Texts/Chats</h3>
                <p className="text-text-primary text-sm">
                  Your customer reaches out via SMS or website chat
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">AI Qualifies Lead</h3>
                <p className="text-text-primary text-sm">
                  Our AI asks questions, understands needs, and checks availability
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">Booking Confirmed</h3>
                <p className="text-text-primary text-sm">
                  Appointment booked into your dashboard, SMS sent to both parties
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-navy">You Take Over</h3>
                <p className="text-text-primary text-sm">
                  Show up, do the work, quote, and get paid — your way
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why CoreSentia Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy text-center mb-10 font-montserrat">
              Why CoreSentia?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <Users className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">100% Australian</h3>
                <p className="text-text-primary">
                  Brisbane-based team. We understand local businesses and what actually works here.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <DollarSign className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">No Hidden Fees</h3>
                <p className="text-text-primary">
                  Simple pricing. No per-conversation charges. No surprise bills. Just predictable monthly hosting.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <TrendingUp className="w-12 h-12 text-brand-orange mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">Fast ROI</h3>
                <p className="text-text-primary">
                  Most customers break even in 2-3 months. Every lead captured after that is pure profit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Request Form Section */}
        <section id="quote-form" className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-3 font-montserrat">
                Ready to Get Started?
              </h2>
              <p className="text-lg md:text-xl text-text-primary max-w-2xl mx-auto">
                Fill out the form below and we'll send you a custom quote within 24 hours. No pressure, no obligation.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>

        {/* Social Proof / Testimonials Section - Placeholder */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-10 font-montserrat">
              Built for Australian Service Businesses
            </h2>
            <p className="text-xl text-text-primary mb-6">
              Whether you're a solo tradie or a growing salon, we help you capture every lead and book more jobs — without the overwhelm.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-brand-orange">24/7</p>
                <p className="text-text-primary mt-2">Always Available</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">&lt;60s</p>
                <p className="text-text-primary mt-2">Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">100%</p>
                <p className="text-text-primary mt-2">Lead Capture Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-orange">2-7</p>
                <p className="text-text-primary mt-2">Days to Launch</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#E5E7EB' }} className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 font-montserrat text-brand-primary">
              Ready to Stop Missing Leads?
            </h2>
            <p className="text-xl md:text-2xl mb-8 font-light text-text-primary">
              Get your AI receptionist set up this week. Start booking more jobs while you focus on the work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#quote-form"
                className="bg-brand-accent text-white hover:bg-brand-accent-hover px-12 py-4 rounded-full font-bold text-xl shadow-xl inline-block transition-all transform hover:scale-105"
              >
                Request a Quote
              </Link>
              <Link
                href="/chat/homepage-visitor"
                className="bg-brand-primary text-white hover:bg-brand-primary-hover px-12 py-4 rounded-full font-bold text-xl shadow-xl inline-block transition-all transform hover:scale-105"
              >
                Chat Now
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-text-primary">
              <span>or text us:</span>
              <a
                href="sms:+61489087491"
                className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent-hover font-bold text-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                +61 489 087 491
              </a>
            </div>
            <p className="text-text-primary mt-4 text-sm">
              No lock-in contracts. Cancel anytime. Full support included.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#E5E7EB' }} className="py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Solutions</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li><a href="#packages" className="hover:text-brand-accent transition-colors">SMS Responder</a></li>
                  <li><a href="#packages" className="hover:text-brand-accent transition-colors">Professional Package</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Company</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li><Link href="/about" className="hover:text-brand-accent transition-colors">About</Link></li>
                  <li><Link href="/faq" className="hover:text-brand-accent transition-colors">FAQ</Link></li>
                  <li><Link href="/terms" className="hover:text-brand-accent transition-colors">Terms</Link></li>
                  <li><Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Industries</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Trades & Contractors</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Beauty & Salons</a></li>
                  <li><a href="#" className="hover:text-brand-accent transition-colors">Mobile Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Connect</h4>
                <p className="text-text-secondary mb-4">Brisbane, Australia</p>
                <div className="space-y-2">
                  <a
                    href="sms:+61489087491"
                    className="flex items-center gap-2 text-brand-accent hover:text-brand-accent-hover transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +61 489 087 491
                  </a>
                  <Link
                    href="mailto:info@coresentia.com"
                    className="block text-brand-accent hover:text-brand-accent-hover transition-colors"
                  >
                    info@coresentia.com
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-text-secondary mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-accent" />
                  <span>Australian data residency</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-accent" />
                  <span>No per-conversation fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span>24hr response SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-accent" />
                  <span>Brisbane-based support</span>
                </div>
              </div>

              <div className="text-center text-text-secondary">
                <p className="font-montserrat">&copy; 2025 CoreSentia. Never miss a lead again.</p>
                <p className="text-sm mt-2">ABN: 69 267 271 132</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky Mobile FAB */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Link
          href="/chat/homepage-visitor"
          className="w-14 h-14 rounded-full bg-brand-primary text-white shadow-xl shadow-brand-primary/40 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
