'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to submit'
        throw new Error(errorMsg)
      }

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
      <div className="bg-dark-bg-tertiary border border-green-500/30 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-dt-primary mb-3 font-raleway">
          Message Received!
        </h3>
        <p className="text-lg text-dt-secondary mb-4">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <p className="text-sm text-dt-tertiary">
          Or email us directly at{' '}
          <a href="mailto:info@coresentia.com" className="text-brand-accent font-semibold">
            info@coresentia.com
          </a>
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-2 text-brand-accent hover:text-brand-highlight font-semibold transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark-bg-tertiary border border-dark-border-light rounded-2xl p-6 md:p-10 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-dt-primary mb-2">
            Your Name <span className="text-brand-accent">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-bg-elevated border border-dark-border-light rounded-lg
              text-dt-primary placeholder-dt-tertiary
              focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-dt-primary mb-2">
            Email Address <span className="text-brand-accent">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark-bg-elevated border border-dark-border-light rounded-lg
              text-dt-primary placeholder-dt-tertiary
              focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-dt-primary mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-bg-elevated border border-dark-border-light rounded-lg
              text-dt-primary placeholder-dt-tertiary
              focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors"
            placeholder="0412 XXX XXX"
          />
        </div>
        <div>
          <label htmlFor="contact-type" className="block text-sm font-semibold text-dt-primary mb-2">
            Project Type
          </label>
          <select
            id="contact-type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-dark-bg-elevated border border-dark-border-light rounded-lg
              text-dt-primary
              focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors"
          >
            <option value="">Select one...</option>
            <option value="SaaS Application">SaaS Application</option>
            <option value="AI Automation">AI Automation</option>
            <option value="Internal Tool">Internal Tool</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="contact-message" className="block text-sm font-semibold text-dt-primary mb-2">
          Tell us about your project
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-dark-bg-elevated border border-dark-border-light rounded-lg
            text-dt-primary placeholder-dt-tertiary
            focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors resize-none"
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
        className="w-full bg-brand-highlight text-dark-bg-primary font-semibold py-4 rounded-full
          hover:shadow-lg hover:shadow-brand-highlight/30 hover:bg-[#4dc4e8] transition-all transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-2 text-lg relative overflow-hidden"
      >
        <span className="relative z-10">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </span>
        {!isSubmitting && <span className="shimmer-span"></span>}
      </button>

      <p className="text-center text-sm text-dt-tertiary mt-4">
        We&apos;ll respond within 24 hours. No spam, no hard sell.
      </p>
    </form>
  )
}
