'use client'

import { useState, useMemo, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays, startOfDay, endOfDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, Booking, BlockedTime } from '@/types/calendar'
import { Calendar as CalendarIcon, Clock, MapPin, User, X } from 'lucide-react'

// Setup date-fns localizer for react-big-calendar
const locales = {
  'en-AU': require('date-fns/locale/en-AU')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday start
  getDay,
  locales,
})

interface CalendarViewProps {
  businessId?: string | null
  bookings: Booking[]
  blockedTimes: BlockedTime[]
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void
  onSelectEvent: (event: CalendarEvent) => void
}

export default function CalendarView({
  businessId,
  bookings,
  blockedTimes,
  onSelectSlot,
  onSelectEvent
}: CalendarViewProps) {
  const [view, setView] = useState<View>('week')
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Convert bookings and blocked times to calendar events
  const events = useMemo<CalendarEvent[]>(() => {
    const bookingEvents: CalendarEvent[] = bookings.map(booking => ({
      id: booking.id,
      type: 'booking' as const,
      start: new Date(booking.scheduled_time),
      end: new Date(new Date(booking.scheduled_time).getTime() + booking.job_duration * 60000),
      title: booking.customer_name || 'Booking',
      status: booking.status,
      customer_name: booking.customer_name,
      address: booking.full_address,
      notes: booking.notes,
    }))

    const blockedEvents: CalendarEvent[] = blockedTimes.map(blocked => ({
      id: blocked.id,
      type: 'blocked' as const,
      start: new Date(blocked.start_time),
      end: new Date(blocked.end_time),
      title: blocked.reason || 'Blocked',
      notes: blocked.notes,
    }))

    return [...bookingEvents, ...blockedEvents]
  }, [bookings, blockedTimes])

  // Custom event styling
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    let backgroundColor = '#2A50DF' // brand-primary
    let borderColor = '#2A50DF'

    if (event.type === 'blocked') {
      backgroundColor = '#6B7280' // gray
      borderColor = '#4B5563'
    } else if (event.status === 'pending') {
      backgroundColor = '#F59E0B' // yellow/orange
      borderColor = '#D97706'
    } else if (event.status === 'confirmed') {
      backgroundColor = '#10B981' // green
      borderColor = '#059669'
    } else if (event.status === 'completed') {
      backgroundColor = '#8B5CF6' // purple
      borderColor = '#7C3AED'
    } else if (event.status === 'cancelled') {
      backgroundColor = '#EF4444' // red
      borderColor = '#DC2626'
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '6px',
        color: 'white',
        fontSize: '13px',
        padding: '4px 8px',
      }
    }
  }, [])

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    onSelectEvent(event)
  }

  // Handle slot selection (for blocking time)
  const handleSelectSlot = (slotInfo: any) => {
    onSelectSlot({ start: slotInfo.start, end: slotInfo.end })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Calendar Controls */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-brand-navy" />
          <h2 className="text-2xl font-bold text-brand-navy">Calendar View</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="inline-flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                view === 'day'
                  ? 'bg-brand-navy text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                view === 'week'
                  ? 'bg-brand-navy text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                view === 'month'
                  ? 'bg-brand-navy text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500 border-2 border-green-600"></div>
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500 border-2 border-yellow-600"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-500 border-2 border-gray-600"></div>
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500 border-2 border-purple-600"></div>
          <span>Completed</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          step={30}
          timeslots={2}
          min={new Date(2024, 0, 1, 7, 0)} // 7am start
          max={new Date(2024, 0, 1, 20, 0)} // 8pm end
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer?.format(date, 'h:mm a', culture) || '',
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              `${localizer?.format(start, 'h:mm a', culture)} - ${localizer?.format(end, 'h:mm a', culture)}`,
          }}
        />
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-brand-navy">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedEvent.type === 'booking' && (
                <>
                  {selectedEvent.customer_name && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4 text-brand-navy" />
                      <span>{selectedEvent.customer_name}</span>
                    </div>
                  )}
                  {selectedEvent.address && (
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-brand-navy mt-0.5" />
                      <span className="text-sm">{selectedEvent.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-brand-navy" />
                    <span>
                      {format(selectedEvent.start, 'EEE, MMM d @ h:mm a')} - {format(selectedEvent.end, 'h:mm a')}
                    </span>
                  </div>
                  {selectedEvent.status && (
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedEvent.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        selectedEvent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedEvent.status === 'completed' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                      </span>
                    </div>
                  )}
                </>
              )}

              {selectedEvent.type === 'blocked' && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4 text-brand-navy" />
                  <span>
                    {format(selectedEvent.start, 'EEE, MMM d @ h:mm a')} - {format(selectedEvent.end, 'h:mm a')}
                  </span>
                </div>
              )}

              {selectedEvent.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">{selectedEvent.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              {selectedEvent.type === 'blocked' && (
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Unblock Time
                </button>
              )}
              {selectedEvent.type === 'booking' && selectedEvent.status === 'pending' && (
                <>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Confirm
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
