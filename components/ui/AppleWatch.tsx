import Image from "next/image";
import { Check, CheckCircle2, Timer } from "lucide-react";

/**
 * Apple Watch mockup showing Helthy's live strength-workout screen.
 *
 * The screen is a copy of WorkoutMirrorView in
 * helthy_app/mobile/ios/HelthyWatch Watch App/: same layout, strings,
 * colors (WatchDesign.swift) and fonts. It is laid out in watch points on a
 * 208-pt-wide canvas (46mm Series screen) and scaled up to fit the frame.
 */

const C = {
  bg: "#0A0A0A",
  card: "#181818",
  accent: "#CDFB50",
  text: "#FFFFFF",
  secondary: "#9CA3AF",
  tertiary: "#555555",
  track: "rgba(255,255,255,0.12)",
};

const SETS = [
  { reps: 10, weight: 135, done: true },
  { reps: 8, weight: 155, done: true },
  { reps: 8, weight: 165, done: false },
];

const num = { fontFamily: "var(--font-heading)", fontWeight: 500, fontVariantNumeric: "tabular-nums" } as const;
const label = (bold: boolean) =>
  ({ fontFamily: "var(--font-body)", fontWeight: bold ? 700 : 500 }) as const;

function WorkoutScreen() {
  const activeIndex = SETS.findIndex((s) => !s.done);
  return (
    <div
      style={{ width: 208, height: 280, background: C.bg, color: C.text, padding: "10px 12px 0" }}
      className="flex flex-col overflow-hidden"
    >
      {/* Top bar: wordmark + elapsed */}
      <div className="flex items-center justify-between" style={{ gap: 8, paddingTop: 2 }}>
        <Image src="/logos/logo-long-white.png" alt="" width={51} height={10} style={{ height: 10, width: "auto" }} />
        <span style={{ ...num, fontSize: 12, color: C.accent }}>24:37</span>
      </div>

      {/* Header */}
      <div className="flex flex-col" style={{ gap: 3, marginTop: 8 }}>
        <span style={{ ...label(true), fontSize: 10, color: C.tertiary, letterSpacing: 0.5 }}>Exercise 2 of 5</span>
        <span style={{ ...label(true), fontSize: 17, lineHeight: 1.15 }}>Barbell Bench Press</span>
        <div style={{ height: 5, borderRadius: 999, background: C.track, marginTop: 2 }}>
          <div style={{ width: "20%", height: "100%", borderRadius: 999, background: C.accent }} />
        </div>
      </div>

      {/* Set rows */}
      <div className="flex flex-col" style={{ gap: 6, marginTop: 10 }}>
        {SETS.map((s, i) => {
          const active = i === activeIndex;
          return (
            <div
              key={i}
              className="flex items-center"
              style={{
                gap: 8,
                padding: "7px 10px",
                borderRadius: 10,
                background: active ? "rgba(205,251,80,0.14)" : C.card,
                boxShadow: active ? "inset 0 0 0 1px rgba(205,251,80,0.5)" : undefined,
              }}
            >
              <span
                style={{ ...num, fontSize: 13, width: 20, color: s.done ? C.accent : active ? C.text : C.secondary }}
              >
                {i + 1}
              </span>
              <span
                className="flex-1"
                style={{ ...label(active), fontSize: 13, color: s.done ? C.secondary : C.text }}
              >
                {s.reps} reps × {s.weight} lb
              </span>
              {s.done && <CheckCircle2 size={15} color={C.bg} fill={C.accent} strokeWidth={2.5} />}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col" style={{ gap: 6, marginTop: 8 }}>
        <div
          className="flex items-center justify-center"
          style={{ gap: 6, padding: "10px 0", borderRadius: 999, background: C.accent, color: "#000" }}
        >
          <Check size={15} strokeWidth={3} />
          <span style={{ ...label(true), fontSize: 15 }}>Complete Set</span>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ gap: 6, padding: "9px 0", borderRadius: 999, background: C.card }}
        >
          <Timer size={14} strokeWidth={2.5} />
          <span style={{ ...label(false), fontSize: 14 }}>Start Rest</span>
        </div>
      </div>
    </div>
  );
}

/** Watch case drawn in CSS. `width` is the case width in px. */
export default function AppleWatch({ width = 300 }: { width?: number }) {
  const caseH = width * 1.25;
  const inset = width * 0.07;
  const screenW = width - inset * 2;
  const scale = screenW / 208;

  return (
    <div
      role="img"
      aria-label="Helthy on Apple Watch: a live bench press workout with completed sets, the current set and a Complete Set button"
      className="relative mx-auto"
      style={{ width: width + width * 0.06, height: caseH + width * 0.5 }}
    >
      {/* Band stubs */}
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute"
          style={{
            width: width * 0.72,
            height: width * 0.36,
            [i === 0 ? "top" : "bottom"]: 0,
            left: width * 0.14,
            borderRadius: i === 0 ? "18px 18px 0 0" : "0 0 18px 18px",
            background:
              i === 0
                ? "linear-gradient(to top, #1f1f22, rgba(31,31,34,0))"
                : "linear-gradient(to bottom, #1f1f22, rgba(31,31,34,0))",
          }}
        />
      ))}

      {/* Case */}
      <div
        className="absolute left-0"
        style={{
          top: width * 0.25,
          width,
          height: caseH,
          borderRadius: width * 0.26,
          padding: inset,
          background: "linear-gradient(145deg, #3a3a3e 0%, #1c1c1f 45%, #0e0e10 100%)",
          boxShadow:
            // Device shading only; no drop shadow or glow around the mockup.
            "inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.6)",
        }}
      >
        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: width * 0.2, background: C.bg, boxShadow: "0 0 0 2px #000" }}
        >
          <div style={{ width: 208, height: 280, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <WorkoutScreen />
          </div>
        </div>

        {/* Digital crown + side button */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            right: -width * 0.045,
            top: caseH * 0.22,
            width: width * 0.06,
            height: caseH * 0.16,
            borderRadius: 6,
            background: "repeating-linear-gradient(to bottom, #3b3b40 0 2px, #202024 2px 4px)",
            boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            right: -width * 0.02,
            top: caseH * 0.5,
            width: width * 0.03,
            height: caseH * 0.2,
            borderRadius: 4,
            background: "linear-gradient(to right, #2b2b2f, #18181b)",
          }}
        />
      </div>
    </div>
  );
}
