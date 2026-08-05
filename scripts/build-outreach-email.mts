// Regenerate the manual outreach email template from the shared renderer.
// Run: npx tsx scripts/build-outreach-email.mts
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderCapabilityEmail } from '../app/lib/capability-email'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const html = renderCapabilityEmail({
  greeting: 'Hi [first name],',
  leadIn:
    '[Good to speak with you today - edit this line to fit.] As promised, here&#39;s an overview of what CoreSentia does - the capability document is attached.',
  includeRequestNote: false,
})

const instructions = `<!--
  CoreSentia - manual outreach email template
  ============================================
  For sending the capability document proactively (no form involved).

  How to use:
  1. Open this file in a browser.
  2. Select all (Cmd+A), copy (Cmd+C).
  3. Paste into a Gmail compose window from info@coresentia.com.
  4. Edit the two [bracketed] lines to fit the recipient.
  5. Attach public/CoreSentia-Capability.pdf.
  6. Suggested subject: "CoreSentia - capability document" or
     "Following up - CoreSentia capability document".

  Regenerate after design changes: npx tsx scripts/build-outreach-email.mts
-->
`

writeFileSync(join(root, 'docs', 'capability-outreach-email.html'), instructions + html)
console.log('Written: docs/capability-outreach-email.html')
