"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Download, Camera, Sparkles } from "lucide-react";
import FloatingIcons from "@/components/ui/FloatingIcons";

const STEPS = [
  {
    number: "01",
    icon: Download,
    title: "Download the app",
    description:
      "Set up your profile, goals, and preferences in under two minutes. Available on iOS and Android.",
    accent: "#22C55E",
  },
  {
    number: "02",
    icon: Camera,
    title: "Log meals, workouts & weight",
    description:
      "Snap a photo to log any meal instantly. Track workouts from 1,500+ exercises. Log weight in seconds.",
    accent: "#3B82F6",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get coached by AI",
    description:
      "Your AI coach connects nutrition, training, and recovery data to give you personalized guidance every day.",
    accent: "#E96C2C",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-step]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 section-light"
    >
      <FloatingIcons
        positions={[
          [10, 3, 260, -18],
          [20, 85, 300, 15],
          [65, 8, 240, 40],
          [70, 90, 200, -25],
        ]}
        icons={[2, 6, 0, 1]}
        opacity={0.04}
        colorClass="text-black"
      />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="How it"
          italicTail="works"
          className="[&_h2]:text-[#121111] [&_.text-italics]:text-[#121111] [&_p]:text-[rgba(18,17,17,0.55)]"
        />

        {/* Steps row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} data-step className="relative">
                {/* Connector line — between steps on desktop */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] right-[-40%] h-[1px] bg-black/[0.08]" />
                )}

                {/* Step number */}
                <span
                  className="text-[64px] lg:text-[80px] font-light leading-none tracking-tight font-heading"
                  style={{ color: "rgba(0,0,0,0.06)" }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mt-4 mb-5"
                  style={{
                    background: step.accent + "15",
                    border: `1px solid ${step.accent}25`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: step.accent }}
                  />
                </div>

                {/* Copy */}
                <h3 className="text-[20px] lg:text-[22px] font-medium tracking-tight mb-3" style={{ color: "#121111" }}>
                  {step.title}
                </h3>
                <p className="text-[14px] font-light leading-relaxed" style={{ color: "rgba(18,17,17,0.55)" }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
