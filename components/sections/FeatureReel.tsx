"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    id: "feature-nutrition",
    label: "Nutrition",
    headline: "Log meals in seconds.",
    description:
      "Barcode scanner, AI photo recognition, voice logging, or search from 1M+ foods.",
    phone: "/phones/foodscreen.png",
  },
  {
    id: "feature-workouts",
    label: "Workouts",
    headline: "Your gym partner, built in.",
    description:
      "500+ exercises. Log sets, track PRs, build custom routines. Everything auto-saves.",
    phone: "/phones/newworkout.png",
  },
  {
    id: "feature-progress",
    label: "Progress",
    headline: "See what's working.",
    description:
      "Weight trends, body measurements, calorie streaks — all visualized over time.",
    phone: "/phones/weightscreen.png",
  },
];

export default function FeatureReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const count = features.length;

      /* Build a single timeline, scrubbed by one ScrollTrigger */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${count * 100}%`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < count - 1; i++) {
        const curPanel = panelRefs.current[i];
        const nextPanel = panelRefs.current[i + 1];
        const curPhone = phoneRefs.current[i];
        const nextPhone = phoneRefs.current[i + 1];

        /* Hold current panel visible for a beat */
        tl.to({}, { duration: 0.4 });

        /* Cross-fade text: old out, new in */
        tl.to(
          curPanel,
          { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" },
          ">"
        );
        tl.fromTo(
          nextPanel,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "<0.15"
        );

        /* Cross-fade phones: old out, new in */
        tl.to(
          curPhone,
          { opacity: 0, scale: 0.9, duration: 0.5, ease: "power2.in" },
          "<-0.35"
        );
        tl.fromTo(
          nextPhone,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "<0.15"
        );
      }

      /* Hold the last panel */
      tl.to({}, { duration: 0.3 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center dot-grid"
      style={{ height: "100vh" }}
    >
      <div className="mx-auto max-w-6xl w-full px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text panels stacked */}
        <div className="relative" style={{ minHeight: 180 }}>
          {features.map((f, i) => (
            <div
              key={f.id}
              id={f.id}
              ref={(el) => { panelRefs.current[i] = el; }}
              className={`flex flex-col justify-center ${
                i === 0 ? "relative" : "absolute inset-0"
              }`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-helthy-lemon font-medium mb-4">
                {f.label}
              </span>
              <h2 className="font-body font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white mb-4">
                {f.headline}
              </h2>
              <p className="text-base text-white/40 leading-relaxed max-w-sm">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right — phone images stacked */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[320px] sm:w-[380px] lg:w-[440px]">
            {features.map((f, i) => (
              <div
                key={f.id}
                ref={(el) => { phoneRefs.current[i] = el; }}
                className="shadow-2xl shadow-black/50 w-full"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  position: i === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <Image
                  src={f.phone}
                  alt={`${f.label} screen`}
                  width={960}
                  height={540}
                  quality={90}
                  priority={i === 0}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}