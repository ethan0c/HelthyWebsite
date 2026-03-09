import type { Metadata } from "next";
import SiteFooter from "@/components/sections/SiteFooter";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

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
  { name: "Workout tracking", description: "Log any exercise with sets, reps, and weight" },
  { name: "Nutrition logging", description: "Search 1M+ foods or create custom entries" },
  { name: "Barcode scanning", description: "Instant lookup for packaged foods" },
  { name: "OCR label scanning", description: "Scan nutrition labels directly" },
  { name: "Voice logging", description: "1 free voice entry per day" },
  { name: "Apple Health sync", description: "Automatic data synchronization" },
  { name: "Progress charts", description: "Visualize weight, macros, and trends" },
  { name: "Streaks & goals", description: "Stay motivated with daily streaks" },
];

const premiumFeatures = [
  { name: "AI health coach", description: "Personalized advice and recommendations" },
  { name: "Photo meal logging", description: "AI identifies food from photos" },
  { name: "Auto goal adjustment", description: "Goals adapt to your progress" },
  { name: "Dynamic TDEE", description: "Real-time calorie calculations" },
  { name: "Unlimited voice", description: "No limits on voice logging" },
  { name: "Ad-free experience", description: "Zero interruptions" },
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
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-[#060606] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-helthy-lemon/[0.03] blur-[150px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <Zap className="w-4 h-4 text-helthy-lemon" />
              <span className="text-sm text-white/60 font-medium">Simple, honest pricing</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white mb-6">
              Free forever
            </h1>
            <p className="text-xl sm:text-2xl text-white/40 max-w-2xl mx-auto">
              Everything you need to track your health.
              <br className="hidden sm:block" />
              No subscriptions required.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.06] p-8 lg:p-10 flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center">
                    <Check className="w-6 h-6 text-helthy-lemon" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Free</h2>
                    <p className="text-sm text-white/40">For everyone</p>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-6xl font-heading font-bold text-white tracking-tight">$0</span>
                  <span className="text-lg text-white/30">/forever</span>
                </div>
                <p className="text-white/50">
                  All core features. No trial. No credit card.
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 mb-8">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">What's included</p>
                <ul className="space-y-4">
                  {freeFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-helthy-lemon/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-helthy-lemon" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{feature.name}</p>
                        <p className="text-white/40 text-sm">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-helthy-lemon text-[#0B0B0B] font-semibold text-base hover:bg-white transition-colors"
              >
                <AppStoreIcon className="w-5 h-5" />
                <span>Download Free</span>
              </a>
            </div>

            {/* Premium Tier */}
            <div className="relative rounded-3xl bg-gradient-to-b from-helthy-lemon/10 to-helthy-lemon/[0.02] border border-helthy-lemon/20 p-8 lg:p-10 flex flex-col">
              {/* Coming soon badge */}
              <div className="absolute -top-4 right-8 px-4 py-2 rounded-full bg-helthy-lemon text-[#0B0B0B] text-sm font-semibold">
                Coming April 2026
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-helthy-lemon/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-helthy-lemon" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Premium</h2>
                    <p className="text-sm text-white/40">AI-powered</p>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-6xl font-heading font-bold text-white tracking-tight">$9</span>
                  <span className="text-lg text-white/30">/month</span>
                </div>
                <p className="text-white/50">
                  Everything in Free, plus AI superpowers.
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 mb-8">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">Everything in Free, plus</p>
                <ul className="space-y-4">
                  {premiumFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-helthy-lemon/20 flex items-center justify-center mt-0.5 shrink-0">
                        <Sparkles className="w-3 h-3 text-helthy-lemon" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{feature.name}</p>
                        <p className="text-white/40 text-sm">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                disabled
                className="w-full px-6 py-4 rounded-full bg-white/10 text-white/50 font-semibold text-base cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Banner */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-helthy-lemon/10 via-helthy-lemon/5 to-transparent border border-helthy-lemon/20 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 tracking-[-0.02em]">
                  No surprise fees.
                  <br />
                  <span className="text-helthy-lemon">Ever.</span>
                </h2>
                <p className="text-white/50 text-lg leading-relaxed">
                  Helthy will never gate core tracking features behind a paywall. 
                  Premium is for power users who want AI — the fundamentals stay free forever.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-helthy-lemon text-[#0B0B0B] font-semibold hover:bg-white transition-colors"
                >
                  <AppStoreIcon className="w-5 h-5" />
                  Get Started Free
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white/60 hover:text-white transition-colors group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-[#060606]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              FAQ
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em]">
              Common questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6"
              >
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-white/50 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
