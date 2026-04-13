/**
 * Centralized GSAP entry point. Importing from here guarantees that
 * ScrollTrigger (and any other plugins) are registered at module load
 * time — BEFORE any component's useEffect runs.
 *
 * Children's useEffects fire before parent useEffects, so registering
 * inside a top-level <GSAPProvider> useEffect happens too late for
 * sections that use ScrollTrigger on mount. Register at import time
 * instead by re-exporting from this module.
 *
 * Usage:
 *   import { gsap, ScrollTrigger } from "@/lib/gsap";
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion: disable all GSAP animations
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    gsap.globalTimeline.timeScale(100); // instant completion
    gsap.defaults({ duration: 0 });
  }
  mq.addEventListener("change", (e) => {
    if (e.matches) {
      gsap.globalTimeline.timeScale(100);
      gsap.defaults({ duration: 0 });
    } else {
      gsap.globalTimeline.timeScale(1);
      gsap.defaults({ duration: 0.5 });
    }
  });
}

export { gsap, ScrollTrigger };
