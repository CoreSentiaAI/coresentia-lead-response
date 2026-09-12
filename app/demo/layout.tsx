import type { Metadata } from 'next'
import ForceLight from './_components/ForceLight'

// Demo tenant. Unlisted, noindex, always light mode, fictional data.
// Access is gated per page group (see (app)/layout.tsx and page.tsx).

export const metadata: Metadata = {
  title: 'Demo tenant | CoreSentia',
  description: 'A clickable demo of the CoreSentia operating model.',
  robots: { index: false, follow: false, nocache: true },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <ForceLight />
      {children}
    </div>
  )
}
