"use client";

import { useEffect, useRef, useState } from "react";
import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * A screen recording inside the flat PhoneFrame. The frame itself never
 * moves. The video loads only when it nears the viewport, plays while
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
  const [load, setLoad] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // First entry attaches the source (autoPlay starts it); later
          // entries resume a video that already has one.
          setLoad(true);
          if (!reduce && video.currentSrc) video.play().catch(() => {});
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
        src={load ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        autoPlay={!reduced}
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
