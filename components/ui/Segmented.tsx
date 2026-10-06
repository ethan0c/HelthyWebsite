"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const SELECTED =
  ':scope > [aria-pressed="true"], :scope > [aria-checked="true"], :scope > [aria-selected="true"], :scope > [aria-current="page"]';

/**
 * Makes the selected pill of a `.segmented` group slide between options.
 * Put the returned ref on the `.segmented` element. Until it has measured
 * the selected option, the option keeps its own fill (see globals.css).
 */
export function useSegmentedThumb<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const place = () => {
    const el = ref.current;
    const selected = el?.querySelector<HTMLElement>(SELECTED);
    if (!el || !selected) return;
    el.style.setProperty("--thumb-x", `${selected.offsetLeft}px`);
    el.style.setProperty("--thumb-w", `${selected.offsetWidth}px`);
    el.dataset.thumb = "";
  };

  // Every render: the selection is a prop of whoever owns the group.
  useLayoutEffect(place);

  // Option widths change when the web font loads or the group resizes.
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(place);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * The site's one toggle: pill track, accent fill on the selected option.
 * Used for Monthly/Yearly, units, sex, etc.
 */
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className = "",
}: {
  options: readonly { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  const ref = useSegmentedThumb<HTMLDivElement>();

  return (
    <div ref={ref} role="group" aria-label={label} className={`segmented ${className}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
