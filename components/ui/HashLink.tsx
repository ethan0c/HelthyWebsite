"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for Next.js Link when href is a cross-route hash link
 * like "/#pricing". Stores the target hash in sessionStorage before navigating
 * so LenisProvider can scroll to it after the page loads and animations settle.
 */
export default function HashLink({ href, onClick, children, ...props }: Props) {
  const hrefStr = typeof href === "string" ? href : "";
  const isCrossRouteHash = hrefStr.startsWith("/#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCrossRouteHash) {
      const hash = hrefStr.slice(2); // strip "/#"
      sessionStorage.setItem("scrollToHash", hash);
    }
    onClick?.(e);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
