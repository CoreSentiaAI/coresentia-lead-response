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
    question: 'What does CoreSentia do?',
    answer:
      'We build software for established businesses that want to run better. That usually starts with mapping how work actually moves through the business, then automating the manual steps — connecting the systems you already use, building the internal platforms you wish existed, and designing AI into the workflow where it genuinely helps.',
  },
  {
    category: 'general',
    question: 'Who is CoreSentia for?',
    answer:
      "Businesses that are already making money and losing time. If your team re-keys data between systems, runs the operation out of spreadsheets, or pays for enterprise software it barely uses, that's the gap we close. We're not the right fit if you want a template website or a drag-and-drop tool.",
  },
  {
    category: 'general',
    question: 'Where is CoreSentia based?',
    answer:
      "We're Brisbane-based and Australian-owned (ABN: 69 267 271 132). We work with clients across Australia and collaborate remotely.",
  },
  {
    category: 'general',
    question: "What's your track record?",
    answer:
      'Our flagship build is an enterprise operations platform for a national Australian solar company — 300,000+ lines of production TypeScript, 500+ API endpoints, and 15+ integrated SaaS platforms, processing hundreds of sales a month. An equivalent agency build would scope well past $1M. We also run FirstLight, a consumer SaaS for nature photographers, and have shipped 24/7 conversational AI systems handling real phone calls and SMS. Everything we build runs in production.',
  },

  // Services
  {
    category: 'services',
    question: 'What types of projects do you take on?',
    answer:
      'Four things, mostly: process automation (removing the manual steps between quote and cash), systems integration (making your CRM, accounting, inventory, and comms talk to each other), internal platforms (custom dashboards, pipelines, and tools built around your team), and AI-native software (products with intelligence designed in from the start).',
  },
  {
    category: 'services',
    question: 'Can you build conversational AI — voice, SMS, chat?',
    answer:
      "Yes. We've shipped production systems that answer real phone calls, qualify leads over SMS, and book appointments end-to-end, 24/7. We build these as custom projects now, integrated with your existing phone numbers, calendars, and CRM.",
  },
  {
    category: 'services',
    question: 'Can you build custom AI integrations?',
    answer:
      'Absolutely. We have deep experience integrating Claude AI (Anthropic) into production systems — validating data before it enters your pipeline, drafting routine work, powering internal assistants, and automated decision-making. We can build AI features into any application, including systems we didn\'t originally build.',
  },
  {
    category: 'services',
    question: 'Do you build websites too?',
    answer:
      "Yes, but not the template kind. We build custom web applications and marketing sites using Next.js and Tailwind CSS. If you need a WordPress site, we're probably not the right fit. If you need something custom and performant, we are.",
  },

  // Process
  {
    category: 'process',
    question: 'How does your development process work?',
    answer:
      'We start with a discovery call to understand your business and map the process we\'re improving, then provide a clear scope and quote. Once approved, we build iteratively — shipping working software early and often. You get access to staging environments throughout, and we shape features with the people who\'ll actually use them.',
  },
  {
    category: 'process',
    question: 'How long does a typical project take?',
    answer:
      "It depends on scope. A simple internal tool might take 1-2 weeks. A full platform could be 4-8 weeks. Our largest build — an enterprise operations platform with 15+ integrations — went from first commit to production in 15 weeks, and kept growing from there. We'll give you a clear timeline during scoping.",
  },
  {
    category: 'process',
    question: "What's your pricing model?",
    answer:
      'We quote per-project with clear deliverables. No hourly billing, no scope ambiguity. You know exactly what you\'re getting and what it costs before we start. For ongoing work, we offer monthly retainers.',
  },
  {
    category: 'process',
    question: 'Who owns the code?',
    answer:
      'You do. Every line. No vendor lock-in, no licensing fees on your own system, no retainer required to keep what you paid for. We hand over the repository, the infrastructure, and full documentation.',
  },

  // Technical
  {
    category: 'technical',
    question: 'What tech stack do you use?',
    answer:
      "Our primary stack is Next.js (React), TypeScript, Tailwind CSS, PostgreSQL (Supabase), and Vercel for hosting. For AI, we use Claude (Anthropic). We integrate with whatever your business already runs — CRMs, accounting platforms, quoting tools, Google Workspace — and we choose tools based on what's best for each project.",
  },
  {
    category: 'technical',
    question: 'Do you provide hosting and maintenance?',
    answer:
      'Yes. We can host and maintain applications we build, or hand them off to your team with full documentation. Most projects are deployed on Vercel with Supabase for the database — both are reliable, scalable platforms.',
  },
  {
    category: 'technical',
    question: 'Can you work with our existing codebase?',
    answer:
      "Yes, depending on the tech stack and code quality. We're comfortable picking up existing Next.js/React projects. For other stacks, we'd need to evaluate first. We'll be honest about whether we're the right fit.",
  },
  {
    category: 'technical',
    question: 'What about security and data privacy?',
    answer:
      'Security is baked into everything we build. We use encrypted databases, secure authentication, webhook signature validation, role-based access control, and follow OWASP best practices. All data is stored in compliance with Australian privacy requirements.',
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
    { key: 'all', label: 'All questions' },
    { key: 'general', label: 'General' },
    { key: 'services', label: 'Services' },
    { key: 'process', label: 'Process' },
    { key: 'technical', label: 'Technical' },
  ]

  return (
    <div className="min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 font-fraunces">
              Questions, answered
            </h1>
            <p className="text-xl text-ink-2">
              Everything you need to know about working with CoreSentia.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => { setFilterCategory(cat.key); setOpenIndex(null) }}
                  className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                    filterCategory === cat.key
                      ? 'bg-brand-highlight text-dark-bg-primary'
                      : 'bg-surface-card text-ink-2 border border-line-soft hover:border-brand-accent hover:text-ink-1'
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
                  key={faq.question}
                  className="bg-surface-card border border-line-soft rounded-xl overflow-hidden hover:border-brand-primary/30 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition"
                  >
                    <span className="font-semibold text-ink-1 pr-8">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-brand-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-ink-3 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 text-ink-2 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 bg-surface-alt border-t border-line-soft">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-ink-1 mb-4 font-fraunces">
              Still have questions?
            </h2>
            <p className="text-xl text-ink-2 mb-8">
              Get in touch and we&apos;ll be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg hover:bg-[#4dc4e8] transition-colors text-center"
              >
                Get in touch
              </Link>
              <Link
                href="mailto:info@coresentia.com"
                className="px-8 py-3.5 rounded-lg border border-line-strong text-ink-1 font-semibold hover:border-brand-accent transition-colors text-center"
              >
                Email us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
