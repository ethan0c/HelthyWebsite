"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";

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
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setIsDesktop(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const hideLogo = isDesktop && scrolled;

  return (
    <div
      className="relative w-full pointer-events-none"
      style={{ paddingTop: "clamp(14px, 2.2vh, 24px)" }}
    >
      {/* Full-width frosted bar — mobile only, fades in after hero scroll */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "clamp(60px, 9vh, 76px)",
          background: "rgba(10,10,10,0.72)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 350ms ease",
        }}
      />
      {/* Left: logo — anchored to top-left like main.
          On desktop, fades out on scroll so the glass pill holds focus. */}
      <Link
        href="/"
        aria-label="Helthy home"
        className="pointer-events-auto absolute flex items-center"
        style={{
          top: "clamp(14px, 2.2vh, 24px)",
          left: "clamp(16px, 3vw, 32px)",
          height: 40,
          opacity: hideLogo ? 0 : 1,
          transform: hideLogo ? "translateY(-6px)" : "translateY(0)",
          transition: "opacity 300ms ease, transform 300ms ease",
          pointerEvents: hideLogo ? "none" : "auto",
        }}
      >
        <Image
          src="/logos/logo-long-white.png"
          alt="Helthy"
          height={24}
          width={120}
          sizes="120px"
          className="object-contain h-[22px] w-auto lg:h-[24px]"
          priority
        />
      </Link>

      {/* Center: floating glass pill — desktop only.
         Base color #141414 mirrors mobile app's tabBarBackground token.
         Border #2E2E30 mirrors mobile `border` token. */}
      <nav
        className="pointer-events-auto hidden lg:flex mx-auto w-fit relative"
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

        <CTAButton href={APP_STORE_URL} variant="primary" size="sm">
          Download now
        </CTAButton>
      </nav>

      {/* Mobile: hamburger top-right — matches main */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="lg:hidden pointer-events-auto absolute rounded-full p-2.5 transition-colors"
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
            top: "calc(clamp(14px, 2.2vh, 24px) + 56px)",
            left: "clamp(16px, 3vw, 32px)",
            right: "clamp(16px, 3vw, 32px)",
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
            <li className="pt-2 flex">
              <CTAButton
                href={APP_STORE_URL}
                variant="primary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Download now
              </CTAButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
