import type { Metadata } from "next";
import { DashboardError, Toolbar, loadDashboard } from "@/components/admin/load";
import { Block, Table, Td, timeAgo } from "@/components/admin/ui";

export const metadata: Metadata = { title: "People · Usage" };

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export default async function PeoplePage({ searchParams }: Props) {
  const { days, data, error } = await loadDashboard(searchParams);
  if (!data) return <DashboardError message={error} retry={`/admin/people?days=${days}`} />;

  return (
    <>
      <Toolbar data={data} scope="People active in the last 24 hours, most recent first, up to 50." />

      <Block title="Active in the last 24 hours">
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
    </>
  );
}
