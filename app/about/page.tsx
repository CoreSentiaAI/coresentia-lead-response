import Link from 'next/link'
import { Target, Code2, Zap, Shield, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg-primary text-dt-primary">
      <Header />

      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">About Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-raleway">
                Building Software That{' '}
                <span className="gradient-text">Ships</span>
              </h1>
              <p className="text-xl text-dt-secondary leading-relaxed max-w-2xl">
                CoreSentia is an AI-native development studio based in Brisbane, Australia. We design and build production software — from SaaS platforms to AI automation systems.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-6 lg:px-8 bg-dark-bg-secondary border-t border-dark-border">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <div className="flex items-start gap-6">
                <Target className="w-10 h-10 text-brand-accent flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-raleway">Our Story</h2>
                  <div className="space-y-4 text-dt-secondary leading-relaxed">
                    <p>
                      CoreSentia was founded by Ramsay — a developer who spent years building enterprise automation systems, shipping production code, and seeing firsthand the gap between what businesses need and what most agencies deliver.
                    </p>
                    <p>
                      After building a $350K+ enterprise automation platform (57,000+ lines of production code), an AI-powered photography SaaS, and a 24/7 AI receptionist system, the pattern became clear: businesses need developers who can build real, production-grade software — not just mockups and promises.
                    </p>
                    <p>
                      CoreSentia exists to be that partner. We take projects from concept to production, using modern tools like Next.js, Claude AI, Supabase, and Twilio. Every system we build is designed to run 24/7 in production.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold mb-12 font-raleway text-center">Our Approach</h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimateOnScroll delay={0}>
                <div className="bg-dark-bg-tertiary rounded-2xl p-8 border border-dark-border hover:border-brand-primary/30 transition-all">
                  <Code2 className="w-10 h-10 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-3 font-raleway">Ship Real Code</h3>
                  <p className="text-dt-secondary text-sm leading-relaxed">
                    No WordPress templates. No drag-and-drop. We write production code using modern frameworks and best practices. Every project is custom-built for your needs.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={150}>
                <div className="bg-dark-bg-tertiary rounded-2xl p-8 border border-dark-border hover:border-brand-primary/30 transition-all">
                  <Zap className="w-10 h-10 text-brand-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-3 font-raleway">AI-Native Thinking</h3>
                  <p className="text-dt-secondary text-sm leading-relaxed">
                    We don&apos;t bolt AI on as an afterthought. We design systems with intelligence at the core — from natural language interfaces to automated decision-making.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section className="py-20 px-6 lg:px-8 bg-dark-bg-secondary border-t border-dark-border">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold mb-12 font-raleway text-center">Track Record</h2>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
                {[
                  { value: '$350K+', label: 'Automations Built' },
                  { value: '55K+', label: 'Lines of Production Code' },
                  { value: '24/7', label: 'Systems in Production' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 font-montserrat">{stat.value}</div>
                    <div className="text-dt-tertiary text-sm uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold mb-12 font-raleway text-center">Our Values</h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '01', title: 'Quality Over Quantity', desc: 'We take on fewer projects and do them properly. Every line of code is production-grade.' },
                { num: '02', title: 'Transparency', desc: 'No hidden fees, no scope creep surprises. You know exactly what you\'re getting and what it costs.' },
                { num: '03', title: 'Results', desc: 'We measure success by systems running in production, not by hours billed or features promised.' },
              ].map((value, i) => (
                <AnimateOnScroll key={value.title} delay={i * 150}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-white font-mono">{value.num}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 font-raleway">{value.title}</h3>
                    <p className="text-dt-secondary text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-8 bg-dark-bg-secondary border-t border-dark-border">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold mb-4 font-raleway">
                Have a Project in Mind?
              </h2>
              <p className="text-xl text-dt-secondary mb-8">
                Let&apos;s talk about what you need built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="btn-primary px-10 py-4 rounded-full font-semibold text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <span className="shimmer-span" />
                </Link>
                <Link
                  href="/projects"
                  className="btn-secondary px-10 py-4 rounded-full font-semibold text-lg"
                >
                  View Our Work
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Legal Info */}
        <section className="py-8 px-6 border-t border-dark-border">
          <div className="max-w-4xl mx-auto text-center text-sm text-dt-tertiary">
            <p>CoreSentia</p>
            <p>ABN: 69 267 271 132</p>
            <p className="mt-2">Brisbane, Queensland, Australia</p>
            <p className="mt-2">
              <Link href="mailto:info@coresentia.com" className="text-brand-accent hover:text-brand-highlight transition-colors">
                info@coresentia.com
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
