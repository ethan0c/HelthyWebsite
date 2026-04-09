"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes — calorie logging, workouts, TDEE, and form tips are unlimited and free forever. Premium ($10/mo) unlocks unlimited AI photo & voice logging, the AI coach, generated routines, full analytics, and all-time history.",
  },
  {
    q: "How accurate is the AI photo logging?",
    a: "Helthy uses a vision model trained on millions of meals plus the USDA and Open Food Facts databases. For most common meals it's within 5–10% of a hand-logged entry. You can always tap to adjust before saving.",
  },
  {
    q: "Does it sync with Apple Health and Google Fit?",
    a: "Yes. Free users get steps and weight sync. Premium users get full two-way sync — heart rate, workouts, active energy, and nutrition data flow both directions.",
  },
  {
    q: "Is my data private?",
    a: "Your data is yours. We never sell it, never use it to train AI models, and you can export or delete everything from inside the app at any time.",
  },
  {
    q: "What's the AI coach actually like?",
    a: "It's powered by Claude and has full context on your goals, recent meals, lifts, sleep, and weight trend. So it can answer questions like \"should I push squats today?\" with your actual numbers, not generic advice.",
  },
  {
    q: "Android?",
    a: "iOS is live now. Android is on the roadmap — join the waitlist on the homepage to be notified.",
  },
  {
    q: "Can I cancel Premium?",
    a: "Anytime. Manage your subscription in Settings → Subscription, or directly through the App Store. Cancel and you keep Free forever.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative section-padding px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-eyebrow mb-4">FAQ</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight">
            Questions, <span className="text-italics text-helthy-lemon">answered</span>.
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {FAQS.map((faq) => (
            <Accordion.Item
              key={faq.q}
              value={faq.q}
              className="card-helthy overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-[15px] font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/50 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                <div className="px-6 pb-6 text-sm text-white/65 leading-relaxed font-light">
                  {faq.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
