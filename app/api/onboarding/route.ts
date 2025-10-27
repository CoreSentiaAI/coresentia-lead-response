import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Save to database
    const { data: onboarding, error } = await supabase
      .from('client_onboarding')
      .insert({
        // Business Information
        business_name: formData.businessName,
        trading_name: formData.tradingName,
        abn: formData.abn,
        business_address: formData.businessAddress,
        contact_person: formData.contactPerson,
        mobile: formData.mobile,
        email: formData.email,
        business_type: formData.businessType,
        industry_type: formData.industryType,

        // Services
        services: formData.services.filter((s: string) => s.trim() !== ''),
        pricing_structure: formData.pricingStructure,
        typical_job_value: formData.typicalJobValue,
        pricing_notes: formData.pricingNotes,

        // Working Hours
        working_hours: formData.workingHours,
        appointment_duration: formData.appointmentDuration,
        advance_booking: formData.advanceBooking,

        // Service Area
        service_areas: formData.serviceAreas,
        travel_radius: formData.travelRadius,
        travel_charges: formData.travelCharges,

        // Communication
        ai_personality: formData.aiPersonality,
        key_phrases: formData.keyPhrases,
        mentions: formData.mentions,
        things_not_to_say: formData.thingsNotToSay,

        // Package
        selected_package: formData.selectedPackage,

        // Professional Package Details
        preferred_domain: formData.preferredDomain,
        alternative_domain: formData.alternativeDomain,
        primary_color: formData.primaryColor,
        secondary_color: formData.secondaryColor,
        has_logo: formData.hasLogo,
        tagline: formData.tagline,
        about: formData.about,
        has_photos: formData.hasPhotos,

        // Current Setup
        existing_phone: formData.existingPhone,
        phone_preference: formData.phonePreference,
        existing_website: formData.existingWebsite,

        // Setup Preferences
        preferred_go_live: formData.preferredGoLive,
        best_time_for_call: formData.bestTimeForCall,
        questions: formData.questions,

        // Status
        status: 'submitted',
        created_at: new Date().toISOString()
      })
      .select('*')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save form data' },
        { status: 500 }
      )
    }

    // TODO: Send notification to admin
    // You could integrate with your existing notification system here

    return NextResponse.json({
      success: true,
      onboardingId: onboarding?.id
    })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
