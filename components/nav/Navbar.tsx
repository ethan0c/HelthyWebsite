"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate nav pill on load
      gsap.fromTo(
        pillRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        {/* Floating pill container */}
        <div
          ref={pillRef}
          className={`mx-auto max-w-4xl flex items-center justify-between px-4 sm:px-6 h-14 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/logos/logo-long-white.png"
              alt="Helthy"
              className="h-5 sm:h-6 w-auto transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop nav - centered */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-helthy-lemon" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-helthy-lemon text-[#0B0B0B] text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02]"
            >
              <AppStoreIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Get App</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - full screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#060606]" />
        
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 px-6">
          {/* Logo in mobile menu */}
          <img
            src="/images/logos/logo-long-white.png"
            alt="Helthy"
            className={`h-8 mb-8 transition-all duration-500 delay-100 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          />
          
          {/* Nav links */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`text-lg font-medium tracking-wide uppercase transition-all duration-500 delay-150 ${
                isActive("/") ? "text-white" : "text-white/40"
              } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Home
            </Link>
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-medium tracking-wide uppercase transition-all duration-500 ${
                  isActive(link.href) ? "text-white" : "text-white/40"
                } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${200 + i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-helthy-lemon text-[#0B0B0B] font-semibold tracking-wide uppercase transition-all duration-500 delay-300 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <AppStoreIcon className="w-5 h-5" />
            Download for iOS
          </a>
        </div>
      </div>
    </>
  );
}
