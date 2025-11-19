import { NextResponse } from "next/server";
import { z } from "zod";
import { LoopsClient } from "loops";

const schema = z.object({
  email: z.string().email().max(254), // RFC 5321 email length limit
  firstName: z.string().max(100).optional(),
});

// Rate limiting helper (simple in-memory, use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 5) { // Max 5 requests per minute
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Apply rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." }, 
        { status: 429 }
      );
    }

    const json = await request.json();
    const data = schema.parse(json);

    // Sanitize inputs (Zod validates, but extra safety)
    const sanitizedEmail = data.email.trim().toLowerCase();
    const sanitizedFirstName = data.firstName?.trim().slice(0, 100);

    // Initialize Loops client
    const loops = new LoopsClient(process.env.LOOPS_API_KEY || "");

    // Create or update contact in Loops
    const contactProperties: Record<string, string> = {};
    if (sanitizedFirstName) {
      contactProperties.firstName = sanitizedFirstName;
    }

    await loops.createContact({
      email: sanitizedEmail,
      properties: contactProperties,
    });

    // Don't log sensitive info in production
    if (process.env.NODE_ENV === 'development') {
      console.log("Waitlist signup:", {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }
    // Don't expose internal error details
    console.error("Waitlist error:", error);
    return NextResponse.json({ ok: false, error: "Failed to join waitlist" }, { status: 500 });
  }
}
