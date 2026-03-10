"use client";

import { useEffect, useState, type PointerEvent } from "react";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

import { HeroCanvas } from "@/components/HeroCanvas";


export function HeroSection() {
  const { scrollY } = useScroll();
  const orbitalShift = useTransform(scrollY, [0, 600], [0, 140]);
  const panelShift = useTransform(scrollY, [0, 600], [0, 70]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [typedText, setTypedText] = useState("");
  const title = "Inspection Reimagined";

  useEffect(() => {
    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setTypedText(title.slice(0, frame));

      if (frame >= title.length) {
        window.clearInterval(interval);
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const nextY = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(nextX);
    pointerY.set(nextY);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-12 pt-24 md:min-h-screen md:px-10 md:pb-16 md:pt-32 lg:px-16"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <HeroCanvas pointerX={pointerX} pointerY={pointerY} />

      <motion.div
        style={{ y: orbitalShift }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_75%_15%,rgba(249,115,22,0.14),transparent_18%)]"
      />
      <motion.div
        animate={{ x: [0, 60, -20, 0], y: [0, -20, 40, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-24 h-60 w-60 rounded-full bg-cyan-300/8 blur-3xl"
      />
      <motion.div
        style={{ y: panelShift }}
        className="pointer-events-none absolute right-[8%] top-32 hidden h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl lg:block"
      />
      <motion.div
        animate={{ x: [0, -90, 20, 0], y: [0, 30, -10, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-10 right-[16%] h-80 w-80 rounded-full bg-orange-300/8 blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.16),rgba(2,6,23,0.42)_55%,rgba(2,6,23,0.72))]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 md:gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(28rem,0.98fr)] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-slate-300 backdrop-blur-xl"
          >
            Armatrix cinematic intro
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
            className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Printing system status</p>
            <div className="mt-6 min-h-[5.5rem] max-w-5xl font-[var(--font-display)] text-4xl leading-[0.95] text-white sm:min-h-[7rem] sm:text-5xl md:text-6xl lg:min-h-[10rem] lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-slate-400 bg-clip-text text-transparent">
                {typedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2 inline-block h-[0.9em] w-[0.06em] bg-cyan-300 align-middle"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-slate-400">
              <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">Glass interface</span>
              <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">Realtime motion field</span>
              <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">Interactive canvas</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
            className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
          >
            Robotic arms designed to inspect tight spaces within complex machinery, bringing precision manipulation and automation to environments where conventional inspection tools cannot reach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#technology"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Explore the technology
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/10"
            >
              Start a conversation
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Armatrix glass console</p>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                live canvas
              </span>
            </div>

            <div className="relative mt-8 aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_32%),linear-gradient(180deg,rgba(3,7,18,0.98),rgba(8,15,33,0.96))]">
              <div className="pointer-events-none absolute inset-0 opacity-80">
                <HeroCanvas pointerX={pointerX} pointerY={pointerY} />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
              <motion.div animate={{ x: [0, 18, 0], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[12%] top-[14%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
              <motion.div animate={{ x: [0, -16, 0], y: [0, 12, 0] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[15%] top-[20%] h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
              <motion.div animate={{ x: [0, 10, 0], y: [0, -16, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[18%] left-[18%] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.7)]" />

              <div className="absolute left-[14%] top-[44%] h-px w-[58%] bg-gradient-to-r from-cyan-400/0 via-cyan-300/70 to-cyan-400/0" />
              <div className="absolute left-[44%] top-[18%] h-[52%] w-px bg-gradient-to-b from-cyan-400/0 via-cyan-300/60 to-cyan-400/0" />

              <FrameBadge label="Armatrix" className="left-[18%] top-[22%]" accent="cyan" duration={5.5} />
              <FrameBadge label="Inspection" className="right-[14%] top-[46%]" accent="orange" duration={6.2} reverse />
              <FrameBadge label="Reimagined" className="bottom-[14%] left-[36%]" accent="slate" duration={5.8} />

              <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-3 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3 sm:p-4">
                <Stat label="intro mode" value="3D canvas" />
                <Stat label="word animation" value="Printed glass" />
                <Stat label="interaction" value="Pointer reactive" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#technology"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500 sm:flex"
      >
        Scroll
        <span className="relative h-14 w-8 rounded-full border border-white/10 bg-white/5">
          <motion.span
            animate={{ y: [6, 28, 6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300"
          />
        </span>
      </motion.a>
    </section>
  );
}


type StatProps = {
  label: string;
  value: string;
};


function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-2 sm:p-3">
      <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500 sm:text-xs sm:tracking-[0.28em]">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-white sm:mt-2 sm:text-base md:text-lg">{value}</p>
    </div>
  );
}


type FrameBadgeProps = {
  label: string;
  className: string;
  accent: "cyan" | "orange" | "slate";
  duration: number;
  reverse?: boolean;
};


function FrameBadge({ label, className, accent, duration, reverse = false }: FrameBadgeProps) {
  const accentClasses = {
    cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
    orange: "border-orange-400/35 bg-orange-400/10 text-orange-200",
    slate: "border-white/20 bg-white/5 text-slate-200",
  };

  return (
    <motion.div
      animate={{ x: reverse ? [0, -12, 0] : [0, 14, 0], y: reverse ? [0, 10, 0] : [0, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${accentClasses[accent]} ${className}`}
    >
      {label}
    </motion.div>
  );
}