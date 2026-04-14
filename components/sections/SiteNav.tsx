"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#why-helthy", label: "Why Helthy" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="w-full transition-colors duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(14px)" : undefined,
      }}
    >
      <div className="container-page">
        <nav className="flex items-center justify-between" style={{ height: 64 }}>
          {/* Left: logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Helthy home"
          >
            <Image
              src="/logos/logo-long-white.png"
              alt="Helthy"
              height={22}
              width={112}
              className="object-contain"
              priority
            />
          </Link>

          {/* Center: tabs */}
          <ul className="hidden md:flex items-center gap-8 text-[13px] text-white/70">
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

          {/* Right: CTA */}
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[13px]"
            style={{ padding: "8px 16px" }}
          >
            Get the app
          </Link>
        </nav>
      </div>
    </header>
  );
}
