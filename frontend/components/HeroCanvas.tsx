"use client";

import { useEffect, useRef } from "react";

import type { MotionValue } from "framer-motion";


type HeroCanvasProps = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};


export function HeroCanvas({ pointerX, pointerY }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const currentCanvas = canvas;

    const context = currentCanvas.getContext("2d");
    if (!context) {
      return undefined;
    }
    const currentContext = context;

    const dpr = window.devicePixelRatio || 1;
    let frameId = 0;
    let width = 0;
    let height = 0;

    const particles = Array.from({ length: 32 }, (_, index) => ({
      orbit: 120 + index * 16,
      radius: 1.6 + (index % 5),
      speed: 0.0018 + index * 0.00012,
      offset: index * 0.6,
      depth: 0.4 + (index % 7) * 0.1,
    }));

    function resizeCanvas() {
      const bounds = currentCanvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      currentCanvas.width = width * dpr;
      currentCanvas.height = height * dpr;
      currentContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawArm(time: number, offsetX: number, offsetY: number) {
      const baseX = width * 0.18 + offsetX * 55;
      const baseY = height * 0.76 + offsetY * 30;
      const points = [
        { x: baseX, y: baseY },
        { x: baseX + width * 0.12, y: baseY - 30 + Math.sin(time * 0.001) * 14 },
        { x: baseX + width * 0.25, y: baseY - 72 + Math.cos(time * 0.0012) * 18 },
        { x: baseX + width * 0.4, y: baseY - 135 + Math.sin(time * 0.0015) * 22 },
        { x: baseX + width * 0.56, y: baseY - 190 + Math.cos(time * 0.0014) * 18 },
      ];

      currentContext.save();
      currentContext.lineCap = "round";
      currentContext.lineJoin = "round";

      for (let index = 0; index < points.length - 1; index += 1) {
        const start = points[index];
        const end = points[index + 1];
        const thickness = 28 - index * 4;

        currentContext.beginPath();
        currentContext.strokeStyle = "rgba(2, 6, 23, 0.55)";
        currentContext.lineWidth = thickness + 8;
        currentContext.moveTo(start.x, start.y + 10);
        currentContext.lineTo(end.x, end.y + 10);
        currentContext.stroke();

        const gradient = currentContext.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        gradient.addColorStop(0.45, "rgba(125, 211, 252, 0.92)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0.34)");

        currentContext.beginPath();
        currentContext.strokeStyle = gradient;
        currentContext.lineWidth = thickness;
        currentContext.moveTo(start.x, start.y);
        currentContext.lineTo(end.x, end.y);
        currentContext.stroke();

        currentContext.beginPath();
        currentContext.strokeStyle = "rgba(255, 255, 255, 0.28)";
        currentContext.lineWidth = Math.max(2, thickness / 7);
        currentContext.moveTo(start.x, start.y - 4);
        currentContext.lineTo(end.x, end.y - 4);
        currentContext.stroke();
      }

      points.forEach((point, index) => {
        const jointRadius = 16 - index * 1.5;
        currentContext.beginPath();
        currentContext.fillStyle = "rgba(2, 6, 23, 0.5)";
        currentContext.arc(point.x, point.y + 10, jointRadius + 7, 0, Math.PI * 2);
        currentContext.fill();

        const jointGlow = currentContext.createRadialGradient(point.x, point.y, 0, point.x, point.y, jointRadius + 10);
        jointGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        jointGlow.addColorStop(0.45, "rgba(125, 211, 252, 0.82)");
        jointGlow.addColorStop(1, "rgba(34, 211, 238, 0.08)");

        currentContext.beginPath();
        currentContext.fillStyle = jointGlow;
        currentContext.arc(point.x, point.y, jointRadius + 4, 0, Math.PI * 2);
        currentContext.fill();
      });

      const tool = points[points.length - 1];
      currentContext.beginPath();
      currentContext.strokeStyle = "rgba(125, 211, 252, 0.92)";
      currentContext.lineWidth = 5;
      currentContext.moveTo(tool.x + 4, tool.y + 2);
      currentContext.lineTo(tool.x + 70, tool.y - 30);
      currentContext.stroke();

      currentContext.beginPath();
      currentContext.strokeStyle = "rgba(251, 146, 60, 0.68)";
      currentContext.lineWidth = 4;
      currentContext.moveTo(tool.x + 2, tool.y + 3);
      currentContext.lineTo(tool.x + 56, tool.y + 22);
      currentContext.stroke();

      currentContext.restore();
    }

    function render(time: number) {
      const x = pointerX.get();
      const y = pointerY.get();

      currentContext.clearRect(0, 0, width, height);

      const background = currentContext.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "rgba(2, 6, 23, 0.15)");
      background.addColorStop(1, "rgba(8, 15, 33, 0.55)");
      currentContext.fillStyle = background;
      currentContext.fillRect(0, 0, width, height);

      const glowA = currentContext.createRadialGradient(width * (0.28 + x * 0.06), height * (0.3 + y * 0.05), 0, width * (0.28 + x * 0.06), height * (0.3 + y * 0.05), width * 0.28);
      glowA.addColorStop(0, "rgba(34, 211, 238, 0.18)");
      glowA.addColorStop(1, "rgba(34, 211, 238, 0)");
      currentContext.fillStyle = glowA;
      currentContext.fillRect(0, 0, width, height);

      const glowB = currentContext.createRadialGradient(width * (0.74 - x * 0.08), height * (0.54 - y * 0.04), 0, width * (0.74 - x * 0.08), height * (0.54 - y * 0.04), width * 0.24);
      glowB.addColorStop(0, "rgba(249, 115, 22, 0.14)");
      glowB.addColorStop(1, "rgba(249, 115, 22, 0)");
      currentContext.fillStyle = glowB;
      currentContext.fillRect(0, 0, width, height);

      currentContext.save();
      currentContext.globalAlpha = 0.18;
      currentContext.strokeStyle = "rgba(148, 163, 184, 0.22)";
      currentContext.lineWidth = 1;
      const step = Math.max(36, width / 24);
      for (let dx = 0; dx < width; dx += step) {
        currentContext.beginPath();
        currentContext.moveTo(dx, 0);
        currentContext.lineTo(dx, height);
        currentContext.stroke();
      }
      for (let dy = 0; dy < height; dy += step) {
        currentContext.beginPath();
        currentContext.moveTo(0, dy);
        currentContext.lineTo(width, dy);
        currentContext.stroke();
      }
      currentContext.restore();

      particles.forEach((particle, index) => {
        const angle = time * particle.speed + particle.offset;
        const particleX = width * 0.6 + Math.cos(angle) * particle.orbit + x * particle.orbit * 0.3;
        const particleY = height * 0.46 + Math.sin(angle * 1.25) * (particle.orbit * 0.38) + y * particle.orbit * 0.18;
        const radius = particle.radius + particle.depth;

        currentContext.beginPath();
        currentContext.fillStyle = index % 6 === 0 ? "rgba(251, 191, 36, 0.9)" : "rgba(186, 230, 253, 0.78)";
        currentContext.shadowColor = index % 6 === 0 ? "rgba(251, 146, 60, 0.7)" : "rgba(34, 211, 238, 0.7)";
        currentContext.shadowBlur = 18;
        currentContext.arc(particleX, particleY, radius, 0, Math.PI * 2);
        currentContext.fill();
        currentContext.shadowBlur = 0;
      });

      drawArm(time, x, y);

      frameId = window.requestAnimationFrame(render);
    }

    resizeCanvas();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [pointerX, pointerY]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}