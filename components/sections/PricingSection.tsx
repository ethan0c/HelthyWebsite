"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

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
      const trigger = { trigger: sectionRef.current, start: "top 70%" };
      gsap.from("[data-price-eyebrow]", {
        opacity: 0, y: 10, duration: 0.5, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-head]", {
        opacity: 0, y: 20, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-belief]", {
        opacity: 0, y: 12, duration: 0.6, delay: 0.35, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-card]", {
        opacity: 0, y: 30, duration: 0.9, delay: 0.45, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-free]", {
        opacity: 0, y: 10, duration: 0.5, delay: 0.75, ease: "power3.out", scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-light relative section-padding"
    >
      <div className="container-page relative text-center">
        <p
          data-price-eyebrow
          className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-10"
          style={{ color: "rgba(17,17,17,0.45)", fontFamily: "var(--font-body)" }}
        >
          Pricing
        </p>

        <h2
          data-price-head
          className="font-heading font-light"
          style={{
            fontSize: "clamp(44px, 7vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.98em",
            color: "#111",
            margin: 0,
          }}
        >
          Fair pricing.{" "}
          <span className="text-italics" style={{ color: "rgba(17,17,17,0.45)" }}>
            No games.
          </span>
        </h2>

        <p
          data-price-belief
          className="mx-auto"
          style={{
            marginTop: "clamp(24px, 3vh, 36px)",
            fontSize: "clamp(16px, 1.3vw, 19px)",
            letterSpacing: "-0.01em",
            lineHeight: "1.55em",
            color: "rgba(17,17,17,0.55)",
            maxWidth: 560,
          }}
        >
          One plan unlocks everything. Cancel in two taps. The free tier is
          actually free — forever.
        </p>

        {/* Premium card — the only card */}
        <div
          data-price-card
          className="relative mx-auto mt-14 md:mt-20 rounded-[1.5rem] text-left overflow-hidden"
          style={{
            maxWidth: 520,
            background: "#111",
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.04)," +
              "0 12px 32px -12px rgba(0,0,0,0.14)," +
              "0 40px 80px -30px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header row: label + toggle */}
          <div className="flex items-center justify-between px-8 pt-8 md:px-10 md:pt-10">
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Premium
            </p>

            <div className="flex items-center gap-2.5">
              <span
                className="text-[12px] font-medium"
                style={{ color: isYearly ? "rgba(255,255,255,0.4)" : "#fff" }}
              >
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isYearly}
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-[44px] h-[24px] rounded-full transition-colors duration-200 focus:outline-none"
                style={{
                  background: isYearly ? "#CDFF50" : "rgba(255,255,255,0.18)",
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
                style={{ color: isYearly ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                Yearly
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="px-8 md:px-10 mt-8">
            <div className="flex items-baseline gap-2">
              <span
                className="text-numeric"
                style={{
                  fontSize: "clamp(56px, 8vw, 88px)",
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {isYearly ? "$83" : "$10"}
              </span>
              <span
                className="text-sm font-light"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {isYearly ? "/year" : "/month"}
              </span>
            </div>
            <p
              className="text-[13px] mt-2"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {isYearly ? "That's $6.92/month — save 30%" : "or $83/year — save 30%"}
            </p>
          </div>

          {/* Features */}
          <ul className="mt-10 px-8 md:px-10 space-y-4">
            {PREMIUM_FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(205,255,80,0.16)" }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{ color: "#CDFF50" }}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className="text-[14px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="px-8 md:px-10 pt-10 pb-8 md:pb-10">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-full py-3.5 px-6 text-[14px] font-medium transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                background: "#CDFF50",
                color: "#111",
              }}
            >
              Start Premium
            </Link>
          </div>
        </div>

        {/* Free tier link */}
        <p
          data-price-free
          className="mt-10 text-[14px]"
          style={{ color: "rgba(17,17,17,0.55)" }}
        >
          Or{" "}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-black"
            style={{ color: "rgba(17,17,17,0.85)" }}
          >
            use Helthy free, forever
          </Link>
          {" "}— manual logging, macros, Apple Health sync, all included.
        </p>
      </div>
    </section>
  );
}
