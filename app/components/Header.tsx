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
        ? 'bg-black/70 backdrop-blur-lg shadow-[0_4px_30px_rgba(98,212,249,0.1)] border-b border-[#62D4F9]/20' 
        : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center md:justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/CoreSentia_Transparent_Logo.png" 
            alt="CoreSentia" 
            width={400} 
            height={160}
            className={`transition-all duration-300 ${
              scrolled ? 'drop-shadow-[0_0_8px_rgba(98,212,249,0.5)]' : ''
            }`}
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          <Link 
            href="/about" 
            className="text-sm font-medium tracking-wider text-white/80 px-4 py-2 
              border-b-2 border-transparent hover:border-[#62D4F9] hover:text-[#62D4F9] 
              transition-all duration-200"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium tracking-wider text-white/80 px-4 py-2 
              border-b-2 border-transparent hover:border-[#62D4F9] hover:text-[#62D4F9] 
              transition-all duration-200"
          >
            Contact
          </Link>
          <Link 
            href="/chat/homepage-visitor" 
            className="ml-4 px-6 py-2 bg-[#62D4F9] text-black font-semibold rounded-full 
              hover:bg-[#40FFD9] hover:shadow-[0_0_20px_rgba(98,212,249,0.6)] 
              transition-all duration-300 transform hover:scale-105"
          >
            Chat with Ivy
          </Link>
        </nav>
      </div>
      
      {/* Optional animated border line */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r 
          from-transparent via-[#62D4F9] to-transparent opacity-50 
          animate-pulse"
        />
      )}
    </header>
  )
}
