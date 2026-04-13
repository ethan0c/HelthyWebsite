"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  TrendingUp,
  Target,
  Camera,
  Import,
  Zap,
  Shield,
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
            <ScreenshotMockup src="/phones/ai-meal-scan.png" alt="AI photo meal logging with instant macro breakdown" wide cropBottom={20} />
          </FeatureCard>

          {/* Card 2: Weight Progress (5 col) */}
          <FeatureCard
            className="lg:col-span-5 self-start"
            bgImage="/textures/card-water.jpg"
            headline={<>See your <span className="text-italics text-helthy-lemon">progress</span></>}
            subtitle="Watch the weight trend chart tell your story. Every weigh-in plotted, every milestone visible."
          >
            <WeightGraphMockup />
          </FeatureCard>

          {/* Card 3: Workouts — full width, 3 screenshots side by side */}
          <FeatureCard
            className="lg:col-span-12"
            minH={480}
            bgImage="/textures/card-stone.jpg"
            headline="Every lift, covered"
            subtitle="1,500+ exercises with muscle maps, form cues, and personal records tracked automatically."
          >
            <TripleScreenshotMockup
              screens={[
                { src: "/phones/exercise-library-screen.png", alt: "Exercise library with search" },
                { src: "/phones/exercise-info-screen.png", alt: "Exercise form tips and how-to" },
                { src: "/phones/activity-logging-screen.png", alt: "Cardio and activity logging" },
              ]}
            />
          </FeatureCard>
        </div>

        {/* ── Expanded features link ── */}
        <div className="mt-16 text-center">
          <Link
            href="/changelog"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-white/70 hover:text-white transition-all duration-300 border border-white/10 rounded-full px-6 py-3 hover:bg-white/5 hover:border-white/20"
          >
            And so much more. See everything that changed since 1.2.7 &rarr;
          </Link>
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
      className="relative p-6 sm:p-7 flex flex-col gap-4 rounded-[1.5rem] overflow-hidden transition-all duration-400 hover:-translate-y-[2px]"
      style={{
        minHeight: "auto",
        background: `linear-gradient(135deg, ${accent}06 0%, rgba(255,255,255,0.025) 40%, rgba(255,255,255,0.01) 100%)`,
        border: `1.5px solid ${accent}18`,
        boxShadow:
          /* Top bevel highlight */
          `rgba(255,255,255,0.06) 0px 1px 0px 0px inset,` +
          `${accent}08 0px 0px 12px 0px inset,` +
          /* Outer depth */
          `rgba(0,0,0,0.1) 0px 2px 4px -1px,` +
          `rgba(0,0,0,0.12) 0px 8px 16px -4px,` +
          `${accent}12 0px 20px 40px -16px,` +
          `rgba(0,0,0,0.2) 0px 32px 56px -20px`,
      }}
    >
      {/* Top edge bevel — accent-tinted */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}25, transparent)` }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "200px",
        }}
      />

      <div
        className="relative w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
        style={{
          background: `${accent}14`,
          border: `1.5px solid ${accent}30`,
          boxShadow: `0 4px 12px -4px ${accent}25, inset 0 1px 0 0 ${accent}15`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.75} />
      </div>
      <div className="relative">
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
// Achievement card grid — 2×2 real rarity card screenshots

const ACHIEVEMENT_CARDS = [
  { src: "/phones/achievements/common.png", alt: "Common achievement - All Rings Closed", glow: "#9CA3AF" },
  { src: "/phones/achievements/rare.png", alt: "Rare achievement - PR Hunter", glow: "#339AF0" },
  { src: "/phones/achievements/epic.png", alt: "Epic achievement - Centurion", glow: "#A855F7" },
  { src: "/phones/achievements/legendary.png", alt: "Legendary achievement - Year of Iron", glow: "#F59E0B" },
];

function AchievementCardGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 px-6 pb-4 mb-[-20px] w-full max-w-[460px]">
      {ACHIEVEMENT_CARDS.map((card) => (
        <div
          key={card.alt}
          className="rounded-[16px] overflow-hidden"
          style={{
            boxShadow: `0 8px 24px -8px ${card.glow}40, 0 2px 8px rgba(0,0,0,0.3)`,
          }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            width={220}
            height={140}
            style={{ width: "100%", height: "auto" }}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Screenshot mockup — real app screenshot in a phone-like frame

function ScreenshotMockup({ src, alt, wide, noCrop, cropBottom }: { src: string; alt: string; wide?: boolean; noCrop?: boolean; cropBottom?: number }) {
  return (
    <div
      className={`${wide ? "w-[85%] max-w-[380px]" : "w-[70%] max-w-[300px]"} ${noCrop ? "mb-4" : "mb-[-40px]"} rounded-[20px] overflow-hidden`}
      style={{
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        ...(cropBottom ? { marginBottom: -cropBottom } : {}),
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={650}
        style={{ width: "100%", height: "auto" }}
        className="object-cover object-top"
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Triple screenshot mockup — 3 phones side by side

function TripleScreenshotMockup({ screens }: { screens: { src: string; alt: string }[] }) {
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5 px-4 mb-[-40px]">
      {screens.map((s, i) => (
        <div
          key={s.src}
          className="w-[70%] max-w-[300px] rounded-t-[20px] overflow-hidden"
          style={{
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            transform: i === 1 ? "translateY(-12px)" : undefined,
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={300}
            height={650}
            style={{ width: "100%", height: "auto" }}
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Shell

function FeatureCard({
  className = "",
  minH,
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
      style={{
        ...(minH ? { minHeight: minH } : {}),
        background: "linear-gradient(135deg, #151515 0%, #41515A 100%)",
      }}
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
      <div className="relative px-6 lg:px-10 pt-10 lg:pt-12 pb-6 text-center">
        <h3 className="font-heading font-light text-[30px] lg:text-[36px] leading-[1.05] tracking-tight text-white mb-3">
          {headline}
        </h3>
        <p className="text-[14px] lg:text-[15px] text-white/65 max-w-md mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Mockup area — grows to fill, aligns content */}
      <div className="relative flex-1 flex items-end justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Mockup 2 — Digital Scale (matches mobile DigitalScale.tsx)

// Seven-segment digit map — which of the 7 segments are lit per character
// Layout:  _0_
//         |5  |1
//          _6_
//         |4  |2
//          _3_
const SEGMENT_MAP: Record<string, boolean[]> = {
  "0": [true, true, true, true, true, true, false],
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
  "-": [false, false, false, false, false, false, true],
  " ": [false, false, false, false, false, false, false],
};

function SevenSegDigit({
  char,
  size,
  activeColor,
  ghostColor,
}: {
  char: string;
  size: number;
  activeColor: string;
  ghostColor: string;
}) {
  const segments = SEGMENT_MAP[char] ?? SEGMENT_MAP[" "];
  const t = Math.max(size * 0.1, 3);
  const gap = t * 0.3;
  const w = size * 0.55;
  const h = size;
  const halfH = h / 2;

  const hSeg = (top: number, active: boolean, key: string) => (
    <div
      key={key}
      className="absolute rounded-full"
      style={{
        top: top - t / 2,
        left: gap,
        width: w - gap * 2,
        height: t,
        backgroundColor: active ? activeColor : ghostColor,
      }}
    />
  );

  const vSeg = (left: number, top: number, active: boolean, key: string) => (
    <div
      key={key}
      className="absolute rounded-full"
      style={{
        left: left - t / 2,
        top: top + gap,
        width: t,
        height: halfH - gap * 2,
        backgroundColor: active ? activeColor : ghostColor,
      }}
    />
  );

  return (
    <div className="relative" style={{ width: w, height: h }}>
      {hSeg(0, segments[0], "s0")}
      {vSeg(w, 0, segments[1], "s1")}
      {vSeg(w, halfH, segments[2], "s2")}
      {hSeg(h, segments[3], "s3")}
      {vSeg(0, halfH, segments[4], "s4")}
      {vSeg(0, 0, segments[5], "s5")}
      {hSeg(halfH, segments[6], "s6")}
    </div>
  );
}

function DecimalDot({ size, color }: { size: number; color: string }) {
  const dotSize = Math.max(size * 0.1, 3);
  return (
    <div
      className="self-end rounded-full"
      style={{ width: dotSize, height: dotSize, backgroundColor: color, marginBottom: 1 }}
    />
  );
}

function SevenSegDisplay({
  value,
  digitSize,
  activeColor,
  ghostColor,
  spacing = 10,
}: {
  value: string;
  digitSize: number;
  activeColor: string;
  ghostColor: string;
  spacing?: number;
}) {
  return (
    <div className="flex items-end" style={{ gap: spacing }}>
      {value.split("").map((c, i) =>
        c === "." ? (
          <DecimalDot key={i} size={digitSize} color={activeColor} />
        ) : (
          <SevenSegDigit key={i} char={c} size={digitSize} activeColor={activeColor} ghostColor={ghostColor} />
        ),
      )}
    </div>
  );
}

// Flicker animation: rapidly cycle numbers then settle on final value
const FLICKER_FRAMES = [
  "184.2", "191.7", "175.3", "182.9", "179.1", "176.8",
  "178.4", "177.6", "177.2", "177.0", "177.0", "177.0",
];

// ── Weight trend graph data (7 day view — matches mobile's 7-day display) ──
const WEIGHT_DATA = [178.4, 178.1, 177.6, 177.9, 177.4, 177.2, 177.0];
const W_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const W_SVG = { w: 320, h: 160, padL: 40, padR: 16, padT: 16, padB: 24 };
const W_CHART = {
  w: W_SVG.w - W_SVG.padL - W_SVG.padR,
  h: W_SVG.h - W_SVG.padT - W_SVG.padB,
};
// Y-axis range from data
const W_MIN = Math.min(...WEIGHT_DATA) - 1;
const W_MAX = Math.max(...WEIGHT_DATA) + 1;

function weightToY(v: number) {
  return W_SVG.padT + W_CHART.h * (1 - (v - W_MIN) / (W_MAX - W_MIN));
}
function idxToX(i: number) {
  return W_SVG.padL + (i / (WEIGHT_DATA.length - 1)) * W_CHART.w;
}

function buildWeightPath() {
  const pts = WEIGHT_DATA.map((v, i) => ({ x: idxToX(i), y: weightToY(v) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1].x + pts[i].x) / 2;
    d += ` C ${cpx} ${pts[i - 1].y}, ${cpx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  return { line: d, pts };
}

