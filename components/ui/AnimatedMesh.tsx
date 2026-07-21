"use client";

/**
 * AnimatedMesh — ambient, constantly-drifting gradient-blob background.
 *
 * GPU-cheap: animation is pure CSS transform/opacity keyframes (no rAF loop,
 * no canvas), so it composites off the main thread. Sits as an absolute layer
 * behind a section's content — wrap it with a `relative` parent.
 *
 * Respects `prefers-reduced-motion` (animations disabled, blobs stay static).
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <AnimatedMesh />
 *     ...content (give it `relative z-10`)...
 *   </section>
 */
export default function AnimatedMesh({
  className = "",
  intensity = 1,
}: {
  /** Extra classes on the wrapper (e.g. positioning / z-index overrides). */
  className?: string;
  /** Multiplies blob opacity. 1 = default ambient, <1 subtler, >1 bolder. */
  intensity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      {/* Lemon — primary brand glow, slow figure-eight drift */}
      <span
        className="mesh-blob mesh-blob--lemon"
        style={{ background: "radial-gradient(circle, rgba(205,251,80,0.22) 0%, transparent 65%)" }}
      />
      {/* Cyan — cool counterpoint, opposite drift */}
      <span
        className="mesh-blob mesh-blob--cyan"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 65%)" }}
      />
      {/* Orange — warm accent, slowest */}
      <span
        className="mesh-blob mesh-blob--orange"
        style={{ background: "radial-gradient(circle, rgba(233,108,44,0.12) 0%, transparent 65%)" }}
      />
    </div>
  );
}
