"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, X, Sparkles, Lightbulb, Keyboard, Mic } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

      {/* Dark gradient overlay — bottom-heavy so text pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/80 to-[#060606]/40" />

      {/* Lemon tint at bottom for brand feel */}
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

        {/* Subtitle */}
        <p
          data-hero-sub
          className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-md mx-auto mb-10"
        >
          Workouts, nutrition, and progress — all in one app.
          No subscriptions. No trials. No paywalls.
        </p>

        {/* ── In-app "Describe Meal" mockup ── */}
        <div data-hero-chat className="mx-auto max-w-sm">
          <div className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A]/80 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Header bar — matches app modal */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <X className="w-4 h-4 text-white/30" />
              <div className="text-center">
                <span className="text-[13px] font-medium text-white/90 block">Describe Meal</span>
                <span className="text-[11px] text-helthy-lemon flex items-center justify-center gap-1">
                  🍳 Breakfast
                </span>
              </div>
              <div className="w-4" />
            </div>

            {/* Mode toggle */}
            <div className="flex mx-4 mt-3 rounded-lg bg-white/[0.04] p-0.5">
              <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-white/[0.08]">
                <Keyboard className="w-3 h-3 text-white/70" />
                <span className="text-[11px] font-medium text-white/70">Type</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md">
                <Mic className="w-3 h-3 text-white/30" />
                <span className="text-[11px] text-white/30">Voice</span>
              </div>
            </div>

            {/* Text Area */}
            <div className="mx-4 mt-3">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3.5 min-h-[80px] text-left">
                <span className="text-[13px] text-white/20 leading-relaxed">
                  E.g., &ldquo;2 scrambled eggs, toast with butter, and orange juice&rdquo;
                </span>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="mx-4 mt-3">
              <div className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-helthy-lemon">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span className="text-[13px] font-medium text-black">Analyze</span>
              </div>
            </div>

            {/* Tips Card */}
            <div className="mx-4 mt-3 mb-4 rounded-lg bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3 h-3 text-helthy-lemon/60" />
                <span className="text-[10px] font-medium text-white/30">Tips</span>
              </div>
              <span className="text-[10px] text-white/20 leading-relaxed">
                Be specific with quantities — &ldquo;2 eggs, 1 cup oatmeal, 1 banana&rdquo; works great.
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div data-hero-cta className="flex flex-col items-center gap-4 mt-8">
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
