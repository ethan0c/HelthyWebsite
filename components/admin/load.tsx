import SignOutButton from "@/components/admin/SignOutButton";
import WindowToggle from "@/components/admin/WindowToggle";
import { timeAgo } from "@/components/admin/ui";
import { getInternalAnalytics, type InternalAnalytics, type Window } from "@/lib/internal-analytics";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/** Reads ?days and fetches the dashboard data (cached for a minute server-side). */
export async function loadDashboard(
  searchParams: SearchParams,
): Promise<{ days: Window; data: InternalAnalytics; error?: never } | { days: Window; data?: never; error: string }> {
  const raw = Number((await searchParams).days);
  const days: Window = raw === 7 || raw === 90 ? raw : 30;
  try {
    return { days, data: await getInternalAnalytics(days) };
  } catch (err) {
    return { days, error: err instanceof Error ? err.message : "Couldn't load the dashboard." };
  }
}

export function DashboardError({ message, retry }: { message: string; retry: string }) {
  return (
    <div className="card mt-8 p-6">
      <p className="text-fg">Couldn&apos;t load the numbers.</p>
      <p className="mt-1 text-[14px] text-fg-muted">{message}</p>
      <div className="mt-5 flex gap-3">
        <a href={retry} className="btn-primary btn-sm">
          Try again
        </a>
        <SignOutButton />
      </div>
    </div>
  );
}

/**
 * The row under the section pills: what this page covers, when it was
 * generated, and the time window when the page's numbers depend on it.
 */
export function Toolbar({ data, days, scope }: { data: InternalAnalytics; days?: Window; scope: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-[13px] text-fg-subtle">
        {scope} Updated {timeAgo(data.generatedAt)}. Excludes bot accounts. Days are UTC.
      </p>
      {days ? <WindowToggle days={days} /> : null}
    </div>
  );
}
