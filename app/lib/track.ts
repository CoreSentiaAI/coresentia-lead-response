// Client-side marketing measurement helpers. Everything here must fail
// silently - analytics can never break a form or a page. The tags
// themselves load in components/Analytics.tsx only when the env IDs are
// set, so all of this no-ops until then.

const UTM_KEY = 'cs-utm'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']

// First-touch attribution: capture UTM/click IDs once per browser session
// so a lead that lands on an ad page and converts three pages later still
// carries its source.
export function captureUtm(): void {
  try {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(UTM_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const key of UTM_PARAMS) {
      const value = params.get(key)
      if (value) utm[key] = value.slice(0, 200)
    }
    if (Object.keys(utm).length === 0) return
    utm.landing_page = window.location.pathname
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
  } catch {
    // storage unavailable (private mode etc.) - attribution is best-effort
  }
}

export function getUtm(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(UTM_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Fire a lead conversion to whichever tags are loaded.
export function trackLead(kind: 'contact' | 'capability', page: string): void {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void
      fbq?: (...args: unknown[]) => void
    }
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'generate_lead', { lead_type: kind, page_path: page })
    }
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'Lead', { content_name: kind, content_category: page })
    }
  } catch {
    // never let analytics interfere with the submission UX
  }
}
