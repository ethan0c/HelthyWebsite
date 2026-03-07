"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Mic, Send } from "lucide-react";

/* ── Chat conversation data ─────────────────────────────── */
const conversation = [
  { role: "user" as const, text: "I hit 90 kg bench today!" },
  {
    role: "ai" as const,
    text: "Great PR! 🎉 That's a 5 kg jump from last month. Try 4×6 at 85 kg with a 2-sec pause next week — builds control through the sticking point.",
  },
  { role: "user" as const, text: "What should I eat post-workout?" },
  {
    role: "ai" as const,
    text: "Based on your logs, you're 40 g short on protein today. A chicken breast with rice and veggies would close that gap perfectly — around 520 kcal.",
  },
];

/* ── AI Chat Mockup (bigger, richer) ────────────────────── */
function AIChatMockup() {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0B0B0B]/80 backdrop-blur-2xl w-full max-w-md overflow-hidden">
      {/* Header bar */}
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
          <span className="text-[10px] text-helthy-lemon/60 font-mono uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div className="px-5 py-5 flex flex-col gap-3.5">
        {conversation.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-helthy-lemon text-[#0B0B0B] text-[13px] max-w-[78%] font-medium leading-relaxed">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white/[0.05] text-white/65 text-[13px] max-w-[88%] leading-relaxed">
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input bar */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
          <span className="text-[13px] text-white/25 flex-1">Ask anything…</span>
          <Mic className="w-4 h-4 text-white/20" />
          <Send className="w-4 h-4 text-helthy-lemon/40" />
        </div>
      </div>
    </div>
  );
}

export default function PremiumTease() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-premium-text]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from("[data-premium-chat]", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-premium-chat]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#060606] py-28 sm:py-36"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-helthy-lemon/[0.04] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Text side */}
        <div data-premium-text>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-helthy-lemon/20 bg-helthy-lemon/5 mb-8">
            <Sparkles className="w-4 h-4 text-helthy-lemon" />
            <span className="text-xs font-mono tracking-widest uppercase text-helthy-lemon">
              Coming Soon
            </span>
          </div>
          <h2 className="text-display-lg mb-6">
            Meet your<br />
            <span className="text-helthy-lemon">AI coach.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-md font-light leading-relaxed mb-8">
            Personalized plans, dynamic TDEE adjustments, and an AI that actually knows
            your training history — not a generic chatbot.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Photo Logging", "Custom Plans", "Voice Chat", "Smart Macros", "Dynamic TDEE"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-white/50"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Chat mockup */}
        <div data-premium-chat className="flex justify-center lg:justify-end">
          <AIChatMockup />
        </div>
      </div>
    </section>
  );
}
