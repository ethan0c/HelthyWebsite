"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
    <div className="w-full flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto mt-3 sm:mt-4 mx-4"
        aria-label="Primary"
        style={{
          backgroundColor: scrolled
            ? "rgba(17,17,17,0.92)"
            : "rgba(17,17,17,0.78)",
          backdropFilter: "blur(24px) saturate(120%)",
          WebkitBackdropFilter: "blur(24px) saturate(120%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35)",
          transition: "background-color 250ms ease",
        }}
      >
        <div
          className="flex items-center gap-6 sm:gap-8"
          style={{ padding: "10px 14px 10px 18px" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Helthy home"
          >
            <Image
              src="/logos/logo-long-white.png"
              alt="Helthy"
              height={20}
              width={100}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 text-[13px]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[13px] shrink-0"
            style={{ padding: "8px 16px" }}
          >
            Get the app
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden shrink-0 -mr-1 p-1.5 rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "12px 18px 16px",
            }}
          >
            <ul className="flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-[14px] transition-colors"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
