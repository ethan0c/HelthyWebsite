import type { Metadata } from "next";
import DailyBars from "@/components/admin/DailyBars";
import WindowToggle from "@/components/admin/WindowToggle";
import { getInternalAnalytics, type InternalAnalytics, type Window } from "@/lib/internal-analytics";

export const metadata: Metadata = {
  title: "Usage",
  robots: { index: false, follow: false },
};

/** Share of active users below which a feature or screen is flagged as barely used. */
const LOW_USE_SHARE = 0.05;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = Number((await searchParams).days);
  const days: Window = raw === 7 || raw === 90 ? raw : 30;

  let data: InternalAnalytics;
  try {
    data = await getInternalAnalytics(days);
  } catch (err) {
    return (
      <main className="theme-light min-h-screen">
        <div className="container-page section">
          <h1 className="text-display-md">Usage</h1>
          <p className="mt-4 text-fg-muted">{err instanceof Error ? err.message : "Couldn't load the dashboard."}</p>
        </div>
      </main>
    );
  }

  const ph = data.posthog;
  const active30 = Math.max(1, data.active.last30d);

  return (
    <main className="theme-light min-h-screen">
      <div className="container-page py-12 md:py-16">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-display-md">Usage</h1>
            <p className="mt-2 text-[13px] text-fg-subtle">
              Updated {timeAgo(data.generatedAt)}. Excludes bot accounts. Days are UTC.
            </p>
          </div>
          <WindowToggle days={days} />
        </header>

        {/* Who's here */}
        <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          <Stat label="Online now" value={Math.max(data.active.online, ph?.onlineNow ?? 0)} note="last 5 minutes" />
          <Stat label="Last hour" value={data.active.lastHour} />
          <Stat label="Last 24 hours" value={data.active.last24h} />
          <Stat label="Last 7 days" value={data.active.last7d} />
          <Stat label="Last 30 days" value={data.active.last30d} />
          <Stat label="All users" value={data.users.total} note={`${pct(data.users.onboarded, data.users.total)} onboarded`} />
          <Stat label="Premium" value={data.users.premium} note={`${pct(data.users.premium, data.users.total)} of users`} />
        </section>
        <p className="mt-3 text-[13px] text-fg-subtle">
          Active means the app talked to our servers. New users: {data.users.newToday} today, {data.users.new7d} this week,{" "}
          {data.users.new30d} in 30 days.
        </p>

        <section className="mt-10 grid gap-3 lg:grid-cols-3">
          {ph ? (
            <DailyBars label="People who opened the app" unit="people" data={ph.activeByDay.map((d) => ({ date: d.date, value: d.users }))} />
          ) : null}
          <DailyBars label="People who logged something" unit="people" data={data.engagedByDay.map((d) => ({ date: d.date, value: d.users }))} />
          <DailyBars label="Sign ups" unit="sign ups" data={data.signupsByDay.map((d) => ({ date: d.date, value: d.count }))} />
        </section>

        {/* Features */}
        <Block title="Features" note={`Read from what people actually saved. Flagged when fewer than ${LOW_USE_SHARE * 100}% of the people active in the last 30 days used it.`}>
          <Table head={["Feature", "People, 7 days", "People, 30 days", "Times, 30 days", "vs previous 30 days"]}>
            {data.features.map((f) => (
              <tr key={f.key} className="border-t border-line">
                <Td>
                  {f.label}
                  {f.d30.users / active30 < LOW_USE_SHARE ? <span className="badge ml-2">Barely used</span> : null}
                </Td>
                <Td num>{f.d7.users.toLocaleString()}</Td>
                <Td num>
                  <Meter value={f.d30.users} max={active30} label={f.d30.users.toLocaleString()} />
                </Td>
                <Td num>{f.d30.events.toLocaleString()}</Td>
                <Td num>{change(f.d30.events, f.prev30Events)}</Td>
              </tr>
            ))}
          </Table>
        </Block>

        {data.loggingMethods.length > 0 ? (
          <Block title="How people add food" note="All time, counted when a food is added.">
            <Table head={["Method", "Foods added", "People"]}>
              {data.loggingMethods.map((m) => (
                <tr key={m.method} className="border-t border-line">
                  <Td>{METHOD_LABELS[m.method] ?? m.method}</Td>
                  <Td num>{m.total.toLocaleString()}</Td>
                  <Td num>{m.users.toLocaleString()}</Td>
                </tr>
              ))}
            </Table>
          </Block>
        ) : null}

        {/* Screens */}
        {ph ? (
          <>
            <Block title="Screens" note={`Last ${ph.days} days, most opened first. ${ph.activeUsers.toLocaleString()} people opened the app. Time is the median per visit.`}>
              <Table head={["Screen", "Opens", "People", "Share of active", "Time"]}>
                {ph.screens.map((s) => {
                  const share = s.users / Math.max(1, ph.activeUsers);
                  return (
                    <tr key={s.screen} className="border-t border-line">
                      <Td>
                        {s.screen}
                        {share < LOW_USE_SHARE ? <span className="badge ml-2">Barely used</span> : null}
                      </Td>
                      <Td num>{s.views.toLocaleString()}</Td>
                      <Td num>{s.users.toLocaleString()}</Td>
                      <Td num>
                        <Meter value={s.users} max={ph.activeUsers} label={pct(s.users, ph.activeUsers)} />
                      </Td>
                      <Td num>{s.medianSeconds == null ? "–" : duration(s.medianSeconds)}</Td>
                    </tr>
                  );
                })}
              </Table>
            </Block>

            <Block title="Screens nobody opened" note={`Screens in the app with no opens in the last ${ph.days} days.`}>
              {ph.unusedScreens.length === 0 ? (
                <p className="text-fg-muted">Every screen was opened at least once.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {ph.unusedScreens.map((s) => (
                    <li key={s} className="badge">{s}</li>
                  ))}
                </ul>
              )}
            </Block>

            <Block title="Tracked actions" note={`Last ${ph.days} days.`}>
              <Table head={["Action", "Times", "People"]}>
                {ph.events.map((e) => (
                  <tr key={e.event} className="border-t border-line">
                    <Td>{e.event}</Td>
                    <Td num>{e.count.toLocaleString()}</Td>
                    <Td num>{e.users.toLocaleString()}</Td>
                  </tr>
                ))}
              </Table>
            </Block>
          </>
        ) : (
          <Block title="Screens" note={data.posthogError ?? undefined}>
            <p className="text-fg-muted">Screen usage shows up here once the backend can read screen views.</p>
          </Block>
        )}

        {/* Platforms */}
        <Block
          title="Devices and app versions"
          note={ph ? "People seen in the last 7 days." : "Devices registered for notifications, active in the last 30 days."}
        >
          <Table head={["Platform", "App version", "People"]} text={[1]}>
            {(ph
              ? ph.appVersions.map((v) => ({ platform: v.os, appVersion: v.version, users: v.users }))
              : data.platforms
            ).map((p) => (
              <tr key={`${p.platform}-${p.appVersion}`} className="border-t border-line">
                <Td>{p.platform}</Td>
                <Td>{p.appVersion}</Td>
                <Td num>{p.users.toLocaleString()}</Td>
              </tr>
            ))}
          </Table>
        </Block>

        {/* People */}
        <Block title="Active in the last 24 hours" note="Most recent first, up to 50.">
          <Table head={["Name", "Email", "Plan", "Joined", "Last active"]} text={[1, 2, 3, 4]}>
            {data.recentlyActive.map((u) => (
              <tr key={u.id} className="border-t border-line">
                <Td>{u.firstName}</Td>
                <Td>{u.email}</Td>
                <Td>{u.isPremium ? <span className="badge badge-accent">Premium</span> : "Free"}</Td>
                <Td>{new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Td>
                <Td>{timeAgo(u.lastActiveAt)}</Td>
              </tr>
            ))}
          </Table>
        </Block>
      </div>
    </main>
  );
}

