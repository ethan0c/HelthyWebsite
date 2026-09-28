/**
 * Site-wide facts used by metadata, JSON-LD and the SEO landing pages.
 * Change prices here and in PricingSection / FAQSection together.
 */

export const SITE_URL = "https://helthy.app";
export const SITE_NAME = "Helthy";

export const APP_STORE_ID = "6751759974";
export const APP_STORE_URL = `https://apps.apple.com/us/app/helthy-track-food-workouts/id${APP_STORE_ID}`;
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.helthy.mobile";

export const PRO_PRICE = { monthly: 4.99, yearly: 29.99 };

export const SOCIAL_PROFILES = [
  "https://x.com/helthyapp",
  "https://instagram.com/helthy.app",
  "https://tiktok.com/@helthyapp",
  APP_STORE_URL,
  PLAY_STORE_URL,
];

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
