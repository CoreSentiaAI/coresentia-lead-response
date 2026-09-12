'use client'
import { useState } from 'react'
import Link from 'next/link'
import MicrosoftSignInButton from './MicrosoftSignInButton'
import { DEMO_PATH } from '../gate'

// Entry page body. The Microsoft button is the primary action and is inert
// in the demo; the password form is the working fallback.
export default function EntrySignIn({ wrong, configured }: { wrong: boolean; configured: boolean }) {
  const [note, setNote] = useState(false)
  const [showForm, setShowForm] = useState(wrong)

  return (
    <div className="mt-10 max-w-sm">
      <MicrosoftSignInButton
        onClick={() => {
          setNote(true)
          setShowForm(true)
        }}
      />

      {note && (
        <p className="mt-4 font-mono text-xs leading-relaxed">
          Entra ID sign-in is configured per client tenancy. Use the demo password below.
        </p>
      )}

      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="btn mt-6 block text-accent-ink hover:underline underline-offset-4"
        >
          Use the demo password
        </button>
      )}

      {showForm && (
        <form method="post" action={`${DEMO_PATH}/unlock`} className="mt-8">
          <label htmlFor="demo-password" className="btn block mb-2">
            Demo password
          </label>
          <input
            type="password"
            id="demo-password"
            name="password"
            required
            autoComplete="off"
            autoFocus
            className="w-full px-4 py-3 bg-surface-raised border border-line-strong rounded-sm font-mono
              focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          />
          {wrong && <p className="mt-3 font-mono text-sm text-accent-ink">Not it. Ask Ramsay.</p>}
          {!configured && (
            <p className="mt-3 font-mono text-xs">No demo password is set in this environment.</p>
          )}
          <button
            type="submit"
            className="btn mt-6 inline-flex items-center justify-center bg-accent text-[#0d0d0c] font-medium rounded-sm px-10 py-4 hover:bg-[#4dc4e8] transition-colors"
          >
            Open the demo
          </button>
        </form>
      )}

      <p className="mt-12 font-mono text-xs">
        <Link href="/" className="hover:underline underline-offset-4">
          coresentia.com.au
        </Link>
      </p>
    </div>
  )
}
