"use client";

import { useEffect, useState } from "react";
import LoaderHollowCircles from "./legacy/LoaderHollowCircles";

/**
 * HollowCirclesOverlay — full-screen preloader that uses only the
 * hollow circles loader. Fades out shortly after first client render.
 */
export default function HollowCirclesOverlay({
  delayMs = 200,
}: {
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LoaderHollowCircles
        color="#CDFB50"
        background="transparent"
        size={16}
        border={2}
        gap={10}
        fade={0.35}
        durationMs={1050}
      />
    </div>
  );
}
