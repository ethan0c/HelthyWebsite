"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

/* ── Scanned food items ───────────────────────────────────── */
const foods = [
  { emoji: "🥗", name: "Mixed Greens Salad", serving: "1 bowl · 120 g", cal: 45, p: 3, c: 6, f: 1 },
  { emoji: "🍣", name: "Grilled Salmon", serving: "1 fillet · 170 g", cal: 354, p: 39, c: 0, f: 21 },
  { emoji: "🥑", name: "Avocado", serving: "½ medium · 68 g", cal: 114, p: 1, c: 6, f: 10 },
  { emoji: "🍅", name: "Cherry Tomatoes", serving: "6 pieces · 90 g", cal: 16, p: 1, c: 3, f: 0 },
];

const totalCal = foods.reduce((s, f) => s + f.cal, 0);

const COLORS = { p: "#4CAF50", c: "#2196F3", f: "#FF9800" };

function Pill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-[3px] rounded-full px-2 py-[3px] text-[11px]"
      style={{ backgroundColor: color + "18" }}
    >
      <span className="font-semibold text-white/70">{value}</span>
      <span className="text-[9px] font-semibold" style={{ color }}>{label}</span>
    </span>
  );
}

export default function ScannerDemo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-scan-text]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });

      gsap.from("[data-scan-card]", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-scan-card]", start: "top 80%", toggleActions: "play none none reverse" },
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Heading */}
        <div data-scan-text className="text-center mb-14 sm:mb-20">
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-helthy-lemon mb-4">
            AI-Powered
          </p>
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-white mb-4">
            Snap a photo. Know every macro.
          </h2>
          <p className="text-lg text-white/50 max-w-lg mx-auto leading-relaxed">
            Point your camera at any meal. Our AI identifies each item and logs
            calories, protein, carbs, and fats instantly.
          </p>
        </div>

        {/* Results card — centered, full-width */}
        <div
          data-scan-card
          className="rounded-2xl border border-white/[0.08] bg-[#0C0C0C] overflow-hidden max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-helthy-lemon/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-helthy-lemon" />
              </div>
              <span className="text-sm font-medium text-white/80">4 items detected</span>
            </div>
            <span className="text-sm font-mono text-white/40">{totalCal} kcal</span>
          </div>

          {/* Food rows */}
          <div className="divide-y divide-white/[0.04]">
            {foods.map((f, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <span className="text-2xl w-8 text-center flex-shrink-0">{f.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 font-medium">{f.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{f.serving}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Pill value={f.p} label="P" color={COLORS.p} />
                  <Pill value={f.c} label="C" color={COLORS.c} />
                  <Pill value={f.f} label="F" color={COLORS.f} />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white/30">Total</span>
            <span className="text-base font-mono font-semibold text-white/70">{totalCal} kcal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
