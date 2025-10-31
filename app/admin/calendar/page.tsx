'use client'

import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Plus, Settings } from 'lucide-react'
import CalendarView from '@/app/components/CalendarView'
import type { Booking as CalendarBooking, BlockedTime, CalendarEvent } from '@/types/calendar'

// Test business ID for admin testing
const TEST_BUSINESS_ID = 'admin-test-business'

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddBooking, setShowAddBooking] = useState(false)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch bookings
      const bookingsRes = await fetch(`/api/bookings?businessId=${TEST_BUSINESS_ID}`)
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setBookings(bookingsData.bookings || [])
      }

      // Fetch blocked times
      const blockedRes = await fetch(`/api/blocked-times?businessId=${TEST_BUSINESS_ID}`)
      if (blockedRes.ok) {
        const blockedData = await blockedRes.json()
        setBlockedTimes(blockedData.blockedTimes || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSlot = async (slotInfo: { start: Date; end: Date }) => {
    const reason = prompt('Reason for blocking this time?')
    if (!reason) return

    try {
      const response = await fetch('/api/blocked-times', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: TEST_BUSINESS_ID,
          start_time: slotInfo.start.toISOString(),
          end_time: slotInfo.end.toISOString(),
          reason: reason,
        })
      })

      if (response.ok) {
        alert('Time blocked successfully!')
        fetchData()
      } else {
        alert('Failed to block time')
      }
    } catch (error) {
      console.error('Error blocking time:', error)
      alert('Failed to block time')
    }
  }

  const handleSelectEvent = (event: CalendarEvent) => {
    console.log('Selected event:', event)
  }

  const createTestBooking = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: TEST_BUSINESS_ID,
          customer_name: 'Test Customer',
          customer_email: 'test@example.com',
          customer_phone: '0400 000 000',
          service: 'Lawn Mowing',
          date_time: tomorrow.toISOString(),
          notes: 'Test booking from admin',
          status: 'confirmed',
        })
      })

      if (response.ok) {
        alert('Test booking created!')
        fetchData()
      } else {
        alert('Failed to create test booking')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create test booking')
    }
  }

  // Convert bookings to calendar format
  const calendarBookings: CalendarBooking[] = bookings.map(booking => ({
    id: booking.id,
    business_id: TEST_BUSINESS_ID,
    customer_name: booking.customer_name,
    customer_phone: booking.customer_phone,
    customer_email: booking.customer_email,
    service_type: booking.service,
    scheduled_time: booking.scheduled_time || booking.date_time,
    job_duration: booking.job_duration || 60,
    full_address: booking.full_address,
    suburb: '',
    estimated_travel_time: 0,
    status: booking.status,
    notes: booking.notes,
    created_at: booking.created_at,
    updated_at: booking.created_at,
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading calendar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: '#1E3A5F' }} className="text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Admin Calendar Dashboard</h1>
              <p className="text-white/80 text-sm">Test and manage the calendar system</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={createTestBooking}
                className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Test Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          <div>
            <p className="text-2xl font-bold text-brand-navy">{bookings.length}</p>
            <p className="text-xs text-text-secondary">Total Bookings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p className="text-xs text-text-secondary">Confirmed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
            <p className="text-xs text-text-secondary">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">{blockedTimes.length}</p>
            <p className="text-xs text-text-secondary">Blocked Times</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Admin Dashboard:</strong> Testing business ID: <code className="bg-blue-100 px-2 py-1 rounded">{TEST_BUSINESS_ID}</code>
            {' '}- Click empty slots to block time, click events to view details, or add test bookings using the button above.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6 h-[calc(100vh-250px)]">
        <CalendarView
          businessId={TEST_BUSINESS_ID}
          bookings={calendarBookings}
          blockedTimes={blockedTimes}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  )
}
