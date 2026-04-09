"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Camera, Mic, Sparkles, Activity, Dumbbell, HeartPulse } from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "Photo meal log",
    body: "Snap your plate. Helthy reads it, breaks down macros, and logs it in seconds.",
    accent: "var(--helthy-lemon)",
  },
  {
    icon: Mic,
    title: "Voice logging",
    body: "Hands full? Just say it. Deepgram transcription captures meals on the go.",
    accent: "var(--helthy-accent-cyan)",
  },
  {
    icon: Sparkles,
    title: "AI coach",
    body: "Ask anything. A Claude-powered coach that knows your goals, history, and macros.",
    accent: "var(--helthy-lemon)",
  },
  {
    icon: Dumbbell,
    title: "Workout tracking",
    body: "Sets, reps, rest, form tips. Build routines or let Helthy generate one for you.",
    accent: "var(--helthy-accent-orange)",
  },
  {
    icon: Activity,
    title: "Real analytics",
    body: "Trends, streaks, muscle heatmap, progress photos — see what you can't feel yet.",
    accent: "var(--helthy-steps)",
  },
  {
    icon: HeartPulse,
    title: "Health sync",
    body: "Plays nice with Apple Health and Google Fit. Steps, weight, workouts — all in one place.",
    accent: "var(--helthy-success)",
  },
];

export default function FeaturesRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The "curve" effect — wallet template's signature move.
      // The dark card starts smaller and grows to full size as you scroll
      // into it, with rounded corners revealing the hero behind. We use
      // scrub for a continuous, scroll-linked animation (not a one-shot).
      gsap.fromTo(
        cardRef.current,
        { scale: 0.86, y: 80 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.from("[data-feature-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative px-2 lg:px-3 pt-2 lg:pt-3 bg-[#060606]"
    >
      {/* The curved card — bg slightly different from hero, big rounded
          corners on top so the hero shows through around the edges as
          the card scales in. */}
      <div
        ref={cardRef}
        className="relative mx-auto bg-[#0F0F0F] overflow-hidden border border-white/[0.06]"
        style={{
          borderRadius: "40px",
          boxShadow:
            "0 -40px 100px -40px rgba(205,251,80,0.12), 0 1px 0 0 rgba(255,255,255,0.05) inset",
          willChange: "transform",
        }}
      >
        <div className="px-6 lg:px-8 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-eyebrow mb-4">Features</p>
              <h2 className="text-display-xl font-heading font-light tracking-tight max-w-3xl mx-auto">
                Everything you need.{" "}
                <span className="text-italics text-white/60">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    data-feature-card
                    className="card-helthy card-helthy-hover p-7 group"
                  >
                    <div
                      className="inline-flex w-11 h-11 items-center justify-center rounded-xl mb-5 transition-transform group-hover:scale-110"
                      style={{
                        background: `${feat.accent}1A`,
                        border: `1px solid ${feat.accent}33`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: feat.accent }} />
                    </div>
                    <h3 className="font-display text-[17px] font-semibold text-white mb-2 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light">
                      {feat.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
