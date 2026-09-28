"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { handleDownloadClick } from "@/lib/download";
import { PRO_PRICE } from "@/lib/site";
import Segmented from "@/components/ui/Segmented";

/** Free vs Pro cards with the monthly/yearly toggle. Used on /pricing. */

const FREE_FEATURES = [
  "Unlimited food and workout logging",
  "Calories, macros and personal records",
  "2 AI scans a week",
  "Apple Health and Health Connect sync",
];

const PRO_FEATURES = [
  "Unlimited AI photo and voice logging",
  "Unlimited AI coach chat",
  "AI-built workout routines",
  "Full history, trends and back issues of Helthy Weekly",
];

// Pre-founder list prices, shown struck through next to the founders price
const LIST_PRICE = { monthly: 9.99, yearly: 69.99 };

const BILLING_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const;

type Billing = (typeof BILLING_OPTIONS)[number]["value"];

export default function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const isYearly = billing === "yearly";
  const perMonth = (PRO_PRICE.yearly / 12).toFixed(2);

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <Segmented label="Billing period" options={BILLING_OPTIONS} value={billing} onChange={setBilling} />
      </div>

      <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-4 md:grid-cols-2">
        <PlanCard
          name="Free"
          blurb="Everything you need to track."
          price={<span className="text-numeric text-[44px] leading-none text-fg">$0</span>}
          period="forever"
          note="No card, no trial"
          cta={{ label: "Start free", className: "btn-secondary" }}
          features={FREE_FEATURES}
        />
        <PlanCard
          accent
          name="Pro"
          badge="Founders price"
          blurb="The AI coach and unlimited AI logging."
          price={
            <>
              <RollingPrice
                price={isYearly ? PRO_PRICE.yearly : PRO_PRICE.monthly}
                className="text-numeric text-[44px] leading-none text-fg"
              />
              <RollingPrice
                price={isYearly ? LIST_PRICE.yearly : LIST_PRICE.monthly}
                className="text-numeric text-[18px] leading-none text-fg-subtle line-through"
              />
            </>
          }
          period={isYearly ? "year" : "month"}
          note={isYearly ? `$${perMonth} a month, locked in for life` : "Cancel anytime, locked in for life"}
          cta={{ label: "Get Pro", className: "btn-accent" }}
          featuresLead="Everything in Free, plus"
          features={PRO_FEATURES}
        />
      </div>
    </div>
  );
}

function PlanCard({
  name,
  badge,
  blurb,
  price,
  period,
  note,
  cta,
  featuresLead,
  features,
  accent = false,
}: {
  name: string;
  badge?: string;
  blurb: string;
  price: React.ReactNode;
  period: string;
  note: string;
  cta: { label: string; className: string };
  featuresLead?: string;
  features: string[];
  accent?: boolean;
}) {
  return (
    <div className={`card flex flex-col p-6 md:p-7 ${accent ? "card-accent" : ""}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-title">Helthy {name}</h2>
        {badge && <span className="badge badge-accent">{badge}</span>}
      </div>
      <p className="mt-1 text-[14px] text-fg-subtle">{blurb}</p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {price}
        <span className="text-[14px] text-fg-subtle">/{period}</span>
      </div>
      <p className={`mt-2 text-[13px] font-medium ${accent ? "text-accent-ink" : "text-fg-muted"}`}>{note}</p>

      <Link href="/download" onClick={handleDownloadClick} className={`${cta.className} mt-6 w-full`}>
        {cta.label}
      </Link>

      <div className="mt-6 border-t border-line pt-5">
        {featuresLead && <p className="mb-3 text-[13px] font-medium text-fg-subtle">{featuresLead}</p>}
        <ul className="grid gap-2.5">
          {features.map((label) => (
            <li key={label} className="flex items-start gap-2.5 text-[14.5px] leading-6 text-fg-muted">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-fg" strokeWidth={2.25} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Digits roll between values when the billing toggle flips, instead of snapping. */
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
