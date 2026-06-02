"use client";

import { useEffect, useState } from "react";
import LaunchBanner from "@/components/sections/LaunchBanner";
import SiteNav from "@/components/sections/SiteNav";

/**
 * Owns the stacking of the dismissible LaunchBanner (in normal flow) and the
 * fixed-overlay SiteNav. When the banner is visible the nav is pushed down by
 * the banner's measured height so the two never overlap.
 */
export default function TopBar() {
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("launch-banner");
      setBannerHeight(el?.offsetHeight ?? 0);
    };

    measure();

    const onBanner = () => measure();
    window.addEventListener("helthy:banner", onBanner);
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("helthy:banner", onBanner);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <div id="launch-banner">
        <LaunchBanner />
      </div>
      <div
        className="fixed left-0 w-full pointer-events-none"
        style={{
          zIndex: 50,
          top: bannerHeight,
          transition: "top 200ms ease",
        }}
      >
        <SiteNav />
      </div>
    </>
  );
}
