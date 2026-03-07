"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";

/* ── Founder transformations ──────────────────────────────── */
const founders = [
  {
    name: "Chibu",
    badge: "−70 lbs · 12 months",
    before: "/images/transform/chibu-before.jpg",
    after: "/images/transform/chibu-after2.png",
  },
  {
    name: "Ebuka",
    badge: "+50 lbs · 24 months",
    before: "/images/transform/ebu-before.jpg",
    after: "/images/transform/ebu-after.jpg",
  },
];

/* ── Competitor pricing ───────────────────────────────────── */
const competitors = [
  { name: "MyFitnessPal", price: "$19.99/mo" },
  { name: "Strong", price: "$14.99/mo" },
  { name: "Cal AI", price: "$9.99/mo" },
];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Heading clip reveal */
      gsap.from("[data-proof-headline]", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      /* Price counter $20 → $0 */
      const counter = { value: 20 };
      gsap.to(counter, {
        value: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-proof-price]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const el = document.querySelector("[data-proof-price]");
          if (el) el.textContent = `$${Math.round(counter.value)}`;
        },
      });

      /* Transform cards */
      gsap.utils.toArray<HTMLElement>("[data-transform]").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });
      });

      /* Competitor rows slide in */
      gsap.utils.toArray<HTMLElement>("[data-comp-row]").forEach((el, i) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-comp-table]",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: 0.2 + i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ── Headline ── */}
        <div className="text-center mb-20 sm:mb-28">
          <div className="overflow-hidden">
            <h2 data-proof-headline className="text-display-xl">
              Built by lifters.
              <br />
              <span className="text-helthy-lemon">Free for everyone.</span>
            </h2>
          </div>
        </div>

        {/* ── Before / After cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {founders.map((f) => (
            <div
              key={f.name}
              data-transform
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06]"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={f.before}
                    alt={`${f.name} before`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] text-white/40 font-mono uppercase tracking-widest">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={f.after}
                    alt={`${f.name} after`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] text-helthy-lemon font-mono uppercase tracking-widest">
                    After
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-white">{f.name}</span>
                  <span className="px-3 py-1.5 rounded-full bg-helthy-lemon text-[#0B0B0B] text-xs font-semibold">
                    {f.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pricing proof ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — big $0 */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-mono tracking-widest uppercase text-white/25 mb-3">
              Industry standard
            </p>
            <div className="flex items-baseline gap-3 justify-center lg:justify-start">
              {competitors.map((c, i) => (
                <span key={i} className="text-lg font-mono text-white/20 line-through decoration-white/10">
                  {c.price}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm font-mono tracking-widest uppercase text-helthy-lemon/50 mb-2">
                Helthy
              </p>
              <span
                data-proof-price
                className="text-[6rem] sm:text-[8rem] font-heading font-black leading-none text-helthy-lemon"
              >
                $0
              </span>
              <p className="text-white/25 text-sm mt-2">/month · forever</p>
            </div>
          </div>

          {/* Right — what you get */}
          <div data-comp-table>
            {/* Competitor rows */}
            <div className="space-y-3 mb-8">
              {competitors.map((c) => (
                <div
                  key={c.name}
                  data-comp-row
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01]"
                >
                  <div className="flex items-center gap-3">
                    <X className="w-4 h-4 text-red-400/40" />
                    <span className="text-sm text-white/35">{c.name}</span>
                  </div>
                  <span className="text-sm font-mono text-white/20 line-through decoration-white/10">
                    {c.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Helthy row */}
            <div
              data-comp-row
              className="flex items-center justify-between px-4 py-4 rounded-xl border border-helthy-lemon/15 bg-helthy-lemon/[0.04]"
            >
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-helthy-lemon" />
                <span className="text-sm text-white font-medium">Helthy — Everything included</span>
              </div>
              <span className="text-sm font-mono font-bold text-helthy-lemon">$0</span>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Workouts",
                "Nutrition",
                "Barcode Scanner",
                "Health Sync",
                "Progress Charts",
                "500+ Exercises",
                "1M+ Foods",
                "7 Themes",
              ].map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] text-xs text-white/35"
                >
                  <Check className="w-3 h-3 text-helthy-lemon/50" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
