'use client'
import { useEffect } from 'react'

// The demo is always light. The root boot script handles a fresh load;
// this covers client-side navigation in and out of /demo.
export default function ForceLight() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('light')
    return () => {
      try {
        if (localStorage.getItem('cs-theme') !== 'light') root.classList.remove('light')
      } catch {
        root.classList.remove('light')
      }
    }
  }, [])
  return null
}
