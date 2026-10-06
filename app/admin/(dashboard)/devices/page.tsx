import type { Metadata } from "next";
import BarList from "@/components/admin/charts/BarList";
import { DashboardError, Toolbar, loadDashboard } from "@/components/admin/load";
import { Block, Table, Td } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Devices · Usage" };

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export default async function DevicesPage({ searchParams }: Props) {
  const { days, data, error } = await loadDashboard(searchParams);
  if (!data) return <DashboardError message={error} retry={`/admin/devices?days=${days}`} />;

  // PostHog versions when it returned any; otherwise the devices registered for notifications.
  const ph = data.posthog?.appVersions.length ? data.posthog : null;
  const rows = ph
    ? ph.appVersions.map((v) => ({ platform: v.os, appVersion: v.version, users: v.users }))
    : data.platforms;
  const byPlatform = new Map<string, number>();
  for (const r of rows) byPlatform.set(r.platform, (byPlatform.get(r.platform) ?? 0) + r.users);
  const scope = ph
    ? "People seen in the last 7 days."
    : "Devices registered for notifications, owned by people active in the last 30 days.";

  return (
    <>
      <Toolbar data={data} scope={scope} />

      <Block title="Platforms" note="People on each platform.">
        <BarList
          unit="people"
          rows={[...byPlatform].sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }))}
        />
      </Block>

      <Block title="App versions" note="Newest versions people are on, most people first.">
        <Table head={["Platform", "App version", "People"]} text={[1]}>
          {rows.map((p) => (
            <tr key={`${p.platform}-${p.appVersion}`} className="border-t border-line">
              <Td>{p.platform}</Td>
              <Td>{p.appVersion}</Td>
              <Td num>{p.users.toLocaleString()}</Td>
            </tr>
          ))}
        </Table>
      </Block>
    </>
  );
}
