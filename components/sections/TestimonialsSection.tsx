"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";
import FloatingIcons from "@/components/ui/FloatingIcons";

const TESTIMONIALS = [
  {
    quote:
      "I've tried MyFitnessPal, Cronometer, MacroFactor — Helthy is the first one that stuck. Snap a photo and it's logged. That's it.",
    name: "Marcus T.",
    detail: "Lost 14 kg in 5 months",
    accent: "#22C55E",
  },
  {
    quote:
      "Built Helthy because nothing else would actually tell me what to fix. Down 28 lb, up 50 lb on bench.",
    name: "Chibu",
    detail: "Co-founder",
    accent: "#CDFF50",
  },
  {
    quote:
      "The AI coach told me to skip legs after a bad sleep night. No other app connects my data like that.",
    name: "Sarah K.",
    detail: "Training 4x/week for 8 months",
    accent: "#2563EB",
  },
  {
    quote:
      "I opened the app to log a meal and it already knew what I was eating. Genuinely felt like magic.",
    name: "James R.",
    detail: "200+ meals logged",
    accent: "#DC2626",
  },
  {
    quote:
      "I used to forget half my meals. Now Helthy logs them in seconds and the AI coach actually keeps me honest.",
    name: "Ebu",
    detail: "Co-founder",
    accent: "#CDFF50",
  },
  {
    quote:
      "Finally an app that doesn't make me feel like I'm filling out a spreadsheet. The weight trend chart alone is worth it.",
    name: "Priya M.",
    detail: "Goal weight reached in 12 weeks",
    accent: "#059669",
  },
  {
    quote:
      "I showed the insights screen to my PT and she said 'this is better than what I give my clients.' Switching her whole gym over.",
    name: "Olivia W.",
    detail: "Personal trainer, 12 clients on Helthy",
    accent: "#C2410C",
  },
  {
    quote:
      "My coach suggested I add Greek yogurt to hit my protein target. Tapped one button and it was logged. Unreal.",
    name: "Alex D.",
    detail: "Hitting 180g protein daily",
    accent: "#B45309",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-testimonial]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8"
    >
      <FloatingIcons
        positions={[
          [8, 92, 260, 25],
          [75, 3, 220, -15],
          [50, 95, 280, 40],
          [90, 88, 240, -30],
          [20, 1, 200, 10],
        ]}
        icons={[6, 7, 3, 6, 7]}
        opacity={0.03}
        colorClass="text-white"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Real people,"
          italicTail="real results"
          subtitle="Don't take our word for it. Here's what Helthy users are saying."
        />

        {/* Masonry-style 3-column grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              data-testimonial
              className="card-helthy p-7 break-inside-avoid"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    fill={t.accent}
                    stroke="none"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[15px] leading-relaxed font-light mb-5 text-white/75">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0"
                  style={{ background: t.accent + "15", color: t.accent }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-white/50">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
