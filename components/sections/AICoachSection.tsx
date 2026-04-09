"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import HelthyMark from "@/components/ui/HelthyMark";
import { Sparkles } from "lucide-react";

/**
 * AI Coach showcase. Recreates the in-app chat UI as HTML so the
 * design language matches the mobile app exactly. Messages animate
 * in like a real chat thread on scroll.
 */

const MESSAGES: Array<
  | { from: "user"; text: string }
  | { from: "ai"; text: string; quick?: string[] }
> = [
  {
    from: "user",
    text: "I just hit a PR on bench. Should I push squats today too or rest legs?",
  },
  {
    from: "ai",
    text:
      "Nice — congrats on the bench PR! 💪 Looking at your last 7 days, you squatted heavy on Tuesday and your sleep dropped to 6h last night. I'd keep legs light today: mobility + a Z2 walk. Push squats Friday when you're recovered.",
  },
  {
    from: "user",
    text: "Fair. What should I eat? Trying to stay 200g protein.",
  },
  {
    from: "ai",
    text:
      "You've hit 142g protein so far. You need ~58g more. Easy hits: a Greek yogurt bowl (24g), 6oz chicken (38g), or a whey shake (25g). Want me to log a shake now?",
    quick: ["Log shake", "Suggest a meal", "Nope, thanks"],
  },
];

export default function AICoachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-coach-msg]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
      });
      gsap.from("[data-coach-copy]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
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
      className="relative section-padding px-6 lg:px-8 bg-[#080808] overflow-hidden"
    >
      {/* subtle ambient lemon glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(205,251,80,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: chat thread */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="card-helthy card-helthy-glow p-5 sm:p-6 max-w-[520px] mx-auto lg:mx-0">
            {/* Chat header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 flex items-center justify-center">
                <HelthyMark size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Helthy AI</p>
                <p className="text-[11px] text-white/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-helthy-success" />
                  Online · powered by Claude
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              {MESSAGES.map((msg, i) =>
                msg.from === "user" ? (
                  <div
                    key={i}
                    data-coach-msg
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-helthy-lemon text-helthy-black px-4 py-2.5 text-[14px] leading-snug">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} data-coach-msg className="flex justify-start">
                    <div className="max-w-[85%]">
                      <div className="rounded-2xl rounded-bl-md bg-white/[0.05] border border-white/[0.06] text-white/85 px-4 py-2.5 text-[14px] leading-snug">
                        {msg.text}
                      </div>
                      {msg.quick && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {msg.quick.map((q) => (
                            <button
                              key={q}
                              className="rounded-full border border-helthy-lemon/30 bg-helthy-lemon/[0.08] px-3 py-1 text-[11px] text-helthy-lemon hover:bg-helthy-lemon/[0.15] transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input row (visual only) */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <div className="flex-1 rounded-full bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-[13px] text-white/40">
                Ask Helthy anything…
              </div>
              <button className="w-9 h-9 rounded-full bg-helthy-lemon flex items-center justify-center text-helthy-black">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: copy */}
        <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-8" data-coach-copy>
          <p className="text-eyebrow mb-4">AI Coach</p>
          <h2 className="text-display-xl font-heading font-light tracking-tight mb-6">
            A coach that{" "}
            <span className="text-italics text-helthy-lemon">actually knows you</span>.
          </h2>
          <p className="text-base text-white/65 leading-relaxed font-light max-w-md">
            Helthy AI sees everything you log — meals, lifts, sleep, weight,
            steps. So when you ask &ldquo;what should I eat?&rdquo; it answers
            with your numbers, not generic blog advice.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/55">
            <li className="flex items-start gap-2">
              <span className="text-helthy-lemon mt-1">→</span>
              Powered by Claude — no hallucinated calories.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-helthy-lemon mt-1">→</span>
              Generates routines, suggests meals, debugs plateaus.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-helthy-lemon mt-1">→</span>
              Your data stays yours — never used for training.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
