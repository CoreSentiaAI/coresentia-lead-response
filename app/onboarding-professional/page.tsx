'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Shield, DollarSign, Clock, Users, Upload, Palette, Globe } from 'lucide-react';
import Header from '../components/Header';

export default function ProfessionalOnboardingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    abn: '',
    contactPerson: '',
    mobile: '',
    email: '',
    industryType: '',

    // Service Coverage
    serviceCity: '',
    serviceState: '',
    serviceRadius: '',
    serviceNotes: '',

    // Phone Setup
    currentPhone: '',
    phoneSetup: 'new',
    portNumber: '',

    // PROFESSIONAL PACKAGE SPECIFIC
    // Branding
    hasLogo: 'no',
    logoNotes: '',
    hasBrandColors: 'no',
    primaryColor: '',
    secondaryColor: '',
    accentColor: '',
    designStyle: '',
    designInspiration: '',

    // Domain & Website
    preferredDomain: '',
    ownsDomain: 'no',
    domainRegistrar: '',
    alternativeDomains: '',
    websiteTagline: '',
    websiteSubheadline: '',
    aboutBusiness: '',
    yearsInBusiness: '',
    qualifications: '',

    // Visual Content
    hasPhotos: 'no',
    useStockPhotos: 'yes',
    photoNotes: '',
    facebookUrl: '',
    instagramHandle: '',
    googleBusinessUrl: '',
    linkedinUrl: '',
    otherSocial: '',

    // Services & Pricing
    servicesList: '',
    pricingDisplay: 'from',
    currentPromotions: '',

    // Technical
    existingBookingSystem: '',
    calendarSystem: 'none',
    crmSystem: '',
    emailHosting: 'new',

    // Scheduling
    goLiveDate: '',
    specialRequests: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/onboarding-professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedPackage: 'Professional Package'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('There was an error submitting your form. Please try again or email us at info@coresentia.com');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your form. Please try again or email us at info@coresentia.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-40 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-brand-navy mb-4">Thank You! Form Submitted</h1>
            <p className="text-lg text-text-secondary mb-4">
              We've received your Professional Package onboarding information.
            </p>
            <p className="text-base text-text-secondary mb-8">
              We'll review your details and reach out within 24 hours to discuss your website design and branding.
              Your build will begin immediately after our brief setup chat.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              <strong>Timeline:</strong> 10 working days from today
            </p>
            <Link href="/" className="inline-block px-8 py-4 bg-brand-orange text-white font-bold rounded-full hover:bg-orange-600">
              Back to Homepage
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-brand-orange text-white rounded-full text-sm font-semibold mb-4">
              Professional Package
            </div>
            <h1 className="text-4xl text-brand-navy mb-4">Professional Package Onboarding</h1>
            <p className="text-lg text-text-secondary mb-2">
              Welcome to CoreSentia! This form helps us build your custom website and SMS Lead Capture system.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Timeline:</strong> 10 working days | <strong>Deliverables:</strong> Custom 4-page website + SMS Bot + Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Business Basics */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Business Basics</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="ABC Services Pty Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">ABN (optional)</label>
                <input
                  type="text"
                  value={formData.abn}
                  onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="12 345 678 901"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="0400 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="john@abcservices.com.au"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Industry Type *</label>
                <select
                  required
                  value={formData.industryType}
                  onChange={(e) => setFormData({ ...formData, industryType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  <option value="Trades & Construction">Trades & Construction</option>
                  <option value="Beauty & Salon Services">Beauty & Salon Services</option>
                  <option value="Mobile Services">Mobile Services</option>
                  <option value="Cleaning Services">Cleaning Services</option>
                  <option value="Pet Services">Pet Services</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Years in Business (optional)</label>
                <input
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="e.g. 5"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Qualifications / Certifications (optional)</label>
                <textarea
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="e.g. Licensed electrician, Cert III in Hairdressing, etc."
                />
              </div>
            </div>

            {/* Section 2: Branding & Design */}
            <div className="bg-orange-50 border-2 border-brand-orange p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-6 h-6 text-brand-orange" />
                <h2 className="text-xl text-brand-navy">Branding & Design</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Do you have a professional logo? *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasLogo"
                      value="yes"
                      checked={formData.hasLogo === 'yes'}
                      onChange={(e) => setFormData({ ...formData, hasLogo: e.target.value })}
                      required
                    />
                    <span>Yes, I have a logo (I'll email files separately)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasLogo"
                      value="no"
                      checked={formData.hasLogo === 'no'}
                      onChange={(e) => setFormData({ ...formData, hasLogo: e.target.value })}
                      required
                    />
                    <span>No, please create one for me (included in package, 1 revision)</span>
                  </label>
                </div>
              </div>

              {formData.hasLogo === 'yes' && (
                <div className="bg-white p-4 rounded border border-gray-200">
                  <label className="block text-sm font-medium text-text-primary mb-2">Logo Notes (optional)</label>
                  <textarea
                    value={formData.logoNotes}
                    onChange={(e) => setFormData({ ...formData, logoNotes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Any specific instructions about logo usage, variations available, etc."
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    <Upload className="w-4 h-4 inline-block mr-1" />
                    Please email logo files (PNG, SVG, AI) to info@coresentia.com with subject "Logo - {formData.businessName || 'Your Business'}"
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Do you have brand colors/style guide? *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasBrandColors"
                      value="yes"
                      checked={formData.hasBrandColors === 'yes'}
                      onChange={(e) => setFormData({ ...formData, hasBrandColors: e.target.value })}
                      required
                    />
                    <span>Yes, I have specific brand colors</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasBrandColors"
                      value="no"
                      checked={formData.hasBrandColors === 'no'}
                      onChange={(e) => setFormData({ ...formData, hasBrandColors: e.target.value })}
                      required
                    />
                    <span>No, please create a color palette for me (included)</span>
                  </label>
                </div>
              </div>

              {formData.hasBrandColors === 'yes' && (
                <div className="bg-white p-4 rounded border border-gray-200 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Primary Color</label>
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="#FF6B35 or 'Navy Blue'"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Secondary Color (optional)</label>
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="#1E3A5F or 'Light Gray'"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Accent Color (optional)</label>
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="#8FBC8F or 'Sage Green'"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Design Style Preference *</label>
                <select
                  required
                  value={formData.designStyle}
                  onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select design style</option>
                  <option value="modern">Modern & Minimal</option>
                  <option value="bold">Bold & Vibrant</option>
                  <option value="professional">Classic & Professional</option>
                  <option value="tradie">Tradie/Industrial</option>
                  <option value="elegant">Elegant & Refined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Design Inspiration (optional)</label>
                <textarea
                  value={formData.designInspiration}
                  onChange={(e) => setFormData({ ...formData, designInspiration: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Share any website URLs you like, competitor sites for reference, or describe the look you want..."
                />
              </div>
            </div>

            {/* Section 3: Domain & Website Content */}
            <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl text-brand-navy">Domain & Website Content</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Preferred Domain Name *</label>
                <input
                  type="text"
                  required
                  value={formData.preferredDomain}
                  onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="yourbusiness.com.au"
                />
                <p className="text-sm text-gray-600 mt-1">1 year domain registration included in package</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Do you already own this domain? *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="ownsDomain"
                      value="yes"
                      checked={formData.ownsDomain === 'yes'}
                      onChange={(e) => setFormData({ ...formData, ownsDomain: e.target.value })}
                      required
                    />
                    <span>Yes (we'll need DNS access)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="ownsDomain"
                      value="no"
                      checked={formData.ownsDomain === 'no'}
                      onChange={(e) => setFormData({ ...formData, ownsDomain: e.target.value })}
                      required
                    />
                    <span>No, please register it for me</span>
                  </label>
                </div>
              </div>

              {formData.ownsDomain === 'yes' && (
                <div className="bg-white p-4 rounded border border-gray-200">
                  <label className="block text-sm font-medium text-text-primary mb-2">Domain Registrar (optional)</label>
                  <input
                    type="text"
                    value={formData.domainRegistrar}
                    onChange={(e) => setFormData({ ...formData, domainRegistrar: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="e.g. GoDaddy, Namecheap, Ventraip"
                  />
                  <p className="text-sm text-gray-600 mt-2">We'll contact you about DNS access</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Alternative Domain Options (optional)</label>
                <input
                  type="text"
                  value={formData.alternativeDomains}
                  onChange={(e) => setFormData({ ...formData, alternativeDomains: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="backup1.com.au, backup2.com.au"
                />
                <p className="text-sm text-gray-600 mt-1">In case your preferred domain is unavailable</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Website Headline/Tagline *</label>
                <input
                  type="text"
                  required
                  value={formData.websiteTagline}
                  onChange={(e) => setFormData({ ...formData, websiteTagline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="e.g. Brisbane's Best Mobile Mechanic"
                />
                <p className="text-sm text-gray-600 mt-1">Main headline visitors see first</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Subheadline (optional)</label>
                <input
                  type="text"
                  value={formData.websiteSubheadline}
                  onChange={(e) => setFormData({ ...formData, websiteSubheadline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="e.g. Professional automotive repairs at your location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">About Your Business *</label>
                <textarea
                  required
                  value={formData.aboutBusiness}
                  onChange={(e) => setFormData({ ...formData, aboutBusiness: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Brief description of your business, what makes you different, why customers should choose you (2-3 sentences)"
                />
              </div>
            </div>

            {/* Section 4: Visual Content & Social Media */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Photos & Social Media</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Do you have professional business photos? *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasPhotos"
                      value="yes"
                      checked={formData.hasPhotos === 'yes'}
                      onChange={(e) => setFormData({ ...formData, hasPhotos: e.target.value })}
                      required
                    />
                    <span>Yes (I'll email them separately)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="hasPhotos"
                      value="no"
                      checked={formData.hasPhotos === 'no'}
                      onChange={(e) => setFormData({ ...formData, hasPhotos: e.target.value })}
                      required
                    />
                    <span>No, I need help with photos</span>
                  </label>
                </div>
              </div>

              {formData.hasPhotos === 'yes' && (
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <Upload className="w-4 h-4 inline-block mr-1" />
                    Please email 3-5 high-quality photos to info@coresentia.com with subject "Photos - {formData.businessName || 'Your Business'}"
                  </p>
                </div>
              )}

              {formData.hasPhotos === 'no' && (
                <div className="bg-white p-4 rounded border border-gray-200 space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.useStockPhotos === 'yes'}
                      onChange={(e) => setFormData({ ...formData, useStockPhotos: e.target.checked ? 'yes' : 'no' })}
                    />
                    <span className="text-sm">Use stock photos (we'll source relevant industry images)</span>
                  </label>
                  <textarea
                    value={formData.photoNotes}
                    onChange={(e) => setFormData({ ...formData, photoNotes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Any specific photo requirements or ideas?"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Facebook Page URL</label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="https://facebook.com/yourbusiness"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Instagram Handle</label>
                  <input
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="@yourbusiness"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Google My Business URL</label>
                <input
                  type="url"
                  value={formData.googleBusinessUrl}
                  onChange={(e) => setFormData({ ...formData, googleBusinessUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="https://g.page/yourbusiness"
                />
              </div>
            </div>

            {/* Section 5: Services & Pricing */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Services & Pricing</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Your Services *</label>
                <textarea
                  required
                  value={formData.servicesList}
                  onChange={(e) => setFormData({ ...formData, servicesList: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="List your services with brief descriptions and typical prices. Example:&#10;&#10;Lawn Mowing - from $50&#10;Hedge Trimming - from $80&#10;Garden Cleanup - from $120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">How should we display pricing on your website? *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="pricingDisplay"
                      value="exact"
                      checked={formData.pricingDisplay === 'exact'}
                      onChange={(e) => setFormData({ ...formData, pricingDisplay: e.target.value })}
                      required
                    />
                    <span>Show exact prices</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="pricingDisplay"
                      value="from"
                      checked={formData.pricingDisplay === 'from'}
                      onChange={(e) => setFormData({ ...formData, pricingDisplay: e.target.value })}
                      required
                    />
                    <span>Show "from $X" pricing (recommended)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="pricingDisplay"
                      value="quote"
                      checked={formData.pricingDisplay === 'quote'}
                      onChange={(e) => setFormData({ ...formData, pricingDisplay: e.target.value })}
                      required
                    />
                    <span>"Get a Quote" only</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Current Promotions (optional)</label>
                <textarea
                  value={formData.currentPromotions}
                  onChange={(e) => setFormData({ ...formData, currentPromotions: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="e.g. 10% off first service, Free quote for new customers"
                />
              </div>
            </div>

            {/* Section 6: Service Coverage */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Service Coverage</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Your Business Location (City/Suburb) *</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceCity}
                    onChange={(e) => setFormData({ ...formData, serviceCity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Brisbane, Gold Coast, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">State *</label>
                  <select
                    required
                    value={formData.serviceState}
                    onChange={(e) => setFormData({ ...formData, serviceState: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    <option value="QLD">QLD</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="SA">SA</option>
                    <option value="WA">WA</option>
                    <option value="TAS">TAS</option>
                    <option value="NT">NT</option>
                    <option value="ACT">ACT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Service Radius *</label>
                <select
                  required
                  value={formData.serviceRadius}
                  onChange={(e) => setFormData({ ...formData, serviceRadius: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select service radius</option>
                  <option value="Local (10-20km)">Local area (10-20km)</option>
                  <option value="Metro-wide">Metro-wide</option>
                  <option value="Regional">Regional</option>
                  <option value="State-wide">State-wide</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Notes about service area (optional)</label>
                <textarea
                  value={formData.serviceNotes}
                  onChange={(e) => setFormData({ ...formData, serviceNotes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Any specific areas or restrictions?"
                />
              </div>
            </div>

            {/* Section 7: Phone Setup */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Phone Setup</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Your Current Business Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.currentPhone}
                  onChange={(e) => setFormData({ ...formData, currentPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="0400 123 456"
                />
                <p className="text-sm text-gray-600 mt-1">For reference - you'll keep this number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Phone Number Setup *</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="phoneSetup"
                      value="new"
                      checked={formData.phoneSetup === 'new'}
                      onChange={(e) => setFormData({ ...formData, phoneSetup: e.target.value, portNumber: '' })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-text-primary">Provide me a new CoreSentia number</div>
                      <div className="text-sm text-gray-600">Recommended - fastest setup (1-2 business days)</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="radio"
                      name="phoneSetup"
                      value="port"
                      checked={formData.phoneSetup === 'port'}
                      onChange={(e) => setFormData({ ...formData, phoneSetup: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary mb-2">I want to port my existing number</div>
                      <input
                        type="tel"
                        disabled={formData.phoneSetup !== 'port'}
                        value={formData.portNumber}
                        onChange={(e) => setFormData({ ...formData, portNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="Number to port"
                      />
                      <div className="text-sm text-gray-600 mt-1">Longer setup time (5-10 business days)</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 8: Scheduling */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Scheduling</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Preferred Go-Live Date *</label>
                <input
                  type="date"
                  required
                  value={formData.goLiveDate}
                  onChange={(e) => setFormData({ ...formData, goLiveDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
                <p className="text-sm text-gray-600 mt-1">Timeline: 10 working days from form submission</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Want to chat? Book a quick call here</label>
                <a
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1XDaFnc1qnZbDeD4UqpMuVZR28pwX8dK2XkbqXFvwcvBMdnxP_OYILDwPGvMHKkzsA1SeAOQ9s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-4 py-3 border-2 border-brand-accent text-brand-accent font-semibold rounded-lg hover:bg-brand-accent hover:text-white transition-all text-center"
                >
                  <Calendar className="w-4 h-4 inline-block mr-2" />Schedule a Call (Optional)
                </a>
              </div>
            </div>

            {/* Section 9: Additional Information */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl text-brand-navy mb-4">Additional Information</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Any Questions or Special Requests? (optional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Let us know if you have any specific requirements, questions, or concerns..."
                />
              </div>
            </div>

            {/* Terms Disclaimer */}
            <div className="text-center text-sm text-text-secondary">
              <p>
                By clicking submit you agree to the{' '}
                <Link href="/terms" className="text-brand-accent hover:text-brand-accent-hover underline">
                  Terms and Conditions
                </Link>
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-12 py-4 bg-brand-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Professional Package Form'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#E5E7EB' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Solutions</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="/#packages" className="hover:text-brand-accent transition-colors">SMS Responder</a></li>
                <li><a href="/#packages" className="hover:text-brand-accent transition-colors">Professional Package</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Company</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><Link href="/about" className="hover:text-brand-accent transition-colors">About</Link></li>
                <li><Link href="/faq" className="hover:text-brand-accent transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-brand-accent transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Industries</h4>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="/#" className="hover:text-brand-accent transition-colors">Trades & Contractors</a></li>
                <li><a href="/#" className="hover:text-brand-accent transition-colors">Beauty & Salons</a></li>
                <li><a href="/#" className="hover:text-brand-accent transition-colors">Mobile Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-montserrat text-brand-primary">Connect</h4>
              <p className="text-text-secondary mb-4">Brisbane, Australia</p>
              <Link
                href="mailto:info@coresentia.com"
                className="text-brand-accent hover:text-brand-accent-hover transition-colors"
              >
                info@coresentia.com
              </Link>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-text-secondary mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-accent" />
                <span>Australian data residency</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-brand-accent" />
                <span>No per-conversation fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-accent" />
                <span>24hr response SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-accent" />
                <span>Brisbane-based support</span>
              </div>
            </div>

            <div className="text-center text-text-secondary">
              <p className="font-montserrat">&copy; 2025 CoreSentia. Never miss a lead again.</p>
              <p className="text-sm mt-2">ABN: 69 267 271 132</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

