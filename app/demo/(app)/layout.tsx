import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, DEMO_PATH, isOpen } from '../gate'
import { DemoProvider } from '../_lib/store'
import DemoShell from '../_components/DemoShell'

// Every screen inside the demo sits behind the cookie set by /demo/unlock.
export default function DemoAppLayout({ children }: { children: React.ReactNode }) {
  if (!isOpen(cookies().get(COOKIE_NAME)?.value)) redirect(DEMO_PATH)
  return (
    <DemoProvider>
      <DemoShell>{children}</DemoShell>
    </DemoProvider>
  )
}
