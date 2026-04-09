import { NextResponse } from "next/server";
import { z } from "zod";
import { LoopsClient } from "loops";
import { getZohoDeskAccessToken } from "@/lib/utils/zoho-auth";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(254),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
  hcaptchaToken: z.string().optional(), // Optional for now, make required when enabled
});

// Simple in-memory rate limiting (use Redis in production for multi-server setups)
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

// Sanitize HTML to prevent XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Verify hCaptcha token (optional, enable when you add HCAPTCHA_SECRET to .env)
async function verifyHCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) {
    console.warn("hCaptcha verification skipped: HCAPTCHA_SECRET not set");
    return true; // Skip verification if not configured
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return false;
  }
}

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
        firstName: name.trim(),
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
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const json = await request.json();
    const validatedData = contactSchema.parse(json);

    // Verify hCaptcha token (if provided and configured)
    if (validatedData.hcaptchaToken) {
      const isValidCaptcha = await verifyHCaptcha(validatedData.hcaptchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { ok: false, error: "Captcha verification failed. Please try again." },
          { status: 400 }
        );
      }
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
