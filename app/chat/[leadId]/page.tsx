'use client'

import { useParams } from 'next/navigation'
import ChatInterface from '@/app/components/ChatInterface'

export default function ChatPage() {
  const params = useParams()
  const leadId = params.leadId as string

  return (
    <div className="min-h-screen bg-white text-text-primary relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-white z-0"></div>

      {/* Main content wrapper */}
      <div className="relative z-10 min-h-screen">
        <ChatInterface leadId={leadId} />
      </div>
    </div>
  )
}
