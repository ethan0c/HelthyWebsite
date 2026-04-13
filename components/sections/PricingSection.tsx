"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Check, Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const FREE_FEATURES = [
  "Unlimited manual meal & workout logging",
  "TDEE, macros, and streaks",
  "Apple Health & Google Health Connect sync",
  "Form tips and rest timers",
];

const PREMIUM_FEATURES = [
  { icon: Sparkles, label: "Unlimited AI photo & voice meal logging" },
  { icon: MessageCircle, label: "Unlimited AI Coach powered by Claude" },
  { icon: Brain, label: "AI-generated workout routines" },
  { icon: LineChart, label: "Full analytics, trends & all-time history" },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-price-card]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 section-glow-center"
    >
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="Simple, honest"
          italicTail="pricing"
          trailingPunctuation=""
          subtitle="Free forever for the core. Premium unlocks unlimited AI."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* ── Free plan ─────────────────────────────────────────── */}
          <div
            data-price-card
            className="relative rounded-[1.5rem] p-10 lg:p-12 flex flex-col"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="font-body text-xs uppercase tracking-[0.2em] mb-8"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Free forever
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-numeric" style={{ fontSize: "clamp(56px, 7vw, 72px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>
                $0
              </span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                / month
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-12 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <Check className="w-3 h-3 text-white/60" strokeWidth={2.5} />
                  </div>
                  <span className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary justify-center w-full"
            >
              Get started free
            </Link>
          </div>

          {/* ── Premium plan ──────────────────────────────────────── */}
          <div
            data-price-card
            className="relative rounded-[1.5rem] p-10 lg:p-12 flex flex-col"
            style={{
              background:
                "linear-gradient(168deg, rgba(205,251,80,0.08) 0%, rgba(205,251,80,0.02) 40%, rgba(255,255,255,0.02) 100%)",
              border: "1.5px solid rgba(205,251,80,0.2)",
              boxShadow:
                "0 0 0 1px rgba(205,251,80,0.05), 0 24px 60px -16px rgba(205,251,80,0.12), 0 8px 24px -8px rgba(0,0,0,0.3)",
            }}
          >
            {/* Popular badge */}
            <div className="flex items-center justify-between mb-8">
              <p
                className="font-body text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--helthy-lemon)" }}
              >
                Premium
              </p>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(205,251,80,0.1)",
                  border: "1px solid rgba(205,251,80,0.25)",
                  color: "var(--helthy-lemon)",
                }}
              >
                Save 30%
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-baseline gap-3">
                <span className="text-numeric text-helthy-lemon" style={{ fontSize: "clamp(56px, 7vw, 72px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  $83
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  / year
                </span>
              </div>
            </div>
            <p className="text-[13px] mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
              or $10 / month billed monthly
            </p>

            {/* Divider */}
            <div className="h-px mb-8" style={{ background: "rgba(205,251,80,0.1)" }} />

            {/* Everything in Free */}
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Everything in Free, plus
            </p>

            {/* Premium features */}
            <ul className="space-y-4 mb-12 flex-1">
              {PREMIUM_FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(205,251,80,0.1)" }}
                  >
                    <Icon className="w-3 h-3 text-helthy-lemon" strokeWidth={2} />
                  </div>
                  <span className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center w-full"
            >
              Start Premium
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
