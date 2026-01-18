import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting store (per-instance, resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const MIN_SUBMISSION_TIME = 3000; // Minimum 3 seconds to fill form (bot detection)

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

const transporter = nodemailer.createTransport({
  host: "smtp.protonmail.ch",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limiting
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json();

  // Honeypot check - if _website field is filled, it's a bot
  if (body._website) {
    // Silently accept to not tip off bots, but don't send email
    return NextResponse.json({ ok: true });
  }

  // Timestamp check - form filled too fast is likely a bot
  if (body._timestamp) {
    const submissionTime = Date.now() - Number(body._timestamp);
    if (submissionTime < MIN_SUBMISSION_TIME) {
      // Silently accept to not tip off bots
      return NextResponse.json({ ok: true });
    }
  }

  // Basic validation
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Validate field lengths to prevent abuse
  if (body.name.length > 200 || body.email.length > 200 || body.message.length > 10000) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL;
  if (!toEmail) {
    console.error("CONTACT_EMAIL environment variable not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Escape HTML to prevent injection in email clients
  const safeName = escapeHtml(body.name);
  const safeEmail = escapeHtml(body.email);
  const safeMessage = escapeHtml(body.message);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      replyTo: body.email,
      subject: `New contact from ${safeName}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <h3>Message:</h3>
        <p>${safeMessage.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
