"use client";

import { motion } from "framer-motion";


const investors = [
  "grad Capital",
  "Emergent Ventures",
  "pi Ventures",
  "Inuka Capital",
  "Turbostart",
  "Boost VC",
  "Boundless Ventures",
  "WTFund",
  "Shell E4",
];


export function BackedBySection() {
  const track = [...investors, ...investors];

  return (
    <section className="px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Backed by</p>
            <h2 className="mt-5 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Capital partners supporting deep-tech execution.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            Built with conviction from operators, venture partners, and grant programs that back engineering-heavy robotics innovation.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex min-w-max gap-4"
          >
            {track.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex min-w-[13rem] items-center justify-center rounded-[1.25rem] border border-white/10 bg-slate-950/50 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200"
              >
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}