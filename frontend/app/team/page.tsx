import { TeamGrid } from "@/components/TeamGrid";


export default function TeamPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://armatrix-team-page.onrender.com";
  const apiSource = `${apiBaseUrl.replace(/\/$/, "")}/team`;

  return (
    <main className="min-h-screen px-6 py-10 md:px-10 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-card backdrop-blur dark:border-white/10 dark:bg-aurora-dark dark:shadow-glow">
          <div className="border-b border-slate-200/80 p-8 dark:border-white/10 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.38em] text-ember dark:text-sky-300">
                  Team directory
                </p>
                <h1 className="mt-5 font-[var(--font-display)] text-3xl leading-tight text-ink dark:text-white sm:text-4xl md:text-6xl">
                  Meet the people building Armatrix.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
                  A modern, responsive team page powered by FastAPI, Next.js, Axios, Tailwind CSS, and Framer Motion.
                </p>
              </div>

              <div className="grid max-w-lg gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    API source
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {apiSource}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    Experience
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    Motion cards, loading skeletons, and a member detail panel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <TeamGrid />
          </div>
        </div>
      </section>
    </main>
  );
}