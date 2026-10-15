import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, adminConfigured, verifySession } from "@/lib/admin-session";

/**
 * Gate for the internal dashboard (/admin). Signed-out visitors are sent to
 * /admin/login; signed-in ones skip it. Without ADMIN_USER / ADMIN_PASSWORD
 * set, /admin doesn't exist (404), so a missing env var never exposes it.
 */
export async function proxy(request: NextRequest) {
  if (!adminConfigured()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { pathname, search } = request.nextUrl;
  const signedIn = await verifySession(request.cookies.get(ADMIN_COOKIE)?.value);
  const onLogin = pathname === "/admin/login";

  if (onLogin) {
    return signedIn ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next();
  }
  if (signedIn) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
