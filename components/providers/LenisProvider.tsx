"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger stays
 * in lockstep. Toggle off with NEXT_PUBLIC_DISABLE_LENIS=1 for debugging.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const disabled =
    process.env.NEXT_PUBLIC_DISABLE_LENIS === "true" ||
    process.env.NEXT_PUBLIC_DISABLE_LENIS === "1";

  useEffect(() => {
    if (disabled) return;

    gsap.registerPlugin(ScrollTrigger);

    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(update);
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, [disabled]);

  return <>{children}</>;
}
