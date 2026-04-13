"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, X, Minus } from "lucide-react";

const COMPETITORS = ["MyFitnessPal", "Cronometer", "MacroFactor"];

const FEATURES = [
  {
    label: "AI photo meal logging",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "AI coach (nutrition + training)",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "Achievements & gamification",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "Adaptive TDEE & auto-adjust macros",
    helthy: true,
    others: [false, false, true],
  },
  {
    label: "Progress photo comparisons",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "1,500+ exercise library",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "Workout tracking + logging",
    helthy: true,
    others: [false, "partial" as const, false],
  },
  {
    label: "Nutrition label scanner",
    helthy: true,
    others: [true, false, false],
  },
  {
    label: "Import from other apps",
    helthy: true,
    others: [false, false, false],
  },
  {
    label: "Apple Health / Health Connect",
    helthy: true,
    others: [true, true, true],
  },
  {
    label: "Free tier available",
    helthy: true,
    others: ["partial" as const, false, false],
  },
];

function CellIcon({ value }: { value: boolean | "partial" }) {
  if (value === true)
    return <Check className="w-4 h-4 text-helthy-lemon" strokeWidth={2.5} />;
  if (value === "partial")
    return <Minus className="w-4 h-4 text-white/30" strokeWidth={2.5} />;
  return <X className="w-4 h-4 text-white/15" strokeWidth={2} />;
}

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-comp-row]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-4 sm:px-6 lg:px-8 section-glow-lemon"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Why"
          italicTail="Helthy"
          trailingPunctuation="?"
          subtitle="Everything you need in one app. No patchwork of tools."
        />

        {/* Comparison table — scrollable on mobile */}
        <div className="card-helthy overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div style={{ minWidth: 560 }}>
              {/* Header row */}
              <div
                data-comp-row
                className="grid items-end gap-0 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
                style={{
                  gridTemplateColumns: "1fr repeat(4, minmax(56px, 100px))",
                }}
              >
                <div />
                <div className="text-center">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-helthy-lemon tracking-tight">
                    Helthy
                  </span>
                </div>
                {COMPETITORS.map((c) => (
                  <div key={c} className="text-center">
                    <span className="text-[10px] sm:text-[11px] text-white/35 font-medium">
                      {c}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feature rows */}
              {FEATURES.map((f, i) => (
                <div
                  key={f.label}
                  data-comp-row
                  className={`grid items-center gap-0 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${
                    i < FEATURES.length - 1 ? "border-b border-white/[0.04]" : ""
                  } ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}
                  style={{
                    gridTemplateColumns: "1fr repeat(4, minmax(56px, 100px))",
                  }}
                >
                  <span className="text-[13px] sm:text-[14px] text-white/70 font-light pr-3">
                    {f.label}
                  </span>
                  <div className="flex justify-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-helthy-lemon/[0.08]">
                      <CellIcon value={f.helthy} />
                    </div>
                  </div>
                  {f.others.map((val, j) => (
                    <div key={j} className="flex justify-center">
                      <CellIcon value={val} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
