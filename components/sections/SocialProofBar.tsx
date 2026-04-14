"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote: "First tracker that actually stuck.",
    name: "Marcus T.",
  },
  {
    quote: "The AI coach is genuinely useful.",
    name: "Sarah K.",
  },
  {
    quote: "Logging a meal takes 3 seconds.",
    name: "James R.",
  },
  {
    quote: "Better than MyFitnessPal for me.",
    name: "Priya M.",
  },
  {
    quote: "My PT wants her whole gym on it.",
    name: "Olivia W.",
  },
];

export default function SocialProofBar() {
  return (
    <section className="relative py-10 border-y border-white/[0.06] overflow-hidden">
      {/* Scrolling marquee of mini reviews */}
      <div className="flex items-center gap-8 animate-marquee" style={{ "--marquee-duration": "40s" } as React.CSSProperties}>
        {[...REVIEWS, ...REVIEWS].map((r, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3 h-3" fill="#CDFF50" stroke="none" />
              ))}
            </div>
            <span className="text-[13px] text-white/70 font-light">
              &ldquo;{r.quote}&rdquo;
            </span>
            <span className="text-[11px] text-white/35">
              — {r.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
