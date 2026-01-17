"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(res.ok ? "ok" : "err");
  }

  return (
    <main className="bg-primary min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">Contact</h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        <p className="mt-4 text-tertiary">
          Get in touch to schedule a consultation or ask any questions.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            name="name"
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-secondary-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-secondary-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <textarea
            name="message"
            placeholder="How can I help?"
            rows={6}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-secondary-foreground placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button className="rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition">
            Send
          </button>
          {status === "ok" && (
            <p className="text-green-400">Thanks—I&apos;ll be in touch soon.</p>
          )}
          {status === "err" && (
            <p className="text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
