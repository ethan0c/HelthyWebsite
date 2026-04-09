"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import React from "react";
import {
  Check,
  Sparkles,
  Flame,
  Search,
} from "lucide-react";

// Real tokens from mobile app dark theme (constants/colors.ts)
const T = {
  primary: "#CDFF50",
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
  success: "#22C55E",
  steps: "#0E9488",
  workout: "#5856D6",
  warning: "#F59E0B",
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
      className="relative section-padding px-6 lg:px-8"
    >
      <div ref={cardRef} className="relative" style={{ willChange: "transform" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
            <SectionHeading
              title="Everything you need"
              italicTail="nothing you don't"
            />

            {/* Asymmetric bento — 12 col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
              {/* Row 1, Card A: Photo meal log (large, 7 col) */}
              <FeatureCard
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
                className="lg:col-span-5"
                minH={560}
                headline="Your AI coach"
                subtitle="Personalized nudges powered by your data — nutrition, sleep, training, all connected."
              >
                <AIMockup />
              </FeatureCard>

              {/* Row 2, Card C: Workout (5 col) */}
              <FeatureCard
                className="lg:col-span-5"
                minH={520}
                headline="Every lift, covered"
                subtitle="350+ exercises with muscle maps, form cues, and video demos."
              >
                <WorkoutMockup />
              </FeatureCard>

              {/* Row 2, Card D: Weight + dashboard (7 col) */}
              <FeatureCard
                className="lg:col-span-7"
                minH={520}
                headline="Watch the trend"
                subtitle="Your weight story told in data. Smoothed trends, goal lines, and milestone markers."
              >
                <WeightMockup />
              </FeatureCard>
            </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// Shell

function FeatureCard({
  className = "",
  minH = 500,
  headline,
  subtitle,
  bg,
  children,
}: {
  className?: string;
  minH?: number;
  headline: React.ReactNode;
  subtitle: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-feature-card
      className={`card-helthy flex flex-col ${className}`}
      style={{ minHeight: minH, ...(bg ? { background: bg } : {}) }}
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
// Mockup 1 — PhotoMealResultScreen (exact match to mobile)

function FoodMockup() {
  const items = [
    { name: "Blueberry Pancakes", serving: "180g", p: 12, c: 68, f: 10, kcal: 420 },
    { name: "Maple Syrup", serving: "45g", p: 0, c: 52, f: 0, kcal: 210 },
    { name: "Fresh Blueberries", serving: "40g", p: 1, c: 6, f: 0, kcal: 28 },
  ];
  const totals = { kcal: 658, p: 13, c: 126, f: 10 };

  return (
    <div
      className="w-[88%] max-w-[440px] mb-[-40px] rounded-t-[20px] overflow-hidden flex flex-col"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Photo hero — 38% like mobile photoContainer */}
      <div className="relative" style={{ height: 190 }}>
        <Image
          src="/1-8.jpg"
          alt="Blueberry pancakes with maple syrup"
          width={440}
          height={190}
          className="w-full h-full object-cover"
        />
        {/* Bottom fade — matches photoFade (height:60, opacity:0.95) */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px]" style={{ background: `linear-gradient(transparent, ${T.bg})`, opacity: 0.95 }} />
        {/* AI badge — matches aiBadge (rgba(0,0,0,0.45), gap:6, px:12, py:6, full radius) */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.45)", padding: "6px 12px" }}>
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-[11px] font-semibold text-white uppercase tracking-wide">AI analyzed</span>
        </div>
      </div>

      {/* Content card — overlaps photo by -24px, 24px top radius */}
      <div className="flex-1 rounded-t-[24px]" style={{ marginTop: -24, background: T.bg, paddingTop: 20 }}>
        {/* Title block — px:20, mb:16 */}
        <div className="px-5 mb-4">
          <p className="text-[24px] font-semibold" style={{ color: T.text, letterSpacing: -0.4 }}>
            Blueberry Pancakes
          </p>
          <p className="text-[13px] font-medium mt-1" style={{ color: T.textSecondary }}>
            3 items identified
          </p>
        </div>

        {/* Summary macro bar — matches summaryBar (card bg, 16px radius, 12px padding, row with dividers) */}
        <div
          className="mx-5 flex items-center justify-between rounded-[16px] px-3 py-3"
          style={{ background: T.card }}
        >
          {[
            { label: "kcal", val: totals.kcal, color: T.caloriesBar },
            { label: "protein", val: totals.p, unit: "g", color: T.protein },
            { label: "carbs", val: totals.c, unit: "g", color: T.carbs },
            { label: "fat", val: totals.f, unit: "g", color: T.fats },
          ].map((m, i) => (
            <React.Fragment key={m.label}>
              {i > 0 && <div className="w-[1px] h-8" style={{ background: T.border }} />}
              <div className="flex flex-col items-center flex-1">
                <p className="text-[16px] font-bold" style={{ color: m.color, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.2 }}>
                  {m.val}{m.unit || ""}
                </p>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: T.textSecondary }}>
                  {m.label}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Identified items — matches itemCard (card bg, border, 16px radius, 12px padding, 8px gap) */}
        <div className="px-5 mt-4 space-y-2">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-[16px]"
              style={{ background: T.card, border: `1px solid ${T.border}40` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-tight" style={{ color: T.text }}>
                  {item.name}
                </p>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: T.textSecondary }}>
                  {item.serving} · {item.p}P · {item.c}C · {item.f}F
                </p>
              </div>
              {/* calBadge — 12px radius, calories color at 15% bg */}
              <div className="flex flex-col items-center px-3 py-1.5 rounded-[12px]" style={{ background: T.caloriesBar + "15", minWidth: 56 }}>
                <p className="text-[15px] font-bold" style={{ color: T.caloriesBar, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.2 }}>
                  {item.kcal}
                </p>
                <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: T.caloriesBar }}>
                  kcal
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar — matches bottomBar (px:20, pt:12, gap:12) */}
        <div className="flex gap-3 px-5 pt-3 pb-5">
          {/* Edit button — border style, card bg, 1.5px border, full radius */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-[14px] font-semibold"
            style={{ background: T.card, border: `1.5px solid ${T.border}60`, color: T.text }}
          >
            Edit
          </button>
          {/* Log button — primary fill, flex-1, full radius */}
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-semibold"
            style={{ background: T.primary, color: T.buttonText }}
          >
            <Check className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Log Meal
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 2 — Insights screen (momentum score ring + weekly report)

// Ring colors matching mobile: training #FF6B6B, nutrition #51CF66, movement #339AF0
const ringColors = { training: "#FF6B6B", nutrition: "#51CF66", movement: "#339AF0" };

function AIMockup() {
  const overallScore = 78;
  const ringRadius = 38;
  const ringCirc = 2 * Math.PI * ringRadius;

  return (
    <div
      className="w-[90%] max-w-[360px] mb-[-40px] rounded-t-[20px] pb-8 relative"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header — flame streak + title + NEW badge */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-1">
          <Flame className="w-[18px] h-[18px]" style={{ color: T.primary }} />
          <span className="text-[16px] font-bold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.3 }}>
            14
          </span>
        </div>
        <span className="text-[17px] font-semibold" style={{ color: T.text }}>Insights</span>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-[1px]"
          style={{ background: T.primary, color: T.buttonText }}
        >
          NEW
        </span>
      </div>

      {/* Momentum Score Card */}
      <div
        className="mx-4 p-4 rounded-[20px] relative overflow-hidden"
        style={{ background: T.card }}
      >
        {/* Subtle glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `${T.primary}08` }}
        />

        <p
          className="relative text-[10px] font-semibold tracking-[1.4px] mb-3"
          style={{ color: T.textSecondary }}
        >
          MOMENTUM SCORE
        </p>

        {/* Ring + subscores row */}
        <div className="relative flex items-center gap-4">
          {/* 3-layer momentum ring */}
          <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
            {/* Unfilled arcs */}
            <circle cx="50" cy="50" r={ringRadius} fill="none" stroke={T.arcUnfilled} strokeWidth="5" />
            <circle cx="50" cy="50" r={ringRadius - 7} fill="none" stroke={T.arcUnfilled} strokeWidth="4" />
            <circle cx="50" cy="50" r={ringRadius - 13} fill="none" stroke={T.arcUnfilled} strokeWidth="3.5" />
            {/* Filled arcs — training (outer), nutrition (mid), movement (inner) */}
            <circle cx="50" cy="50" r={ringRadius} fill="none" stroke={ringColors.training} strokeWidth="5"
              strokeLinecap="round" strokeDasharray={`${ringCirc * 0.72} ${ringCirc}`} transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r={ringRadius - 7} fill="none" stroke={ringColors.nutrition} strokeWidth="4"
              strokeLinecap="round" strokeDasharray={`${(ringRadius - 7) * 2 * Math.PI * 0.85} ${(ringRadius - 7) * 2 * Math.PI}`} transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r={ringRadius - 13} fill="none" stroke={ringColors.movement} strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray={`${(ringRadius - 13) * 2 * Math.PI * 0.60} ${(ringRadius - 13) * 2 * Math.PI}`} transform="rotate(-90 50 50)" />
            {/* Center score */}
            <text x="50" y="47" textAnchor="middle" fontSize="22" fontWeight="700" fill={T.text} fontFamily="'Unbounded', sans-serif">
              {overallScore}
            </text>
            <text x="50" y="60" textAnchor="middle" fontSize="8" fill={T.textSecondary} fontFamily="sans-serif">
              / 100
            </text>
          </svg>

          {/* Subscores */}
          <div className="flex flex-col gap-2 flex-1">
            {[
              { label: "Training", score: 72, color: ringColors.training },
              { label: "Nutrition", score: 85, color: ringColors.nutrition },
              { label: "Movement", score: 60, color: ringColors.movement },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-[11px] flex-1" style={{ color: T.textSecondary }}>{s.label}</span>
                <span className="text-[12px] font-bold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}>
                  {s.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative */}
        <p className="relative text-[12px] leading-[18px] mt-3" style={{ color: T.text }}>
          Strong nutrition week — you hit protein 6/7 days. Training volume is down 15% though. Prioritize your Thursday session.
        </p>
      </div>

      {/* Chapter label — "CHAPTER 1 · WINS THIS WEEK" */}
      <div className="flex items-center gap-3 px-5 mt-5 mb-3">
        <div className="flex-1 h-[0.5px]" style={{ background: T.border }} />
        <span
          className="text-[9px] font-semibold tracking-[1.4px] px-3 py-1.5 rounded-full"
          style={{ background: T.card, color: T.textSecondary }}
        >
          CHAPTER 1 · WINS THIS WEEK
        </span>
        <div className="flex-1 h-[0.5px]" style={{ background: T.border }} />
      </div>

      {/* Weekly report mini card — 2x2 metric grid */}
      <div className="mx-4 p-3 rounded-[16px]" style={{ background: T.card }}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "⚖️", label: "Weight", value: "-0.4 kg", sub: "On track" },
            { icon: "🍽️", label: "Nutrition", value: "2,180", sub: "avg kcal" },
            { icon: "🏋️", label: "Training", value: "4 / 5", sub: "sessions" },
            { icon: "👣", label: "Movement", value: "8,420", sub: "avg steps" },
          ].map((m) => (
            <div key={m.label} className="p-2.5 rounded-[12px]" style={{ background: T.bg }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[11px]">{m.icon}</span>
                <span className="text-[10px] font-medium" style={{ color: T.textSecondary }}>{m.label}</span>
              </div>
              <p className="text-[15px] font-bold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.2 }}>
                {m.value}
              </p>
              <p className="text-[9px] mt-0.5" style={{ color: T.textSecondary }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coach FAB */}
      <div
        className="absolute bottom-6 right-4 flex items-center gap-2 px-3.5 py-2.5 rounded-full"
        style={{ background: T.primary, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}
      >
        <Sparkles className="w-[16px] h-[16px]" style={{ color: T.buttonText }} />
        <span className="text-[13px] font-semibold" style={{ color: T.buttonText }}>Coach</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 3 — Exercise library (faithful to ExerciseLibraryScreen)

const exerciseList = [
  { name: "Barbell bench press", equipment: "Barbell", muscles: "Chest, Triceps", icon: "🏋️" },
  { name: "Conventional deadlift", equipment: "Barbell", muscles: "Back, Glutes", icon: "💪" },
  { name: "Back squat", equipment: "Barbell", muscles: "Quads, Glutes", icon: "🦵" },
  { name: "Pull-ups", equipment: "Bodyweight", muscles: "Back, Biceps", icon: "🧗" },
  { name: "Overhead press", equipment: "Barbell", muscles: "Shoulders, Triceps", icon: "🏋️" },
];

function WorkoutMockup() {
  return (
    <div
      className="w-[92%] max-w-[380px] mb-[-40px] rounded-t-[20px] pb-8"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header — matches ScreenHeader */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="w-10" />
        <span className="text-[17px] font-semibold" style={{ color: T.text }}>Exercise Library</span>
        <div
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
          style={{ background: T.primary }}
        >
          <span className="text-[18px] font-bold leading-none" style={{ color: T.buttonText }}>+</span>
          <span className="text-[12px] font-semibold" style={{ color: T.buttonText }}>New</span>
        </div>
      </div>

      {/* Search bar — matches newSearchContainer */}
      <div className="mx-4 mb-2">
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-[12px]"
          style={{ background: T.bg, border: `1px solid ${T.border}40` }}
        >
          <Search className="w-4 h-4" style={{ color: T.textSecondary }} />
          <span className="text-[14px] flex-1" style={{ color: T.textSecondary }}>
            Search 1,502 exercises...
          </span>
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: T.card }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter chips — Muscle + Equipment (matches filtersExpanded) */}
      <div className="flex gap-2 px-4 mb-3">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: T.primary }}
        >
          <span className="text-[13px]" style={{ color: T.buttonText }}>🎯</span>
          <span className="text-[13px] font-medium" style={{ color: T.buttonText }}>Chest</span>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: T.bg }}
        >
          <span className="text-[13px]" style={{ color: T.textSecondary }}>🏋️</span>
          <span className="text-[13px] font-medium" style={{ color: T.text }}>Equipment</span>
        </div>
      </div>

      {/* Exercise list — matches renderExerciseItem */}
      <div className="px-4 space-y-3">
        {exerciseList.map((ex) => (
          <div
            key={ex.name}
            className="flex items-center gap-3 p-4 rounded-[16px]"
            style={{ background: T.card, border: `1px solid ${T.border}20` }}
          >
            {/* Icon square — matches 52x52 icon container */}
            <div
              className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center shrink-0 text-[20px]"
              style={{ background: T.primary + "12" }}
            >
              {ex.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold mb-0.5" style={{ color: T.text }}>
                {ex.name}
              </p>
              <p className="text-[12px]" style={{ color: T.textSecondary }}>
                {ex.equipment} · {ex.muscles}
              </p>
            </div>

            {/* Chevron */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 4 — Weight screen (faithful to WeightScreen)

const weightHistory = [
  { weight: "82.4", date: "Apr 09", time: "8:30 AM", change: "-0.3", changeColor: "#4CAF50" },
  { weight: "82.7", date: "Apr 07", time: "7:45 AM", change: "+0.2", changeColor: "#FF6B35" },
  { weight: "82.5", date: "Apr 05", time: "9:10 AM", change: "-0.6", changeColor: "#4CAF50" },
];

function WeightMockup() {
  return (
    <div
      className="w-[88%] max-w-[460px] mb-[-40px] rounded-t-[20px] pb-8"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header — matches ScreenHeader */}
      <div className="flex items-center justify-center px-5 pt-5 pb-3 border-b" style={{ borderColor: T.border + "30" }}>
        <span className="text-[17px] font-semibold" style={{ color: T.text }}>Weight</span>
      </div>

      {/* Log Weight CTA — matches logCta */}
      <div
        className="mx-4 mt-3 p-3 rounded-[16px] flex items-center justify-between"
        style={{ background: T.card }}
      >
        <div className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 21h8M12 17v4M5 3h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" />
            <path d="M4 9l2 8h12l2-8" />
          </svg>
          <div>
            <p className="text-[16px] font-semibold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}>
              82.4 <span className="text-[12px] font-normal" style={{ color: T.textSecondary }}>kg</span>
            </p>
            <p className="text-[12px]" style={{ color: T.textSecondary }}>Last logged 2 hours ago</p>
          </div>
        </div>
        <div
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: T.primary }}
        >
          <span className="text-[18px] font-bold leading-none" style={{ color: T.buttonText }}>+</span>
          <span className="text-[13px] font-medium" style={{ color: T.buttonText }}>Log</span>
        </div>
      </div>

      {/* Summary row — Start / To Go / Target (matches summaryRow) */}
      <div className="grid grid-cols-3 gap-2 mx-4 mt-3">
        <div className="p-2.5 rounded-[12px] text-center" style={{ background: T.card }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.5px] mb-1" style={{ color: T.textSecondary }}>START</p>
          <p className="text-[18px] font-semibold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.3 }}>84.2</p>
          <p className="text-[10px]" style={{ color: T.textSecondary }}>kg</p>
        </div>
        <div
          className="p-2.5 rounded-[12px] text-center"
          style={{ background: T.primary, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.5px] mb-1" style={{ color: T.buttonText, opacity: 0.7 }}>TO GO</p>
          <p className="text-[18px] font-semibold" style={{ color: T.buttonText, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.3 }}>4.4</p>
          <p className="text-[10px]" style={{ color: T.buttonText, opacity: 0.7 }}>kg</p>
        </div>
        <div className="p-2.5 rounded-[12px] text-center" style={{ background: T.card }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.5px] mb-1" style={{ color: T.textSecondary }}>TARGET</p>
          <p className="text-[18px] font-semibold" style={{ color: T.primary, fontFamily: "'Unbounded', sans-serif", letterSpacing: -0.3 }}>78.0</p>
          <p className="text-[10px]" style={{ color: T.textSecondary }}>kg</p>
        </div>
      </div>

      {/* Graph section — Trends header + segmented control */}
      <div className="mx-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[17px] font-semibold" style={{ color: T.text }}>Trends</span>
          <div className="flex rounded-[6px] p-0.5" style={{ background: T.card }}>
            {[
              { label: "1W", active: false },
              { label: "1M", active: true },
              { label: "6M", active: false },
            ].map((seg) => (
              <div
                key={seg.label}
                className="px-3 py-1 rounded-[4px] text-[12px] font-medium"
                style={{
                  background: seg.active ? T.bg : "transparent",
                  color: seg.active ? T.text : T.textSecondary,
                  boxShadow: seg.active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {seg.label}
              </div>
            ))}
          </div>
        </div>

        {/* AnimatedLineChart — matches 180px height chart */}
        <svg viewBox="0 0 400 140" className="w-full" fill="none">
          <defs>
            <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.primary} stopOpacity="0.2" />
              <stop offset="100%" stopColor={T.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Gradient fill */}
          <polygon
            points="0,100 45,95 90,85 135,78 180,72 225,68 270,55 315,48 360,40 400,32 400,140 0,140"
            fill="url(#wGrad)"
          />
          {/* Trend line */}
          <polyline
            points="0,100 45,95 90,85 135,78 180,72 225,68 270,55 315,48 360,40 400,32"
            stroke={T.primary}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Current dot */}
          <circle cx="400" cy="32" r="4" fill={T.primary} />
          <circle cx="400" cy="32" r="8" fill={T.primary} fillOpacity="0.2" />
          {/* X-axis labels */}
          {[
            { label: "3/10", x: 0 },
            { label: "3/17", x: 135 },
            { label: "3/24", x: 270 },
            { label: "4/07", x: 400 },
          ].map((tick) => (
            <text key={tick.label} x={tick.x} y="138" fontSize="9" fill={T.textSecondary} fillOpacity="0.5" textAnchor="middle" fontFamily="sans-serif">
              {tick.label}
            </text>
          ))}
        </svg>
      </div>

      {/* History section — matches historySection with timeline */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[17px] font-semibold" style={{ color: T.text }}>History</span>
          <span className="text-[12px]" style={{ color: T.textSecondary }}>3 entries</span>
        </div>

        {weightHistory.map((entry, i) => (
          <div key={i} className="flex gap-3">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className="rounded-full shrink-0"
                style={{
                  width: i === 0 ? 10 : 8,
                  height: i === 0 ? 10 : 8,
                  background: i === 0 ? T.primary : T.border,
                  marginTop: 6,
                }}
              />
              {i < weightHistory.length - 1 && (
                <div className="w-[1px] flex-1 my-1" style={{ background: T.border + "40" }} />
              )}
            </div>

            {/* Entry card */}
            <div
              className="flex-1 flex items-center justify-between p-3 rounded-[14px] mb-2"
              style={{ background: T.card }}
            >
              <div>
                <p className="text-[15px] font-semibold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}>
                  {entry.weight} <span className="text-[11px] font-normal" style={{ color: T.textSecondary }}>kg</span>
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: T.textSecondary }}>
                  {entry.date} · {entry.time}
                </p>
              </div>
              <span
                className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: entry.changeColor + "12", color: entry.changeColor }}
              >
                {entry.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