const METHOD_LABELS: Record<string, string> = {
  barcode: "Barcode",
  nutrition_label: "Nutrition label",
  speech: "Speech",
  voice: "Voice",
  quick: "Quick add",
  search: "Search",
};

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="tile p-4">
      <div className="text-[13px] font-medium text-fg-muted">{label}</div>
      <div className="mt-2 text-numeric text-[28px] leading-none tabular-nums">{value.toLocaleString()}</div>
      {note ? <div className="mt-2 text-[12px] text-fg-subtle">{note}</div> : null}
    </div>
  );
}

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-title">{title}</h2>
      {note ? <p className="mt-1 text-[13px] text-fg-subtle">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** `text` lists the column indexes after the first that hold text (left-aligned); the rest are numbers. */
function Table({ head, text = [], children }: { head: string[]; text?: number[]; children: React.ReactNode }) {
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

function Td({ children, num }: { children: React.ReactNode; num?: boolean }) {
  return <td className={`px-4 py-3 ${num ? "text-right tabular-nums" : "text-left"} whitespace-nowrap`}>{children}</td>;
}

/** Inline magnitude bar for a table cell. The number carries the value; the bar shows proportion. */
function Meter({ value, max, label }: { value: number; max: number; label: string }) {
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

function pct(part: number, whole: number) {
  return whole === 0 ? "0%" : `${Math.round((part / whole) * 100)}%`;
}

function change(now: number, before: number) {
  if (before === 0) return now === 0 ? "–" : "new";
  const delta = Math.round(((now - before) / before) * 100);
  return `${delta > 0 ? "+" : ""}${delta}%`;
}

function duration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function timeAgo(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}
