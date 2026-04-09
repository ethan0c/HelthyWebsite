"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,920px)]">
      <nav
        className={`nav-pill flex items-center justify-between gap-6 rounded-full px-4 py-2.5 transition-all ${
          scrolled ? "lemon-glow-soft" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2 pl-1">
          <Image
            src="/logos/helthylogo.png"
            alt="Helthy"
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span className="font-display font-semibold tracking-tight text-white text-[15px]">
            helthy
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm text-white/70">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-helthy-lemon text-helthy-black text-[13px] font-semibold px-4 py-1.5 hover:opacity-90 transition-opacity"
        >
          Get the app
        </Link>
      </nav>
    </header>
  );
}
