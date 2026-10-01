"use client";

/**
 * Inline "scan to download" QR card for the hero. Desktop only — phone users
 * just tap the store button, so this is gated behind (pointer: fine) and a
 * wider viewport via the `hidden sm:` + JS pointer check.
 *
 * Small card is always visible; clicking it expands a larger, easier-to-scan
 * QR in a popover anchored above the card. The static PNGs live at
 * /public/qr-appstore.png and /public/qr-playstore.png.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useSegmentedThumb } from "@/components/ui/Segmented";

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

export default function FloatingQRCode() {
  const [finePointer, setFinePointer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeStore, setActiveStore] = useState<"ios" | "android">("ios");
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabsRef = useSegmentedThumb<HTMLDivElement>();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!finePointer || !wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        y: 15,
        opacity: 0,
        duration: 0.7,
        delay: 0.6,
        ease: "power3.out",
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [finePointer]);

  // Listen for external open requests (e.g. from pricing buttons).
  useEffect(() => {
    const onOpen = () => setExpanded(true);
    window.addEventListener("helthy:qr-open", onOpen);
    return () => window.removeEventListener("helthy:qr-open", onOpen);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  if (!finePointer) return null;

  const active = STORES.find((s) => s.id === activeStore)!;

  return (
    <div
      ref={wrapRef}
      className="hidden sm:flex flex-col items-end fixed bottom-6 right-6 z-40"
    >
      {/* Expanded popover */}
      {expanded && (
        <div
          role="dialog"
          aria-label="Scan to download Helthy"
          className="absolute bottom-full right-0 z-20 mb-3 w-[208px] rounded-2xl border border-line bg-surface p-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
        >
          {/* Store tabs */}
          <div ref={tabsRef} className="segmented mb-3 w-full" role="group" aria-label="Store">
            {STORES.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={activeStore === s.id}
                onClick={() => setActiveStore(s.id)}
                style={{ height: 28, padding: "0 8px", fontSize: 12 }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* QR image. White plate is functional: scanners need the contrast. */}
          <div className="aspect-square w-full rounded-xl bg-white p-2.5">
            <Image
              src={active.qr}
              alt={active.alt}
              width={148}
              height={148}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <p className="mt-3 text-center text-[13px] font-medium text-fg">Scan to download</p>
          <p className="mt-1 text-center text-[12px] text-fg-subtle">
            Available free on iOS & Android
          </p>

          {/* Pointer notch */}
          <span
            aria-hidden="true"
            className="absolute -bottom-[6.5px] right-8 h-3 w-3 rotate-45 border-b border-r border-line bg-surface"
          />
        </div>
      )}

      {/* Always-visible small chip */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label="Show QR code to download Helthy"
        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 hover:border-line-strong hover:bg-surface-2"
      >
        {/* White plate is functional: scanners need the contrast. */}
        <span className="h-[38px] w-[38px] shrink-0 rounded-lg bg-white p-1">
          <Image
            src={STORES[0].qr}
            alt=""
            aria-hidden="true"
            width={30}
            height={30}
            style={{ width: "100%", height: "100%" }}
          />
        </span>
        <span className="flex flex-col justify-center pr-2 text-left">
          <span className="whitespace-nowrap text-[13px] font-medium leading-tight text-fg">
            Scan to download
          </span>
          <span className="mt-0.5 whitespace-nowrap text-[12px] leading-tight text-fg-subtle">
            iOS & Android
          </span>
        </span>
      </button>
    </div>
  );
}
