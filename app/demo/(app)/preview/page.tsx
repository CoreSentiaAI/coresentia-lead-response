import { Suspense } from 'react'
import DevicePreview from '../../_components/DevicePreview'

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <DevicePreview />
    </Suspense>
  )
}
