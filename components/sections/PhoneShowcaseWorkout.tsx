"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PhoneFrame from "@/components/ui/PhoneFrame";

const STEPS = [
  {
    screen: "/phones/exercisescreen.png",
    eyebrow: "01 — Lift",
    title: "Track every set.",
    body: "Weight, reps, rest time, RIR. Helthy autofills your last session so you can just hit \"done\".",
  },
  {
    screen: "/phones/exerciselib.png",
    eyebrow: "02 — Pick from the library",
    title: "Hundreds of exercises.",
    body: "Searchable library with form tips and demos for every movement. Or build your own.",
  },
  {
    screen: "/phones/newworkout.png",
    eyebrow: "03 — Or build your own",
    title: "Custom routines, made fast.",
    body: "Drag exercises, set targets, save as a template. Premium users let AI generate full routines from a goal.",
  },
  {
    screen: "/phones/buildplate.png",
    eyebrow: "04 — Plates & PRs",
    title: "Plate calculator built in.",
    body: "Tap a weight, see exactly which plates to load. PRs auto-detected and celebrated.",
  },
];

export default function PhoneShowcaseWorkout() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-workout-panel]");
        const screens = gsap.utils.toArray<HTMLElement>("[data-workout-screen]");

        gsap.set(screens, { opacity: 0 });
        gsap.set(screens[0], { opacity: 1 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(panels.length - 1) * window.innerHeight}`,
          pin: phoneWrapRef.current,
          pinSpacing: false,
        });

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

      mm.add("(max-width: 1023px)", () => {
        gsap.from("[data-workout-panel]", {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-20 text-center lg:text-left lg:max-w-2xl">
          <p className="text-eyebrow mb-4">Workouts</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Lift heavier.{" "}
            <span className="text-italics text-helthy-lemon">Recover smarter.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text column — left side this time for variety */}
          <div className="space-y-24 lg:space-y-[60vh] lg:pt-[20vh] order-2 lg:order-1">
            {STEPS.map((step) => (
              <div key={step.title} data-workout-panel>
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

          {/* Phone column */}
          <div
            ref={phoneWrapRef}
            className="relative h-screen flex items-center justify-center lg:sticky lg:top-0 order-1 lg:order-2"
          >
            <div className="relative">
              {STEPS.map((step, i) => (
                <div
                  key={step.screen}
                  data-workout-screen
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
        </div>
      </div>
    </section>
  );
}
