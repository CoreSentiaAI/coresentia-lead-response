import Link from 'next/link'
import { ArrowLeft, Zap, Check, Calendar, Phone, Shield, DollarSign, Users, TrendingUp, Rocket, MessageSquare } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import QuoteForm from '../../components/QuoteForm'
import ProblemTabs from '../../components/ProblemTabs'
import TimelineTabs from '../../components/TimelineTabs'
import AnimateOnScroll from '../../components/AnimateOnScroll'

export default function AIReceptionistPage() {
  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary relative overflow-x-hidden">
      <Header />

      <main className="pt-28 pb-0">
        {/* Back to Projects */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 pb-20 overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-glow-pulse"
              style={{ background: 'radial-gradient(circle, rgba(42, 80, 223, 0.15) 0%, transparent 70%)' }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live in Production</span>
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-highlight text-xs font-semibold">CoreSentia Product</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6 leading-tight">
                  AI Receptionist for{' '}
                  <span className="gradient-text">Australian Service Businesses</span>
                </h1>

                <p className="text-lg md:text-xl text-dt-secondary mb-8 leading-relaxed">
                  Never miss a lead again. 24/7 AI-powered phone answering, SMS automation, and appointment booking — so you can focus on the job while we handle the front gate.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="#ai-quote-form"
                    className="btn-primary px-10 py-4 rounded-full font-semibold text-lg relative overflow-hidden"
                  >
                    <span className="relative z-10">Request a Quote</span>
                    <span className="shimmer-span" />
                  </Link>
                  <Link
                    href="/chat/homepage-visitor"
                    className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg"
                  >
                    Chat With Our AI
                  </Link>
                </div>

                {/* SMS CTA */}
                <div className="flex items-center gap-2 text-dt-secondary">
                  <span className="text-sm">or text our AI:</span>
                  <a
                    href="sms:+61489087491"
                    className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold text-lg transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +61 489 087 491
                  </a>
                </div>

                {/* Micro-metrics */}
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <div className="flex items-center gap-2 text-sm text-dt-tertiary">
                    <Zap className="w-4 h-4 text-brand-accent" />
                    <span>Avg reply &lt;10s</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dt-tertiary">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    <span>2-10 working days to launch</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dt-tertiary">
                    <Shield className="w-4 h-4 text-brand-accent" />
                    <span>100% Australian</span>
                  </div>
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Next.js', 'Claude AI', 'Twilio', 'Supabase', 'Google TTS', 'Vercel'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* How It Works - TimelineTabs */}
        <section className="relative bg-dark-bg-secondary py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">How It Works</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">24/7 AI That Never Misses a Lead</h2>
                <p className="text-dt-secondary max-w-2xl mx-auto">
                  See how the AI handles a real customer interaction from first message to confirmed booking.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <TimelineTabs />
            </AnimateOnScroll>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="packages" className="relative py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-16">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Pricing</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Simple, Transparent Pricing.</h2>
                <p className="text-lg text-dt-secondary">Choose the package that fits your stage of business.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
              {/* Package 1: Web Presence */}
              <AnimateOnScroll delay={0}>
                <div className="relative bg-dark-bg-tertiary rounded-3xl p-6 border border-dark-border-light hover:border-dt-tertiary/30 transition-all flex flex-col h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-600 to-slate-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    Entry Level
                  </div>

                  <h3 className="text-lg font-bold text-dt-primary mb-2 font-raleway">Web Presence</h3>
                  <p className="text-xs text-dt-tertiary mb-4">
                    Get online professionally. Perfect for sole traders who need a web presence.
                  </p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-dt-primary">$799</span>
                    <span className="text-dt-tertiary text-sm font-medium">setup</span>
                  </div>
                  <div className="text-dt-tertiary text-xs mb-2">+ $49 / month (inc. GST)</div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-4 w-fit">
                    <Zap className="w-3 h-3" />
                    5 days delivery
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow text-xs">
                    {[
                      'Professional one-page website',
                      'Custom domain setup (.com.au)',
                      'Professional logo design',
                      'Business email (@yourbusiness.com.au)',
                      'Contact form (emails to you)',
                      'Mobile-responsive design',
                      'Hosting included',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href="/chat/homepage-visitor"
                      className="block w-full py-2.5 text-sm text-center rounded-xl bg-dark-bg-elevated border border-dark-border-light text-dt-primary font-semibold hover:border-brand-accent hover:text-brand-accent transition-all mb-3"
                    >
                      Get Started
                    </Link>
                    <p className="text-xs text-dt-tertiary italic text-center">
                      Best for: Sole traders getting started
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Package 2: AI Bot */}
              <AnimateOnScroll delay={150}>
                <div className="relative bg-dark-bg-tertiary rounded-3xl p-6 border border-brand-primary/40 glow-blue transition-all flex flex-col h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    AI Automation
                  </div>

                  <h3 className="text-lg font-bold text-dt-primary mb-2 font-raleway">AI Bot Package</h3>
                  <p className="text-xs text-dt-tertiary mb-4">
                    24/7 AI answering for calls & texts. Perfect if you already have a website.
                  </p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-dt-primary">$499</span>
                    <span className="text-dt-tertiary text-sm font-medium">setup</span>
                  </div>
                  <div className="text-dt-tertiary text-xs mb-2">+ $150 / month (inc. GST)</div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2 py-1 rounded mb-4 w-fit">
                    <Zap className="w-3 h-3" />
                    3 days delivery
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow text-xs">
                    {[
                      'Dedicated business phone number',
                      'AI answers calls & SMS 24/7',
                      'Up to 500 SMS/month included',
                      'Qualifies leads automatically',
                      'Books appointments (pending your approval)',
                      'Simple booking dashboard',
                      'SMS confirmations',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href="/chat/homepage-visitor"
                      className="block w-full py-2.5 text-sm text-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-semibold shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all mb-3"
                    >
                      Get Started
                    </Link>
                    <p className="text-xs text-dt-tertiary italic text-center">
                      Best for: Busy tradies missing calls
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Package 3: Complete */}
              <AnimateOnScroll delay={300}>
                <div className="relative bg-dark-bg-tertiary rounded-3xl p-6 border border-brand-accent/40 glow-accent transition-all flex flex-col h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-accent to-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    Most Popular
                  </div>

                  <h3 className="text-lg font-bold text-dt-primary mb-2 font-raleway">Complete Package</h3>
                  <p className="text-xs text-dt-tertiary mb-4">
                    Everything you need: Website + AI automation. Best value.
                  </p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-dt-primary">$1,199</span>
                    <span className="text-dt-tertiary text-sm font-medium">setup</span>
                  </div>
                  <div className="text-dt-tertiary text-xs mb-2">+ $199 / month (inc. GST)</div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-4 w-fit">
                    <Rocket className="w-3 h-3" />
                    Save $99!
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow text-xs">
                    <li className="flex items-start gap-2 text-brand-accent">
                      <div className="w-4 h-4 rounded-full bg-brand-primary/20 flex items-center justify-center text-[10px] mt-0.5 font-bold">✓</div>
                      <span className="font-semibold">Everything above, PLUS:</span>
                    </li>
                    {[
                      'Website + AI bot integrated',
                      'Web chat widget on your site',
                      'Embedded booking system',
                      'Your branding throughout',
                      'Priority support',
                      '5-7 day delivery',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href="/chat/homepage-visitor"
                      className="block w-full py-2.5 text-sm text-center rounded-xl bg-gradient-to-r from-brand-accent to-brand-primary text-white font-semibold shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40 transition-all mb-3"
                    >
                      Get Complete Package
                    </Link>
                    <p className="text-xs text-dt-tertiary italic text-center">
                      Best for: Serious about growth
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Problem Section - ProblemTabs */}
        <section className="relative bg-dark-bg-secondary py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">The Problem</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Sound Familiar?</h2>
                <p className="text-dt-secondary max-w-2xl mx-auto">
                  Most service businesses lose leads every single day. Here&apos;s why.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <ProblemTabs />
            </AnimateOnScroll>
          </div>
        </section>

        {/* Why CoreSentia */}
        <section className="relative py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-16">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Why Choose Us</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Why CoreSentia?</h2>
                <p className="text-lg text-dt-secondary max-w-2xl mx-auto">
                  Australian-owned, transparent pricing, and designed for fast results.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Users, title: '100% Australian', description: 'Brisbane-based team. We understand local businesses and what actually works here.' },
                { icon: DollarSign, title: 'No Hidden Fees', description: 'Simple pricing. No per-conversation charges. No surprise bills. Just predictable monthly hosting.' },
                { icon: TrendingUp, title: 'Fast ROI', description: 'Most customers break even in 2-3 months. Every lead captured after that is pure profit.' },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 150}>
                  <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8 hover:border-brand-primary/30 hover:glow-blue transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-brand-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-dt-primary mb-3 font-raleway">{item.title}</h3>
                    <p className="text-dt-secondary leading-relaxed text-sm">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="ai-quote-form" className="relative bg-dark-bg-secondary py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Get Started</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">
                  Ready to Never Miss a Lead Again?
                </h2>
                <p className="text-lg text-dt-secondary max-w-2xl mx-auto">
                  Fill out the form below and we&apos;ll send you a custom quote within 24 hours.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <QuoteForm />
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky Mobile FAB */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Link
          href="/chat/homepage-visitor"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-xl shadow-brand-primary/40 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageSquare className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
