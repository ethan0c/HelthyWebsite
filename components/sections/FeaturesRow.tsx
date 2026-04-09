"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  Sunrise,
  UtensilsCrossed,
  Moon,
  ChevronDown,
  Plus,
  Play,
  Check,
  Trophy,
  Sparkles,
} from "lucide-react";

// Real tokens from mobile app dark theme
const T = {
  primary: "#CDFB50",
  buttonText: "#151515",
  bg: "#111111",
  card: "#2A2A2A",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
  border: "#2E2E30",
  arcUnfilled: "#1D1D1D",
  caloriesBar: "#FF6B6B",
  protein: "#4CAF50",
  carbs: "#2196F3",
  fats: "#FF9800",
  fiber: "#9C27B0",
  mealBreakfast: "#FF9500",
  mealLunch: "#34C759",
  mealDinner: "#5856D6",
};

// Abstract gradient backgrounds — unique per card
const BGS = {
  lime: `
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(205,255,80,0.22), transparent 60%),
    radial-gradient(ellipse 100% 70% at 85% 90%, rgba(80,200,255,0.18), transparent 55%),
    radial-gradient(ellipse 60% 50% at 60% 40%, rgba(140,100,255,0.12), transparent 70%),
    linear-gradient(180deg, #0d1006 0%, #0a0a0a 100%)
  `,
  rose: `
    radial-gradient(ellipse 90% 70% at 80% 20%, rgba(255,140,100,0.22), transparent 60%),
    radial-gradient(ellipse 80% 60% at 15% 85%, rgba(255,80,180,0.15), transparent 60%),
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,100,255,0.10), transparent 70%),
    linear-gradient(180deg, #100808 0%, #0a0808 100%)
  `,
  teal: `
    radial-gradient(ellipse 90% 70% at 10% 20%, rgba(80,220,200,0.20), transparent 60%),
    radial-gradient(ellipse 80% 60% at 85% 80%, rgba(100,130,255,0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 55% 45%, rgba(205,255,80,0.08), transparent 70%),
    linear-gradient(180deg, #060e10 0%, #080a0b 100%)
  `,
  amber: `
    radial-gradient(ellipse 90% 70% at 75% 15%, rgba(255,180,80,0.22), transparent 60%),
    radial-gradient(ellipse 80% 60% at 15% 90%, rgba(255,100,60,0.15), transparent 60%),
    radial-gradient(ellipse 60% 50% at 40% 50%, rgba(255,220,120,0.08), transparent 70%),
    linear-gradient(180deg, #100c06 0%, #0a0806 100%)
  `,
};

