"use client";

import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

export default function LaunchBanner() {
  return (
    <div
      className="relative w-full"
      style={{
        background: "#CDFF50",
      }}
    >
      <div className="container-page flex items-center justify-center gap-2 py-2.5">
        <span
          aria-hidden="true"
          className="inline-block"
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: "#0A0A0A",
          }}
        />
        <p
          className="text-[13px] font-medium tracking-tight text-center"
          style={{ color: "#0A0A0A" }}
        >
          Helthy 2.0 is here — Premium, 30+ achievements, AI insights & more.
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "#0A0A0A" }}
          >
            Download →
          </Link>
        </p>
      </div>
    </div>
  );
}
