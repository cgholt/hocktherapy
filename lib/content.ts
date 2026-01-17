import fs from "fs";
import path from "path";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

// Types
export type Homepage = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaHref: string;
  heroImage: string | null;
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

export type SiteConfig = {
  name: string;
  tagline?: string;
  nav: { label: string; href: string }[];
};

// Loaders
export function getHomepage(): Homepage {
  const filePath = path.join(contentDir, "homepage.json");
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    ...content,
    // Convert markdown to HTML for about content
    aboutContent: marked.parse(content.aboutContent, { async: false }) as string,
  };
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDir, "site.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getServices(): Service[] {
  const dir = path.join(contentDir, "services");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const content = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        ...content,
        // Convert markdown to HTML
        content: marked.parse(content.content || "", { async: false }) as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  const services = getServices();
  return services.find((s) => s.slug === slug);
}

export function getTestimonials(): Testimonial[] {
  const dir = path.join(contentDir, "testimonials");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  return files
    .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")))
    .sort((a, b) => a.order - b.order);
}

export function getFAQs(): FAQ[] {
  const dir = path.join(contentDir, "faqs");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const content = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        ...content,
        // Convert markdown to HTML
        answer: marked.parse(content.answer, { async: false }) as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}
