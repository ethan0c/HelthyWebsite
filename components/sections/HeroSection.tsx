"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { Trophy, TrendingUp } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const PHONE_W = 320;
const CARD_GAP = PHONE_W / 2 + 28;

const CTA_SHADOW =
  "rgba(255,255,255,0.5) 0px 2px 1px 0px inset," +
  "rgba(255,255,255,0.72) 0px 0.6px 0.6px -1.25px inset," +
  "rgba(255,255,255,0.635) 0px 2.29px 2.29px -2.5px inset," +
  "rgba(255,255,255,0.25) 0px 10px 10px -3.75px inset," +
  "rgba(205,255,80,0.35) 0px 14px 6px -8px";

// Mobile app tokens
const T = {
  primary: "#CDFF50",
  buttonText: "#151515",
  card: "#2A2A2A",
  text: "#FFFFFF",
  textSecondary: "#9CA3AF",
  border: "#2E2E30",
  calories: "#FF6B6B",
  protein: "#4CAF50",
  carbs: "#2196F3",
  fats: "#FF9800",
  success: "#22C55E",
  warning: "#F59E0B",
};

const CARD_STYLE = {
  background: "rgba(20,20,20,0.82)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
};

// StreakFlame SVG paths from mobile StreakFlame.tsx
const FLAME_MAIN = "M24 4C24 4 18 14 18 22C18 26 20 30 24 32C28 30 30 26 30 22C30 14 24 4 24 4Z";
const FLAME_CORE = "M24 14C24 14 21 20 21 24C21 26 22.5 28 24 29C25.5 28 27 26 27 24C27 20 24 14 24 14Z";
const FLAME_WISP_L = "M18 28C18 28 15 22 16 18C17 22 18 24 18 28Z";
const FLAME_WISP_R = "M30 28C30 28 33 22 32 18C31 22 30 24 30 28Z";
// Blaze tier (14 days): core=#FDE047, mid=#F59E0B, outer=#DC2626
const BLAZE = { core: "#FDE047", mid: "#F59E0B", outer: "#DC2626", glow: "#F59E0B" };

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-h1]", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from("[data-hero-phone]", {
        y: 50, opacity: 0, duration: 1.2, delay: 0.2, ease: "power3.out",
      });
      gsap.from("[data-hero-sub]", {
        y: 20, opacity: 0, duration: 0.8, delay: 0.5, ease: "power3.out",
      });
      gsap.from("[data-hero-cta]", {
        y: 15, opacity: 0, duration: 0.7, delay: 0.65, ease: "power3.out",
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      cards.forEach((el) => {
        const fromX = Number(el.dataset.fromX || 0);
        const rot = Number(el.dataset.rotate || 0);
        gsap.fromTo(
          el,
          { x: fromX, y: 40, rotate: 0, autoAlpha: 0 },
          {
            x: 0, y: 0, rotate: rot, autoAlpha: 1, ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 5%",
              end: "bottom 75%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex flex-col items-center"
      style={{ paddingBottom: 80, backgroundColor: "#607C8A" }}
    >
      {/* Noise */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "url(/textures/hero-noise.png)",
        backgroundRepeat: "repeat", backgroundSize: "128px",
        mixBlendMode: "screen", zIndex: 1,
      }} />

      {/* H1 */}
      <div data-hero-h1 className="relative w-full text-center" style={{
        paddingTop: "clamp(100px, 14vh, 160px)", paddingLeft: 44, paddingRight: 44, paddingBottom: 40, zIndex: 3,
      }}>
        <h1 className="font-heading font-light" style={{
          fontSize: "clamp(48px, 6.5vw, 88px)",
          letterSpacing: "-0.035em", lineHeight: "0.97em",
          color: "#F9F9F9", margin: 0,
        }}>
          Your fitness, <span className="text-italics text-helthy-lemon">handled</span>.
        </h1>
      </div>

      {/* Phone + floating cards */}
      <div className="relative w-full flex justify-center" style={{ zIndex: 2, minHeight: 640 }}>

        {/* ═══ LEFT CARDS ═══ */}

        {/* 1. Exercise Library Card — ExerciseLibraryScreen renderItem */}
        <div
          data-hero-card data-from-x={-250} data-rotate={-2}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            right: `calc(50% + ${CARD_GAP}px)`,
            bottom: 400, width: 230,
            borderRadius: 16, padding: 16, minHeight: 80,
            ...CARD_STYLE,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 52, height: 52, borderRadius: 14, background: T.primary + "12" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.primary} strokeWidth="2" strokeLinecap="round">
                <path d="M6.5 6.5h11M6.5 17.5h11M3 10.5h1.5m15 0H21M3 13.5h1.5m15 0H21M4.5 10.5v3M19.5 10.5v3M7.5 8v8M16.5 8v8" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold mb-1" style={{ color: T.text }}>Bench Press</p>
              <p className="text-[13px] leading-[18px]" style={{ color: T.textSecondary }}>Barbell · Chest, Triceps</p>
            </div>
          </div>
        </div>

        {/* 2. FoodItemCard — FoodItemCard.tsx exact layout */}
        <div
          data-hero-card data-from-x={-200} data-rotate={3}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            right: `calc(50% + ${CARD_GAP + 15}px)`,
            bottom: 255, width: 250,
            borderRadius: 16, padding: "12px 16px",
            ...CARD_STYLE,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 40, height: 40, borderRadius: 12 }}
            >
              <span className="text-[18px]">🍗</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium truncate" style={{ color: T.text }}>Grilled Chicken</p>
                  <p className="text-[12px] truncate" style={{ color: T.textSecondary }}>200g</p>
                </div>
                <div className="flex items-center gap-[3px] px-2 py-[3px] rounded-full" style={{ background: T.calories + "12" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={T.calories}><path d="M12 23c-3.6 0-7-2.4-7-7 0-3.4 2.2-6.4 4-8.4.6-.7 1.7-.5 2 .3.5 1.5 1.3 2.5 2 3.1.2-.5.4-1.2.5-2.1.1-1.3-.2-2.8-.7-4.2-.3-.9.5-1.7 1.4-1.4 3.3 1.2 6.8 5.4 6.8 10.7 0 5.3-3.4 9-9 9z"/></svg>
                  <span className="text-[12px] font-bold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}>330</span>
                </div>
              </div>
              <div className="flex gap-1.5 mt-1.5">
                {[
                  { v: 62, l: "P", c: T.protein },
                  { v: 0, l: "C", c: T.carbs },
                  { v: 7, l: "F", c: T.fats },
                ].map((m) => (
                  <span key={m.l} className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: m.c + "15", color: m.c }}>
                    {m.v}{m.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Streak Card — real StreakFlame SVG paths, Blaze tier */}
        <div
          data-hero-card data-from-x={-180} data-rotate={-1}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            right: `calc(50% + ${CARD_GAP - 5}px)`,
            bottom: 120, width: 170,
            borderRadius: 20, padding: 16,
            ...CARD_STYLE,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0" style={{ width: 40, height: 40 }}>
              <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${BLAZE.glow}36 0%, transparent 70%)` }} />
              <svg width="40" height="40" viewBox="6 2 36 34">
                <defs>
                  <radialGradient id="flameGrad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor={BLAZE.core} />
                    <stop offset="50%" stopColor={BLAZE.mid} />
                    <stop offset="100%" stopColor={BLAZE.outer} />
                  </radialGradient>
                </defs>
                <path d={FLAME_MAIN} fill="url(#flameGrad)" />
                <path d={FLAME_CORE} fill={BLAZE.core} opacity="0.9" />
                <path d={FLAME_WISP_L} fill={BLAZE.mid} opacity="0.6" />
                <path d={FLAME_WISP_R} fill={BLAZE.mid} opacity="0.6" />
              </svg>
            </div>
            <div>
              <p className="text-[20px] font-bold" style={{ color: T.text, fontFamily: "'Unbounded', sans-serif" }}>14</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T.textSecondary }}>day streak</p>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT CARDS ═══ */}

        {/* 4. New PR Card — PRHighlight.tsx wrapper */}
        <div
          data-hero-card data-from-x={250} data-rotate={2}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            left: `calc(50% + ${CARD_GAP}px)`,
            bottom: 400, width: 220,
            borderRadius: 16, padding: 16,
            position: "absolute",
            ...CARD_STYLE,
          }}
        >
          <div className="absolute inset-[-1px] rounded-[17px] pointer-events-none" style={{ border: "1px solid #E6B800", opacity: 0.6 }} />
          <div className="absolute inset-0 rounded-[16px] pointer-events-none" style={{ background: "#F4E4BC", opacity: 0.08 }} />
          <div className="absolute flex items-center justify-center" style={{ top: -6, right: -6, width: 18, height: 18, borderRadius: 9, background: "#E6B800", opacity: 0.85, zIndex: 10, boxShadow: "0 1px 2px rgba(230,184,0,0.3)" }}>
            <Trophy className="w-[10px] h-[10px]" style={{ color: "#B8860B" }} />
          </div>
          <div className="relative flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 52, height: 52, borderRadius: 14, background: T.primary + "12" }}
            >
              <Trophy className="w-6 h-6" style={{ color: T.warning }} />
            </div>
            <div>
              <p className="text-[15px] font-semibold" style={{ color: T.text }}>New PR!</p>
              <p className="text-[13px] leading-[18px]" style={{ color: T.textSecondary }}>Bench Press · 80 kg</p>
            </div>
          </div>
        </div>

        {/* 5. Weight History Entry — WeightScreen.tsx history row */}
        <div
          data-hero-card data-from-x={200} data-rotate={-3}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            left: `calc(50% + ${CARD_GAP + 10}px)`,
            bottom: 255, width: 210,
          }}
        >
          <div className="flex items-start">
            <div className="flex flex-col items-center" style={{ width: 20, paddingTop: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: T.primary }} />
              <div className="flex-1" style={{ width: 1.5, marginTop: 4, background: T.border + "40", minHeight: 30 }} />
            </div>
            <div
              className="flex-1 ml-2"
              style={{ borderRadius: 16, padding: "10px 12px", background: T.card, border: `1px solid ${T.border}20` }}
            >
              <div className="flex items-center justify-between">
                <p style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: "'Unbounded', sans-serif" }}>
                  82.4 <span style={{ fontSize: 13, color: T.textSecondary, fontFamily: "inherit" }}>kg</span>
                </p>
                <div className="px-2 py-[3px] rounded-lg" style={{ background: T.success + "12" }}>
                  <p className="text-[12px] font-semibold" style={{ color: T.success, fontFamily: "'Unbounded', sans-serif" }}>−0.3</p>
                </div>
              </div>
              <p className="text-[12px] mt-0.5" style={{ color: T.textSecondary }}>Today · 8:14 AM</p>
            </div>
          </div>
        </div>

        {/* 6. Insights Card — InsightCard.tsx */}
        <div
          data-hero-card data-from-x={180} data-rotate={1}
          aria-hidden="true"
          className="absolute hidden lg:block"
          style={{
            left: `calc(50% + ${CARD_GAP - 5}px)`,
            bottom: 120, width: 210,
            borderRadius: 20, padding: 16,
            ...CARD_STYLE,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-3.5 h-3.5" style={{ color: T.primary }} />
            <span className="text-[11px] font-semibold uppercase" style={{ color: T.primary, letterSpacing: 1.2 }}>WEEKLY INSIGHT</span>
          </div>
          <p className="text-[13px] leading-[18px]" style={{ color: T.textSecondary }}>
            Protein is <span className="font-semibold" style={{ color: T.text }}>18% below target</span>. Fix that and weight should move again.
          </p>
        </div>

        {/* Phone */}
        <div data-hero-phone style={{ position: "relative", zIndex: 10, alignSelf: "flex-start" }}>
          <PhoneFrame src="/screenshots/hero-app.jpg" alt="Helthy app home screen" width={PHONE_W} priority />
        </div>
      </div>

      {/* Sub + CTA */}
      <div className="relative flex flex-col items-center w-full" style={{ gap: 20, paddingTop: 40, zIndex: 2 }}>
        <p data-hero-sub style={{
          fontSize: 20, fontWeight: 400,
          letterSpacing: "-0.02em", lineHeight: "1.45em",
          color: "rgba(249,249,249,0.85)", textAlign: "center",
          maxWidth: 440, margin: 0,
        }}>
          Your AI fitness and nutrition coach. Track meals, workouts, and
          progress in one app — free forever.
        </p>

        <Link
          data-hero-cta
          href={APP_STORE_URL}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2"
          style={{
            padding: "10px 20px", borderRadius: 14,
            border: "1px solid #CDFF50", backgroundColor: "#CDFF50",
            color: "#151515", fontSize: 15, fontWeight: 600,
            letterSpacing: "-0.01em", lineHeight: "1.2em",
            textDecoration: "none", boxShadow: CTA_SHADOW,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M64.34,196.07l-9.45,16a8,8,0,1,1-13.78-8.14l9.46-16a8,8,0,1,1,13.77,8.14ZM232,152H184.2l-30.73-52a8,8,0,1,0-13.77,8.14l61.41,103.93a8,8,0,0,0,13.78-8.14L193.66,168H232a8,8,0,0,0,0-16Zm-89.53,0H90.38L158.89,36.07a8,8,0,0,0-13.78-8.14L128,56.89l-17.11-29a8,8,0,1,0-13.78,8.14l21.6,36.55L71.8,152H24a8,8,0,0,0,0,16H142.47a8,8,0,1,0,0-16Z" fill="#151515" />
          </svg>
          Download for free
        </Link>

        <p data-hero-bottom style={{
          fontSize: 13, fontWeight: 500,
          color: "rgba(249,249,249,0.5)", letterSpacing: "-0.01em", margin: 0,
        }}>
          Android coming soon
        </p>
      </div>
    </section>
  );
}
