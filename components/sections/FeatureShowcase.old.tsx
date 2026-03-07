"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const panels = [
  {
    title: "Home Dashboard",
    description:
      "Calories, macros, steps, streaks — everything at a glance. Animated goal celebrations when you hit your targets.",
    image: "/phones/home.webp",
    accent: "#CDFB50",
  },
  {
    title: "Smart Nutrition Logging",
    description:
      "Barcode scan, OCR label reading, voice describe, or search 800K+ foods. Log meals in seconds.",
    image: "/phones/nutrition.webp",
    accent: "#E96C2C",
  },
  {
    title: "Workout Tracking",
    description:
      "Full exercise library with GIFs, set/rep/weight logging, PR tracking, global routines (PPL, Upper/Lower), and share cards.",
    image: "/phones/exercise.webp",
    accent: "#22D3EE",
  },
  {
    title: "Progress & Insights",
    description:
      "Weight charts, body composition trends, workout streaks, and detailed analytics. See your transformation over time.",
    image: "/phones/progress.webp",
    accent: "#D8B440",
  },
  {
    title: "AI Coach",
    description:
      "Personalized workout plans, form tips, calorie adjustments, and dynamic TDEE — your pocket fitness coach.",
    image: "/phones/home.webp",
    accent: "#A78BFA",
    premium: true,
  },
];

export default function FeatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Parallax each card image */
      cards.forEach((card) => {
        const img = card.querySelector("[data-feature-img]");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById?.("horizontal") || undefined,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#060606]">
      {/* Sticky header */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-24 sm:pt-32 px-5 sm:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <p className="text-eyebrow mb-3">What you get</p>
          <h2 className="text-display-lg">
            Everything in <br className="sm:hidden" />
            <span className="text-helthy-lemon">one app.</span>
          </h2>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 sm:gap-12 pt-48 sm:pt-56 pb-20 pl-5 sm:pl-8 pr-[30vw]"
        style={{ width: "max-content" }}
      >
        {panels.map((panel, i) => (
          <div
            data-feature-card
            key={panel.title}
            className="relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] max-w-[520px]"
          >
            {/* Phone mockup */}
            <div className="relative rounded-[2rem] overflow-hidden bg-helthy-card border border-helthy-border aspect-[9/16] shadow-2xl">
              <img
                data-feature-img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${panel.accent}15 0%, transparent 50%)`,
                }}
              />
              {panel.premium && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-mono tracking-widest uppercase text-helthy-lemon">
                    Premium
                  </span>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className="mt-6 sm:mt-8">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: panel.accent }}
                />
                <span className="text-eyebrow" style={{ color: panel.accent }}>
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {panel.title}
              </h3>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-sm">
                {panel.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
