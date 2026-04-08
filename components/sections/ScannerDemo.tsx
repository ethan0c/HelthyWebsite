"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Sparkles } from "lucide-react";

const foods = [
  { emoji: "🥗", name: "Mixed Greens Salad", cal: 45, p: 3, c: 6, f: 1 },
  { emoji: "🍣", name: "Grilled Salmon", cal: 354, p: 39, c: 0, f: 21 },
  { emoji: "🥑", name: "Avocado", cal: 114, p: 1, c: 6, f: 10 },
  { emoji: "🍅", name: "Cherry Tomatoes", cal: 16, p: 1, c: 3, f: 0 },
];

const COLORS = { p: "#4CAF50", c: "#2196F3", f: "#FF9800" };

export default function ScannerDemo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Viewfinder - fast */
      gsap.from("[data-scan-viewfinder]", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* Results card - fast */
      gsap.from("[data-scan-results]", {
        x: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        delay: 0.1,
      });

      /* Scan line animation */
      gsap.to("[data-scan-line]", {
        y: "100%",
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* Food rows - fast */
      gsap.from("[data-scan-food]", {
        x: 10,
        opacity: 0,
        stagger: 0.06,
        duration: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-scan-results]",
          start: "top 80%",
          once: true,
        },
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden geo-grid">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-eyebrow mb-6">AI-Powered</p>
          <h2 className="font-body font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white">
            Snap a photo.{" "}
            <span className="accent-serif text-helthy-lemon">Know every macro.</span>
          </h2>
        </div>

        {/* Split: viewfinder + results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Camera viewfinder */}
          <div
            data-scan-viewfinder
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0A]"
          >
            <img
              src="/images/stock/meal-overhead.jpg"
              alt="Meal being scanned"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Scan line */}
            <div
              data-scan-line
              className="absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-helthy-lemon to-transparent"
            />
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-helthy-lemon/60 rounded-tl-sm" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-helthy-lemon/60 rounded-tr-sm" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-helthy-lemon/60 rounded-bl-sm" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-helthy-lemon/60 rounded-br-sm" />
            {/* Camera icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/30 flex items-center justify-center">
                <Camera className="w-6 h-6 text-helthy-lemon" />
              </div>
            </div>
          </div>

          {/* Results card */}
          <div
            data-scan-results
            className="rounded-2xl border border-white/[0.06] bg-[#0C0C0C] flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-helthy-lemon/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-helthy-lemon" />
              </div>
              <span className="text-sm font-medium text-white/70">4 items detected</span>
              <span className="ml-auto text-xs font-mono text-white/25">529 kcal</span>
            </div>

            {/* Food rows */}
            <div className="flex-1 divide-y divide-white/[0.04]">
              {foods.map((f) => (
                <div key={f.name} data-scan-food className="px-5 py-3.5 flex items-center gap-3">
                  <span className="text-lg w-6 text-center shrink-0">{f.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white/70 font-medium truncate">{f.name}</p>
                    <p className="text-[11px] text-white/25">{f.cal} kcal</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {[
                      { v: f.p, l: "P", c: COLORS.p },
                      { v: f.c, l: "C", c: COLORS.c },
                      { v: f.f, l: "F", c: COLORS.f },
                    ].map((m) => (
                      <span
                        key={m.l}
                        className="inline-flex items-center gap-[2px] rounded-full px-1.5 py-[2px] text-[10px]"
                        style={{ backgroundColor: m.c + "15" }}
                      >
                        <span className="font-semibold text-white/60">{m.v}</span>
                        <span className="font-semibold" style={{ color: m.c, fontSize: 8 }}>{m.l}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
