import { getSiteConfig, getServices } from "lib/content";
import HeaderNav from "components/HeaderNav";

export default function Header() {
  const siteConfig = getSiteConfig();
  const services = getServices().map((s) => ({ title: s.title, slug: s.slug }));

  return (
    <header className="border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <HeaderNav siteConfig={siteConfig} services={services} />
      </nav>
    </header>
  );
}
