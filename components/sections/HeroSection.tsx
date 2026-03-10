"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { LaurelWreathLeft01Icon } from "@hugeicons/core-free-icons";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth, fluid content reveal with scale
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
        delay: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Full-bleed background video */}
      <div data-hero-food className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/stock/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-man-running.mp4" type="video/mp4" />
        </video>
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content - positioned bottom-left */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Eyebrow */}
            <div data-hero-line className="flex items-center gap-4 mb-6">
              <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase">
                Free Forever
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold tracking-[-0.04em] leading-[0.95] mb-6">
              <span data-hero-line className="block text-white text-[clamp(3rem,7vw,5.5rem)] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                Your <span className="text-helthy-lemon">fitness</span>,
              </span>
              <span data-hero-line className="block text-[clamp(3rem,7vw,5.5rem)]">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">simplified</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              data-hero-sub
              className="text-base lg:text-lg text-white/70 leading-relaxed mb-10 max-w-xl font-light"
            >
              Track your nutrition, workouts, progress and so much more in one  simple app.
              <span className="text-white/90"> Become the <span className="text-helthy-lemon">helthy-est</span></span> version of yourself today.
            </p>

            {/* Subtle CTA link */}
            <div data-hero-cta className="flex items-center gap-6">
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-white hover:text-helthy-lemon transition-all duration-300"
              >
                <span className="text-sm font-medium tracking-wide">Download for iOS</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <span className="text-white/30 text-sm">·</span>
              <span className="text-white/40 text-sm">No credit card required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Badge - Bottom Right */}
      <div
        data-hero-rating
        className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-20"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <HugeiconsIcon
            icon={LaurelWreathLeft01Icon}
            className="w-6 h-6 text-helthy-lemon"
          />
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-helthy-lemon"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <p className="text-xs font-medium text-white/70 mt-1">4.9 · 2k+ users</p>
          </div>
          <HugeiconsIcon
            icon={LaurelWreathLeft01Icon}
            className="w-6 h-6 text-helthy-lemon rotate-180"
          />
        </div>
      </div>
    </section>
  );
}
