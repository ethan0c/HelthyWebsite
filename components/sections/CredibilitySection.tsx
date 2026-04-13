"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Camera, Brain, Dumbbell } from "lucide-react";
import type { ComponentType } from "react";

const CARDS: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Camera,
    accent: "#CDFF50",
    title: "Log meals in seconds",
    description:
      "Snap a photo of your plate — AI identifies the food, estimates portions, and logs calories and macros instantly. No searching, no typing.",
  },
  {
    icon: Brain,
    accent: "#CDFF50",
    title: "An AI coach that connects the dots",
    description:
      "Nutrition, training, weight trends, and recovery in one place. Helthy sees the full picture and gives advice that actually makes sense.",
  },
  {
    icon: Dumbbell,
    accent: "#CDFF50",
    title: "Track every lift, every rep",
    description:
      "1,500+ exercises with muscle maps, form cues, and PRs tracked automatically. Plan workouts or log on the fly.",
  },
];

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-why-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 section-glow-lemon"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Why"
          italicTail="Helthy"
          trailingPunctuation="?"
          subtitle="Everything you need in one app — nothing you don't."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((card) => (
            <div
              key={card.title}
              data-why-card
              className="card-helthy card-helthy-hover flex flex-col gap-5 p-8 lg:p-10"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                style={{
                  background: `${card.accent}12`,
                  border: `1.5px solid ${card.accent}25`,
                }}
              >
                <card.icon
                  className="w-5 h-5"
                  strokeWidth={1.75}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[18px] lg:text-[20px] font-semibold text-white tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] lg:text-[15px] text-white/50 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
