import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);

    // TODO: send to email/service of choice
    // For now, just echo success
    return NextResponse.json({ ok: true, received: data }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
