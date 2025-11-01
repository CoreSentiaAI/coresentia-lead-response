// Calendar System Types
// Corresponds to database schema in 20251031_calendar_system.sql

export interface WorkingHours {
  mon: DaySchedule
  tue: DaySchedule
  wed: DaySchedule
  thu: DaySchedule
  fri: DaySchedule
  sat: DaySchedule
  sun: DaySchedule
}

export interface DaySchedule {
  start: string // "09:00"
  end: string // "17:00"
  enabled: boolean
}

export interface BusinessSettings {
  id: string
  business_id: string

  // Working Hours
  working_hours: WorkingHours

  // Travel Settings
  default_travel_buffer: number // minutes
  use_smart_travel: boolean
  travel_calculation_method: 'fixed' | 'distance' | 'maps_api'

  // Service Area
  service_area_suburbs: string[]
  max_travel_distance: number // km

  // Job Settings
  default_job_duration: number // minutes

  // Booking Settings
  min_notice_hours: number
  max_bookings_per_day: number

  created_at: string
  updated_at: string
}

export interface BlockedTime {
  id: string
  business_id?: string | null

  // Time Range
  start_time: string // ISO timestamp
  end_time: string // ISO timestamp

  // Details
  reason?: string
  notes?: string

  // Recurrence
  recurring: boolean
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly'
  recurrence_end_date?: string

  // Metadata
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  business_id?: string | null
  lead_id?: string

  // Customer Info
  customer_name: string
  customer_phone: string
  customer_email?: string

  // Booking Details
  service_type?: string
  scheduled_time: string // ISO timestamp
  job_duration: number // minutes

  // Location
  full_address?: string
  suburb?: string
  location_lat?: number
  location_lng?: number

  // Travel
  estimated_travel_time: number // minutes from previous job

  // Status
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'

  // Actual Times
  actual_start_time?: string
  actual_end_time?: string

  // Notes
  notes?: string

  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  business_id: string

  // Contact Info
  name?: string
  phone?: string
  email?: string

  // Conversation Tracking
  conversation_stage: 'intent' | 'address_collected' | 'time_selected' | 'booking_confirmed'
  address_only?: string
  proposed_times?: ProposedTime[]
  selected_time?: string

  // Messages
  message_history: any[]

  // Metadata
  source: 'sms' | 'web'
  status: string

  created_at: string
  updated_at: string
}

export interface ProposedTime {
  slot: string // ISO timestamp
  display: string // "2:00pm"
}

export interface AvailabilitySlot {
  start: string // ISO timestamp
  end: string // ISO timestamp
  available: boolean
  reason?: string // Why unavailable: 'booked', 'blocked', 'outside_hours'
}

export interface CalendarEvent {
  id: string
  type: 'booking' | 'blocked'
  start: Date
  end: Date
  title: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  customer_name?: string
  address?: string
  notes?: string
}

// API Request/Response Types

export interface CheckAvailabilityRequest {
  business_id: string
  date: string // YYYY-MM-DD
  address?: string // For travel time calculation
  duration?: number // Job duration in minutes
}

export interface CheckAvailabilityResponse {
  available_slots: AvailabilitySlot[]
  suggested_times: string[] // Top 3-5 suggestions in display format
}

export interface CreateBlockedTimeRequest {
  business_id: string
  start_time: string
  end_time: string
  reason?: string
  notes?: string
  recurring?: boolean
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly'
}

export interface UpdateBusinessSettingsRequest {
  business_id: string
  working_hours?: Partial<WorkingHours>
  default_travel_buffer?: number
  use_smart_travel?: boolean
  travel_calculation_method?: 'fixed' | 'distance' | 'maps_api'
  service_area_suburbs?: string[]
  default_job_duration?: number
  min_notice_hours?: number
}
