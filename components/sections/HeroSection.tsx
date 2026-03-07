"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ─ Headline words stagger ─ */
      gsap.from("[data-hero-word]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });

      /* ─ Subtitle + CTA ─ */
      gsap.from("[data-hero-sub]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.7,
      });

      gsap.from("[data-hero-cta]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.9,
      });

      /* ─ Phone mockup float in ─ */
      gsap.from("[data-hero-phone]", {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      /* ─ Subtle float animation on phone ─ */
      gsap.to("[data-hero-phone]", {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      /* ─ Trust badges stagger ─ */
      gsap.from("[data-hero-trust]", {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        delay: 1.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 geo-grid opacity-40" />

      {/* Lemon glow behind phone area */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-helthy-lemon/[0.04] blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div>
            <h1 className="text-display-xl max-w-xl">
              <span data-hero-word className="inline-block">Track&nbsp;</span>
              <span data-hero-word className="inline-block">workouts.</span>
              <br />
              <span data-hero-word className="inline-block">Log&nbsp;</span>
              <span data-hero-word className="inline-block">nutrition.</span>
              <br />
              <span data-hero-word className="inline-block text-helthy-lemon">
                Own&nbsp;
              </span>
              <span data-hero-word className="inline-block text-helthy-lemon">
                your&nbsp;
              </span>
              <span data-hero-word className="inline-block text-helthy-lemon">
                health.
              </span>
            </h1>

            <p
              data-hero-sub
              className="text-lg sm:text-xl text-white/45 max-w-md mt-6 sm:mt-8 font-light leading-relaxed"
            >
              The all-in-one fitness app that&rsquo;s actually free. No trials,
              no paywalls, no ads on core features.
            </p>

            <div data-hero-cta className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10">
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download Free
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="text-sm text-white/30">iOS · Android · Apple Watch</span>
            </div>

            {/* Inline trust signals */}
            <div className="flex flex-wrap items-center gap-5 mt-10 sm:mt-14">
              <div data-hero-trust className="flex items-center gap-2">
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-helthy-lemon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-white/40 font-medium">4.9 on App Store</span>
              </div>
              <div data-hero-trust className="w-px h-4 bg-white/10" />
              <span data-hero-trust className="text-sm text-white/40">100% Free</span>
              <div data-hero-trust className="w-px h-4 bg-white/10" />
              <span data-hero-trust className="text-sm text-white/40">1M+ Foods</span>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div data-hero-phone className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-8 rounded-[3rem] bg-helthy-lemon/[0.06] blur-[60px] pointer-events-none" />

              {/* Phone frame */}
              <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
                <img
                  src="/phones/homescreen.png"
                  alt="Helthy app dashboard"
                  className="w-full aspect-[9/19.5] object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
