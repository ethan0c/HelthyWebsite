"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Camera, Sparkles, Dumbbell, Activity } from "lucide-react";

export default function FeaturesRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          <div>
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-eyebrow mb-4">Features</p>
              <h2 className="text-display-xl font-heading font-light tracking-tight max-w-3xl mx-auto">
                Everything you need.{" "}
                <span className="text-italics text-white/60">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>

            {/* Bento grid — 2 columns, 2 rows */}
            <div className="grid grid-cols-2 gap-[6px]">
              {/* Row 1 — two tall cards */}
              {/* Card 1: Photo meal log */}
              <BentoCard id="photo-log" tall>
                <div className="flex-1 flex items-center justify-center px-6 pt-8 pb-4 overflow-hidden">
                  <div
                    className="w-full max-w-[260px] rounded-2xl overflow-hidden"
                    style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
                      <div className="w-6 h-6 rounded-md bg-[var(--helthy-lemon)] flex items-center justify-center">
                        <span className="text-[10px] font-bold text-black">H</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-20 rounded bg-white/20 mb-1" />
                        <div className="h-1.5 w-14 rounded bg-white/10" />
                      </div>
                    </div>
                    {[
                      { label: "Grilled chicken + rice", val: "520 kcal · 48g protein" },
                      { label: "Banana", val: "89 kcal · 1g protein" },
                      { label: "Greek yogurt", val: "130 kcal · 17g protein" },
                    ].map((row, i) => (
                      <div key={i} className="px-4 py-2.5 flex items-center gap-3 border-b border-white/[0.04]">
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0"
                          style={{ background: i === 0 ? "rgba(205,251,80,0.15)" : "rgba(255,255,255,0.06)" }}
                        />
                        <div>
                          <div className="text-[11px] text-white/80">{row.label}</div>
                          <div className="text-[10px] text-white/35 mt-0.5">{row.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CardText
                  icon={Camera}
                  title="Photo meal log"
                  body="Snap your plate. Helthy reads it, breaks down macros, and logs it in seconds."
                />
              </BentoCard>

              {/* Card 2: AI Coach */}
              <BentoCard id="ai-coach" tall>
                <div className="flex-1 flex items-center justify-center px-6 pt-8">
                  <div className="w-full space-y-3">
                    <div className="flex justify-end">
                      <div
                        className="rounded-2xl rounded-br-md px-4 py-2.5 text-[13px] text-black max-w-[80%]"
                        style={{ background: "var(--helthy-lemon)" }}
                      >
                        Should I push squats today or rest?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-md px-4 py-2.5 text-[13px] text-white/80 max-w-[85%]"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        You squatted heavy Tuesday and only slept 6h. Keep legs light today — mobility + a Z2 walk. Hit squats Friday when you&apos;re recovered.
                      </div>
                    </div>
                  </div>
                </div>
                <CardText
                  icon={Sparkles}
                  title="AI Coach"
                  body="Ask anything. A Claude-powered coach that knows your goals, history, and macros."
                />
              </BentoCard>

              {/* Card 3: Workout tracking */}
              <BentoCard id="workout" tall className="relative overflow-hidden">
                <div className="flex-1 flex items-center justify-center px-6 pt-8 pb-4">
                  <div
                    className="w-full max-w-[260px] rounded-2xl overflow-hidden"
                    style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="px-4 pt-4 pb-2 border-b border-white/[0.06]">
                      <p className="text-[11px] text-white/40 mb-1">Today · Push</p>
                      <p className="text-[13px] font-semibold text-white">Bench Press · New PR 🎉</p>
                    </div>
                    {[
                      { set: "Set 1", weight: "80kg", reps: "8 reps" },
                      { set: "Set 2", weight: "85kg", reps: "6 reps" },
                      { set: "Set 3", weight: "90kg", reps: "4 reps ✓" },
                    ].map((row, i) => (
                      <div key={i} className="px-4 py-2 flex items-center justify-between border-b border-white/[0.04]">
                        <span className="text-[11px] text-white/40">{row.set}</span>
                        <span className="text-[11px] text-white/70">{row.weight}</span>
                        <span
                          className="text-[11px]"
                          style={{ color: i === 2 ? "var(--helthy-lemon)" : "rgba(255,255,255,0.5)" }}
                        >
                          {row.reps}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <CardText
                  icon={Dumbbell}
                  title="Workout tracking"
                  body="Log sets, reps, and PRs. Form tips and demos built right in."
                />
              </BentoCard>

              {/* Card 4: Analytics */}
              <BentoCard id="analytics" tall>
                <div className="flex-1 flex items-end justify-center px-4 pt-8 pb-2 overflow-hidden">
                  <div
                    className="w-full rounded-2xl overflow-hidden"
                    style={{ background: "#f8f8f7", border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div className="p-4">
                      <p className="text-[13px] font-semibold text-gray-800 mb-3">Weight trend</p>
                      <svg viewBox="0 0 200 60" className="w-full h-12" fill="none">
                        <polyline
                          points="0,50 30,45 60,42 90,36 110,32 130,28 160,22 180,18 200,14"
                          stroke="#1a1a1a"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="0,50 30,45 60,42 90,36 110,32 130,28 160,22 180,18 200,14 200,60 0,60"
                          fill="rgba(0,0,0,0.06)"
                        />
                        <circle cx="200" cy="14" r="3.5" fill="#1a1a1a" />
                        <rect x="166" y="4" width="40" height="14" rx="4" fill="#1a1a1a" />
                        <text x="186" y="11" textAnchor="middle" fontSize="7" fill="white" dominantBaseline="middle">
                          82.4 kg
                        </text>
                      </svg>
                      <div className="flex justify-between mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May"].map((d) => (
                          <span key={d} className="text-[10px] text-gray-400">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <CardText
                  icon={Activity}
                  title="Real analytics"
                  body="Weight trends, macro history, streaks, and progress photos — all in one place."
                />
              </BentoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  id,
  tall,
  children,
  className = "",
}: {
  id: string;
  tall?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-feature-card
      data-id={id}
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        borderRadius: 28,
        background: "#121212",
        border: "1px solid rgb(41,41,41)",
        minHeight: tall ? 440 : 240,
      }}
    >
      {children}
    </div>
  );
}

function CardText({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="p-7 pt-4">
      <div
        className="inline-flex w-9 h-9 items-center justify-center rounded-xl mb-3"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon className="w-4 h-4 text-white/60" />
      </div>
      <h3 className="font-display text-[17px] font-semibold text-white mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed font-light">{body}</p>
    </div>
  );
}
