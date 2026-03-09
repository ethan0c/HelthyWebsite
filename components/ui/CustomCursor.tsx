"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    // Main cursor follows with slight delay
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: "power3.out",
    });

    // Dot follows instantly
    gsap.to(cursorDotRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    // Check if hovering interactive element
    const isInteractive = 
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.getAttribute("data-cursor-hover") !== null ||
      target.closest("[data-cursor-hover]");

    if (isInteractive && cursorRef.current && !isHoveringRef.current) {
      isHoveringRef.current = true;
      gsap.to(cursorRef.current, {
        scale: 2.5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
    
    const wasInteractive = 
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.getAttribute("data-cursor-hover") !== null ||
      target.closest("[data-cursor-hover]");

    const isStillInteractive = relatedTarget && (
      relatedTarget.tagName === "A" ||
      relatedTarget.tagName === "BUTTON" ||
      relatedTarget.closest?.("a") ||
      relatedTarget.closest?.("button") ||
      relatedTarget.getAttribute?.("data-cursor-hover") !== null ||
      relatedTarget.closest?.("[data-cursor-hover]")
    );

    if (wasInteractive && !isStillInteractive && cursorRef.current) {
      isHoveringRef.current = false;
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isHoveringRef.current ? 2 : 0.8,
      duration: 0.15,
      ease: "power2.out",
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isHoveringRef.current ? 2.5 : 1,
      duration: 0.15,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     window.matchMedia("(pointer: coarse)").matches;
    
    if (isMobile) return;

    // Show cursors
    if (cursorRef.current) cursorRef.current.style.opacity = "1";
    if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";

    // Add event listeners
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moveCursor, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  return (
    <>
      {/* Main cursor ring with blend mode */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-white" />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
}
