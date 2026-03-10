"use client";

import { motion } from "framer-motion";


const processSteps = [
  {
    id: "001",
    title: "Inspection",
    description:
      "Deploy the manipulator into constrained infrastructure and collect structured visual and sensor data from difficult-to-access surfaces.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20L16.65 16.65" />
      </svg>
    ),
  },
  {
    id: "002",
    title: "Analysis",
    description:
      "Transform inspection data into actionable insight, surfacing anomalies, coverage gaps, and engineering confidence metrics.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <path d="M4 19H20" />
        <path d="M7 16V10" />
        <path d="M12 16V6" />
        <path d="M17 16V12" />
      </svg>
    ),
  },
  {
    id: "003",
    title: "Automation",
    description:
      "Convert validated workflows into scalable robotic routines that reduce downtime and expand repeatable inspection coverage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <rect x="4" y="7" width="16" height="10" rx="3" />
        <path d="M9 3V7" />
        <path d="M15 3V7" />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
];


export function InspectionProcess() {
  return (
    <section id="process" className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Inspection flow</p>
          <h2 className="mt-6 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            Three stages from reach to repeatability.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            The platform is built to move from physical access, to engineering interpretation, to automated operational value without breaking the system narrative.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-[0.3em] text-slate-500">{step.id}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  {step.icon}
                </span>
              </div>
              <h3 className="mt-10 text-3xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}