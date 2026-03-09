"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Flame, ArrowDown } from "lucide-react";

// iOS App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

// Platform icons
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AppleWatchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="16" rx="3" />
      <path d="M9 1h6M9 23h6M15 8v2M15 12h.01" />
    </svg>
  );
}

function GoogleFitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

const platforms = [
  { icon: AppleIcon, label: "iOS" },
  { icon: AppleWatchIcon, label: "Watch" },
  { icon: GoogleFitIcon, label: "Health" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text reveal
      gsap.from("[data-hero-line]", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from("[data-hero-sub]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from("[data-hero-cta]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from("[data-hero-platforms]", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 1,
      });

      gsap.from("[data-hero-phone]", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from("[data-hero-image]", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from("[data-hero-stat]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.2,
      });

      // Scroll indicator bounce
      gsap.to("[data-scroll-indicator]", {
        y: 8,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#060606]"
    >
      {/* Background image - full bleed with heavy overlay */}
      <div className="absolute inset-0" data-hero-image>
        <Image
          src="/images/stock/meal-overhead.jpg"
          alt="Fresh healthy food"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#060606]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/80 via-transparent to-[#060606]/60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-28 lg:pt-36 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Left: Typography-forward content */}
          <div className="lg:col-span-7 xl:col-span-6">
            {/* Asterisk accent badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-helthy-lemon text-4xl font-light">*</span>
              <span className="text-sm text-white/60 uppercase tracking-[0.2em] font-medium">
                100% Free Forever
              </span>
            </div>

            {/* Large editorial headline - Running Club inspired */}
            <div className="overflow-hidden mb-6">
              <h1 className="font-heading font-bold tracking-[-0.03em] leading-[0.9]">
                <span data-hero-line className="block text-white text-[clamp(3rem,8vw,6rem)]">
                  Track Smarter.
                </span>
                <span data-hero-line className="block text-helthy-lemon text-[clamp(3rem,8vw,6rem)]">
                  Eat Better.
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p
              data-hero-sub
              className="text-lg lg:text-xl text-white/50 leading-relaxed mb-10 max-w-lg"
            >
              AI-powered nutrition tracking that makes logging meals effortless. 
              No subscriptions. No paywalls. Just results.
            </p>

            {/* CTA Buttons */}
            <div data-hero-cta className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-helthy-lemon text-[#0B0B0B] font-semibold text-base hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(205,251,80,0.35)] transition-all duration-300"
              >
                <AppStoreIcon className="w-5 h-5" />
                Download Free
                <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-4 text-white/70 font-medium hover:text-white transition-colors"
              >
                Learn more
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Platform icons */}
            <div data-hero-platforms className="flex items-center gap-6">
              <span className="text-xs text-white/30 uppercase tracking-wider">Available on</span>
              <div className="flex items-center gap-4">
                {platforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.label} className="flex items-center gap-2 text-white/40">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Phone + Stats */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone mockup */}
              <div data-hero-phone className="relative">
                <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] rounded-[3rem] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/10">
                  <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-[#0B0B0B]">
                    <Image
                      src="/phones/foodmainscreen.png"
                      alt="Helthy app"
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  {/* Dynamic Island */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full" />
                </div>

                {/* Glow effect behind phone */}
                <div className="absolute -inset-20 bg-helthy-lemon/8 blur-3xl rounded-full -z-10" />
              </div>

              {/* Floating stat cards */}
              <div data-hero-stat className="absolute -left-8 top-[15%] hidden lg:block">
                <div className="px-4 py-3 rounded-xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/15 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-[#FF6B6B]" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white tracking-tight">1,847</p>
                      <p className="text-[11px] text-white/40 uppercase tracking-wider">Calories today</p>
                    </div>
                  </div>
                </div>
              </div>

              <div data-hero-stat className="absolute -right-4 bottom-[25%] hidden lg:block">
                <div className="px-4 py-3 rounded-xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🥗</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Grilled Chicken Salad</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4CAF50]/15 text-[#4CAF50] font-semibold">42P</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2196F3]/15 text-[#2196F3] font-semibold">12C</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF9800]/15 text-[#FF9800] font-semibold">8F</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div data-hero-stat className="absolute -left-4 bottom-[10%] hidden lg:block">
                <div className="px-4 py-2.5 rounded-xl bg-helthy-lemon/10 border border-helthy-lemon/20 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-helthy-lemon text-lg">✓</span>
                    <p className="text-sm font-medium text-helthy-lemon">Logged via AI scan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-8 lg:right-8 hidden lg:block">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Stats */}
            <div className="flex items-center gap-12">
              <div data-hero-stat>
                <p className="text-3xl font-bold text-white tracking-tight">10k+</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Active Users</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div data-hero-stat>
                <p className="text-3xl font-bold text-white tracking-tight">4.9</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">App Store</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div data-hero-stat>
                <p className="text-3xl font-bold text-helthy-lemon tracking-tight">$0</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Forever Free</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div data-scroll-indicator className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
