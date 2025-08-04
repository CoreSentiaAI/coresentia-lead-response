'use client'

import { useParams } from 'next/navigation'
import ChatInterface from '@/app/components/ChatInterface'
import dynamic from 'next/dynamic'

// Dynamically import NetworkCanvas (no SSR for canvas animation)
const NetworkCanvas = dynamic(() => import('@/app/components/NetworkCanvas'), { 
  ssr: false 
  loading: () => <div>Loading background...</div> // Add this to see if it's loading
})

export default function ChatPage() {
  const params = useParams()
  const leadId = params.leadId as string

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Synapse canvas background */}
      <div className="absolute inset-0 z-0">
        <NetworkCanvas />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 min-h-screen"> {/* Added min-h-screen here too */}
        <ChatInterface leadId={leadId} />
      </div>
    </div>
  )
}
