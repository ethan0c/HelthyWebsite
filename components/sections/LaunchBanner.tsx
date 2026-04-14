"use client";

import Link from "next/link";

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
          Helthy 2.0 lands April 28.
          <Link
            href="/#pricing"
            className="ml-2 underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "#0A0A0A" }}
          >
            Be first in line →
          </Link>
        </p>
      </div>
    </div>
  );
}
