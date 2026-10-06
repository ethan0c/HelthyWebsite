import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  /** Optional leading icon (store logo, etc.) */
  icon?: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  "aria-label"?: string;
};

/**
 * The site's one link-button. Styling lives in globals.css (.btn-*), so
 * plain <button>s can share it with className="btn-primary" etc.
 */
export default function CTAButton({
  href,
  children,
  icon,
  variant = "primary",
  size = "md",
  external,
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: CTAButtonProps) {
  const isExternal = external ?? href.startsWith("http");
  const cls = `btn-${variant} ${size === "md" ? "" : `btn-${size}`} ${className}`.trim();
  const content = (
    <>
      {icon && <span className="flex shrink-0 items-center">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
