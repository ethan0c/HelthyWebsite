"use client";

import { useState } from "react";

/**
 * One series per day as thin bars on a shared baseline, with a hover readout.
 * Bars are 4px-rounded at the data end, 2px apart, and the hit target is the
 * full column so small days are still easy to hover.
 */
export default function DailyBars({
  data,
  label,
  unit,
}: {
  data: Array<{ date: string; value: number }>;
  label: string;
  unit: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const shown = hover == null ? null : data[hover];

  return (
    <figure className="card p-5">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] font-medium text-fg-muted">{label}</span>
        <span className="text-[13px] tabular-nums text-fg-subtle">
          {shown ? `${formatDay(shown.date)}: ${shown.value.toLocaleString()} ${unit}` : `Peak ${max.toLocaleString()} · total ${total.toLocaleString()}`}
        </span>
      </figcaption>
      <div
        className="mt-4 flex h-36 items-end gap-[2px] border-b border-line"
        role="img"
        aria-label={`${label}, ${data.length} days, peak ${max}`}
        onMouseLeave={() => setHover(null)}
      >
        {data.map((d, i) => (
          <div
            key={d.date}
            className="flex h-full flex-1 items-end"
            onMouseEnter={() => setHover(i)}
            title={`${formatDay(d.date)}: ${d.value} ${unit}`}
          >
            <div
              className={`w-full rounded-t-[4px] transition-colors duration-150 ${hover === i ? "bg-fg" : "bg-fg-subtle"}`}
              style={{ height: `${d.value === 0 ? 0 : Math.max(2, (d.value / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-fg-subtle">
        <span>{data[0] ? formatDay(data[0].date) : ""}</span>
        <span>{data.at(-1) ? formatDay(data.at(-1)!.date) : ""}</span>
      </div>
    </figure>
  );
}

function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}
