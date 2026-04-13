"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function LaunchBanner() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #CDFF50 0%, #b8f030 50%, #CDFF50 100%)",
        zIndex: 60,
      }}
    >
      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "banner-shimmer 3s ease-in-out infinite",
        }}
      />

      <Link
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2"
      >
        <Sparkles
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          style={{ color: "#151515" }}
          strokeWidth={2.5}
        />
        <span
          className="text-[12px] sm:text-[13px] font-semibold tracking-tight"
          style={{ color: "#151515" }}
        >
          Helthy 2.0 is here — Premium, 30+ achievements, AI insights & more
        </span>
        <span
          className="hidden sm:inline text-[12px] font-medium ml-1"
          style={{ color: "rgba(21,21,21,0.6)" }}
        >
          Download now &rarr;
        </span>
      </Link>

      <style jsx>{`
        @keyframes banner-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
