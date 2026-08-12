'use client'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { getUtm, trackLead } from '../lib/track'

export default function CapabilityForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('/api/capability-request', {
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

      trackLead('capability', window.location.pathname)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-surface-card border border-line-soft rounded p-8 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          <Check className="w-5 h-5 text-accent-ink" />
          <h3 className="text-2xl font-medium text-ink-1 font-display">
            It&apos;s on its way.
          </h3>
        </div>
        <p className="text-lg text-ink-2 mb-4">
          The capability document is heading to your inbox now. If it hasn&apos;t
          arrived in a few minutes, check your spam folder.
        </p>
        <p className="text-sm text-ink-3">
          Or email us directly at{' '}
          <a href="mailto:info@coresentia.com.au" className="text-accent-ink font-medium">
            info@coresentia.com.au
          </a>{' '}
          and we&apos;ll send it over.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-card border border-line-soft rounded p-6 md:p-10"
    >
      <div className="mb-6">
        <label htmlFor="cap-name" className="btn block text-ink-1 mb-2">
          Your Name <span className="text-accent-ink">*</span>
        </label>
        <input
          type="text"
          id="cap-name"
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

      <div className="mb-6">
        <label htmlFor="cap-email" className="btn block text-ink-1 mb-2">
          Business Email <span className="text-accent-ink">*</span>
        </label>
        <input
          type="email"
          id="cap-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
            text-ink-1 placeholder-ink-3
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          placeholder="john@company.com.au"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="cap-company" className="btn block text-ink-1 mb-2">
          Company
        </label>
        <input
          type="text"
          id="cap-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm
            text-ink-1 placeholder-ink-3
            focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          placeholder="Company Pty Ltd"
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
          'Send me the document'
        )}
      </button>

      <p className="text-center text-sm text-ink-3 mt-4">
        The PDF lands in your inbox. No automated follow-ups, no list.
      </p>
    </form>
  )
}
