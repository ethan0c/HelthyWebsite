"use client";
import { useEffect, useRef, useState } from "react";

/**
 * AlignedLogo dynamically centers the Helthy logo vertically with either the desktop pill navbar
 * or the mobile hamburger button. Placed globally in layout so it appears on all pages.
 * On mobile, adds a backdrop blur after scrolling past the hero section.
 */
export default function AlignedLogo() {
  const ref = useRef<HTMLImageElement | null>(null);
  const [top, setTop] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const compute = () => {
      const logo = ref.current;
      if (!logo) return;
      const mobileBtn = document.getElementById("mobile-menu-button");
      const pill = document.getElementById("nav-pill");
      let target: HTMLElement | null = null;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile && mobileBtn) target = mobileBtn; else if (pill) target = pill;
      if (!target) return;
      const tRect = target.getBoundingClientRect();
      const lRect = logo.getBoundingClientRect();
      const centerY = tRect.top + tRect.height / 2;
      const newTop = Math.max(0, centerY - lRect.height / 2);
      setTop(Math.round(newTop));
    };
    const onResize = () => compute();
    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    // Recompute after fonts/videos load shifts
    const idleId = setTimeout(compute, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Track scroll to add blur background on mobile after hero
  useEffect(() => {
    const onScroll = () => {
      // Detect if we've scrolled past ~70vh (approximate hero height on mobile)
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        setScrolled(window.scrollY > window.innerHeight * 0.6);
      } else {
        setScrolled(false);
      }
    };
    onScroll(); // initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Backdrop blur bar on mobile after scroll */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none transition-all duration-300 ${
          scrolled ? "opacity-100 backdrop-blur-xl bg-black/40" : "opacity-0"
        }`}
        aria-hidden
      />
      <img
        ref={ref}
        src="/figma-components/hero/logo.png"
        alt="Helthy logo"
        className="fixed z-50 h-5 sm:h-5 md:h-6 w-auto top-[36px] sm:top-[46px] md:top-[64px] left-[20px] sm:left-[40px] md:left-[78px] pointer-events-none select-none"
        style={top != null ? { top: `${top}px` } : undefined}
      />
    </>
  );
}
