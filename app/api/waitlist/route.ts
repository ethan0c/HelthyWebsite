import { NextResponse } from "next/server";
import { z } from "zod";

// Simple in-memory token cache for the server process
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getZohoAccessToken() {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Zoho OAuth env (ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN)");
  }

  // Use cached token if still valid (with 60s buffer)
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60_000) {
    return cachedAccessToken.token;
  }

  const tokenUrl = `https://accounts.zoho.com/oauth/v2/token`;

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  body.set("refresh_token", refreshToken);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = await res.json().catch(() => ({} as any));
  if (!res.ok || !json.access_token) {
    const err = typeof json === "object" && json ? json.error || JSON.stringify(json) : await res.text();
    throw new Error(`Failed to fetch Zoho access token: ${res.status} ${err}`);
  }

  const expiresIn = typeof json.expires_in === "number" ? json.expires_in : 3600;
  cachedAccessToken = {
    token: json.access_token as string,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  return cachedAccessToken.token;
}

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    const token = await getZohoAccessToken();
    const listKey = process.env.ZOHO_LIST_KEY;

    if (!listKey) {
      console.error("Missing Zoho Campaigns env: ZOHO_LIST_KEY");
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    // Build form-encoded body as required by Zoho Campaigns v1.1
    const form = new URLSearchParams();
    form.set("listkey", listKey);
    form.set("resfmt", "JSON");
    // API accepts up to 10 emails comma-separated. We send a single email per submission.
    form.set("emailids", data.email.trim());

    const zohoRes = await fetch(`https://campaigns.zoho.com/api/v1.1/addlistsubscribersinbulk`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
      // Zoho can be a bit slow; allow a reasonable timeout using AbortController if needed later
    });

    const isJson = (zohoRes.headers.get("content-type") || "").includes("application/json");
    const payload = isJson ? await zohoRes.json() : await zohoRes.text();

    // Zoho success shape: { status: "success", code: "0", listkey: "...", ... }
    const code = typeof payload === "object" && payload !== null ? (payload.code ?? null) : null;
    const status = typeof payload === "object" && payload !== null ? (payload.status ?? null) : null;

    if (zohoRes.ok && (code === 0 || code === "0" || status === "success")) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Map a few known error cases to better messages
    let message = "Failed to join waitlist";
    if (typeof payload === "object" && payload !== null) {
      if (payload.code === 903) message = "Missing required fields";
      if (payload.code === 2206) message = "List not found or deleted";
      if (payload.code === 2302) message = "List capacity reached";
    }
    console.error("Zoho Campaigns error:", { status: zohoRes.status, payload });
    return NextResponse.json({ ok: false, error: message, provider: payload }, { status: 502 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
