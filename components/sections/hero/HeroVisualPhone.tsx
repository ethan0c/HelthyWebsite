/**
 * Stub for the future CSS/SVG phone mockup that will replace the video
 * fill in the hero visual slot. Will render a phone frame with a live
 * MomentumRing, scan-line animation, and meal log row — all themed to
 * the Helthy mobile app.
 *
 * To activate: in HeroSection.tsx, swap
 *   <HeroVisualVideo />
 * for
 *   <HeroVisualPhone />
 *
 * TODO(hero-rebuild): build the actual mockup. The MomentumRing port
 * planned for PR 2 (theme switcher) can be reused here.
 */
export default function HeroVisualPhone() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-helthy-card-section">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
        phone mockup placeholder
      </p>
    </div>
  );
}
