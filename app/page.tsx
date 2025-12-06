import Image from 'next/image'
import Link from 'next/link'
import { Zap, MessageSquare, Globe, Calendar, Check, Clock, DollarSign, Users, Phone, TrendingUp, Shield, Rocket } from 'lucide-react'
import Header from './components/Header'
import QuoteForm from './components/QuoteForm'
import ProblemTabs from './components/ProblemTabs'
import TimelineTabs from './components/TimelineTabs'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-text-primary relative overflow-x-hidden font-opensans">
      {/* Background with Dot Grid & Glowing Orbs - Now extends full page */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Radial Masks to fade edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>

        {/* Glowing Orbs using Brand Colors - Multiple orbs for full page coverage */}
        {/* Top Right: Light Blue */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 mix-blend-multiply" style={{
          background: 'rgba(98, 212, 249, 0.25)' // brand-light-blue
        }}></div>
        {/* Mid-page Left: Royal Blue */}
        <div className="absolute top-[800px] left-0 w-[600px] h-[600px] rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 mix-blend-multiply" style={{
          background: 'rgba(42, 80, 223, 0.18)' // brand-primary
        }}></div>
        {/* Mid-page Right: Medium Blue */}
        <div className="absolute top-[1400px] right-0 w-[700px] h-[700px] rounded-full blur-3xl translate-x-1/4 mix-blend-multiply" style={{
          background: 'rgba(16, 153, 231, 0.12)' // brand-accent
        }}></div>
        {/* Lower: Light Blue */}
        <div className="absolute top-[2200px] left-1/4 w-[600px] h-[600px] rounded-full blur-3xl mix-blend-multiply" style={{
          background: 'rgba(98, 212, 249, 0.20)' // brand-light-blue
        }}></div>
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 scroll-smooth">
        {/* Header Component */}
        <Header />

        {/* Hero Section */}
        <section className="min-h-screen w-full flex items-center px-6 lg:px-8 pt-40 md:pt-32 lg:pt-0 relative overflow-hidden"
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
                  <p className="text-[10px] text-slate-500">Ready to confirm</p>
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
                <div className="p-6 pb-32 space-y-3 h-[450px] overflow-hidden bg-gradient-to-b from-white/20 to-white/60">

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

                  {/* Booking Pending Card */}
                  <div style={{
                    opacity: 0,
                    animation: 'popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 2.5s'
                  }} className="mt-2">
                    <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-md flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Booking Requested</p>
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
          <div className="max-w-7xl mx-auto px-6 py-4">
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
        <section className="relative z-10 bg-white py-10 px-6 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy mb-4 leading-[1.2] font-montserrat">
                Sound familiar?
              </h2>
              <p className="text-lg text-text-primary max-w-2xl mx-auto">
                You're losing leads while you're on the tools. Your AI receptionist changes that.
              </p>
            </div>

            {/* Tabbed Problem Interface */}
            <ProblemTabs />
          </div>
        </section>

        {/* How it works: Interactive Timeline */}
        <section className="relative z-10 bg-white py-12 border-t border-slate-200">

          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-12 relative">
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-2 block">The Process</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6 font-montserrat">Simple. Automatic. Effective.</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Here's how it works in the real world.</p>
            </div>

            {/* Tabbed Timeline */}
            <TimelineTabs />

          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative z-10 bg-white py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-montserrat">Simple, Transparent Pricing.</h2>
              <p className="text-lg text-slate-600">Choose the package that fits your stage of business.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">

              {/* Package 1: Web Presence Package */}
              <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-300 shadow-lg transition-shadow flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-600 to-slate-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  Entry Level
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-montserrat">Web Presence</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Get online professionally. Perfect for sole traders who need a web presence.
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-slate-900">$799</span>
                  <span className="text-slate-500 text-sm font-medium">setup</span>
                </div>
                <div className="text-slate-500 text-xs mb-2">+ $49 / month (inc. GST)</div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-4">
                  <Zap className="w-3 h-3" />
                  5 days delivery
                </div>

                <ul className="space-y-2 mb-6 flex-grow text-xs">
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Professional one-page website
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Custom domain setup (.com.au)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Professional logo design
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Business email (@yourbusiness.com.au)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Contact form (emails to you)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Mobile-responsive design
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Hosting included
                  </li>
                </ul>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="block w-full py-2.5 text-sm text-center rounded-xl bg-slate-600 text-white font-semibold shadow-md hover:bg-slate-700 transition-all hover:-translate-y-0.5 mb-3"
                  >
                    Get Started
                  </Link>

                  <p className="text-xs text-slate-500 italic text-center">
                    Best for: Sole traders getting started
                  </p>
                </div>
              </div>

              {/* Package 2: AI Bot Package */}
              <div className="relative bg-white rounded-3xl p-6 border-2 border-brand-primary shadow-xl transition-shadow flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  AI Automation
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-montserrat">AI Bot Package</h3>
                <p className="text-xs text-slate-500 mb-4">
                  24/7 AI answering for calls & texts. Perfect if you already have a website.
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-slate-900">$499</span>
                  <span className="text-slate-500 text-sm font-medium">setup</span>
                </div>
                <div className="text-slate-500 text-xs mb-2">+ $150 / month (inc. GST)</div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2 py-1 rounded mb-4">
                  <Zap className="w-3 h-3" />
                  3 days delivery
                </div>

                <ul className="space-y-2 mb-6 flex-grow text-xs">
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Dedicated business phone number
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    AI answers calls & SMS 24/7
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Up to 500 SMS/month included
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Qualifies leads automatically
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Books appointments (pending your approval)
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Simple booking dashboard
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    SMS confirmations
                  </li>
                </ul>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="block w-full py-2.5 text-sm text-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/40 transition-all hover:-translate-y-0.5 mb-3"
                  >
                    Get Started
                  </Link>

                  <p className="text-xs text-slate-500 italic text-center">
                    Best for: Busy tradies missing calls
                  </p>
                </div>
              </div>

              {/* Package 3: Complete Package (Highlighted) */}
              <div className="relative bg-white rounded-3xl p-6 border-2 border-brand-accent shadow-xl flex flex-col">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-accent to-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  Most Popular
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 font-montserrat">Complete Package</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Everything you need: Website + AI automation. Best value.
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-slate-900">$1,199</span>
                  <span className="text-slate-500 text-sm font-medium">setup</span>
                </div>
                <div className="text-slate-500 text-xs mb-2">+ $199 / month (inc. GST)</div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-4">
                  <Rocket className="w-3 h-3" />
                  Save $99!
                </div>

                <ul className="space-y-2 mb-6 flex-grow text-xs">
                  <li className="flex items-start gap-2 text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-brand-light-blue/20 flex items-center justify-center text-brand-primary font-bold text-[10px] mt-0.5">✓</div>
                    <span className="font-semibold text-brand-primary">Everything above, PLUS:</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Website + AI bot integrated
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Web chat widget on your site
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Embedded booking system
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Your branding throughout
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Priority support
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    5-7 day delivery
                  </li>
                </ul>

                <div className="mt-auto">
                  <Link
                    href="/chat/homepage-visitor"
                    className="block w-full py-2.5 text-sm text-center rounded-xl bg-gradient-to-r from-brand-accent to-brand-primary text-white font-semibold shadow-lg shadow-brand-accent/30 hover:shadow-brand-accent/40 transition-all hover:-translate-y-0.5 mb-3"
                  >
                    Get Complete Package
                  </Link>

                  <p className="text-xs text-slate-500 italic text-center">
                    Best for: Serious about growth
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why CoreSentia Section */}
        <section className="relative z-10 bg-white py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-2 block">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-montserrat">Why CoreSentia?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We're built different. Australian-owned, transparent pricing, and designed for fast results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-montserrat">100% Australian</h3>
                <p className="text-slate-600 leading-relaxed">
                  Brisbane-based team. We understand local businesses and what actually works here.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-montserrat">No Hidden Fees</h3>
                <p className="text-slate-600 leading-relaxed">
                  Simple pricing. No per-conversation charges. No surprise bills. Just predictable monthly hosting.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-montserrat">Fast ROI</h3>
                <p className="text-slate-600 leading-relaxed">
                  Most customers break even in 2-3 months. Every lead captured after that is pure profit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Request Form Section */}
        <section id="quote-form" className="relative z-10 bg-white py-12 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-2 block">Get Started</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-montserrat">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fill out the form below and we'll send you a custom quote within 24 hours. No pressure, no obligation.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#E5E7EB' }} className="py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Solutions</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li><a href="#packages" className="hover:text-brand-accent transition-colors">Web Presence</a></li>
                  <li><a href="#packages" className="hover:text-brand-accent transition-colors">AI Bot Package</a></li>
                  <li><a href="#packages" className="hover:text-brand-accent transition-colors">Complete Package</a></li>
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
