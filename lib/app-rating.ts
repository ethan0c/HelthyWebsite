import { APP_STORE_ID } from "@/lib/site";

export type AppRating = { value: number; count: number };

/**
 * Live App Store rating for structured data. Google penalises review markup
 * that doesn't match the real listing, so this is fetched rather than typed
 * in. Cached for a day; returns null if Apple's lookup API is unreachable,
 * in which case the rating is simply left out of the JSON-LD.
 */
export async function getAppRating(): Promise<AppRating | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`,
      { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const app = data?.results?.[0];
    const value = Number(app?.averageUserRating);
    const count = Number(app?.userRatingCount);
    if (!value || !count) return null;
    return { value: Math.round(value * 10) / 10, count };
  } catch {
    return null;
  }
}
