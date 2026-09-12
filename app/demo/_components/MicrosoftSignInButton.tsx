'use client'

// "Sign in with Microsoft" per Microsoft's sign-in button guidelines: the
// four-square logo at 21px, 12px padding, 41px tall, Segoe UI semibold 15px,
// light theme (white, #8C8C8C border, #5E5E5E text). Brand colours are fixed
// on purpose; they do not follow the site theme.
//
// Wiring it to a real tenancy later is a one-file change: replace onClick
// with supabase.auth.signInWithOAuth({ provider: 'azure', options: { scopes: 'email' } })
// or the MSAL equivalent, and pass the Entra app registration for the client.

type Props = {
  onClick?: () => void
  label?: string
  className?: string
}

export function MicrosoftLogo({ size = 21 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}

export default function MicrosoftSignInButton({ onClick, label = 'Sign in with Microsoft', className = '' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none transition-colors ${className}`}
      style={{
        height: 41,
        padding: '0 12px',
        background: '#ffffff',
        border: '1px solid #8c8c8c',
        color: '#5e5e5e',
        fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1,
        borderRadius: 0,
      }}
    >
      <MicrosoftLogo />
      <span>{label}</span>
    </button>
  )
}
