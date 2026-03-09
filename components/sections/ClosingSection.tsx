"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Mic, Send } from "lucide-react";
import Link from "next/link";

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

/* ── Chat data ── */
const chat = [
  { role: "user" as const, text: "I hit 90 kg bench today!" },
  {
    role: "ai" as const,
    text: "Great PR! That's a 5 kg jump. Try 4×6 at 85 kg with a 2-sec pause next week — builds control through the sticking point.",
  },
  { role: "user" as const, text: "What should I eat post-workout?" },
  {
    role: "ai" as const,
    text: "You're 40 g short on protein today. Chicken breast with rice would close that gap — around 520 kcal.",
  },
];

/* ── Chat Mockup ── */
function ChatMockup() {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0B0B0B]/80 backdrop-blur-2xl w-full max-w-md overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-xl bg-helthy-lemon/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-helthy-lemon" />
        </div>
        <div>
          <p className="text-sm font-medium text-white/90">Helthy AI</p>
          <p className="text-[11px] text-white/30">Always learning your habits</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-helthy-lemon animate-pulse" />
          <span className="text-[10px] text-helthy-lemon/60 uppercase tracking-widest font-medium">
            Live
          </span>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3.5">
        {chat.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-helthy-lemon text-[#0B0B0B] text-[13px] max-w-[78%] font-medium leading-relaxed">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white/[0.05] text-white/60 text-[13px] max-w-[88%] leading-relaxed">
                {msg.text}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
          <span className="text-[13px] text-white/20 flex-1">Ask anything…</span>
          <Mic className="w-4 h-4 text-white/15" />
          <Send className="w-4 h-4 text-helthy-lemon/40" />
        </div>
      </div>
    </div>
  );
}

/* ── Store links ── */
const stores = [
  {
    label: "App Store",
    icon: AppleIcon,
    url: "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974",
  },
  {
    label: "Google Play",
    icon: GooglePlayIcon,
    url: "https://play.google.com/store/apps/details?id=com.ocelabs.helthy",
  },
];

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* AI text slide-up */
      gsap.from("[data-close-ai-text]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-close-ai-text]",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Chat mockup */
      gsap.from("[data-close-ai-chat]", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-close-ai-chat]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.15,
      });

      /* CTA headline reveal */
      gsap.from("[data-close-headline]", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-close-cta]",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      /* CTA buttons */
      gsap.from("[data-close-btn]", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-close-cta]",
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ── Part 1: AI Coach Preview ── */}
      <div className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-helthy-lemon/[0.03] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-close-ai-text>
            <p className="text-helthy-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-6">Coming Soon</p>
            <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white mb-5">
              Meet your{" "}
              <span className="accent-serif text-helthy-lemon">AI coach.</span>
            </h2>
            <p className="text-base text-white/35 max-w-md leading-relaxed mb-7">
              Personalized plans, dynamic TDEE, and an AI that actually knows
              your training history — not a generic chatbot.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Photo Logging", "Custom Plans", "Voice Chat", "Smart Macros", "Dynamic TDEE"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/35"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          <div data-close-ai-chat className="flex justify-center lg:justify-end">
            <ChatMockup />
          </div>
        </div>
      </div>

      {/* ── Part 2: Final CTA ── */}
      <div data-close-cta className="relative py-28 sm:py-40 rings-bg">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-helthy-lemon/[0.05] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10 text-center">
          <h2
            data-close-headline
            className="font-heading font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-white mb-5"
          >
            Start tracking{" "}
            <span className="accent-serif text-helthy-lemon">today.</span>
          </h2>
          <p className="text-base text-white/30 max-w-md mx-auto mb-10 leading-relaxed">
            Free on iOS, Android &amp; Apple Watch.
            <br />
            No credit card. No trial. No catch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {stores.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-close-btn
                  className="btn-primary"
                >
                  <Icon className="w-5 h-5" />
                  {s.label}
                </Link>
              );
            })}
          </div>

          <p className="text-[11px] text-white/15 tracking-widest uppercase font-medium">
            Free forever &middot; No ads on core features
          </p>
        </div>
      </div>
    </section>
  );
}
