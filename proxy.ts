import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Password gate for the internal dashboard (/admin).
 * HTTP basic auth against ADMIN_USER / ADMIN_PASSWORD. Without them set,
 * /admin doesn't exist (404), so a missing env var never exposes it.
 */
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) {
    return new NextResponse("Not found", { status: 404 });
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const split = decoded.indexOf(":");
    if (split > 0 && safeEqual(decoded.slice(0, split), user) && safeEqual(decoded.slice(split + 1), password)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Helthy admin", charset="UTF-8"' },
  });
}

/** Constant-time string compare (no Node crypto in the proxy runtime). */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
