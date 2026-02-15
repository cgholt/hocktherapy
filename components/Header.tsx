import Link from "next/link";
import { getSiteConfig, getServices } from "lib/content";
import ServicesDropdown from "components/ServicesDropdown";

export default function Header() {
  const siteConfig = getSiteConfig();
  const services = getServices().map((s) => ({ title: s.title, slug: s.slug }));

  return (
    <header className="border-b border-border bg-primary">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="text-xl font-semibold text-primary-foreground font-[family-name:var(--font-playfair)]">
            {siteConfig.name}
          </Link>
          {(siteConfig.email || siteConfig.phone) && (
            <div className="flex justify-center md:justify-start gap-3 mt-1 text-xs text-tertiary">
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
        </div>
        <ul className="flex items-center gap-4 md:gap-6">
          {siteConfig.nav
            .filter((link) => link.enabled !== false)
            .map((link) =>
              link.href === "/services" ? (
                <ServicesDropdown key={link.href} label={link.label} services={services} />
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link text-sm md:text-base font-medium text-tertiary hover:text-accent transition"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
        </ul>
      </nav>
    </header>
  );
}
