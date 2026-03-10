"use client";

import { motion } from "framer-motion";


const useCases = [
  {
    id: "/001",
    title: "Inspection",
    description: "Navigate confined industrial geometry for inspection access without disassembly-heavy workflows.",
    imageSrc: "/media/product/product-02.jpg",
  },
  {
    id: "/002",
    title: "Painting",
    description: "Extend dexterous reach into hard-to-access interior surfaces where coating consistency matters.",
    imageSrc: "/media/product/product-03.jpg",
  },
  {
    id: "/003",
    title: "Welding",
    description: "Position robotic tooling in constrained structures where manipulation accuracy is critical.",
    imageSrc: "/media/product/product-04.jpg",
  },
];


export function UseCasesSection() {
  return (
    <section id="use-cases" className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Use cases</p>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
              Built for more than one robotic motion story.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            The same robotic foundation enables inspection today while opening adjacent pathways for precision painting and welding automation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.article
              key={useCase.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur"
            >
              <img
                src={useCase.imageSrc}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.85))]" />

              <div className="relative">
              <p className="text-sm font-semibold tracking-[0.3em] text-cyan-300">{useCase.id}</p>
              <h3 className="mt-8 text-3xl font-semibold text-white">{useCase.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{useCase.description}</p>
              <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">→</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}