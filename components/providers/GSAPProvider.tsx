"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register GSAP plugins once on the client
export function GSAPProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);
    
    // Multiple refresh passes to handle async content loading
    const refresh1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const refresh2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const refresh3 = setTimeout(() => ScrollTrigger.refresh(), 1000);
    
    // Also refresh when window fully loads (images, etc.)
    const handleLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(refresh1);
      clearTimeout(refresh2);
      clearTimeout(refresh3);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Scroll to top and refresh ScrollTrigger on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const refresh1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const refresh2 = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(refresh1);
      clearTimeout(refresh2);
    };
  }, [pathname]);

  return <>{children}</>;
}
