import { NextResponse } from "next/server";
import { z } from "zod";
import { LoopsClient } from "loops";
import { getClientIp, isAllowedOrigin, sanitizeHtml } from "@/lib/security";
import { checkLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  email: z.string().email().max(254),
  firstName: z.string().max(100).optional(),
  turnstileToken: z.string().max(2048).optional(),
  // Honeypot: bots fill hidden fields; humans do not. Must be empty.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const ip = getClientIp(request);
    const rl = await checkLimit("newsletter", ip, 5, 60);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const json = await request.json();
    const data = schema.parse(json);

    // Honeypot tripped: silently succeed so bots can't tell.
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const captcha = await verifyTurnstile(data.turnstileToken, ip);
    if (!captcha.success) {
      return NextResponse.json(
        { ok: false, error: "Captcha verification failed." },
        { status: 400 }
      );
    }

    const sanitizedEmail = data.email.trim().toLowerCase();
    const sanitizedFirstName = data.firstName
      ? sanitizeHtml(data.firstName.trim().slice(0, 100))
      : undefined;

    const loops = new LoopsClient(process.env.LOOPS_API_KEY || "");

    const contactProperties: Record<string, string> = {};
    if (sanitizedFirstName) contactProperties.firstName = sanitizedFirstName;

    try {
      await loops.createContact({
        email: sanitizedEmail,
        properties: contactProperties,
      });
    } catch (err) {
      // 409 = already in audience. Treat as success — the user is subscribed,
      // which is the desired end state.
      const statusCode = (err as { statusCode?: number }).statusCode;
      const msg =
        err instanceof Error ? err.message.toLowerCase() : "";
      const alreadyExists =
        statusCode === 409 || msg.includes("already in your audience");
      if (!alreadyExists) throw err;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter signup:", {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.flatten() },
        { status: 400 }
      );
    }
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
