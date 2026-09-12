'use client'
import { useState } from 'react'
import MicrosoftSignInButton from './MicrosoftSignInButton'
import { DEMO_PATH } from '../gate'
import { Button, Field, inputClass } from './ui'

// Sign-in card body. The Microsoft button is the primary action and is inert
// in the demo; the password form is the working fallback.
export default function EntrySignIn({ wrong, configured }: { wrong: boolean; configured: boolean }) {
  const [note, setNote] = useState(false)
  const [showForm, setShowForm] = useState(wrong)

  return (
    <div className="mt-6">
      <MicrosoftSignInButton
        className="w-full justify-center"
        onClick={() => {
          setNote(true)
          setShowForm(true)
        }}
      />

      {note && <p className="mt-3 text-[12.5px] text-pm-muted">Entra ID sign-in is configured per client. Use the demo password below.</p>}

      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)} className="mt-4 text-[13px] font-medium text-pm-primary hover:underline underline-offset-4">
          Use the demo password
        </button>
      )}

      {showForm && (
        <form method="post" action={`${DEMO_PATH}/unlock`} className="mt-6">
          <Field label="Demo password">
            <input type="password" id="demo-password" name="password" required autoComplete="off" autoFocus className={inputClass} />
          </Field>
          {wrong && <p className="mt-2 text-[12.5px] text-[#9b2c2c]">Not it. Ask Ramsay.</p>}
          {!configured && <p className="mt-2 text-[12.5px] text-pm-muted">No demo password is set in this environment.</p>}
          <Button type="submit" variant="primary" className="mt-4 w-full">
            Open the demo
          </Button>
        </form>
      )}
    </div>
  )
}
