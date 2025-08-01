'use client';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';

export default function NetworkCanvas() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: '#000000',
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 1200,
            },
          },
          color: {
            value: '#60ccff',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 1,
            random: false,
          },
          size: {
            value: 2.5,
            random: true,
          },
          links: {
            enable: true,
            distance: 140,
            color: '#60ccff',
            opacity: 0.4,
            width: 1.2,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: false,
            straight: false,
            outModes: {
              default: 'bounce',
            },
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.6,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
