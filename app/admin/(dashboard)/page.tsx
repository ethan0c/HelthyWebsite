import TimeChart from "@/components/admin/charts/TimeChart";
import { DashboardError, Toolbar, loadDashboard } from "@/components/admin/load";
import { Stat, pct } from "@/components/admin/ui";

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export default async function OverviewPage({ searchParams }: Props) {
  const { days, data, error } = await loadDashboard(searchParams);
  if (!data) return <DashboardError message={error} retry={`/admin?days=${days}`} />;

  const ph = data.posthog;
  // One date axis for the window. The database series only go back 30 days,
  // so earlier days are "no data" (a gap), never a fake zero.
  const dates = lastDays(ph ? ph.activeByDay.map((d) => d.date) : data.engagedByDay.map((d) => d.date), days);
  const opened = byDate(ph?.activeByDay.map((d) => [d.date, d.users]) ?? []);
  const engaged = byDate(data.engagedByDay.map((d) => [d.date, d.users]));
  const signups = byDate(data.signupsByDay.map((d) => [d.date, d.count]));
  const signupDates = dates.filter((d) => signups.has(d));
  const short = days > 30 ? "Only the last 30 days are recorded for this." : undefined;

  return (
    <>
      <Toolbar data={data} days={days} scope={`Charts cover the last ${days} days.`} />

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
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

      <section className="mt-8 grid gap-3 xl:grid-cols-[3fr_2fr]">
        <TimeChart
          title="Active people per day"
          kind="line"
          unit="people"
          dates={dates}
          note={ph && days > 30 ? "Logging is only recorded for the last 30 days." : undefined}
          series={[
            ...(ph ? [{ label: "Opened the app", color: "var(--chart-1)", values: dates.map((d) => opened.get(d) ?? null) }] : []),
            { label: "Logged something", color: ph ? "var(--chart-2)" : "var(--fg)", values: dates.map((d) => engaged.get(d) ?? null) },
          ]}
        />
        <TimeChart
          title="Sign ups per day"
          kind="bar"
          unit="sign ups"
          dates={signupDates}
          note={short}
          series={[{ label: "Sign ups", color: "var(--fg)", values: signupDates.map((d) => signups.get(d) ?? 0) }]}
        />
      </section>
    </>
  );
}

function byDate(rows: Array<[string, number]>) {
  return new Map(rows.map(([d, v]) => [d.slice(0, 10), v]));
}

/** The last `days` dates (YYYY-MM-DD, UTC) ending on the latest date we have. */
function lastDays(known: string[], days: number) {
  const end = known.length ? new Date(`${known[known.length - 1].slice(0, 10)}T00:00:00Z`) : new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}
