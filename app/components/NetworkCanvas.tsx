'use client'

import React, { useRef, useEffect } from 'react'

type NetworkCanvasProps = {
  density?: number
  maxDist?: number
  lineWidth?: number
  nodeEmphasis?: number
  accentMode?: 'cyan' | 'blue' | 'aqua' | 'mixed'
}

const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  CYAN: '#62D4F9',
  BLUE: '#2A50DF',
  AQUA: '#40FFD9',
}

const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  density = 0.5,
  maxDist = 150,
  lineWidth = 1.0,
  nodeEmphasis = 0.45,
  accentMode = 'cyan',
}) => {
  const bgRef = useRef<HTMLCanvasElement>(null)
  const fgRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouse = useRef({ x: -9999, y: -9999, r: 110 })

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    const bg = bgRef.current
    const fg = fgRef.current
    if (!bg || !fg) return

    // Try to get context with error handling
    let bgCtx: CanvasRenderingContext2D | null = null
    let ctx: CanvasRenderingContext2D | null = null
    
    try {
      bgCtx = bg.getContext('2d')
      ctx = fg.getContext('2d')
    } catch (e) {
      console.error('Failed to get canvas context:', e)
      return
    }

    if (!bgCtx || !ctx) {
      console.error('Canvas context is null')
      return
    }

    // Now TypeScript knows these are non-null
    const bgContext = bgCtx
    const context = ctx

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    let w = window.innerWidth
    let h = window.innerHeight

    const drawBackground = () => {
      bgContext.fillStyle = COLORS.BLACK
      bgContext.fillRect(0, 0, w, h)
    }

    const setSize = () => {
      w = window.innerWidth
      h = window.innerHeight
      bg.width = Math.round(w * dpr)
      bg.height = Math.round(h * dpr)
      fg.width = Math.round(w * dpr)
      fg.height = Math.round(h * dpr)
      bg.style.width = `${w}px`
      bg.style.height = `${h}px`
      fg.style.width = `${w}px`
      fg.style.height = `${h}px`
      bgContext.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawBackground()
      rebuild()
    }
    setSize()

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setSize()
      start()
    }
    window.addEventListener('resize', onResize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; seed: number }
    let particles: P[] = []

    const cellSize = 90
    let cols = 0
    let rows = 0
    let grid: number[][][] = []
    const maxD2 = maxDist * maxDist

    const area = () => Math.max(1, w * h)

    function rebuild() {
      const count = Math.floor((area() / 20000) * density)
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reduceMotion ? 0.06 : 0.16),
        vy: (Math.random() - 0.5) * (reduceMotion ? 0.06 : 0.16),
        r: Math.random() * 1.2 + 0.6,
        seed: Math.random() * Math.PI * 2,
      }))
      cols = Math.max(1, Math.ceil(w / cellSize))
      rows = Math.max(1, Math.ceil(h / cellSize))
      grid = new Array(cols).fill(0).map(() => new Array(rows).fill(0).map(() => []))
    }

    function indexGrid() {
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) grid[c][r] = []
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const c = Math.min(cols - 1, Math.max(0, Math.floor(p.x / cellSize)))
        const r = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cellSize)))
        grid[c][r].push(i)
      }
    }

    function chooseAccent(aSeed: number) {
      if (accentMode === 'cyan') return COLORS.CYAN
      if (accentMode === 'blue') return COLORS.BLUE
      if (accentMode === 'aqua') return COLORS.AQUA
      const v = Math.abs(Math.sin(aSeed * 7.13))
      if (v < 0.34) return COLORS.CYAN
      if (v < 0.67) return COLORS.BLUE
      return COLORS.AQUA
    }

    function rgba(hex: string, a: number) {
      if (hex.startsWith('rgb')) {
        const parts = hex.replace(/[rgba()]/g, '').split(',').map(s => s.trim())
        const [r, g, b] = parts.map((v, i) => (i < 3 ? parseFloat(v) : 0))
        return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`
      }
      let h = hex.replace('#', '')
      if (h.length === 3) h = h.split('').map(ch => ch + ch).join('')
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`
    }

    function drawFrame(t: number) {
      context.clearRect(0, 0, w, h)

      // Update particles
      for (let p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < -12) p.x = w + 12
        else if (p.x > w + 12) p.x = -12
        if (p.y < -12) p.y = h + 12
        else if (p.y > h + 12) p.y = -12

        if (!reduceMotion) {
          const s = Math.sin(t * 0.00035 + p.seed)
          p.vx += s * 0.00035
          p.vy -= s * 0.00035
        }

        const dxm = p.x - mouse.current.x
        const dym = p.y - mouse.current.y
        const d2m = dxm * dxm + dym * dym
        if (d2m < mouse.current.r * mouse.current.r) {
          const f = 0.0012 * (1 - Math.sqrt(d2m) / mouse.current.r)
          p.vx += dxm * f
          p.vy += dym * f
        }
      }

      indexGrid()

      // Lines
      context.lineCap = 'round'
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ids = grid[c][r]
          for (let dc = -1; dc <= 1; dc++) {
            for (let dr = -1; dr <= 1; dr++) {
              const nc = c + dc
              const nr = r + dr
              if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue
              const neigh = grid[nc][nr]
              for (let i = 0; i < ids.length; i++) {
                const a = particles[ids[i]]
                for (let j = 0; j < neigh.length; j++) {
                  const b = particles[neigh[j]]
                  if (a === b) continue
                  const dx = a.x - b.x
                  const dy = a.y - b.y
                  const d2 = dx * dx + dy * dy
                  if (d2 < maxD2) {
                    const d = Math.sqrt(d2)
                    const tight = 1 - d / maxDist
                    const midx = (a.x + b.x) * 0.5
                    const midy = (a.y + b.y) * 0.5
                    const mdx = midx - mouse.current.x
                    const mdy = midy - mouse.current.y
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
                    const nearMouse = mDist < mouse.current.r * 1.1
                    const color = nearMouse ? chooseAccent(a.seed + b.seed) : COLORS.WHITE

                    context.lineWidth = lineWidth * (0.6 + 1.6 * tight)
                    context.strokeStyle = rgba(color, 0.9 - 0.5 * (d / maxDist))
                    context.beginPath()
                    context.moveTo(a.x, a.y)
                    context.lineTo(b.x, b.y)
                    context.stroke()
                  }
                }
              }
            }
          }
        }
      }

      // Dots
      if (nodeEmphasis > 0) {
        for (let p of particles) {
          const useAccent = Math.abs(Math.sin(p.seed * 5.7)) > 0.92
          const color =
            useAccent && accentMode !== 'cyan' ? chooseAccent(p.seed) : COLORS.WHITE
          context.fillStyle = rgba(color, 0.9 * nodeEmphasis)
          context.beginPath()
          context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          context.fill()
        }
      }
    }

    function start() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const loop = (t: number) => {
        try {
          drawFrame(t)
          rafRef.current = requestAnimationFrame(loop)
        } catch (e) {
          console.error('Error in animation loop:', e)
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    drawBackground()
    rebuild()
    start()

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [density, maxDist, lineWidth, nodeEmphasis, accentMode])

  // Don't render anything if we're not in the browser
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <>
      <canvas
        ref={bgRef}
        style={{ position: 'fixed', inset: 0, zIndex: -2, width: '100%', height: '100%', background: COLORS.BLACK }}
        aria-hidden
      />
      <canvas
        ref={fgRef}
        style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100%', height: '100%' }}
        aria-hidden
      />
    </>
  )
}

export default NetworkCanvas
