'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

export default function QuoteForm() {
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
    // Clear error when user starts typing
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
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error || 'Failed to submit quote request'
        throw new Error(errorMsg)
      }

      // Success!
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
      <div className="bg-white border-2 border-green-500 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy mb-3 font-montserrat">
          Quote Request Received!
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Thanks for your interest! We'll review your request and get back to you within 24 hours.
        </p>
        <p className="text-sm text-gray-600">
          Check your email for confirmation, or call us on{' '}
          <a href="tel:+61489087491" className="text-brand-accent font-semibold">
            +61 489 087 491
          </a>
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-2 text-brand-accent hover:text-brand-accent-hover font-semibold"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 max-w-2xl mx-auto shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-navy mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-accent focus:outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-accent focus:outline-none transition-colors"
            placeholder="0412 XXX XXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-accent focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Business Type */}
        <div>
          <label htmlFor="businessType" className="block text-sm font-semibold text-brand-navy mb-2">
            Business Type
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-accent focus:outline-none transition-colors bg-white"
          >
            <option value="">Select one...</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Hairdressing">Hairdressing / Beauty</option>
            <option value="Mobile Mechanic">Mobile Mechanic</option>
            <option value="Handyman">Handyman</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Pet Services">Pet Services / Grooming</option>
            <option value="Other">Other Service Business</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-semibold text-brand-navy mb-2">
          Tell us about your needs (optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-accent focus:outline-none transition-colors resize-none"
          placeholder="What services do you offer? What are your pain points with lead capture?"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-accent text-white font-semibold py-4 rounded-full
          hover:bg-brand-accent-hover transition-all transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-2 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request a Quote'
        )}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        We'll respond within 24 hours. No spam, no hard sell.
      </p>
    </form>
  )
}
