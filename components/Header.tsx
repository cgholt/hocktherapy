import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "content/site";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          {siteConfig.siteName}
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {siteConfig.navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition"
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
