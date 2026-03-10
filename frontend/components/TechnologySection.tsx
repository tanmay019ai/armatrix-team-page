"use client";

import { motion } from "framer-motion";


const armFrames = ["Robotic Arm Frame 1", "Robotic Arm Frame 2", "Robotic Arm Frame 3"];

const technologyCards = [
  {
    title: "Flexibility",
    description:
      "Hyper-redundant kinematics allow the manipulator to reach constrained inspection zones that conventional arms cannot access.",
  },
  {
    title: "Precision",
    description:
      "Fine motion control stabilizes each segment to preserve inspection accuracy in dense and dynamic environments.",
  },
  {
    title: "Automation",
    description:
      "Autonomous inspection routines reduce operator burden while preserving repeatable data capture across large assets.",
  },
  {
    title: "Manipulation",
    description:
      "The system couples inspection-grade sensing with dexterous robotic motion for intervention and verification tasks.",
  },
];

const productGallery = [
  { src: "/media/product/product-01.jpg", alt: "Armatrix robotic arm render" },
  { src: "/media/product/product-02.jpg", alt: "Armatrix inspection system" },
  { src: "/media/product/product-03.jpg", alt: "Armatrix robotic arm detail" },
  { src: "/media/product/product-04.jpg", alt: "Armatrix platform snapshot" },
  { src: "/media/product/product-05.jpg", alt: "Armatrix robotic system" },
  { src: "/media/product/product-06.jpg", alt: "Armatrix robotics concept" },
  { src: "/media/product/product-07.png", alt: "Armatrix product visual" },
];


export function TechnologySection() {
  return (
    <section id="technology" className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Technology</p>
          <h2 className="mt-6 max-w-2xl font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
            Robotic arms designed to inspect tight spaces within complex machinery.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            The Armatrix platform combines hyper-redundant motion, dexterous control, and inspection-focused robotics innovation to move through constrained industrial systems with far greater flexibility than traditional arms.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {armFrames.map((frame, index) => (
              <motion.span
                key={frame}
                animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300"
              >
                {frame}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {technologyCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 backdrop-blur-xl">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div className="space-y-5">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/40">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Product visuals</p>
                      <p className="mt-2 text-lg font-semibold text-white">Real renders in motion</p>
                    </div>
                    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                      scroll reactive
                    </span>
                  </div>

                  <div className="grid gap-3 p-5 sm:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] sm:row-span-2">
                      <img
                        src={productGallery[0].src}
                        alt={productGallery[0].alt}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-full"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-slate-950/0" />
                    </div>

                    {[productGallery[2], productGallery[6]].map((item) => (
                      <div key={item.src} className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03]">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/0 to-slate-950/0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-white/8 bg-slate-950/35 p-6">
                <div className="flex items-center gap-3">
                  <img src="/media/brand/logo-white.svg" alt="" aria-hidden="true" className="h-6 w-auto opacity-80" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Manipulator architecture</p>
                    <p className="mt-2 text-lg font-semibold text-white">Robotic arm capabilities</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <FeatureLine title="Reach around infrastructure" value="Navigate pipes, vessels, and narrow access paths." />
                  <FeatureLine title="Maintain stable sensing" value="Preserve scan quality under complex pose adjustments." />
                  <FeatureLine title="Automate repeatable missions" value="Run consistent inspection programs with minimal manual reset." />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


type FeatureLineProps = {
  title: string;
  value: string;
};


function FeatureLine({ title, value }: FeatureLineProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{value}</p>
    </div>
  );
}