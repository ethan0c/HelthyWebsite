import Link from "next/link";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRO_PRICE } from "@/lib/site";

const FREE = ["Unlimited food and workout logging", "Calories, macros and PRs", "2 AI scans a week"];
const PRO = ["Unlimited AI scans and voice logging", "The AI coach and AI-built routines", "Full history and every Weekly issue"];

/**
 * Homepage pricing: the free-forever message and what Premium adds, with no
 * plan cards (none of the six competitors price on the homepage; app stores
 * charge in local currency). The full comparison lives on /pricing.
 * Keeps id="pricing" so /?section=pricing links still land here.
 */
export default function PricingStrip() {
  return (
    <section id="pricing" className="section">
      <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Free"
          italicTail="forever"
          subtitle={`Tracking never costs a thing. Premium adds the AI, from $${PRO_PRICE.monthly} a month.`}
          align="left"
          className="mb-0 md:mb-0"
        />

        <div className="card p-6 md:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <PlanList title="Free" items={FREE} />
            <PlanList title="Premium adds" items={PRO} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-[14px] text-fg-muted">
              Pro is <span className="text-fg">${PRO_PRICE.monthly}/month</span> or{" "}
              <span className="text-fg">${PRO_PRICE.yearly}/year</span>
            </p>
            <Link href="/pricing" className="btn-secondary btn-sm">
              Compare plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-title">{title}</h3>
      <ul className="mt-3 grid gap-2.5">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] leading-6 text-fg-muted">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-fg" strokeWidth={2.25} />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
