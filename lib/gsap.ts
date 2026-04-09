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
}

export { gsap, ScrollTrigger };
