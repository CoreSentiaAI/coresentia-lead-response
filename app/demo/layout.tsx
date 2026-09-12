import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif, Source_Serif_4, Zilla_Slab } from 'next/font/google'
import ForceLight from './_components/ForceLight'
import FontPreview from './_components/FontPreview'

// TEMPORARY font comparison harness: ?font=plexserif|sourceserif|zilla switches the UI face.

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-pm' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-pm-mono' })
const plexSerif = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-cmp-plexserif' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], axes: ['opsz'], variable: '--font-cmp-sourceserif' })
const zilla = Zilla_Slab({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-cmp-zilla' })

export const metadata: Metadata = {
  title: 'Demo | CoreSentia',
  description: 'An example project management tool.',
  robots: { index: false, follow: false, nocache: true },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pm ${plexSans.variable} ${plexMono.variable} ${plexSerif.variable} ${sourceSerif.variable} ${zilla.variable} min-h-screen`}>
      <ForceLight />
      <FontPreview />
      {children}
    </div>
  )
}
