'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  // null until mounted so SSR markup never disagrees with the applied theme
  const [light, setLight] = useState<boolean | null>(null)

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'))
  }, [])

  const toggle = () => {
    const next = !(light ?? false)
    document.documentElement.classList.toggle('light', next)
    try {
      localStorage.setItem('cs-theme', next ? 'light' : 'dark')
    } catch {}
    setLight(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`p-2 rounded-sm text-ink-3 hover:text-ink-1 hover:bg-surface-raised transition-colors ${className}`}
    >
      {light === null ? (
        <span className="block w-5 h-5" />
      ) : light ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}
