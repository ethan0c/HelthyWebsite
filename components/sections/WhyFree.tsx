"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";

const competitors = [
  { name: "MyFitnessPal", price: "$19.99/mo", missing: "No workouts" },
  { name: "Strong", price: "$14.99/mo", missing: "No nutrition" },
  { name: "Cal AI", price: "$9.99/mo", missing: "No workouts" },
];

const included = [
  "Workout tracking",
  "Nutrition logging",
  "Barcode scanner",
  "Health sync",
  "Progress charts",
  "500+ exercises",
  "1M+ foods",
  "7 themes",
];

export default function WhyFree() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-wf-heading]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-wf-row]").forEach((el, i) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          delay: 0.2 + i * 0.06,
        });
      });

      /* Price counter $15 → $0 */
      const counter = { value: 15 };
      gsap.to(counter, {
        value: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-price-zero]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const el = document.querySelector("[data-price-zero]");
          if (el) el.textContent = `$${Math.round(counter.value)}`;
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Heading — centered */}
        <div data-wf-heading className="text-center mb-14 sm:mb-20">
          <h2 className="text-display-lg mb-3">
            They charge monthly.
          </h2>
          <p className="text-lg text-white/35 font-light">We don&rsquo;t.</p>
        </div>

        {/* Comparison table — clean rows */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-3 px-5 sm:px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-xs font-mono text-white/25 uppercase tracking-wider">App</span>
            <span className="text-xs font-mono text-white/25 uppercase tracking-wider text-center">Price</span>
            <span className="text-xs font-mono text-white/25 uppercase tracking-wider text-right">Coverage</span>
          </div>

          {/* Competitor rows */}
          {competitors.map((c) => (
            <div
              key={c.name}
              data-wf-row
              className="grid grid-cols-3 items-center px-5 sm:px-6 py-4 border-b border-white/[0.04]"
            >
              <span className="text-sm text-white/40">{c.name}</span>
              <span className="text-sm font-mono text-white/30 text-center line-through decoration-white/15">{c.price}</span>
              <div className="flex items-center gap-1.5 justify-end">
                <X className="w-3.5 h-3.5 text-red-400/40" />
                <span className="text-xs text-white/25">{c.missing}</span>
              </div>
            </div>
          ))}

          {/* Helthy row — highlighted */}
          <div
            data-wf-row
            className="grid grid-cols-3 items-center px-5 sm:px-6 py-5 bg-helthy-lemon/[0.04] border-t border-helthy-lemon/10"
          >
            <div className="flex items-center gap-2.5">
              <img src="/images/logos/helthy-green.png" alt="Helthy" className="h-5 w-auto" loading="lazy" />
              <span className="text-sm font-semibold text-white">Helthy</span>
            </div>
            <span data-price-zero className="text-2xl font-mono font-bold text-helthy-lemon text-center">$0</span>
            <div className="flex items-center gap-1.5 justify-end">
              <Check className="w-3.5 h-3.5 text-helthy-lemon" />
              <span className="text-xs text-helthy-lemon/70 font-medium">Everything</span>
            </div>
          </div>
        </div>

        {/* Feature grid below */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {included.map((f) => (
            <div
              key={f}
              data-wf-row
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02]"
            >
              <Check className="w-3.5 h-3.5 text-helthy-lemon/60 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-white/45">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
