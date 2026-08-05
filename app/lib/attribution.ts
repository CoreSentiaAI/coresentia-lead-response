// Format the optional page/UTM payload sent by the forms into lines for
// the lead notification emails. Plain text only - values are user-supplied.

const clean = (value: unknown) => String(value).replace(/[\r\n]/g, ' ').slice(0, 200)

export function attributionLines(page: unknown, utm: unknown): string[] {
  const lines: string[] = []
  if (page && typeof page === 'string') {
    lines.push(`Submitted from: ${clean(page)}`)
  }
  if (utm && typeof utm === 'object') {
    const u = utm as Record<string, unknown>
    if (u.utm_source) {
      lines.push(
        `Source: ${clean(u.utm_source)} / ${u.utm_medium ? clean(u.utm_medium) : '-'} / ${u.utm_campaign ? clean(u.utm_campaign) : '-'}`
      )
    }
    if (u.utm_term) lines.push(`Search term: ${clean(u.utm_term)}`)
    if (u.landing_page) lines.push(`Landed on: ${clean(u.landing_page)}`)
    if (u.gclid) lines.push('Paid click: Google Ads')
    else if (u.fbclid) lines.push('Paid click: Meta')
  }
  return lines
}
