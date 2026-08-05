'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { getUtm, trackLead } from '../lib/track'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page: window.location.pathname,
          utm: getUtm(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to submit'
        throw new Error(errorMsg)
      }

      trackLead('contact', window.location.pathname)
      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        businessType: '',
        message: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-surface-card border border-line-soft rounded p-8 md:p-12 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Check className="w-5 h-5 text-accent-ink" />
          <h3 className="text-2xl font-medium text-ink-1 font-display">
            Message received.
          </h3>
        </div>
        <p className="text-lg text-ink-2 mb-4">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <p className="text-sm text-ink-3">
          Or email us directly at{' '}
          <a href="mailto:info@coresentia.com" className="text-accent-ink font-medium">
            info@coresentia.com
          </a>
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-accent-ink hover:text-ink-1 btn transition-colors"
        >
          Send another message &rarr;
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-card border border-line-soft rounded p-6 md:p-10 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="contact-name" className="btn block text-ink-1 mb-2">
            Your Name <span className="text-accent-ink">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
              text-ink-1 placeholder-ink-3
              focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="btn block text-ink-1 mb-2">
            Email Address <span className="text-accent-ink">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
              text-ink-1 placeholder-ink-3
              focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="contact-phone" className="btn block text-ink-1 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
              text-ink-1 placeholder-ink-3
              focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            placeholder="0412 XXX XXX"
          />
        </div>
        <div>
          <label htmlFor="contact-type" className="btn block text-ink-1 mb-2">
            Project Type
          </label>
          <select
            id="contact-type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
              text-ink-1
              focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          >
            <option value="">Select one...</option>
            <option value="Process Automation">Process Automation</option>
            <option value="Systems Integration">Systems Integration</option>
            <option value="SaaS Replacement">Replace Existing SaaS</option>
            <option value="Internal Platform">Internal Platform / Tooling</option>
            <option value="SaaS Application">SaaS Product</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="contact-message" className="btn block text-ink-1 mb-2">
          Tell us about your project
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
            text-ink-1 placeholder-ink-3
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
          placeholder="What are you looking to build? Any specific requirements or timeline?"
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn bg-accent text-[#0d0d0c] font-medium py-4 rounded-sm font-display
          hover:bg-[#4dc4e8] transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </button>

      <p className="text-center text-sm text-ink-3 mt-4">
        We&apos;ll respond within 24 hours. No spam, no hard sell.
      </p>
    </form>
  )
}
