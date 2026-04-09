// Zoho OAuth Token Manager
// Handles automatic token refresh for Zoho Desk API

interface ZohoTokens {
  accessToken: string;
  expiresAt: number;
}

let cachedTokens: ZohoTokens | null = null;

export async function getZohoDeskAccessToken(): Promise<string | null> {
  const clientId = process.env.ZOHO_DESK_CLIENT_ID;
  const clientSecret = process.env.ZOHO_DESK_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_DESK_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn("Zoho Desk credentials not configured");
    return null;
  }

  // Return cached token if still valid (with 5 min buffer)
  if (cachedTokens && cachedTokens.expiresAt > Date.now() + 300000) {
    return cachedTokens.accessToken;
  }

  // Refresh the access token
  try {
    console.log("Refreshing Zoho access token...");

    const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zoho token refresh failed:", response.status, errorText);
      return null;
    }

    const data = await response.json();

    console.log("✅ Zoho access token refreshed successfully");

    // Cache the new token
    cachedTokens = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000), // Convert to milliseconds
    };

    return cachedTokens.accessToken;
  } catch (error) {
    console.error("Error refreshing Zoho access token:", error);
    return null;
  }
}
