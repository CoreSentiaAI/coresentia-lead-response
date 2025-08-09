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
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#4FC3F7", "#81D4FA", "#0288D1", "#00B8A9"];
    const nodes: Node[] = [];

    // Create nodes
    for (let i = 0; i < 60; i++) {
      const radius = Math.random() * 3 + 1;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius,
        baseRadius: radius,
        glow: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            let alpha = 1 - dist / 150;
            let lineColor = "rgba(100,150,255," + alpha.toFixed(2) + ")";

            // Hover colour shift
            const mx = mouse.current.x;
            const my = mouse.current.y;
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const hoverDist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);

            if (hoverDist < 120) {
              lineColor = `rgba(${50 + Math.random() * 50}, ${200 + Math.random() * 40}, ${180 + Math.random() * 50}, ${alpha})`;
              alpha = Math.min(1, alpha + 0.2);
            }

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.glow;
        ctx.fill();
        ctx.shadowBlur = 0;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
