"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#why-helthy", label: "Why Helthy" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative w-full pointer-events-none"
      style={{ paddingTop: "clamp(14px, 2.2vh, 24px)" }}
    >
      {/* Left: logo — anchored to top-left like main */}
      <Link
        href="/"
        aria-label="Helthy home"
        className="pointer-events-auto absolute flex items-center"
        style={{
          top: "clamp(14px, 2.2vh, 24px)",
          left: "clamp(16px, 3vw, 32px)",
          height: 40,
        }}
      >
        <Image
          src="/logos/logo-long-white.png"
          alt="Helthy"
          height={26}
          width={130}
          className="object-contain"
          priority
          style={{ width: "auto", height: 26 }}
        />
      </Link>

      {/* Center: floating glass pill — desktop only.
         Base color #141414 mirrors mobile app's tabBarBackground token.
         Border #2E2E30 mirrors mobile `border` token. */}
      <nav
        className="pointer-events-auto hidden lg:flex mx-auto w-fit"
        aria-label="Primary"
        style={{
          backgroundColor: scrolled
            ? "rgba(20,20,20,0.82)"
            : "rgba(20,20,20,0.62)",
          backdropFilter: "blur(40px) saturate(140%)",
          WebkitBackdropFilter: "blur(40px) saturate(140%)",
          border: "1.5px solid rgba(46,46,48,0.9)",
          borderRadius: 999,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)",
          transition: "background-color 250ms ease",
          padding: "8px 8px 8px 28px",
        }}
      >
        <ul className="flex items-center gap-7 mr-5">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors hover:text-white"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: "-0.005em",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Inline CTA — lemon chip (mobile primary), mirrors app button style */}
        <Link
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          style={{
            background: "#CDFF50",
            color: "#0B0B0B",
            borderRadius: 999,
            padding: "7px 8px 7px 18px",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "-0.005em",
            boxShadow:
              "inset 0 2px 1px 0 rgba(255,255,255,0.5)," +
              "inset 0 0.6px 0.6px -1.25px rgba(255,255,255,0.72)," +
              "inset 0 2.29px 2.29px -2.5px rgba(255,255,255,0.635)," +
              "inset 0 10px 10px -3.75px rgba(255,255,255,0.25)",
          }}
        >
          <span>Download now</span>
          <span
            className="flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: "rgba(11,11,11,0.18)",
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={3} style={{ color: "#0B0B0B" }} />
          </span>
        </Link>
      </nav>

      {/* Mobile: hamburger top-right — matches main */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="lg:hidden pointer-events-auto absolute rounded-full p-2 transition-colors"
        style={{
          top: "clamp(14px, 2.2vh, 24px)",
          right: "clamp(16px, 3vw, 32px)",
          background: "rgba(20,20,20,0.82)",
          border: "1.5px solid rgba(46,46,48,0.9)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          color: "#FFFFFF",
        }}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile sheet — mirrors mobile app card surface */}
      {open && (
        <div
          className="lg:hidden pointer-events-auto"
          style={{
            position: "fixed",
            top: 72,
            left: 16,
            right: 16,
            background: "rgba(20,20,20,0.94)",
            backdropFilter: "blur(32px) saturate(140%)",
            WebkitBackdropFilter: "blur(32px) saturate(140%)",
            border: "1.5px solid rgba(46,46,48,0.9)",
            borderRadius: 20,
            padding: "16px 18px 18px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-[15px]"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary text-[14px] w-full justify-center"
                style={{ padding: "10px 16px" }}
              >
                Download now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
