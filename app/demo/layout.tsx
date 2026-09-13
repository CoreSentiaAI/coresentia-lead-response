import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import ForceLight from './_components/ForceLight'
import TipLayer from './_components/TipLayer'

// Demo project-management tool. Unlisted, noindex, always light, fictional
// data, its own type and palette (see .pm in globals.css).

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-pm' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-pm-mono' })

export const metadata: Metadata = {
  title: 'Demo | CoreSentia',
  description: 'An example project management tool.',
  robots: { index: false, follow: false, nocache: true },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pm ${plexSans.variable} ${plexMono.variable} min-h-screen`}>
      <ForceLight />
      <TipLayer />
      {children}
    </div>
  )
}
