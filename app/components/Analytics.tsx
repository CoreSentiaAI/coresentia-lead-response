'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { captureUtm } from '../lib/track'

// Marketing tags - GA4 and Meta pixel. Both are env-gated: without
// NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID set (Vercel env), this
// component renders nothing and every helper in lib/track.ts no-ops.
// Loaded via next/script - no npm dependencies.
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Internal tools and the print artifact never fire marketing events
const EXCLUDED = /^\/(admin|dashboard|chat|login|onboarding|onboarding-professional|xero-auth|capability-document)/

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || EXCLUDED.test(pathname)) return
    captureUtm()
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void
      fbq?: (...args: unknown[]) => void
    }
    // Initial page_view is disabled in the config snippets below, so both
    // tags get every view (including the first) from this one effect and
    // SPA navigations are never missed or double-counted.
    if (GA_ID && typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: pathname })
    }
    if (PIXEL_ID && typeof w.fbq === 'function') {
      w.fbq('track', 'PageView')
    }
  }, [pathname])

  if (!GA_ID && !PIXEL_ID) return null

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');`}
        </Script>
      )}
    </>
  )
}
