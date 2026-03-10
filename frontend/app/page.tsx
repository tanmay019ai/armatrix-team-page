import Link from "next/link";


export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl rounded-[2rem] border border-white/70 bg-white/70 p-10 shadow-card backdrop-blur md:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">
          Full-stack starter
        </p>
        <h1 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl leading-tight text-ink md:text-6xl">
          Team management UI with a FastAPI backend and a Next.js frontend.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          The frontend uses the App Router, TypeScript, Tailwind CSS, and Axios to load team data from the backend.
        </p>
        <Link
          href="/team"
          className="mt-10 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
        >
          View team page
        </Link>
      </section>
    </main>
  );
}