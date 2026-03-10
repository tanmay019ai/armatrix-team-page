"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useScroll } from "framer-motion";

import { JourneyCanvas } from "@/components/JourneyCanvas";


const milestones = [
  {
    date: "October 2023",
    title: "Global Technical Validation",
    description: "Awarded Best Presentation at the International Astronautical Congress for pioneering work on control systems for hyper-redundant robotic arms.",
  },
  {
    date: "November 2023",
    title: "gradCapital Fellowship",
    description: "Received the gradCapital Atomic Fellowship ($5,000) to initiate early-stage hardware development.",
  },
  {
    date: "January 2024",
    title: "Company Incorporation",
    description: "Armatrix Automations Pvt. Ltd. officially incorporated.",
  },
  {
    date: "June 2024",
    title: "Strategic Funding",
    description: "Secured funding from gradCapital Venture Capital to accelerate R&D.",
  },
  {
    date: "November 2024",
    title: "Prototype 3 (1.5m)",
    description: "Completed development of Prototype 3, a 1.5-meter robotic arm, and received a $40,000 grant from Emergent Ventures.",
  },
  {
    date: "March 2025",
    title: "WTFund Grant",
    description: "Awarded a Rs 20,00,000 grant from Nikhil Kamath's WTFund, supporting young entrepreneurs building disruptive tech.",
  },
  {
    date: "June 2025",
    title: "Pre-Seed Round",
    description: "Closed a $2.1 Million pre-seed funding round led by pi Ventures to scale engineering and operations.",
  },
  {
    date: "October 2025",
    title: "Shell E4 Selection",
    description: "Selected as one of the Top 8 Indian companies by Shell E4 India for deep-track collaboration and future funding.",
  },
  {
    date: "November 2025",
    title: "MVP 01 (3m)",
    description: "Achieved a major engineering milestone with the completion of MVP 01, a 3-meter advanced robotic arm.",
  },
];


export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => scrollYProgress.on("change", setProgress), [scrollYProgress]);

  const activeIndex = Math.min(
    milestones.length - 1,
    Math.max(0, Math.floor(progress * milestones.length)),
  );

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <JourneyCanvas progress={progress} activeIndex={activeIndex} total={milestones.length} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.75),rgba(2,6,23,0.55)_40%,rgba(2,6,23,0.88))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Company journey</p>
          <h2 className="mt-6 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            Engineering milestones shaping the platform.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            The company story is built around technical validation, disciplined product development, and focused capital at the moments that compound execution.
          </p>
        </motion.div>

        <div className="relative mt-14 pl-6 md:pl-10">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-300/60 via-white/15 to-transparent" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.title}
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
              >
                <div className="absolute -left-[2.05rem] top-9 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-950">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">{milestone.date}</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{milestone.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{milestone.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}