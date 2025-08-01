'use client'

import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useCallback } from 'react'
import type { Engine } from 'tsparticles-engine'

export default function NetworkCanvas() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: '#000000'
          }
        },
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: '#62D4F9'
          },
          links: {
            enable: true,
            distance: 150,
            color: '#62D4F9',
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            outModes: 'bounce'
          },
          size: {
            value: { min: 1, max: 3 }
          },
          opacity: {
            value: 0.5
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            }
          }
        },
        detectRetina: true
      }}
    />
  )
}
