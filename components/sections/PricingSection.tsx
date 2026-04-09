"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Check, Sparkles } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

/**
 * Pricing data is pulled from helthy_app/docs/PREMIUM_FEATURE_GATES.md.
 * Keep this in sync with that doc when limits change.
 */

const FREE_FEATURES = [
  "Unlimited calorie & macro logging",
  "Unlimited workout tracking",
  "TDEE & form tips",
  "Up to 5 custom routines",
  "1 AI photo log per day",
  "10 barcode scans / day",
  "Last 7 days of history",
  "Dark + Light themes",
  "Apple Health: steps + weight sync",
];

const PREMIUM_FEATURES = [
  "Everything in Free, plus:",
  "Unlimited AI photo & voice logging",
  "Unlimited AI chat with Helthy Coach",
  "AI-generated workout routines",
  "Daily coaching insights & meal suggestions",
  "Full muscle heatmap + trend charts",
  "Unlimited custom routines, foods & meals",
  "All-time history & all 9 themes",
  "Full HealthKit / Health Connect sync",
  "Unlimited progress photos",
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-price-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
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
      className="relative section-padding px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-eyebrow mb-4">Pricing</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Free forever.{" "}
            <span className="text-italics text-helthy-lemon">Premium when you want more.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Free */}
          <div data-price-card className="card-helthy p-8">
            <p className="text-eyebrow mb-3 !text-white/45">Free</p>
            <p className="text-numeric text-white text-5xl font-semibold mb-1">
              $0
            </p>
            <p className="text-sm text-white/50 mb-6">
              All the basics. No credit card.
            </p>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full border border-white/15 bg-white/[0.04] py-3 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors mb-7"
            >
              Download free
            </Link>
            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-white/70"
                >
                  <Check className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium */}
          <div
            data-price-card
            className="card-helthy card-helthy-glow p-8 relative"
          >
            <span className="absolute top-5 right-5 text-[10px] tracking-[0.18em] uppercase text-helthy-black bg-helthy-lemon px-2.5 py-1 rounded-full font-semibold">
              Most popular
            </span>
            <p className="text-eyebrow mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Premium
            </p>
            <p className="text-numeric text-white text-5xl font-semibold mb-1">
              $10
              <span className="text-white/40 text-base font-normal">/mo</span>
            </p>
            <p className="text-sm text-white/50 mb-6">
              Unlimited AI. Cancel anytime.
            </p>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-full bg-helthy-lemon py-3 text-sm font-semibold text-helthy-black hover:opacity-90 transition-opacity mb-7"
            >
              Start free trial
            </Link>
            <ul className="space-y-3">
              {PREMIUM_FEATURES.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-start gap-2.5 text-sm ${
                    i === 0 ? "text-white/55 italic" : "text-white/85"
                  }`}
                >
                  {i === 0 ? (
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Check className="w-4 h-4 mt-0.5 text-helthy-lemon flex-shrink-0" />
                  )}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-white/35 mt-10">
          {/* TODO(user): confirm exact annual pricing once StoreKit is live */}
          Annual plan available with discount · 7-day free trial
        </p>
      </div>
    </section>
  );
}
