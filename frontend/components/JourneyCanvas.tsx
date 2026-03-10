"use client";

import { useEffect, useRef } from "react";

type JourneyCanvasProps = {
  progress: number;
  activeIndex: number;
  total: number;
};

export function JourneyCanvas({ progress, activeIndex, total }: JourneyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(progress);
  const activeRef = useRef(activeIndex);
  const totalRef = useRef(total);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const currentCanvas = canvas;

    const context = currentCanvas.getContext("2d");
    if (!context) return undefined;
    const currentContext = context;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let frameId = 0;

    function resize() {
      const bounds = currentCanvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      currentCanvas.width = Math.max(1, Math.floor(width * dpr));
      currentCanvas.height = Math.max(1, Math.floor(height * dpr));
      currentContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function clamp(value: number, min: number, max: number) {
      return Math.min(max, Math.max(min, value));
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function pathPoint(t: number) {
      const x = lerp(width * 0.12, width * 0.88, t);
      const base = Math.sin(t * Math.PI) * 0.22;
      const wave = Math.sin(t * Math.PI * 2.25) * 0.06;
      const y = height * (0.74 - base - wave);
      return { x, y };
    }

    function render(time: number) {
      const sectionProgress = clamp(progressRef.current, 0, 1);
      const totalMilestones = Math.max(1, totalRef.current);
      const active = clamp(activeRef.current, 0, totalMilestones - 1);

      currentContext.clearRect(0, 0, width, height);

      // Soft background field
      const bg = currentContext.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "rgba(34, 211, 238, 0.08)");
      bg.addColorStop(0.55, "rgba(255, 255, 255, 0)");
      bg.addColorStop(1, "rgba(249, 115, 22, 0.06)");
      currentContext.fillStyle = bg;
      currentContext.fillRect(0, 0, width, height);

      // Grid
      currentContext.save();
      currentContext.globalAlpha = 0.22;
      currentContext.lineWidth = 1;
      currentContext.strokeStyle = "rgba(148, 163, 184, 0.18)";
      const step = Math.max(44, width / 22);
      for (let x = 0; x <= width; x += step) {
        currentContext.beginPath();
        currentContext.moveTo(x, 0);
        currentContext.lineTo(x, height);
        currentContext.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        currentContext.beginPath();
        currentContext.moveTo(0, y);
        currentContext.lineTo(width, y);
        currentContext.stroke();
      }
      currentContext.restore();

      // Path
      currentContext.save();
      currentContext.lineCap = "round";
      currentContext.lineJoin = "round";

      currentContext.beginPath();
      for (let i = 0; i <= 220; i += 1) {
        const t = i / 220;
        const point = pathPoint(t);
        if (i === 0) currentContext.moveTo(point.x, point.y);
        else currentContext.lineTo(point.x, point.y);
      }
      currentContext.strokeStyle = "rgba(255, 255, 255, 0.18)";
      currentContext.lineWidth = 6;
      currentContext.stroke();

      currentContext.beginPath();
      for (let i = 0; i <= 220; i += 1) {
        const t = i / 220;
        const point = pathPoint(t);
        if (i === 0) currentContext.moveTo(point.x, point.y);
        else currentContext.lineTo(point.x, point.y);
      }
      currentContext.strokeStyle = "rgba(34, 211, 238, 0.28)";
      currentContext.lineWidth = 2;
      currentContext.stroke();

      // Nodes
      for (let index = 0; index < totalMilestones; index += 1) {
        const t = totalMilestones === 1 ? 0.5 : index / (totalMilestones - 1);
        const point = pathPoint(t);
        const isActive = index <= active;
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + index);

        currentContext.beginPath();
        currentContext.fillStyle = isActive ? `rgba(34, 211, 238, ${0.35 + pulse * 0.22})` : "rgba(148, 163, 184, 0.22)";
        currentContext.arc(point.x, point.y, isActive ? 6.5 : 5.5, 0, Math.PI * 2);
        currentContext.fill();

        currentContext.beginPath();
        currentContext.strokeStyle = isActive ? "rgba(34, 211, 238, 0.7)" : "rgba(255, 255, 255, 0.16)";
        currentContext.lineWidth = 2;
        currentContext.arc(point.x, point.y, isActive ? 12 + pulse * 4 : 10, 0, Math.PI * 2);
        currentContext.stroke();
      }

      // Runner (progress bead)
      const runner = pathPoint(sectionProgress);
      const glow = currentContext.createRadialGradient(runner.x, runner.y, 0, runner.x, runner.y, 40);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.28)");
      glow.addColorStop(1, "rgba(34, 211, 238, 0)");
      currentContext.fillStyle = glow;
      currentContext.fillRect(0, 0, width, height);

      currentContext.beginPath();
      currentContext.fillStyle = "rgba(255, 255, 255, 0.9)";
      currentContext.arc(runner.x, runner.y, 4.5, 0, Math.PI * 2);
      currentContext.fill();

      // Data ticks
      const tickCount = 10;
      for (let i = 0; i < tickCount; i += 1) {
        const tt = clamp(sectionProgress - i * 0.035, 0, 1);
        const point = pathPoint(tt);
        currentContext.beginPath();
        currentContext.fillStyle = `rgba(251, 146, 60, ${0.22 - i * 0.016})`;
        currentContext.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
        currentContext.fill();
      }

      currentContext.restore();

      frameId = window.requestAnimationFrame(render);
    }

    resize();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
