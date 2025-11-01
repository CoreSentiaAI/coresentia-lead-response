'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    // Find the scroll container (the main content wrapper)
    const scrollContainer = document.querySelector('.snap-y') as HTMLElement

    if (!scrollContainer) return

    const onScroll = () => {
      const currentScrollY = scrollContainer.scrollTop
      const isMobile = window.innerWidth < 768

      // Update scrolled state for styling
      setScrolled(currentScrollY > 50)

      // Mobile: Only show header when near top (< 50px), otherwise keep hidden
      // Desktop: Show on scroll up, hide on scroll down
      if (isMobile) {
        if (currentScrollY > 50) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        // Desktop behavior: hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      }

      setLastScrollY(currentScrollY)
    }

    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return (
    <header
      style={{ backgroundColor: '#E5E7EB' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
      ${scrolled
        ? 'shadow-lg border-b border-brand-accent/30'
        : ''}
      ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center md:justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/CoreSentia_Original_Logo_Symbol_Cropped.png"
            alt="CoreSentia"
            width={80}
            height={80}
            className="transition-all duration-300"
          />
          <span className="text-5xl font-montserrat font-light tracking-wide15 text-text-primary">coresentia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="#packages"
            className="text-sm font-medium tracking-wider text-brand-primary px-4 py-2
              border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent
              transition-all duration-200"
          >
            Packages
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium tracking-wider text-brand-primary px-4 py-2
              border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent
              transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wider text-brand-primary px-4 py-2
              border-b-2 border-transparent hover:border-brand-accent hover:text-brand-accent
              transition-all duration-200"
          >
            Contact
          </Link>
          <Link
            href="/chat/homepage-visitor"
            className="ml-4 px-6 py-2 bg-brand-accent text-white font-semibold rounded-full
              hover:bg-brand-accent-hover hover:shadow-lg
              transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
