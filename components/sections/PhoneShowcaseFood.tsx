"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";

const STEPS = [
  {
    screen: "/phones/foodscreen.png",
    eyebrow: "01 — Snap",
    title: "Take a photo of your meal.",
    body: "No barcodes. No menus. Helthy looks at the plate and works out what's on it — protein, carbs, fats, fiber, the works.",
  },
  {
    screen: "/phones/barcodescan.png",
    eyebrow: "02 — Or scan",
    title: "Got a label? Even faster.",
    body: "Barcode scanner backed by USDA + Open Food Facts. Millions of foods, instant macros, no typing.",
  },
  {
    screen: "/phones/homescreen.png",
    eyebrow: "03 — See your day",
    title: "Macros that actually update.",
    body: "Watch your rings fill in real time as you log. Protein, carbs, fats, fiber — and the goals that matter to you.",
  },
];

/**
 * Pinned scroll showcase. The phone stays centered while text panels
 * scroll past on the right. Screenshots crossfade as each panel
 * enters the active zone.
 *
 * Mobile fallback: stacks vertically, no pin, simple fade-in.
 */
export default function PhoneShowcaseFood() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-food-panel]");
        const screens = gsap.utils.toArray<HTMLElement>("[data-food-screen]");

        // Initial state: only first screen visible
        gsap.set(screens, { opacity: 0 });
        gsap.set(screens[0], { opacity: 1 });

        // Pin the phone column for the duration of all panels
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(panels.length - 1) * window.innerHeight}`,
          pin: phoneWrapRef.current,
          pinSpacing: false,
        });

        // For each panel after the first, create a crossfade trigger
        panels.forEach((panel, i) => {
          if (i === 0) return;
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(screens[i - 1], { opacity: 0, duration: 0.5 });
              gsap.to(screens[i], { opacity: 1, duration: 0.5 });
            },
            onLeaveBack: () => {
              gsap.to(screens[i], { opacity: 0, duration: 0.5 });
              gsap.to(screens[i - 1], { opacity: 1, duration: 0.5 });
            },
          });
        });
      });

      // Mobile: simple stagger fade
      mm.add("(max-width: 1023px)", () => {
        gsap.from("[data-food-panel]", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative bg-[#080808] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-20 text-center lg:text-left lg:max-w-2xl">
          <p className="text-eyebrow mb-4">How it works</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Log a meal in <span className="text-italics text-helthy-lemon">3 seconds</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Phone column — pinned on desktop */}
          <div
            ref={phoneWrapRef}
            className="relative h-screen flex items-center justify-center lg:sticky lg:top-0"
          >
            <div className="relative">
              {STEPS.map((step, i) => (
                <div
                  key={step.screen}
                  data-food-screen
                  className={i === 0 ? "" : "absolute inset-0"}
                >
                  <PhoneFrame
                    src={step.screen}
                    alt={step.title}
                    width={300}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div className="space-y-24 lg:space-y-[60vh] lg:pt-[20vh]">
            {STEPS.map((step) => (
              <div key={step.title} data-food-panel>
                <p className="text-eyebrow mb-3">{step.eyebrow}</p>
                <h3 className="text-display-lg font-heading font-light tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-white/60 leading-relaxed max-w-md font-light">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
