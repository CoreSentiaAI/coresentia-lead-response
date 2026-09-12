'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Tabs } from './ui'

// Renders the live demo inside a device frame. The frame holds a real iframe
// of the app, so the phone or tablet layout is the genuine responsive build,
// not a picture of it. Same cookie, same in-browser state.

type DeviceKey = 'phone' | 'tablet'
type Orient = 'portrait' | 'landscape'

const DEVICES: Record<DeviceKey, { name: string; w: number; h: number; bezel: number; radius: number; status: number; home: number }> = {
  phone: { name: 'Phone', w: 390, h: 844, bezel: 12, radius: 52, status: 48, home: 30 },
  tablet: { name: 'Tablet', w: 820, h: 1180, bezel: 20, radius: 26, status: 26, home: 0 },
}

const SCREENS = [
  { value: '/demo/tracker', label: 'Tracker' },
  { value: '/demo/platform', label: 'Platform' },
  { value: '/demo/purchase-orders', label: 'Purchase orders mock-up' },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit', hour12: false }).format(new Date()))
    tick()
    const t = setInterval(tick, 15000)
    return () => clearInterval(t)
  }, [])
  return time
}

export default function DevicePreview() {
  const params = useSearchParams()
  const router = useRouter()
  const device = (params.get('device') === 'tablet' ? 'tablet' : 'phone') as DeviceKey
  const orient = (params.get('orient') === 'landscape' ? 'landscape' : 'portrait') as Orient
  const path = SCREENS.some((s) => s.value === params.get('path')) ? (params.get('path') as string) : '/demo/tracker'

  const set = (next: Partial<{ device: DeviceKey; orient: Orient; path: string }>) => {
    const q = new URLSearchParams({ device, orient, path, ...next })
    router.replace(`/demo/preview?${q.toString()}`)
  }

  const spec = DEVICES[device]
  const landscape = orient === 'landscape'
  const screenW = landscape ? spec.h : spec.w
  const screenH = landscape ? spec.w : spec.h
  const frameW = screenW + spec.bezel * 2
  const frameH = screenH + spec.bezel * 2

  const areaRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const fit = () => {
      const r = el.getBoundingClientRect()
      setScale(Math.min(1, (r.width - 48) / frameW, (r.height - 48) / frameH))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [frameW, frameH])

  const time = useClock()
  const isPhone = device === 'phone'
  const key = `${device}-${orient}`

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <div className="bg-pm-surface border-b border-pm-border px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
        <Tabs
          value={device}
          onChange={(v) => set({ device: v })}
          options={[
            { value: 'phone', label: 'Phone' },
            { value: 'tablet', label: 'Tablet' },
          ]}
        />
        <Button size="sm" onClick={() => set({ orient: landscape ? 'portrait' : 'landscape' })}>
          Rotate
        </Button>
        <span className="text-[12px] text-pm-muted font-pm-mono">
          {screenW} x {screenH}
        </span>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-[12px] text-pm-muted">Showing</span>
          <Tabs value={path} onChange={(v) => set({ path: v })} options={SCREENS} />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href={path} target="_blank" rel="noreferrer" className="text-[12.5px] font-medium text-pm-primary hover:underline underline-offset-4">
            Open full size
          </a>
          <Button variant="primary" size="sm" onClick={() => router.push(path)}>
            Back to desktop
          </Button>
        </div>
      </div>

      <div
        ref={areaRef}
        className="flex-1 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: '#eef0f4',
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(45,91,209,0.10), rgba(45,91,209,0) 55%), radial-gradient(rgba(28,36,48,0.10) 1px, transparent 1px)',
          backgroundSize: 'auto, 22px 22px',
          minHeight: 'calc(100vh - 57px)',
        }}
      >
        <div key={key} className="pm-pop" style={{ width: frameW * scale, height: frameH * scale }}>
          <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: frameW, height: frameH }}>
            {/* Device body */}
            <div
              className="relative w-full h-full"
              style={{
                borderRadius: spec.radius + spec.bezel,
                background: 'linear-gradient(160deg, #343e4d 0%, #1b222d 45%, #0f141c 100%)',
                boxShadow: '0 40px 90px rgba(16,24,40,0.38), 0 8px 24px rgba(16,24,40,0.22), inset 0 0 0 1.5px rgba(255,255,255,0.10), inset 0 0 0 4px rgba(0,0,0,0.35)',
              }}
            >
              {/* Side keys */}
              {isPhone && !landscape && (
                <>
                  <span className="absolute -left-[3px] top-[120px] h-[34px] w-[3px] rounded-l bg-[#2a3341]" />
                  <span className="absolute -left-[3px] top-[176px] h-[64px] w-[3px] rounded-l bg-[#2a3341]" />
                  <span className="absolute -left-[3px] top-[252px] h-[64px] w-[3px] rounded-l bg-[#2a3341]" />
                  <span className="absolute -right-[3px] top-[200px] h-[96px] w-[3px] rounded-r bg-[#2a3341]" />
                </>
              )}
              {/* Screen */}
              <div className="absolute overflow-hidden bg-white" style={{ inset: spec.bezel, borderRadius: spec.radius }}>
                {/* Status bar */}
                <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-white text-[#1c2430]" style={{ height: spec.status, padding: isPhone ? '0 28px' : '0 18px', fontSize: isPhone ? 15 : 12, fontWeight: 600 }}>
                  <span style={{ paddingTop: isPhone ? 10 : 0 }}>{time}</span>
                  <span className="flex items-center gap-1.5" style={{ paddingTop: isPhone ? 10 : 0 }}>
                    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
                      <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#1c2430" />
                      <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="#1c2430" />
                      <rect x="10" y="3" width="3" height="9" rx="0.8" fill="#1c2430" />
                      <rect x="15" y="0" width="3" height="12" rx="0.8" fill="#1c2430" />
                    </svg>
                    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                      <path d="M8 11.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm-3.2-3.4a4.6 4.6 0 0 1 6.4 0l-1.1 1.1a3 3 0 0 0-4.2 0l-1.1-1.1Zm-2.5-2.5a8.1 8.1 0 0 1 11.4 0l-1.1 1.1a6.5 6.5 0 0 0-9.2 0L2.3 5.3ZM0 2.8a11.5 11.5 0 0 1 16 0l-1.1 1.1a10 10 0 0 0-13.8 0L0 2.8Z" fill="#1c2430" />
                    </svg>
                    <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="22" height="12" rx="3" fill="none" stroke="#1c2430" strokeOpacity="0.4" />
                      <rect x="2" y="2" width="17" height="9" rx="1.8" fill="#1c2430" />
                      <path d="M24.5 4.5v4a2 2 0 0 0 0-4Z" fill="#1c2430" fillOpacity="0.4" />
                    </svg>
                  </span>
                </div>
                {/* Dynamic island or camera */}
                {isPhone ? (
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#0b0f14]" style={{ top: 11, width: 122, height: 34, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #2e3b52, #0b0f14 70%)' }} />
                  </div>
                ) : (
                  <span className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ top: 8, width: 8, height: 8, background: 'radial-gradient(circle at 35% 35%, #2e3b52, #0b0f14 70%)', boxShadow: '0 0 0 2px rgba(0,0,0,0.5)' }} />
                )}
                {/* The live app */}
                <iframe
                  key={key + path}
                  src={path}
                  title={`${spec.name} preview`}
                  className="absolute left-0 right-0 border-0 bg-white"
                  style={{ top: spec.status, height: screenH - spec.status - spec.home, width: screenW }}
                />
                {/* Home indicator */}
                {spec.home > 0 && (
                  <div className="absolute left-0 right-0 bottom-0 bg-white flex items-end justify-center" style={{ height: spec.home, paddingBottom: 8 }}>
                    <span className="h-[5px] w-[134px] rounded-full bg-[#1c2430]/80" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
