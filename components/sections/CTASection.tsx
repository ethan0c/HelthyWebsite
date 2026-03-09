"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from("[data-cta-text] > *", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Phone float in
      gsap.from("[data-cta-phone]", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-helthy-lemon/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-helthy-lemon/[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Main heading */}
          <div data-cta-text className="mb-12">
            <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              Ready to start?
            </p>
            <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white mb-6">
              Your journey
              <br />
              <span className="text-helthy-lemon">starts now</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto mb-10">
              Free forever. No credit card. No subscriptions.
              <br className="hidden sm:block" />
              Just results.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-helthy-lemon text-[#0B0B0B] font-medium text-base tracking-wide uppercase hover:bg-white hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(205,251,80,0.3)] transition-all duration-300"
              >
                <AppStoreIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                Download Free
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 text-white/60 hover:text-white transition-colors group"
              >
                <span className="text-sm font-medium tracking-wide uppercase">See what's included</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Phone showcase */}
          <div data-cta-phone className="relative max-w-lg mx-auto mt-12">
            <div className="flex justify-center gap-4">
              {/* Main phone */}
              <div className="relative w-[200px] sm:w-[240px]">
                <div className="relative w-full aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-2 shadow-2xl shadow-black/40">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0B0B0B]">
                    <Image
                      src="/phones/homescreen.png"
                      alt="Helthy app home"
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -inset-6 bg-helthy-lemon/20 blur-3xl rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
