/**
 * Default fill for the hero visual slot in PR 1. Wraps the existing
 * /videos/hero-man-running.mp4 so the rebuild ships without blocking on
 * a new product-demo capture. Swap to <HeroVisualPhone /> in HeroSection
 * once a CSS phone mockup or real product capture is ready.
 */
export default function HeroVisualVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/stock/hero-poster.jpg"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/videos/hero-man-running.mp4" type="video/mp4" />
    </video>
  );
}
