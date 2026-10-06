"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, COOKIE_OPTIONS, SESSION_SECONDS, checkCredentials, createSession } from "@/lib/admin-session";
import { checkLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";

/** `user` is sent back so the form can keep it after a failed attempt. */
export type LoginState = { error?: string; user?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const ip = getClientIp({ headers: await headers() });
  const user = String(form.get("user") ?? "");
  // Per IP, plus a ceiling across all IPs so a botnet can't spread its guesses out
  const [perIp, overall] = await Promise.all([
    checkLimit("admin-login", ip, 10, 15 * 60),
    checkLimit("admin-login-all", "all", 50, 60 * 60),
  ]);
  if (!perIp.success || !overall.success) {
    return { error: "Too many attempts. Try again later.", user };
  }

  const password = String(form.get("password") ?? "");
  if (!(await checkCredentials(user, password))) {
    console.warn(`[admin] failed sign-in from ${ip}`);
    return { error: "That username and password don't match.", user };
  }

  (await cookies()).set(ADMIN_COOKIE, await createSession(), { ...COOKIE_OPTIONS, maxAge: SESSION_SECONDS });
  redirect(safeNext(String(form.get("next") ?? "")));
}

/** Only ever return to a dashboard page on this site. */
function safeNext(next: string) {
  try {
    const url = new URL(next, "https://helthy.invalid");
    if (url.origin === "https://helthy.invalid" && /^\/admin(\/|$)/.test(url.pathname) && url.pathname !== "/admin/login") {
      return url.pathname + url.search;
    }
  } catch {}
  return "/admin";
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: COOKIE_OPTIONS.path });
  redirect("/admin/login");
}
