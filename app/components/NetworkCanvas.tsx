"use client";
import React, { useRef, useEffect } from "react";

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    // Node settings
    const numNodes = Math.floor((width * height) / 12000); // keeps density consistent
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      brightness: number;
    }[] = [];

    for (let i = 0; i < numNodes; i++) {
      const radius = Math.random() * 2.5 + 0.5; // varied size
      const brightness = Math.random() * 0.8 + 0.2; // varied HDR brightness
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15, // slow drift
        vy: (Math.random() - 0.5) * 0.15,
        radius,
        brightness,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw nodes
      nodes.forEach((node) => {
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3
        );
        gradient.addColorStop(0, `rgba(0, 180, 255, ${node.brightness})`); // cyan core
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines
      const maxDist = 160;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist; // fade with distance
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha * 0.6})`; // brighter & visible
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      update();
      requestAnimationFrame(draw);
    }

    function update() {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
    }

    draw();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: -1,
      }}
    />
  );
}
