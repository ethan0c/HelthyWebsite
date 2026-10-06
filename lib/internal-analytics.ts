/**
 * Server-only client for the backend's internal analytics endpoint
 * (helthy_app/backend/src/routes/internalAnalyticsRoutes.ts). Types mirror
 * internalAnalyticsService.ts there.
 */

export type Window = 7 | 30 | 90;

export interface UsageWindow { events: number; users: number }

export interface InternalAnalytics {
  generatedAt: string;
  users: { total: number; onboarded: number; premium: number; newToday: number; new7d: number; new30d: number };
  active: { online: number; lastHour: number; last24h: number; last7d: number; last30d: number };
  recentlyActive: Array<{ id: string; firstName: string; email: string; isPremium: boolean; lastActiveAt: string; createdAt: string }>;
  signupsByDay: Array<{ date: string; count: number }>;
  engagedByDay: Array<{ date: string; users: number }>;
  features: Array<{ key: string; label: string; d7: UsageWindow; d30: UsageWindow; prev30Events: number }>;
  loggingMethods: Array<{ method: string; total: number; users: number }>;
  platforms: Array<{ platform: string; appVersion: string; users: number }>;
  posthog: {
    days: number;
    onlineNow: number;
    activeUsers: number;
    activeByDay: Array<{ date: string; users: number }>;
    screens: Array<{ screen: string; views: number; users: number; medianSeconds: number | null }>;
    unusedScreens: string[];
    events: Array<{ event: string; count: number; users: number }>;
    appVersions: Array<{ version: string; os: string; users: number }>;
  } | null;
  posthogError: string | null;
}

export async function getInternalAnalytics(days: Window): Promise<InternalAnalytics> {
  const base = process.env.HELTHY_API_URL;
  const key = process.env.INTERNAL_ANALYTICS_KEY;
  if (!base || !key) {
    throw new Error("Set HELTHY_API_URL and INTERNAL_ANALYTICS_KEY to load the dashboard.");
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/api/internal/analytics?days=${days}`, {
    headers: { "x-internal-key": key },
    // A minute of server-side caching makes switching windows instant; the
    // dashboard shows when the numbers were generated
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`The backend answered ${res.status}.`);
  const json = (await res.json()) as { success: boolean; data: InternalAnalytics };
  return json.data;
}
