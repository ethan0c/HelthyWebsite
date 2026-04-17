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
      className="relative section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Aurora carryover from hero — subtle */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          zIndex: 0,
          top: "-200px",
          width: "min(1200px, 120vw)",
          height: 500,
          background: [
            "radial-gradient(ellipse 50% 50% at 35% 50%, rgba(120,170,255,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 50% at 70% 50%, rgba(205,255,80,0.05) 0%, transparent 60%)",
          ].join(","),
          filter: "blur(30px)",
        }}
      />

      <div className="container-page relative" style={{ zIndex: 1 }}>
        <SectionHeading
          title="Everything you need,"
          italicTail="nothing you don't"
          trailingPunctuation=""
        />

        {/* 3 hero features — balanced bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: AI Photo Logging (6 col) */}
          <FeatureCard
            className="lg:col-span-6"
            bgImage="/textures/card-leaves.jpg"
            headline={<>
              <span className="text-italics">Snap</span> your plate
            </>}
            subtitle="Point, shoot, logged."
          >
            <ScreenshotMockup src="/phones/ai-meal-scan.png" alt="AI photo meal logging with instant macro breakdown" wide cropBottom={20} />
          </FeatureCard>

          {/* Card 2: Weight Progress — chart + history (6 col) */}
          <FeatureCard
            className="lg:col-span-6"
            bgImage="/textures/card-water.jpg"
            headline={<>See your <span className="text-helthy-lemon">progress</span></>}
            subtitle="Every weigh-in, plotted. Every entry, tracked."
          >
            <div className="flex flex-col items-center gap-6 w-full">
              <WeightGraphMockup />
              <WeightHistoryList />
            </div>
          </FeatureCard>

          {/* Card 3: Workouts — full width, 3 screenshots side by side */}
          <FeatureCard
            className="lg:col-span-12"
            minH={560}
            bgImage="/textures/card-stone.jpg"
            headline="Every lift, covered"
            subtitle="1,500+ exercises. Every PR tracked."
          >
            <TripleScreenshotMockup
              tabs={["Library", "Form tips", "Activity"]}
              screens={[
                { src: "/phones/exercise-library-screen.png", alt: "Exercise library with search", width: 1321, height: 2659 },
                { src: "/phones/exercise-info-screen.png", alt: "Exercise form tips and how-to", width: 1328, height: 2707 },
                { src: "/phones/activity-logging-screen.png", alt: "Cardio and activity logging", width: 1328, height: 2117 },
              ]}
            />
          </FeatureCard>
        </div>

        {/* ── Expanded features link — editorial, not a button ── */}
        <div className="mt-20 flex flex-col sm:flex-row items-baseline gap-x-3 gap-y-2">
          <span
            className="font-heading font-light text-white/90"
            style={{
              fontSize: "clamp(28px, 3.4vw, 44px)",
              letterSpacing: "-0.03em",
              lineHeight: "1.05em",
            }}
          >
            More where that came from.
          </span>
          <Link
            href="/changelog"
            className="group inline-flex items-baseline gap-1.5 text-helthy-lemon transition-colors hover:opacity-80"
            style={{
              fontSize: "clamp(18px, 1.8vw, 22px)",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-italics">See all features</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
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
        <h4 className="text-[16px] font-medium text-white tracking-tight mb-1.5">
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
      className={`${wide ? "w-[95%] max-w-[460px]" : "w-[70%] max-w-[300px]"} ${noCrop ? "mb-4" : "mb-[-40px]"} rounded-[20px] overflow-hidden`}
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
// Tabbed screenshot mockup — click/auto-advance through screens

function TripleScreenshotMockup({
  screens,
  tabs,
}: {
  screens: { src: string; alt: string; width: number; height: number }[];
  tabs?: string[];
}) {
  const [active, setActive] = React.useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  // Smoothly tween the phone frame's aspect ratio to match the active screen
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const target = screens[active];
    const ratio = target.width / target.height; // width / height
    const proxy = {
      r: parseFloat(el.style.getPropertyValue("--ar") || String(ratio)),
    };
    gsap.to(proxy, {
      r: ratio,
      duration: 0.9,
      ease: "power3.inOut",
      onUpdate: () => {
        el.style.setProperty("--ar", String(proxy.r));
      },
    });
  }, [active, screens]);

  const labels = tabs ?? screens.map((s) => s.alt);
  const initialRatio = screens[0].width / screens[0].height;

  return (
    <div className="flex flex-col items-center w-full mb-[-40px]">
      {/* Tab row — CTAButton-style pills */}
      <div
        role="tablist"
        aria-label="Workout features"
        className="flex items-center gap-2 sm:gap-3 mb-8 flex-wrap justify-center"
      >
        {labels.map((label, i) => {
          const isActive = i === active;
          const pillStyle: React.CSSProperties = isActive
            ? {
                background: "#CDFF50",
                color: "#0B0B0B",
                boxShadow:
                  "inset 0 2px 1px 0 rgba(255,255,255,0.5)," +
                  "inset 0 0.6px 0.6px -1.25px rgba(255,255,255,0.72)," +
                  "inset 0 2.29px 2.29px -2.5px rgba(255,255,255,0.635)," +
                  "inset 0 10px 10px -3.75px rgba(255,255,255,0.25)," +
                  "0 14px 6px -8px rgba(205,255,80,0.35)",
              }
            : {
                background: "rgba(20,20,20,0.62)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(46,46,48,0.9)",
                backdropFilter: "blur(20px) saturate(140%)",
                WebkitBackdropFilter: "blur(20px) saturate(140%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06)," +
                  "0 8px 24px rgba(0,0,0,0.3)",
              };
          return (
            <button
              key={label}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className="hover:scale-[1.02]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 999,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "-0.005em",
                padding: "11px 20px",
                minHeight: 42,
                whiteSpace: "nowrap",
                transition:
                  "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), background-color 280ms ease, color 280ms ease, box-shadow 280ms ease",
                cursor: "pointer",
                ...pillStyle,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Phone frame — aspect-ratio tweens smoothly between screens */}
      <div
        ref={frameRef}
        className="relative w-[76%] sm:w-[62%] lg:w-[44%] max-w-[340px]"
        style={
          {
            "--ar": String(initialRatio),
            aspectRatio: "var(--ar)",
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-t-[28px] pointer-events-none"
          style={{
            boxShadow:
              "0 40px 100px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        />
        {screens.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 rounded-t-[28px] overflow-hidden transition-opacity duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? "auto" : "none",
            }}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 640px) 76vw, 340px"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
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
const SF_PRO_FONT = "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif";

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
      const trigger = {
        trigger: scaleRef.current,
        start: "top 85%",
        toggleActions: "restart none none reset" as const,
      };

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

      // Draw weight trend line — measure actual length so it ends on the dot
      const lineEl = scaleRef.current?.querySelector<SVGPathElement>(
        "[data-weight-line]"
      );
      const pathLen = lineEl ? lineEl.getTotalLength() : 1000;
      gsap.fromTo(
        "[data-weight-line]",
        { strokeDasharray: pathLen, strokeDashoffset: pathLen },
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

      // Pop in last dot — fade + settle, no overshoot
      gsap.fromTo(
        "[data-weight-dot]",
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          delay: flickerEnd + 1.7,
          ease: "power3.out",
          scrollTrigger: trigger,
        }
      );

      // Lemon glow pulse on the card when the line finishes drawing
      gsap.fromTo(
        "[data-weight-glow]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: flickerEnd + 1.4,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.15,
          scrollTrigger: trigger,
        },
      );

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
      className="relative w-[96%] max-w-[460px] mb-2 rounded-[20px] overflow-hidden"
      style={{
        background: T.bg,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7)," +
          "0 0 0 1px rgba(255,255,255,0.04)," +
          "0 0 40px -12px rgba(205,255,80,0.18)",
      }}
    >
      {/* Lemon glow pulse — fires when the line-draw completes */}
      <div
        data-weight-glow
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          opacity: 0,
          boxShadow:
            "0 0 60px -10px rgba(205,255,80,0.5)," +
            "inset 0 0 40px rgba(205,255,80,0.12)",
        }}
      />
      {/* ── Digital Scale Section ── */}
      <div data-scale-body className="flex flex-col items-center pt-5 pb-4">
        {/* Scale display box */}
        <div
          className="flex flex-col items-center rounded-[16px] px-7 py-5 overflow-hidden"
          style={{ backgroundColor: T.card }}
        >
          <SevenSegDisplay
            value={padded}
            digitSize={56}
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

// ───────────────────────────────────────────────────────────
// Weight history list — mirrors mobile /screens/home/WeightScreen.tsx
// Timeline spine (dot + line) + entry card per row. Green = loss, orange = gain.

const WEIGHT_HISTORY = [
  { date: "Apr 13", time: "8:14 AM", weight: 152.0, delta: -0.4 },
  { date: "Apr 11", time: "7:58 AM", weight: 152.4, delta: -0.2 },
  { date: "Apr 08", time: "8:02 AM", weight: 152.6, delta: +0.1 },
  { date: "Apr 06", time: "7:45 AM", weight: 152.5, delta: -0.3 },
  { date: "Apr 04", time: "8:22 AM", weight: 152.8, delta: 0 },
];

const DELTA_GAIN = "#FF6B35";
const DELTA_LOSS = "#4CAF50";

function WeightHistoryList() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-weight-entry]", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        delay: 0.3,
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="w-[96%] max-w-[460px]">
      {/* Section header — matches mobile historySection */}
      <div className="flex items-baseline justify-between mb-4">
        <p
          className="text-[15px]"
          style={{ color: T.text, fontFamily: SF_PRO_FONT, fontWeight: 500 }}
        >
          History
        </p>
        <p
          className="text-[12px]"
          style={{ color: T.textSecondary, fontFamily: SF_PRO_FONT, fontWeight: 400 }}
        >
          {WEIGHT_HISTORY.length} entries
        </p>
      </div>

      <div className="flex flex-col">
        {WEIGHT_HISTORY.map((entry, i) => {
          const isFirst = i === 0;
          const isLast = i === WEIGHT_HISTORY.length - 1;
          const hasDelta = Math.abs(entry.delta) >= 0.1;
          const isGain = entry.delta > 0;
          const changeColor = isGain ? DELTA_GAIN : DELTA_LOSS;
          const changeText = isGain
            ? `+${entry.delta.toFixed(1)}`
            : `−${Math.abs(entry.delta).toFixed(1)}`;

          return (
            <div
              key={entry.date}
              data-weight-entry
              className="flex items-start"
            >
              {/* Timeline spine — width 20, paddingTop SPACING.md+2 = 14 */}
              <div className="flex flex-col items-center" style={{ width: 20, paddingTop: 14 }}>
                <div
                  className="rounded-full"
                  style={{
                    width: isFirst ? 10 : 8,
                    height: isFirst ? 10 : 8,
                    backgroundColor: isFirst ? T.primary : T.border,
                  }}
                />
                {!isLast && (
                  <div
                    style={{
                      width: 1.5,
                      flex: 1,
                      minHeight: 32,
                      marginTop: 4,
                      backgroundColor: `${T.border}40`,
                    }}
                  />
                )}
              </div>

              {/* Entry card — marginLeft SPACING.sm = 8, marginBottom SPACING.sm = 8 */}
              <div
                className="flex-1 rounded-[16px]"
                style={{
                  backgroundColor: T.card,
                  padding: "10px 12px",
                  marginLeft: 8,
                  marginBottom: 8,
                }}
              >
                {/* historyEntryTop — alignItems: 'center' */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[16px]"
                    style={{ color: T.text, fontFamily: NUMERIC_FONT, fontWeight: 400 }}
                  >
                    {entry.weight.toFixed(1)}
                    <span
                      className="text-[13px]"
                      style={{
                        color: T.textSecondary,
                        fontFamily: SF_PRO_FONT,
                        fontWeight: 400,
                      }}
                    >
                      {" "}lbs
                    </span>
                  </span>
                  {hasDelta && (
                    <div
                      className="rounded-[8px]"
                      style={{
                        padding: "3px 8px",
                        backgroundColor: `${changeColor}12`,
                      }}
                    >
                      <span
                        className="text-[12px]"
                        style={{
                          color: changeColor,
                          fontFamily: NUMERIC_FONT,
                          fontWeight: 400,
                        }}
                      >
                        {changeText}
                      </span>
                    </div>
                  )}
                </div>
                {/* historyDate — marginTop: 2 */}
                <p
                  className="text-[12px]"
                  style={{
                    color: T.textSecondary,
                    fontFamily: SF_PRO_FONT,
                    fontWeight: 400,
                    marginTop: 2,
                  }}
                >
                  {entry.date} · {entry.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
