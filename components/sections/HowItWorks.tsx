"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Download,
    number: "01",
    title: "Download free",
    desc: "Available on iOS, Android, and Apple Watch. No account needed to explore.",
  },
  {
    icon: Target,
    number: "02",
    title: "Set your goals",
    desc: "Quick onboarding: height, weight, activity level, calorie & macro targets — done in 2 minutes.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Track everything",
    desc: "Log meals with barcode, voice, or search. Track workouts with our exercise library. Watch your progress.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-eyebrow mb-3">Get started</p>
          <h2 className="text-display-lg">
            Three steps to <span className="text-helthy-lemon">better health.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                data-step
                key={s.number}
                className="relative glass-card p-6 sm:p-8"
              >
                <span className="text-5xl font-mono font-medium text-white/5 absolute top-4 right-5">
                  {s.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-helthy-lemon/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-helthy-lemon" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
