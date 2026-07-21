"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HelthyLogoGlass from "@/components/ui/HelthyLogoGlass";

/**
 * HeroAIDemo — interactive AI-chat demo under the hero CTAs.
 * Type (or tap a prompt) → thinking → reply streams in → meal suggestion
 * cards render, styled to match the mobile app's AIChatMealSuggestions.
 * Entirely canned — no backend.
 */

// Real tokens from mobile (utils/macroIcons.ts + dark theme)
const MACRO = {
  calories: "#FF6B6B",
  protein: "#4CAF50",
  carbs: "#2196F3",
  fats: "#FF9800",
};
const LEMON = "#CDFF50";

interface DemoMeal {
  emoji: string;
  name: string;
  desc: string;
  cal: number;
  p: number;
  c: number;
  f: number;
}

interface Demo {
  chip: string;
  keywords: RegExp;
  reply: string;
  meals: DemoMeal[];
}

const DEMOS: Demo[] = [
  {
    chip: "Dinner, high protein",
    keywords: /dinner|protein|lift|gym|bulk/i,
    reply:
      "You're 52g short of your protein goal with one meal left. Either of these closes the gap:",
    meals: [
      {
        emoji: "🍗",
        name: "Garlic Chicken & Rice Bowl",
        desc: "Pan-seared thighs, jasmine rice, charred broccoli.",
        cal: 620, p: 52, c: 58, f: 16,
      },
      {
        emoji: "🐟",
        name: "Salmon + Sweet Potato Plate",
        desc: "Roasted salmon, mashed sweet potato, greens.",
        cal: 560, p: 43, c: 41, f: 22,
      },
    ],
  },
  {
    chip: "Breakfast under 400 cal",
    keywords: /breakfast|morning|egg|oats|yogurt/i,
    reply:
      "Under 400 calories, over 25g protein, and nothing takes more than 10 minutes:",
    meals: [
      {
        emoji: "🥣",
        name: "Greek Yogurt Power Bowl",
        desc: "2% Greek yogurt, granola, blueberries, honey.",
        cal: 380, p: 32, c: 41, f: 9,
      },
      {
        emoji: "🍳",
        name: "3-Egg Spinach Scramble",
        desc: "Eggs, spinach, feta, on sourdough thin.",
        cal: 340, p: 28, c: 16, f: 20,
      },
    ],
  },
  {
    chip: "Late-night snack",
    keywords: /snack|night|late|sweet|craving/i,
    reply:
      "You have 210 calories left today. These fit without touching tomorrow:",
    meals: [
      {
        emoji: "🫐",
        name: "Cottage Cheese + Berries",
        desc: "Whipped cottage cheese, mixed berries, cinnamon.",
        cal: 160, p: 19, c: 14, f: 3,
      },
      {
        emoji: "🍫",
        name: "Chocolate Protein Pudding",
        desc: "Casein, cocoa, almond milk — sets in 5 min.",
        cal: 190, p: 24, c: 11, f: 4,
      },
    ],
  },
];

type Phase = "idle" | "thinking" | "streaming" | "done";

