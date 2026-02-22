import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sun, Moon, Camera, Cloud, MapPin, Bot, Compass, Eye } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'

export default function FirstLightPage() {
  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary relative overflow-x-hidden">
      <Header />

      <main className="pt-28 pb-0">
        {/* Back to Projects */}
        <section className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 pb-16 overflow-hidden">
          {/* Background orbs — golden/amber to match FirstLight's brand */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-glow-pulse"
              style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">SaaS Platform</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">AI-Powered</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6 leading-tight">
                  FirstLight
                </h1>

                <p className="text-lg md:text-xl text-dt-secondary mb-8 leading-relaxed">
                  AI-powered photography conditions platform for nature photographers. Real-time weather, astronomy data, and Claude AI briefings — so photographers find the right location, at the right time, in the right conditions.
                </p>

                <a
                  href="https://first-light.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-highlight text-dark-bg-primary font-semibold rounded-lg
                    hover:bg-[#4dc4e8] transition-colors text-base
                    shadow-[0_0_20px_rgba(98,212,249,0.3)]"
                >
                  Visit first-light.com.au
                  <Eye className="w-4 h-4" />
                </a>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Next.js 14', 'Claude AI (Opus)', 'Supabase', 'Google Weather API', 'Google Maps', 'Tailwind CSS', 'Vercel'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* What It Does */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs mb-3 block">The Platform</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">One app instead of five</h2>
                <p className="text-dt-secondary max-w-2xl mx-auto">
                  Photographers used to check weather apps, tide charts, moon phase calendars, sun position tools, and aurora trackers separately. FirstLight combines them all with AI-powered creative guidance.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Cloud, title: 'Live Weather', description: 'Real-time conditions, cloud cover, wind, visibility, and precipitation — everything that affects a shoot.' },
                { icon: Sun, title: 'Light Times', description: 'First light, golden hour, blue hour, sunrise, sunset — colour-coded and annotated with exact times.' },
                { icon: Moon, title: 'Astronomy', description: 'Moon phase, rise/set times, Bortle rating for light pollution, and aurora probability for southern Australia.' },
                { icon: Bot, title: 'AI Briefings', description: 'Claude AI generates personalised creative advice — composition, camera settings, weather reframing, and shot ideas.' },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 100}>
                  <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-6 h-full hover:border-amber-500/20 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold font-raleway mb-2">{item.title}</h3>
                    <p className="text-dt-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="relative py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="mb-12">
                <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs mb-3 block">Features</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Built for photographers who notice every detail</h2>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-8">
              <AnimateOnScroll>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold font-raleway">Scout AI Assistant</h3>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed mb-4">
                    A draggable, expandable AI chat panel powered by Claude. Photographers ask natural questions and get location-aware, condition-aware creative advice — not generic tourism tips.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Quick Brief', 'Shot Ideas', 'Best Times', 'Full Briefing'].map((action) => (
                      <span key={action} className="px-3 py-1.5 rounded-lg bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={100}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold font-raleway">150+ Curated Locations</h3>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed mb-4">
                    Handpicked photography spots across Australia — coastal, alpine, waterfalls, forests, astrophotography sites. Each with compass direction, Bortle rating, and condition indicators.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Coastal', 'Alpine', 'Waterfall', 'Forest', 'Astro', 'Urban'].map((type) => (
                      <span key={type} className="px-3 py-1.5 rounded-lg bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold font-raleway">Conditions Dashboard</h3>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed">
                    Live conditions at a glance — weather, light times, moon phase, wind maps via Windy.com, and satellite imagery. Designed for quick field checks with large touch targets (44px minimum).
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold font-raleway">Style Profiles</h3>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed">
                    Photographers set their mood, subjects, and palette preferences. AI briefings adapt — a moody seascape shooter gets different advice than a bright landscape photographer for the same conditions.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-10">
              {[
                { value: '150+', label: 'Curated photography locations' },
                { value: '7', label: 'Integrated data sources' },
                { value: '24/7', label: 'Real-time conditions' },
                { value: 'AI', label: 'Claude-powered briefings' },
              ].map((stat, i) => (
                <AnimateOnScroll key={stat.label} delay={i * 100}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold font-mono text-dt-primary mb-2 tracking-editorial">{stat.value}</div>
                    <div className="text-dt-tertiary text-sm">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="relative py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll>
                <div>
                  <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs mb-3 block">Design</span>
                  <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-6">Designed for people who notice design</h2>
                  <p className="text-dt-secondary leading-relaxed mb-6">
                    Photographers have an eye for detail. The UI had to be premium but functional — dark twilight gradients, golden accent tones that evoke sunrise, glassmorphism cards, and a data-forward layout that gets out of the way.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Dark mode twilight palette (#020408 → #0f172a)',
                      'Golden amber accents for warmth and urgency',
                      'Indigo accents for night and astro features',
                      'Glassmorphism with subtle backdrop blur',
                      'Large touch targets for outdoor field use',
                      'Custom typography: Sora, Plus Jakarta Sans, IBM Plex Mono',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary text-sm">
                        <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-amber-400">{'// Design philosophy'}</div>
                    <div className="text-dt-secondary">
                      <span className="text-indigo-400">const</span> principle = {'{'}
                    </div>
                    <div className="text-dt-secondary pl-4">
                      ui: <span className="text-green-400">&apos;gets out of the way&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      feel: <span className="text-green-400">&apos;premium but functional&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      audience: <span className="text-green-400">&apos;people who notice design&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      data: <span className="text-green-400">&apos;forward, never hidden&apos;</span>,
                    </div>
                    <div className="text-dt-secondary">{'}'}</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Have a project like this?</h2>
              <p className="text-dt-secondary mb-8 max-w-xl mx-auto">
                We build production SaaS platforms with AI integration, real-time data, and premium design.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-brand-highlight text-dark-bg-primary font-semibold rounded-full text-lg
                  hover:bg-[#4dc4e8] hover:shadow-lg hover:shadow-brand-highlight/30 transition-all"
              >
                Start a project
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
