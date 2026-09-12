import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, DEMO_PATH, isOpen } from '../gate'
import { DemoProvider } from '../_lib/store'
import MockShell from '../_components/MockShell'

// Production mock-ups open in their own tab, outside the tracker shell, so
// they read as the client's module rather than part of the tracker demo.
// Same cookie gate, same in-browser state.
export default function MockLayout({ children }: { children: React.ReactNode }) {
  if (!isOpen(cookies().get(COOKIE_NAME)?.value)) redirect(DEMO_PATH)
  return (
    <DemoProvider>
      <MockShell>{children}</MockShell>
    </DemoProvider>
  )
}
