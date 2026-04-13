"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import FloatingIcons from "@/components/ui/FloatingIcons";

const INTEGRATIONS = [
  { name: "Apple Health", icon: AppleHealthIcon },
  { name: "Google Health Connect", icon: GoogleHealthIcon },
  { name: "Apple Watch", icon: AppleWatchIcon },
  { name: "Fitbit", icon: FitbitIcon },
  { name: "Garmin", icon: GarminIcon },
];

const STATS = [
  { value: "10K+", label: "Meals logged" },
  { value: "1,500+", label: "Exercises in library" },
  { value: "<3s", label: "Average log time" },
  { value: "4.9", label: "App Store rating" },
];

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cred-item]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding px-6 lg:px-8 section-glow-lemon">
      <FloatingIcons
        positions={[
          [5, 2, 240, 15],
          [70, 90, 280, -20],
          [85, 5, 220, 35],
          [15, 85, 300, -10],
        ]}
        icons={[2, 7, 5, 2]}
        opacity={0.03}
        colorClass="text-white"
      />
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Plays nice with"
          italicTail="your gear"
          subtitle="Auto-syncs steps, weight, workouts, and heart rate — no manual entry needed."
        />

        {/* Integration logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 mb-20">
          {INTEGRATIONS.map((int) => {
            const Icon = int.icon;
            return (
              <div
                key={int.name}
                data-cred-item
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Icon />
                </div>
                <span className="text-[11px] text-white/45 font-medium">{int.name}</span>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} data-cred-item className="text-center">
              <p className="text-numeric text-[40px] lg:text-[48px] font-semibold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-[13px] text-white/50 font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Icons (simple SVG representations) ──────────────────────

function AppleHealthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF2D55" />
    </svg>
  );
}

function GoogleHealthIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4" opacity="0.2" />
      <path d="M12 6v6l4 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function AppleWatchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="3" width="12" height="18" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="8" y="6" width="8" height="10" rx="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="12" cy="11" r="3" stroke="#22C55E" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FitbitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      {[12, 12, 12, 8, 16, 8, 16].map((cx, i) => {
        const cy = [6, 12, 18, 12, 12, 9, 9][i];
        return <circle key={i} cx={cx} cy={cy} r="2" fill="#00B0B9" />;
      })}
    </svg>
  );
}

function GarminIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="rgba(255,255,255,0.6)" />
      <path d="M7 12h10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
