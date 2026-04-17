"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes — calorie logging, workouts, TDEE, and form tips are unlimited and free forever. Premium ($10/mo or $83/yr — save 30%) unlocks unlimited AI photo & voice logging, the AI coach, generated routines, full analytics, and all-time history.",
  },
  {
    q: "How accurate is the AI photo logging?",
    a: "Helthy uses a vision model trained on millions of meals plus the USDA and Open Food Facts databases. For most common meals it's within 5–10% of a hand-logged entry. You can always tap to adjust before saving.",
  },
  {
    q: "Does it sync with Apple Health & Google Health Connect?",
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
    q: "Is Helthy on Android?",
    a: "Android drops April 28 alongside our v2 launch. iOS is live on the App Store today. Add your email anywhere on this page and we'll send you the Play Store link the moment it's live.",
  },
  {
    q: "Can I cancel Premium?",
    a: "Anytime. Manage your subscription in Settings → Subscription, or directly through the App Store. Cancel and you keep Free forever.",
  },
  {
    q: "Does it work offline?",
    a: "Logging meals, workouts, and weight works fully offline. Your data syncs automatically when you're back online. AI features need a connection.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-faq-card]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: { each: 0.08, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-faq-grid]",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative section-padding section-glow-cyan"
    >
      <div className="container-page">
        <SectionHeading title="Questions, answered" trailingPunctuation="" />

        {/* 4 columns × 2 rows */}
        <div
          data-faq-grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              data-faq-card
              className="card-helthy p-5 sm:p-7 flex flex-col transition-colors duration-300 hover:bg-white/[0.04]"
              style={{ minHeight: "auto" }}
            >
              {/* Big numeric */}
              <span
                className="text-numeric text-white/10 leading-none mb-4 sm:mb-5 select-none text-[56px] sm:text-[72px] lg:text-[84px]"
                style={{ letterSpacing: -4 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[17px] font-medium text-white mb-3 tracking-tight leading-snug">
                {faq.q}
              </h3>
              <p className="text-[13px] text-white/65 leading-relaxed font-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
