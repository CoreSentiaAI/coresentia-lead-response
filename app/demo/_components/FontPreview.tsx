'use client'
import { useEffect } from 'react'

const MAP: Record<string, string> = {
  plexserif: 'var(--font-cmp-plexserif)',
  sourceserif: 'var(--font-cmp-sourceserif)',
  zilla: 'var(--font-cmp-zilla)',
}

export default function FontPreview() {
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('font') ?? ''
    const root = document.querySelector<HTMLElement>('.pm')
    if (!root) return
    if (MAP[key]) root.style.setProperty('--font-pm', MAP[key])
  }, [])
  return null
}
