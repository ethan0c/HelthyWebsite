/**
 * Session for the internal dashboard (/admin).
 *
 * The cookie is `<expiry>.<signature>`, an HMAC of the expiry keyed on
 * ADMIN_SESSION_SECRET plus ADMIN_PASSWORD, so changing the password signs
 * everyone out. Web Crypto only, so it runs in proxy.ts and server actions.
 * Without ADMIN_USER and ADMIN_PASSWORD set, /admin doesn't exist.
 */

const PRODUCTION = process.env.NODE_ENV === "production";

/** `__Host-` makes the browser refuse the cookie unless it's Secure, host-only and path "/". */
export const ADMIN_COOKIE = PRODUCTION ? "__Host-helthy_admin" : "helthy_admin";
export const SESSION_SECONDS = 60 * 60 * 12;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: PRODUCTION,
  sameSite: "strict" as const,
  path: "/",
};

export function adminConfigured() {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD);
}

async function sign(payload: string) {
  const secret = `${process.env.ADMIN_SESSION_SECRET ?? ""}:${process.env.ADMIN_PASSWORD}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`admin:${payload}`));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${expires}.${await sign(String(expires))}`;
}

export async function verifySession(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(expires));
}

export async function checkCredentials(user: string, password: string) {
  // Both are always checked, so a wrong username takes as long as a wrong password
  const [userOk, passwordOk] = await Promise.all([
    digestEqual(user, process.env.ADMIN_USER ?? ""),
    digestEqual(password, process.env.ADMIN_PASSWORD ?? ""),
  ]);
  return adminConfigured() && userOk && passwordOk;
}

/**
 * Compares HMACs under a throwaway key instead of the strings, so the time
 * taken says nothing about the real value, not even its length.
 */
async function digestEqual(a: string, b: string) {
  const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const [x, y] = await Promise.all(
    [a, b].map(async (s) => new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(s)))),
  );
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

/** Constant-time compare for equal-length values (signatures). */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
