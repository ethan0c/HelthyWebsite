"use client";

import { useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register GSAP plugins once on the client
export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);
  }, []);

  return <>{children}</>;
}
