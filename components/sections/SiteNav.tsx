"use client";

import Link from "next/link";
import Image from "next/image";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

// Layered outer shadow for the pill (from the reference Framer nav).
const PILL_SHADOW =
  "rgba(0, 0, 0, 0.184) 0px 0.636953px 0.636953px -0.9375px, " +
  "rgba(0, 0, 0, 0.173) 0px 1.9316px 1.9316px -1.875px, " +
  "rgba(0, 0, 0, 0.15) 0px 5.10612px 5.10612px -2.8125px, " +
  "rgba(0, 0, 0, 0.063) 0px 16px 16px -3.75px";

// Inset highlight stack that gives the CTA its glossy 3D look.
const CTA_SHADOW =
  "rgba(255,255,255,0.12) 0px 1px 1px 0px inset," +
  "rgba(255,255,255,0.08) 0px 0.6px 0.6px -1.25px inset," +
  "rgba(255,255,255,0.06) 0px 2px 2px -2.5px inset," +
  "rgba(0,0,0,0.4) 0px 4px 8px -4px," +
  "rgba(205,255,80,0.15) 0px 6px 4px -4px";

export default function SiteNav() {
  return (
    <header className="fixed top-[52px] sm:top-[44px] left-1/2 -translate-x-1/2 z-50 w-[min(96vw,920px)]">
      <nav className="rounded-full" style={{ boxShadow: PILL_SHADOW }}>
        <div
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-full border border-white/[0.14] px-3 py-2"
          style={{
            backgroundColor: "rgb(23, 23, 23)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Left: logo */}
          <Link
            href="/"
            className="flex items-center justify-self-start pl-2"
            aria-label="Helthy home"
          >
            <Image
              src="/logos/logo-long-white.png"
              alt="Helthy"
              height={24}
              width={104}
              className="object-contain h-6 w-auto"
              priority
            />
          </Link>

          {/* Center: tabs */}
          <ul
            className="hidden md:flex items-center gap-7 text-[13px] justify-self-center text-white/65"
          >
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: lemon-tinted CTA */}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-self-end px-4 py-1.5 text-[13px] font-medium transition-colors hover:bg-[rgba(205,255,80,0.14)]"
            style={{
              backgroundColor: "rgba(205,255,80,0.08)",
              border: "1px solid rgba(205,255,80,0.25)",
              borderRadius: "120px",
              color: "#CDFF50",
              boxShadow: CTA_SHADOW,
            }}
          >
            Get the app
          </Link>
        </div>
      </nav>
    </header>
  );
}
