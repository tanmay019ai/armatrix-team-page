import { getTeamMembers } from "@/lib/api";


export const dynamic = "force-dynamic";


export default async function TeamPage() {
  let teamMembers = [];
  let loadError = false;

  try {
    teamMembers = await getTeamMembers();
  } catch {
    loadError = true;
  }

  return (
    <main className="min-h-screen px-6 py-12 md:px-10 md:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-hero-grid bg-white/75 p-8 shadow-card backdrop-blur md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ember">
            Team directory
          </p>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-[var(--font-display)] text-4xl leading-tight text-ink md:text-6xl">
                Armatrix delivery team
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Live data is loaded from the FastAPI backend at http://localhost:8000/team.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 text-sm text-slate-600">
              <span className="block font-semibold text-ink">{teamMembers.length} members</span>
              <span className="mt-1 block">Responsive grid powered by Tailwind CSS</span>
            </div>
          </div>

          {loadError ? (
            <div className="mt-10 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-6 text-amber-900">
              The frontend could not reach the backend. Start the FastAPI server with `uvicorn main:app --reload` in the backend folder, then refresh this page.
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-6 shadow-card transition hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-lg font-bold text-teal">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-ink">{member.name}</h2>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-ember">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{member.department}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}