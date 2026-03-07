"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Users, Mail, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const activeIndex = links.findIndex((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
  );

  /* slide the pill indicator to the active tab */
  const movePill = useCallback(() => {
    const pill = pillRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (!pill || !activeTab) return;

    const parent = activeTab.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    gsap.to(pill, {
      x: tabRect.left - parentRect.left,
      width: tabRect.width,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeIndex]);

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

  /* move pill on route change + on mount */
  useEffect(() => {
    // small delay so DOM has settled
    const raf = requestAnimationFrame(movePill);
    return () => cancelAnimationFrame(raf);
  }, [movePill]);

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
        {/* ── Desktop floating bar (app tab bar style) ──────────── */}
        <div className="hidden lg:flex items-center gap-0 rounded-full backdrop-blur-[40px] bg-[#141414]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-2 py-1.5 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 pl-3 pr-3">
            <img
              src="/images/logos/logo-long-white.png"
              alt="Helthy"
              className="w-[100px] h-auto object-contain"
            />
          </Link>

          <div className="w-px h-6 bg-white/[0.08] mr-1" />

          {/* Tabs container with sliding pill */}
          <div className="relative flex items-center">
            {/* Sliding pill indicator */}
            <div
              ref={pillRef}
              className="absolute top-0.5 bottom-0.5 rounded-full bg-white/[0.08] pointer-events-none"
              style={{ width: 0 }}
            />

            {links.map((l, i) => {
              const active = isActive(l.href);
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-200"
                >
                  <Icon
                    className={`w-[18px] h-[18px] transition-colors duration-300 ${
                      active ? "text-helthy-lemon" : "text-white/40"
                    }`}
                  />
                  {/* Collapsing label — only visible when active */}
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                      active
                        ? "max-w-[80px] opacity-100 text-helthy-lemon"
                        : "max-w-0 opacity-0"
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Mobile top bar ────────────────────────────────────── */}
        <div className="lg:hidden flex items-center gap-3 rounded-full bg-[#141414]/90 border border-white/[0.08] px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center pl-2">
            <img
              src="/images/logos/logo-long-white.png"
              alt="Helthy"
              className="h-4 w-auto object-contain"
            />
          </Link>

          <div className="w-px h-5 bg-white/[0.08]" />

          {/* Mobile tabs — icons only */}
          <div className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(l.href);
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    active ? "bg-white/[0.08]" : ""
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-helthy-lemon" : "text-white/40"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
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
      </div>
    </>
  );
}
