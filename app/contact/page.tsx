"use client";
import { useState, useRef, useEffect } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const loadTimeRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadTimeRef.current = Date.now();
    // Hide honeypot via JS (bots often don't execute JS, so they'll fill it)
    if (honeypotRef.current) {
      honeypotRef.current.className = "absolute -left-[9999px] h-0 opacity-0 overflow-hidden";
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const body = {
      ...Object.fromEntries(fd.entries()),
      _timestamp: loadTimeRef.current,
    };

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

          {/* Honeypot field - hidden via JS, bots will fill this */}
          <input
            ref={honeypotRef}
            name="_website"
            type="text"
            autoComplete="off"
            aria-hidden="true"
            tabIndex={-1}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send"}
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
