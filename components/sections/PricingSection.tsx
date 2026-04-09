"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const ORANGE = "#E96C2C";

const FEATURES = [
  { icon: Sparkles, label: "Unlimited AI photo & voice meal logging" },
  { icon: MessageCircle, label: "Unlimited AI Coach powered by Claude" },
  { icon: Brain, label: "AI-generated workout routines" },
  { icon: LineChart, label: "Full analytics, trends & all-time history" },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<"yearly" | "monthly">("yearly");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-price-card]", {
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
      id="pricing"
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 overflow-hidden"
    >
      {/* grid background */}
      <div className="absolute inset-0 geo-grid pointer-events-none" aria-hidden="true" />

      {/* orange gradient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 25%, ${ORANGE}22 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      {/* secondary amber wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background: `linear-gradient(180deg, ${ORANGE}0D 0%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${ORANGE}33 0%, ${ORANGE}0D 100%)`,
                border: `1px solid ${ORANGE}55`,
                boxShadow: `0 20px 60px -20px ${ORANGE}66`,
              }}
            >
              <Sparkles className="w-6 h-6" style={{ color: ORANGE }} strokeWidth={1.75} />
            </div>
          </div>
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Free forever.{" "}
            <span className="text-italics" style={{ color: ORANGE }}>
              Premium when you want more.
            </span>
          </h2>
          <p className="text-white/55 text-sm mt-5 font-light leading-relaxed">
            Unlimited calorie &amp; workout tracking — always free.
            <br />
            Unlock AI when you&apos;re ready.
          </p>
        </div>

        {/* Plan toggle cards */}
        <div data-price-card className="space-y-3 mb-6">
          {/* Yearly */}
          <button
            onClick={() => setSelected("yearly")}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all"
            style={{
              background:
                selected === "yearly"
                  ? `${ORANGE}0F`
                  : "rgba(255,255,255,0.03)",
              border: `${selected === "yearly" ? 2 : 1}px solid ${
                selected === "yearly" ? ORANGE : "rgba(255,255,255,0.1)"
              }`,
              boxShadow:
                selected === "yearly"
                  ? `0 20px 50px -24px ${ORANGE}80`
                  : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  border: `2px solid ${
                    selected === "yearly" ? ORANGE : "rgba(255,255,255,0.25)"
                  }`,
                }}
              >
                {selected === "yearly" && (
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: ORANGE }}
                  />
                )}
              </span>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-white">
                    Yearly
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{
                      background: `${ORANGE}22`,
                      color: ORANGE,
                      border: `1px solid ${ORANGE}55`,
                    }}
                  >
                    Save 30%
                  </span>
                </div>
              </div>
            </div>
            <span
              className="text-numeric text-[22px] text-white"
              style={{ letterSpacing: -0.5 }}
            >
              $83
              <span className="text-white/40 text-sm">/yr</span>
            </span>
          </button>

          {/* Monthly */}
          <button
            onClick={() => setSelected("monthly")}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all"
            style={{
              background:
                selected === "monthly"
                  ? `${ORANGE}0F`
                  : "rgba(255,255,255,0.03)",
              border: `${selected === "monthly" ? 2 : 1}px solid ${
                selected === "monthly" ? ORANGE : "rgba(255,255,255,0.1)"
              }`,
              boxShadow:
                selected === "monthly"
                  ? `0 20px 50px -24px ${ORANGE}80`
                  : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  border: `2px solid ${
                    selected === "monthly" ? ORANGE : "rgba(255,255,255,0.25)"
                  }`,
                }}
              >
                {selected === "monthly" && (
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: ORANGE }}
                  />
                )}
              </span>
              <span className="text-[15px] font-semibold text-white">
                Monthly
              </span>
            </div>
            <span
              className="text-numeric text-[22px] text-white"
              style={{ letterSpacing: -0.5 }}
            >
              $10
              <span className="text-white/40 text-sm">/mo</span>
            </span>
          </button>
        </div>

        {/* Feature list */}
        <div data-price-card className="space-y-1 mb-8">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 py-2.5">
              <Icon
                className="w-5 h-5 flex-shrink-0"
                style={{ color: ORANGE }}
                strokeWidth={1.75}
              />
              <span className="text-[15px] text-white/85 leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-price-card className="space-y-3">
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-full py-3.5 text-[15px] font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: ORANGE,
              boxShadow: `0 16px 40px -12px ${ORANGE}99`,
            }}
          >
            Start free trial
          </Link>
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-full py-3.5 text-[14px] text-white/50 hover:text-white/70 transition-colors"
          >
            Restore purchases
          </Link>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          7-day free trial · Cancel anytime in the App Store
        </p>
      </div>
    </section>
  );
}
