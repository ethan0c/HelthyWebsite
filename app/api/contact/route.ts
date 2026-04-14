import { NextResponse } from "next/server";
import { z } from "zod";
import { LoopsClient } from "loops";
import { getZohoDeskAccessToken } from "@/lib/utils/zoho-auth";
import { getClientIp, isAllowedOrigin, sanitizeHtml } from "@/lib/security";
import { checkLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(254),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
  turnstileToken: z.string().max(2048).optional(),
  // Honeypot: bots fill hidden fields; humans do not. Must be empty.
  website: z.string().max(0).optional(),
});

// Create or get Zoho Desk contact
async function getOrCreateZohoDeskContact(
  name: string,
  email: string,
  accessToken: string,
  orgId: string
): Promise<string | null> {
  try {
    // First, try to find existing contact by email
    const searchResponse = await fetch(
      `https://desk.zoho.com/api/v1/contacts/search?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Zoho-oauthtoken ${accessToken}`,
          "orgId": orgId,
        },
      }
    );

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.data && searchData.data.length > 0) {
        console.log("✅ Found existing Zoho contact:", searchData.data[0].id);
        return searchData.data[0].id;
      }
    }

    // Contact doesn't exist, create new one
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const contactData = {
      lastName: lastName || firstName,
      firstName: firstName,
      email: email,
    };

    const createResponse = await fetch(
      `https://desk.zoho.com/api/v1/contacts`,
      {
        method: "POST",
        headers: {
          "Authorization": `Zoho-oauthtoken ${accessToken}`,
          "orgId": orgId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("Zoho Desk contact creation error:", createResponse.status, errorText);
      return null;
    }

    const contactResult = await createResponse.json();
    console.log("✅ Created new Zoho contact:", contactResult.id);
    return contactResult.id;
  } catch (error) {
    console.error("Error getting/creating Zoho contact:", error);
    return null;
  }
}

// Create Zoho Desk ticket
async function createZohoDeskTicket(name: string, email: string, message: string): Promise<boolean> {
  const zohoDeskOrgId = process.env.ZOHO_DESK_ORG_ID;

  if (!zohoDeskOrgId) {
    console.warn("Zoho Desk ticket creation skipped: ZOHO_DESK_ORG_ID not configured");
    return true; // Skip if not configured
  }

  // Get fresh access token (auto-refreshes if needed)
  const accessToken = await getZohoDeskAccessToken();

  if (!accessToken) {
    console.warn("Zoho Desk ticket creation skipped: could not get access token");
    return true; // Skip if token unavailable
  }

  try {
    // First, get or create the contact
    const contactId = await getOrCreateZohoDeskContact(name, email, accessToken, zohoDeskOrgId);

    if (!contactId) {
      console.error("Failed to get/create Zoho contact");
      return false;
    }

    const ticketData: Record<string, unknown> = {
      subject: `Contact Form: ${name}`,
      contactId: contactId,
      email: email,
      description: sanitizeHtml(message),
      priority: "Medium",
      status: "Open",
      channel: "Web",
    };

    // Only add departmentId if it's configured
    const departmentId = process.env.ZOHO_DESK_DEPARTMENT_ID;
    if (departmentId) {
      ticketData.departmentId = departmentId;
    }

    console.log("Creating Zoho Desk ticket with data:", {
      subject: ticketData.subject,
      email: ticketData.email,
      contactId: contactId,
      orgId: zohoDeskOrgId,
      hasDepartmentId: !!departmentId,
    });

    const response = await fetch(
      `https://desk.zoho.com/api/v1/tickets`,
      {
        method: "POST",
        headers: {
          "Authorization": `Zoho-oauthtoken ${accessToken}`,
          "orgId": zohoDeskOrgId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Zoho Desk API error:", response.status, errorText);
      return false;
    }

    const responseData = await response.json();
    console.log("✅ Zoho Desk ticket created successfully:", responseData.id);

    return true;
  } catch (error) {
    console.error("Zoho Desk ticket creation error:", error);
    return false;
  }
}

// Add contact to Loops
async function addToLoops(name: string, email: string): Promise<boolean> {
  const loopsApiKey = process.env.LOOPS_API_KEY;

  if (!loopsApiKey) {
    console.warn("Loops contact creation skipped: LOOPS_API_KEY not set");
    return true; // Skip if not configured
  }

  try {
    const loops = new LoopsClient(loopsApiKey);

    await loops.updateContact({
      email: email.trim().toLowerCase(),
      properties: {
        firstName: sanitizeHtml(name.trim()),
        source: "contact_form",
      },
    });

    console.log("✅ Loops contact updated successfully");
    return true;
  } catch (error) {
    // If email doesn't exist, create it
    if (error instanceof Error && error.message.includes("409")) {
      console.log("ℹ️ Contact already exists in Loops, skipping");
      return true; // This is OK, not an error
    }
    console.error("Loops contact creation error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const ip = getClientIp(request);
    const rl = await checkLimit("contact", ip, 5, 60);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const json = await request.json();
    const validatedData = contactSchema.parse(json);

    // Honeypot tripped: silently succeed so bots can't tell.
    if (validatedData.website) {
      return NextResponse.json({ ok: true, message: "Thanks!" }, { status: 200 });
    }

    // Verify Turnstile captcha (skipped in dev if TURNSTILE_SECRET_KEY unset)
    const captcha = await verifyTurnstile(validatedData.turnstileToken, ip);
    if (!captcha.success) {
      return NextResponse.json(
        { ok: false, error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeHtml(validatedData.name.trim());
    const sanitizedEmail = validatedData.email.trim().toLowerCase();
    const sanitizedMessage = sanitizeHtml(validatedData.message.trim());

    // Create Zoho Desk ticket
    const zohoDeskSuccess = await createZohoDeskTicket(
      sanitizedName,
      sanitizedEmail,
      sanitizedMessage
    );

    // Add to Loops
    const loopsSuccess = await addToLoops(sanitizedName, sanitizedEmail);

    // Log success (don't expose sensitive data in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission:", {
        name: sanitizedName,
        email: sanitizedEmail,
        zohoDeskSuccess,
        loopsSuccess,
        timestamp: new Date().toISOString(),
      });
    }

    // Return success even if integrations partially failed
    // (we don't want to expose internal errors to users)
    return NextResponse.json(
      { ok: true, message: "Thanks for reaching out! We'll get back to you soon." },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data", details: error.flatten() },
        { status: 400 }
      );
    }

    // Don't expose internal error details
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
