"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes — calorie logging, workouts, TDEE, and form tips are unlimited and free forever. Helthy Pro ($4.99/mo or $24.99/yr) unlocks unlimited AI photo & voice logging, the AI coach, generated routines, full analytics, and all-time history.",
  },
  {
    q: "How accurate is the AI photo logging?",
    a: "Helthy uses Claude's vision model to identify each item, then checks the nutrition against the food database and your own logging history. You see every item before saving and can adjust anything.",
  },
  {
    q: "Does it sync with Apple Health?",
    a: "Yes, on every plan. Helthy reads your steps, weight, workouts, active energy and heart rate (used to estimate workout calories) from Apple Health, and writes your weigh-ins, workouts and meals back.",
  },
  {
    q: "Is my data private?",
    a: "Your data is yours. We never sell it or use it to train AI models. You can delete your account from inside the app at any time, and Pro members can export their data.",
  },
  {
    q: "What's the AI coach actually like?",
    a: "It has full context on your goals, recent meals, lifts, steps, and weight trend. So it can answer questions like \"should I push squats today?\" with your actual numbers, not generic advice.",
  },
  {
    q: "Is Helthy on Android?",
    a: "Yes — Helthy is live on Google Play, with the same logging, AI and Pro features. The Apple Watch app and home-screen widgets are iOS only.",
  },
  {
    q: "Can I cancel Helthy Pro?",
    a: "Anytime. Manage your subscription in Settings → Subscription, or directly through the App Store or Google Play. Cancel and you keep Free forever.",
  },
  {
    q: "Does it work on Apple Watch?",
    a: "Yes. Track runs, walks, rides and HIIT with heart rate and calories, and log meals by voice from your wrist. With Pro, the watch also follows your strength workout so you can complete sets and start rests.",
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
              className="card-helthy card-helthy-hover p-5 sm:p-7 flex flex-col"
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
