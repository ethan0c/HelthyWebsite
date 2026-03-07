"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Dumbbell,
  Salad,
  BarChart3,
  Mic,
  ScanBarcode,
  Heart,
  Palette,
  Trophy,
  Share2,
  Timer,
  ScanText,
  Footprints,
} from "lucide-react";

const freeFeatures = [
  { icon: Dumbbell, label: "Workout tracking", desc: "Sets, reps, weights, PRs" },
  { icon: Salad, label: "Nutrition logging", desc: "Search 800K+ foods" },
  { icon: ScanBarcode, label: "Barcode scanning", desc: "Instant food lookup" },
  { icon: ScanText, label: "OCR label scan", desc: "Snap nutrition labels" },
  { icon: Mic, label: "Voice logging", desc: "1 free describe/day" },
  { icon: Heart, label: "Health sync", desc: "Apple Health & Google Fit" },
  { icon: BarChart3, label: "Progress charts", desc: "Weight, body comp trends" },
  { icon: Trophy, label: "Streaks & goals", desc: "Animated celebrations" },
  { icon: Timer, label: "Global routines", desc: "PPL, Upper/Lower & more" },
  { icon: Palette, label: "7 custom themes", desc: "Dark, abyss, sakura..." },
  { icon: Footprints, label: "Step tracking", desc: "Daily step goals" },
  { icon: Share2, label: "Share cards", desc: "Meals & workout cards" },
];

export default function FreeTierGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-free-card]").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: (i % 4) * 0.08,
        });
      });

      /* Phone float */
      gsap.from("[data-phone-float]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-phone-float]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-eyebrow mb-3">Free forever</p>
          <h2 className="text-display-lg">
            All of this. <span className="text-helthy-lemon">$0.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mt-4">
            No trials, no credit card, no catch. Download and start tracking today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Feature grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {freeFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    data-free-card
                    key={f.label}
                    className="glass-card glass-card-hover p-5 sm:p-6 flex flex-col gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-helthy-lemon/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-helthy-lemon" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-white">
                        {f.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/40 mt-0.5">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hidden lg:flex lg:col-span-4 justify-center">
            <div data-phone-float className="relative">
              <div className="relative w-[260px] rounded-[2.5rem] overflow-hidden border-2 border-white/[0.08] shadow-2xl shadow-helthy-lemon/5">
                <img
                  src="/phones/home.webp"
                  alt="Helthy home screen"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 blur-[80px] opacity-20 bg-helthy-lemon rounded-full scale-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
