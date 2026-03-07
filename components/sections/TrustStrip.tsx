"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Smartphone, Watch, Barcode, Dumbbell, UtensilsCrossed } from "lucide-react";

const signals = [
  { icon: Apple, text: "iOS" },
  { icon: Smartphone, text: "Android" },
  { icon: Watch, text: "Apple Watch" },
  { icon: UtensilsCrossed, text: "1M+ Foods" },
  { icon: Dumbbell, text: "500+ Exercises" },
  { icon: Barcode, text: "Barcode Scanner" },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-trust-item]", {
        y: 15,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative border-y border-white/[0.04] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {signals.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.text}
                data-trust-item
                className="flex items-center gap-2 text-white/30"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium whitespace-nowrap">{s.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
