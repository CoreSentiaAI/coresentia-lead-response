import type { Metadata } from 'next'

// Print artifact, not a site page. Renders as fixed A4 stages and exports to
// public/CoreSentia-Capability.pdf via headless Chrome (scripts/export-capability-pdf.sh).
// Unlinked and noindexed. Colours are hardcoded so the theme toggle can never
// flip a page of the PDF - this document is dark by design.

export const metadata: Metadata = {
  title: 'CoreSentia - Capability document',
  robots: { index: false, follow: false },
}

const INK = '#ffffff'
const BG = '#111110'
const LINE = '#2a2925'
const ACCENT = '#62d4f9'

const services = [
  {
    num: '01',
    title: 'Process automation',
    description:
      'We find where work actually stalls - quotes, job management, approvals, handoffs - and remove the manual steps. What your team used to do by hand now happens in seconds, automatically.',
  },
  {
    num: '02',
    title: 'Systems integration',
    description:
      'CRM, quoting, accounting, inventory - one pipeline, one source of truth, on your stack: Microsoft, Google, AWS.',
  },
  {
    num: '03',
    title: 'SaaS replacement',
    description:
      'Custom platforms that replace the subscriptions you’ve outgrown. Owned outright, no seat fees - built to replace the enterprise CRM you use a fraction of.',
  },
  {
    num: '04',
    title: 'AI-native software',
    description:
      'Intelligence designed in from the start - validating data, drafting the routine work, answering the questions your team used to dig for.',
  },
  {
    num: '05',
    title: 'Company-native AI',
    description:
      'A private AI workspace on your own data - every prompt logged, governed, owned by you. We’ve shipped this: a governed workspace where leadership asks in plain English and gets live dashboards back.',
  },
]

const processStages = [
  {
    num: '01',
    label: 'Map',
    caption:
      'Stakeholder sessions, process mapped end-to-end - or we build straight from the map your team already owns.',
  },
  {
    num: '02',
    label: 'Build',
    caption: 'Your platform takes shape module by module. Humans stay in the loop.',
  },
  {
    num: '03',
    label: 'Track',
    caption:
      'No status decks. The platform is the project tracker - watch progress inside the tool you’re buying.',
  },
  {
    num: '04',
    label: 'Run',
    caption: 'The tracker becomes the operating system. SaaS subscriptions retire behind it.',
  },
]

const principles = [
  {
    num: '01',
    title: 'Ship real code',
    description:
      'Production code with modern frameworks. Working software shows up early in the engagement - not at the end.',
  },
  {
    num: '02',
    title: 'Start from how the business works',
    description:
      'We can map the process end to end - or build straight from the map your transformation team already owns. The system design follows the process either way.',
  },
  {
    num: '03',
    title: 'AI-native thinking',
    description:
      'Intelligence at the core, not bolted on - validating data before it propagates, drafting the routine work, answering the questions your team used to dig for.',
  },
  {
    num: '04',
    title: 'You own everything',
    description:
      'Every line of code, the infrastructure, the documentation. No vendor lock-in, no licensing fees on your own system.',
  },
]

const proofStats = [
  { value: '320K+', label: 'lines of production TypeScript' },
  { value: '500+', label: 'API endpoints' },
  { value: '15+', label: 'SaaS platforms integrated' },
  { value: '2,100+', label: 'commits' },
  { value: '289', label: 'database migrations' },
  { value: '9 months', label: 'first commit to full platform' },
]

function PageFooter({ page }: { page: string }) {
  return (
    <div className="cap-footer">
      <span>CoreSentia &middot; Capability document</span>
      <span>{page}</span>
    </div>
  )
}

