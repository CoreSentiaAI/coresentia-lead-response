'use client'

import { useParams } from 'next/navigation'
import ChatInterface from '@/app/components/ChatInterface'

export default function ChatPage() {
  const params = useParams()
  const leadId = params.leadId as string

  return (
    <div className="min-h-screen bg-black">
      <ChatInterface leadId={leadId} />
    </div>
  )
}
