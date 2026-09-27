"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Star } from "lucide-react";
import Icon from "@mdi/react";
import {
  mdiBowlMixOutline,
  mdiDumbbell,
  mdiHeartOutline,
  mdiChartTimelineVariant,
  mdiCameraOutline,
  mdiRobotHappyOutline,
  mdiFire,
} from "@mdi/js";

const MACRO = {
  protein: "var(--helthy-protein)",
  carbs:   "var(--helthy-carbs)",
  fats:    "var(--helthy-fats)",
};

type ActivityCard = {
  side: "left" | "right";
  y: number;
  icon: string;
  title: string;
  status: string;
  accent: string;
  img?: string;
  calories?: number;
  macros?: { protein: number; carbs: number; fats: number };
  value?: string;
  unit?: string;
  sub?: string;
};

const ACTIVITY_CARDS: ActivityCard[] = [
  { side: "left",  y: -190,   icon: mdiCameraOutline,       title: "Jerk chicken bowl", status: "AI photo log",     accent: "var(--helthy-accent-orange)", img: "/card-photos/Jerk-Chicken-Rice-Bowl-1.jpg", calories: 554, macros: { protein: 48, carbs: 41, fats: 22 } },
  { side: "left",  y:    0, icon: mdiDumbbell,             title: "Preacher curl",     status: "New PR · 4 × 8",   accent: "var(--helthy-lemon)",         img: "/card-photos/Z-Bar-Preacher-Curl.gif",      value: "115",  unit: "lbs", sub: "+5 lbs" },
  { side: "left",  y:  190,   icon: mdiHeartOutline,         title: "Morning run",       status: "Apple Health",     accent: "var(--helthy-movement)",      value: "6.2",   unit: "km",  sub: "452 kcal" },
  { side: "right", y: -190,   icon: mdiBowlMixOutline,       title: "Greek yogurt",      status: "Logged · 8:14 AM", accent: "var(--helthy-accent-orange)", calories: 153, macros: { protein: 18, carbs: 9, fats: 5 } },
  { side: "right", y:    0, icon: mdiChartTimelineVariant, title: "Weight",            status: "Trend · 30 days",  accent: "var(--helthy-success)",       value: "173",   unit: "lbs", sub: "−2.6 lbs" },
  { side: "right", y:  190,   icon: mdiRobotHappyOutline,    title: "AI Coach",          status: "Suggestion",       accent: "var(--helthy-lemon)",         value: "+40",   unit: "g",   sub: "Protein to target" },
];

function MacroPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-baseline"
      style={{
        gap: 2,
        padding: "3px 8px",
        borderRadius: 999,
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 24%, transparent)`,
      }}
    >
      <span className="text-numeric tabular-nums text-fg" style={{ fontSize: 12, fontWeight: 500, lineHeight: 1 }}>
        {Math.round(value)}
      </span>
      <span className="font-body" style={{ fontSize: 9, fontWeight: 500, color, letterSpacing: 0.3 }}>
        {label}
      </span>
    </span>
  );
}

export default function PhoneShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Entrance animations only when motion is allowed, so nothing is
      // left hidden at opacity 0 for reduced-motion visitors.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(["[data-phone-heading]", "[data-phone-sub]"], {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-phone-heading]", start: "top 85%" },
        });
        gsap.from("[data-phone-img]", {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-phone-img]", start: "top 85%" },
        });
        gsap.from("[data-phone-stat]", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-phone-stats]", start: "top 85%" },
        });
      });

      // Activity cards slide out from behind the phone, scrubbed to scroll.
      // NOT pinned — the page keeps scrolling normally; card extension is just
      // tied to how far the section has travelled through the viewport, so
      // scrolling down fans them out and scrolling up retracts them. lg+ only.
      // Flat 2D: they slide sideways, no tilt.
      mm.add(
        { lg: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { lg, reduce } = context.conditions as { lg: boolean; reduce: boolean };
          if (!lg) return;
          const cards = gsap.utils.toArray<HTMLElement>("[data-activity-card]");
          if (!cards.length) return;

          // Resting (fully scrolled) state: fanned out by side.
          gsap.set(cards, {
            x: (_i, el) => ((el as HTMLElement).dataset.side === "left" ? -440 : 440),
            autoAlpha: 1,
            scale: 1,
            xPercent: -50,
            yPercent: -50,
          });
          if (reduce) return;

          // Animate FROM the tucked state (behind phone, hidden) → resting.
          gsap.from(cards, {
            x: 0,
            autoAlpha: 0,
            scale: 0.85,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 0.6,
            },
          });
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative w-full overflow-hidden bg-canvas"
    >
      <div className="container-page relative flex flex-col items-center text-center z-10">
        {/* Heading */}
        <h2 data-phone-heading className="text-display-xl text-fg max-w-[18ch]">
          Every log makes it <span className="text-accent-ink">smarter</span>
        </h2>

        <p data-phone-sub className="text-lede mx-auto mt-5 max-w-[600px]">
          Helthy connects what you eat, how you train, and how you recover —
          then tunes the plan to you, not the other way around.
        </p>

        {/* Proof stats */}
        <div
          data-phone-stats
          className="mt-8 flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
        >
          <ProofStat target={4.9} decimals={1} label="App Store" hasStar />
          <div data-phone-stat className="w-px h-4 bg-line-strong" />
          <ProofStat target={10} suffix="K+" label="meals logged" />
          <div data-phone-stat className="w-px h-4 bg-line-strong" />
          <ProofStat target={1500} suffix="+" label="exercises" />
        </div>

        {/* Phone */}
        <div
          data-phone-img
          className="relative mt-10 sm:mt-14"
        >
          <div
            className="relative aspect-[980/2000]"
            style={{ width: "min(400px, 74vw)", zIndex: 2 }}
          >
            <Image
              src="/phones/mobile-hero.png"
              alt="Helthy app home screen on iPhone"
              fill
              sizes="(max-width: 640px) 74vw, 400px"
              className="object-contain"
            />
          </div>

          {/* Activity cards — hardcoded, slide out from behind the phone,
              scrubbed to scroll. lg+ only. */}
          {ACTIVITY_CARDS.map((c) => (
            <div
              key={c.title}
              data-activity-card
              data-side={c.side}
              aria-hidden="true"
              className="hidden lg:flex absolute top-1/2 left-1/2 items-center gap-3 pointer-events-none bg-surface border border-line rounded-2xl"
              style={{
                zIndex: 1,
                width: 330,
                marginTop: c.y,
                padding: "14px 16px",
                visibility: "hidden",
                willChange: "transform, opacity",
              }}
            >
              {/* Thumbnail crop when available, bare icon otherwise */}
              {c.img ? (
                <span
                  className="shrink-0 self-start overflow-hidden"
                  style={{ width: c.img.endsWith(".gif") ? 52 : 40, height: c.img.endsWith(".gif") ? 52 : 40, borderRadius: 10 }}
                >
                  <Image
                    src={c.img}
                    alt=""
                    width={104}
                    height={104}
                    className="w-full h-full object-cover object-center"
                    style={c.img.endsWith(".gif") ? { mixBlendMode: "screen", imageRendering: "crisp-edges" } : undefined}
                    draggable={false}
                  />
                </span>
              ) : (
                <span className="shrink-0 self-start mt-0.5">
                  <Icon path={c.icon} size="22px" color={c.accent} />
                </span>
              )}

              {/* Content */}
              <span className="flex flex-col min-w-0 flex-1" style={{ gap: 8 }}>
                <span className="flex items-start gap-2">
                  <span className="flex flex-col text-left min-w-0 flex-1">
                    <span className="truncate font-body text-fg" style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                      {c.title}
                    </span>
                    <span className="font-body truncate text-fg-subtle" style={{ fontSize: 11.5, fontWeight: 500, lineHeight: 1.3, marginTop: 3 }}>
                      {c.status}
                    </span>
                  </span>

                  {c.macros ? (
                    <span className="inline-flex items-center shrink-0" style={{ gap: 3, padding: "3px 9px", borderRadius: 999, background: `color-mix(in srgb, ${c.accent} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${c.accent} 24%, transparent)` }}>
                      <Icon path={mdiFire} size="12px" color={c.accent} />
                      <span className="text-numeric tabular-nums text-fg" style={{ fontSize: 13, fontWeight: 500, lineHeight: 1 }}>
                        {c.calories}
                      </span>
                    </span>
                  ) : (
                    <span className="flex flex-col items-end shrink-0" style={{ gap: 3 }}>
                      <span className="inline-flex items-baseline gap-1" style={{ padding: "3px 9px", borderRadius: 999, background: `color-mix(in srgb, ${c.accent} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${c.accent} 24%, transparent)` }}>
                        <span className="text-numeric tabular-nums" style={{ fontSize: 14, fontWeight: 500, color: c.accent, lineHeight: 1.1 }}>{c.value}</span>
                        <span className="font-body" style={{ fontSize: 10, fontWeight: 500, color: c.accent, opacity: 0.8 }}>{c.unit}</span>
                      </span>
                      <span className="font-body text-fg-muted" style={{ fontSize: 11, lineHeight: 1.3 }}>{c.sub}</span>
                    </span>
                  )}
                </span>

                {c.macros && (
                  <span className="flex" style={{ gap: 6 }}>
                    <MacroPill value={c.macros.protein} label="P" color={MACRO.protein} />
                    <MacroPill value={c.macros.carbs}   label="C" color={MACRO.carbs} />
                    <MacroPill value={c.macros.fats}    label="F" color={MACRO.fats} />
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofStat({
  target,
  decimals = 0,
  suffix = "",
  prefix = "",
  label,
  hasStar = false,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hasStar?: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const counter = { val: 0 };
    const format = (v: number) =>
      `${prefix}${v
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;

    const tween = gsap.to(counter, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.val);
      },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
    // initialize
    el.textContent = format(0);
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, decimals, suffix, prefix]);

  return (
    <div data-phone-stat className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span
          ref={spanRef}
          className="text-numeric text-[16px] sm:text-[18px] text-fg tabular-nums"
        >
          {`${prefix}${(0).toFixed(decimals)}${suffix}`}
        </span>
        {hasStar && <Star className="w-3.5 h-3.5 mb-0.5 text-accent" fill="currentColor" stroke="none" />}
      </div>
      <span className="text-[13px] text-fg-subtle">{label}</span>
    </div>
  );
}
