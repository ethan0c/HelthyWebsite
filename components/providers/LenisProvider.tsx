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
    // Anchor interception works even when Lenis is disabled — fall back
    // to native smooth scroll.
    const onAnchorClickNative = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a") as
        | HTMLAnchorElement
        | null;
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const isSame = href.startsWith("#");
      const isRoot =
        href.startsWith("/#") &&
        (window.location.pathname === "/" || window.location.pathname === "");
      if (!isSame && !isRoot) return;
      const hash = isSame ? href : href.slice(1);
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", hash);
    };

    if (disabled) {
      document.addEventListener("click", onAnchorClickNative);
      return () => document.removeEventListener("click", onAnchorClickNative);
    }

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

    // Smooth-scroll any in-page anchor link through Lenis.
    // Matches:  href="#foo", href="/#foo", or href to current path + #foo.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Same-page hash (#foo) or root hash (/#foo) on the same route.
      const isSamePageHash = href.startsWith("#");
      const isRootHash =
        href.startsWith("/#") &&
        (window.location.pathname === "/" || window.location.pathname === "");
      if (!isSamePageHash && !isRootHash) return;

      const hash = isSamePageHash ? href : href.slice(1);
      const id = hash.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, {
        offset: -72,
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(update);
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, [disabled]);

  return <>{children}</>;
}
