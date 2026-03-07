"use client";

const items = [
  "WORKOUTS",
  "NUTRITION",
  "AI COACH",
  "VOICE LOGGING",
  "BARCODE SCAN",
  "OCR SCANNING",
  "APPLE WATCH",
  "PROGRESS",
  "STREAKS",
  "FREE FOREVER",
];

export default function MarqueeStrip() {
  const row = items.map((t) => (
    <span key={t} className="flex items-center gap-6 whitespace-nowrap">
      <span className="text-sm sm:text-base font-mono font-medium tracking-[0.2em] uppercase text-helthy-lemon/80">
        {t}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-helthy-lemon/40" aria-hidden />
    </span>
  ));

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#060606] py-4 sm:py-5">
      <div
        className="flex gap-6 animate-marquee"
        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
      >
        <div className="flex gap-6 shrink-0">{row}</div>
        <div className="flex gap-6 shrink-0" aria-hidden>{row}</div>
      </div>
    </section>
  );
}