export default function HeroAIDemo() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [demo, setDemo] = useState<Demo | null>(null);
  const [typedReply, setTypedReply] = useState("");
  const [visibleCards, setVisibleCards] = useState(0);
  const [logged, setLogged] = useState<Set<number>>(new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (text: string) => {
      const query = text.trim();
      if (!query) return;
      clearTimers();

      const matched =
        DEMOS.find((d) => d.keywords.test(query)) ?? DEMOS[0];

      setDemo(matched);
      setInput("");
      setTypedReply("");
      setVisibleCards(0);
      setLogged(new Set());
      setPhase("thinking");

      const schedule = (fn: () => void, ms: number) => {
        timersRef.current.push(setTimeout(fn, ms));
      };

      // thinking → stream the reply → stagger the cards
      schedule(() => {
        setPhase("streaming");
        const reply = matched.reply;
        const CHAR_MS = 14;
        for (let i = 1; i <= reply.length; i++) {
          schedule(() => setTypedReply(reply.slice(0, i)), i * CHAR_MS);
        }
        const afterReply = reply.length * CHAR_MS + 200;
        matched.meals.forEach((_, idx) => {
          schedule(() => setVisibleCards(idx + 1), afterReply + idx * 220);
        });
        schedule(
          () => setPhase("done"),
          afterReply + matched.meals.length * 220,
        );
      }, 1100);
    },
    [clearTimers],
  );

  const toggleLog = (idx: number) => {
    setLogged((prev) => {
      const next = new Set(prev);
      if (!next.has(idx)) next.add(idx);
      return next;
    });
  };

  const busy = phase === "thinking" || phase === "streaming";

  return (
    <div
      className="w-full text-left"
      style={{ maxWidth: 560, marginTop: "clamp(32px, 4.5vh, 52px)" }}
    >
      {/* Panel */}
      <div
        className="rounded-3xl backdrop-blur-md overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 24px 60px -24px rgba(0,0,0,0.6)",
        }}
      >
        {/* Input row */}
        <form
          className="flex items-center gap-2"
          style={{ padding: "10px 10px 10px 18px" }}
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
        >
          <HelthyLogoGlass size={22} className="flex-shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Helthy for meal ideas…"
            aria-label="Ask Helthy AI for meal ideas"
            className="flex-1 bg-transparent outline-none"
            style={{
              fontSize: 15,
              color: "rgba(249,249,249,0.92)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={busy || !input.trim()}
            className="flex items-center justify-center rounded-full flex-shrink-0 transition-opacity"
            style={{
              width: 34,
              height: 34,
              background: LEMON,
              opacity: busy || !input.trim() ? 0.35 : 1,
              cursor: busy || !input.trim() ? "default" : "pointer",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="#0B0B0B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* Prompt chips — hidden once a response is showing */}
        {phase === "idle" && (
          <div
            className="flex flex-wrap gap-2"
            style={{ padding: "0 18px 16px" }}
          >
            {DEMOS.map((d) => (
              <button
                key={d.chip}
                type="button"
                onClick={() => run(d.chip)}
                className="rounded-full transition-colors hover:border-white/30"
                style={{
                  padding: "6px 13px",
                  fontSize: 13,
                  color: "rgba(249,249,249,0.65)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                {d.chip}
              </button>
            ))}
          </div>
        )}

        {/* Response area */}
        {phase !== "idle" && demo && (
          <div
            aria-live="polite"
            style={{
              padding: "4px 18px 18px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Thinking dots */}
            {phase === "thinking" && (
              <div className="flex items-center gap-2.5" style={{ padding: "14px 0 10px" }}>
                <span className="flex gap-1.5" aria-label="Helthy is thinking">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="rounded-full animate-pulse"
                      style={{
                        width: 6,
                        height: 6,
                        background: LEMON,
                        animationDelay: `${i * 180}ms`,
                      }}
                    />
                  ))}
                </span>
                <span style={{ fontSize: 13, color: "rgba(249,249,249,0.5)" }}>
                  Helthy is thinking…
                </span>
              </div>
            )}

            {/* Streamed reply */}
            {phase !== "thinking" && (
              <p
                style={{
                  fontSize: 14,
                  lineHeight: "1.5em",
                  color: "rgba(249,249,249,0.8)",
                  padding: "12px 0 4px",
                  margin: 0,
                  fontFamily: "var(--font-body)",
                }}
              >
                {typedReply}
                {phase === "streaming" && typedReply.length < demo.reply.length && (
                  <span
                    className="inline-block animate-pulse"
                    style={{ width: 7, height: 14, background: LEMON, marginLeft: 2, verticalAlign: "-2px" }}
                  />
                )}
              </p>
            )}

            {/* Suggestion cards — mirror mobile AIChatMealSuggestions */}
            {demo.meals.map((meal, idx) => (
              <div
                key={meal.name}
                className="rounded-2xl transition-all duration-500"
                style={{
                  marginTop: 10,
                  padding: "12px 14px",
                  background: "rgba(42,42,42,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: idx < visibleCards ? 1 : 0,
                  transform: idx < visibleCards ? "translateY(0)" : "translateY(10px)",
                  pointerEvents: idx < visibleCards ? "auto" : "none",
                }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 22, lineHeight: "28px" }} aria-hidden="true">
                    {meal.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: 0 }}
                    >
                      {meal.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.55)",
                        margin: "2px 0 8px",
                        lineHeight: "1.35em",
                      }}
                    >
                      {meal.desc}
                    </p>
                    {/* Macro pills + calorie badge */}
                    <div className="flex items-center flex-wrap gap-1.5">
                      <MacroPill value={meal.p} label="P" color={MACRO.protein} />
                      <MacroPill value={meal.c} label="C" color={MACRO.carbs} />
                      <MacroPill value={meal.f} label="F" color={MACRO.fats} />
                      <span
                        className="inline-flex items-center gap-1 rounded-full"
                        style={{
                          padding: "3px 8px",
                          background: `${MACRO.calories}15`,
                        }}
                      >
                        <FlameIcon color={MACRO.calories} />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: MACRO.calories,
                            fontFamily: "var(--font-numeric)",
                          }}
                        >
                          {meal.cal}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Log button — lemon plus → check, like the app */}
                  <button
                    type="button"
                    onClick={() => toggleLog(idx)}
                    aria-label={logged.has(idx) ? `${meal.name} logged` : `Log ${meal.name}`}
                    className="flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 12,
                      background: logged.has(idx) ? `${LEMON}33` : LEMON,
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    {logged.has(idx) ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke={LEMON} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="#0B0B0B" strokeWidth="2.4" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Reset hint */}
            {phase === "done" && (
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(249,249,249,0.4)",
                  margin: "12px 0 0",
                  textAlign: "center",
                }}
              >
                A taste of Helthy AI — the real thing knows your goals, logs, and history.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Small shared bits ──────────────────────────────────────

function MacroPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full"
      style={{ padding: "3px 9px", gap: 2, background: `${color}10` }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          fontFamily: "var(--font-numeric)",
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 9, fontWeight: 700, color }}>{label}</span>
    </span>
  );
}

function FlameIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 256 256" fill={color} aria-hidden="true">
      <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.25L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
    </svg>
  );
}