export default function CapabilityDocumentPage() {
  return (
    <div className="cap-root">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@page { size: A4; margin: 0; }

.cap-root {
  background: #060606;
  font-family: var(--font-newsreader), Georgia, serif;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.cap-sheet {
  position: relative;
  width: 210mm;
  height: 297mm;
  background: ${BG};
  color: ${INK};
  overflow: hidden;
  page-break-after: always;
  break-after: page;
  padding: 16mm 18mm 14mm;
  display: flex;
  flex-direction: column;
}

/* Screen preview only - centred sheets with a gap */
@media screen {
  .cap-sheet { margin: 24px auto; box-shadow: 0 8px 40px rgba(0,0,0,0.55); }
}
@media print {
  .cap-root { background: ${BG}; }
  .cap-sheet { margin: 0; box-shadow: none; }
}

.cap-label {
  font-family: var(--font-mono), monospace;
  font-size: 7.5pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${INK};
}

.cap-mono {
  font-family: var(--font-mono), monospace;
  font-size: 7pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${INK};
}

.cap-h1 {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 600;
  font-size: 42pt;
  line-height: 0.98;
  letter-spacing: -0.02em;
  color: ${INK};
}

.cap-h2 {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 600;
  font-size: 21pt;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${INK};
}

.cap-h3 {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 500;
  font-size: 12.5pt;
  line-height: 1.2;
  color: ${INK};
}

.cap-body {
  font-size: 10.5pt;
  line-height: 1.62;
  color: ${INK};
}

.cap-body-sm {
  font-size: 9.5pt;
  line-height: 1.55;
  color: ${INK};
}

.cap-footer {
  margin-top: auto;
  padding-top: 4mm;
  border-top: 1px solid ${LINE};
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono), monospace;
  font-size: 6.5pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${INK};
}

.cap-rule { border: 0; border-top: 1px solid ${LINE}; margin: 0; }

.cap-num {
  font-family: var(--font-mono), monospace;
  font-size: 9pt;
  color: ${ACCENT};
}

.cap-stat-value {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 600;
  font-size: 22pt;
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${INK};
}
`,
        }}
      />

      {/* ============ PAGE 1 - COVER ============ */}
      <section className="cap-sheet">
        {/* Structure: shallow steps in raking light - same image as the site hero */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/structure-steps.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(100deg, ${BG} 0%, rgba(17,17,16,0.85) 36%, rgba(17,17,16,0.3) 68%, rgba(17,17,16,0.1) 100%)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              insetInline: 0,
              bottom: 0,
              height: '60mm',
              background: `linear-gradient(to top, ${BG}, transparent)`,
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/CoreSentia_Transparent_Logo.png" alt="CoreSentia" style={{ height: '11mm', width: 'auto' }} />
            <span className="cap-mono">August 2026</span>
          </div>

          <div style={{ marginTop: '58mm' }}>
            <div className="cap-label" style={{ marginBottom: '5mm' }}>Capability document</div>
            <h1 className="cap-h1">
              We make<br />good businesses<br />run better
            </h1>
            <p className="cap-body" style={{ maxWidth: '95mm', marginTop: '9mm' }}>
              We replace the spreadsheets and SaaS sprawl your business runs on with
              one intelligent platform - built in weeks, not years.
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div className="cap-mono" style={{ marginBottom: '4mm' }}>
              15+ SaaS platforms connected &middot; in production three weeks after first commit &middot; 24/7, hands-free
            </div>
            <hr className="cap-rule" />
            <div className="cap-mono" style={{ marginTop: '4mm', display: 'flex', justifyContent: 'space-between' }}>
              <span>coresentia.com.au</span>
              <span>info@coresentia.com</span>
              <span>Brisbane, Queensland</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAGE 2 - WHAT WE BUILD ============ */}
      <section className="cap-sheet">
        <div className="cap-label" style={{ marginBottom: '3mm' }}>Services</div>
        <h2 className="cap-h2" style={{ marginBottom: '6mm' }}>What we build</h2>
        <p className="cap-body" style={{ maxWidth: '150mm', marginBottom: '8mm' }}>
          For businesses that are already making money - and losing time. Come with a
          blank page or a half-finished process map - we run the whole transformation
          end to end, or plug in as the build engine behind your internal change lead.
        </p>

        <div>
          {services.map((service) => (
            <div
              key={service.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '10mm 48mm 1fr',
                gap: '6mm',
                alignItems: 'baseline',
                padding: '5.5mm 0',
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <span className="cap-num">{service.num}</span>
              <h3 className="cap-h3">{service.title}</h3>
              <p className="cap-body-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="cap-body" style={{ maxWidth: '150mm', marginTop: '9mm' }}>
          The product changes. The spine doesn&apos;t. The same pipeline runs
          utility-scale engineering and the local service round - sales in, jobs
          scheduled, work delivered, invoices out - and every build starts from the
          one your business already runs on.
        </p>

        <PageFooter page="02" />
      </section>

      {/* ============ PAGE 3 - HOW WE WORK ============ */}
      <section className="cap-sheet">
        <div className="cap-label" style={{ marginBottom: '3mm' }}>Process</div>
        <h2 className="cap-h2" style={{ marginBottom: '6mm' }}>The build documents itself</h2>
        <p className="cap-body" style={{ maxWidth: '150mm', marginBottom: '8mm' }}>
          One process from first meeting to live platform. No status decks - you watch
          it happen inside the product.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6mm 8mm', marginBottom: '11mm' }}>
          {processStages.map((stage) => (
            <div key={stage.num} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '3.5mm' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3mm', marginBottom: '1.5mm' }}>
                <span className="cap-num">{stage.num}</span>
                <span className="cap-h3">{stage.label}</span>
              </div>
              <p className="cap-body-sm">{stage.caption}</p>
            </div>
          ))}
        </div>

        <div className="cap-label" style={{ marginBottom: '3mm' }}>Principles</div>
        <h2 className="cap-h2" style={{ marginBottom: '5mm' }}>How we work</h2>
        <div>
          {principles.map((p) => (
            <div
              key={p.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '10mm 48mm 1fr',
                gap: '6mm',
                alignItems: 'baseline',
                padding: '4.5mm 0',
                borderBottom: `1px solid ${LINE}`,
              }}
            >
              <span className="cap-num">{p.num}</span>
              <h3 className="cap-h3">{p.title}</h3>
              <p className="cap-body-sm">{p.description}</p>
            </div>
          ))}
        </div>

        <PageFooter page="03" />
      </section>

      {/* ============ PAGE 4 - PROOF ============ */}
      <section className="cap-sheet">
        {/* Faint structural backdrop - same treatment as the site's track record section */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/structure-curve.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, ${BG} 0%, rgba(17,17,16,0.4) 45%, ${BG} 100%)`,
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="cap-label" style={{ marginBottom: '3mm' }}>Track record</div>
          <h2 className="cap-h2" style={{ marginBottom: '10mm' }}>Proof, in production</h2>

          <div
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontWeight: 600,
              fontSize: '72pt',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            $1M+
          </div>
          <div className="cap-mono" style={{ marginTop: '3mm', marginBottom: '10mm' }}>
            in platform value delivered
          </div>

          <h3 className="cap-h3" style={{ marginBottom: '3mm' }}>Enterprise operations platform</h3>
          <p className="cap-body" style={{ maxWidth: '160mm', marginBottom: '8mm' }}>
            A national Australian solar company needed its operation on one platform.
            We built it: sales, jobs, scheduling, installation, invoicing - one
            pipeline connecting fifteen SaaS platforms into a single source of truth.
            The first production deploy landed three weeks after the first commit.
            Nine months later the platform runs the business - hundreds of sales
            processed every month, 24/7, hands-free. The same platform now answers to
            leadership directly: a governed AI workspace where executives ask in plain
            English and get live dashboards back.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '7mm 8mm', marginBottom: '9mm' }}>
            {proofStats.map((stat) => (
              <div key={stat.label} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '3.5mm' }}>
                <div className="cap-stat-value">{stat.value}</div>
                <div className="cap-mono" style={{ marginTop: '2mm' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="cap-body-sm" style={{ maxWidth: '150mm', marginTop: 'auto' }}>
            Case studies are anonymised by design. Our clients&apos; operational
            advantage stays theirs - discretion is part of the service.
          </p>

          <PageFooter page="04" />
        </div>
      </section>

      {/* ============ PAGE 5 - FOUNDER + CONTACT ============ */}
      <section className="cap-sheet">
        <div className="cap-label" style={{ marginBottom: '3mm' }}>Founder</div>
        <h2 className="cap-h2" style={{ marginBottom: '8mm' }}>Order out of complexity</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 62mm', gap: '10mm', alignItems: 'start' }}>
          <div className="cap-body" style={{ display: 'flex', flexDirection: 'column', gap: '4mm' }}>
            <p>
              I&apos;m Ramsay Hatfield, and CoreSentia is my studio. I&apos;ve spent
              the last few years inside a national Australian solar company, where I
              built the operations platform the business now runs on - 320,000+ lines
              of production TypeScript, fifteen integrated SaaS platforms, hundreds of
              sales processed every month.
            </p>
            <p>
              That work taught me where software earns its keep: in the gap between
              how a business thinks it runs and how it actually runs - where quotes
              stall, data gets re-keyed, and time quietly disappears. Closing that gap
              takes working software in production, built by someone who&apos;s taken
              the time to understand the operation.
            </p>
            <p>
              Every platform I build is developed AI-natively - frontier models wired
              into the work from the first session to production, governed and logged.
              It&apos;s why one person ships what used to take a team. Most businesses
              are still deciding whether to take AI seriously. You can hire someone
              who already has.
            </p>
            <p>
              Outside of software, I&apos;m a landscape and astrophotographer. Same
              instinct, different medium - finding the order in complexity.
            </p>
          </div>
          <figure style={{ margin: 0 }}>
            <div style={{ border: `1px solid ${LINE}`, borderRadius: '2px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ramsay-headshot.jpg"
                alt="Ramsay Hatfield, founder of CoreSentia"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <figcaption className="cap-mono" style={{ marginTop: '2.5mm' }}>
              Ramsay Hatfield - founder. Photographed by Ramsay.
            </figcaption>
          </figure>
        </div>

        <div style={{ marginTop: '10mm', borderTop: `1px solid ${LINE}`, paddingTop: '7mm' }}>
          <div className="cap-label" style={{ marginBottom: '3mm' }}>Start</div>
          <h3 className="cap-h3" style={{ marginBottom: '3mm' }}>Let&apos;s build something</h3>
          <p className="cap-body" style={{ maxWidth: '150mm', marginBottom: '7mm' }}>
            Start with a conversation. Tell us where work stalls, what you pay for and
            barely use, or what your transformation team already has mapped - and
            we&apos;ll tell you what we&apos;d build first. We respond within 24
            hours.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6mm',
              borderTop: `1px solid ${LINE}`,
              paddingTop: '5mm',
            }}
          >
            <div>
              <div className="cap-mono" style={{ marginBottom: '1.5mm' }}>Email</div>
              <div className="cap-body-sm" style={{ color: ACCENT }}>info@coresentia.com</div>
            </div>
            <div>
              <div className="cap-mono" style={{ marginBottom: '1.5mm' }}>Web</div>
              <div className="cap-body-sm">coresentia.com.au</div>
            </div>
            <div>
              <div className="cap-mono" style={{ marginBottom: '1.5mm' }}>Business</div>
              <div className="cap-body-sm">ABN 69 267 271 132 &middot; Brisbane, Queensland</div>
            </div>
          </div>
        </div>

        <PageFooter page="05" />
      </section>
    </div>
  )
}
