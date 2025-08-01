'use client'

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function NetworkCanvas() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  const options = {
    fullScreen: { enable: false },
    background: { color: '#000000' },
    particles: {
      number: {
        value: 80,
        density: { enable: true, area: 800 },
      },
      color: { value: '#62D4F9' },
      shape: { type: 'circle' },
      opacity: { value: 0.35 },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 150,
        color: '#62D4F9',
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'none',
        outModes: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.4 },
        },
      },
    },
    detectRetina: true,
  }

  return (
    <div className="absolute inset-0 z-0">
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  )
}
