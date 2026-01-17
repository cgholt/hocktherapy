import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Basic validation
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // TODO: Add email sending here (e.g., Resend, SendGrid, Nodemailer)
  // For now, just log the submission
  console.log("Contact form submission:", {
    name: body.name,
    email: body.email,
    message: body.message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
