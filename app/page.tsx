import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bot } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import AnimateOnScroll from './components/AnimateOnScroll'
import ServiceTerminals from './components/ServiceTerminals'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary relative overflow-x-hidden">
      <Header />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] flex items-center px-6 lg:px-8 pt-24 pb-8 overflow-hidden">
        {/* Background: Atmospheric image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/hero-bg.jpeg"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
            quality={80}
          />
          {/* Top fade — ensures header area stays clean */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-bg-primary to-transparent" />
          {/* Bottom fade — blends into next section */}
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-dark-bg-primary to-transparent" />
          {/* Left fade — protects text readability */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark-bg-primary to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left column — 60% */}
            <div className="lg:col-span-3">
              <h1 className="text-display font-bold font-raleway">
                We build<br />
                intelligent<br />
                software
              </h1>

              {/* Grouped subtext + CTA — pulled away from headline */}
              <div className="mt-12 lg:mt-16">
                <p className="text-lg text-dt-secondary max-w-md mb-8 leading-relaxed">
                  Production SaaS, AI systems, and automation. Brisbane.
                </p>

                <div className="flex items-center gap-6">
                  <Link
                    href="#contact"
                    className="px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg
                      hover:bg-[#4dc4e8] transition-colors text-base
                      shadow-[0_0_20px_rgba(98,212,249,0.3)]"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/projects"
                    className="text-dt-tertiary hover:text-dt-primary font-medium transition-colors text-sm group inline-flex items-center gap-1.5"
                  >
                    View our work
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column — stats with left border anchor */}
            <div className="lg:col-span-2 hidden lg:flex flex-col gap-10 border-l border-dark-border pl-10 py-4">
              <div>
                <div className="text-5xl font-bold font-mono text-dt-primary tracking-editorial">10x</div>
                <div className="text-sm text-dt-tertiary mt-2">faster than traditional agencies</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-mono text-dt-primary tracking-editorial">20+</div>
                <div className="text-sm text-dt-tertiary mt-2">APIs and systems integrated</div>
              </div>
              <div>
                <div className="text-5xl font-bold font-mono text-dt-primary tracking-editorial">24/7</div>
                <div className="text-sm text-dt-tertiary mt-2">AI systems running autonomously</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE BUILD ========== */}
      <section className="relative py-16 lg:py-20 px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">What we build</h2>
              <p className="text-dt-secondary">
                End-to-end product development — from first commit to production deployment.
              </p>
            </div>
          </AnimateOnScroll>

          <ServiceTerminals />
        </div>
      </section>

      {/* ========== SELECTED WORK ========== */}
      <section className="relative py-16 lg:py-20 px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Selected work</h2>
            </div>
          </AnimateOnScroll>

          {/* AI Receptionist — editorial split */}
          <AnimateOnScroll>
            <Link href="/projects/ai-receptionist" className="block group">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* Left — project details */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live</span>
                    <span className="text-dt-tertiary text-xs">AI + Automation</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-raleway mb-4 group-hover:text-brand-accent transition-colors">
                    AI Receptionist
                  </h3>
                  <p className="text-dt-secondary mb-8 leading-relaxed max-w-xl">
                    24/7 AI-powered phone answering for Australian service businesses. Handles real calls,
                    qualifies leads via SMS, and books appointments — fully autonomous, no human needed.
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    View project <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Right — compact chat visual */}
                <div className="lg:col-span-2 hidden lg:block">
                  <div className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div className="bg-dark-bg-elevated rounded-xl rounded-tl-sm px-4 py-3 text-sm text-dt-secondary">
                          G&apos;day! Thanks for calling Smith Plumbing. I&apos;m the AI assistant. How can I help you today?
                        </div>
                      </div>
                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl rounded-tr-sm px-4 py-3 text-sm text-dt-secondary">
                          Hi, I&apos;ve got a leaking tap in the kitchen. Can someone come out today?
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div className="bg-dark-bg-elevated rounded-xl rounded-tl-sm px-4 py-3 text-sm text-dt-secondary">
                          Absolutely, I can help with that. Let me check the schedule and find the next available slot for you.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-12 pt-8 border-t border-dark-border">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-dark-border-light text-dt-secondary text-sm font-medium
                  hover:border-brand-highlight hover:text-brand-highlight transition-all"
              >
                View all projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== TRACK RECORD ========== */}
      <section className="relative py-16 lg:py-20 px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll>
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-10">Track record</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-4 gap-10 md:gap-12">
            {[
              { value: '$350K+', label: 'In enterprise automation value delivered' },
              { value: '80K+', label: 'Lines of production TypeScript shipped' },
              { value: '20+', label: 'APIs and business systems integrated' },
              { value: '150+', label: 'Curated locations in FirstLight platform' },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div>
                  <div className="text-5xl md:text-6xl font-bold font-mono text-dt-primary mb-3 tracking-editorial">{stat.value}</div>
                  <div className="text-dt-tertiary text-sm">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative py-16 lg:py-20 px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/section-bg.jpeg"
            alt=""
            fill
            className="object-cover opacity-25"
            quality={75}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left — heading */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">
                  Let&apos;s build<br />something.
                </h2>
                <p className="text-dt-secondary">
                  Tell us about your project. We&apos;ll get back to you within 24 hours.
                </p>
              </AnimateOnScroll>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll delay={100}>
                <ContactForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  )
}
