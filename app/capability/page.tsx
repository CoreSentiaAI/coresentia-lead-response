import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'
import CapabilityForm from '../components/CapabilityForm'

export const metadata: Metadata = {
  title: 'Capability document - CoreSentia',
  description:
    'Five pages on what CoreSentia builds, how we work, and the proof behind it. Request the PDF and it lands in your inbox.',
}

const contents = [
  { num: '01', label: 'What we build', caption: 'Five services, one pipeline - automation to company-native AI.' },
  { num: '02', label: 'How we work', caption: 'The process that documents itself, and the principles behind it.' },
  { num: '03', label: 'The proof', caption: 'An enterprise platform in production - the numbers, anonymised by design.' },
]

export default function CapabilityPage() {
  return (
    <div className="editorial min-h-screen bg-surface-base text-ink-1">
      <Header />

      <main className="pt-40 pb-0">
        <section className="relative px-6 lg:px-8 pb-24 overflow-hidden">
          {/* Structure: stairs falling into shadow - repeated elements, one form */}
          <div className="absolute inset-0 z-0 pointer-events-none dark-only">
            <Image
              src="/structure-shadowstairs.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              priority
              quality={82}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, #111110 0%, rgba(17,17,16,0.85) 40%, rgba(17,17,16,0.3) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #111110, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #111110, transparent)' }} />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              <div className="lg:col-span-5">
                <AnimateOnScroll>
                  <div className="section-label mb-3">Capability document</div>
                  <h1 className="text-4xl md:text-5xl font-semibold font-display mb-6">
                    The whole studio,<br />on five pages
                  </h1>
                  <p className="text-ink-2 leading-relaxed mb-10 max-w-md">
                    What we build, how we work, and the proof behind it - as a PDF
                    you can read in five minutes and forward to whoever signs off.
                    Tell us where to send it.
                  </p>
                </AnimateOnScroll>

                <div>
                  {contents.map((item, i) => (
                    <AnimateOnScroll key={item.num} delay={i * 80}>
                      <div className="border-t border-line-soft py-4 pr-8">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono text-sm text-accent-ink">{item.num}</span>
                          <span className="text-lg font-medium font-display">{item.label}</span>
                        </div>
                        <p className="text-sm leading-snug text-ink-2">{item.caption}</p>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <AnimateOnScroll delay={100}>
                  <CapabilityForm />
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
