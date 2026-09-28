"use client";

/**
 * Desktop answer to "Download": a centered popup with a QR code per store,
 * since a desktop visitor can't install the app on the computer itself.
 * Nothing renders until a Download button fires `helthy:qr-open` (see
 * lib/download.ts, which only does that on a fine pointer; phones go
 * straight to the store instead).
 *
 * The static PNGs live at /public/qr-appstore.png and /public/qr-playstore.png.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const STORES = [
  {
    id: "ios",
    label: "App Store",
    qr: "/qr-appstore.png",
    alt: "QR code linking to Helthy on the App Store",
  },
  {
    id: "android",
    label: "Google Play",
    qr: "/qr-playstore.png",
    alt: "QR code linking to Helthy on Google Play",
  },
] as const;

export default function DownloadQRDialog() {
  const [open, setOpen] = useState(false);
  const [activeStore, setActiveStore] = useState<"ios" | "android">("ios");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("helthy:qr-open", onOpen);
    return () => window.removeEventListener("helthy:qr-open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Focus moves into the dialog, then back to the button that opened it
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  if (!open) return null;

  const active = STORES.find((s) => s.id === activeStore)!;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-canvas/70 p-4 animate-in fade-in duration-150"
      onMouseDown={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Scan to download Helthy"
        className="relative w-[280px] rounded-3xl border border-line bg-surface p-5 animate-in zoom-in-95 duration-150"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-title pr-8">Scan to download</p>
        <p className="mt-1 text-[13px] text-fg-subtle">Free on iOS & Android</p>

        {/* Store tabs */}
        <div className="segmented mt-4 w-full" role="group" aria-label="Store">
          {STORES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={activeStore === s.id}
              onClick={() => setActiveStore(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* QR image. White plate is functional: scanners need the contrast. */}
        <div className="mt-4 aspect-square w-full rounded-2xl bg-white p-3">
          <Image
            src={active.qr}
            alt={active.alt}
            width={220}
            height={220}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <p className="mt-4 text-center text-[13px] text-fg-muted">
          Point your phone&apos;s camera at the code.
        </p>
      </div>
    </div>
  );
}
