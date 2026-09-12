import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, DEMO_HOME, expectedToken, isOpen } from './gate'
import EntrySignIn from './_components/EntrySignIn'

// /demo: the sign-in page. Already signed in lands on the tracker.
export default function DemoEntryPage({ searchParams }: { searchParams?: { wrong?: string } }) {
  if (isOpen(cookies().get(COOKIE_NAME)?.value)) redirect(DEMO_HOME)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] bg-pm-surface border border-pm-border rounded-lg shadow-[0_8px_30px_rgba(16,24,40,0.08)] p-8">
        <Image src="/CoreSentia_Logo_Black_Text.png" alt="CoreSentia" width={625} height={125} className="h-7 w-auto" priority />
        <h1 className="mt-8 text-[20px] font-semibold">Sign in</h1>
        <p className="mt-1.5 text-[13px] text-pm-muted">An example project management tool and a first platform module. Fictional data.</p>
        <EntrySignIn wrong={searchParams?.wrong === '1'} configured={expectedToken() !== null} />
      </div>
      <p className="mt-6 text-[12px] text-pm-muted">
        <Link href="/" className="hover:text-pm-text">
          coresentia.com.au
        </Link>
      </p>
    </main>
  )
}
