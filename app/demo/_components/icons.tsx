'use client'

export type IconName = 'board' | 'grid' | 'collapse' | 'expand' | 'desktop' | 'tablet' | 'phone' | 'receipt' | 'chevron' | 'spark' | 'close' | 'bell'

// Small stroke icons, 16px grid, drawn inline so nothing loads.
export function Icon({ name, size = 16, className = '' }: { name: IconName; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, className }
  switch (name) {
    case 'board':
      return (
        <svg {...common}>
          <rect x="2" y="2.5" width="3.5" height="11" rx="0.8" />
          <rect x="6.25" y="2.5" width="3.5" height="7" rx="0.8" />
          <rect x="10.5" y="2.5" width="3.5" height="9" rx="0.8" />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="5" height="5" rx="0.8" />
          <rect x="9" y="2" width="5" height="5" rx="0.8" />
          <rect x="2" y="9" width="5" height="5" rx="0.8" />
          <rect x="9" y="9" width="5" height="5" rx="0.8" />
        </svg>
      )
    case 'desktop':
      return (
        <svg {...common}>
          <rect x="1.5" y="2.5" width="13" height="8.5" rx="1.2" />
          <path d="M6 13.5h4M8 11v2.5" />
        </svg>
      )
    case 'tablet':
      return (
        <svg {...common}>
          <rect x="2.5" y="1.5" width="11" height="13" rx="1.6" />
          <path d="M7 12.5h2" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <rect x="4.5" y="1.5" width="7" height="13" rx="1.6" />
          <path d="M7 12.5h2" />
        </svg>
      )
    case 'receipt':
      return (
        <svg {...common}>
          <path d="M3.5 2h9v12l-1.8-1.2-1.8 1.2-1.9-1.2L5.3 14l-1.8-1.2V2Z" />
          <path d="M5.8 5.5h4.4M5.8 8h4.4M5.8 10.5h2.6" />
        </svg>
      )
    case 'chevron':
      return (
        <svg {...common}>
          <path d="M4 6l4 4 4-4" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...common}>
          <path d="M8 1.8l1.5 3.9 3.9 1.5-3.9 1.5L8 12.6 6.5 8.7 2.6 7.2l3.9-1.5L8 1.8Z" />
          <path d="M12.8 11.2l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M4 11.5V7.8a4 4 0 0 1 8 0v3.7l1.2 1.4H2.8L4 11.5Z" />
          <path d="M6.6 14.2a1.5 1.5 0 0 0 2.8 0" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      )
    case 'collapse':
      return (
        <svg {...common}>
          <path d="M10 3L5 8l5 5" />
          <path d="M13 3v10" />
        </svg>
      )
    case 'expand':
    default:
      return (
        <svg {...common}>
          <path d="M6 3l5 5-5 5" />
          <path d="M3 3v10" />
        </svg>
      )
  }
}
