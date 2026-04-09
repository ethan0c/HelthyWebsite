"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Note: ScrollTrigger is registered at module load in @/lib/gsap so
 * sections that use it on mount work correctly. This provider just
 * handles route-change cleanup.
 */
export function GSAPProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(refresh);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
