"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Flame, Camera } from "lucide-react";

/* ── Macro pill colors matching the actual app ─────────────── */
const MACRO = {
  protein: { color: "#4CAF50", label: "P" },
  carbs: { color: "#2196F3", label: "C" },
  fats: { color: "#FF9800", label: "F" },
  calories: "#FF6B6B",
};

/* ── Identified food items — looks like the app's FoodItemCard ── */
const foods = [
  {
    icon: "🥗",
    name: "Mixed Greens Salad",
    serving: "1 bowl · 120g",
    cal: 45,
    protein: 3,
    carbs: 6,
    fats: 1,
  },
  {
    icon: "🍣",
    name: "Grilled Salmon",
    serving: "1 fillet · 170g",
    cal: 354,
    protein: 39,
    carbs: 0,
    fats: 21,
  },
  {
    icon: "🥑",
    name: "Avocado",
    serving: "½ medium · 68g",
    cal: 114,
    protein: 1,
    carbs: 6,
    fats: 10,
  },
  {
    icon: "🍅",
    name: "Cherry Tomatoes",
    serving: "6 pieces · 90g",
    cal: 16,
    protein: 1,
    carbs: 3,
    fats: 0,
  },
];

const totalCal = foods.reduce((s, f) => s + f.cal, 0);
const totalP = foods.reduce((s, f) => s + f.protein, 0);
const totalC = foods.reduce((s, f) => s + f.carbs, 0);
const totalF = foods.reduce((s, f) => s + f.fats, 0);

function MacroPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-[3px] rounded-full px-2 py-[3px] text-[11px]"
      style={{ backgroundColor: color + "15" }}
    >
      <span className="font-semibold" style={{ color: "#e0e0e0" }}>
        {value}
      </span>
      <span className="text-[9px] font-semibold" style={{ color }}>
        {label}
      </span>
    </span>
  );
}

export default function AIScanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-ai-text]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-ai-photo]", {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ai-photo]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-ai-card]", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ai-card]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      });

      /* Stagger each food row */
      gsap.utils.toArray<HTMLElement>("[data-food-row]").forEach((el, i) => {
        gsap.from(el, {
          y: 16,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-ai-card]",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          delay: 0.5 + i * 0.1,
        });
      });

      /* Pulsing scan ring */
      gsap.to("[data-scan-ring]", {
        scale: 1.5,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-ai-photo]",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-helthy-lemon/[0.03] blur-[200px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header — centered, bigger */}
        <div data-ai-text className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-helthy-lemon/20 bg-helthy-lemon/5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-helthy-lemon" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-helthy-lemon">
              AI-Powered
            </span>
          </div>
          <h2 className="text-display-lg mb-4">
            Snap a photo.<br />
            <span className="text-helthy-lemon">Know every macro.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/40 font-light leading-relaxed max-w-lg mx-auto">
            Point your camera at any meal. Our AI identifies each item and logs it instantly — calories, protein, carbs, and fats.
          </p>
        </div>

        {/* Two-col: meal photo + food card list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start max-w-6xl mx-auto">
          {/* Left — Meal photo with scan overlay */}
          <div data-ai-photo className="relative rounded-3xl overflow-hidden aspect-square">
            <img
              src="/images/stock/meal-overhead.jpg"
              alt="Meal being scanned"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

            {/* Scan ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-20 h-20">
                <div
                  data-scan-ring
                  className="absolute inset-0 rounded-full border-2 border-helthy-lemon/50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-helthy-lemon drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Bottom badge */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-helthy-lemon animate-pulse" />
              <span className="text-[11px] text-white/70 font-mono">Scanning…</span>
            </div>
          </div>

          {/* Right — App-style meal card */}
          <div data-ai-card className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111] overflow-hidden">
            {/* Meal header — like MealHistoryCard */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#34C75915" }}>
                <span className="text-base">🥗</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Lunch</p>
                <p className="text-[11px] text-white/30">AI identified · 4 items</p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: MACRO.calories + "15" }}>
                <Flame className="w-3 h-3" style={{ color: MACRO.calories }} />
                <span className="text-xs font-semibold text-white">{totalCal}</span>
              </div>
            </div>

            {/* Food item rows — matching FoodItemCard layout */}
            <div>
              {foods.map((f, i) => (
                <div
                  key={f.name}
                  data-food-row
                  className={`flex items-center gap-3 px-5 py-3.5 ${
                    i < foods.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{f.icon}</span>
                  </div>

                  {/* Name + serving + macros */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-white truncate">
                          {f.name}
                        </p>
                        <p className="text-[11px] text-white/30 mt-0.5">
                          {f.serving}
                        </p>
                      </div>
                      {/* Cal badge */}
                      <div className="flex items-center gap-1 px-2 py-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: MACRO.calories + "12" }}>
                        <Flame className="w-2.5 h-2.5" style={{ color: MACRO.calories }} />
                        <span className="text-[11px] font-semibold text-white">{f.cal}</span>
                      </div>
                    </div>
                    {/* Macro pills */}
                    <div className="flex gap-1.5 mt-2">
                      <MacroPill value={f.protein} label={MACRO.protein.label} color={MACRO.protein.color} />
                      <MacroPill value={f.carbs} label={MACRO.carbs.label} color={MACRO.carbs.color} />
                      <MacroPill value={f.fats} label={MACRO.fats.label} color={MACRO.fats.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
              <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Total</span>
              <div className="flex items-center gap-4">
                <MacroPill value={totalP} label="P" color={MACRO.protein.color} />
                <MacroPill value={totalC} label="C" color={MACRO.carbs.color} />
                <MacroPill value={totalF} label="F" color={MACRO.fats.color} />
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: MACRO.calories + "12" }}>
                  <Flame className="w-3 h-3" style={{ color: MACRO.calories }} />
                  <span className="text-xs font-semibold text-white">{totalCal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
