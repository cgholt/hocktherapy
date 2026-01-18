"use client";
import { useState, useRef, useEffect } from "react";
import type { ContactContent } from "lib/content";

type ContactFormProps = {
  contactContent: ContactContent;
};

export default function ContactForm({ contactContent }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [acknowledged, setAcknowledged] = useState(false);
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

    if (!acknowledged) {
      return;
    }

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

      {/* Safety notice with acknowledgment */}
      <div className="rounded-lg border border-border bg-secondary/50 p-4">
        <h3 className="text-sm font-semibold text-primary-foreground">
          {contactContent.safetyNoticeTitle}
        </h3>
        <p className="mt-2 text-sm text-tertiary">
          {contactContent.safetyNoticeContent}
        </p>
        <label className="mt-4 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border bg-secondary accent-accent cursor-pointer"
          />
          <span className="text-sm text-secondary-foreground">
            I acknowledge that I have read and understand this notice
          </span>
        </label>
      </div>

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
        disabled={status === "loading" || !acknowledged}
        className="rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
