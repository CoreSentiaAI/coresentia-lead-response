'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'services' | 'process' | 'technical'
}

const faqs: FAQItem[] = [
  // General Questions
  {
    category: 'general',
    question: "What does CoreSentia do?",
    answer: "CoreSentia is an AI-native development studio. We design and build production software — SaaS platforms, AI automation systems, internal tools, and web applications. We take projects from concept to production using modern tech stacks like Next.js, Claude AI, Supabase, and Twilio."
  },
  {
    category: 'general',
    question: "Who is CoreSentia for?",
    answer: "We work with businesses that need custom software built properly — not templates or drag-and-drop solutions. Whether you need a SaaS platform, an AI-powered automation system, or internal tools to streamline operations, we build production-grade software that runs 24/7."
  },
  {
    category: 'general',
    question: "Where is CoreSentia based?",
    answer: "We're Brisbane-based and Australian-owned (ABN: 69 267 271 132). We work with clients across Australia and can collaborate remotely."
  },
  {
    category: 'general',
    question: "What's your track record?",
    answer: "We've built a $350K+ automations hub (55,000+ lines of production code) at GEM Energy, multiple production web applications, and an AI-powered receptionist system with voice, SMS, and web chat capabilities. Everything we build runs in production."
  },

  // Services
  {
    category: 'services',
    question: "What types of projects do you take on?",
    answer: "We specialise in three areas: SaaS Applications (full-stack web apps with auth, payments, dashboards), AI Automation (intelligent systems using Claude AI, automated workflows, conversational interfaces), and Internal Tools (custom dashboards, admin panels, operational tools)."
  },
  {
    category: 'services',
    question: "Do you still offer the AI Receptionist product?",
    answer: "Yes! Our AI Receptionist is a live product available for Australian service businesses. It provides 24/7 AI-powered phone answering, SMS automation, and appointment booking. Visit the AI Receptionist project page for pricing and details."
  },
  {
    category: 'services',
    question: "Can you build custom AI integrations?",
    answer: "Absolutely. We have deep experience integrating Claude AI (Anthropic) into production systems — from natural language interfaces to automated decision-making and content generation. We can build custom AI features into any application."
  },
  {
    category: 'services',
    question: "Do you build websites too?",
    answer: "Yes, but not the template kind. We build custom web applications and marketing sites using Next.js and Tailwind CSS. If you need a WordPress site, we're probably not the right fit. If you need something custom and performant, we are."
  },

  // Process
  {
    category: 'process',
    question: "How does your development process work?",
    answer: "We start with a discovery call to understand your needs, then provide a clear scope and quote. Once approved, we build iteratively — shipping working software early and often. You get access to staging environments throughout the process."
  },
  {
    category: 'process',
    question: "How long does a typical project take?",
    answer: "It depends on scope. A simple internal tool might take 1-2 weeks. A full SaaS platform could be 4-8 weeks. We'll give you a clear timeline during scoping. We don't do multi-month enterprise projects with vague timelines."
  },
  {
    category: 'process',
    question: "What's your pricing model?",
    answer: "We quote per-project with clear deliverables. No hourly billing, no scope ambiguity. You know exactly what you're getting and what it costs before we start. For ongoing work, we offer monthly retainers."
  },

  // Technical
  {
    category: 'technical',
    question: "What tech stack do you use?",
    answer: "Our primary stack is Next.js (React), TypeScript, Tailwind CSS, Supabase (PostgreSQL), and Vercel for hosting. For AI, we use Claude AI (Anthropic). For communications, Twilio (SMS/Voice). We choose tools based on what's best for each project."
  },
  {
    category: 'technical',
    question: "Do you provide hosting and maintenance?",
    answer: "Yes. We can host and maintain applications we build, or hand them off to your team with full documentation. Most projects are deployed on Vercel with Supabase for the database — both are reliable, scalable platforms."
  },
  {
    category: 'technical',
    question: "Can you work with our existing codebase?",
    answer: "Yes, depending on the tech stack and code quality. We're comfortable picking up existing Next.js/React projects. For other stacks, we'd need to evaluate first. We'll be honest about whether we're the right fit."
  },
  {
    category: 'technical',
    question: "What about security and data privacy?",
    answer: "Security is baked into everything we build. We use encrypted databases, secure authentication (Supabase Auth), HTTPS everywhere, and follow OWASP best practices. All data is stored in compliance with Australian privacy requirements."
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredFAQs = filterCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === filterCategory)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'general', label: 'General' },
    { key: 'services', label: 'Services' },
    { key: 'process', label: 'Process' },
    { key: 'technical', label: 'Technical' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">FAQ</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-raleway">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-dt-secondary">
              Everything you need to know about working with CoreSentia
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => { setFilterCategory(cat.key); setOpenIndex(null) }}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                    filterCategory === cat.key
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/20'
                      : 'bg-dark-bg-tertiary text-dt-secondary border border-dark-border hover:border-brand-accent hover:text-dt-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-dark-bg-tertiary border border-dark-border rounded-xl overflow-hidden hover:border-brand-primary/30 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-dark-bg-elevated/50 transition"
                  >
                    <span className="font-semibold text-dt-primary pr-8">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-dt-tertiary flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 text-dt-secondary leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-dark-bg-secondary border-t border-dark-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-dt-primary mb-6 font-raleway">
              Still Have Questions?
            </h2>
            <p className="text-xl text-dt-secondary mb-8">
              Get in touch and we&apos;ll be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="btn-primary px-10 py-4 rounded-full font-semibold text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="shimmer-span" />
              </Link>
              <Link
                href="mailto:info@coresentia.com"
                className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg"
              >
                Email Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
