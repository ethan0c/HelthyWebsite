/**
 * Shared security helpers for API routes.
 *
 * - `getClientIp`: prefers Vercel's signed header (unspoofable) before falling
 *   back to `x-forwarded-for`.
 * - `isAllowedOrigin`: rejects cross-origin POSTs (CSRF).
 * - `sanitizeHtml`: escapes HTML special chars for any user input passed to
 *   downstream systems that MIGHT render it (Loops, Zoho, etc).
 */

/**
 * Additional allowed origins (production domains, preview deploys, etc).
 * Same-origin requests are always allowed.
 */
const EXTRA_ALLOWED_ORIGINS = [
  "https://helthy.app",
  "https://www.helthy.app",
];

export function getClientIp(request: Request): string {
  // On Vercel, x-vercel-forwarded-for is set by their edge and cannot be
  // spoofed by clients. Prefer it whenever available.
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();

  const cloudflare = request.headers.get("cf-connecting-ip");
  if (cloudflare) return cloudflare.trim();

  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  // Same-origin submissions: origin header matches our host.
  if (origin && host) {
    try {
      const url = new URL(origin);
      if (url.host === host) return true;
    } catch {
      // fall through
    }
  }

  // Some clients (notably Safari) omit Origin on same-origin POSTs. Accept a
  // same-origin Referer as a fallback.
  if (!origin && referer && host) {
    try {
      const url = new URL(referer);
      if (url.host === host) return true;
    } catch {
      // fall through
    }
  }

  if (origin && EXTRA_ALLOWED_ORIGINS.includes(origin)) return true;

  return false;
}

export function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
