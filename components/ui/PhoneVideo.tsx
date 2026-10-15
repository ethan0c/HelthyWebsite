"use client";

import { useEffect, useRef, useState } from "react";
import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * A screen recording inside the flat PhoneFrame. The frame itself never
 * moves. The `src` is always in the markup (so crawlers can resolve the
 * video without running an IntersectionObserver), but `preload="none"`
 * keeps the browser from fetching it until playback starts. It plays while
 * visible and pauses off-screen. With reduced motion it shows the poster
 * and native controls instead of auto-playing.
 */
export default function PhoneVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  /** Describes what the recording shows, for screen readers */
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduce) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <PhoneFrame className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        aria-label={label}
        // Fill the screen cut-out. The recordings are within ~1% of the
        // screen's aspect ratio, so cover crops a sliver off the bottom
        // rather than leaving dead space under the video.
        className="block h-full w-full object-cover object-top"
      />
    </PhoneFrame>
  );
}
