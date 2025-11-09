'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../components/Header'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'features' | 'pricing' | 'technical'
}

const faqs: FAQItem[] = [
  // General Questions
  {
    category: 'general',
    question: "What exactly does CoreSentia do?",
    answer: "CoreSentia is your AI-powered receptionist. We respond to SMS and web chat inquiries 24/7, qualify leads by asking the right questions, and book appointments into your calendar automatically. Think of us as the 'front gate' — we capture leads and get them into your pipeline, then you take over and manage the job your way."
  },
  {
    category: 'general',
    question: "Who is CoreSentia for?",
    answer: "We're built for Australian service businesses — tradies, salon owners, pet groomers, mobile mechanics, cleaners, landscapers, and anyone who can't answer their phone while working. If you're missing leads because you're too busy, CoreSentia is for you."
  },
  {
    category: 'general',
    question: "How fast can I get set up?",
    answer: "SMS Responder: 2-3 days. Professional Package: 5 to 10 working days. We gather your business information, customize the AI, set up your systems, and get you live fast."
  },

  // Features & Scope
  {
    category: 'features',
    question: "Does CoreSentia provide quotes or take payments?",
    answer: "Not at this stage. Our focus is on lead capture and appointment booking. You provide quotes and handle payments during the appointment or via your existing process. We're the 'front gate' that gets customers into your pipeline — you handle the rest your way."
  },
  {
    category: 'features',
    question: "What happens after someone books an appointment?",
    answer: "Once booked, the appointment appears in your dashboard, and we send SMS confirmations to both you and your customer. From there, you manage the job directly — rescheduling, quotes, payments, etc. We don't replace your workflow; we feed leads into it."
  },
  {
    category: 'features',
    question: "Can I reschedule appointments through CoreSentia?",
    answer: "Currently, if you need to reschedule, just text or call your customer directly (their number is in your dashboard). We're focused on lead capture first. We may add automated rescheduling in future if there's strong demand."
  },
  {
    category: 'features',
    question: "What if a customer asks a complex question?",
    answer: "The AI is smart and handles most common inquiries. If it encounters something complex or specific to your business, it will book a call/appointment for you to discuss details directly. You're always in control."
  },
  {
    category: 'features',
    question: "Do I need a website to use CoreSentia?",
    answer: "No! The SMS Responder ($499 setup) works perfectly without a website. You just get a dedicated business SMS number that responds automatically. The Professional Package ($2,500 setup) includes a website if you want one."
  },
  {
    category: 'features',
    question: "Can customers reach a real person if they want?",
    answer: "Absolutely. The AI can connect them with you directly. If someone says 'I want to speak to a person,' the AI will confirm and notify you immediately so you can reach out."
  },

  // Pricing
  {
    category: 'pricing',
    question: "What's the total cost?",
    answer: "SMS Responder: $499 setup + $150/month (inc. GST). Professional Package: $2,500 setup + $250/month (inc. GST). No hidden fees, no per-conversation charges, no surprise bills. Just predictable monthly hosting."
  },
  {
    category: 'pricing',
    question: "Are there any lock-in contracts?",
    answer: "No. Month-to-month billing. We keep you because it works, not because you're trapped. Cancel anytime with 30 days' notice."
  },
  {
    category: 'pricing',
    question: "What's included in the monthly fee?",
    answer: "Unlimited conversations, AI hosting, SMS sending/receiving (reasonable use), dashboard access, updates and improvements. The only extra cost would be if you want custom features or integrations beyond the standard package."
  },
  {
    category: 'pricing',
    question: "Is there a free trial?",
    answer: "Not currently, but we offer a low-risk pilot program for early customers. Get in touch to discuss."
  },
  {
    category: 'pricing',
    question: "Why is setup $499? What am I paying for?",
    answer: "Setup includes: Twilio business phone number provisioning, AI customization for your business (services, pricing, availability), system configuration, testing, and training. It's 'done for you' — you don't need to build anything."
  },

  // Technical
  {
    category: 'technical',
    question: "What technology powers CoreSentia?",
    answer: "We use Claude AI by Anthropic (the same technology powering Fortune 500 companies), Twilio for SMS infrastructure, and secure cloud hosting. Your data is encrypted and stored in Australia-compliant data centers."
  },
  {
    category: 'technical',
    question: "What if the AI makes a mistake?",
    answer: "Our AI is highly accurate, but it's smart enough to know when to escalate to you. For anything critical or uncertain, it will book an appointment for you to discuss details directly. You're always in control of final decisions."
  },
  {
    category: 'technical',
    question: "Can I customize what the AI says?",
    answer: "Yes! During setup, we customize the AI to match your business — your services, pricing, availability, tone of voice, etc. After launch, you can request adjustments anytime."
  },
  {
    category: 'technical',
    question: "Does it integrate with my calendar?",
    answer: "Currently, bookings appear in your CoreSentia dashboard. We're building Google Calendar and Outlook integration. For now, you can manually add bookings to your calendar or sync them."
  },
  {
    category: 'technical',
    question: "What if I already have a website?",
    answer: "We can add our web chat widget to your existing site, or you can stick with SMS Responder only. The Professional Package is for businesses who want a fresh, professional one-page site built by us."
  },
  {
    category: 'technical',
    question: "What happens if my phone number changes?",
    answer: "Your CoreSentia SMS number is separate from your personal phone. You can keep it forever, or port it to your own account later if you want full ownership."
  },

  // Business & Support
  {
    category: 'general',
    question: "Where is CoreSentia based?",
    answer: "We're Brisbane-based and Australian-owned (ABN: 69 267 271 132). We understand local businesses and work in your timezone."
  },
  {
    category: 'general',
    question: "What kind of support do I get?",
    answer: "Hands-on support during setup and the first few weeks. After that, email support for technical issues, and we're always available if you need help or adjustments."
  },
  {
    category: 'general',
    question: "What if I want to cancel?",
    answer: "Just give us 30 days' notice. No fees, no penalties. We'll help you transition if needed."
  },
  {
    category: 'general',
    question: "Can CoreSentia handle multiple staff or locations?",
    answer: "The standard package is for single-person/single-location businesses. If you need multiple calendars or locations, get in touch — we can discuss custom setups."
  }
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

  return (
    <div className="min-h-screen bg-white text-text-primary font-opensans">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-brand-navy text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Everything you need to know about CoreSentia
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  filterCategory === 'all'
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-text-primary hover:bg-gray-100'
                }`}
              >
                All Questions
              </button>
              <button
                onClick={() => setFilterCategory('general')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  filterCategory === 'general'
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-text-primary hover:bg-gray-100'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setFilterCategory('features')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  filterCategory === 'features'
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-text-primary hover:bg-gray-100'
                }`}
              >
                Features & Scope
              </button>
              <button
                onClick={() => setFilterCategory('pricing')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  filterCategory === 'pricing'
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-text-primary hover:bg-gray-100'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => setFilterCategory('technical')}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  filterCategory === 'technical'
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-text-primary hover:bg-gray-100'
                }`}
              >
                Technical
              </button>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-brand-orange transition"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-brand-navy pr-8">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-navy mb-6 font-montserrat">
              Still Have Questions?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Chat with our AI or reach out directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat/homepage-visitor"
                className="btn-primary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Chat With Us →
              </Link>
              <Link
                href="mailto:info@coresentia.com"
                className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Email Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
