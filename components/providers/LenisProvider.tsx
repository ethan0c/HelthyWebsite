"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export function LenisProvider({ children }: { children: ReactNode }) {
  // Allow disabling Lenis via env for quick debugging: NEXT_PUBLIC_DISABLE_LENIS=true
  if (process.env.NEXT_PUBLIC_DISABLE_LENIS === "true" || process.env.NEXT_PUBLIC_DISABLE_LENIS === "1") {
    return <>{children}</>;
  }

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ensure ScrollTrigger is available
    gsap.registerPlugin(ScrollTrigger);

    // Disable native smooth scrolling to avoid conflicts with Lenis
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      // tune as needed
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    (globalThis as any).lenis = lenis;

    // Use GSAP's ticker to drive Lenis for perfect sync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on Lenis scroll
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(update);
      // Restore previous scroll-behavior
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return <>{children}</>;
}
