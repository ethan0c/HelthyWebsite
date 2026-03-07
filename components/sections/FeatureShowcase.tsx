"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Barcode, Camera, Mic, Search, PenLine, Dumbbell, TrendingUp, Trophy, Timer, BarChart3, Flame, Target } from "lucide-react";

/* ── Feature data ────────────────────────────────────────────── */
const features = [
  {
    eyebrow: "Nutrition",
    title: "5 ways to log meals.",
    titleAccent: "Zero friction.",
    description:
      "Barcode scanner, AI photo recognition, voice logging, manual search from 1M+ foods, or quick-add by macros. However you eat, we track it.",
    phone: "/phones/foodmainscreen.png",
    accent: "#E96C2C",
    highlights: [
      { icon: Barcode, text: "Barcode scanner" },
      { icon: Camera, text: "AI photo logging" },
      { icon: Mic, text: "Voice logging" },
      { icon: Search, text: "1M+ food database" },
      { icon: PenLine, text: "Quick macro entry" },
    ],
  },
  {
    eyebrow: "Workouts",
    title: "Your gym partner.",
    titleAccent: "Built in.",
    description:
      "500+ exercises with video demos. Log sets, track PRs, build custom routines. Everything auto-saves so you never lose a rep.",
    phone: "/phones/newworkoutscreen.png",
    accent: "#22D3EE",
    highlights: [
      { icon: Dumbbell, text: "500+ exercises" },
      { icon: Trophy, text: "PR tracking" },
      { icon: Timer, text: "Rest timers" },
      { icon: PenLine, text: "Custom routines" },
    ],
  },
  {
    eyebrow: "Progress",
    title: "See every gain.",
    titleAccent: "Charted.",
    description:
      "Weight trends, body measurements, calorie streaks, macro breakdowns — all visualized so you can see exactly what's working.",
    phone: "/phones/weightscreen.png",
    accent: "#D8B440",
    highlights: [
      { icon: BarChart3, text: "Weight & body comp" },
      { icon: Flame, text: "Calorie streaks" },
      { icon: TrendingUp, text: "Trend analysis" },
      { icon: Target, text: "Goal tracking" },
    ],
  },
];

/* ── Single spotlight block ──────────────────────────────────── */
function Spotlight({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reverse = index % 2 === 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.querySelector("[data-spot-text]")!, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(ref.current!.querySelector("[data-spot-phone]")!, {
        y: 60,
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        delay: 0.15,
      });

      /* Subtle parallax float */
      gsap.to(ref.current!.querySelector("[data-spot-phone]")!, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Highlight pills stagger */
      gsap.utils
        .toArray<HTMLElement>(
          ref.current!.querySelectorAll("[data-spot-pill]")
        )
        .forEach((el, i) => {
          gsap.from(el, {
            y: 12,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            delay: 0.4 + i * 0.07,
          });
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Accent glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[180px] opacity-[0.04] pointer-events-none"
        style={{
          backgroundColor: feature.accent,
          left: reverse ? "auto" : "10%",
          right: reverse ? "10%" : "auto",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:direction-rtl" : ""
          }`}
          style={reverse ? { direction: "rtl" } : {}}
        >
          {/* Phone */}
          <div
            className="flex justify-center"
            style={reverse ? { direction: "ltr" } : {}}
          >
            <div data-spot-phone className="relative">
              <div
                className="absolute -inset-6 rounded-[3rem] blur-[50px] opacity-[0.08] pointer-events-none"
                style={{ backgroundColor: feature.accent }}
              />
              <div className="relative w-[260px] sm:w-[280px] lg:w-[300px] rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50">
                <img
                  src={feature.phone}
                  alt={`${feature.eyebrow} screen`}
                  className="w-full aspect-[9/19.5] object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            data-spot-text
            style={reverse ? { direction: "ltr" } : {}}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
              style={{
                borderColor: feature.accent + "30",
                backgroundColor: feature.accent + "08",
              }}
            >
              <span
                className="text-[11px] font-mono tracking-widest uppercase"
                style={{ color: feature.accent }}
              >
                {feature.eyebrow}
              </span>
            </div>

            <h2 className="text-display-lg mb-4">
              {feature.title}
              <br />
              <span style={{ color: feature.accent }}>{feature.titleAccent}</span>
            </h2>

            <p className="text-base sm:text-lg text-white/40 font-light leading-relaxed max-w-md mb-8">
              {feature.description}
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3">
              {feature.highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.text}
                    data-spot-pill
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <Icon className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/50">{h.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  return (
    <section className="relative">
      {features.map((feature, i) => (
        <Spotlight key={feature.eyebrow} feature={feature} index={i} />
      ))}
    </section>
  );
}
