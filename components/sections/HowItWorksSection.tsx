"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

type Shot = { src: string; alt: string; width: number; height: number };

const STEPS: { title: string; description: string; shots: Shot[] }[] = [
  {
    title: "Set your goals",
    description:
      "Pick your target and enter your stats. Helthy sets your daily calories, macros, and step goal in under two minutes.",
    shots: [
      { src: "/phones/set-goals.png", alt: "Set your fitness goals and nutrition targets", width: 1320, height: 2274 },
    ],
  },
  {
    title: "Log meals, workouts & weight",
    description:
      "Snap a photo to log any meal. Track lifts from 1,500 exercises. Step on the scale and go.",
    shots: [
      { src: "/phones/step-2/workout-log.png", alt: "Workout set tracking", width: 1320, height: 2166 },
      { src: "/phones/step-2/food-search.png", alt: "Food search and meal logging", width: 1320, height: 1751 },
      { src: "/phones/step-2/weight-log.png", alt: "Weight logging", width: 1320, height: 1396 },
    ],
  },
  {
    title: "See what to fix",
    description:
      "Because it's all in one place, Helthy's AI connects your food, training, and weight — and tells you the one thing to change next.",
    shots: [
      { src: "/phones/see-insights.png", alt: "AI coaching insights connecting nutrition and training", width: 1243, height: 1529 },
    ],
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards rise in once. Skipped for reduced motion so the steps are
      // never left hidden at opacity 0.
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-step-block]", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-helthy" className="theme-light section">
      <div className="container-page">
        <SectionHeading
          title="How it"
          italicTail="works"
          subtitle="Three steps. No learning curve."
        />

        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} data-step-block className="card flex flex-col">
              <div className="p-6 sm:p-8">
                <span data-step-num className="text-numeric text-[15px] text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title mt-4">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-fg-muted">
                  {step.description}
                </p>
              </div>

              {/* App screenshots, cropped from the top */}
              <div
                data-step-mockup
                className={`mt-auto flex items-start justify-center gap-2 overflow-hidden border-t border-line bg-surface-2 px-6 pt-6 ${
                  step.shots.length > 1 ? "pb-6 md:h-[300px] md:pb-0" : "h-[300px]"
                }`}
              >
                {step.shots.map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 768px) 80vw, 280px"
                    className={`h-auto ${step.shots.length > 1 ? "w-[31%]" : "w-[78%]"}`}
                  />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
