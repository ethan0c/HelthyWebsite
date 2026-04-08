import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/sections/SiteFooter";
import {
  Sparkles,
  MessageCircle,
  Brain,
  LineChart,
  Check,
} from "lucide-react";

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

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// Hero AI features — mirrors mobile paywall's 4-feature list
const heroFeatures = [
  { icon: Sparkles, label: "AI Photo Meal Logging" },
  { icon: MessageCircle, label: "AI Health Coach" },
  { icon: Brain, label: "Smart Insights & Auto Goals" },
  { icon: LineChart, label: "Advanced Reports & Trends" },
];

// Free tier features — what you get for $0
const freeFeatures = [
  "Workout & nutrition tracking",
  "Barcode + OCR label scanning",
  "Apple Health & Google Fit sync",
  "Progress charts, streaks & goals",
  "1 voice entry per day",
  "iOS, Android & Apple Watch",
];

const faqs = [
  {
    q: "Is Helthy really free?",
    a: "Yes. All core tracking features—workouts, nutrition, barcode scanning, OCR, Apple Health sync, progress charts—are completely free. No trial, no credit card required.",
  },
  {
    q: "What does Premium add?",
    a: "Premium unlocks AI: photo meal recognition, AI health coaching, auto-adjusting goals, dynamic TDEE, unlimited voice logging, and an ad-free experience.",
  },
  {
    q: "When is Premium launching?",
    a: "Premium ships April 2026. Sign up for our newsletter to be the first to know.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Premium will be a monthly subscription with no commitment. Cancel anytime directly through the App Store.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ── Hero + Plan Cards ─────────────────────────────────────
          Mirrors the mobile paywall: diagonal lemon→dark gradient,
          radial glow at top, centered hero copy, vertically stacked
          plan cards, hero feature list, primary CTA.
      */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Diagonal gradient base — same direction & stops as mobile */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(205,251,80,0.18) 0%, #171717 45%, #060606 100%)",
          }}
        />
        {/* Radial bloom from top-left */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 15%, rgba(205,251,80,0.22) 0%, transparent 60%)",
          }}
        />
        {/* Subtle dot grid texture */}
        <div className="absolute inset-0 -z-10 dot-grid opacity-30" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          {/* Hero copy */}
          <div className="text-center mb-14">
            <span className="text-eyebrow mb-5 inline-block">Pricing</span>
            <h1 className="text-display-xl text-white mb-5">
              <span className="text-italics">Free</span> forever.
              <br />
              <span className="text-helthy-lemon">Premium</span> when you want it.
            </h1>
            <p className="text-base text-white/60 max-w-xl mx-auto leading-relaxed">
              Every core feature is free. No trial, no credit card, no
              paywall on the basics. Premium adds AI on top —{" "}
              <span className="text-white/85">launching April 2026.</span>
            </p>
          </div>

          {/* ── Stacked plan cards ──────────────────────────── */}
          <div className="space-y-4 mb-14">
            {/* FREE plan card — selected styling, primary CTA */}
            <div className="relative rounded-3xl border-2 border-helthy-lemon/40 bg-helthy-lemon/[0.04] p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-start gap-5">
                {/* Radio dot — matches mobile paywall */}
                <div
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-helthy-lemon"
                >
                  <div className="h-3 w-3 rounded-full bg-helthy-lemon" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div>
                      <h2 className="text-xl font-semibold text-white leading-tight">
                        Free
                      </h2>
                      <p className="text-sm text-white/50 mt-0.5">
                        Everything you need to start
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-numeric text-2xl text-white">$0</div>
                      <div className="text-xs text-white/40">forever</div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {freeFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-white/75"
                  >
                    <Check className="h-4 w-4 text-helthy-lemon shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-helthy-lemon px-7 py-3.5 text-[#0B0B0B] text-sm font-semibold transition-all hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(205,251,80,0.3)]"
              >
                <AppStoreIcon className="h-4 w-4" />
                Download Free
              </Link>
            </div>

            {/* PREMIUM plan card — coming soon */}
            <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm">
              {/* "Coming soon" badge — top right, paywall-style */}
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-helthy-accent-orange/15 border border-helthy-accent-orange/30 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-helthy-accent-orange">
                  <Sparkles className="h-3 w-3" />
                  April 2026
                </span>
              </div>

              <div className="flex items-start gap-5">
                {/* Empty radio dot */}
                <div
                  aria-hidden="true"
                  className="mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-white/20"
                />

                <div className="flex-1 min-w-0">
                  <div className="mb-1 mt-0.5">
                    <h2 className="text-xl font-semibold text-white leading-tight">
                      Premium
                    </h2>
                    <p className="text-sm text-white/50 mt-0.5">
                      AI superpowers on top of free
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero AI features list — mirrors mobile paywall */}
              <ul className="mt-6 space-y-3.5">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3.5 text-[15px] text-white/85"
                  >
                    <Icon className="h-5 w-5 text-helthy-lemon shrink-0" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing line — uses .text-numeric per canon */}
              <div className="mt-7 flex items-baseline gap-1.5">
                <span className="text-numeric text-3xl text-white">$9</span>
                <span className="text-sm text-white/40">/ month</span>
                <span className="ml-2 text-xs text-white/35">
                  · cancel anytime
                </span>
              </div>

              <button
                disabled
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/40 cursor-not-allowed"
              >
                Coming April 2026
              </button>
            </div>
          </div>

          {/* Restore-purchases-style link — mirrors mobile paywall footer */}
          <p className="text-center text-xs text-white/35">
            Already have Helthy?{" "}
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              Restore from the App Store
            </Link>
          </p>
        </div>
      </section>

      {/* ── Promise ────────────────────────────────────────────── */}
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-12 text-center">
            <span className="text-eyebrow mb-5 inline-block">Our Promise</span>
            <h2 className="text-display-md text-white">
              We will{" "}
              <span className="text-italics text-helthy-lemon">never</span>{" "}
              paywall barcode scanning, OCR, voice logging, or Apple Health
              sync.
              <br className="hidden sm:block" />
              Premium is AI on top — never a gate in front.
            </h2>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="section-padding pt-0" id="faq">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-eyebrow mb-5 inline-block">FAQ</span>
            <h2 className="text-display-md text-white">
              <span className="text-italics">Common</span> questions.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.12]"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
