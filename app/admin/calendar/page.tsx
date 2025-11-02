'use client'

import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Plus, X, List, Trash2, Edit2 } from 'lucide-react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import CalendarView from '@/app/components/CalendarView'
import type { Booking as CalendarBooking, BlockedTime, CalendarEvent } from '@/types/calendar'

// Business ID for admin calendar (null for manual bookings without business association)
const BUSINESS_ID = null

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddBooking, setShowAddBooking] = useState(false)
  const [editingBooking, setEditingBooking] = useState<any>(null)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    dateTime: '',
    duration: 60, // minutes
    notes: ''
  })

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch all bookings (no business filter for admin)
      const bookingsRes = await fetch(`/api/bookings/all`)
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json()
        setBookings(bookingsData.bookings || [])
      }

      // Fetch all blocked times (no business filter for admin)
      const blockedRes = await fetch(`/api/blocked-times/all`)
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
    const booking = bookings.find(b => b.id === event.id)
    if (booking) {
      setEditingBooking(booking)
      setFormData({
        customerName: booking.customer_name,
        customerEmail: booking.customer_email || '',
        customerPhone: booking.customer_phone || '',
        service: booking.service || '',
        dateTime: booking.date_time ? new Date(booking.date_time).toISOString().slice(0, 16) : '',
        duration: booking.job_duration || 60,
        notes: booking.notes || ''
      })
      setShowAddBooking(true)
    }
  }

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Booking deleted successfully!')
        fetchData()
      } else {
        alert('Failed to delete booking')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert('Failed to delete booking')
    }
  }

  const saveBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerName || !formData.customerEmail || !formData.dateTime) {
      alert('Please fill in all required fields')
      return
    }

    try {
      if (editingBooking) {
        // Update existing booking
        const response = await fetch('/api/bookings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: editingBooking.id,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            service: formData.service || 'General Service',
            dateTime: formData.dateTime,
            jobDuration: formData.duration,
            notes: formData.notes,
          })
        })

        const result = await response.json()

        if (response.ok) {
          alert('Booking updated successfully!')
          setShowAddBooking(false)
          setEditingBooking(null)
          setFormData({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            service: '',
            dateTime: '',
            duration: 60,
            notes: ''
          })
          fetchData()
        } else {
          alert(`Failed to update booking: ${result.error || 'Unknown error'}`)
        }
      } else {
        // Create new booking
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: null, // No lead association for manual admin bookings
            businessId: BUSINESS_ID,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            service: formData.service || 'General Service',
            dateTime: formData.dateTime,
            jobDuration: formData.duration,
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
            duration: 60,
            notes: ''
          })
          fetchData()
        } else {
          alert(`Failed to create booking: ${result.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Error saving booking:', error)
      alert('Failed to save booking')
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
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <List className="w-4 h-4" />
                  List View
                </Link>
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

        {/* Create/Edit Booking Modal */}
        {showAddBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-brand-navy">
                    {editingBooking ? 'Edit Booking' : 'Create Booking'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddBooking(false)
                      setEditingBooking(null)
                      setFormData({
                        customerName: '',
                        customerEmail: '',
                        customerPhone: '',
                        service: '',
                        dateTime: '',
                        notes: ''
                      })
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={saveBooking} className="space-y-4">
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
                      step="900"
                      value={formData.dateTime}
                      onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Duration *
                    </label>
                    <select
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="150">2.5 hours</option>
                      <option value="180">3 hours</option>
                      <option value="240">4 hours</option>
                      <option value="300">5 hours</option>
                      <option value="360">6 hours</option>
                      <option value="480">8 hours</option>
                    </select>
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
                    {editingBooking && (
                      <button
                        type="button"
                        onClick={() => deleteBooking(editingBooking.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddBooking(false)
                        setEditingBooking(null)
                        setFormData({
                          customerName: '',
                          customerEmail: '',
                          customerPhone: '',
                          service: '',
                          dateTime: '',
                          duration: 60,
                          notes: ''
                        })
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent-hover transition-colors font-medium"
                    >
                      {editingBooking ? 'Update Booking' : 'Create Booking'}
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
