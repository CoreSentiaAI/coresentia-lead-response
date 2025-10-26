'use client'

import { useState } from 'react'
import { User, Building, Mail, Phone } from 'lucide-react'

interface InlineChatFormProps {
  formType: 'quote' | 'meeting' | 'general'
  onSubmit: (data: any) => void
  onCancel?: () => void
}

export default function InlineChatForm({ formType, onSubmit, onCancel }: InlineChatFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  })
  
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white border-2 border-brand-navy/20 rounded-2xl p-6 w-full max-w-md shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-brand-navy" />
            <label className="text-sm font-medium text-text-primary">Name</label>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-text-primary
                     placeholder-text-secondary focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all"
            placeholder="John Smith"
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
        </div>

        {/* Company Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-brand-navy" />
            <label className="text-sm font-medium text-text-primary">Company</label>
          </div>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-text-primary
                     placeholder-text-secondary focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all"
            placeholder="ABC Corp (optional)"
          />
        </div>

        {/* Email Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-brand-navy" />
            <label className="text-sm font-medium text-text-primary">Email</label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-text-primary
                     placeholder-text-secondary focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all"
            placeholder="john@company.com"
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
        </div>

        {/* Phone Field (optional) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-brand-navy" />
            <label className="text-sm font-medium text-text-primary">Phone</label>
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-text-primary
                     placeholder-text-secondary focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none transition-all"
            placeholder="0400 000 000 (optional)"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-brand-orange text-white font-bold rounded-lg
                     hover:bg-brand-orange/90 transition-all shadow-md hover:shadow-lg"
          >
            {formType === 'quote' ? 'Get My Quote' :
             formType === 'meeting' ? 'Book Meeting' : 'Submit'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-text-primary rounded-lg
                       hover:border-brand-navy transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
