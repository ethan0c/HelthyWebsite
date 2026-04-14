"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUp } from "lucide-react";

type MealSuggestion = {
  name: string;
  quantity: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
};

type AIReply = {
  text: string;
  meals?: MealSuggestion[];
};

type Turn = {
  user: string;
  ai: AIReply;
};

const CONVERSATIONS: Turn[] = [
  {
    user: "Am I eating enough protein this week?",
    ai: {
      text:
        "You're averaging **118g / day** over the past 7 days — about 62g short of your 180g goal. Your biggest drop is on rest days. Want a few high-protein meals?",
    },
  },
  {
    user: "Suggest a high-protein dinner under 600 kcal",
    ai: {
      text: "Here are 2 options that fit your macros for tonight:",
      meals: [
        {
          name: "Grilled chicken + jasmine rice",
          quantity: "200g chicken · 150g rice",
          kcal: 560,
          p: 48,
          c: 58,
          f: 9,
        },
        {
          name: "Salmon + sweet potato",
          quantity: "180g salmon · 200g sweet potato",
          kcal: 540,
          p: 42,
          c: 46,
          f: 16,
        },
      ],
    },
  },
  {
    user: "Should I push squats today or rest legs?",
    ai: {
      text:
        "You squatted heavy on Tuesday and your sleep dropped to **6h** last night. Keep legs light today — mobility + a Z2 walk. Push squats Friday when you're recovered.",
    },
  },
  {
    user: "What's slowing my progress?",
    ai: {
      text:
        "Looking at the last 30 days: your protein is **18% below target** and weekly steps dropped by 3,400. Fix those two and the weight trend should move again.",
    },
  },
];

const HOLD_MS = 5500;

export default function AICoachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "sent" | "thinking" | "replied">("typing");
  const [typedText, setTypedText] = useState("");

  const currentTurn = CONVERSATIONS[turnIndex];

  useEffect(() => {
    const question = currentTurn.user;
    let charIndex = 0;
    let typeTimer: ReturnType<typeof setInterval> | null = null;
    let phaseTimer: ReturnType<typeof setTimeout> | null = null;

    setPhase("typing");
    setTypedText("");

    typeTimer = setInterval(() => {
      charIndex += 1;
      setTypedText(question.slice(0, charIndex));
      if (charIndex >= question.length) {
        if (typeTimer) clearInterval(typeTimer);
        phaseTimer = setTimeout(() => {
          setPhase("sent");
          phaseTimer = setTimeout(() => {
            setPhase("thinking");
            phaseTimer = setTimeout(() => {
              setPhase("replied");
              phaseTimer = setTimeout(() => {
                setTurnIndex((i) => (i + 1) % CONVERSATIONS.length);
              }, HOLD_MS);
            }, 900);
          }, 450);
        }, 600);
      }
    }, 35);

    return () => {
      if (typeTimer) clearInterval(typeTimer);
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, [turnIndex, currentTurn.user]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-ai-hero]", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(205,255,80,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl flex flex-col items-center text-center">
        <div data-ai-hero className="mb-8">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M22 2 L24.5 17.5 L40 22 L24.5 26.5 L22 42 L19.5 26.5 L4 22 L19.5 17.5 Z"
              fill="url(#aiStarGrad)"
            />
            <defs>
              <radialGradient id="aiStarGrad" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#CDFF50" />
                <stop offset="100%" stopColor="#7bff6a" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <h2
          data-ai-hero
          className="text-display-xl font-heading font-light tracking-tight text-white mb-6"
        >
          <span className="text-italics text-helthy-lemon">Ask</span> anything.
        </h2>

        <p
          data-ai-hero
          className="text-base text-white/60 leading-relaxed max-w-md mb-14 font-light"
        >
          Helthy AI turns your questions into answers you can trust —
          personalised advice, grounded in your data, delivered instantly.
        </p>

        {/* Live chat canvas */}
        <div data-ai-hero className="w-full space-y-4">
          {/* Input bar with live typing */}
          <div
            className="w-full rounded-2xl flex items-center gap-3 px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="flex-1 text-left text-[15px] text-white/85 min-h-[20px]">
              {typedText}
              {phase === "typing" && (
                <span className="inline-block w-[2px] h-[16px] bg-white/70 ml-0.5 align-middle animate-pulse" />
              )}
            </span>
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background:
                  phase !== "typing" ? "#CDFF50" : "rgba(255,255,255,0.12)",
              }}
              aria-label="Send"
            >
              <ArrowUp
                className="w-4 h-4"
                style={{ color: phase !== "typing" ? "#000" : "#fff" }}
              />
            </button>
          </div>

          {/* User bubble */}
          {phase !== "typing" && (
            <div className="flex justify-end">
              <div
                className="rounded-2xl rounded-br-md px-4 py-2.5 text-[14px] font-medium text-black max-w-[85%] text-left"
                style={{
                  background: "#CDFF50",
                  animation: "aiFadeIn 0.3s ease-out",
                }}
              >
                {currentTurn.user}
              </div>
            </div>
          )}

          {/* Thinking dots */}
          {phase === "thinking" && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 px-2 py-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    style={{
                      animation: `aiDot 1.2s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* AI reply — bare text, ChatGPT/Claude-style */}
          {phase === "replied" && (
            <div className="flex justify-start">
              <div
                className="max-w-[95%] text-left"
                style={{ animation: "aiFadeIn 0.4s ease-out" }}
              >
                <p
                  className="text-[15px] text-white/85 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: currentTurn.ai.text.replace(
                      /\*\*(.+?)\*\*/g,
                      '<strong class="text-white font-semibold">$1</strong>'
                    ),
                  }}
                />

                {currentTurn.ai.meals && (
                  <div className="mt-4 space-y-2">
                    {currentTurn.ai.meals.map((meal) => (
                      <MealCard key={meal.name} meal={meal} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes aiFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes aiDot {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

function MealCard({ meal }: { meal: MealSuggestion }) {
  return (
    <div
      className="rounded-2xl p-3.5 flex items-center gap-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(205,255,80,0.12)" }}
      >
        <span className="text-base">🍽️</span>
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className="text-[13px] font-semibold text-white truncate">
          {meal.name}
        </p>
        <p className="text-[11px] text-white/45 truncate">{meal.quantity}</p>
      </div>

      <div className="hidden sm:flex items-center gap-1">
        <MacroPill label="P" value={meal.p} />
        <MacroPill label="C" value={meal.c} />
        <MacroPill label="F" value={meal.f} />
      </div>

      <div
        className="flex items-center gap-1 px-2 py-1 rounded-md flex-shrink-0"
        style={{ background: "rgba(205,255,80,0.12)" }}
      >
        <span className="text-[11px] font-semibold" style={{ color: "#CDFF50" }}>
          {meal.kcal} kcal
        </span>
      </div>
    </div>
  );
}

function MacroPill({ label, value }: { label: string; value: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white/75"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      {value}
      <span className="opacity-60">{label}</span>
    </span>
  );
}
