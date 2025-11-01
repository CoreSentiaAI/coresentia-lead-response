'use client'

import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react'
import Header from '@/app/components/Header'
import CalendarView from '@/app/components/CalendarView'
import type { Booking as CalendarBooking, BlockedTime, CalendarEvent } from '@/types/calendar'

// Business ID for admin calendar
const BUSINESS_ID = 'admin-business'

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddBooking, setShowAddBooking] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    dateTime: '',
    notes: ''
  })

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch bookings
      const bookingsRes = await fetch(`/api/bookings?businessId=${BUSINESS_ID}`)
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setBookings(bookingsData.bookings || [])
      }

      // Fetch blocked times
      const blockedRes = await fetch(`/api/blocked-times?businessId=${BUSINESS_ID}`)
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
          business_id: BUSINESS_ID,
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

  const createBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerName || !formData.customerEmail || !formData.dateTime) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: `admin-${Date.now()}`, // Generate unique lead ID
          businessId: BUSINESS_ID,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          service: formData.service || 'General Service',
          dateTime: formData.dateTime,
          notes: formData.notes,
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('Booking created successfully!')
        setShowAddBooking(false)
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          service: '',
          dateTime: '',
          notes: ''
        })
        fetchData()
      } else {
        alert(`Failed to create booking: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking')
    }
  }

  // Convert bookings to calendar format
  const calendarBookings: CalendarBooking[] = bookings.map(booking => ({
    id: booking.id,
    business_id: BUSINESS_ID,
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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 bg-gray-50 min-h-screen">
        {/* Page Title */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-brand-navy mb-1 font-montserrat">Admin Calendar Dashboard</h1>
                <p className="text-text-secondary text-sm">Manage bookings and availability</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddBooking(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg font-medium hover:bg-brand-accent-hover transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create booking
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

        {/* Calendar */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: 'calc(100vh - 350px)' }}>
            <CalendarView
              businessId={BUSINESS_ID}
              bookings={calendarBookings}
              blockedTimes={blockedTimes}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>

        {/* Create Booking Modal */}
        {showAddBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-brand-navy">Create Booking</h2>
                  <button
                    onClick={() => setShowAddBooking(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={createBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="0400 000 000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Service
                    </label>
                    <input
                      type="text"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="Lawn Mowing, Cleaning, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.dateTime}
                      onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      placeholder="Any additional information..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddBooking(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent-hover transition-colors font-medium"
                    >
                      Create Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
