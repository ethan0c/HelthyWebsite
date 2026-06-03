"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger step numbers
      gsap.from("[data-step-num]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stagger step cards
      gsap.from("[data-step-block]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate mockup areas
      gsap.from("[data-step-mockup]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding section-glow-warm"
    >
      <div className="container-page">
        <SectionHeading
          title="How it"
          italicTail="works"
          subtitle="Three steps. No learning curve."
        />

        <div className="flex flex-col gap-6">
          {/* ── Step 1: Set your goals ── */}
          <StepCard
            number="01"
            title="Tell us your goals"
            description="Pick your target, set your stats, and your AI coach builds a plan in under two minutes."
          >
            <OnboardingMockup />
          </StepCard>

          {/* ── Step 2: Log everything ── */}
          <StepCard
            number="02"
            title="Log meals, workouts & weight"
            description="Snap a photo to log any meal. Track lifts from 1,500 exercises. Step on the scale and go."
          >
            <LoggingMockup />
          </StepCard>

          {/* ── Step 3: Get coached ── */}
          <StepCard
            number="03"
            title="Get coached by AI"
            description="Your coach connects nutrition, training, and recovery to give you actionable guidance every single day."
          >
            <CoachingMockup />
          </StepCard>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────
   Step card shell — number + text on left, mockup on right
   ─────────────────────────────────────────────────────────── */

function StepCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-step-block
      className="card-helthy flex flex-col lg:flex-row lg:items-stretch overflow-hidden"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
        style={{ backgroundImage: "url(/textures/hero-noise.png)", backgroundSize: "200px" }}
      />

      {/* Text column */}
      <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 lg:w-[42%] shrink-0">
        <span
          data-step-num
          className="text-numeric text-[64px] sm:text-[80px] font-medium leading-none block mb-5"
          style={{ color: "#CDFF50", opacity: 0.18, letterSpacing: "-0.04em" }}
        >
          {number}
        </span>
        <h3 className="font-heading font-light text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.08] tracking-tight text-white mb-4">
          {title}
        </h3>
        <p className="text-[15px] font-light leading-relaxed text-white/55 max-w-md">
          {description}
        </p>
      </div>

      {/* Mockup column */}
      <div
        data-step-mockup
        className="relative flex-1 flex items-end justify-center overflow-hidden px-6 pt-4 lg:px-8 lg:pt-0"
        style={{ minHeight: 320 }}
      >
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Mockup 1: Onboarding — goal selector + body stats
   ─────────────────────────────────────────────────────────── */

function OnboardingMockup() {
  return (
    <div
      className="w-[75%] max-w-[320px] rounded-t-[20px] overflow-hidden mb-0"
      style={{
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <Image
        src="/phones/set-goals.png"
        alt="Set your fitness goals and nutrition targets"
        width={1320}
        height={2274}
        style={{ width: "100%", height: "auto" }}
        className="object-cover object-top"
      />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Mockup 2: Logging — triple phone strip (photo + workout + scale)
   ─────────────────────────────────────────────────────────── */

function LoggingMockup() {
  const phones = [
    { src: "/phones/step-2/workout-log.png", alt: "Workout set tracking", width: 1320, height: 2166 },
    { src: "/phones/step-2/food-search.png", alt: "Food search and meal logging", width: 1320, height: 1751 },
    { src: "/phones/step-2/weight-log.png", alt: "Weight logging", width: 1320, height: 1396 },
  ];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-4 pb-0 w-full">
      {phones.map((phone, i) => (
        <div
          key={phone.src}
          className="w-[38%] max-w-[200px] rounded-t-[16px] overflow-hidden"
          style={{
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            transform: i === 1 ? "translateY(-16px)" : undefined,
          }}
        >
          <Image
            src={phone.src}
            alt={phone.alt}
            width={phone.width}
            height={phone.height}
            style={{ width: "100%", height: "auto" }}
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Mockup 3: AI Coaching — insight cards
   ─────────────────────────────────────────────────────────── */

function CoachingMockup() {
  return (
    <div
      className="w-[75%] max-w-[320px] rounded-t-[20px] overflow-hidden mb-0"
      style={{
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <Image
        src="/phones/see-insights.png"
        alt="AI coaching insights connecting nutrition and training"
        width={1243}
        height={1529}
        style={{ width: "100%", height: "auto" }}
        className="object-cover object-top"
      />
    </div>
  );
}