const NUMERIC_FONT = "'Unbounded', sans-serif";

function WeightGraphMockup() {
  const scaleRef = useRef<HTMLDivElement>(null);
  const [frameIdx, setFrameIdx] = React.useState(-1);
  const deltaColor = "#FF6B6B";
  const { line, pts } = buildWeightPath();
  const lastPt = pts[pts.length - 1];
  const areaPath = `${line} L ${lastPt.x} ${W_SVG.h - W_SVG.padB} L ${pts[0].x} ${W_SVG.h - W_SVG.padB} Z`;
  // Smart Y-axis ticks (matches mobile getScaleTicks)
  const yRange = W_MAX - W_MIN;
  const yStep = Math.ceil(yRange / 4 * 2) / 2; // round to 0.5
  const yTicks: number[] = [];
  for (let v = Math.floor(W_MIN); v <= Math.ceil(W_MAX); v += yStep) {
    yTicks.push(Math.round(v * 10) / 10);
  }

  useEffect(() => {
    if (!scaleRef.current) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: scaleRef.current, start: "top 75%" };

      // Press-down bounce on scale
      gsap.fromTo(
        "[data-scale-body]",
        { scale: 1 },
        {
          scale: 0.99,
          duration: 0.18,
          ease: "power2.out",
          scrollTrigger: trigger,
          yoyo: true,
          repeat: 1,
        },
      );

      // Flicker sequence for seven-segment display
      const tl = gsap.timeline({ scrollTrigger: trigger });
      FLICKER_FRAMES.forEach((_, i) => {
        tl.call(() => setFrameIdx(i), [], i * 0.12);
      });

      const flickerEnd = FLICKER_FRAMES.length * 0.12;

      // Fade in delta badge after settle
      gsap.from("[data-scale-delta]", {
        opacity: 0,
        y: 8,
        duration: 0.4,
        delay: flickerEnd + 0.3,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      // Draw weight trend line
      gsap.fromTo("[data-weight-line]", 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: flickerEnd + 0.2,
          ease: "power2.out",
          scrollTrigger: trigger,
        }
      );

      // Fade in area fill
      gsap.from("[data-weight-area]", {
        opacity: 0,
        duration: 0.8,
        delay: flickerEnd + 0.8,
        ease: "power2.out",
        scrollTrigger: trigger,
      });

      // Pop in last dot
      gsap.from("[data-weight-dot]", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: flickerEnd + 1.4,
        ease: "back.out(3)",
        scrollTrigger: trigger,
      });

      // Fade in graph section label
      gsap.from("[data-weight-label]", {
        opacity: 0,
        y: 6,
        duration: 0.4,
        delay: flickerEnd + 0.1,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
    }, scaleRef);
    return () => ctx.revert();
  }, []);

  const isSettled = frameIdx >= 0;
  const displayValue = isSettled ? FLICKER_FRAMES[frameIdx] : "888.8";
  const padded = displayValue.length < 5
    ? " ".repeat(5 - displayValue.length) + displayValue
    : displayValue;

  const activeColor = isSettled ? T.primary : `${T.text}1A`;
  const ghostColor = `${T.text}1A`;

  return (
    <div
      ref={scaleRef}
      className="w-[92%] max-w-[360px] mb-2 rounded-[20px] overflow-hidden"
      style={{
        background: T.bg,
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* ── Digital Scale Section ── */}
      <div data-scale-body className="flex flex-col items-center pt-5 pb-4">
        {/* Scale display box */}
        <div
          className="flex flex-col items-center rounded-[16px] px-7 py-5 overflow-hidden"
          style={{ backgroundColor: T.card }}
        >
          <SevenSegDisplay
            value={padded}
            digitSize={48}
            activeColor={activeColor}
            ghostColor={ghostColor}
          />
          <span
            className="text-[13px] font-semibold uppercase mt-3"
            style={{ color: T.textSecondary, letterSpacing: 2, fontFamily: "var(--font-body)" }}
          >
            lbs
          </span>
        </div>

        {/* Delta badge with arrow */}
        <div
          data-scale-delta
          className="flex items-center gap-1.5 mt-3 rounded-[12px] px-3 py-1.5"
          style={{ backgroundColor: `${deltaColor}18` }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polygon points="5,10 0,0 10,0" fill={deltaColor} />
          </svg>
          <span
            className="text-[14px] font-medium"
            style={{ color: deltaColor, fontFamily: NUMERIC_FONT }}
          >
            2.3 lbs
          </span>
        </div>
      </div>

      {/* ── Weight Trend Graph ── */}
      <div className="px-2 pb-4">
        <p
          data-weight-label
          className="text-[11px] font-semibold tracking-[1px] mb-3 px-3"
          style={{ color: T.textSecondary, fontFamily: "var(--font-body)" }}
        >
          7-DAY TREND
        </p>


        <svg
          width="100%"
          viewBox={`0 0 ${W_SVG.w} ${W_SVG.h}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="weightAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={T.primary} stopOpacity="0.18" />
              <stop offset="1" stopColor={T.primary} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines + Y labels */}
          {yTicks.map((v) => {
            const y = weightToY(v);
            return (
              <g key={v}>
                <line
                  x1={W_SVG.padL} y1={y} x2={W_SVG.w - W_SVG.padR} y2={y}
                  stroke={T.border} strokeOpacity="0.15" strokeWidth="1"
                />
                <text
                  x={W_SVG.padL - 8} y={y + 3}
                  textAnchor="end" fontSize="9" fontWeight="500"
                  fill={T.textSecondary} opacity="0.7"
                  style={{ fontFamily: NUMERIC_FONT }}
                >
                  {v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Day labels (matches mobile: 10px, fontWeight 600, Unbounded for numbers/labels) */}
          {W_DAY_LABELS.map((label, i) => (
            <text
              key={label}
              x={idxToX(i)} y={W_SVG.h - 4}
              textAnchor="middle" fontSize="10" fontWeight="600"
              fill={T.text}
              style={{ fontFamily: NUMERIC_FONT }}
            >
              {label}
            </text>
          ))}

          {/* Area fill */}
          <path data-weight-area d={areaPath} fill="url(#weightAreaFill)" />

          {/* Bezier trend line */}
          <path
            data-weight-line
            d={line}
            fill="none"
            stroke={T.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point circles (matches mobile: 3.5r stroke for normal, 5r filled for last) */}
          {pts.map((pt, idx) => {
            const isLast = idx === pts.length - 1;
            return (
              <g key={idx} {...(isLast ? { "data-weight-dot": "" } : {})} style={isLast ? { transformOrigin: `${pt.x}px ${pt.y}px` } : undefined}>
                {isLast && <circle cx={pt.x} cy={pt.y} r="8" fill={T.primary} opacity="0.15" />}
                <circle
                  cx={pt.x} cy={pt.y}
                  r={isLast ? 5 : 3.5}
                  fill={isLast ? T.primary : T.bg}
                  stroke={T.primary}
                  strokeWidth={isLast ? 2.5 : 2}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
