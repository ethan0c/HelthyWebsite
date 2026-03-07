import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "About – Helthy",
  description:
    "Meet the team behind Helthy. Built by lifters, for lifters. Our mission is to make health tracking free and accessible.",
  openGraph: {
    title: "About – Helthy",
    description:
      "Meet the team behind Helthy. Built by lifters, for lifters.",
    url: "https://helthy.app/about",
  },
};

const team = [
  {
    name: "Chibu",
    role: "Co-Founder",
    image: "/images/transform/chibu-after2.png",
    badge: "−70 lbs",
  },
  {
    name: "Ebuka",
    role: "Co-Founder",
    image: "/images/transform/ebu-after.jpg",
    badge: "+50 lbs",
  },
];

const milestones = [
  { date: "2024", label: "Development begins" },
  { date: "Jan 2025", label: "Helthy launches on iOS" },
  { date: "Feb 2025", label: "Apple Watch + Android launch" },
  { date: "Mar 2025", label: "Helthy 2.0 — total rebuild" },
  { date: "Apr 2026", label: "Helthy Premium (AI Coach)" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-padding pt-36 sm:pt-44 glow-center">
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          <span className="pill-badge mb-5">About Helthy</span>
          <h1 className="font-heading font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6">
            Built by lifters,
            <br />
            <span className="accent-serif text-helthy-lemon">for lifters.</span>
          </h1>
          <p className="text-base text-white/35 max-w-2xl leading-relaxed">
            Helthy started because the founders couldn&apos;t find a single
            app that tracked workouts <em className="not-italic text-white/50">and</em> nutrition without charging
            $15+/month. So they built one.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
            <span className="pill-badge mb-5">Our Mission</span>
            <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white">
              Make health tracking free, beautiful, and powerful — so cost is
              never a barrier to <span className="accent-serif text-helthy-lemon">better health.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative section-padding dot-grid">
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          <span className="pill-badge mb-5">The Team</span>
          <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white mb-10">
            Real people. <span className="accent-serif text-helthy-lemon">Real transformations.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-helthy-lemon text-helthy-black text-xs font-mono font-medium">
                    {t.badge}
                  </div>
                </div>
                <h3 className="text-lg font-heading font-medium text-white">{t.name}</h3>
                <p className="text-sm text-white/35">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative section-padding hatch-bg">
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
          <span className="pill-badge mb-5">Timeline</span>
          <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white mb-10">
            Where we&apos;ve <span className="accent-serif text-helthy-lemon">been.</span>
          </h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-6 py-5 border-t border-white/[0.06] last:border-b last:border-white/[0.06]"
              >
                <span className="text-sm font-mono text-helthy-lemon w-24 flex-shrink-0">
                  {m.date}
                </span>
                <span className="text-sm text-white/50">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
