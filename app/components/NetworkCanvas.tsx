"use client";
import React, { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  glow: number;
  color: string;
  seed: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---------- responsive config ----------
    const colors = ["#62D4F9", "#2A50DF", "#40FFD9"];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cfg = () => {
      if (width < 640) {
        // phones
        return {
          COUNT: 26,
          MAX_DIST: 110,
          LINE_W: 0.9,
          SPEED: 0.18,
          HOVER_RADIUS: 80,
          SAFE: { w: 0.78, h: 0.42, a: 0.55 }, // central quiet zone (width%, height%, alpha multiplier)
        };
      } else if (width < 1024) {
        // tablets
        return {
          COUNT: 38,
          MAX_DIST: 130,
          LINE_W: 1.0,
          SPEED: 0.2,
          HOVER_RADIUS: 100,
          SAFE: { w: 0.7, h: 0.38, a: 0.65 },
        };
      }
      // desktop
      return {
        COUNT: 60,
        MAX_DIST: 150,
        LINE_W: 1.1,
        SPEED: 0.22,
        HOVER_RADIUS: 120,
        SAFE: { w: 0.6, h: 0.34, a: 0.7 },
      };
    };

    let conf = cfg();

    // ---------- nodes ----------
    const nodes: Node[] = [];
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < conf.COUNT; i++) {
        const r = Math.random() * 3 + 1;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * conf.SPEED,
          vy: (Math.random() - 0.5) * conf.SPEED,
          radius: r,
          baseRadius: r,
          glow: Math.random() * 14 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          seed: Math.random() * Math.PI * 2,
        });
      }
    };
    initNodes();

    // ---------- helpers ----------
    const inSafeZoneFactor = (mx: number, my: number) => {
      // returns alpha multiplier if the midpoint is inside the center “text-safe” rect
      const sw = width * conf.SAFE.w;
      const sh = height * conf.SAFE.h;
      const x1 = (width - sw) / 2;
      const y1 = (height - sh) / 2;
      const inX = mx >= x1 && mx <= x1 + sw;
      const inY = my >= y1 && my <= y1 + sh;
      return inX && inY ? conf.SAFE.a : 1; // reduce visibility inside safe zone
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      conf = cfg();
      initNodes();
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    // ---------- loop ----------
    const draw = (t = 0) => {
      // clear
      ctx.clearRect(0, 0, width, height);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < conf.MAX_DIST) {
            let alpha = 1 - dist / conf.MAX_DIST;

            // interactive colour shift near cursor (subtle)
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const md = Math.hypot(mouse.current.x - midX, mouse.current.y - midY);
            const near = md < conf.HOVER_RADIUS;
            // base is cyan/blue; near mouse nudge toward aqua-green
            const base = near ? "#40FFD9" : "#62D4F9";

            // damp lines inside the central safe zone to protect hero text
            alpha *= inSafeZoneFactor(midX, midY);

            if (alpha > 0.02) {
              ctx.strokeStyle = `rgba(${hexToRgb(base)}, ${Math.min(1, alpha * 0.85)})`;
              ctx.lineWidth = conf.LINE_W * (0.7 + 0.9 * (1 - dist / conf.MAX_DIST));
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // nodes
      for (const n of nodes) {
        // subtle organic drift
        const s = Math.sin(t * 0.00035 + n.seed) * 0.0004;
        n.vx += s;
        n.vy -= s;

        n.x += n.vx;
        n.y += n.vy;

        // wrap
        if (n.x < -12) n.x = width + 12;
        else if (n.x > width + 12) n.x = -12;
        if (n.y < -12) n.y = height + 12;
        else if (n.y > height + 12) n.y = -12;

        // draw (HDR dots with gentle glow)
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.glow;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(draw);
    };

    draw();

    // listeners (real cleanup)
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#000",
        zIndex: -1,
      }}
    />
  );
}

/* utils */
function hexToRgb(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
