"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import StoreButtons from "@/components/ui/StoreButtons";

function handleDownloadClick(e: React.MouseEvent) {
  if (window.matchMedia("(pointer: fine)").matches) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("helthy:qr-open"));
  }
}

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "How it works", href: "/?section=why-helthy" },
  { label: "Pricing", href: "/?section=pricing" },
  { label: "Free tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Full-width flat top bar (64px). Positioned by TopBar (fixed, flush under
 * the launch banner). The bottom line appears once the page scrolls.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`pointer-events-auto relative w-full border-b transition-colors duration-150 ${
        open
          ? "border-line bg-canvas"
          : scrolled
            ? "border-line bg-canvas/90 backdrop-blur-sm"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-8">
        <Link href="/" aria-label="Helthy home" className="flex shrink-0 items-center">
          <Image
            src="/logos/logo-long-white.png"
            alt="Helthy"
            height={24}
            width={120}
            sizes="120px"
            className="h-[20px] w-auto object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-block px-3 py-2 text-[15px] font-medium text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <CTAButton href="/download" variant="primary" size="sm" onClick={handleDownloadClick}>
            Download
          </CTAButton>
        </nav>

        {/* Mobile: menu button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:bg-surface-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu: full-width panel under the bar */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-b border-line bg-canvas lg:hidden"
        >
          <div className="container-page pb-6">
            <ul className="divide-y divide-line">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[16px] font-medium text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-line pt-6 [&_a]:w-full">
              <StoreButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
