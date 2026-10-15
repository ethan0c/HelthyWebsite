/**
 * Ranked horizontal bars for one measure across categories (one colour, since
 * the bar length already carries the value). The value sits at the bar's tip
 * so nothing needs hovering, and rows stack label-over-bar on small screens.
 */
export default function BarList({
  rows,
  unit,
}: {
  rows: Array<{ label: string; value: number; note?: string }>;
  /** Plural noun for the values, read out after each number */
  unit: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="card divide-y divide-line">
      {rows.map((r) => (
        <li key={r.label} className="grid gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-center">
          <div className="min-w-0">
            <div className="truncate text-[14px] text-fg">{r.label}</div>
            {r.note ? <div className="text-[12px] text-fg-subtle">{r.note}</div> : null}
          </div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-2.5 shrink-0 rounded-r-[4px] bg-fg"
              style={{ width: `calc(${(r.value / max) * 100}% - ${(r.value / max) * 5}rem)`, minWidth: r.value ? 2 : 0 }}
            />
            <span className="whitespace-nowrap text-[14px] tabular-nums text-fg">
              {r.value.toLocaleString()}
              <span className="sr-only"> {unit}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
