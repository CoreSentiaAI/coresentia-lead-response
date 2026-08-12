import Link from 'next/link'
import Image from 'next/image'
import { SMALL_SITES_LIVE } from '../lib/site'

export default function Footer() {
  const links = [
    { href: '/projects', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/capability', label: 'Capability document' },
    { href: '/ai-data-protection', label: 'AI & data protection' },
    // Productised small-site tier - also in the header nav (Header.tsx), both gated on this flag
    ...(SMALL_SITES_LIVE
      ? [{ href: '/small-business-websites', label: 'Small business websites' }]
      : []),
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
  ]

  return (
    <footer className="border-t border-line-soft py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/CoreSentia_Transparent_Logo.png"
              alt="CoreSentia"
              width={625}
              height={125}
              className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity dark-only"
            />
            <Image
              src="/CoreSentia_Logo_Black_Text.png"
              alt="CoreSentia"
              width={625}
              height={125}
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity light-only"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-1 text-ink-3 flex-wrap justify-center">
            {links.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="mx-2 text-line-strong">&middot;</span>}
                <Link
                  href={link.href}
                  className="btn hover:text-ink-1 transition-colors"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Contact */}
          <Link
            href="mailto:info@coresentia.com.au"
            className="text-sm text-ink-3 hover:text-accent-ink transition-colors shrink-0 font-mono"
          >
            info@coresentia.com.au
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-line-soft flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-3 font-mono">
          <p>&copy; {new Date().getFullYear()} CoreSentia</p>
          <p>ABN: 69 267 271 132 &middot; Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  )
}
