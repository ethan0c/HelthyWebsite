"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SectionScroller() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;

    const scroll = (retries: number) => {
      const el = document.getElementById(section);
      if (!el) {
        if (retries > 0) setTimeout(() => scroll(retries - 1), 150);
        return;
      }

      // Use Lenis if available, otherwise native
      const lenis = (window as unknown as { __lenis?: { scrollTo: (el: Element, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, {
          offset: -72,
          duration: 0.9,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    // Wait for page-entry animations to settle
    setTimeout(() => scroll(8), 600);
  }, [section]);

  return null;
}
