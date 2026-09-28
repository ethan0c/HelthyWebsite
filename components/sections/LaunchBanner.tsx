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
    <div className="relative z-[60] w-full border-b border-line bg-surface">
      <div className="container-page flex items-center justify-center gap-2.5 py-2 pr-10">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <p className="whitespace-nowrap text-center text-[13px] text-fg-muted">
          Helthy is live on iOS & Android.
          <a
            href="/download"
            onClick={handleDownloadClick}
            className="ml-2 font-medium text-fg underline underline-offset-4 decoration-line-strong transition-colors duration-150 hover:decoration-fg"
          >
            Download →
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-fg-subtle transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
      </button>
    </div>
  );
}
