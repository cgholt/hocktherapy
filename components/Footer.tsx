import Link from "next/link";
import { getSiteConfig } from "lib/content";
import PsychologyTodayBadge from "./PsychologyTodayBadge";

export default function Footer() {
  const siteConfig = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Crisis Disclaimer */}
        <div className="mb-8 rounded-lg border border-accent/30 bg-secondary p-4">
          <p className="text-sm text-tertiary">
            <strong className="text-accent">Important:</strong> This website is not intended for crisis situations.
            If you are experiencing a mental health emergency, please call{" "}
            <a href="tel:988" className="text-accent underline">988</a> (Suicide &amp; Crisis Lifeline),
            call <a href="tel:911" className="text-accent underline">911</a>, or go to your nearest emergency room.
          </p>
        </div>

        {/* Psychology Today Verified Badge */}
        <div className="mb-8">
          <PsychologyTodayBadge />
        </div>

        {/* Contact Info */}
        {(siteConfig.email || siteConfig.phone) && (
          <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4 text-sm text-tertiary">
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition">
                {siteConfig.email}
              </a>
            )}
            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent transition">
                {siteConfig.phone}
              </a>
            )}
          </div>
        )}

        {/* Footer Links and Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-tertiary">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
