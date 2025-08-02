'use client'

import React, { useRef, useEffect } from 'react'

const NetworkCanvas: React.FC = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0, radius: 100 })

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current
    const particleCanvas = particleCanvasRef.current
    if (!bgCanvas || !particleCanvas) return

    const bgCtx = bgCanvas.getContext('2d')
    const ctx = particleCanvas.getContext('2d')
    if (!bgCtx || !ctx) return

    let width = (bgCanvas.width = particleCanvas.width = window.innerWidth)
    let height = (bgCanvas.height = particleCanvas.height = window.innerHeight)

    const resizeCanvas = () => {
      width = bgCanvas.width = particleCanvas.width = window.innerWidth
      height = bgCanvas.height = particleCanvas.height = window.innerHeight
    }
    window.addEventListener('resize', resizeCanvas)

    // Draw background once (or update occasionally)
    const drawBackground = () => {
      const gradient = bgCtx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      gradient.addColorStop(0, 'rgba(30,30,60,0.2)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.95)')
      bgCtx.fillStyle = gradient
      bgCtx.fillRect(0, 0, width, height)
    }

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      isBright: boolean
      glowIntensity: number
      pulsePhase: number
    }[] = []

    const numParticles = Math.floor((width * height) / 6000)

    for (let i = 0; i < numParticles; i++) {
      const isBright = Math.random() < 0.3
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: isBright ? Math.random() * 2.5 + 2 : Math.random() * 1.2 + 0.8,
        opacity: 1,
        isBright,
        glowIntensity: Math.random() * 0.6 + 0.4, // Random between 0.4 and 1.0
        pulsePhase: Math.random() * Math.PI * 2, // Random start phase for pulsing
      })
    }

    let frame = 0

    const draw = () => {
      frame++
      
      // Update background occasionally for mouse movement effect
      if (Math.random() < 0.1) {
        drawBackground()
      }

      // Clear particle canvas
      ctx.clearRect(0, 0, width, height)

      // Draw particles with no background interference
      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        if (p.isBright) {
          // Calculate dynamic glow with subtle pulsing
          const pulseFactor = 0.8 + Math.sin(frame * 0.02 + p.pulsePhase) * 0.2
          const currentGlow = p.glowIntensity * pulseFactor
          
          // Multiple layers for bright white particles
          
          // Outer glow (varies most)
          ctx.globalCompositeOperation = 'screen'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 4 * currentGlow, 0, 2 * Math.PI)
          const grd1 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4 * currentGlow)
          grd1.addColorStop(0, `rgba(255, 255, 255, ${0.3 * currentGlow})`)
          grd1.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * currentGlow})`)
          grd1.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = grd1
          ctx.fill()

          // Middle glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.5 * currentGlow, 0, 2 * Math.PI)
          const grd2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5 * currentGlow)
          grd2.addColorStop(0, `rgba(255, 255, 255, ${0.6 * currentGlow})`)
          grd2.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = grd2
          ctx.fill()

          // Core
          ctx.globalCompositeOperation = 'source-over'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
          ctx.fillStyle = '#FFFFFF'
          ctx.shadowColor = '#FFFFFF'
          ctx.shadowBlur = 15 + (currentGlow * 10)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          // Blue particles
          ctx.globalCompositeOperation = 'source-over'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
          ctx.fillStyle = '#62D4F9'
          ctx.shadowColor = '#62D4F9'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Connect to other particles
        ctx.globalCompositeOperation = 'source-over'
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const lineOpacity = 0.3 - dist / 300
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(98, 212, 249, ${lineOpacity})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Interaction
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.current.radius) {
          const force = (mouse.current.radius - dist) / mouse.current.radius
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 0.02
          p.vy += Math.sin(angle) * force * 0.02
        }
      })

      requestAnimationFrame(draw)
    }

    // Initial background draw
    drawBackground()
    draw()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      {/* Background canvas with gradient */}
      <canvas
        ref={bgCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -2,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      />
      {/* Particle canvas on top */}
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
