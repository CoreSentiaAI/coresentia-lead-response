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
    <div className="bg-black/80 backdrop-blur-xl border border-[#62D4F9]/30 rounded-2xl p-6 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-[#62D4F9]" />
            <label className="text-sm font-medium text-white">Name</label>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white 
                     placeholder-white/40 focus:border-[#62D4F9] focus:outline-none transition-all"
            placeholder="John Smith"
          />
          {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
        </div>

        {/* Company Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-[#62D4F9]" />
            <label className="text-sm font-medium text-white">Company</label>
          </div>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white 
                     placeholder-white/40 focus:border-[#62D4F9] focus:outline-none transition-all"
            placeholder="ABC Corp (optional)"
          />
        </div>

        {/* Email Field */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#62D4F9]" />
            <label className="text-sm font-medium text-white">Email</label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white 
                     placeholder-white/40 focus:border-[#62D4F9] focus:outline-none transition-all"
            placeholder="john@company.com"
          />
          {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
        </div>

        {/* Phone Field (optional) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-[#62D4F9]" />
            <label className="text-sm font-medium text-white">Phone</label>
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white 
                     placeholder-white/40 focus:border-[#62D4F9] focus:outline-none transition-all"
            placeholder="0400 000 000 (optional)"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#62D4F9] text-black font-bold rounded-lg 
                     hover:bg-[#40FFD9] transition-all hover:shadow-[0_0_20px_rgba(98,212,249,0.6)]"
          >
            {formType === 'quote' ? 'Get My Quote' : 
             formType === 'meeting' ? 'Book Meeting' : 'Submit'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-black/50 border border-white/20 text-white rounded-lg 
                       hover:border-white/40 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
