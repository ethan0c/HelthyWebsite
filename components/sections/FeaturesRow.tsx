"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Image from "next/image";
import React from "react";
import CTAButton from "@/components/ui/CTAButton";

// Real tokens from mobile app dark theme (constants/colors.ts).
// Used only inside the app mockups; marketing chrome uses the site tokens.
const T = {
  primary: "#CDFB50",
  buttonText: "#151515",
  bg: "#0F0F0F",
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

/**
 * /features: one feature per full-bleed band, alternating dark and light
 * (MacroFactor-style). Copy on one side, the real app UI on the other.
 */
export default function FeaturesRow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-feature-card]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="features" ref={rootRef}>
      {/* Band 1 (dark): page title + photo logging */}
      <section className="pb-20 pt-32 md:pb-28 lg:pt-40">
        <div className="container-page">
          <h1 className="max-w-3xl text-display-xl text-fg">
            Four apps&apos; worth of tracking, <span className="text-highlight">in one</span>
          </h1>

          <FeatureRow
            className="mt-16 md:mt-20"
            headline="Snap your plate"
            subtitle="Point, shoot, logged."
          >
            <ScreenshotMockup
              src="/phones/ai-meal-scan.png"
              alt="AI photo meal logging with instant macro breakdown"
              wide
              cropBottom={20}
              visibleRatio={2240 / 2572}
            />
          </FeatureRow>
        </div>
      </section>

      {/* Band 2 (light): weight progress */}
      <section className="section theme-light">
        <div className="container-page">
          <FeatureRow
            reverse
            headline={<>See your <span className="text-highlight">progress</span></>}
            subtitle="Every weigh-in, plotted. Every entry, tracked."
          >
            <div
              className="max-h-[640px] w-[92%] max-w-[440px] space-y-6 overflow-hidden rounded-t-[28px] px-3 pt-4 pb-2"
              style={{ background: T.bg }}
            >
              <WeightGraphMockup />
              <WeightHistoryList />
            </div>
          </FeatureRow>
        </div>
      </section>

      {/* Band 3 (dark): workouts */}
      <section className="section">
        <div className="container-page">
          <FeatureRow
            headline="Every lift, covered"
            subtitle="1,500 exercises. Every PR tracked."
          >
            <TripleScreenshotMockup
              tabs={["Library", "Form tips", "Activity"]}
              screens={[
                { src: "/phones/exercise-library-screen.png", alt: "Exercise library with search", width: 1321, height: 2659 },
                { src: "/phones/exercise-info-screen.png", alt: "Exercise form tips and how-to", width: 1328, height: 2707 },
                { src: "/phones/activity-logging-screen.png", alt: "Cardio and activity logging", width: 1328, height: 2117 },
              ]}
            />
          </FeatureRow>

          {/* More features */}
          <div className="mt-20 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-28">
            <p className="text-display-md text-fg">More where that came from</p>
            <CTAButton href="/changelog" variant="secondary">
              See all features →
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Screenshot mockup — real app screenshot in a phone-like frame

function ScreenshotMockup({ src, alt, wide, noCrop, cropBottom, visibleRatio }: { src: string; alt: string; wide?: boolean; noCrop?: boolean; cropBottom?: number; visibleRatio?: number }) {
  return (
    <div
      className={`${wide ? "w-[92%] max-w-[440px]" : "w-[70%] max-w-[300px]"} ${noCrop ? "mb-4" : "mb-[-40px]"} rounded-[20px] overflow-hidden border border-line`}
      style={cropBottom ? { marginBottom: -cropBottom } : undefined}
    >
      <div
        style={
          visibleRatio
            ? { width: "100%", paddingBottom: `${visibleRatio * (2572 / 1321) * 100}%`, position: "relative", overflow: "hidden" }
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          width={300}
          height={650}
          style={
            visibleRatio
              ? { position: "absolute", top: 0, left: 0, width: "100%", height: "auto" }
              : { width: "100%", height: "auto" }
          }
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Tabbed screenshot mockup — click through screens

function TripleScreenshotMockup({
  screens,
  tabs,
}: {
  screens: { src: string; alt: string; width: number; height: number }[];
  tabs?: string[];
}) {
  const [active, setActive] = React.useState(0);

  const labels = tabs ?? screens.map((s) => s.alt);
  const frameRatio = Math.min(...screens.map((s) => s.width / s.height));

  return (
    <div className="flex w-full flex-col items-center">
      <div role="tablist" aria-label="Workout features" className="segmented mb-8">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Keep the frame size stable so tab changes don't move the page.
          The panel crops the bottom of the phone. */}
      <div className="w-[72%] max-w-[300px] max-h-[460px] overflow-hidden rounded-t-[28px] border border-b-0 border-line">
        <div className="relative w-full" style={{ aspectRatio: String(frameRatio) }}>
          {screens.map((s, i) => (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-300 ease-out"
              style={{
                opacity: i === active ? 1 : 0,
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 72vw, 300px"
                className="object-contain object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Feature row: copy + mockup panel

function FeatureRow({
  className = "",
  reverse,
  headline,
  subtitle,
  children,
}: {
  className?: string;
  reverse?: boolean;
  headline: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-feature-card
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${className}`}
    >
      <div className={`max-w-xl ${reverse ? "lg:order-2" : ""}`}>
        <h2 className="text-display-lg text-fg">{headline}</h2>
        <p className="mt-5 text-lede">{subtitle}</p>
      </div>

      <div
        className={`flex min-h-[420px] items-end justify-center overflow-hidden rounded-3xl border border-line bg-surface pt-12 md:min-h-[520px] md:pt-16 ${
          reverse ? "lg:order-1" : ""
        }`}
      >
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
    if (prefersReducedMotion()) {
      setFrameIdx(FLICKER_FRAMES.length - 1); // show the settled reading
      return;
    }
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
      className="relative w-full overflow-hidden rounded-[20px]"
      style={{ background: T.bg }}
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
            digitSize={56}
            activeColor={activeColor}
            ghostColor={ghostColor}
          />
          <span
            className="text-[13px] font-semibold mt-3"
            style={{ color: T.textSecondary, fontFamily: "var(--font-body)" }}
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
      <div data-weight-label className="px-2 pb-4">
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
    if (prefersReducedMotion()) return;
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
    <div ref={listRef} className="w-full px-1">
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
