import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ⚠️ TEMPORARY DEBUG ENDPOINT — DELETE THIS FILE once the contact form is fixed.
// It reproduces exactly what /api/contact does when it sends, but returns the
// real SMTP error (which the contact route hides behind "Failed to send
// message"). Gated by a shared token so the public can't trigger it, and it can
// only ever email CONTACT_EMAIL (the client's own inbox) — never an arbitrary
// address. It never returns secret values.
const DEBUG_TOKEN = "a7f3c9e214b84d6fa0e5177c3b9d2e88";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== DEBUG_TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
  const smtpPort = Number(SMTP_PORT) || 587;

  // What the route sees — presence/shape only, no secret values.
  const config = {
    host: SMTP_HOST || "smtp.protonmail.ch (default)",
    port: smtpPort,
    secure: smtpPort === 465,
    userSet: Boolean(SMTP_USER),
    passSet: Boolean(SMTP_PASS),
    passLength: SMTP_PASS ? SMTP_PASS.length : 0,
    contactEmailSet: Boolean(CONTACT_EMAIL),
  };

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.protonmail.ch",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const doSend = req.nextUrl.searchParams.get("send") === "1";

  try {
    await transporter.verify();

    let sent = false;
    if (doSend && CONTACT_EMAIL) {
      await transporter.sendMail({
        from: SMTP_USER,
        to: CONTACT_EMAIL,
        subject: "SMTP check (Vercel runtime)",
        text: "If you received this, the contact form's SMTP path works from Vercel.",
      });
      sent = true;
    }

    return NextResponse.json({ ok: true, config, verified: true, sent });
  } catch (err) {
    const e = err as { message?: string; code?: string; responseCode?: number; command?: string; response?: string };
    return NextResponse.json({
      ok: false,
      config,
      error: {
        message: e?.message,
        code: e?.code,
        responseCode: e?.responseCode,
        command: e?.command,
        response: e?.response,
      },
    });
  }
}
