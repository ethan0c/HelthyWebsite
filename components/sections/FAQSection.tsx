"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "Is Helthy really free?",
    a: "Yes — calorie logging, workouts, TDEE, and form tips are unlimited and free forever. Helthy Premium ($4.99/mo or $24.99/yr) unlocks unlimited AI photo & voice logging, the AI coach, generated routines, full analytics, and all-time history.",
  },
  {
    q: "How accurate is the AI photo logging?",
    a: "Helthy's AI identifies each item on your plate, estimates portions and matches them to its food database. You see every item before saving and can adjust anything.",
  },
  {
    q: "Is my data private?",
    a: "Your data is yours. We never sell it or use it to train AI models. You can delete your account from inside the app at any time, and Premium members can export their data.",
  },
  {
    q: "Is Helthy on Android?",
    a: "Yes — Helthy is live on Google Play, with the same logging, AI and Premium features. The Apple Watch app and home-screen widgets are iOS only.",
  },
  {
    q: "Can I cancel Helthy Premium?",
    a: "Anytime. Manage your subscription in Settings → Subscription, or directly through the App Store or Google Play. Cancel and you keep Free forever.",
  },
  {
    q: "Does it work on Apple Watch?",
    a: "Yes. Track runs, walks, rides and HIIT with heart rate and calories, and log meals by voice from your wrist. With Premium, the watch also follows your strength workout so you can complete sets and start rests.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-faq-card]", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: { each: 0.05, from: "start" },
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
    <section ref={sectionRef} id="faq" className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading title="Questions, answered" align="left" className="lg:mb-0" />
        </div>

        <div data-faq-grid className="divide-y divide-line border-y border-line">
          {FAQS.map((faq) => (
            <details key={faq.q} data-faq-card className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-lg leading-none text-fg-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-7 text-fg-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
