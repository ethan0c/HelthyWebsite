import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";
import { Check, Sparkles, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing – Helthy",
  description:
    "Helthy is free forever. Core features cost nothing. Helthy Premium adds AI coaching, photo meal logging, and more.",
  openGraph: {
    title: "Pricing – Helthy",
    description:
      "Helthy is free forever. Premium adds AI coaching, photo meal logging, and more.",
    url: "https://helthy.app/pricing",
  },
};

const freeFeatures = [
  "Workout tracking",
  "Nutrition logging",
  "Barcode scanning",
  "OCR label scanning",
  "Voice logging (1/day)",
  "Apple Health & Google Fit sync",
  "Progress charts & analytics",
  "Streaks & goals",
  "Global exercise routines",
  "7 themes",
  "Step tracking",
  "Share cards",
];

const premiumFeatures = [
  "AI health coach",
  "Photo meal logging",
  "Auto goal adjustment",
  "Dynamic TDEE engine",
  "Helthy AI assistant",
  "Custom layouts",
  "Unlimited voice logging",
  "Ad-free experience",
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-padding pt-36 sm:pt-44 glow-top">
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <span className="pill-badge mb-5">Pricing</span>
          <h1 className="font-heading font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white mb-5">
            Free forever.
            <br />
            <span className="accent-serif text-helthy-lemon">Premium when you want more.</span>
          </h1>
          <p className="text-base text-white/35 max-w-xl mx-auto mb-16 leading-relaxed">
            Everything you need to track your health is free. Premium unlocks
            AI-powered features for those who want the edge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
            {/* Free Tier */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-helthy-lemon" />
                  </div>
                  <span className="text-sm font-medium text-white/60">Free</span>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-5xl font-mono font-medium text-white">
                    $0
                  </span>
                  <span className="text-sm font-mono text-white/30">/forever</span>
                </div>
                <p className="text-sm text-white/35">
                  All core features. No trial. No credit card.
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-helthy-lemon mt-0.5 shrink-0" />
                    <span className="text-white/50">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.apple.com/app/helthy/id6738965498"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 text-center block"
              >
                Download Free
              </a>
            </div>

            {/* Premium Tier */}
            <div className="relative rounded-2xl border border-helthy-lemon/20 bg-white/[0.02] p-8 sm:p-10 flex flex-col">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-helthy-lemon text-helthy-black text-xs font-medium">
                Coming April 2026
              </div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-helthy-lemon/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-helthy-lemon" />
                  </div>
                  <span className="text-sm font-medium text-white/60">Premium</span>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-5xl font-mono font-medium text-white">
                    $9.25
                  </span>
                  <span className="text-sm font-mono text-white/30">/month</span>
                </div>
                <p className="text-sm text-white/35">
                  Everything in Free, plus AI-powered superpowers.
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                <li className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-1">
                  Everything in Free, plus:
                </li>
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Star className="w-4 h-4 text-helthy-lemon mt-0.5 shrink-0 fill-helthy-lemon" />
                    <span className="text-white/50">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="btn-secondary mt-8 text-center block opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom reassurance */}
      <section className="relative section-padding dot-grid">
        <div className="relative z-10 mx-auto max-w-2xl px-5 sm:px-8 text-center">
          <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white mb-4">
            No surprise fees. <span className="accent-serif text-helthy-lemon">Ever.</span>
          </h2>
          <p className="text-base text-white/35 leading-relaxed">
            Helthy will never gate core tracking features behind a paywall.
            Premium is for power users who want AI — the fundamentals are free
            forever.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
