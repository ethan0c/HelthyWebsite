"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Helthy really free?",
    a: "Yes. Workout tracking, nutrition logging, barcode scanning, OCR label scanning, progress charts, streaks, health sync, and more are completely free — forever. No ads, no trials, no paywalls on core features.",
  },
  {
    q: "What does Helthy Premium include?",
    a: "Premium adds AI-powered features: an AI health coach, photo meal logging, auto goal adjustment, dynamic TDEE calculations, unlimited voice logging, custom layouts, and an ad-free experience. Coming April 2026.",
  },
  {
    q: "What platforms is Helthy on?",
    a: "Helthy is available on iOS, Android, and Apple Watch. All platforms sync together so your data is always up to date.",
  },
  {
    q: "How does food logging work?",
    a: "Multiple ways: barcode scanning, OCR label scanning, voice logging, manual search from our 1M+ food database, or quick add by calories/macros. Premium users can also snap a photo of their meal.",
  },
  {
    q: "Can I import data from other apps?",
    a: "Helthy syncs with Apple Health and Google Fit. Steps, active energy, workouts, and more flow in automatically.",
  },
  {
    q: "Is my data private?",
    a: "Your health data is yours. We don't sell it, we don't share it with advertisers, and you can export or delete it at any time.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Smooth title reveal
      gsap.from("[data-faq-title]", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Stagger FAQ items
      gsap.from("[data-faq-item]", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section ref={sectionRef} className="relative section-padding hatch-bg">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div data-faq-title className="mb-12 sm:mb-16">
          <h2 className="text-display-md text-white">
            Questions.
          </h2>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {faqs.map((faq, i) => (
            <div key={i} data-faq-item>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left
                  hover:opacity-80 transition-all duration-500 cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <span className="text-base sm:text-lg font-medium text-white pr-6">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60" : "max-h-0"
                }`}
              >
                <p className="pb-6 text-sm sm:text-[15px] text-white/40 leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
