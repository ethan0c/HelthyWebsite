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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth navbar reveal - animate content wrapper, not the fixed nav itself
      const content = navRef.current?.querySelector('[data-nav-content]');
      if (content) {
        gsap.fromTo(
          content,
          { y: -20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            duration: 1.0, 
            ease: "power4.out", 
            delay: 0.3,
            clearProps: "transform" // Clear transform after animation to prevent positioning issues
          }
        );
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out will-change-auto ${
          scrolled
            ? "bg-[#060606]/95 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div data-nav-content className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/logos/logo-long-white.png"
              alt="Helthy"
              className="h-5 sm:h-6 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-helthy-lemon text-[#0B0B0B] text-sm font-medium transition-all hover:bg-white"
          >
            <AppStoreIcon className="w-4 h-4" />
            Get for iOS
          </a>

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
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#060606]" />
        
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center min-h-screen gap-6 px-6">
          {/* Nav links */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive("/") ? "text-white" : "text-white/50"
              } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Home
            </Link>
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-medium transition-all duration-300 ${
                  isActive(link.href) ? "text-white" : "text-white/50"
                } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${50 + i * 50}ms` }}
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
            className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-helthy-lemon text-[#0B0B0B] font-medium transition-all duration-300 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <AppStoreIcon className="w-5 h-5" />
            Get for iOS
          </a>
        </div>
      </div>
    </>
  );
}
