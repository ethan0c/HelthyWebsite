import type { Metadata } from "next";
import BarList from "@/components/admin/charts/BarList";
import { DashboardError, Toolbar, loadDashboard } from "@/components/admin/load";
import { Block, METHOD_LABELS, Meter, Table, Td, change } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Features · Usage" };

/** Share of active users below which a feature is flagged as barely used. */
const LOW_USE_SHARE = 0.05;

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export default async function FeaturesPage({ searchParams }: Props) {
  const { days, data, error } = await loadDashboard(searchParams);
  if (!data) return <DashboardError message={error} retry={`/admin/features?days=${days}`} />;

  const active30 = Math.max(1, data.active.last30d);

  return (
    <>
      <Toolbar data={data} scope="Features compare the last 7 and 30 days." />

      <Block
        title="Features"
        note={`Read from what people actually saved. Flagged when fewer than ${LOW_USE_SHARE * 100}% of the people active in the last 30 days used it.`}
      >
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
        <Block title="How people add food" note="Foods added by each method, all time. Most used first.">
          <BarList
            unit="foods added"
            rows={[...data.loggingMethods]
              .sort((a, b) => b.total - a.total)
              .map((m) => ({
                label: METHOD_LABELS[m.method] ?? m.method,
                value: m.total,
                note: `${m.users.toLocaleString()} ${m.users === 1 ? "person" : "people"}`,
              }))}
          />
        </Block>
      ) : null}
    </>
  );
}
