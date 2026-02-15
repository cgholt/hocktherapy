import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "components/Header";
import Footer from "components/Footer";
import ThemeProvider from "components/ThemeProvider";
import BackgroundImage from "components/BackgroundImage";
import { LocalBusinessSchema } from "components/StructuredData";
import NotificationBanner from "components/NotificationBanner";
import { getSiteConfig, getActiveColorPreset, validHexColor, getHomepage } from "lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Script to prevent flash of wrong theme (dark is default)
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    }
  })();
`;

const siteConfig = getSiteConfig();
const activeColorPreset = getActiveColorPreset();
const homepage = getHomepage();

// Generate CSS variables from active color preset
const colorStyles = activeColorPreset ? `
  :root {
    --primary: ${validHexColor(activeColorPreset.primary, '#181619')};
    --secondary: ${validHexColor(activeColorPreset.secondary, '#272a31')};
    --accent: ${validHexColor(activeColorPreset.accent, '#a76b09')};
    --surface: ${validHexColor(activeColorPreset.surface, '#f5f0eb')};
    --deep: ${validHexColor(activeColorPreset.deep, '#3a3d45')};
  }
` : '';
const siteUrl = process.env.SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: ["therapy", "counseling", "men's mental health", "anxiety", "depression", "existential therapy"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  icons: [],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <GoogleAnalytics gaId="G-3F654PFG50" />
        {homepage.heroImage && (
          <link
            rel="preload"
            as="image"
            href={homepage.heroImage}
            fetchPriority="high"
          />
        )}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {colorStyles && <style dangerouslySetInnerHTML={{ __html: colorStyles }} />}
        <LocalBusinessSchema
          name={siteConfig.name}
          description={siteConfig.tagline}
          url={siteUrl}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {siteConfig.backgroundImage && (
          <BackgroundImage
            src={siteConfig.backgroundImage}
            overlay={siteConfig.backgroundOverlay}
            imageCredit={siteConfig.backgroundImageCredit}
          />
        )}
        <ThemeProvider>
          <NotificationBanner />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
