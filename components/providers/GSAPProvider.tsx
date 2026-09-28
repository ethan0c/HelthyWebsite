"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Note: ScrollTrigger is registered at module load in @/lib/gsap so
 * sections that use it on mount work correctly. This provider keeps scroll
 * state honest across route changes and layout shifts.
 */
export function GSAPProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // New page: back to the top, then re-measure once it has painted
  useEffect(() => {
    // Lenis tracks its own target scroll position. A plain window.scrollTo
    // leaves that stale, and Lenis eases back toward the old position on the
    // next frame, which reads as a jump right after navigating.
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  // Anything that changes the page height after load (images, fonts, the
  // coach demo typing its answer) moves every ScrollTrigger below it, so
  // animations would fire at the wrong scroll positions. Re-measure when the
  // height settles, and once everything has loaded.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    return () => {
      ro.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return <>{children}</>;
}
