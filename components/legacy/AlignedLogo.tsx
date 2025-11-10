"use client";
import { useEffect, useState } from "react";

/**
 * AlignedLogo displays the Helthy logo in a locked position like the navbar.
 * Placed globally in layout so it appears on all pages.
 * On mobile, adds a backdrop blur after scrolling past the hero section.
 */
export default function AlignedLogo() {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll to add blur background on mobile after hero
  useEffect(() => {
    const onScroll = () => {
      // Detect if we've scrolled past ~70vh (approximate hero height on mobile)
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
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
        className={`lg:hidden fixed top-0 left-0 right-0 h-20 z-40 pointer-events-none transition-all duration-300 ${
          scrolled ? "opacity-100 backdrop-blur-xl bg-black/40" : "opacity-0"
        }`}
        aria-hidden
      />
      <img
        src="/figma-components/hero/logo.png"
        alt="Helthy logo"
        className="fixed z-50 h-5 lg:h-6 w-auto top-[29px] lg:top-[45px] left-5 lg:left-20 pointer-events-none select-none"
      />
    </>
  );
}
