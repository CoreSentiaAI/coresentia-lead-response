import { Suspense } from 'react'
import Tracker from '../../_components/Tracker'

export default function TrackerPage() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  )
}
