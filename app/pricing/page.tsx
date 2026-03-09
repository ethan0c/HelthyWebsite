import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";
import { Check, Sparkles } from "lucide-react";

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

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const freeFeatures = [
  "Workout tracking",
  "Nutrition logging",
  "Barcode scanning",
  "OCR label scanning",
  "Apple Health sync",
  "Progress charts",
  "Streaks & goals",
  "1 voice entry/day",
];

const premiumFeatures = [
  "AI health coach",
  "Photo meal logging",
  "Auto goal adjustment",
  "Dynamic TDEE",
  "Unlimited voice",
  "Ad-free experience",
];

const faqs = [
  {
    question: "Is Helthy really free?",
    answer: "Yes. All core tracking features—workouts, nutrition, barcode scanning, progress charts—are completely free. No trial period, no credit card required.",
  },
  {
    question: "What does Premium add?",
    answer: "Premium unlocks AI-powered features: photo meal recognition, AI health coaching, auto-adjusting goals, dynamic TDEE calculations, and unlimited voice logging.",
  },
  {
    question: "When is Premium launching?",
    answer: "Premium is coming in April 2026. Sign up for our newsletter to be notified when it launches.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Premium is a monthly subscription with no commitment. Cancel anytime directly through the App Store.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-padding pt-36 sm:pt-44 glow-center">
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">Pricing</p>
          <h1 className="font-heading font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white mb-6">
            Free <span className="accent-serif text-helthy-lemon">forever.</span>
          </h1>
          <p className="text-base text-white/35 max-w-xl mx-auto leading-relaxed">
            Everything you need to reach your goals. No subscriptions, no paywalls, no tricks.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">For everyone</p>
              
              <h2 className="font-heading font-semibold text-2xl text-white mb-2">Free</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-heading font-bold text-white">$0</span>
                <span className="text-white/35">/forever</span>
              </div>
              <p className="text-sm text-white/35 mb-6 leading-relaxed">
                All core features. No trial. No credit card.
              </p>

              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-helthy-lemon shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-helthy-lemon text-[#0B0B0B] font-medium text-sm hover:bg-white transition-colors"
              >
                <AppStoreIcon className="w-4 h-4" />
                Download Free
              </a>
            </div>

            {/* Premium Tier */}
            <div className="relative rounded-2xl border border-helthy-lemon/20 bg-helthy-lemon/[0.03] p-6 sm:p-8">
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-helthy-lemon/10 text-helthy-lemon text-[10px] font-medium uppercase tracking-wider">
                Coming April 2026
              </div>
              
              <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">AI-Powered</p>
              
              <h2 className="font-heading font-semibold text-2xl text-white mb-2">Premium</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-heading font-bold text-white">$9</span>
                <span className="text-white/35">/month</span>
              </div>
              <p className="text-sm text-white/35 mb-6 leading-relaxed">
                Everything in Free, plus AI superpowers.
              </p>

              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-helthy-lemon shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="w-full px-6 py-3.5 rounded-full bg-white/[0.06] text-white/40 font-medium text-sm cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
            <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">Our Promise</p>
            <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white">
              Core features stay free <span className="accent-serif text-helthy-lemon">forever.</span>
              <br className="hidden sm:block" />
              Premium is for power users who want AI — the fundamentals never go behind a paywall.
            </h2>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" id="faq">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">FAQ</p>
          <h2 className="font-heading font-semibold text-[clamp(1.375rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.015em] text-white mb-10">
            Common <span className="accent-serif text-helthy-lemon">questions.</span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
