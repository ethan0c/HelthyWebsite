"use client";

import { useEffect, useRef } from "react";
import LaunchBanner from "@/components/sections/LaunchBanner";
import SiteNav from "@/components/sections/SiteNav";

/**
 * Owns the stacking of the dismissible LaunchBanner (in normal flow) and the
 * fixed SiteNav. The nav sits flush under the banner at the top of the page
 * and pins to the top of the viewport once the banner has scrolled away.
 */
export default function TopBar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let bannerHeight = 0;

    const place = () => {
      if (navRef.current) {
        navRef.current.style.top = `${Math.max(0, bannerHeight - window.scrollY)}px`;
      }
    };
    const banner = document.getElementById("launch-banner");
    const measure = () => {
      bannerHeight = banner?.getBoundingClientRect().height ?? 0;
      place();
    };

    measure();

    // Follows the banner frame by frame while it collapses on dismiss.
    const observer = new ResizeObserver(measure);
    if (banner) observer.observe(banner);

    window.addEventListener("helthy:banner", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", place, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("helthy:banner", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", place);
    };
  }, []);

  return (
    <>
      <div id="launch-banner">
        <LaunchBanner />
      </div>
      <div ref={navRef} className="fixed left-0 top-0 z-50 w-full pointer-events-none">
        <SiteNav />
      </div>
    </>
  );
}
