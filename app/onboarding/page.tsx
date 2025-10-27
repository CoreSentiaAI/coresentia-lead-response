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
    selectedPackage: '',
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
        <main className="pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-brand-navy mb-4">Thank You! Form Submitted ✓</h1>
            <p className="text-lg text-text-secondary mb-8">
              We've received your onboarding information. Our team will review it and reach out within 24 hours.
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
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Client Onboarding Form</h1>
          <p className="text-lg text-text-secondary mb-8">
            Welcome to CoreSentia! Please fill out this form so we can customize your AI Receptionist.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Business Name *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="ABC Services Pty Ltd"
              />
            </div>

            {/* Other form fields - simplified for now */}
            <p className="text-sm text-text-secondary italic">
              This is a simplified onboarding form. The complete version with all fields is being deployed.
              For now, please email your full business details to info@coresentia.com
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-12 py-4 bg-brand-orange text-white text-lg font-bold rounded-full hover:bg-orange-600 disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Onboarding Form'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
