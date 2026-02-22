import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const links = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
  ]

  return (
    <footer className="border-t border-dark-border py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/CoreSentia_Transparent_Logo.png"
              alt="CoreSentia"
              width={625}
              height={125}
              className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-1 text-sm text-dt-tertiary flex-wrap justify-center">
            {links.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="mx-2 text-dark-border">&middot;</span>}
                <Link
                  href={link.href}
                  className="hover:text-dt-primary transition-colors"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Contact */}
          <Link
            href="mailto:info@coresentia.com"
            className="text-sm text-dt-tertiary hover:text-brand-accent transition-colors shrink-0"
          >
            info@coresentia.com
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-dt-tertiary">
          <p>&copy; {new Date().getFullYear()} CoreSentia</p>
          <p>ABN: 69 267 271 132 &middot; Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  )
}
