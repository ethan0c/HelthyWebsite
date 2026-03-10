"use client";

import { useRef, useCallback, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number; // How much the button moves (default: 0.3)
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(buttonRef.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: "power3.out",
      });

      // Move content in opposite direction for depth effect
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: deltaX * 0.2,
          y: deltaY * 0.2,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }, []);

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className: `inline-block ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  const content = (
    <span ref={contentRef} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a {...commonProps} href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      {content}
    </button>
  );
}
