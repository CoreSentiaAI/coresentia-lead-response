'use client'

import React, { useRef, useEffect } from 'react'

type NetworkCanvasProps = {
  /** 0.2 = sparse, 1.0 = dense. Default 0.5 */
  density?: number
  /** Max connection distance in px. Default 150 */
  maxDist?: number
  /** Base line width in px. Default 1.0 */
  lineWidth?: number
  /** 0 = no dots, 1 = standard. Default 0.45 (subtle, line-first) */
  nodeEmphasis?: number
  /** Accent cycling: 'cyan' | 'blue' | 'aqua' | 'mixed'. Default 'cyan' */
  accentMode?: 'cyan' | 'blue' | 'aqua' | 'mixed'
}

const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  CYAN: '#62D4F9',   // Primary
  BLUE: '#2A50DF',   // Secondary
  AQUA: '#40FFD9',   // Tertiary
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

  // Motion preference
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true

  useEffect(() => {
    const bg = bgRef.current
    const fg = fgRef.current
    if (!bg || !fg) return

    const bgCtx = bg.getContext('2d')
    const ctx = fg.getContext('2d')
    if (!bgCtx || !ctx) return

    // HiDPI
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    let w = window.innerWidth
    let h = window.innerHeight

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
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawBackground()
      rebuild()
    }

    const drawBackground = () => {
      // Pure black; no gradients/texture to keep HDR crisp
      bgCtx.fillStyle = COLORS.BLACK
      bgCtx.fillRect(0, 0, w, h)
    }

    setSize()

    const onResize = () => {
      cancelAnimationFrame(rafRef.current || 0)
      setSize()
      start()
    }
    window.addEventListener('resize', onResize)

    type P = { x: number; y: number; vx: number; vy: number; r: number; seed: number }
    let particles: P[] = []
    const area = () => Math.max(1, w * h)
    const cellSize = 90
    let cols = 0
    let rows = 0
    let grid: number[][][] = []

    function rebuild() {
      const count = Math.floor((area() / 20000) * density) // fewer dots than typical “sci-fi”
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reduceMotion ? 0.06 : 0.16),
        vy: (Math.random() - 0.5) * (reduceMotion ? 0.06 : 0.16),
        r: Math.random() * 1.2 + 0.6, // small, non-glowy points
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

    const maxD2 = maxDist * maxDist

    // Accent selection with deterministic variety
    function chooseAccent(aSeed: number) {
      if (accentMode === 'cyan') return COLORS.CYAN
      if (accentMode === 'blue') return COLORS.BLUE
      if (accentMode === 'aqua') return COLORS.AQUA
      // mixed = balanced distribution without randomness per frame
      const v = Math.abs(Math.sin(aSeed * 7.13))
      if (v < 0.34) return COLORS.CYAN
      if (v < 0.67) return COLORS.BLUE
      return COLORS.AQUA
    }

    function drawFrame(t: number) {
      ctx.clearRect(0, 0, w, h)

      // Update
      for (let p of particles) {
        p.x += p.vx
        p.y += p.vy

        // gentle wrap
        if (p.x < -12) p.x = w + 12
        else if (p.x > w + 12) p.x = -12
        if (p.y < -12) p.y = h + 12
        else if (p.y > h + 12) p.y = -12

        // tiny organic drift (no opacity pulsing)
        if (!reduceMotion) {
          const s = Math.sin(t * 0.00035 + p.seed)
          p.vx += s * 0.00035
          p.vy -= s * 0.00035
        }

        // mouse field (subtle)
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d2 = dx * dx + dy * dy
        if (d2 < mouse.current.r * mouse.current.r) {
          const f = 0.0012 * (1 - Math.sqrt(d2) / mouse.current.r)
          p.vx += dx * f
          p.vy += dy * f
        }
      }

      indexGrid()

      // Lines are the hero; draw first with crisp opacity
      ctx.lineCap = 'round'
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

                    // HDR rule: avoid muddy greys.
                    // We keep opacity modest but colours *pure* (white or brand).
                    // Near the cursor = accent colour; otherwise white.
                    const midx = (a.x + b.x) * 0.5
                    const midy = (a.y + b.y) * 0.5
                    const mdx = midx - mouse.current.x
                    const mdy = midy - mouse.current.y
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
                    const nearMouse = mDist < mouse.current.r * 1.1

                    const color = nearMouse ? chooseAccent(a.seed + b.seed) : COLORS.WHITE

                    // Width scales with proximity; opacity restrained to keep lines crisp
                    ctx.lineWidth = lineWidth * (0.6 + 1.6 * tight)
                    ctx.strokeStyle = rgba(color, 0.9 - 0.5 * (d / maxDist))
                    ctx.beginPath()
                    ctx.moveTo(a.x, a.y)
                    ctx.lineTo(b.x, b.y)
                    ctx.stroke()
                  }
                }
              }
            }
          }
        }
      }

      // Dots last; tiny, non-glowy, mostly white with occasional accent
      if (nodeEmphasis > 0) {
        for (let p of particles) {
          const useAccent = Math.abs(Math.sin(p.seed * 5.7)) > 0.92 // sprinkle accents
          const color =
            useAccent && accentMode !== 'cyan'
              ? chooseAccent(p.seed)
              : COLORS.WHITE
          ctx.fillStyle = rgba(color, 0.9 * nodeEmphasis)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function start() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const loop = (t: number) => {
        drawFrame(t)
        rafRef.current = requestAnimationFrame(loop)
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

  return (
    <>
      <canvas
        ref={bgRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          width: '100%',
          height: '100%',
          background: COLORS.BLACK, // pure black
        }}
        aria-hidden
      />
      <canvas
        ref={fgRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
        aria-hidden
      />
    </>
  )
}

// Utilities

function rgba(hex: string, a: number) {
  // supports hex or already-rgba strings
  if (hex.startsWith('rgb')) {
    // normalise alpha
    const parts = hex.replace(/[rgba()]/g, '').split(',').map(s => s.trim())
    const [r, g, b] = parts.map((v, i) => (i < 3 ? parseFloat(v) : 0))
    return `rgba(${r}, ${g}, ${b}, ${clamp(a, 0, 1)})`
  }
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map(ch => ch + ch).join('')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${clamp(a, 0, 1)})`
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export default NetworkCanvas
