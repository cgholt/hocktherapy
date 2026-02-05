import Link from "next/link";
import { getSiteConfig } from "lib/content";

export default function Header() {
  const siteConfig = getSiteConfig();

  return (
    <header className="border-b border-border bg-primary">
      {(siteConfig.email || siteConfig.phone) && (
        <div className="bg-secondary border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-2 flex justify-center md:justify-end gap-4 text-sm text-tertiary">
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
        </div>
      )}
      <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-6">
        <Link href="/" className="text-xl font-semibold text-primary-foreground font-[family-name:var(--font-playfair)] text-center md:text-left">
          {siteConfig.name}
        </Link>
        <ul className="flex items-center gap-4 md:gap-6">
          {siteConfig.nav
            .filter((link) => link.enabled !== false)
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link text-sm font-medium text-tertiary hover:text-accent transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
