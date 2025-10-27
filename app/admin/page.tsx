'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  source: string
  status: string
  initial_message: string
  created_at: string
  updated_at: string
  conversations: Conversation[]
  conversationCount: number
  lastMessage: string
}

interface Conversation {
  id: string
  message: string
  sender: string
  timestamp: string
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'sms' | 'web_chat'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'qualified'>('all')
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [filter, statusFilter])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('source', filter)
      if (statusFilter !== 'all') params.append('status', statusFilter)

      const response = await fetch(`/api/admin/leads?${params}`)
      const data = await response.json()
      setLeads(data.leads || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status: newStatus })
      })
      fetchLeads() // Refresh list
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'sms': return 'bg-blue-100 text-blue-800'
      case 'web_chat': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">CoreSentia Admin</h1>
              <p className="text-sm text-gray-300">Lead Management Dashboard</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === 'all'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('sms')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === 'sms'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setFilter('web_chat')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === 'web_chat'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Web Chat
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === 'all'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('new')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === 'new'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setStatusFilter('contacted')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === 'contacted'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => setStatusFilter('qualified')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === 'qualified'
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Qualified
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-[#1E3A5F]">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">New</p>
            <p className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.status === 'new').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">SMS Leads</p>
            <p className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.source === 'sms').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Web Leads</p>
            <p className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.source === 'web_chat' || l.source === 'ivy_chat').length}
            </p>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leads found</div>
          ) : (
            <div className="divide-y">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-gray-50 transition">
                  {/* Lead Header */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {lead.name || 'Unknown Lead'}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSourceBadgeColor(lead.source)}`}>
                            {lead.source === 'sms' ? '📱 SMS' : '💬 Web'}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          {lead.phone && (
                            <span>📞 {lead.phone}</span>
                          )}
                          {lead.email && (
                            <span>✉️ {lead.email}</span>
                          )}
                          {lead.company && (
                            <span>🏢 {lead.company}</span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 line-clamp-2">
                          {lead.lastMessage}
                        </p>
                      </div>

                      <div className="text-right ml-4">
                        <p className="text-xs text-gray-500">{formatDate(lead.created_at)}</p>
                        <p className="text-xs text-gray-400">{lead.conversationCount} messages</p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {expandedLeadId === lead.id && (
                    <div className="mt-4 pt-4 border-t">
                      {/* Status Actions */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Update Status:
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contacted')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                          >
                            Mark Contacted
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'qualified')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                          >
                            Mark Qualified
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'closed')}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                          >
                            Mark Closed
                          </button>
                        </div>
                      </div>

                      {/* Conversation History */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Conversation:</h4>
                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                          {lead.conversations.length === 0 ? (
                            <p className="text-sm text-gray-500">No conversation history</p>
                          ) : (
                            <div className="space-y-3">
                              {lead.conversations.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[80%] rounded-lg p-3 ${
                                    msg.sender === 'user'
                                      ? 'bg-[#1E3A5F] text-white'
                                      : 'bg-white border'
                                  }`}>
                                    <p className="text-xs font-medium mb-1 opacity-70">
                                      {msg.sender === 'user' ? 'Lead' : 'AI'}
                                    </p>
                                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                    <p className="text-xs mt-1 opacity-70">
                                      {new Date(msg.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
