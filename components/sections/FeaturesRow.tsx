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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-display-xl font-heading font-light tracking-tight max-w-3xl mx-auto">
                Everything you need.{" "}
                <span className="text-italics text-white/60">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </div>

            {/* Bento grid — 2 columns, 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              {/* Row 1 — two tall cards */}
              {/* Card 1: Photo meal log — mirrors foodscreen.png */}
              <BentoCard id="photo-log" tall>
                <div className="flex-1 flex items-center justify-center px-5 pt-10 pb-4 overflow-hidden">
                  <div className="w-full max-w-[220px] rounded-[32px] overflow-hidden border border-white/[0.08]" style={{ background: "#0a0a0a", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)" }}>
                    {/* Macro rings row */}
                    <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
                      <p className="text-[10px] text-white/40 mb-2">Today&apos;s Nutrition</p>
                      <div className="flex items-center gap-3">
                        {/* Mini donut ring */}
                        <svg width="44" height="44" viewBox="0 0 44 44">
                          <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                          <circle cx="22" cy="22" r="17" fill="none" stroke="#cdff50" strokeWidth="5"
                            strokeDasharray="68 39" strokeDashoffset="27" strokeLinecap="round" />
                          <circle cx="22" cy="22" r="17" fill="none" stroke="#38bdf8" strokeWidth="5"
                            strokeDasharray="28 79" strokeDashoffset="-41" strokeLinecap="round" />
                          <circle cx="22" cy="22" r="17" fill="none" stroke="#f97316" strokeWidth="5"
                            strokeDasharray="18 89" strokeDashoffset="-69" strokeLinecap="round" />
                          <text x="22" y="26" textAnchor="middle" fontSize="8" fontWeight="600" fill="white">1840</text>
                        </svg>
                        <div className="flex flex-col gap-1">
                          {[
                            { label: "PROTEIN", val: "142g", color: "#cdff50" },
                            { label: "CARBS", val: "210g", color: "#38bdf8" },
                            { label: "FATS", val: "58g", color: "#f97316" },
                          ].map((m) => (
                            <div key={m.label} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                              <span className="text-[10px] text-white/40">{m.label}</span>
                              <span className="text-[10px] font-semibold text-white ml-auto pl-2">{m.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Meal rows */}
                    {[
                      { meal: "Breakfast", items: "Lemon Cake · 180g", kcal: "560 CAL" },
                      { meal: "Lunch", items: "Chicken + Rice", kcal: "720 CAL" },
                      { meal: "Dinner", items: "No items logged", kcal: "" },
                    ].map((row, i) => (
                      <div key={i} className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.04]">
                        <div>
                          <p className="text-[11px] font-medium text-white/80">{row.meal}</p>
                          <p className="text-[10px] text-white/35">{row.items}</p>
                        </div>
                        {row.kcal && (
                          <span className="text-[10px] text-white/50">{row.kcal}</span>
                        )}
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-2"
                          style={{ background: "rgba(205,251,80,0.15)", color: "#cdff50" }}
                        >+</span>
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
                <div className="flex-1 flex items-center justify-center px-5 pt-10 pb-4">
                  <div className="w-full max-w-[240px] space-y-2.5">
                    <div className="flex justify-end">
                      <div
                        className="rounded-2xl rounded-br-sm px-3.5 py-2 text-[12px] font-medium text-black max-w-[80%] leading-snug"
                        style={{ background: "#cdff50" }}
                      >
                        Should I push squats today or rest legs?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-sm px-3.5 py-2 text-[12px] text-white/75 max-w-[88%] leading-snug"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        You squatted heavy Tuesday and only slept 6h. Keep legs light — mobility + a Z2 walk. Hit squats Friday when you&apos;re recovered.
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="rounded-2xl rounded-br-sm px-3.5 py-2 text-[12px] font-medium text-black max-w-[70%] leading-snug"
                        style={{ background: "#cdff50" }}
                      >
                        What should I eat? Need 200g protein.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl rounded-bl-sm px-3.5 py-2 text-[12px] text-white/75 max-w-[88%] leading-snug"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        You&apos;ve hit 142g so far. Add Greek yogurt (17g) + 6oz chicken (38g) to close the gap.
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

              {/* Card 3: Workout tracking — mirrors newworkout.png */}
              <BentoCard id="workout" tall>
                <div className="flex-1 flex items-center justify-center px-5 pt-10 pb-4 overflow-hidden">
                  <div className="w-full max-w-[220px] rounded-[32px] overflow-hidden border border-white/[0.08]" style={{ background: "#0a0a0a", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)" }}>
                    {/* Header */}
                    <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
                      <div>
                        <p className="text-[10px] text-white/40">New Workout · 0:23</p>
                        <p className="text-[12px] font-semibold text-white">Bench Press</p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "#cdff50", color: "#000" }}
                      >
                        Record
                      </span>
                    </div>
                    {/* Column headers */}
                    <div className="px-4 py-1.5 grid grid-cols-4 gap-1 border-b border-white/[0.04]">
                      {["SET", "REPS", "KG", "DONE"].map((h) => (
                        <span key={h} className="text-[9px] text-white/30 text-center">{h}</span>
                      ))}
                    </div>
                    {/* Set rows */}
                    {[
                      { set: 1, reps: 12, kg: 60, done: true },
                      { set: 2, reps: 10, kg: 70, done: true },
                      { set: 3, reps: 8, kg: 80, done: false },
                    ].map((row) => (
                      <div key={row.set} className="px-4 py-2 grid grid-cols-4 gap-1 border-b border-white/[0.04]">
                        <span className="text-[11px] text-white/50 text-center">{row.set}</span>
                        <span className="text-[11px] text-white/80 text-center">{row.reps}</span>
                        <span className="text-[11px] text-white/80 text-center">{row.kg}</span>
                        <span className="flex justify-center">
                          <span
                            className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold"
                            style={{
                              background: row.done ? "#cdff50" : "rgba(255,255,255,0.08)",
                              color: row.done ? "#000" : "transparent",
                            }}
                          >✓</span>
                        </span>
                      </div>
                    ))}
                    {/* Done button */}
                    <div className="px-4 py-3">
                      <div
                        className="w-full py-2 rounded-xl text-center text-[12px] font-semibold text-black"
                        style={{ background: "#cdff50" }}
                      >
                        Done ✓
                      </div>
                    </div>
                  </div>
                </div>
                <CardText
                  icon={Dumbbell}
                  title="Workout tracking"
                  body="Log sets, reps, and PRs. Form tips and demos built right in."
                />
              </BentoCard>

              {/* Card 4: Analytics — mirrors weightscreen.png */}
              <BentoCard id="analytics" tall>
                <div className="flex-1 flex items-center justify-center px-5 pt-10 pb-4 overflow-hidden">
                  <div className="w-full max-w-[220px] rounded-[32px] overflow-hidden border border-white/[0.08]" style={{ background: "#0a0a0a", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)" }}>
                    <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
                      <p className="text-[10px] text-white/40 mb-1">Weight</p>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-[22px] font-semibold text-white">82.4</span>
                        <span className="text-[11px] text-white/40">kg</span>
                        <span
                          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "#cdff50", color: "#000" }}
                        >+ Log</span>
                      </div>
                      <div className="flex gap-3 text-[10px]">
                        <div><span className="text-white/40">START </span><span className="text-white/70">92.0</span></div>
                        <div><span className="text-white/40">LOST </span><span className="text-white/70">9.6 kg</span></div>
                        <div><span className="text-white/40">TARGET </span><span className="text-white/70">78.0</span></div>
                      </div>
                    </div>
                    {/* Chart */}
                    <div className="px-4 py-3">
                      <p className="text-[10px] text-white/40 mb-2">Trends</p>
                      <svg viewBox="0 0 220 55" className="w-full" fill="none">
                        <defs>
                          <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#cdff50" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#cdff50" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          points="0,48 30,44 60,40 90,35 120,30 150,24 180,18 210,14"
                          stroke="#cdff50" strokeWidth="2" fill="none"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                        <polygon
                          points="0,48 30,44 60,40 90,35 120,30 150,24 180,18 210,14 210,55 0,55"
                          fill="url(#wGrad)"
                        />
                        <circle cx="210" cy="14" r="3" fill="#cdff50" />
                      </svg>
                    </div>
                    {/* History rows */}
                    {[
                      { date: "Apr 9", val: "82.4 kg", delta: "-0.3", neg: true },
                      { date: "Apr 7", val: "82.7 kg", delta: "-0.6", neg: true },
                      { date: "Apr 5", val: "83.3 kg", delta: "+0.2", neg: false },
                    ].map((r) => (
                      <div key={r.date} className="px-4 py-2 flex items-center justify-between border-t border-white/[0.04]">
                        <span className="text-[10px] text-white/40">{r.date}</span>
                        <span className="text-[11px] text-white/70">{r.val}</span>
                        <span className="text-[10px]" style={{ color: r.neg ? "#cdff50" : "#f97316" }}>{r.delta}</span>
                      </div>
                    ))}
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
        minHeight: tall ? 460 : 240,
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
