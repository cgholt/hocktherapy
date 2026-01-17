import { getSiteConfig } from "lib/content";

export default function Footer() {
  const siteConfig = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm text-tertiary">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
