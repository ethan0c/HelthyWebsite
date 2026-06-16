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
      className="hidden sm:flex flex-col items-end"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
      }}
    >
      {/* Expanded popover */}
      {expanded && (
        <div
          role="dialog"
          aria-label="Scan to download Helthy"
          className="absolute bottom-full mb-3 right-0"
          style={{
            zIndex: 20,
            padding: 16,
            borderRadius: 18,
            background: "rgba(15,15,15,0.92)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            width: 200,
          }}
        >
          {/* Store tabs */}
          <div
            className="flex gap-1 mb-3"
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: 3,
            }}
          >
            {STORES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStore(s.id)}
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  padding: "4px 0",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 160ms ease, color 160ms ease",
                  background:
                    activeStore === s.id
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                  color:
                    activeStore === s.id
                      ? "rgba(249,249,249,0.95)"
                      : "rgba(249,249,249,0.45)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* QR image */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 12,
              background: "#fff",
              padding: 10,
            }}
          >
            <Image
              src={active.qr}
              alt={active.alt}
              width={148}
              height={148}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <p
            className="text-center mt-3"
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "rgba(249,249,249,0.9)",
              fontFamily: "var(--font-body)",
            }}
          >
            Scan to download
          </p>
          <p
            className="text-center mt-1"
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "rgba(249,249,249,0.5)",
              fontFamily: "var(--font-body)",
            }}
          >
            Available free on iOS & Android
          </p>

          {/* Pointer notch */}
          <span
            aria-hidden="true"
            className="absolute right-8"
            style={{
              bottom: -6,
              width: 12,
              height: 12,
              rotate: "45deg",
              background: "rgba(15,15,15,0.92)",
              borderRight: "1px solid rgba(255,255,255,0.12)",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>
      )}

      {/* Always-visible small chip */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label="Show QR code to download Helthy"
        className="group flex items-center gap-3 hover:scale-[1.02]"
        style={{
          padding: 8,
          borderRadius: 16,
          background: "rgba(20,20,20,0.62)",
          border: "1.5px solid rgba(46,46,48,0.9)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06)," +
            "0 8px 24px rgba(0,0,0,0.3)",
          transition:
            "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            background: "#fff",
            padding: 4,
            flexShrink: 0,
          }}
        >
          <Image
            src={STORES[0].qr}
            alt=""
            aria-hidden="true"
            width={30}
            height={30}
            style={{ width: "100%", height: "100%" }}
          />
        </span>
        <span className="pr-2 flex flex-col text-left justify-center">
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              lineHeight: "1.2em",
              letterSpacing: "-0.005em",
              color: "rgba(249,249,249,0.9)",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
            }}
          >
            Scan to download
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "1.2em",
              color: "rgba(249,249,249,0.5)",
              fontFamily: "var(--font-body)",
              marginTop: 2,
              whiteSpace: "nowrap",
            }}
          >
            iOS & Android
          </span>
        </span>
      </button>
    </div>
  );
}
