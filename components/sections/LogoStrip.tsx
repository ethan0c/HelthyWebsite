"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Brand SVG icons ── */
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.6.348.6 1.032 0 1.38l-2.302 1.302-2.535-2.535 2.535-2.449zM5.864 2.658L16.8 9.006l-2.302 2.302L5.864 2.658z" />
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

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341a1 1 0 01-.001-2 1 1 0 01.001 2zm-11.046 0a1 1 0 010-2 1 1 0 010 2zm11.405-6.02l1.997-3.46a.416.416 0 00-.152-.567.416.416 0 00-.568.152L17.12 8.95c-1.46-.746-3.1-1.163-4.87-1.163-1.77 0-3.41.417-4.87 1.163L5.34 5.446a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.46C3.603 11.267 1.5 14.58 1.5 18.375h21c0-3.796-2.103-7.108-5.118-9.054z" />
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

const integrations = [
  { icon: AppleIcon, label: "Apple Health" },
  { icon: AppleWatchIcon, label: "Apple Watch" },
  { icon: AndroidIcon, label: "Android" },
  { icon: GoogleFitIcon, label: "Google Fit" },
  { icon: GooglePlayIcon, label: "Google Play" },
];

export default function LogoStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-logo-item]", {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stripRef} className="py-12 sm:py-16 border-t border-b border-white/[0.04]">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/25 mb-8">
          Syncs with your favorite platforms
        </p>
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-logo-item
                className="flex items-center gap-2.5 text-white/30 hover:text-white/50 transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-light">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
