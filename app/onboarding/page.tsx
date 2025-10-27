'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import { Building, User, Mail, Phone, MapPin, Clock, DollarSign, Briefcase, MessageSquare, Globe, Palette, CheckCircle } from 'lucide-react'

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    tradingName: '',
    abn: '',
    businessAddress: '',
    contactPerson: '',
    mobile: '',
    email: '',
    businessType: '',
    industryType: '',

    // Services Offered
    services: ['', '', '', '', ''],
    pricingStructure: '',
    typicalJobValue: '',
    pricingNotes: '',

    // Availability & Booking
    workingHours: {
      monday: { closed: true, open: '', close: '' },
      tuesday: { closed: true, open: '', close: '' },
      wednesday: { closed: true, open: '', close: '' },
      thursday: { closed: true, open: '', close: '' },
      friday: { closed: true, open: '', close: '' },
      saturday: { closed: true, open: '', close: '' },
      sunday: { closed: true, open: '', close: '' },
    },
    appointmentDuration: '',
    advanceBooking: '',

    // Service Area
    serviceAreas: '',
    travelRadius: '',
    travelCharges: '',

    // Communication Preferences
    aiPersonality: '',
    keyPhrases: '',
    mentions: [] as string[],
    thingsNotToSay: '',

    // Package Selection
    selectedPackage: '',

    // Professional Package Details (if applicable)
    preferredDomain: '',
    alternativeDomain: '',
    primaryColor: '',
    secondaryColor: '',
    hasLogo: '',
    tagline: '',
    about: '',
    hasPhotos: '',

    // Current Setup
    existingPhone: '',
    phonePreference: '',
    existingWebsite: '',

    // Setup Preferences
    preferredGoLive: '',
    bestTimeForCall: '',
    questions: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.services]
    newServices[index] = value
    setFormData({ ...formData, services: newServices })
  }

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    const updatedHours: any = { ...formData.workingHours }
    updatedHours[day] = {
      ...updatedHours[day],
      [field]: value
    }
    setFormData({
      ...formData,
      workingHours: updatedHours
    })
  }

  const handleMentionsChange = (mention: string) => {
    if (formData.mentions.includes(mention)) {
      setFormData({ ...formData, mentions: formData.mentions.filter(m => m !== mention) })
    } else {
      setFormData({ ...formData, mentions: [...formData.mentions, mention] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        alert('There was an error submitting your form. Please try again or email us at info@coresentia.com')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your form. Please try again or email us at info@coresentia.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-brand-navy mb-4 font-montserrat">
              Thank You! Form Submitted ✓
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              We've received your onboarding information. Our team will review it and reach out within 24 hours to confirm your setup details and timeline.
            </p>
            <p className="text-text-secondary mb-8">
              <strong>Next Steps:</strong><br />
              1. We'll review your information<br />
              2. Schedule a brief setup call (15-30 mins)<br />
              3. Build and customize your AI receptionist<br />
              4. Test together before going live<br />
              5. Launch! 🚀
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600 transition-all"
            >
              Back to Homepage
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-gradient-to-br from-brand-navy to-blue-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              Client Onboarding Form
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Welcome to CoreSentia! Please fill out this form so we can customize your AI Receptionist perfectly for your business.
            </p>
            <p className="text-white/90">
              ⏱️ Takes about 10-15 minutes to complete<br />
              📧 Questions? Email <a href="mailto:info@coresentia.com" className="underline">info@coresentia.com</a>
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 px-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">

            {/* Business Information */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <Building className="w-6 h-6 text-brand-orange" />
                Business Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="ABC Services Pty Ltd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Trading Name (if different)
                  </label>
                  <input
                    type="text"
                    value={formData.tradingName}
                    onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    ABN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.abn}
                    onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="12 345 678 901"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="0400 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="123 Main St, Brisbane QLD 4000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="sole-trader">Sole Trader</option>
                    <option value="partnership">Partnership</option>
                    <option value="company">Company</option>
                    <option value="trust">Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Industry/Service Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industryType}
                    onChange={(e) => setFormData({ ...formData, industryType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="e.g., Landscaping, Plumbing, Beauty Salon"
                  />
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-brand-orange" />
                Services Offered
              </h2>

              <div className="space-y-4 mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  List your main services (at least one required)
                </label>
                {[0, 1, 2, 3, 4].map((index) => (
                  <input
                    key={index}
                    type="text"
                    required={index === 0}
                    value={formData.services[index]}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder={`Service ${index + 1}${index === 0 ? ' (required)' : ''}`}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Pricing Structure <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.pricingStructure}
                    onChange={(e) => setFormData({ ...formData, pricingStructure: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="hourly">Hourly rate</option>
                    <option value="fixed">Fixed job pricing</option>
                    <option value="package">Package pricing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Typical Job Value <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.typicalJobValue}
                    onChange={(e) => setFormData({ ...formData, typicalJobValue: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="under-100">Under $100</option>
                    <option value="100-300">$100-$300</option>
                    <option value="300-500">$300-$500</option>
                    <option value="500-1000">$500-$1,000</option>
                    <option value="over-1000">Over $1,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Pricing Notes
                  </label>
                  <textarea
                    value={formData.pricingNotes}
                    onChange={(e) => setFormData({ ...formData, pricingNotes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none resize-none"
                    rows={3}
                    placeholder="e.g., Call-out fee $50, then $80/hour"
                  />
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-brand-orange" />
                Package Selection
              </h2>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Selected Package <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="package"
                      value="sms-responder"
                      required
                      checked={formData.selectedPackage === 'sms-responder'}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <strong className="text-brand-navy">SMS Responder</strong> - $999 setup + $150/month inc. GST
                      <p className="text-sm text-text-secondary mt-1">Dedicated business SMS number, AI responses, booking system, dashboard</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="package"
                      value="professional"
                      required
                      checked={formData.selectedPackage === 'professional'}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <strong className="text-brand-navy">Professional Package</strong> - $2,500 setup + $250/month inc. GST
                      <p className="text-sm text-text-secondary mt-1">All SMS Responder features PLUS professional website, web chat, custom domain, branding</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Professional Package Details - Only show if Professional selected */}
            {formData.selectedPackage === 'professional' && (
              <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
                <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-brand-orange" />
                  Website & Branding Details
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Preferred Domain <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={formData.selectedPackage === 'professional'}
                        value={formData.preferredDomain}
                        onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                        placeholder="yourname.com.au"
                      />
                      <p className="text-xs text-text-secondary mt-1">We'll check availability</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Alternative Domain
                      </label>
                      <input
                        type="text"
                        value={formData.alternativeDomain}
                        onChange={(e) => setFormData({ ...formData, alternativeDomain: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                        placeholder="backup.com.au"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Primary Brand Color <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={formData.selectedPackage === 'professional'}
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                        placeholder="e.g., Navy Blue, #1E3A5F"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Secondary Color
                      </label>
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                        placeholder="e.g., Orange, #FF6B35"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Logo <span className="text-red-500">*</span>
                    </label>
                    <select
                      required={formData.selectedPackage === 'professional'}
                      value={formData.hasLogo}
                      onChange={(e) => setFormData({ ...formData, hasLogo: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="have">I have a logo (will email to info@coresentia.com)</option>
                      <option value="need">I need help creating one (additional cost)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Tagline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={formData.selectedPackage === 'professional'}
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                      placeholder="e.g., Brisbane's Premier Landscaping Service"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      About/Bio (2-3 sentences) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required={formData.selectedPackage === 'professional'}
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none resize-none"
                      rows={4}
                      placeholder="Tell us about your business..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Photos <span className="text-red-500">*</span>
                    </label>
                    <select
                      required={formData.selectedPackage === 'professional'}
                      value={formData.hasPhotos}
                      onChange={(e) => setFormData({ ...formData, hasPhotos: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="professional">I have professional photos (will email them)</option>
                      <option value="work">I can provide work photos</option>
                      <option value="stock">Use stock photos (we'll select)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Communication Preferences */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-brand-orange" />
                AI Personality & Communication
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    AI Personality/Tone <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.aiPersonality}
                    onChange={(e) => setFormData({ ...formData, aiPersonality: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="professional">Professional & formal</option>
                    <option value="friendly">Friendly & casual</option>
                    <option value="tradie">Tradie/authentic Aussie</option>
                    <option value="match">Match our existing brand voice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Key phrases/messaging to include
                  </label>
                  <textarea
                    value={formData.keyPhrases}
                    onChange={(e) => setFormData({ ...formData, keyPhrases: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none resize-none"
                    rows={3}
                    placeholder='e.g., "We\'re fully insured", "Family-owned for 15 years"'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Information to mention (select all that apply)
                  </label>
                  <div className="space-y-2">
                    {['Insured', 'Licensed', 'ABN provided for tax invoices', 'Guarantee/warranty offered', 'Free quotes'].map((mention) => (
                      <label key={mention} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.mentions.includes(mention)}
                          onChange={() => handleMentionsChange(mention)}
                          className="w-4 h-4 text-brand-orange focus:ring-brand-orange"
                        />
                        <span className="text-text-primary">{mention}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Things AI should NOT say or promise
                  </label>
                  <textarea
                    value={formData.thingsNotToSay}
                    onChange={(e) => setFormData({ ...formData, thingsNotToSay: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none resize-none"
                    rows={3}
                    placeholder="e.g., Don't promise specific completion dates, don't give exact pricing without assessment"
                  />
                </div>
              </div>
            </div>

            {/* Setup Preferences */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-brand-orange" />
                Setup Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preferred Go-Live Date
                  </label>
                  <input
                    type="text"
                    value={formData.preferredGoLive}
                    onChange={(e) => setFormData({ ...formData, preferredGoLive: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                    placeholder="e.g., ASAP, Next Monday, Within 2 weeks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Best time for setup call
                  </label>
                  <select
                    value={formData.bestTimeForCall}
                    onChange={(e) => setFormData({ ...formData, bestTimeForCall: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="morning">Morning (9am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                    <option value="weekend">Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Questions or Special Requests
                  </label>
                  <textarea
                    value={formData.questions}
                    onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 focus:outline-none resize-none"
                    rows={4}
                    placeholder="Anything else we should know?"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="px-12 py-4 bg-brand-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 disabled:bg-gray-400 transition-all shadow-lg hover:shadow-xl"
              >
                {submitting ? 'Submitting...' : 'Submit Onboarding Form'}
              </button>
            </div>

            <p className="text-center text-sm text-text-secondary">
              By submitting this form, you confirm the information provided is accurate.
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}
