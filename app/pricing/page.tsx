import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";

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
      <section className="section-padding pt-36 sm:pt-44">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <p className="text-eyebrow mb-3">Pricing</p>
          <h1 className="text-display-xl mb-4">
            Free forever.
            <br />
            <span className="text-helthy-lemon">Premium when you want more.</span>
          </h1>
          <p className="text-body-lg max-w-xl mx-auto mb-16">
            Everything you need to track your health is free. Premium unlocks
            AI-powered features for those who want the edge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
            {/* Free Tier */}
            <div className="glass-card p-8 sm:p-10 flex flex-col">
              <div className="mb-8">
                <p className="text-xs font-mono tracking-wider uppercase text-white/40 mb-2">
                  Free
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-mono font-medium text-white">
                    $0
                  </span>
                  <span className="text-white/40">/forever</span>
                </div>
                <p className="text-sm text-white/50">
                  All core features. No trial. No credit card.
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-helthy-lemon mt-0.5">✓</span>
                    <span className="text-white/70">{f}</span>
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
            <div className="relative glass-card p-8 sm:p-10 flex flex-col border-helthy-lemon/20">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-helthy-lemon text-helthy-black text-xs font-medium">
                Coming April 2026
              </div>
              <div className="mb-8">
                <p className="text-xs font-mono tracking-wider uppercase text-helthy-lemon/60 mb-2">
                  Premium
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-mono font-medium text-white">
                    TBD
                  </span>
                  <span className="text-white/40">/month</span>
                </div>
                <p className="text-sm text-white/50">
                  Everything in Free, plus AI-powered superpowers.
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                <li className="text-xs text-white/30 font-mono tracking-wider uppercase mb-1">
                  Everything in Free, plus:
                </li>
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-helthy-lemon mt-0.5">★</span>
                    <span className="text-white/70">{f}</span>
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

      {/* FAQ mini */}
      <section className="section-padding">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
          <h2 className="text-display-md text-white mb-3">
            No surprise fees. Ever.
          </h2>
          <p className="text-body-lg">
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
