import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, DEMO_HOME, expectedToken, isOpen } from './gate'
import { TENANT } from './_lib/seed'
import EntrySignIn from './_components/EntrySignIn'

// /demo: the sign-in page. Already signed in lands on the tracker.
export default function DemoEntryPage({ searchParams }: { searchParams?: { wrong?: string } }) {
  if (isOpen(cookies().get(COOKIE_NAME)?.value)) redirect(DEMO_HOME)

  return (
    <main className="px-6 lg:px-8 pt-16 pb-24 lg:pt-24">
      <div className="max-w-6xl mx-auto">
        <Image
          src="/CoreSentia_Logo_Black_Text.png"
          alt="CoreSentia"
          width={625}
          height={125}
          className="h-9 w-auto"
          priority
        />
        <div className="section-label mt-20 mb-5">Demo tenant</div>
        <h1 className="text-4xl sm:text-5xl font-semibold font-display max-w-2xl">{TENANT.name}</h1>
        <p className="mt-6 max-w-xl text-lg">
          The platform tracker and the first module, purchase orders. Fictional company, fictional data.
        </p>
        <EntrySignIn wrong={searchParams?.wrong === '1'} configured={expectedToken() !== null} />
      </div>
    </main>
  )
}
