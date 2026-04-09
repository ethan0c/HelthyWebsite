"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUp } from "lucide-react";

const PROMPTS = [
  "Am I eating enough protein this week?",
  "Should I rest or train today?",
  "What's slowing my progress?",
  "How do I break this plateau?",
  "What should I eat before my workout?",
];

const RESPONSE = {
  question: "Am I eating enough protein this week?",
  answer:
    "Looking at your logs for the past 7 days, you're averaging 118g of protein per day — about 62g short of your 180g goal.",
  highlights: [
    { label: "Daily avg", value: "118g protein" },
    { label: "Target", value: "180g protein" },
    { label: "Gap", value: "62g / day" },
  ],
  suggestion:
    "Adding a Greek yogurt (17g) and a chicken breast at dinner (38g) would close most of the gap without changing your meal structure.",
};

export default function AICoachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((i) => (i + 1) % PROMPTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-ai-hero]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from("[data-ai-response]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] py-32 lg:py-40 px-6 overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(205,251,80,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl flex flex-col items-center text-center">
        {/* Star icon */}
        <div data-ai-hero className="mb-8">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M22 2 L24.5 17.5 L40 22 L24.5 26.5 L22 42 L19.5 26.5 L4 22 L19.5 17.5 Z"
              fill="url(#starGrad)"
            />
            <defs>
              <radialGradient id="starGrad" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#cdff50" />
                <stop offset="100%" stopColor="#7bff6a" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Headline */}
        <h2
          data-ai-hero
          className="font-heading font-light tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(52px, 8vw, 88px)", lineHeight: 1.05 }}
        >
          <em className="italic">Ask</em> anything
        </h2>

        {/* Subheading */}
        <p
          data-ai-hero
          className="text-white/55 text-lg leading-relaxed max-w-md mb-14 font-light"
        >
          Helthy AI turns your questions into answers you can trust — personalised advice, grounded in your data, delivered instantly.
        </p>

        {/* Input bar */}
        <div
          data-ai-hero
          className="w-full rounded-2xl flex items-center gap-3 px-5 py-4 mb-4"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="flex-1 text-left text-[15px] text-white/70 transition-all duration-500"
            key={promptIndex}
          >
            {PROMPTS[promptIndex]}
            <span className="inline-block w-[2px] h-[15px] bg-white/60 ml-0.5 align-middle animate-pulse" />
          </span>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)" }}
            aria-label="Send"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Response card */}
        <div
          data-ai-response
          className="w-full rounded-2xl p-6 text-left"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="text-[13px] text-white/40 mb-3 font-light">
            {RESPONSE.question}
          </p>
          <p className="text-[15px] text-white/80 leading-relaxed mb-5">
            {RESPONSE.answer}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {RESPONSE.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[11px] text-white/40 mb-1">{h.label}</p>
                <p className="text-[13px] font-semibold text-white">{h.value}</p>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-white/55 leading-relaxed font-light">
            <span className="font-semibold text-[var(--helthy-lemon)]">Suggestion: </span>
            {RESPONSE.suggestion}
          </p>
        </div>
      </div>
    </section>
  );
}
