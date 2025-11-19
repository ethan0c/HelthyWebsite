"use client";
import { useEffect, useState } from "react";

/**
 * AlignedLogo displays the Helthy logo in a locked position like the navbar.
 * On desktop: hides when scrolling past hero section.
 * On mobile: adds a backdrop blur after scrolling past the hero section.
 */
export default function AlignedLogo() {
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const pastHero = scrollY > heroHeight * 0.85;
      
      if (!isDesktop) {
        // Mobile: just track scroll for backdrop
        setScrolled(scrollY > heroHeight * 0.6);
      } else {
        // Desktop: hide when past hero
        setScrolled(pastHero);
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

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
        className={`fixed z-50 h-5 lg:h-6 w-auto top-[29px] lg:top-[45px] left-5 lg:left-20 pointer-events-none select-none transition-all duration-500 ${
          isDesktop && scrolled ? "lg:opacity-0 lg:scale-75" : "opacity-100 scale-100"
        }`}
      />
    </>
  );
}
