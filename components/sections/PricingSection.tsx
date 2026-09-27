"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Segmented from "@/components/ui/Segmented";

function openQROrStore(e: React.MouseEvent) {
  if (window.matchMedia("(pointer: fine)").matches) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("helthy:qr-open"));
  }
  // On touch devices, href="/download" navigates to the store picker page.
}

const PREMIUM_FEATURES = [
  "Unlimited AI photo & voice meal logging",
  "Unlimited AI Coach",
  "AI-generated workout routines",
  "Full analytics, trends & all-time history",
];

const FREE_FEATURES = [
  "Unlimited manual food & workout logging",
  "Calories, macros & nutrition tracking",
  "Apple Health sync",
  "1,500 exercises & basic progress history",
];

const BILLING_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const;

type Billing = (typeof BILLING_OPTIONS)[number]["value"];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [billing, setBilling] = useState<Billing>("yearly");
  const isYearly = billing === "yearly";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 70%" };
      gsap.from("[data-price-head]", {
        opacity: 0, y: 20, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-card]", {
        opacity: 0, y: 30, duration: 0.9, delay: 0.35, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from("[data-price-free]", {
        opacity: 0, y: 10, duration: 0.5, delay: 0.65, ease: "power3.out", scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="theme-light section">
      <div className="container-page">
        <div data-price-head>
          <SectionHeading
            title="Fair pricing."
            italicTail="No games"
            subtitle="One plan unlocks everything. Lock in your founder's price today and keep it for life. The free tier is actually free — forever."
          />
        </div>

        {/* Free + Pro cards, side by side */}
        <div className="mx-auto grid max-w-[920px] grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Free card */}
          <div data-price-card className="card flex flex-col p-8 md:p-10">
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-3">
              <h3 className="text-title">Helthy Free</h3>
              <span className="badge">Free forever</span>
            </div>

            <div className="mt-8 min-h-[104px]">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-numeric text-[52px] leading-none text-fg sm:text-[64px]">
                  $0
                </span>
                <span className="text-[15px] text-fg-subtle">/forever</span>
              </div>
              <p className="mt-3 text-[14px] font-medium text-fg-muted">
                No card · No trial · No catch
              </p>
            </div>

            <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
              {FREE_FEATURES.map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-fg-muted"
                    strokeWidth={2.25}
                  />
                  <span className="text-[15px] leading-6 text-fg-muted">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Link href="/download" onClick={openQROrStore} className="btn-secondary w-full">
                Start free
              </Link>
            </div>
          </div>

          {/* Pro card */}
          <div data-price-card className="card card-accent flex flex-col p-8 md:p-10">
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-title">Helthy Pro</h3>
                <span className="badge badge-accent">Founders special</span>
              </div>
              <Segmented
                label="Billing period"
                options={BILLING_OPTIONS}
                value={billing}
                onChange={setBilling}
              />
            </div>

            <div className="mt-8 min-h-[104px]">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <RollingPrice
                  price={isYearly ? 24.99 : 4.99}
                  className="text-numeric text-[52px] leading-none text-fg sm:text-[64px]"
                />
                <RollingPrice
                  price={isYearly ? 69.99 : 9.99}
                  className="text-numeric text-[24px] leading-none text-fg-subtle line-through"
                />
                <span className="text-[15px] text-fg-subtle">{isYearly ? "/year" : "/mo"}</span>
              </div>
              <p className="mt-3 text-[14px] font-medium text-accent-ink">
                {isYearly
                  ? "That's just $2.08 a month · Price locked in for life"
                  : "Cancel anytime · Price locked in for life"}
              </p>
            </div>

            <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
              {PREMIUM_FEATURES.map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-accent-ink"
                    strokeWidth={2.25}
                  />
                  <span className="text-[15px] leading-6 text-fg">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Link href="/download" onClick={openQROrStore} className="btn-accent w-full">
                Get Helthy Pro
              </Link>
            </div>
          </div>
        </div>

        {/* Reassurance line */}
        <p data-price-free className="mt-10 text-center text-[14px] text-fg-muted">
          Start free, forever — no card needed. Upgrade to Pro anytime.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// RollingPrice — digits roll between values when the billing
// toggle flips, instead of snapping.

function RollingPrice({ price, className }: { price: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(price);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown.current === price) return;
    const obj = { v: shown.current };
    shown.current = price;
    const tween = gsap.to(obj, {
      v: price,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `$${obj.v.toFixed(2)}`;
      },
    });
    return () => {
      tween.kill();
      el.textContent = `$${price.toFixed(2)}`;
    };
  }, [price]);

  return (
    <span ref={ref} className={className}>
      {`$${price.toFixed(2)}`}
    </span>
  );
}
