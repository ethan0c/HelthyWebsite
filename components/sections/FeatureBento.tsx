"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Dumbbell, TrendingUp, Camera, Mic, Brain } from "lucide-react";

const bentoCards = [
  {
    span: "col-span-2",
    icon: Flame,
    badge: "Nutrition",
    title: "1M+ foods at your fingertips",
    stat: "1,247",
    statLabel: "cal tracked today",
    desc: "Barcode scan, AI photo recognition, or just type. Every macro, every meal.",
  },
  {
    span: "col-span-1",
    icon: Camera,
    badge: "AI Scanner",
    title: "Snap & log",
    stat: "< 3s",
    statLabel: "to log a meal",
    desc: "Point your camera at any plate. Our AI identifies every item and estimates portions.",
  },
  {
    span: "col-span-1",
    icon: Mic,
    badge: "Voice",
    title: "Talk, don't type",
    stat: "98%",
    statLabel: "accuracy",
    desc: "\"Two eggs and toast\" — that's all it takes. Natural language food logging.",
  },
  {
    span: "col-span-2",
    icon: Dumbbell,
    badge: "Workouts",
    title: "500+ exercises, zero guesswork",
    stat: "500+",
    statLabel: "exercises",
    desc: "Log sets, supersets, and PRs. Built-in timers, progressive overload tracking, and custom routines.",
  },
  {
    span: "col-span-1",
    icon: TrendingUp,
    badge: "Progress",
    title: "Trends that matter",
    stat: "30d",
    statLabel: "rolling average",
    desc: "Weight, body measurements, calorie streaks, and macro splits — visualized over time.",
  },
  {
    span: "col-span-1",
    icon: Brain,
    badge: "AI Coach",
    title: "Your pocket coach",
    stat: "24/7",
    statLabel: "available",
    desc: "Personalized insights, meal suggestions, and workout adjustments based on your data.",
  },
];

export default function FeatureBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Section heading */
      gsap.from("[data-bento-heading]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Cards stagger in */
      gsap.from("[data-bento-card]", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-bento-grid]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      /* Stat counters */
      gsap.utils.toArray<HTMLElement>("[data-bento-stat]").forEach((el) => {
        const raw = el.dataset.bentoStat || "";
        const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 1) {
          const obj = { val: 0 };
          const prefix = raw.match(/^[^0-9]*/)?.[0] || "";
          const suffix = raw.match(/[^0-9]*$/)?.[0] || "";

          gsap.to(obj, {
            val: num,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate() {
              el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Heading */}
        <div data-bento-heading className="text-center mb-14">
          <span className="pill-badge mb-4">Core Features</span>
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-white">
            Your All-In-One{" "}
            <span className="accent-serif text-helthy-lemon">Rhythm</span>
          </h2>
          <p className="text-sm text-white/40 mt-3 max-w-md mx-auto">
            Everything you need to track, train, and transform — built into one free app.
          </p>
        </div>

        {/* Bento Grid */}
        <div data-bento-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bentoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.badge}
                data-bento-card
                className={`bento-card group ${card.span === "col-span-2" ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-helthy-lemon/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-helthy-lemon" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium">
                    {card.badge}
                  </span>
                </div>

                {/* Stat */}
                <div className="mb-3">
                  <span
                    data-bento-stat={card.stat}
                    className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight"
                  >
                    {card.stat}
                  </span>
                  <span className="text-xs text-white/30 ml-2">{card.statLabel}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-white/90 mb-2">{card.title}</h3>

                {/* Desc */}
                <p className="text-sm text-white/35 leading-relaxed">{card.desc}</p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-helthy-lemon/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
