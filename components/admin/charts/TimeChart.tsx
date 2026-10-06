"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

/**
 * Daily time series as columns (one series) or lines (one or two series),
 * sized to its container. Recessive hairline grid, clean y ticks, date labels
 * spaced to fit the width, a crosshair tooltip that lists every series at that
 * day, arrow-key navigation, and a screen-reader table with every value.
 * `null` means "no data for that day" and draws as a gap, not a zero.
 */

export type ChartSeries = {
  label: string;
  /** A CSS colour, normally a --chart-* token */
  color: string;
  values: (number | null)[];
};

const HEIGHT = 200; // plot area
const X_AXIS = 28; // band under the plot for date labels
const TOP = 10;
const RIGHT = 8;
const BAR_MAX = 24;
const GAP = 2;

export default function TimeChart({
  title,
  dates,
  series,
  kind,
  unit,
  note,
}: {
  title: string;
  /** YYYY-MM-DD, one per value, oldest first (UTC days) */
  dates: string[];
  series: ChartSeries[];
  kind: "bar" | "line";
  /** Plural noun for the values, e.g. "people" */
  unit: string;
  note?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const tableId = useId();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = dates.length;
  const all = series.flatMap((s) => s.values).filter((v): v is number => v != null);
  const ticks = niceTicks(Math.max(0, ...all));
  const top = ticks[ticks.length - 1] || 1;
  const left = Math.max(...ticks.map((t) => t.toLocaleString().length)) * 7 + 12;
  const plotW = Math.max(0, width - left - RIGHT);
  const slot = n ? plotW / n : 0;
  const x = (i: number) => left + slot * (i + 0.5);
  const y = (v: number) => TOP + HEIGHT - (v / top) * HEIGHT;

  // Date labels at least ~72px apart, always ending on the latest day
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(plotW / 72))));
  const labelled = dates.map((_, i) => (n - 1 - i) % every === 0);

  const pointer = (e: PointerEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const i = Math.floor(((e.clientX - box.left) / box.width) * n);
    setActive(Math.min(n - 1, Math.max(0, i)));
  };
  const keys = (e: KeyboardEvent) => {
    const move: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
    if (e.key in move) setActive((a) => Math.min(n - 1, Math.max(0, (a ?? n - 1) + move[e.key])));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(n - 1);
    else return;
    e.preventDefault();
  };

  const single = series.length === 1 ? series[0] : null;
  const total = single ? single.values.reduce<number>((sum, v) => sum + (v ?? 0), 0) : 0;
  const peak = single ? Math.max(0, ...single.values.map((v) => v ?? 0)) : 0;
  const tipLeft = active == null ? 0 : x(active) > width - 232 ? x(active) - 236 : x(active) + 12;

  return (
    <figure className="card p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[15px] font-medium text-fg">{title}</span>
        {single ? (
          <span className="text-[13px] text-fg-subtle">
            {total.toLocaleString()} total · peak {peak.toLocaleString()}
          </span>
        ) : null}
      </figcaption>
      <p className="mt-1 text-[13px] text-fg-subtle">
        {formatDay(dates[0])} to {formatDay(dates[n - 1])}
        {note ? `. ${note}` : ""}
      </p>

      {/* A legend for two or more series; a single series is named by the title */}
      {series.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-fg-muted">
          {series.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              {kind === "line" ? (
                <span aria-hidden className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
              ) : (
                <span aria-hidden className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
              )}
              {s.label}
            </li>
          ))}
        </ul>
      ) : null}

      <div
        ref={wrap}
        className="relative mt-4 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-fg"
        style={{ height: TOP + HEIGHT + X_AXIS }}
        tabIndex={0}
        role="img"
        aria-label={`${title}. Use the arrow keys to read each day.`}
        aria-describedby={tableId}
        onKeyDown={keys}
        onFocus={() => setActive((a) => a ?? n - 1)}
        onBlur={() => setActive(null)}
      >
        {width > 0 && n > 0 ? (
          <svg width={width} height={TOP + HEIGHT + X_AXIS} className="block overflow-visible">
            {/* Grid and y ticks */}
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={left}
                  x2={width - RIGHT}
                  y1={y(t)}
                  y2={y(t)}
                  stroke={t === 0 ? "var(--line-strong)" : "var(--line)"}
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
                <text x={left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-fg-subtle text-[11px] tabular-nums">
                  {t.toLocaleString()}
                </text>
              </g>
            ))}

            {/* Hovered day */}
            {active != null ? (
              kind === "bar" ? (
                <rect x={left + slot * active} y={TOP} width={slot} height={HEIGHT} fill="var(--surface-2)" />
              ) : (
                <line x1={x(active)} x2={x(active)} y1={TOP} y2={TOP + HEIGHT} stroke="var(--line-strong)" strokeWidth={1} />
              )
            ) : null}

            {kind === "bar" && single
              ? single.values.map((v, i) => {
                  if (!v) return null;
                  const w = Math.max(1, Math.min(BAR_MAX, slot - GAP));
                  return <path key={i} d={columnPath(x(i) - w / 2, y(v), w, y(0) - y(v))} fill={single.color} />;
                })
              : null}

            {kind === "line"
              ? series.map((s) => (
                  <g key={s.label}>
                    {single ? <path d={areaPath(s.values, x, y)} fill={s.color} opacity={0.1} /> : null}
                    <path
                      d={linePath(s.values, x, y)}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {/* End dot, or the hovered day's dot, ringed in the surface colour */}
                    {(() => {
                      const i = active ?? lastIndex(s.values);
                      const v = i == null ? null : s.values[i];
                      return i == null || v == null ? null : (
                        <circle cx={x(i)} cy={y(v)} r={4} fill={s.color} stroke="var(--surface)" strokeWidth={2} />
                      );
                    })()}
                  </g>
                ))
              : null}

            {/* Date labels */}
            {dates.map((d, i) =>
              labelled[i] ? (
                <text
                  key={d}
                  x={Math.min(Math.max(x(i), left + 18), width - RIGHT - 18)}
                  y={TOP + HEIGHT + 18}
                  textAnchor="middle"
                  className="fill-fg-subtle text-[11px]"
                >
                  {formatDay(d)}
                </text>
              ) : null,
            )}

            {/* Hit area: the whole plot, so readers aim at a day, not a mark */}
            <rect
              x={left}
              y={TOP}
              width={plotW}
              height={HEIGHT}
              fill="transparent"
              onPointerMove={pointer}
              onPointerDown={pointer}
              onPointerLeave={() => setActive(null)}
            />
          </svg>
        ) : null}

        {active != null && width > 0 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute top-2 w-max min-w-36 max-w-56 rounded-xl border border-line bg-surface px-3 py-2 text-[12px]"
            style={{ left: tipLeft }}
          >
            <div className="text-fg-subtle">{formatDay(dates[active], true)}</div>
            {series.map((s) => (
              <div key={s.label} className="mt-1 flex items-center gap-2">
                {series.length > 1 ? (
                  <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
                ) : null}
                <span className="font-medium tabular-nums text-fg">
                  {s.values[active] == null ? "No data" : s.values[active]!.toLocaleString()}
                </span>
                <span className="truncate text-fg-muted">{series.length > 1 ? s.label : unit}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Every value, for screen readers */}
      <table id={tableId} className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            {series.map((s) => (
              <th key={s.label} scope="col">
                {series.length > 1 ? s.label : unit}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((d, i) => (
            <tr key={d}>
              <th scope="row">{formatDay(d, true)}</th>
              {series.map((s) => (
                <td key={s.label}>{s.values[i] ?? "No data"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** 0 and 3 to 5 evenly spaced round steps (1, 2 or 5 × 10ⁿ) covering `max`. */
export function niceTicks(max: number) {
  if (max <= 0) return [0, 1];
  const rough = max / 4;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= rough) ?? 10 * pow;
  const unit = Math.max(1, step);
  const ticks = [];
  for (let t = 0; t < max + unit; t += unit) ticks.push(t);
  return ticks;
}

/** A column with 4px rounded top corners and a square base. */
function columnPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

/** Line through the days that have data; a null breaks the line. */
function linePath(values: (number | null)[], x: (i: number) => number, y: (v: number) => number) {
  let d = "";
  let pen = false;
  values.forEach((v, i) => {
    if (v == null) return void (pen = false);
    d += `${pen ? "L" : "M"}${x(i)},${y(v)}`;
    pen = true;
  });
  return d;
}

function areaPath(values: (number | null)[], x: (i: number) => number, y: (v: number) => number) {
  const pts = values.map((v, i) => (v == null ? null : [x(i), y(v)])).filter(Boolean) as number[][];
  if (pts.length < 2) return "";
  const base = y(0);
  return `M${pts[0][0]},${base}${pts.map((p) => `L${p[0]},${p[1]}`).join("")}L${pts[pts.length - 1][0]},${base}Z`;
}

function lastIndex(values: (number | null)[]) {
  for (let i = values.length - 1; i >= 0; i--) if (values[i] != null) return i;
  return null;
}

export function formatDay(date: string, long = false) {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(long ? { weekday: "short" } : {}),
    timeZone: "UTC",
  });
}
