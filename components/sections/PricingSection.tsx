"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Check, Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";

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
  const [isYearly, setIsYearly] = useState(true);

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
      className="relative section-padding px-6 lg:px-8"
    >
      {/* Light container */}
      <div
        className="relative mx-auto max-w-6xl rounded-[2rem] px-8 py-16 md:px-16 md:py-20"
        style={{ background: "#EBEBEB" }}
      >
        {/* Eyebrow */}
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-6"
          style={{ color: "#888" }}
        >
          Pricing
        </p>

        {/* Heading */}
        <h2 className="font-heading font-light tracking-tight mb-16" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: "#111" }}>
          Simple, honest pricing
          <br />
          <span style={{ color: "#aaa" }}>No surprises.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* ── Free plan (dark card) ───────────────────────────────── */}
          <div
            data-price-card
            className="relative rounded-[1.25rem] p-8 lg:p-10 flex flex-col"
            style={{
              background: "#1A1A1A",
            }}
          >
            <p
              className="font-body text-xs font-medium uppercase tracking-[0.18em] mb-8"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Free forever
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-10">
              <span
                className="text-numeric"
                style={{
                  fontSize: "clamp(48px, 6vw, 64px)",
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                $0
              </span>
              <span
                className="text-sm font-light"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                /month
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-10 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    className="w-[18px] h-[18px] flex-shrink-0 mt-0.5"
                    style={{ color: "#CDFB50" }}
                    strokeWidth={2.5}
                  />
                  <span
                    className="text-[14px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-full py-3.5 px-6 text-[14px] font-medium transition-all duration-200"
              style={{
                background: "#CDFB50",
                color: "#111",
              }}
            >
              Get started free
            </Link>
          </div>

          {/* ── Premium plan (white card) ──────────────────────────── */}
          <div
            data-price-card
            className="relative rounded-[1.25rem] p-8 lg:p-10 flex flex-col"
            style={{
              background: "#fff",
            }}
          >
            {/* Header with toggle */}
            <div className="flex items-center justify-between mb-8">
              <p
                className="font-body text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "#888" }}
              >
                Premium
              </p>

              {/* Monthly / Yearly toggle */}
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[12px] font-medium"
                  style={{ color: isYearly ? "#aaa" : "#111" }}
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-[44px] h-[24px] rounded-full transition-colors duration-200 focus:outline-none"
                  style={{
                    background: isYearly ? "#CDFB50" : "#ccc",
                  }}
                  aria-label="Toggle yearly/monthly pricing"
                >
                  <span
                    className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{
                      left: "3px",
                      transform: isYearly ? "translateX(20px)" : "translateX(0)",
                    }}
                  />
                </button>
                <span
                  className="text-[12px] font-medium"
                  style={{ color: isYearly ? "#111" : "#aaa" }}
                >
                  Yearly
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-numeric"
                  style={{
                    fontSize: "clamp(48px, 6vw, 64px)",
                    color: "#111",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isYearly ? "$83" : "$10"}
                </span>
                <span
                  className="text-sm font-light"
                  style={{ color: "#999" }}
                >
                  {isYearly ? "/year" : "/month"}
                </span>
              </div>
            </div>
            <p
              className="text-[13px] mb-10"
              style={{ color: "#999" }}
            >
              {isYearly ? "That's $6.92/month — save 30%" : "or $83/year (save 30%)"}
            </p>

            {/* Features */}
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "#aaa" }}
            >
              Everything in Free, plus
            </p>

            <ul className="space-y-4 mb-10 flex-1">
              {PREMIUM_FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#f3f3f3" }}
                  >
                    <Icon
                      className="w-3 h-3"
                      style={{ color: "#666" }}
                      strokeWidth={2}
                    />
                  </div>
                  <span
                    className="text-[14px] leading-relaxed"
                    style={{ color: "#444" }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-full py-3.5 px-6 text-[14px] font-medium transition-all duration-200"
              style={{
                background: "#111",
                color: "#fff",
              }}
            >
              Start Premium
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
