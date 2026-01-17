import { describe, it, expect } from "vitest";
import { siteConfig } from "content/site";
import { services } from "content/services";
import { testimonials } from "content/testimonials";
import { faqs } from "content/faqs";

describe("Content", () => {
  it("has site config with required fields", () => {
    expect(siteConfig.siteName).toBeDefined();
    expect(siteConfig.navigation.length).toBeGreaterThan(0);
  });

  it("has services with required fields", () => {
    expect(services.length).toBeGreaterThan(0);
    services.forEach((service) => {
      expect(service.id).toBeDefined();
      expect(service.title).toBeDefined();
      expect(service.slug).toBeDefined();
    });
  });

  it("has testimonials with required fields", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    testimonials.forEach((testimonial) => {
      expect(testimonial.id).toBeDefined();
      expect(testimonial.name).toBeDefined();
      expect(testimonial.quote).toBeDefined();
    });
  });

  it("has FAQs with required fields", () => {
    expect(faqs.length).toBeGreaterThan(0);
    faqs.forEach((faq) => {
      expect(faq.id).toBeDefined();
      expect(faq.question).toBeDefined();
      expect(faq.answer).toBeDefined();
    });
  });
});
