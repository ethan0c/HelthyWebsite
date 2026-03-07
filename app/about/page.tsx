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
      <section className="section-padding pt-36 sm:pt-44">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-eyebrow mb-3">About Helthy</p>
          <h1 className="text-display-xl mb-6">
            Built by lifters,
            <br />
            <span className="text-helthy-lemon">for lifters.</span>
          </h1>
          <p className="text-body-lg max-w-2xl">
            Helthy started because the founders couldn&apos;t find a single
            app that tracked workouts <em>and</em> nutrition without charging
            $15+/month. So they built one.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="glass-card p-8 sm:p-12">
            <p className="text-xs font-mono tracking-wider uppercase text-helthy-lemon/60 mb-4">
              Our mission
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
              Make health tracking free, beautiful, and powerful — so cost is
              never a barrier to better health.
            </h2>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-eyebrow mb-3">The team</p>
          <h2 className="text-display-md text-white mb-10">
            Real people. Real transformations.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((t) => (
              <div key={t.name} className="glass-card p-5">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-helthy-lemon text-helthy-black text-xs font-medium">
                    {t.badge}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white">{t.name}</h3>
                <p className="text-sm text-white/40">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-eyebrow mb-3">Timeline</p>
          <h2 className="text-display-md text-white mb-10">Where we&apos;ve been.</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-6 py-5 border-t border-white/[0.06] last:border-b"
              >
                <span className="text-sm font-mono text-helthy-lemon w-24 flex-shrink-0">
                  {m.date}
                </span>
                <span className="text-sm text-white/60">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
