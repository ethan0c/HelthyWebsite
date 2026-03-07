"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Feature data — minimal ────────────────────────────────── */
const features = [
  {
    label: "Nutrition",
    headline: "Log meals in seconds.",
    description:
      "Barcode scanner, AI photo recognition, voice logging, or search from 1M+ foods. However you eat, we track it.",
    phone: "/phones/foodmainscreen.png",
  },
  {
    label: "Workouts",
    headline: "Your gym partner, built in.",
    description:
      "500+ exercises with video demos. Log sets, track PRs, build custom routines. Everything auto-saves.",
    phone: "/phones/newworkoutscreen.png",
  },
  {
    label: "Progress",
    headline: "See what's working.",
    description:
      "Weight trends, body measurements, calorie streaks, and macro breakdowns — all visualized over time.",
    phone: "/phones/weightscreen.png",
  },
];

export default function FeatureReel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-feature-block]").forEach((el) => {
        const text = el.querySelector("[data-feature-text]");
        const phone = el.querySelector("[data-feature-phone]");

        if (text) {
          gsap.from(text, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (phone) {
          gsap.from(phone, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            delay: 0.1,
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-32 sm:space-y-44">
        {features.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={f.label}
              data-feature-block
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                reverse ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Phone — big, clean */}
              <div
                data-feature-phone
                className="flex justify-center"
                style={reverse ? { direction: "ltr" } : undefined}
              >
                <img
                  src={f.phone}
                  alt={`${f.label} screen`}
                  className="w-[260px] sm:w-[300px] lg:w-[340px] rounded-[2.5rem] shadow-2xl shadow-black/40"
                  loading="lazy"
                />
              </div>

              {/* Text — short, high contrast */}
              <div
                data-feature-text
                style={reverse ? { direction: "ltr" } : undefined}
              >
                <p className="text-sm font-mono tracking-[0.2em] uppercase text-helthy-lemon mb-4">
                  {f.label}
                </p>
                <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-white mb-5">
                  {f.headline}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed max-w-md">
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
