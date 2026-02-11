import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

// Convert 3+ consecutive newlines into paragraph breaks + <br> so
// extra blank lines added in the CMS actually produce visible spacing.
function preserveLineBreaks(text: string): string {
  return text.replace(/\n{3,}/g, (match) => {
    const extra = match.length - 2;
    return "\n\n" + "<br>\n\n".repeat(extra);
  });
}

// Simple cache to avoid re-reading files during build/request
const cache = new Map<string, unknown>();

function cached<T>(key: string, loader: () => T): T {
  if (cache.has(key)) {
    return cache.get(key) as T;
  }
  const result = loader();
  cache.set(key, result);
  return result;
}

// Types
export type Homepage = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaHref: string;
  heroImage: string | null;
  heroImagePosition?: string;
  aboutTitle: string;
  aboutContent: string;
  aboutImage: string | null;
  testimonialsTitle: string;
  faqsTitle: string;
};

export type Service = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  durationMinutes?: number;
  price?: number;
  image?: string | null;
  order: number;
  ctaText?: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  order: number;
};

export type FAQ = {
  question: string;
  answer: string;
  order: number;
};

export type Endorsement = {
  name: string;
  credentials: string;
  quote: string;
  order: number;
};

export type ColorPreset = {
  name: string;
  slug: string;
  primary: string;
  secondary: string;
  accent: string;
};

export type SiteConfig = {
  name: string;
  tagline?: string;
  email?: string;
  phone?: string;
  nav: { label: string; href: string; enabled?: boolean }[];
  backgroundImage?: string | null;
  backgroundOverlay?: number;
  activeColorPreset?: string;
};

export type Section = {
  id: string;
  label: string;
  enabled: boolean;
};

export type Layout = {
  sections: Section[];
};

export type PrivacyPolicy = {
  title: string;
  lastUpdated: string;
  content: string;
};

export type ContactContent = {
  safetyNoticeTitle: string;
  safetyNoticeContent: string;
};

export type AboutPage = {
  title: string;
  content: string;
  image?: string | null;
};

export type FAQsPage = {
  title: string;
  description: string;
};

export type Banner = {
  enabled: boolean;
  text: string;
  linkText: string;
  linkHref: string;
  backgroundColor?: string;
  textColor?: string;
};

// Loaders
export function getHomepage(): Homepage {
  return cached("homepage", () => {
    const filePath = path.join(contentDir, "homepage.json");
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      ...content,
      aboutContent: marked.parse(preserveLineBreaks(content.aboutContent), { async: false, breaks: true }) as string,
    };
  });
}

export function getSiteConfig(): SiteConfig {
  return cached("siteConfig", () => {
    const filePath = path.join(contentDir, "site.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

export function getLayout(): Layout {
  return cached("layout", () => {
    const filePath = path.join(contentDir, "layout.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

export function getServices(): Service[] {
  return cached("services", () => {
    const dir = path.join(contentDir, "services");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

    return files
      .map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        return {
          ...data,
          content: marked.parse(preserveLineBreaks(data.content || ""), { async: false, breaks: true }) as string,
        } as Service;
      })
      .sort((a, b) => a.order - b.order);
  });
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getTestimonials(): Testimonial[] {
  return cached("testimonials", () => {
    const dir = path.join(contentDir, "testimonials");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") || f.endsWith(".md"));

    return files
      .map((file) => {
        const filePath = path.join(dir, file);
        if (file.endsWith(".md")) {
          const { data } = matter(fs.readFileSync(filePath, "utf-8"));
          return {
            name: data.name,
            quote: data.quote,
            order: data.order ?? 0,
          };
        }
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      })
      .sort((a, b) => a.order - b.order);
  });
}

export function getFAQs(): FAQ[] {
  return cached("faqs", () => {
    const dir = path.join(contentDir, "faqs");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

    return files
      .map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        return {
          ...data,
          answer: marked.parse(preserveLineBreaks(data.answer), { async: false, breaks: true }) as string,
        } as FAQ;
      })
      .sort((a, b) => a.order - b.order);
  });
}

export function getEndorsements(): Endorsement[] {
  return cached("endorsements", () => {
    const dir = path.join(contentDir, "endorsements");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") || f.endsWith(".md"));

    return files
      .map((file) => {
        const filePath = path.join(dir, file);
        if (file.endsWith(".md")) {
          const { data } = matter(fs.readFileSync(filePath, "utf-8"));
          return {
            name: data.name,
            credentials: data.credentials,
            quote: data.quote,
            order: data.order ?? 0,
          };
        }
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      })
      .sort((a, b) => a.order - b.order);
  });
}

export function getColorPresets(): ColorPreset[] {
  return cached("colorPresets", () => {
    const dir = path.join(contentDir, "color-presets");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") || f.endsWith(".md"));

    return files.map((file) => {
      const filePath = path.join(dir, file);
      const slug = file.replace(/\.(json|md)$/, "");
      if (file.endsWith(".md")) {
        const { data } = matter(fs.readFileSync(filePath, "utf-8"));
        return {
          name: data.name,
          primary: data.primary,
          secondary: data.secondary,
          accent: data.accent,
          slug,
        };
      }
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return {
        ...content,
        slug,
      };
    });
  });
}

export function getActiveColorPreset(): ColorPreset | null {
  const siteConfig = getSiteConfig();
  const presets = getColorPresets();
  const activeSlug = siteConfig.activeColorPreset || "default";
  return presets.find((p) => p.slug === activeSlug) || presets[0] || null;
}

export function getPrivacyPolicy(): PrivacyPolicy {
  return cached("privacy", () => {
    const filePath = path.join(contentDir, "privacy.json");
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      ...content,
      content: marked.parse(preserveLineBreaks(content.content), { async: false, breaks: true }) as string,
    };
  });
}

export function getContactContent(): ContactContent {
  return cached("contact", () => {
    const filePath = path.join(contentDir, "contact.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

export function getAboutPage(): AboutPage {
  return cached("about", () => {
    const filePath = path.join(contentDir, "about.json");
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      ...content,
      content: marked.parse(preserveLineBreaks(content.content), { async: false, breaks: true }) as string,
    };
  });
}

export function getFAQsPage(): FAQsPage {
  return cached("faqsPage", () => {
    const filePath = path.join(contentDir, "faqs-page.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}

export function getBanner(): Banner {
  return cached("banner", () => {
    const filePath = path.join(contentDir, "banner.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });
}
