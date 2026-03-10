import { TeamGrid } from "@/components/TeamGrid";


export function TeamSection() {
  return (
    <section id="team" className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8 md:p-12">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-300">Team</p>
              <h2 className="mt-6 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl md:text-6xl">
                The people translating robotics research into industrial systems.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                A focused team spanning robotics, product engineering, and deployment design. Select a member to view more detail directly on this page.
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <TeamGrid />
          </div>
        </div>
      </div>
    </section>
  );
}