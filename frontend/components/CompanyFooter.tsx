"use client";

import { motion } from "framer-motion";


export function CompanyFooter() {
  return (
    <section id="contact" className="px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:p-12">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-3">
          <InfoCard
            eyebrow="Careers"
            title="Join us in pushing the boundaries of robotics and automation."
            body="We're looking for passionate innovators to shape the future."
            action="View Open Positions"
          />
          <InfoCard
            eyebrow="Blogs"
            title="Stories from the frontier of robotics innovation."
            body="Deep dives into technology, applications, and the future we're building."
            action="Read Our Articles"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Contact</p>
            <h3 className="mt-5 text-3xl font-semibold text-white">Get in touch</h3>
            <p className="mt-3 text-base leading-7 text-slate-300">Start a conversation</p>
            <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
              <div>
                <p className="text-slate-500">Email</p>
                <a href="mailto:contact@armatrix.in" className="mt-1 block text-base font-medium text-white hover:text-cyan-200">
                  contact@armatrix.in
                </a>
              </div>
              <div>
                <p className="text-slate-500">Our Office</p>
                <p className="mt-1 text-base text-white">
                  4th Floor, 444 Jai Tower
                  <br />
                  Sri Balaji Krupa Layout
                  <br />
                  RK Hegde Nagar
                  <br />
                  Bengaluru - 560077
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=4th%20Floor%2C%20444%20Jai%20Tower%2C%20Sri%20Balaji%20Krupa%20Layout%2C%20RK%20Hegde%20Nagar%2C%20Bengaluru%20-%20560077"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                View on Map
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img src="/media/brand/logo-white.svg" alt="Armatrix" className="h-7 w-auto" />
              <p className="text-lg font-semibold uppercase tracking-[0.32em] text-white">Armatrix</p>
            </div>
            <p className="mt-2">Products under development, currently not for sale</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Media Kit</span>
            <span>Privacy Policy</span>
            <span>Armatrix 2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </section>
  );
}


type InfoCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  action: string;
};


function InfoCard({ eyebrow, title, body, action }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">{eyebrow}</p>
      <h3 className="mt-5 text-3xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-base leading-7 text-slate-300">{body}</p>
      <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{action} →</div>
    </motion.div>
  );
}