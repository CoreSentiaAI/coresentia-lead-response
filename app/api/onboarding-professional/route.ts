import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Create Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into client_onboarding_professional table
    const { data, error } = await supabase
      .from('client_onboarding_professional')
      .insert([
        {
          // Basic Info
          business_name: formData.businessName,
          abn: formData.abn || null,
          contact_person: formData.contactPerson,
          mobile: formData.mobile,
          email: formData.email,
          industry_type: formData.industryType,
          years_in_business: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : null,
          qualifications: formData.qualifications || null,

          // Package
          selected_package: 'Professional Package',

          // Branding & Design
          has_logo: formData.hasLogo === 'yes',
          logo_notes: formData.logoNotes || null,
          has_brand_colors: formData.hasBrandColors === 'yes',
          primary_color: formData.primaryColor || null,
          secondary_color: formData.secondaryColor || null,
          accent_color: formData.accentColor || null,
          design_style: formData.designStyle,
          design_inspiration: formData.designInspiration || null,

          // Domain & Website
          preferred_domain: formData.preferredDomain,
          owns_domain: formData.ownsDomain === 'yes',
          domain_registrar: formData.domainRegistrar || null,
          alternative_domains: formData.alternativeDomains || null,
          website_tagline: formData.websiteTagline,
          website_subheadline: formData.websiteSubheadline || null,
          about_business: formData.aboutBusiness,

          // Visual Content & Social
          has_photos: formData.hasPhotos === 'yes',
          use_stock_photos: formData.useStockPhotos === 'yes',
          photo_notes: formData.photoNotes || null,
          facebook_url: formData.facebookUrl || null,
          instagram_handle: formData.instagramHandle || null,
          google_business_url: formData.googleBusinessUrl || null,
          linkedin_url: formData.linkedinUrl || null,
          other_social: formData.otherSocial || null,

          // Services & Pricing
          services_list: formData.servicesList,
          pricing_display: formData.pricingDisplay,
          current_promotions: formData.currentPromotions || null,

          // Service Coverage
          service_city: formData.serviceCity,
          service_state: formData.serviceState,
          service_radius: formData.serviceRadius,
          service_notes: formData.serviceNotes || null,

          // Phone Setup
          current_phone: formData.currentPhone,
          phone_setup: formData.phoneSetup,
          port_number: formData.portNumber || null,

          // Technical
          existing_booking_system: formData.existingBookingSystem || null,
          calendar_system: formData.calendarSystem || 'none',
          crm_system: formData.crmSystem || null,
          email_hosting: formData.emailHosting || 'new',

          // Scheduling
          go_live_date: formData.goLiveDate,
          special_requests: formData.specialRequests || null,

          // Metadata
          submitted_at: new Date().toISOString(),
          status: 'submitted'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log('Professional Package onboarding submitted:', data);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to client

    return NextResponse.json({
      success: true,
      message: 'Professional Package onboarding submitted successfully',
      data: data
    });

  } catch (error) {
    console.error('Error processing Professional Package onboarding:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process onboarding form' },
      { status: 500 }
    );
  }
}
