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
  Trophy,
  TrendingUp,
  Target,
  Camera,
  Import,
  Zap,
  Shield,
  BarChart3,
  ImageIcon,
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feature-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
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
      style={{ backgroundColor: "#191B1D" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Everything you need,"
          italicTail="nothing you don't"
          trailingPunctuation=""
        />

        {/* 3 hero features — large cards, asymmetric bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: AI Photo Logging (large — 7 col) */}
          <FeatureCard
            className="lg:col-span-7"
            minH={580}
            bgImage="/textures/card-leaves.jpg"
            headline={<>
              <span className="text-italics">Snap</span> your plate
            </>}
            subtitle="Point, shoot, logged. AI reads your meal, breaks down macros, and files it — no searching, no typing."
          >
            <FoodMockup />
          </FeatureCard>

          {/* Card 2: AI Coach (5 col) */}
          <FeatureCard
            className="lg:col-span-5"
            minH={580}
            bgImage="/textures/card-water.jpg"
            headline="Your AI coach"
            subtitle="Powered by Claude. Connects your nutrition, training, sleep, and weight to give advice that's actually personal."
          >
            <AIMockup />
          </FeatureCard>

          {/* Card 3: Workouts — full width, shorter */}
          <FeatureCard
            className="lg:col-span-12"
            minH={480}
            bgImage="/textures/card-stone.jpg"
            headline="Every lift, covered"
            subtitle="1,500+ exercises with muscle maps, form cues, and personal records tracked automatically."
          >
            <WorkoutMockup />
          </FeatureCard>
        </div>

        {/* ── Expanded feature grid — everything else ── */}
        <div className="mt-16">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-8">
            And that&apos;s just the start
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MiniFeature
              icon={Trophy}
              accent="#F59E0B"
              title="30+ achievements"
              description="Rarity tiers from Common to Legendary with unlock animations and progress tracking."
            />
            <MiniFeature
              icon={TrendingUp}
              accent="#22C55E"
              title="Adaptive TDEE engine"
              description="Targets update weekly based on your real activity — not static formulas."
            />
            <MiniFeature
              icon={Target}
              accent="#EF4444"
              title="Goal ETA & plateau detection"
              description="Know exactly when you'll hit your target. Stuck? Get a personalized fix plan."
            />
            <MiniFeature
              icon={BarChart3}
              accent="#3B82F6"
              title="Adherence score & insights"
              description="Weekly physique reports, strength forecasts, momentum score, and signal cards."
            />
            <MiniFeature
              icon={Zap}
              accent="#CDFF50"
              title="Streaks & habit tracking"
              description="Workout streaks, protein target streaks, and habit scores that keep you accountable."
            />
            <MiniFeature
              icon={ImageIcon}
              accent="#8B5CF6"
              title="Progress photo comparisons"
              description="Side-by-side earliest vs latest in a shareable grid. Smart nudges every 7 days."
            />
            <MiniFeature
              icon={Camera}
              accent="#EC4899"
              title="Nutrition label scanner"
              description="Point your camera at any nutrition panel — OCR reads it and logs instantly."
            />
            <MiniFeature
              icon={Import}
              accent="#14B8A6"
              title="Import from other apps"
              description="Bring your data from Apple Fitness, Hevy, Strong, MFP, MacroFactor, and more."
            />
            <MiniFeature
              icon={Shield}
              accent="#6366F1"
              title="Private & secure"
              description="Your data is never sold or used for AI training. Encrypted storage, no sensitive logs."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// Mini feature card for the expanded grid

function MiniFeature({
  icon: Icon,
  accent,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
  accent: string;
  title: string;
  description: string;
}) {
  return (
    <div
      data-feature-card
      className="card-helthy p-6 sm:p-7 flex flex-col gap-4"
      style={{ minHeight: "auto" }}
    >
      <div
        className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
        style={{
          background: `${accent}12`,
          border: `1px solid ${accent}25`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.75} />
      </div>
      <div>
        <h4 className="text-[16px] font-semibold text-white tracking-tight mb-1.5">
          {title}
        </h4>
        <p className="text-[13px] text-white/50 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Shell

function FeatureCard({
  className = "",
  minH = 500,
  headline,
  subtitle,
  bgImage,
  children,
}: {
  className?: string;
  minH?: number;
  headline: React.ReactNode;
  subtitle: string;
  bgImage?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-feature-card
      className={`card-helthy flex flex-col ${className}`}
      style={{ minHeight: minH }}
    >
      {/* Background texture image */}
      {bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
            filter: "brightness(0.7) saturate(0.5)",
          }}
        />
      )}

      {/* Gradient overlay for text readability */}
      {bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      )}

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3] mix-blend-overlay"
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
      {/* Photo hero */}
      <div className="relative" style={{ height: 190 }}>
        <Image
          src="/1-8.jpg"
          alt="Blueberry pancakes with maple syrup"
          width={440}
          height={190}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[60px]" style={{ background: `linear-gradient(transparent, ${T.bg})`, opacity: 0.95 }} />
        <div className="absolute top-3 right-4 flex items-center gap-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.45)", padding: "6px 12px" }}>
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-[11px] font-semibold text-white uppercase tracking-wide">AI analyzed</span>
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 rounded-t-[24px]" style={{ marginTop: -24, background: T.bg, paddingTop: 20 }}>
        <div className="px-5 mb-4">
          <p className="text-[24px] font-semibold" style={{ color: T.text, letterSpacing: -0.4 }}>
            Blueberry Pancakes
          </p>
          <p className="text-[13px] font-medium mt-1" style={{ color: T.textSecondary }}>
            3 items identified
          </p>
        </div>

        {/* Summary macro bar */}
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

        {/* Identified items */}
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

        {/* Bottom bar */}
        <div className="flex gap-3 px-5 pt-3 pb-5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-[14px] font-semibold"
            style={{ background: T.card, border: `1.5px solid ${T.border}60`, color: T.text }}
          >
            Edit
          </button>
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
      {/* Header */}
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
          <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
            <circle cx="50" cy="50" r={ringRadius} fill="none" stroke={T.arcUnfilled} strokeWidth="5" />
            <circle cx="50" cy="50" r={ringRadius - 7} fill="none" stroke={T.arcUnfilled} strokeWidth="4" />
            <circle cx="50" cy="50" r={ringRadius - 13} fill="none" stroke={T.arcUnfilled} strokeWidth="3.5" />
            <circle cx="50" cy="50" r={ringRadius} fill="none" stroke={ringColors.training} strokeWidth="5"
              strokeLinecap="round" strokeDasharray={`${ringCirc * 0.72} ${ringCirc}`} transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r={ringRadius - 7} fill="none" stroke={ringColors.nutrition} strokeWidth="4"
              strokeLinecap="round" strokeDasharray={`${(ringRadius - 7) * 2 * Math.PI * 0.85} ${(ringRadius - 7) * 2 * Math.PI}`} transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r={ringRadius - 13} fill="none" stroke={ringColors.movement} strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray={`${(ringRadius - 13) * 2 * Math.PI * 0.60} ${(ringRadius - 13) * 2 * Math.PI}`} transform="rotate(-90 50 50)" />
            <text x="50" y="47" textAnchor="middle" fontSize="22" fontWeight="700" fill={T.text} fontFamily="'Unbounded', sans-serif">
              {overallScore}
            </text>
            <text x="50" y="60" textAnchor="middle" fontSize="8" fill={T.textSecondary} fontFamily="sans-serif">
              / 100
            </text>
          </svg>

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

        <p className="relative text-[12px] leading-[18px] mt-3" style={{ color: T.text }}>
          Strong nutrition week — you hit protein 6/7 days. Training volume is down 15% though. Prioritize your Thursday session.
        </p>
      </div>

      {/* Chapter label */}
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

      {/* Weekly report mini card */}
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
// Mockup 3 — Exercise library

