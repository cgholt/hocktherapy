import Hero from "components/sections/Hero";
import About from "components/sections/About";
import Services from "components/sections/Services";
import Testimonials from "components/sections/Testimonials";
import FAQ from "components/sections/FAQ";
import SectionDivider from "components/SectionDivider";
import { getHomepage, getServices, getTestimonials, getFAQs } from "lib/content";

export default function HomePage() {
  const homepage = getHomepage();
  const services = getServices();
  const testimonials = getTestimonials();
  const faqs = getFAQs();

  return (
    <main>
      <Hero
        title={homepage.heroTitle}
        subtitle={homepage.heroSubtitle}
        ctaText={homepage.heroCtaText}
        ctaHref={homepage.heroCtaHref}
        image={homepage.heroImage}
      />
      <SectionDivider from="primary" to="secondary" variant={1} />
      <About
        title={homepage.aboutTitle}
        content={homepage.aboutContent}
        image={homepage.aboutImage}
      />
      <SectionDivider from="secondary" to="primary" variant={4} />
      <Services items={services} />
      <SectionDivider from="primary" to="secondary" variant={2} />
      <Testimonials title={homepage.testimonialsTitle} items={testimonials} />
      <SectionDivider from="secondary" to="primary" variant={3} />
      <FAQ title={homepage.faqsTitle} items={faqs} />
    </main>
  );
}
