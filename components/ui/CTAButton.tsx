import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  external?: boolean;
  size?: "sm" | "md";
  onClick?: (e: React.MouseEvent) => void;
};

/**
 * The pill-with-arrow-chip CTA used in the nav Download button.
 * Reused across hero, CTA section, etc. for a single button language.
 */
export default function CTAButton({
  href,
  children,
  icon,
  variant = "primary",
  external,
  size = "md",
  onClick,
}: CTAButtonProps) {
  const isPrimary = variant === "primary";
  const isExternal = external ?? href.startsWith("http");

  const sizes =
    size === "sm"
      ? { padY: 6, padL: 16, padR: 6, font: 13, chip: 22, icon: 13 }
      : { padY: 8, padL: 22, padR: 8, font: 15, chip: 28, icon: 16 };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: size === "sm" ? 10 : 12,
    borderRadius: 999,
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: sizes.font,
    letterSpacing: "-0.005em",
    padding: `${sizes.padY}px ${sizes.padR}px ${sizes.padY}px ${sizes.padL}px`,
    whiteSpace: "nowrap",
    transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease",
  };

  const primary: React.CSSProperties = {
    background: "#CDFF50",
    color: "#0B0B0B",
    boxShadow:
      "inset 0 2px 1px 0 rgba(255,255,255,0.5)," +
      "inset 0 0.6px 0.6px -1.25px rgba(255,255,255,0.72)," +
      "inset 0 2.29px 2.29px -2.5px rgba(255,255,255,0.635)," +
      "inset 0 10px 10px -3.75px rgba(255,255,255,0.25)," +
      "0 14px 6px -8px rgba(205,255,80,0.35)," +
      "0 4px 12px -2px rgba(0,0,0,0.35)",
  };

  const secondary: React.CSSProperties = {
    background:
      "linear-gradient(180deg, rgba(50,50,54,0.9) 0%, rgba(24,24,26,0.92) 100%)",
    color: "#FFFFFF",
    border: "1.5px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px) saturate(140%)",
    WebkitBackdropFilter: "blur(20px) saturate(140%)",
    boxShadow:
      // raised top bevel
      "inset 0 1.5px 0 rgba(255,255,255,0.14)," +
      // bottom inner shade — gives the pill its curvature
      "inset 0 -6px 12px -6px rgba(0,0,0,0.5)," +
      // grounding shadows
      "0 2px 4px -1px rgba(0,0,0,0.4)," +
      "0 12px 24px -8px rgba(0,0,0,0.5)",
  };

  const chipBg = isPrimary ? "rgba(11,11,11,0.18)" : "rgba(255,255,255,0.18)";
  const chipColor = isPrimary ? "#0B0B0B" : "#FFFFFF";

  const chip = (
    <span
      className="flex items-center justify-center shrink-0"
      style={{
        width: sizes.chip,
        height: sizes.chip,
        borderRadius: 999,
        background: chipBg,
      }}
    >
      {icon ?? (
        <ArrowUpRight
          style={{ width: sizes.icon, height: sizes.icon, color: chipColor }}
          strokeWidth={3}
        />
      )}
    </span>
  );

  const content = (
    <>
      <span>{children}</span>
      {chip}
    </>
  );

  const style = { ...base, ...(isPrimary ? primary : secondary) };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group hover:scale-[1.02] pointer-events-auto"
        style={style}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group hover:scale-[1.02] pointer-events-auto"
      style={style}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}
