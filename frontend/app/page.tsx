import { BackedBySection } from "@/components/BackedBySection";
import { CompanyFooter } from "@/components/CompanyFooter";
import { HeroSection } from "@/components/HeroSection";
import { InspectionProcess } from "@/components/InspectionProcess";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { TeamSection } from "@/components/TeamSection";
import { TechnologySection } from "@/components/TechnologySection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { ScrollMediaBackdrop } from "@/components/ScrollMediaBackdrop";


const navigationItems = [
  { label: "Technology", href: "#technology" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Process", href: "#process" },
  { label: "Journey", href: "#journey" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];


export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden bg-[#020611] text-white">
      <ScrollMediaBackdrop />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_18%),linear-gradient(180deg,rgba(2,6,17,0),rgba(2,6,17,0.55)_40%,rgba(2,6,17,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
            <a href="#top" className="flex items-center gap-3 text-white">
              <img src="/media/brand/logo-white.svg" alt="Armatrix" className="h-7 w-auto" />
              <span className="text-sm font-semibold uppercase tracking-[0.35em]">Armatrix</span>
            </a>
            <nav className="hidden items-center gap-8 md:flex">
              {navigationItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#team"
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
            >
              Meet the team
            </a>
          </div>
        </header>

        <div id="top" className="relative">
          <HeroSection />
          <TechnologySection />
          <BackedBySection />
          <UseCasesSection />
          <InspectionProcess />
          <JourneyTimeline />
          <TeamSection />
          <CompanyFooter />
        </div>
      </div>
    </main>
  );
}