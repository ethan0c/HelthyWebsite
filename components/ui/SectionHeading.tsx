import type { ReactNode } from "react";

/**
 * Canonical heading for homepage sections.
 * Unbounded title (.text-display-xl), optional accent phrase, optional
 * eyebrow and subtitle. No trailing punctuation by default.
 *
 *   <SectionHeading title="How it" italicTail="works" subtitle="Three steps." />
 */
export default function SectionHeading({
  eyebrow,
  title,
  italicTail,
  trailingPunctuation = "",
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Accent-coloured phrase appended to the title */
  italicTail?: ReactNode;
  trailingPunctuation?: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignCls} ${className}`}>
      {eyebrow && (
        <div className={`mb-4 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
          {typeof eyebrow === "string" ? (
            <span className="text-[13px] font-medium text-accent-ink">{eyebrow}</span>
          ) : (
            eyebrow
          )}
        </div>
      )}
      <h2 className="text-display-xl text-fg">
        {title}
        {italicTail && (
          <>
            {" "}
            <span className="text-accent-ink">{italicTail}</span>
          </>
        )}
        {trailingPunctuation}
      </h2>
      {subtitle && <p className="mt-5 text-lede">{subtitle}</p>}
    </div>
  );
}
