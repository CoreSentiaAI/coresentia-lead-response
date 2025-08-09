'use client'

import React, { useRef, useEffect } from 'react'

const NetworkCanvas: React.FC = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999, radius: 110 })

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current
    const particleCanvas = particleCanvasRef.current
    if (!bgCanvas || !particleCanvas) return

    const bgCtxMaybe = bgCanvas.getContext('2d')
    const ctxMaybe = particleCanvas.getContext('2d')
    if (!bgCtxMaybe || !ctxMaybe) return
    const bgCtx = bgCtxMaybe as CanvasRenderingContext2D
    const ctx = ctxMaybe as CanvasRenderingContext2D

    const COLORS = {
      BLACK: '#000000',
      WHITE: '#FFFFFF',
      CYAN:  '#62D4F9',
      BLUE:  '#2A50DF',
      AQUA:  '#40FFD9',
    }

    // HiDPI scaling for crisp lines
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    let width = window.innerWidth
    let height = window.innerHeight

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      bgCanvas.width = Math.round(width * dpr)
      bgCanvas.height = Math.round(height * dpr)
      particleCanvas.width = Math.round(width * dpr)
      particleCanvas.height = Math.round(height * dpr)
      bgCanvas.style.width = '100%'
      bgCanvas.style.height = '100%'
      particleCanvas.style.width = '100%'
      particleCanvas.style.height = '100%'
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawBackground()
      rebuild()
    }

    const drawBackground = () => {
      // Pure black to keep HDR clean (no gradients)
      bgCtx.fillStyle = COLORS.BLACK
      bgCtx.fillRect(0, 0, width, height)
    }

    window.addEventListener('resize', setSize)

    // Particles
    type P = { x: number; y: number; vx: number; vy: number; r: number; seed: number }
    let particles: P[] = []

    const cellSize = 90
    let cols = 0
    let rows = 0
    let grid: number[][][] = []
    const maxDist = 150
    const maxD2 = maxDist * maxDist

    const area = () => Math.max(1, width * height)

    function rebuild() {
      // Fewer dots for a mature look
      const count = Math.floor((area() / 20000) * 0.5)
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.2 + 0.6, // tiny, no glow
        seed: Math.random() * Math.PI * 2,
      }))
      cols = Math.max(1, Math.ceil(width / cellSize))
      rows = Math.max(1, Math.ceil(height / cellSize))
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

    const rgba = (hex: string, a: number) => {
      let h = hex.replace('#', '')
      if (h.length === 3) h = h.split('').map(c => c + c).join('')
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`
    }

    const chooseAccent = (seed: number) => {
      // deterministic mix of brand colours; keep it subtle
      const v = Math.abs(Math.sin(seed * 7.13))
      if (v < 0.34) return COLORS.CYAN
      if (v < 0.67) return COLORS.BLUE
      return COLORS.AQUA
    }

    let raf = 0
    const draw = (t = 0) => {
      // Clear particle canvas
      ctx.clearRect(0, 0, width, height)

      // Update particles
      for (let p of particles) {
        p.x += p.vx
        p.y += p.vy

        // gentle wrap
        if (p.x < -12) p.x = width + 12
        else if (p.x > width + 12) p.x = -12
        if (p.y < -12) p.y = height + 12
        else if (p.y > height + 12) p.y = -12

        // subtle organic drift
        const s = Math.sin(t * 0.00035 + p.seed)
        p.vx += s * 0.00035
        p.vy -= s * 0.00035

        // mouse field
        const dxm = p.x - mouse.current.x
        const dym = p.y - mouse.current.y
        const d2m = dxm * dxm + dym * dym
        if (d2m < mouse.current.radius * mouse.current.radius) {
          const f = 0.0012 * (1 - Math.sqrt(d2m) / mouse.current.radius)
          p.vx += dxm * f
          p.vy += dym * f
        }
      }

      // Index for connections
      indexGrid()

      // Draw lines first (the hero). No glow. Pure white/brand.
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

                    // Accent near cursor, white elsewhere
                    const midx = (a.x + b.x) * 0.5
                    const midy = (a.y + b.y) * 0.5
                    const mdx = midx - mouse.current.x
                    const mdy = midy - mouse.current.y
                    const nearMouse = Math.sqrt(mdx * mdx + mdy * mdy) < mouse.current.radius * 1.1
                    const color = nearMouse ? chooseAccent(a.seed + b.seed) : COLORS.WHITE

                    ctx.lineWidth = 1.0 * (0.6 + 1.6 * tight)
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

      // Dots last; tiny, non-glow, mostly white
      for (let p of particles) {
        const accentChance = Math.abs(Math.sin(p.seed * 5.7)) > 0.92
        const color = accentChance ? chooseAccent(p.seed) : COLORS.WHITE
        ctx.fillStyle = rgba(color, 0.9 * 0.45) // subtle but crisp
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    // Boot
    setSize()
    drawBackground()
    rebuild()
    raf = requestAnimationFrame(draw)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <>
      {/* Background canvas (pure black) */}
      <canvas
        ref={bgCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -2,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
        }}
      />
      {/* Network canvas */}
      <canvas
        ref={particleCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />
    </>
  )
}

export default NetworkCanvas
