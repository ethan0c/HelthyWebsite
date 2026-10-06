/** Shared building blocks for the admin dashboard pages. */

export const METHOD_LABELS: Record<string, string> = {
  barcode: "Barcode",
  nutrition_label: "Nutrition label",
  speech: "Speech",
  voice: "Voice",
  quick: "Quick add",
  search: "Search",
};

export function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="tile p-4">
      <div className="text-[13px] font-medium text-fg-muted">{label}</div>
      <div className="mt-2 text-numeric text-[28px] leading-none">{value.toLocaleString()}</div>
      {note ? <div className="mt-2 text-[12px] text-fg-subtle">{note}</div> : null}
    </div>
  );
}

export function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-title">{title}</h2>
      {note ? <p className="mt-1 text-[13px] text-fg-subtle">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** `text` lists the column indexes after the first that hold text (left-aligned); the rest are numbers. */
export function Table({ head, text = [], children }: { head: string[]; text?: number[]; children: React.ReactNode }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="text-left text-[13px] text-fg-subtle">
            {head.map((h, i) => (
              <th key={h} className={`px-4 py-3 font-medium ${i > 0 && !text.includes(i) ? "text-right" : ""}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, num }: { children: React.ReactNode; num?: boolean }) {
  return <td className={`px-4 py-3 ${num ? "text-right tabular-nums" : "text-left"} whitespace-nowrap`}>{children}</td>;
}

/** Inline magnitude bar for a table cell. The number carries the value; the bar shows proportion. */
export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const width = Math.min(100, (value / Math.max(1, max)) * 100);
  return (
    <span className="inline-flex items-center justify-end gap-3">
      <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <span className="block h-full rounded-full bg-fg-muted" style={{ width: `${width}%` }} />
      </span>
      <span className="min-w-12">{label}</span>
    </span>
  );
}

export function pct(part: number, whole: number) {
  return whole === 0 ? "0%" : `${Math.round((part / whole) * 100)}%`;
}

export function change(now: number, before: number) {
  if (before === 0) return now === 0 ? "–" : "new";
  const delta = Math.round(((now - before) / before) * 100);
  return `${delta > 0 ? "+" : ""}${delta}%`;
}

export function duration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export function timeAgo(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}
