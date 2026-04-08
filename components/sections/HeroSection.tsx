"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AppStoreBadge from "@/components/ui/AppStoreBadge";
import HeroVisualSlot from "@/components/sections/hero/HeroVisualSlot";
import HeroVisualVideo from "@/components/sections/hero/HeroVisualVideo";
// Future swap (PR follow-up): replace <HeroVisualVideo /> with <HeroVisualPhone />.
// import HeroVisualPhone from "@/components/sections/hero/HeroVisualPhone";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline lines + eyebrow share the same selector for staggered reveal.
      gsap.from("[data-hero-line]", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from("[data-hero-sub]", {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from("[data-hero-cta]", {
        y: 25,
        opacity: 0,
        scale: 0.9,
        duration: 1.0,
        ease: "back.out(1.2)",
        delay: 0.8,
      });

      gsap.from("[data-hero-rating]", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "back.out(1.4)",
        delay: 0.9,
      });

      gsap.from("[data-hero-visual]", {
        scale: 0.96,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[92vh] flex items-center"
    >
      {/* Ambient page-level glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(205,251,80,0.05) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 dot-grid opacity-50" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-32 pb-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ── Left column: copy ── */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div data-hero-line className="mb-6 inline-flex">
              <span className="pill-badge">
                Free Forever · No Credit Card
              </span>
            </div>

            {/* Headline — Option A: price wedge */}
            <h1 className="font-heading font-light tracking-[-0.04em] leading-[0.95] mb-6">
              <span
                data-hero-line
                className="block text-white text-[clamp(2.75rem,6.5vw,5.25rem)]"
              >
                <span className="text-italics">Calorie tracking</span>
              </span>
              <span
                data-hero-line
                className="block text-[clamp(2.75rem,6.5vw,5.25rem)]"
              >
                <span className="text-white">shouldn&apos;t cost</span>
              </span>
              <span
                data-hero-line
                className="block text-[clamp(2.75rem,6.5vw,5.25rem)]"
              >
                <span className="text-helthy-lemon">$80 a year.</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              data-hero-sub
              className="text-base lg:text-lg text-white/70 leading-relaxed mb-10 max-w-xl font-light"
            >
              Helthy is the free-forever nutrition and workout app. No trial,
              no paywall on the basics, no credit card. Become the{" "}
              <span className="text-helthy-lemon">helthy-est</span> version of
              yourself today.
            </p>

            {/* CTA row: badge + (desktop) QR */}
            <div
              data-hero-cta
              className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8"
            >
              <AppStoreBadge />

              {/* QR placeholder — desktop only.
                  TODO(hero-rebuild): swap for /public/images/app-store-qr.svg
                  once the asset is committed. */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="h-[88px] w-[88px] rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 text-center px-2">
                    qr
                    <br />
                    placeholder
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white/80">
                    Scan to download
                  </span>
                  <span className="text-[11px] text-white/40">
                    iPhone · iPad
                  </span>
                </div>
              </div>
            </div>

            {/* Rating block — moved inline from absolute bottom-right */}
            <div data-hero-rating className="mb-6">
              <div className="glass-card inline-flex items-center gap-4 px-5 py-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-helthy-lemon"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white">
                    4.9 on the App Store
                  </span>
                  <span className="text-[11px] text-white/50">
                    Rated by 2,000+ users
                  </span>
                </div>
              </div>
            </div>

            {/* Social proof line — text-only for PR 1; logo strip is a follow-up. */}
            <p className="text-xs text-white/40 tracking-wide">
              Trusted by 2,000+ lifters, runners, and everyday athletes.
            </p>
          </div>

          {/* ── Right column: pluggable visual slot ── */}
          <div className="relative flex justify-center lg:justify-end">
            <HeroVisualSlot>
              <HeroVisualVideo />
            </HeroVisualSlot>
          </div>
        </div>
      </div>
    </section>
  );
}
