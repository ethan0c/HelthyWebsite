import type { ReactNode } from "react";

/**
 * Canonical section heading for all marketing sections.
 *
 * Typography rules:
 * - Lyon Display light 300 via `text-display-xl` / `font-heading font-light`
 * - Italic emphasis on the trailing phrase, applied via <span className="text-italics">
 * - Optional eyebrow slot above the heading (icon, logo, or label)
 * - Optional subtitle below
 *
 * Usage:
 *   <SectionHeading
 *     title="Plays nice with"
 *     italicTail="your gear"
 *     subtitle="Auto-syncs steps, weight, workouts, and heart rate."
 *   />
 */
export default function SectionHeading({
  eyebrow,
  title,
  italicTail,
  trailingPunctuation = ".",
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  italicTail?: ReactNode;
  trailingPunctuation?: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl mb-16 ${alignCls} ${className}`}>
      {eyebrow && (
        <div className={`mb-6 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="text-display-xl font-heading tracking-tight">
        {title}
        {italicTail && (
          <>
            {" "}
            <span className="text-helthy-lemon">{italicTail}</span>
          </>
        )}
        {trailingPunctuation}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base text-white/60 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
