'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
      ${scrolled
        ? 'bg-brand-navy/98 backdrop-blur-lg shadow-lg border-b border-brand-orange/30'
        : 'bg-brand-navy/95 backdrop-blur-sm'}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center md:justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/CoreSentia_Transparent_Logo.png"
            alt="CoreSentia"
            width={400}
            height={160}
            className="transition-all duration-300"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="#packages"
            className="text-sm font-medium tracking-wider text-white px-4 py-2
              border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange
              transition-all duration-200"
          >
            Packages
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium tracking-wider text-white px-4 py-2
              border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange
              transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wider text-white px-4 py-2
              border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange
              transition-all duration-200"
          >
            Contact
          </Link>
          <Link
            href="/chat/homepage-visitor"
            className="ml-4 px-6 py-2 bg-brand-orange text-white font-semibold rounded-full
              hover:bg-orange-600 hover:shadow-lg
              transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
