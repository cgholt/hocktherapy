import { siteConfig } from "content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm text-muted-foreground">
          &copy; {year} {siteConfig.siteName}. {siteConfig.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
