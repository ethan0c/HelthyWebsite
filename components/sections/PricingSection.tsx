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
      className="relative section-padding px-6 lg:px-8 bg-helthy-surface"
    >
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="Simple, honest pricing"
          trailingPunctuation=""
          subtitle="Free forever for the core. Premium unlocks unlimited AI. Cancel anytime."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Free plan */}
          <div
            data-price-card
            className="card-helthy p-8 lg:p-10 flex flex-col"
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50 font-medium mb-3">
                Free forever
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-numeric text-5xl text-white">$0</span>
                <span className="text-sm text-white/50">/ month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check
                    className="w-4 h-4 mt-1 flex-shrink-0 text-white/80"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-white/75 leading-relaxed font-light">
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
              Download for free
            </Link>
          </div>

          {/* Premium plan */}
          <div
            data-price-card
            className="card-helthy card-helthy-glow p-8 lg:p-10 flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-[0.18em] text-helthy-lemon font-medium">
                  Premium
                </p>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-helthy-lemon/40 bg-helthy-lemon/10 text-helthy-lemon">
                  Save 30%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-numeric text-5xl text-white">$83</span>
                <span className="text-sm text-white/50">/ year</span>
              </div>
              <p className="text-xs text-white/45 mt-1">
                or $10 / month, billed monthly
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {PREMIUM_FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-helthy-lemon"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm text-white/85 leading-relaxed font-light">
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
