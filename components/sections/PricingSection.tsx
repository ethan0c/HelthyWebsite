"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Sparkles, Brain, MessageCircle, LineChart } from "lucide-react";
import HelthyMark from "@/components/ui/HelthyMark";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

// ── Theme tokens pulled directly from helthy_app/mobile/context/ThemeContext ──
const LEMON = "#CDFB50"; // theme.primary
const BUTTON_TEXT = "#151515"; // theme.buttonText
const CARD = "#2A2A2A"; // theme.card
const BORDER = "#2E2E30"; // theme.border
const TEXT_SECONDARY = "#9CA3AF"; // theme.textSecondary
const ORANGE = "#E96C2C"; // theme.accent — used only for section background wash

// Matches PaywallContent.ALL_FEATURES (translation keys omitted).
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
      {/* grid background (copy-area backdrop) */}
      <div className="absolute inset-0 geo-grid pointer-events-none" aria-hidden="true" />

      {/* orange gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 25%, ${ORANGE}22 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background: `linear-gradient(180deg, ${ORANGE}0D 0%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-md">
        {/* Hero — mirrors PaywallContent.heroSection */}
        <div className="text-center mb-8">
          {/* HelthyMark (52px, matching paywall) */}
          <div className="flex justify-center mb-3.5">
            <HelthyMark size={52} />
          </div>

          {/* Hero title — matches site-wide display headings */}
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Go{" "}
            <span className="text-italics text-helthy-lemon">Premium</span>.
          </h2>

          {/* Hero subtitle — 14/20 regular, mt 4 */}
          <p
            className="text-center mt-1"
            style={{
              fontSize: 14,
              lineHeight: "20px",
              color: TEXT_SECONDARY,
              fontWeight: 400,
            }}
          >
            Unlock unlimited AI. Cancel anytime.
          </p>
        </div>

        {/* Plan cards — mirrors styles.planCardsColumn (gap: SPACING.sm = 8) */}
        <div data-price-card className="mb-5" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <PlanCard
            plan="yearly"
            label="Yearly"
            price="$83"
            period="/yr"
            badge={{ text: "BEST VALUE", kind: "primary" }}
            selected={selected === "yearly"}
            onSelect={() => setSelected("yearly")}
          />
          <PlanCard
            plan="monthly"
            label="Monthly"
            price="$10"
            period="/mo"
            selected={selected === "monthly"}
            onSelect={() => setSelected("monthly")}
          />
        </div>

        {/* Feature list — mirrors styles.featureList + styles.featureRow */}
        <div data-price-card className="mb-5" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center"
              style={{ gap: 12, paddingTop: 8, paddingBottom: 8 }}
            >
              <Icon
                className="flex-shrink-0"
                style={{ width: 20, height: 20, color: LEMON }}
                strokeWidth={1.75}
              />
              <span
                className="text-white"
                style={{ fontSize: 17, lineHeight: "24px", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA — mirrors styles.ctaButton */}
        <div data-price-card>
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-full transition-opacity hover:opacity-90"
            style={{
              background: LEMON,
              color: BUTTON_TEXT,
              minHeight: 48,
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 24,
              paddingRight: 24,
              fontSize: 16,
              fontWeight: 500,
              boxShadow: `0 16px 40px -12px ${LEMON}66`,
            }}
          >
            Start free trial
          </Link>

          {/* Restore — mirrors styles.restoreButton */}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center hover:text-white transition-colors"
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              fontSize: 13,
              color: TEXT_SECONDARY,
              fontWeight: 400,
            }}
          >
            Restore purchases
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Mirrors PaywallContent plan card (styles.planCard + styles.planCardLeft + styles.planRadio). */
function PlanCard({
  label,
  price,
  period,
  badge,
  selected,
  onSelect,
}: {
  plan: "yearly" | "monthly";
  label: string;
  price: string;
  period: string;
  badge?: { text: string; kind: "primary" };
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center justify-between overflow-hidden transition-transform"
      style={{
        // BORDER_RADIUS.xl = 20
        borderRadius: 20,
        // Padding: SPACING.lg × SPACING.lg = 16 × 16
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: CARD,
        borderWidth: selected ? 2 : 1,
        borderStyle: "solid",
        borderColor: selected ? LEMON : BORDER,
        // Spring scale effect (0.97 unselected → 1 selected)
        transform: selected ? "scale(1)" : "scale(0.97)",
      }}
    >
      {/* Left side: radio + label */}
      <div className="flex items-center" style={{ gap: 12 }}>
        {/* Radio — 22x22, border 2, inner 12x12 */}
        <span
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: selected ? LEMON : BORDER,
          }}
        >
          {selected && (
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: LEMON,
              }}
            />
          )}
        </span>

        {/* Label row — planLabelRow (gap SPACING.sm = 8) */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            className="text-white"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            {label}
          </span>
          {badge && (
            <span
              className="uppercase"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 0.3,
                // BORDER_RADIUS.full
                borderRadius: 999,
                // paddingH 8, paddingV 3
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 3,
                paddingBottom: 3,
                borderWidth: 1,
                borderStyle: "solid",
                backgroundColor: `${LEMON}26`, // primary + 15 (≈8% → slightly stronger for web legibility)
                borderColor: `${LEMON}66`, // primary + 40
                color: LEMON,
              }}
            >
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {/* Price — 22, Unbounded (numeric font), letterSpacing -0.5 */}
      <span
        className="text-numeric text-white"
        style={{ fontSize: 22, letterSpacing: -0.5, fontWeight: 400 }}
      >
        {price}
        <span style={{ color: TEXT_SECONDARY, fontSize: 14, fontWeight: 400 }}>
          {period}
        </span>
      </span>
    </button>
  );
}
