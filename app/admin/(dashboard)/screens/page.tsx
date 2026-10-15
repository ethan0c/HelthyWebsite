import type { Metadata } from "next";
import BarList from "@/components/admin/charts/BarList";
import { DashboardError, Toolbar, loadDashboard } from "@/components/admin/load";
import { Block, Meter, Table, Td, duration, pct } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Screens · Usage" };

/** Share of active users below which a screen is flagged as barely used. */
const LOW_USE_SHARE = 0.05;

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export default async function ScreensPage({ searchParams }: Props) {
  const { days, data, error } = await loadDashboard(searchParams);
  if (!data) return <DashboardError message={error} retry={`/admin/screens?days=${days}`} />;

  const ph = data.posthog;
  if (!ph) {
    return (
      <>
        <Toolbar data={data} days={days} scope="" />
        <Block title="Screens" note={data.posthogError ?? undefined}>
          <p className="text-fg-muted">Screen usage shows up here once the backend can read screen views.</p>
        </Block>
      </>
    );
  }

  return (
    <>
      <Toolbar data={data} days={days} scope={`Last ${ph.days} days. ${ph.activeUsers.toLocaleString()} people opened the app.`} />

      <Block title="Screens" note="Most opened first. Time is the median per visit.">
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
              <li key={s} className="badge">
                {s}
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block title="Tracked actions" note="Times each action happened. The note under each is how many people did it.">
        <BarList
          unit="times"
          rows={ph.events.map((e) => ({
            label: e.event,
            value: e.count,
            note: `${e.users.toLocaleString()} ${e.users === 1 ? "person" : "people"}`,
          }))}
        />
      </Block>
    </>
  );
}
