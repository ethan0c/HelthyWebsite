import Image from "next/image";
import { Check, CheckCircle2, Heart, Timer } from "lucide-react";

/**
 * Helthy's Apple Watch screens, rendered live (no screenshots). They're shown
 * inside the photographic watch in DeviceFrame, scaled by WatchScreen.
 *
 * The screens are copies of the views in
 * helthy_app/mobile/ios/HelthyWatch Watch App/: same layout, strings,
 * colors (WatchDesign.swift) and fonts. Each is laid out in watch points on
 * a 208-pt-wide canvas (46mm Series screen) and scaled up to fit the frame.
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
        <Image src="/logos/logo-long-white.png" alt="" width={34} height={10} style={{ height: 10, width: "auto" }} />
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

/**
 * Live outdoor-run screen: the other half of what the watch app does, for
 * pairing next to a strength workout.
 */
function CardioScreen() {
  const stats = [
    { value: "2.41", unit: "mi" },
    { value: "9'42\"", unit: "/mi" },
  ];
  return (
    <div
      style={{ width: 208, height: 280, background: C.bg, color: C.text, padding: "10px 12px 0" }}
      className="flex flex-col overflow-hidden"
    >
      {/* Top bar: wordmark + elapsed */}
      <div className="flex items-center justify-between" style={{ gap: 8, paddingTop: 2 }}>
        <Image src="/logos/logo-long-white.png" alt="" width={34} height={10} style={{ height: 10, width: "auto" }} />
        <span style={{ ...num, fontSize: 12, color: C.accent }}>23:24</span>
      </div>

      <span style={{ ...label(true), fontSize: 10, color: C.tertiary, letterSpacing: 0.5, marginTop: 8 }}>
        Outdoor Run
      </span>

      {/* Heart rate, the one number you glance at mid-run */}
      <div className="flex items-baseline" style={{ gap: 5, marginTop: 6 }}>
        <Heart size={17} color={C.accent} fill={C.accent} strokeWidth={0} />
        <span style={{ ...num, fontSize: 40, lineHeight: 1, color: C.accent }}>152</span>
        <span style={{ ...label(false), fontSize: 12, color: C.secondary }}>bpm</span>
      </div>

      {/* Distance and pace */}
      <div className="flex" style={{ gap: 8, marginTop: 12 }}>
        {stats.map((s) => (
          <div
            key={s.unit}
            className="flex flex-1 flex-col"
            style={{ gap: 1, padding: "8px 10px", borderRadius: 10, background: C.card }}
          >
            <span style={{ ...num, fontSize: 17 }}>{s.value}</span>
            <span style={{ ...label(false), fontSize: 10, color: C.secondary }}>{s.unit}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col" style={{ gap: 1, marginTop: 8 }}>
        <span style={{ ...num, fontSize: 17 }}>286</span>
        <span style={{ ...label(false), fontSize: 10, color: C.secondary }}>calories</span>
      </div>

      {/* Action */}
      <div
        className="flex items-center justify-center"
        style={{
          gap: 6,
          marginTop: "auto",
          marginBottom: 10,
          padding: "10px 0",
          borderRadius: 999,
          background: C.card,
        }}
      >
        <Timer size={14} strokeWidth={2.5} />
        <span style={{ ...label(true), fontSize: 14 }}>Pause</span>
      </div>
    </div>
  );
}

/** Watch screen canvas size in points, and its background. */
export const WATCH_CANVAS = { width: 208, height: 280, background: C.bg };

export const SCREENS = {
  workout: {
    render: WorkoutScreen,
    label:
      "Helthy on Apple Watch: a live bench press workout with completed sets, the current set and a Complete Set button",
  },
  cardio: {
    render: CardioScreen,
    label: "Helthy on Apple Watch: a live outdoor run showing heart rate, distance, pace and calories",
  },
} as const;