const exerciseList = [
  { name: "Barbell bench press", equipment: "Barbell", muscles: "Chest, Triceps", icon: "🏋️" },
  { name: "Conventional deadlift", equipment: "Barbell", muscles: "Back, Glutes", icon: "💪" },
  { name: "Back squat", equipment: "Barbell", muscles: "Quads, Glutes", icon: "🦵" },
  { name: "Pull-ups", equipment: "Bodyweight", muscles: "Back, Biceps", icon: "🧗" },
];

function WorkoutMockup() {
  return (
    <div
      className="w-[92%] max-w-[420px] mb-[-40px] rounded-t-[20px] pb-8"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Header */}
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

      {/* Search bar */}
      <div className="mx-4 mb-2">
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-[12px]"
          style={{ background: T.bg, border: `1px solid ${T.border}40` }}
        >
          <Search className="w-4 h-4" style={{ color: T.textSecondary }} />
          <span className="text-[14px] flex-1" style={{ color: T.textSecondary }}>
            Search 1,502 exercises...
          </span>
        </div>
      </div>

      {/* Exercise list */}
      <div className="px-4 space-y-3">
        {exerciseList.map((ex) => (
          <div
            key={ex.name}
            className="flex items-center gap-3 p-4 rounded-[16px]"
            style={{ background: T.card, border: `1px solid ${T.border}20` }}
          >
            <div
              className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center shrink-0 text-[20px]"
              style={{ background: T.primary + "12" }}
            >
              {ex.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold mb-0.5" style={{ color: T.text }}>
                {ex.name}
              </p>
              <p className="text-[12px]" style={{ color: T.textSecondary }}>
                {ex.equipment} · {ex.muscles}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
