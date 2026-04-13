"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Download, Camera, Sparkles } from "lucide-react";

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
    accent: "#CDFF50",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connector line drawing down
      gsap.from("[data-connector-line]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "power3.inOut",
      });

      // Stagger the step cards
      gsap.from("[data-step-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Pulse the step dots
      gsap.from("[data-step-dot]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.3,
        ease: "back.out(2)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 section-glow-warm"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="How it"
          italicTail="works"
          subtitle="Three steps. No learning curve."
        />

        {/* Steps — vertical timeline layout */}
        <div className="relative">
          {/* Vertical connector line — centered on the dot column */}
          <div
            data-connector-line
            className="absolute left-[27px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(205,255,80,0) 0%, rgba(205,255,80,0.2) 10%, rgba(205,255,80,0.2) 90%, rgba(205,255,80,0) 100%)",
            }}
          />

          <div className="flex flex-col gap-16 lg:gap-20">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative flex items-start gap-6 lg:gap-0"
                >
                  {/* Timeline dot — always visible */}
                  <div
                    data-step-dot
                    className="relative z-10 shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-8"
                  >
                    <div
                      className="w-[56px] h-[56px] rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${step.accent}20 0%, ${step.accent}08 70%)`,
                        border: `1.5px solid ${step.accent}40`,
                        boxShadow: `0 0 30px ${step.accent}15, inset 0 0 20px ${step.accent}08`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: step.accent }}
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* Card — alternates sides on desktop */}
                  <div
                    data-step-card
                    className={`flex-1 lg:w-[calc(50%-48px)] ${
                      isEven
                        ? "lg:mr-auto lg:pr-16"
                        : "lg:ml-auto lg:pl-16"
                    }`}
                  >
                    <div
                      className="card-helthy p-6 sm:p-8 lg:p-10"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent}06 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.01) 100%)`,
                      }}
                    >
                      {/* Step number — big, translucent */}
                      <span
                        className="text-numeric text-[56px] sm:text-[72px] lg:text-[88px] font-semibold leading-none block mb-4"
                        style={{
                          color: step.accent,
                          opacity: 0.12,
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {step.number}
                      </span>

                      <h3
                        className="font-heading font-light text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.1] tracking-tight text-white mb-4"
                      >
                        {step.title}
                      </h3>
                      <p className="text-[15px] font-light leading-relaxed text-white/55 max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
