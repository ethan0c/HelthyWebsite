"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * One FAQ row. A native <details>, so it works without JS and the answer is
 * findable with in-page search; on click the answer's height is animated
 * open and closed instead of snapping.
 */
export default function FaqItem({
  q,
  a,
  className = "",
  ...rest
}: { q: string; a: string } & Omit<React.ComponentProps<"details">, "children">) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const running = useRef<Animation | null>(null);

  const toggle = (e: React.MouseEvent) => {
    const details = detailsRef.current;
    const body = bodyRef.current;
    if (!details || !body || prefersReducedMotion()) return; // native toggle
    e.preventDefault();

    const opening = details.dataset.expanded !== "true";
    // Start from where the answer is now, so a click mid-animation reverses it.
    const from = details.open ? body.getBoundingClientRect().height : 0;
    const fromOpacity = details.open ? getComputedStyle(body).opacity : "0";
    running.current?.cancel();
    details.open = true;
    details.dataset.expanded = String(opening);

    const animation = body.animate(
      {
        height: [`${from}px`, `${opening ? body.scrollHeight : 0}px`],
        opacity: [fromOpacity, opening ? "1" : "0"],
      },
      opening
        ? { duration: 280, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        : { duration: 200, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
    );
    running.current = animation;
    animation.onfinish = () => {
      running.current = null;
      if (!opening) details.open = false;
    };
  };

  return (
    <details
      ref={detailsRef}
      // Keeps the icon right when the browser toggles the row itself
      // (reduced motion, find-in-page).
      onToggle={(e) => {
        if (!running.current) e.currentTarget.dataset.expanded = String(e.currentTarget.open);
      }}
      className={`group ${className}`}
      {...rest}
    >
      <summary
        onClick={toggle}
        className="group/q flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[16px] font-medium text-fg [&::-webkit-details-marker]:hidden"
      >
        {q}
        <Plus
          aria-hidden="true"
          className="mt-1 h-4 w-4 shrink-0 text-fg-muted transition duration-200 ease-out group-hover/q:text-fg group-data-[expanded=true]:rotate-45"
        />
      </summary>
      <div ref={bodyRef} className="-mt-2 overflow-hidden">
        <p className="pb-5 text-[15px] leading-7 text-fg-muted">{a}</p>
      </div>
    </details>
  );
}
