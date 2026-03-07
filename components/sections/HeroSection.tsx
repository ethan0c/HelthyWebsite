"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUpRight, Utensils, Dumbbell, TrendingUp, Camera } from "lucide-react";

const chatActions = [
  { icon: Utensils, label: "Log a meal", target: "#feature-nutrition" },
  { icon: Dumbbell, label: "Start a workout", target: "#feature-workouts" },
  { icon: TrendingUp, label: "Track my progress", target: "#feature-progress" },
  { icon: Camera, label: "Scan my food", target: "#feature-nutrition" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-headline]", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.from("[data-hero-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from("[data-hero-chat]", {
        y: 40,
        opacity: 0,
        scale: 0.92,
        duration: 1,
        ease: "back.out(1.6)",
        delay: 0.8,
      });

      gsap.from("[data-hero-cta]", {
        y: 14,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (target: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 60 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-man-running.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/80 to-[#060606]/40" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-helthy-lemon/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl w-full px-5 sm:px-8 text-center py-20 sm:py-28">
        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <h1
            data-hero-headline
            className="font-heading font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
          >
            Track Everything.
            <br />
            <span className="accent-serif text-helthy-lemon">Pay Nothing.</span>
          </h1>
        </div>

        <p
          data-hero-sub
          className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-md mx-auto mb-10"
        >
          Workouts, nutrition, and progress — all in one app.
          No subscriptions. No trials. No paywalls.
        </p>

        {/* ── Chat conversation mockup ── */}
        <div data-hero-chat className="mx-auto max-w-md text-left">
          {/* User bubble */}
          <div className="flex justify-end mb-3">
            <div className="rounded-2xl rounded-br-md bg-helthy-lemon/15 border border-helthy-lemon/20 px-4 py-2.5 max-w-[75%]">
              <p className="text-[13px] text-helthy-lemon leading-relaxed">
                What can you help me with?
              </p>
            </div>
          </div>

          {/* AI response bubble */}
          <div className="flex justify-start mb-3">
            <div className="rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.08] px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-white/70 leading-relaxed">
                I can track your nutrition, log workouts, and monitor your progress — all for free. What would you like to do?
              </p>
            </div>
          </div>

          {/* Action buttons — clickable, scroll to features */}
          <div className="flex flex-wrap gap-2 pl-0">
            {chatActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => scrollTo(a.target)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-[12px] text-white/60 hover:bg-helthy-lemon/10 hover:border-helthy-lemon/30 hover:text-helthy-lemon transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div data-hero-cta className="flex flex-col items-center gap-4 mt-10">
          <a
            href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Download Free
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <span className="text-xs text-white/20">
            iOS &middot; Android &middot; Apple&nbsp;Watch
          </span>
        </div>
      </div>
    </section>
  );
}
