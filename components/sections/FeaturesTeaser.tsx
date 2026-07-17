"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import { Camera, TrendingUp, Dumbbell } from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "Snap your plate",
    body: "Point your camera at any meal and Helthy logs the calories and macros in seconds.",
  },
  {
    icon: TrendingUp,
    title: "See your progress",
    body: "Every weigh-in plotted, every entry tracked, so the trend line tells the real story.",
  },
  {
    icon: Dumbbell,
    title: "Every lift, covered",
    body: "1,500 exercises with form tips and automatic PR detection for every session.",
  },
];

export default function FeaturesTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-teaser-card]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
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
      id="features"
      ref={sectionRef}
      className="relative section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="container-page relative">
        <SectionHeading
          title="Four apps' worth of tracking,"
          italicTail="in one"
          trailingPunctuation=""
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              data-teaser-card
              className="rounded-2xl p-8 flex flex-col items-start text-left"
              style={{ backgroundColor: "#161616", border: "1px solid #2E2E30" }}
            >
              <span
                className="inline-flex items-center justify-center rounded-xl mb-6"
                style={{ width: 48, height: 48, backgroundColor: "rgba(205,255,80,0.1)" }}
              >
                <Icon size={24} color="#CDFF50" strokeWidth={1.75} />
              </span>
              <h3 className="font-heading text-[22px] font-light tracking-tight text-white mb-3">
                {title}
              </h3>
              <p className="text-[15px] leading-relaxed text-white/60 font-light">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton href="/features" variant="secondary">
            See all features
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
