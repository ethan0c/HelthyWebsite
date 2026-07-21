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
  rot: number;
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
  { side: "left",  y: -190, rot: -3,   icon: mdiCameraOutline,       title: "Jerk chicken bowl", status: "AI photo log",     accent: "var(--helthy-accent-orange)", img: "/card-photos/Jerk-Chicken-Rice-Bowl-1.jpg", calories: 612, macros: { protein: 48, carbs: 41, fats: 22 } },
  { side: "left",  y:    0, rot:  2.5, icon: mdiDumbbell,             title: "Preacher curl",     status: "New PR · 4 × 8",   accent: "var(--helthy-lemon)",         img: "/card-photos/Z-Bar-Preacher-Curl.gif",      value: "115",  unit: "lbs", sub: "+5 lbs" },
  { side: "left",  y:  190, rot: -2,   icon: mdiHeartOutline,         title: "Morning run",       status: "Apple Health",     accent: "var(--helthy-movement)",      value: "6.2",   unit: "km",  sub: "452 kcal" },
  { side: "right", y: -190, rot:  3,   icon: mdiBowlMixOutline,       title: "Greek yogurt",      status: "Logged · 8:14 AM", accent: "var(--helthy-accent-orange)", calories: 180, macros: { protein: 18, carbs: 9, fats: 5 } },
  { side: "right", y:    0, rot: -2.5, icon: mdiChartTimelineVariant, title: "Weight",            status: "Trend · 30 days",  accent: "var(--helthy-success)",       value: "173",   unit: "lbs", sub: "−2.6 lbs" },
  { side: "right", y:  190, rot:  2,   icon: mdiRobotHappyOutline,    title: "AI Coach",          status: "Suggestion",       accent: "var(--helthy-lemon)",         value: "Rest",  unit: "day", sub: "Recovery low" },
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
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <span className="text-numeric tabular-nums" style={{ fontSize: 12, fontWeight: 500, color: "var(--foreground)", lineHeight: 1 }}>
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
      gsap.from(
        ["[data-phone-heading]", "[data-phone-sub]"],
        {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-phone-heading]",
            start: "top 85%",
          },
        }
      );
      gsap.from("[data-phone-img]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-phone-img]",
          start: "top 85%",
        },
      });
      gsap.from("[data-phone-stat]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-phone-stats]",
          start: "top 85%",
        },
      });

      // Activity cards slide out from behind the phone, scrubbed to scroll.
      // NOT pinned — the page keeps scrolling normally; card extension is just
      // tied to how far the section has travelled through the viewport, so
      // scrolling down fans them out and scrolling up retracts them. lg+ only.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-activity-card]");
        if (!cards.length) return;

        // Resting (fully scrolled) state: fanned out by side + tilted.
        gsap.set(cards, {
          x: (_i, el) => ((el as HTMLElement).dataset.side === "left" ? -440 : 440),
          rotation: (_i, el) => Number((el as HTMLElement).dataset.rot ?? 0),
          autoAlpha: 1,
          scale: 1,
          xPercent: -50,
          yPercent: -50,
        });

        // Animate FROM the tucked state (behind phone, hidden) → resting.
        // start when the section's top hits 80% down the viewport, end when
        // the phone is roughly centered. No pin, so nothing locks in place.
        gsap.from(cards, {
          x: 0,
          rotation: 0,
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
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="phone-showcase"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080d10 10%, #41515a 45%, #3f4e56 65%, var(--background) 100%)",
        paddingTop: "clamp(72px, 10vh, 120px)",
        paddingBottom: "clamp(72px, 10vh, 120px)",
      }}
    >
      {/* Soft teal pool — positioned behind phone (lower in the section) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          top: "40%",
          width: "min(1100px, 115vw)",
          height: "min(820px, 90vw)",
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(100,170,210,0.32) 0%, rgba(80,140,180,0.12) 40%, rgba(80,140,180,0.04) 65%, transparent 80%)",
          filter: "blur(28px)",
          willChange: "filter",
        }}
      />

      {/* Top fade — blends hero's bottom into this gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 180, zIndex: 1, background: "linear-gradient(var(--background) 0%, rgba(10,10,10,0) 100%)" }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/hero-noise.png)",
          backgroundSize: "260px",
          opacity: 0.35,
          mixBlendMode: "overlay",
        }}
      />

      {/* Dark Watermark Icons */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <Icon
          path={mdiBowlMixOutline}
          size="560px"
          color="#050B0F"
          className="absolute -top-32 -left-48 opacity-[0.4] -rotate-12"
        />
        <Icon
          path={mdiDumbbell}
          size="500px"
          color="#050B0F"
          className="hidden md:block absolute top-40 -right-40 opacity-[0.4] rotate-[15deg]"
        />
        <Icon
          path={mdiHeartOutline}
          size="600px"
          color="#050B0F"
          className="absolute -bottom-48 -left-32 opacity-[0.4] rotate-[-35deg]"
        />
        <Icon
          path={mdiChartTimelineVariant}
          size="480px"
          color="#050B0F"
          className="absolute bottom-10 -right-40 opacity-[0.4] rotate-[45deg]"
        />
      </div>

      <div className="container-page relative flex flex-col items-center text-center z-10">
        {/* Heading */}
        <h2
          data-phone-heading
          className="font-heading"
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: "1.08em",
            color: "#F9F9F9",
            margin: "clamp(12px, 1.4vh, 18px) 0 0",
            maxWidth: "18ch",
          }}
        >
          Every log makes it{" "}
          <span className="text-helthy-lemon">smarter</span>.
        </h2>

        <p
          data-phone-sub
          className="mx-auto"
          style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: "1.6em",
            color: "rgba(249,249,249,0.62)",
            maxWidth: 540,
            margin: "clamp(16px, 2vh, 24px) auto 0",
          }}
        >
          Helthy connects what you eat, how you train, and how you recover —
          then tunes the plan to you, not the other way around.
        </p>

        {/* Proof stats */}
        <div
          data-phone-stats
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
          style={{ marginTop: "clamp(28px, 3.4vh, 40px)" }}
        >
          <ProofStat target={4.8} decimals={1} label="App Store" hasStar />
          <div data-phone-stat className="w-px h-4 bg-white/10" />
          <ProofStat target={10} suffix="K+" label="meals logged" />
          <div data-phone-stat className="w-px h-4 bg-white/10" />
          <ProofStat target={1500} suffix="+" label="exercises" />
        </div>

        {/* Phone */}
        <div
          data-phone-img
          className="relative mt-10 sm:mt-14"
        >
          {/* Close halo — tight light behind phone so top edge blends into bg */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            style={{
              width: "min(440px, 80vw)",
              height: "min(640px, 120vw)",
              background:
                "radial-gradient(ellipse 45% 55% at 50% 45%, rgba(120,180,215,0.35) 0%, rgba(90,150,190,0.14) 40%, rgba(80,140,180,0.04) 65%, transparent 80%)",
              filter: "blur(20px)",
              willChange: "filter",
            }}
          />
          {/* Wide ambient glow — spreads the brightness into the section bg */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            style={{
              width: "min(820px, 110vw)",
              height: "min(820px, 110vw)",
              background:
                "radial-gradient(ellipse at center, rgba(80,140,180,0.18) 0%, rgba(80,140,180,0.05) 45%, transparent 70%)",
              filter: "blur(32px)",
              willChange: "filter",
            }}
          />
          {/* Soft tinted shadow pool — blends phone into section floor */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none left-1/2 -translate-x-1/2"
            style={{
              bottom: "-40px",
              width: "min(620px, 85vw)",
              height: 160,
              background:
                "radial-gradient(ellipse at center, rgba(15,20,28,0.75) 0%, rgba(15,20,28,0.3) 50%, transparent 75%)",
              filter: "blur(28px)",
            }}
          />
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
              data-rot={c.rot}
              aria-hidden="true"
              className="hidden lg:flex absolute top-1/2 left-1/2 items-center gap-3 pointer-events-none"
              style={{
                zIndex: 1,
                width: 330,
                marginTop: c.y,
                padding: "14px 16px",
                borderRadius: 18,
                // 3D surface: diagonal light — brighter top-left face
                // falling to the card bg, like the hero demo cards.
                background: `linear-gradient(145deg, color-mix(in srgb, var(--helthy-card-section) 88%, #FFFFFF 12%) 0%, var(--helthy-card-section) 40%, var(--helthy-card) 100%)`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: [
                  // beveled top edge catching the light
                  "inset 0 1px 0 rgba(255,255,255,0.1)",
                  // faint accent inner wash
                  `inset 0 0 24px color-mix(in srgb, ${c.accent} 4%, transparent)`,
                  // bottom inner shade — surface curvature
                  "inset 0 -8px 16px -8px rgba(0,0,0,0.4)",
                  "0 1px 2px rgba(0,0,0,0.6)",
                  "0 6px 16px rgba(0,0,0,0.5)",
                  // Accent-tinted ambient glow beneath the card.
                  `0 20px 48px -8px color-mix(in srgb, ${c.accent} 20%, rgba(0,0,0,0.6))`,
                ].join(", "),
                border: "1px solid rgba(255,255,255,0.09)",
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
                    <span className="truncate font-body" style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--foreground)", lineHeight: 1.25 }}>
                      {c.title}
                    </span>
                    <span className="font-body truncate" style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: `color-mix(in srgb, ${c.accent} 55%, var(--helthy-text-secondary))`, lineHeight: 1.3, marginTop: 3 }}>
                      {c.status}
                    </span>
                  </span>

                  {c.macros ? (
                    <span className="inline-flex items-center shrink-0" style={{ gap: 3, padding: "3px 9px", borderRadius: 999, background: `color-mix(in srgb, ${c.accent} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${c.accent} 24%, transparent)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                      <Icon path={mdiFire} size="12px" color={c.accent} />
                      <span className="text-numeric tabular-nums" style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)", lineHeight: 1 }}>
                        {c.calories}
                      </span>
                    </span>
                  ) : (
                    <span className="flex flex-col items-end shrink-0" style={{ gap: 3 }}>
                      <span className="inline-flex items-baseline gap-1" style={{ padding: "3px 9px", borderRadius: 999, background: `color-mix(in srgb, ${c.accent} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${c.accent} 24%, transparent)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                        <span className="text-numeric tabular-nums" style={{ fontSize: 14, fontWeight: 500, color: c.accent, lineHeight: 1.1 }}>{c.value}</span>
                        <span className="font-body" style={{ fontSize: 10, fontWeight: 500, color: c.accent, opacity: 0.8 }}>{c.unit}</span>
                      </span>
                      <span className="font-body" style={{ fontSize: 11, color: "var(--helthy-text-secondary)", lineHeight: 1.3 }}>{c.sub}</span>
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

      {/* Bottom fade — melts phone section back into the black canvas of Features */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 240, zIndex: 10, background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
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
          className="text-numeric text-[16px] sm:text-[18px] font-semibold text-white tabular-nums"
        >
          {`${prefix}${(0).toFixed(decimals)}${suffix}`}
        </span>
        {hasStar && <Star className="w-3.5 h-3.5 mb-0.5" fill="#CDFB50" stroke="none" />}
      </div>
      <span className="text-[12px] sm:text-[13px] text-white/45">{label}</span>
    </div>
  );
}
