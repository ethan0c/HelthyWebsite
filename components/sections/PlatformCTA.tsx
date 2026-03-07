"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Smartphone, Watch } from "lucide-react";
import Link from "next/link";

const platforms = [
  {
    icon: Apple,
    label: "iOS",
    url: "https://apps.apple.com/app/helthy/id6738965498",
    available: true,
  },
  {
    icon: Smartphone,
    label: "Android",
    url: "https://play.google.com/store/apps/details?id=com.ocelabs.helthy",
    available: true,
  },
  {
    icon: Watch,
    label: "Apple Watch",
    url: "https://apps.apple.com/app/helthy/id6738965498",
    available: true,
  },
];

export default function PlatformCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-text]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-platform-card]", {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-platform-card]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-helthy-lemon/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <div data-cta-text>
          <h2 className="text-display-xl mb-5">
            Start tracking
            <br />
            <span className="text-helthy-lemon">today.</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/40 font-light max-w-md mx-auto mb-14">
            Free on iOS, Android &amp; Apple Watch.
            <br />No credit card. No trial.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-10">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                data-platform-card
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center group-hover:border-helthy-lemon/30 group-hover:bg-helthy-lemon/5 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white/70 group-hover:text-helthy-lemon transition-colors" />
                </div>
                <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{p.label}</span>
              </Link>
            );
          })}
        </div>

        <p className="text-xs text-white/20 tracking-wider uppercase font-mono">
          Free forever · No ads · No credit card
        </p>
      </div>
    </section>
  );
}
