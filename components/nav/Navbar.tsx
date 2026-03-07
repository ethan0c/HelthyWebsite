"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Home,
  CreditCard,
  Users,
  Mail,
  Menu,
  X,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  /* auto-hide on scroll down, show on scroll up */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const showNav = gsap.fromTo(
      navRef.current,
      { yPercent: 0 },
      {
        yPercent: -150,
        paused: true,
        duration: 0.3,
        ease: "power2.inOut",
      }
    );

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) showNav.reverse();
        else if (self.scroll() > 100) showNav.play();
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        {/* ── Desktop floating pill ─────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-2 rounded-[100px] backdrop-blur-[40px] bg-black/15 border-2 border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.08)] px-3 py-2">
          {/* Nav tabs */}
          {links.map((l) => {
            const active = isActive(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`
                  relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-base font-normal tracking-[0.17px]
                  transition-all duration-300 ease-out
                  ${
                    active
                      ? "bg-white/[0.1] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }
                `}
              >
                <Icon
                  className={`w-[18px] h-[18px] transition-colors duration-300 ${
                    active ? "text-helthy-lemon" : ""
                  }`}
                />
                <span>{l.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-7 bg-white/[0.15] mx-1.5" />

          {/* Download CTA */}
          <a
            href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-helthy-lemon hover:bg-[#d8ff5a] text-[#0B0B0B] px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            Download Free
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* ── Mobile top bar ────────────────────────────────────── */}
        <div className="lg:hidden flex items-center gap-3 rounded-full bg-[#141414] border border-white/[0.08] px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center pl-2">
            <img
              src="/images/logos/logo-long-white.png"
              alt="Helthy"
              className="h-4 w-auto"
            />
          </Link>

          <div className="w-px h-5 bg-white/[0.08]" />

          <a
            href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-helthy-lemon text-[#0B0B0B] px-4 py-1.5 text-xs font-semibold"
          >
            Download
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </a>

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-2 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((l) => {
          const active = isActive(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-4 px-8 py-4 rounded-2xl text-xl font-medium
                transition-all duration-300
                ${
                  active
                    ? "bg-white/[0.06] text-white"
                    : "text-white/50 hover:text-white"
                }
              `}
            >
              <Icon
                className={`w-6 h-6 ${active ? "text-helthy-lemon" : ""}`}
              />
              {l.label}
            </Link>
          );
        })}

        <a
          href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Download Free
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
    </>
  );
}
