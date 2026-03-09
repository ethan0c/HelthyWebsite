"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lightweight GSAP provider - register once, minimal refreshes
export function GSAPProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Single refresh after initial load
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(refresh);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
