import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getSiteConfig } from "lib/content";

export default function Header() {
  const siteConfig = getSiteConfig();

  return (
    <header className="border-b border-border bg-primary">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-primary-foreground">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-tertiary hover:text-accent transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
