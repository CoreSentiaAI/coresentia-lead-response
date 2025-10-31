'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    abn: '',
    contactPerson: '',
    mobile: '',
    email: '',
    industryType: '',
    selectedPackage: 'SMS Responder',
    serviceCity: '',
    serviceState: '',
    serviceRadius: '',
    serviceNotes: '',
    currentPhone: '',
    phoneSetup: 'new',
    portNumber: '',
    goLiveDate: '',
    callTime: '',
    specialRequests: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Thank You! Form Submitted ✓</h1>
            <p className="text-lg text-text-secondary mb-8">
              We've received your onboarding information and will reach out within 24 hours to schedule your 15-minute setup call.
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
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Client Onboarding Form</h1>
          <p className="text-lg text-text-secondary mb-8">
            Welcome to CoreSentia! This form takes 5-7 minutes. We'll cover the detailed setup on our 15-minute call.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Business Basics */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Business Basics</h2>

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
                  placeholder="Leave blank if not applicable"
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
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Section 2: Package Selection */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Package Selection</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Which package did you purchase? *</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors has-[:checked]:border-brand-orange has-[:checked]:bg-orange-50">
                    <input
                      type="radio"
                      name="package"
                      value="SMS Responder"
                      checked={formData.selectedPackage === 'SMS Responder'}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                      required
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-text-primary text-lg">SMS Responder</div>
                      <div className="text-blue-900 font-medium">$999 setup + $150/month inc. GST</div>
                      <div className="text-sm text-gray-600 mt-1">AI SMS responder + lead capture system</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-orange transition-colors has-[:checked]:border-brand-orange has-[:checked]:bg-orange-50">
                    <input
                      type="radio"
                      name="package"
                      value="Professional Package"
                      checked={formData.selectedPackage === 'Professional Package'}
                      onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                      required
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-text-primary text-lg">Professional Package</div>
                      <div className="text-blue-900 font-medium">$2,500 setup + $250/month inc. GST</div>
                      <div className="text-sm text-gray-600 mt-1">SMS + Custom website + Advanced features</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 3: Service Coverage */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Service Coverage</h2>

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
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Any specific areas or restrictions? We'll discuss full details on your setup call."
                />
              </div>
            </div>

            {/* Section 4: Phone Setup */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Phone Setup</h2>

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

            {/* Section 5: Scheduling */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Scheduling</h2>

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
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Best Time for 15min Setup Call *</label>
                <select
                  required
                  value={formData.callTime}
                  onChange={(e) => setFormData({ ...formData, callTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select preferred time</option>
                  <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
                  <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
                  <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
                  <option value="Weekend">Weekend</option>
                </select>
              </div>
            </div>

            {/* Section 6: Quick Notes */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Additional Information</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Any Questions or Special Requests? (optional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="Let us know if you have any specific requirements or questions..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-12 py-4 bg-brand-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Onboarding Form'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
