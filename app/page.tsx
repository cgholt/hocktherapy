import { ReactNode } from "react";
import Hero from "components/sections/Hero";
import Quote from "components/sections/Quote";
import About from "components/sections/About";
import Services from "components/sections/Services";
import Testimonials from "components/sections/Testimonials";
import Endorsements from "components/sections/Endorsements";
import FAQ from "components/sections/FAQ";
import Contact from "components/sections/Contact";
import {
  getHomepage,
  getServices,
  getTestimonials,
  getEndorsements,
  getFAQs,
  getLayout,
  getContactContent,
} from "lib/content";

export default function HomePage() {
  const homepage = getHomepage();
  const services = getServices();
  const testimonials = getTestimonials();
  const endorsements = getEndorsements();
  const faqs = getFAQs();
  const layout = getLayout();
  const contactContent = getContactContent();

  const sectionComponents: Record<string, ReactNode> = {
    hero: (
      <Hero
        title={homepage.heroTitle}
        subtitle={homepage.heroSubtitle}
        ctaText={homepage.heroCtaText}
        ctaHref={homepage.heroCtaHref}
        image={homepage.heroImage}
        imageCredit={homepage.heroImageCredit}
        imagePosition={homepage.heroImagePosition}
      />
    ),
    quote: <Quote text={homepage.quoteText} author={homepage.quoteAuthor} />,
    about: (
      <About
        title={homepage.aboutTitle}
        content={homepage.aboutContent}
        image={homepage.aboutImage}
        imageCredit={homepage.aboutImageCredit}
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
    contact: <Contact contactContent={contactContent} />,
  };

  const enabledSections = layout.sections.filter((s) => s.enabled);
  const elements: ReactNode[] = enabledSections.map((section) => (
    <div key={section.id} id={section.id}>{sectionComponents[section.id]}</div>
  ));

  return <main className="divide-y divide-secondary border-accent">{elements}</main>;
}
