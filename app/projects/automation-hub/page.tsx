import Link from 'next/link'
import { ArrowLeft, Zap, Shield, Database, GitBranch, Server, Bot, Layers, Clock, ArrowRight, Eye } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AnimateOnScroll from '../../components/AnimateOnScroll'

export default function AutomationHubPage() {
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
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-glow-pulse"
              style={{ background: 'radial-gradient(circle, rgba(42, 80, 223, 0.15) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(16, 153, 231, 0.08) 0%, transparent 70%)' }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">Live in Production</span>
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-highlight text-xs font-semibold">Enterprise</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">AI-Native</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-raleway mb-6 leading-tight">
                  Enterprise Automation Hub
                </h1>

                <p className="text-lg md:text-xl text-dt-secondary mb-8 leading-relaxed">
                  Mission-critical sales automation platform connecting 13 business systems for a major Australian energy company. Processes hundreds of sales monthly, manages job pipelines end-to-end, and replaced a $40K/year CRM — all built with AI-assisted development.
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2">
                  {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Claude AI', 'OAuth 2.0', 'HMAC-SHA256', 'Vercel', 'React Flow'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-dark-bg-elevated border border-dark-border text-dt-tertiary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Scale Stats */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {[
                { value: '57K+', label: 'Lines of production TypeScript' },
                { value: '97', label: 'API endpoints' },
                { value: '13', label: 'Connected business systems' },
                { value: '695', label: 'Git commits shipped' },
              ].map((stat, i) => (
                <AnimateOnScroll key={stat.label} delay={i * 100}>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold font-mono text-dt-primary mb-2 tracking-editorial">{stat.value}</div>
                    <div className="text-dt-tertiary text-sm">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* What It Does */}
        <section className="relative py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">The Platform</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Two products in one platform</h2>
                <p className="text-dt-secondary max-w-2xl mx-auto">
                  A sales automation engine and a complete job management pipeline — both running on the same infrastructure, connected to every system the business uses.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-6">
              <AnimateOnScroll>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-brand-highlight" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-raleway">Sales Automation Engine</h3>
                      <p className="text-dt-tertiary text-xs">Webhook-driven, zero manual entry</p>
                    </div>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed mb-6">
                    When a contract is signed on the quoting platform, the Hub takes over. It validates the data with AI, creates jobs in the CRM, dispatches tasks to the field team, generates Google Drive folders, creates inventory orders, and updates the sales pipeline — all in under 6 minutes.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Dual-platform support (two separate quoting systems)',
                      'AI validation catches data quality issues before they propagate',
                      'Parallel processing with graceful degradation',
                      'Automatic Google Drive folder structure per job',
                      'Signed contract PDF archival and permanent linking',
                      'Real-time team notifications via Google Chat',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary">
                        <Zap className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-raleway">Job Management Hub</h3>
                      <p className="text-dt-tertiary text-xs">Custom CRM pipeline — replaced $40K/year platform</p>
                    </div>
                  </div>
                  <p className="text-dt-secondary text-sm leading-relaxed mb-6">
                    A complete 17-stage installation pipeline across 7 phases — from preliminary assessment through to final closeout. Built in 12 days. Replaces an enterprise CRM the business was paying $40K/year for but only using 15-20% of.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      '17 stages across 7 pipeline phases with linear progression',
                      'Per-stage task management with owner classification',
                      'Exit criteria validation with "warn don\'t block" philosophy',
                      'Job Overview drawer — helicopter view of all stages',
                      'Inline-editable fields with optimistic UI updates',
                      'Activity timeline, SLA tracking, and full audit trail',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-dt-secondary">
                        <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Integration Architecture */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Architecture</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">13 systems, one nervous system</h2>
                <p className="text-dt-secondary max-w-2xl">
                  Every integration has its own authentication pattern, error handling, and retry logic. The Hub sits at the centre and orchestrates them all.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Server, title: 'Quoting Platforms', description: 'Dual webhook receivers processing contracts from two separate quoting systems with isolated failure domains.' },
                { icon: Database, title: 'CRM & Job Management', description: 'Bidirectional sync with CRM platforms. Auto-creates jobs, populates 28+ custom fields, and manages the full lifecycle.' },
                { icon: Layers, title: 'Inventory Management', description: 'Smart product matching with fuzzy search. Creates draft sales orders with validation, supports bulk backlog processing.' },
                { icon: Shield, title: 'Document Management', description: 'Auto-creates structured folder hierarchies in Google Drive. Archives signed contracts with permanent linking.' },
                { icon: Bot, title: 'AI Engine', description: 'Claude AI validates incoming data, powers an internal Sales Coach bot, and provides intelligent job assistance.' },
                { icon: GitBranch, title: 'Team Notifications', description: 'Real-time updates pushed to team chat. Every action logged with complete audit trail for compliance.' },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 80}>
                  <div className="bg-dark-bg-tertiary border border-dark-border rounded-xl p-6 h-full hover:border-brand-primary/20 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-brand-highlight" />
                    </div>
                    <h3 className="text-base font-bold font-raleway mb-2">{item.title}</h3>
                    <p className="text-dt-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="relative py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateOnScroll>
              <div className="mb-12">
                <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">Enterprise-Grade</span>
                <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Built like it costs $300K</h2>
                <p className="text-dt-secondary max-w-2xl">
                  No corners cut. HMAC webhook validation, role-based access control, atomic database operations, and comprehensive audit logging throughout.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid lg:grid-cols-2 gap-6">
              <AnimateOnScroll>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <h3 className="text-lg font-bold font-raleway mb-4">Security &amp; Reliability</h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">HMAC-SHA256 webhook signature validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">RBAC with Google Workspace SSO</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">PostgreSQL atomic operations (race condition prevention)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">OAuth 2.0 token management with auto-refresh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">Complete audit trail — every action logged</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-dt-secondary">Replay capability — reprocess any event at any time</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <h3 className="text-lg font-bold font-raleway mb-4">Scale &amp; Architecture</h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">206 files across app, API, lib, and types</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">97 API endpoints serving frontend and integrations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">37 database migrations tracking schema evolution</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">Dual-table architecture with isolated failure domains</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">Parallel processing with graceful degradation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-brand-highlight shrink-0" />
                      <span className="text-dt-secondary">Vercel serverless — auto-scaling, zero ops</span>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* The Build Story */}
        <section className="relative bg-dark-bg-secondary py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll>
                <div>
                  <span className="text-brand-accent font-semibold tracking-wider uppercase text-xs mb-3 block">The Build</span>
                  <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-6">15 weeks. $2K. Enterprise-grade.</h2>
                  <p className="text-dt-secondary leading-relaxed mb-6">
                    An equivalent agency build would scope at $200-300K over 6-9 months. We delivered it in 15 weeks using AI-assisted development — with enterprise security, 13 integrations, and a custom CRM pipeline that alone would cost $50-80K.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-brand-highlight" />
                      </div>
                      <div>
                        <h4 className="font-bold font-raleway text-sm mb-1">3-4x faster than traditional development</h4>
                        <p className="text-dt-secondary text-sm">Iterating in hours, not sprint cycles. Bug fixes same-day, not next-release.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Database className="w-5 h-5 text-brand-highlight" />
                      </div>
                      <div>
                        <h4 className="font-bold font-raleway text-sm mb-1">Complete ownership</h4>
                        <p className="text-dt-secondary text-sm">Client owns every line of code. No vendor lock-in, no external dependencies, no retainer agreements.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 text-brand-highlight" />
                      </div>
                      <div>
                        <h4 className="font-bold font-raleway text-sm mb-1">Replaced a $40K/year CRM</h4>
                        <p className="text-dt-secondary text-sm">Custom Job Management Hub built in 12 days. 17 stages, task management, exit criteria — purpose-built for the business.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
                <div className="bg-dark-bg-tertiary border border-dark-border rounded-2xl p-8">
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-brand-accent">// Platform architecture</div>
                    <div className="text-dt-secondary">
                      <span className="text-indigo-400">const</span> hub = {'{'}
                    </div>
                    <div className="text-dt-secondary pl-4">
                      integrations: <span className="text-amber-400">13</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      apiEndpoints: <span className="text-amber-400">97</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      linesOfCode: <span className="text-green-400">&apos;57,000+&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      commits: <span className="text-amber-400">695</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      buildTime: <span className="text-green-400">&apos;15 weeks&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      traditionalCost: <span className="text-green-400">&apos;$200-300K&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      actualCost: <span className="text-green-400">&apos;~$2K&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      security: <span className="text-green-400">&apos;enterprise-grade&apos;</span>,
                    </div>
                    <div className="text-dt-secondary pl-4">
                      status: <span className="text-green-400">&apos;live in production&apos;</span>,
                    </div>
                    <div className="text-dt-secondary">{'}'}</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 lg:py-20 px-6 lg:px-8 border-t border-dark-border">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <AnimateOnScroll>
              <h2 className="text-3xl lg:text-4xl font-bold font-raleway mb-4">Need enterprise automation?</h2>
              <p className="text-dt-secondary mb-8 max-w-xl mx-auto">
                We build mission-critical platforms that connect your entire business — at a fraction of the traditional cost.
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
