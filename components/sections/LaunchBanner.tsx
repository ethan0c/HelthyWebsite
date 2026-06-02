"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "helthy-launch-banner-dismissed";

// For now, Pro is iOS-only, so the CTA goes straight to the App Store.
// Post Android launch this should instead scroll to the hero so users can
// pick iOS/Android (with a QR code for desktop visitors) — see
// docs/launch-banner-cta.md.
const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

/**
 * Dismissible launch announcement bar. Sits in normal flow at the very top
 * of the page; the fixed SiteNav is offset down by this bar's height while
 * it's visible. Dismissal is remembered in localStorage.
 *
 * Emits a `helthy:banner` CustomEvent on mount/dismiss so the layout can
 * adjust the nav offset.
 */
export default function LaunchBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setVisible(!dismissed);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("helthy:banner", { detail: { visible } })
    );
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="relative w-full"
      style={{ background: "#CDFF50", zIndex: 60 }}
    >
      <div className="container-page flex items-center justify-center gap-2 py-1.5 pr-10">
        <span
          aria-hidden="true"
          className="relative inline-flex shrink-0"
          style={{ width: 6, height: 6 }}
        >
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "#0A0A0A", opacity: 0.35 }}
          />
          <span
            className="relative rounded-full"
            style={{ width: 6, height: 6, background: "#0A0A0A" }}
          />
        </span>
        <p
          className="text-[12px] sm:text-[13px] font-medium tracking-tight text-center whitespace-nowrap"
          style={{ color: "#0A0A0A" }}
        >
          <span className="hidden sm:inline">Helthy Pro is live on iOS. Android lands June 12.</span>
          <span className="sm:hidden">Pro live on iOS · Android June 12.</span>
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "#0A0A0A" }}
          >
            Get Pro →
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
        style={{ width: 24, height: 24, color: "#0A0A0A" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
