"use client";

import { useEffect, useState } from "react";
import { handleDownloadClick } from "@/lib/download";
import { X } from "lucide-react";

const STORAGE_KEY = "helthy-launch-banner-dismissed";

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
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setVisible(!dismissed);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("helthy:banner", { detail: { visible } })
    );
  }, [visible]);

  // Dismissing collapses the bar first, so the nav and page slide up
  // instead of jumping; it unmounts once the collapse has finished.
  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setClosing(true);
  };

  if (!visible) return null;

  return (
    <div
      onTransitionEnd={(e) => {
        if (closing && e.target === e.currentTarget) setVisible(false);
      }}
      className={`relative z-[60] grid w-full bg-accent transition-[grid-template-rows] duration-300 ease-out ${
        closing ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
      }`}
    >
      <div className="relative min-h-0 overflow-hidden">
        <div className="container-page flex items-center justify-center gap-2.5 py-2 pr-10">
          <p className="whitespace-nowrap text-center text-[13px] text-on-accent">
            Helthy is live on iOS & Android.
            <a
              href="/download"
              onClick={handleDownloadClick}
              className="ml-2 font-semibold text-on-accent underline underline-offset-4 decoration-on-accent/40 transition-colors duration-150 hover:decoration-on-accent focus-visible:outline-on-accent"
            >
              Download →
            </a>
          </p>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-on-accent/70 transition-colors duration-150 hover:bg-on-accent/10 hover:text-on-accent focus-visible:outline-on-accent"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
