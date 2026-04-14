/**
 * Cloudflare Turnstile server-side verification.
 *
 * When TURNSTILE_SECRET_KEY is not set, verification is skipped (dev) and
 * a warning is logged. In production, always configure the secret.
 */

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set. Skipping verification."
      );
    }
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Captcha token missing." };
  }

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (remoteIp) body.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    const data: { success: boolean; "error-codes"?: string[] } = await res.json();
    if (!data.success) {
      return {
        success: false,
        error:
          data["error-codes"]?.join(",") || "Captcha verification failed.",
      };
    }
    return { success: true };
  } catch (err) {
    console.error("[turnstile] verification error:", err);
    return { success: false, error: "Captcha verification error." };
  }
}
