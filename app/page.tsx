import { ReactNode } from "react";
import Hero from "components/sections/Hero";
import About from "components/sections/About";
import Services from "components/sections/Services";
import Testimonials from "components/sections/Testimonials";
import Endorsements from "components/sections/Endorsements";
import FAQ from "components/sections/FAQ";
import SectionDivider from "components/SectionDivider";
import {
  getHomepage,
  getServices,
  getTestimonials,
  getEndorsements,
  getFAQs,
  getLayout,
} from "lib/content";

type SectionBackground = "primary" | "secondary";

const sectionBackgrounds: Record<string, SectionBackground> = {
  hero: "primary",
  about: "secondary",
  services: "primary",
  testimonials: "secondary",
  endorsements: "primary",
  faq: "primary",
};

export default function HomePage() {
  const homepage = getHomepage();
  const services = getServices();
  const testimonials = getTestimonials();
  const endorsements = getEndorsements();
  const faqs = getFAQs();
  const layout = getLayout();

  const sectionComponents: Record<string, ReactNode> = {
    hero: (
      <Hero
        title={homepage.heroTitle}
        subtitle={homepage.heroSubtitle}
        ctaText={homepage.heroCtaText}
        ctaHref={homepage.heroCtaHref}
        image={homepage.heroImage}
      />
    ),
    about: (
      <About
        title={homepage.aboutTitle}
        content={homepage.aboutContent}
        image={homepage.aboutImage}
      />
    ),
    services: <Services items={services} />,
    testimonials: (
      <Testimonials title={homepage.testimonialsTitle} items={testimonials} />
    ),
    endorsements: (
      <Endorsements title="Professional Endorsements" items={endorsements} />
    ),
    faq: <FAQ title={homepage.faqsTitle} items={faqs} />,
  };

  const enabledSections = layout.sections.filter((s) => s.enabled);
  const elements: ReactNode[] = [];
  let dividerVariant = 1;

  enabledSections.forEach((section, index) => {
    elements.push(
      <div key={section.id}>{sectionComponents[section.id]}</div>
    );

    // Add dividers and spacer between sections (not after the last one)
    if (index < enabledSections.length - 1) {
      const currentBg = sectionBackgrounds[section.id];
      const nextBg = sectionBackgrounds[enabledSections[index + 1].id];

      // Skip first divider for hero (it has its own angled edge)
      if (section.id !== "hero") {
        elements.push(
          <SectionDivider
            key={`divider-out-${index}`}
            from={currentBg}
            to="transparent"
            variant={((dividerVariant % 4) + 1) as 1 | 2 | 3 | 4}
          />
        );
      }

      // Transparent spacer
      elements.push(
        <div key={`spacer-${index}`} className="h-48 md:h-72" />
      );

      // Divider from transparent to next section
      elements.push(
        <SectionDivider
          key={`divider-in-${index}`}
          from="transparent"
          to={nextBg}
          variant={(((dividerVariant + 1) % 4) + 1) as 1 | 2 | 3 | 4}
        />
      );

      dividerVariant += 2;
    }
  });

  return <main>{elements}</main>;
}
