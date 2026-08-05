// Branded HTML email for the capability document - warm-paper palette
// (dark mode is unreliable in email clients), Georgia standing in for
// Fraunces/Newsreader, Courier for the mono labels. Table-based with inline
// styles for client compatibility. Used by /api/capability-request for the
// gated delivery, and by scripts/build-outreach-email.mts to produce the
// manual outreach template.

const PAPER = '#f7f5f0'
const CARD = '#fcfbf8'
const LINE = '#e2ded4'
const INK = '#161615'
const ACCENT = '#0a72b2'

export const CAPABILITY_PDF_FILENAME = 'CoreSentia-Capability.pdf'
export const CAPABILITY_PDF_PATH = '/CoreSentia-Capability.pdf'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const monoLabel = `font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${INK};`
const serifBody = `font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.65; color: ${INK};`

export interface CapabilityEmailOptions {
  greeting: string
  leadIn: string
  // The gated flow explains why the email arrived; manual outreach doesn't need to.
  includeRequestNote: boolean
}

export function renderCapabilityEmail({ greeting, leadIn, includeRequestNote }: CapabilityEmailOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>CoreSentia capability document</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAPER}" style="background-color: ${PAPER};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD}" style="width: 560px; max-width: 100%; background-color: ${CARD}; border: 1px solid ${LINE}; border-radius: 4px;">
          <tr>
            <td style="padding: 36px 40px 0;">
              <img src="https://www.coresentia.com.au/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width="150" style="display: block; width: 150px; height: auto; border: 0;">
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 40px 0;">
              <div style="border-top: 1px solid ${LINE}; padding-top: 24px;">
                <div style="${monoLabel}">Capability document</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 40px 0;">
              <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 27px; line-height: 1.15; font-weight: bold; color: ${INK};">
                We make good businesses run better
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 0;">
              <p style="${serifBody} margin: 0 0 16px;">${greeting}</p>
              <p style="${serifBody} margin: 0 0 16px;">${leadIn}</p>
              <p style="${serifBody} margin: 0 0 16px;">
                Five pages: what we build, how we work, and the proof behind it.
                The short version - we replace the spreadsheets and SaaS sprawl
                good businesses run on with one intelligent platform, built in
                weeks, not years.
              </p>
              <p style="${serifBody} margin: 0 0 16px;">
                If anything in there maps to a problem you&#39;re carrying, reply
                to this email. I respond within 24 hours.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 40px 36px;">
              <p style="${serifBody} margin: 0 0 4px;">Ramsay Hatfield</p>
              <div style="${monoLabel} margin-bottom: 14px;">Founder, CoreSentia</div>
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 12px; letter-spacing: 1px; color: ${INK};">
                <a href="mailto:info@coresentia.com" style="color: ${ACCENT}; text-decoration: none;">info@coresentia.com</a>
                &nbsp;&middot;&nbsp;
                <a href="https://www.coresentia.com.au" style="color: ${ACCENT}; text-decoration: none;">coresentia.com.au</a>
              </div>
            </td>
          </tr>
        </table>
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width: 560px; max-width: 100%;">
          <tr>
            <td style="padding: 20px 8px 0; font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 1px; line-height: 1.7; color: ${INK};">
              CoreSentia &middot; ABN 69 267 271 132 &middot; Brisbane, Queensland, Australia${
                includeRequestNote
                  ? `<br>You are receiving this because you requested our capability document at coresentia.com.au. No automated follow-ups, no list.`
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Delivery email for the gated request flow.
export function renderDeliveryEmail(firstName: string): string {
  return renderCapabilityEmail({
    greeting: `Hi ${escapeHtml(firstName)},`,
    leadIn: 'Thanks for requesting our capability document - it&#39;s attached.',
    includeRequestNote: true,
  })
}
