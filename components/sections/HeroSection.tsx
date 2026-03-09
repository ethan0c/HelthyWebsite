"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// iOS App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

// App Store rating badge with laurels
function RatingBadge({ rating, label }: { rating: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* Left laurel */}
      <svg className="w-6 h-8 text-white/60" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4c-4 2-8 8-8 14M12 8c-3 2-6 6-6 10M12 12c-2 2-4 4-4 6" strokeLinecap="round"/>
      </svg>
      <div className="text-center">
        <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
        <p className="text-white font-bold">{rating}</p>
        <div className="flex justify-center gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          ))}
        </div>
      </div>
      {/* Right laurel */}
      <svg className="w-6 h-8 text-white/60 scale-x-[-1]" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4c-4 2-8 8-8 14M12 8c-3 2-6 6-6 10M12 12c-2 2-4 4-4 6" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fast, snappy content reveal
      gsap.from("[data-hero-line]", {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from("[data-hero-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from("[data-hero-cta]", {
        y: 15,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.35,
      });

      // Badges
      gsap.from("[data-hero-badge]", {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.45,
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
        {/* Minimal overlay - just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content - positioned bottom-left like Fitflix */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-12 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Headline */}
            <h1 className="font-heading font-medium tracking-[-0.02em] leading-[1.1] mb-6">
              <span data-hero-line className="block text-white text-[clamp(1.75rem,4vw,2.75rem)]">
                Reach your goals,
              </span>
              <span data-hero-line className="block text-white text-[clamp(1.75rem,4vw,2.75rem)]">
                <span className="accent-serif text-helthy-lemon">faster.</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              data-hero-sub
              className="text-sm lg:text-base text-white/60 leading-relaxed mb-8 max-w-md"
            >
              Track food, workouts, cardio, and weight — all in one place. 
              AI-powered insights to help you progress faster.
              100% free, forever.
            </p>

            {/* CTA */}
            <div data-hero-cta>
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-helthy-lemon text-[#0B0B0B] font-medium text-sm hover:bg-white transition-colors"
              >
                <AppStoreIcon className="w-5 h-5" />
                Get started
              </a>
            </div>
          </div>

          {/* Rating badges - bottom right like Fitflix */}
          <div className="absolute bottom-12 lg:bottom-16 right-6 lg:right-8 hidden md:flex items-center gap-6">
            <div data-hero-badge>
              <RatingBadge rating="4.9" label="App Store" />
            </div>
            <div data-hero-badge>
              <RatingBadge rating="2k+" label="Users" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
