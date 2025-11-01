'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, List, CalendarDays, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import CalendarView from '@/app/components/CalendarView'
import type { Booking as CalendarBooking, BlockedTime, CalendarEvent } from '@/types/calendar'

interface Booking {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  service: string
  date_time: string
  notes: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  scheduled_time?: string
  job_duration?: number
  full_address?: string
}

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const businessId = params.businessId as string
  const { user, businessId: userBusinessId, loading: authLoading, signOut } = useAuth()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [blockSlot, setBlockSlot] = useState<{ start: Date; end: Date } | null>(null)

  // Authentication check
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Not logged in - redirect to login
        router.push(`/login?redirect=/dashboard/${businessId}`)
      } else if (userBusinessId && userBusinessId !== businessId) {
        // Logged in but trying to access wrong business
        router.push(`/dashboard/${userBusinessId}`)
      }
    }
  }, [user, userBusinessId, businessId, authLoading, router])

  // Fetch bookings and blocked times (only when authenticated)
  useEffect(() => {
    if (!authLoading && user && (!userBusinessId || userBusinessId === businessId)) {
      fetchBookings()
      fetchBlockedTimes()
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        fetchBookings()
        fetchBlockedTimes()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [authLoading, user, userBusinessId, businessId])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated or wrong business
  if (!user || (userBusinessId && userBusinessId !== businessId)) {
    return null
  }

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/bookings?businessId=${businessId}`)
      if (!response.ok) throw new Error('Failed to fetch bookings')

      const data = await response.json()
      setBookings(data.bookings || [])
      setError('')
    } catch (err) {
      setError('Failed to load bookings. Please try again.')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchBlockedTimes = async () => {
    try {
      const response = await fetch(`/api/blocked-times?businessId=${businessId}`)
      if (!response.ok) throw new Error('Failed to fetch blocked times')

      const data = await response.json()
      setBlockedTimes(data.blockedTimes || [])
    } catch (err) {
      console.error('Error fetching blocked times:', err)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus })
      })

      if (!response.ok) throw new Error('Failed to update booking')

      // Refresh bookings
      await fetchBookings()
    } catch (err) {
      console.error('Error updating booking:', err)
      alert('Failed to update booking status')
    }
  }

  const getFilteredBookings = () => {
    const now = new Date()

    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date_time)

      if (filter === 'upcoming') {
        return bookingDate >= now && booking.status !== 'cancelled'
      } else if (filter === 'past') {
        return bookingDate < now || booking.status === 'completed' || booking.status === 'cancelled'
      }
      return true // 'all'
    }).sort((a, b) => {
      return new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
    })
  }

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dateStr = date.toLocaleDateString('en-AU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })

    const timeStr = date.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    // Check if today or tomorrow
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${timeStr}`
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${timeStr}`
    }

    return `${dateStr} at ${timeStr}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  // Convert bookings to calendar format
  const calendarBookings: CalendarBooking[] = bookings.map(booking => ({
    id: booking.id,
    business_id: businessId,
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

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setBlockSlot(slotInfo)
    setShowBlockModal(true)
  }

  const handleSelectEvent = (event: CalendarEvent) => {
    // Event details are shown in the calendar component's modal
    console.log('Selected event:', event)
  }

  const filteredBookings = getFilteredBookings()
  const upcomingCount = bookings.filter(b => new Date(b.date_time) >= new Date() && b.status !== 'cancelled').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: '#1E3A5F' }} className="text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bookings Dashboard</h1>
            <p className="text-white/80 text-sm">Manage your appointments</p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="inline-flex rounded-lg border-2 border-white/20 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-brand-navy'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <List className="w-4 h-4" />
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white text-brand-navy'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                Calendar View
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-brand-navy">{upcomingCount}</p>
            <p className="text-xs text-text-secondary">Upcoming</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">{bookings.length}</p>
            <p className="text-xs text-text-secondary">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p className="text-xs text-text-secondary">Confirmed</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs - Only show in list view */}
      {viewMode === 'list' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto flex">
            <button
              onClick={() => setFilter('upcoming')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'past'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              All
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {viewMode === 'calendar' ? (
        <div className="p-6 h-[calc(100vh-200px)]">
          <CalendarView
            businessId={businessId}
            bookings={calendarBookings}
            blockedTimes={blockedTimes}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4 pb-20">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-2">No bookings found</p>
            <p className="text-text-secondary text-sm">
              {filter === 'upcoming' && "You don't have any upcoming appointments"}
              {filter === 'past' && "No past bookings to show"}
              {filter === 'all' && "No bookings yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {new Date(booking.created_at).toLocaleDateString('en-AU')}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-start gap-2 mb-3">
                  <Clock className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">{formatDateTime(booking.date_time)}</p>
                    <p className="text-sm text-text-secondary">{booking.service}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{booking.customer_name}</span>
                  </div>
                  {booking.customer_phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-text-secondary" />
                      <a href={`tel:${booking.customer_phone}`} className="text-brand-orange hover:underline">
                        {booking.customer_phone}
                      </a>
                    </div>
                  )}
                  {booking.customer_email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-text-secondary" />
                      <a href={`mailto:${booking.customer_email}`} className="text-brand-orange hover:underline">
                        {booking.customer_email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <p className="text-xs text-text-secondary mb-1 font-medium">Notes:</p>
                    <p className="text-sm text-text-primary">{booking.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {booking.status === 'pending' && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-text-primary rounded-lg text-sm font-medium hover:border-red-500 hover:text-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {booking.status === 'confirmed' && new Date(booking.date_time) < new Date() && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      )}
    </div>
  )
}
