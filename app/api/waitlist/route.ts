import { NextResponse } from "next/server";
import { z } from "zod";
import { LoopsClient } from "loops";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);

    // Initialize Loops client
    const loops = new LoopsClient(process.env.LOOPS_API_KEY || "");

    // Create or update contact in Loops
    const contactProperties: Record<string, string> = {};
    if (data.firstName) {
      contactProperties.firstName = data.firstName;
    }

    await loops.createContact({
      email: data.email,
      properties: contactProperties,
    });

    console.log("Waitlist signup:", {
      email: data.email,
      firstName: data.firstName,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }
    console.error("Waitlist error:", error);
    return NextResponse.json({ ok: false, error: "Failed to join waitlist" }, { status: 500 });
  }
}
