'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

function Logo({ className }: { className: string }) {
  return (
    <>
      <Image
        src="/CoreSentia_Transparent_Logo.png"
        alt="CoreSentia"
        width={625}
        height={125}
        className={`${className} dark-only`}
        priority
      />
      <Image
        src="/CoreSentia_Logo_Black_Text.png"
        alt="CoreSentia"
        width={625}
        height={125}
        className={`${className} light-only`}
        priority
      />
    </>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { href: '/projects', label: 'Work' },
    { href: '/about', label: 'About' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out
        ${scrolled
          ? 'header-scrim backdrop-blur-sm border-b border-line-soft'
          : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 md:h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 font-display">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-3 px-4 py-2
                  hover:text-ink-1
                  transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle className="ml-1" />
            <Link
              href="/#contact"
              className="ml-3 px-5 py-2 bg-accent text-[#0d0d0c] font-medium rounded-sm
                hover:bg-[#4dc4e8]
                transition-colors duration-200 text-sm"
            >
              Start a project
            </Link>
          </nav>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-ink-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 overlay-scrim md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 font-display">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-ink-1 hover:text-accent-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-accent text-[#0d0d0c] font-medium rounded-sm
                hover:bg-[#4dc4e8] transition-colors duration-300 text-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
