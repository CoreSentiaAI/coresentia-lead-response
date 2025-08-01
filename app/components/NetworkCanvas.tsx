'use client'

import React, { useRef, useEffect } from 'react'

const NetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0, radius: 100 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resizeCanvas)

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      isBright: boolean
    }[] = []

    const numParticles = Math.floor((width * height) / 6000)

    for (let i = 0; i < numParticles; i++) {
      const isBright = Math.random() < 0.2 // ~20% are bright/sharp
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: isBright ? Math.random() * 1.8 + 1.5 : Math.random() * 1.2 + 0.5,
        opacity: isBright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3 + 0.2,
        isBright,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Glassy gradient background
      const gradient = ctx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      gradient.addColorStop(0, 'rgba(30,30,60,0.2)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.95)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const color = p.isBright ? 'rgba(255,255,255' : 'rgba(0,170,255'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
        ctx.fillStyle = `${color},${p.opacity})`
        ctx.shadowColor = `${color},${p.opacity})`
        ctx.shadowBlur = p.isBright ? 10 : 3
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect to other particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const lineOpacity = 0.2 - dist / 500
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 200, 255, ${lineOpacity})`
            ctx.lineWidth = 0.5
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
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    />
  )
}

export default NetworkCanvas
