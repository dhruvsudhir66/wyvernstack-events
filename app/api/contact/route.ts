
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX = {
  name: 100,
  email: 254,
  occasion: 100,
  date: 30,
  message: 4000,
} as const;

function clean(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;

  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid enquiry details." },
        { status: 400 },
      );
    }

    input = body as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 },
    );
  }

  // Silently ignore basic honeypot spam.
  if (clean(input.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const name = clean(input.name, MAX.name);
  const email = clean(input.email, MAX.email);
  const celebrationType = clean(input.celebrationType, MAX.occasion);
  const eventDate = clean(input.eventDate, MAX.date);
  const message = clean(input.message, MAX.message);

  const allowedOccasions = new Set([
    "Wedding invitation",
    "Engagement or family function",
    "Birthday invitation or surprise",
    "Valentines or anniversary wish",
    "Personalised digital greeting",
    "Other celebration",
  ]);

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !allowedOccasions.has(celebrationType) ||
    message.length < 10
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields correctly." },
      { status: 400 },
    );
  }

  if (
    eventDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)
  ) {
    return NextResponse.json(
      { error: "Invalid event date." },
      { status: 400 },
    );
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!scriptUrl || !secret) {
    console.error("Google Apps Script configuration is missing.");

    return NextResponse.json(
      { error: "The enquiry service is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        celebrationType,
        eventDate,
        message,
        website: "",
        secret,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const result: unknown = await response.json();

    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      !("success" in result) ||
      result.success !== true
    ) {
      console.error("Google Apps Script rejected the enquiry.");

      return NextResponse.json(
        {
          error:
            "We couldn't send your enquiry right now. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Apps Script request failed:", error);

    return NextResponse.json(
      {
        error:
          "We couldn't reach the email service. Please try again later.",
      },
      { status: 502 },
    );
  }
}