export default function FeaturesRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.86, y: 80 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.from("[data-feature-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative px-2 lg:px-3 pt-2 lg:pt-3 bg-[#060606]"
    >
      <div
        ref={cardRef}
        className="relative mx-auto bg-[#0F0F0F] overflow-hidden border border-white/[0.06]"
        style={{
          borderRadius: "40px",
          boxShadow:
            "0 -40px 100px -40px rgba(205,251,80,0.12), 0 1px 0 0 rgba(255,255,255,0.05) inset",
          willChange: "transform",
        }}
      >
        <div className="px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-display-xl font-heading font-light tracking-tight max-w-3xl mx-auto">
                Everything you need.{" "}
                <span className="text-italics text-white/60">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>

            {/* Asymmetric bento — 12 col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
              {/* Row 1, Card A: Photo meal log (large, 7 col) */}
              <FeatureCard
                bg={BGS.lime}
                className="lg:col-span-7"
                minH={560}
                headline={
                  <>
                    <span className="text-italics">Snap</span> your plate
                  </>
                }
                subtitle="Point, shoot, logged. Helthy reads your meal, breaks down macros, and files it in seconds — no searching, no typing."
              >
                <FoodMockup />
              </FeatureCard>

              {/* Row 1, Card B: AI Coach (5 col) */}
              <FeatureCard
                bg={BGS.rose}
                className="lg:col-span-5"
                minH={560}
                headline={
                  <>
                    <span className="text-italics">Ask</span> anything
                  </>
                }
                subtitle="A Claude-powered coach that actually knows your goals, history, and macros."
              >
                <AIMockup />
              </FeatureCard>

              {/* Row 2, Card C: Workout (5 col) */}
              <FeatureCard
                bg={BGS.teal}
                className="lg:col-span-5"
                minH={520}
                headline={
                  <>
                    <span className="text-italics">Lift</span> smarter
                  </>
                }
                subtitle="Sets, reps, PRs. Form tips and rest timers built right in."
              >
                <WorkoutMockup />
              </FeatureCard>

              {/* Row 2, Card D: Weight (7 col) */}
              <FeatureCard
                bg={BGS.amber}
                className="lg:col-span-7"
                minH={520}
                headline={
                  <>
                    <span className="text-italics">Watch</span> the trend
                  </>
                }
                subtitle="Weight, macros, streaks, and progress photos. Real analytics, no noise."
              >
                <WeightMockup />
              </FeatureCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// Shell

function FeatureCard({
  bg,
  className = "",
  minH = 500,
  headline,
  subtitle,
  children,
}: {
  bg: string;
  className?: string;
  minH?: number;
  headline: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-feature-card
      className={`relative overflow-hidden flex flex-col ${className}`}
      style={{
        borderRadius: 32,
        background: bg,
        border: "1px solid rgba(255,255,255,0.08)",
        minHeight: minH,
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset",
      }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "200px",
        }}
      />

      {/* Copy block */}
      <div className="relative px-8 lg:px-10 pt-10 lg:pt-12 pb-6 text-center">
        <h3 className="font-heading font-light text-[34px] lg:text-[40px] leading-[1.05] tracking-tight text-white mb-4">
          {headline}
        </h3>
        <p className="text-[14px] lg:text-[15px] text-white/65 max-w-md mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Mockup area — grows to fill, crops at bottom */}
      <div className="relative flex-1 flex items-end justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 1 — NutritionHeroCard + meal rows (cropped bottom)

function FoodMockup() {
  return (
    <div
      className="w-[88%] max-w-[440px] mb-[-40px] rounded-t-[20px] p-5 pb-6"
      style={{
        background: T.card,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Hero: calories + bar */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[26px] font-semibold leading-none"
            style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}
          >
            1,840
          </span>
          <span className="text-[11px]" style={{ color: T.textSecondary }}>
            kcal eaten
          </span>
        </div>
        <span className="text-[11px] font-medium" style={{ color: T.caloriesBar }}>
          360 left
        </span>
      </div>
      <div
        className="h-[5px] rounded-full mb-5"
        style={{ background: T.arcUnfilled }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: "84%", background: T.caloriesBar }}
        />
      </div>

      {/* 4 macro rings */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {[
          { label: "Protein", val: "142g", color: T.protein, pct: 0.88 },
          { label: "Carbs", val: "210g", color: T.carbs, pct: 0.72 },
          { label: "Fats", val: "58g", color: T.fats, pct: 0.64 },
          { label: "Fiber", val: "22g", color: T.fiber, pct: 0.55 },
        ].map((m) => (
          <div key={m.label} className="flex flex-col items-center">
            <svg width="54" height="54" viewBox="0 0 54 54">
              <circle
                cx="27"
                cy="27"
                r="22"
                fill="none"
                stroke={T.arcUnfilled}
                strokeWidth="5"
              />
              <circle
                cx="27"
                cy="27"
                r="22"
                fill="none"
                stroke={m.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${138.2 * m.pct} 138.2`}
                transform="rotate(-90 27 27)"
              />
              <text
                x="27"
                y="31"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={T.text}
              >
                {m.val}
              </text>
            </svg>
            <span
              className="text-[9px] mt-1 uppercase tracking-wider"
              style={{ color: T.textSecondary }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* 2 meal rows visible, 3rd cropped */}
      <div className="space-y-2">
        {[
          {
            meal: "Breakfast",
            items: "2 items • 560 CAL",
            icon: Sunrise,
            color: T.mealBreakfast,
          },
          {
            meal: "Lunch",
            items: "3 items • 720 CAL",
            icon: UtensilsCrossed,
            color: T.mealLunch,
          },
          {
            meal: "Dinner",
            items: "Add first item",
            icon: Moon,
            color: T.mealDinner,
            empty: true,
          },
        ].map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.meal}
              className="flex items-center gap-3 p-3 rounded-[14px]"
              style={{ background: T.bg }}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: row.color + "26" }}
              >
                <Icon className="w-5 h-5" style={{ color: row.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[14px] font-medium"
                  style={{ color: T.text }}
                >
                  {row.meal}
                </p>
                <p
                  className="text-[11px]"
                  style={{
                    color: row.empty ? T.textSecondary + "99" : T.textSecondary,
                  }}
                >
                  {row.items}
                </p>
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: T.card }}
              >
                <Plus className="w-4 h-4" style={{ color: T.textSecondary }} />
              </div>
              <ChevronDown
                className="w-3.5 h-3.5"
                style={{ color: T.textSecondary }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 2 — AI Coach chat (bare-text assistant style)

function AIMockup() {
  return (
    <div
      className="w-[90%] max-w-[360px] mb-[-40px] rounded-t-[20px] p-5 pb-8"
      style={{
        background: T.card,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: T.border }}>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: T.primary + "26" }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: T.primary }} />
        </div>
        <span className="text-[13px] font-semibold" style={{ color: T.text }}>
          Coach
        </span>
      </div>

      <div className="space-y-4">
        {/* User */}
        <div className="flex justify-end">
          <div
            className="px-3.5 py-2 text-[12px] font-medium max-w-[78%] leading-snug"
            style={{
              background: T.primary,
              color: T.buttonText,
              borderRadius: "20px 20px 6px 20px",
            }}
          >
            Should I squat today or rest legs?
          </div>
        </div>
        {/* Assistant — bare text */}
        <div>
          <p className="text-[12px] leading-[18px]" style={{ color: T.text }}>
            You squatted heavy Tuesday and only slept 6h. Keep legs light today — mobility work plus a Z2 walk. Hit squats Friday when you&apos;re recovered.
          </p>
        </div>
        {/* User */}
        <div className="flex justify-end">
          <div
            className="px-3.5 py-2 text-[12px] font-medium max-w-[72%] leading-snug"
            style={{
              background: T.primary,
              color: T.buttonText,
              borderRadius: "20px 20px 6px 20px",
            }}
          >
            What should I eat? Need 200g protein.
          </div>
        </div>
        {/* Assistant */}
        <div>
          <p className="text-[12px] leading-[18px]" style={{ color: T.text }}>
            You&apos;ve hit 142g so far. Add Greek yogurt (17g) and 6oz chicken (38g) to close the gap.
          </p>
          <button
            className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold rounded-full"
            style={{ background: T.primary + "26", color: T.primary }}
          >
            Log meal
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 3 — New workout (set rows)

function WorkoutMockup() {
  return (
    <div
      className="w-[92%] max-w-[380px] mb-[-40px] rounded-t-[20px] p-5 pb-8"
      style={{
        background: T.card,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Duration strip */}
      <div
        className="flex items-center p-3 rounded-[14px] mb-4"
        style={{ background: T.bg }}
      >
        <div className="flex-1">
          <p
            className="text-[9px] font-semibold tracking-[1px] mb-0.5"
            style={{ color: T.textSecondary }}
          >
            DURATION
          </p>
          <p
            className="text-[20px] font-bold"
            style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}
          >
            00:23
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: T.primary + "26" }}
        >
          <Play
            className="w-4 h-4 fill-current"
            style={{ color: T.primary }}
          />
        </div>
        <div className="flex-1 text-right">
          <p
            className="text-[9px] font-semibold tracking-[1px] mb-0.5"
            style={{ color: T.textSecondary }}
          >
            SETS
          </p>
          <p
            className="text-[20px] font-bold"
            style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}
          >
            03
          </p>
        </div>
      </div>

      {/* Exercise title */}
      <p
        className="text-[14px] font-semibold mb-2.5"
        style={{ color: T.text }}
      >
        Bench Press
      </p>

      {/* Set rows */}
      <div className="space-y-2">
        {[
          { set: 1, reps: 12, kg: 60, done: true, pr: false },
          { set: 2, reps: 10, kg: 70, done: true, pr: true },
          { set: 3, reps: 8, kg: 80, done: false, pr: false },
        ].map((row) => (
          <div
            key={row.set}
            className="flex items-center gap-2 p-2.5 rounded-[12px]"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
              style={{ background: T.primary, color: T.buttonText }}
            >
              {row.set}
            </div>
            <div
              className="flex-1 px-3 py-1.5 rounded-[8px] text-[12px] text-center"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
            >
              {row.reps} reps
            </div>
            <div
              className="flex-1 px-3 py-1.5 rounded-[8px] text-[12px] text-center"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
            >
              {row.kg} kg
            </div>
            {row.pr ? (
              <Trophy className="w-5 h-5" style={{ color: "#FFB020" }} />
            ) : row.done ? (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: T.primary }}
              >
                <Check
                  className="w-3 h-3"
                  strokeWidth={3}
                  style={{ color: T.buttonText }}
                />
              </div>
            ) : (
              <div
                className="w-5 h-5 rounded-full"
                style={{ border: `2px solid ${T.border}` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 4 — Weight screen (chart + stats)

function WeightMockup() {
  return (
    <div
      className="w-[88%] max-w-[460px] mb-[-40px] rounded-t-[20px] p-5 pb-8"
      style={{
        background: T.card,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-3">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[34px] font-semibold leading-none"
            style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}
          >
            82.4
          </span>
          <span className="text-[14px]" style={{ color: T.textSecondary }}>
            kg
          </span>
        </div>
        <span
          className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1"
          style={{ background: T.primary, color: T.buttonText }}
        >
          <Plus className="w-3 h-3" strokeWidth={3} /> Log
        </span>
      </div>

      {/* Period pills */}
      <div className="flex gap-1.5 mb-4">
        {[
          { label: "Week", active: false },
          { label: "Month", active: true },
          { label: "6 Months", active: false },
        ].map((p) => (
          <div
            key={p.label}
            className="px-3 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: p.active ? T.primary + "26" : "transparent",
              color: p.active ? T.primary : T.textSecondary,
              border: p.active ? "none" : `1px solid ${T.border}`,
            }}
          >
            {p.label}
          </div>
        ))}
      </div>

      {/* Chart */}
      <svg viewBox="0 0 400 90" className="w-full mb-4" fill="none">
        <defs>
          <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={T.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="0,78 55,72 110,66 165,58 220,48 275,38 330,28 400,18 400,90 0,90"
          fill="url(#wGrad)"
        />
        <polyline
          points="0,78 55,72 110,66 165,58 220,48 275,38 330,28 400,18"
          stroke={T.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="400" cy="18" r="4" fill={T.primary} />
        <circle cx="400" cy="18" r="8" fill={T.primary} fillOpacity="0.25" />
      </svg>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "START", val: "92.0", hl: false },
          { label: "LOST", val: "-9.6", hl: true },
          { label: "GOAL", val: "78.0", hl: false },
        ].map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-[12px]"
            style={{ background: T.bg }}
          >
            <p
              className="text-[9px] font-semibold tracking-[0.8px] mb-1"
              style={{ color: T.textSecondary }}
            >
              {s.label}
            </p>
            <p
              className="text-[16px] font-bold"
              style={{
                color: s.hl ? T.primary : T.text,
                fontFamily: "'Unbounded', sans-serif",
              }}
            >
              {s.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
