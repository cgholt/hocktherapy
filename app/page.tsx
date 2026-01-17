import Hero from "components/sections/Hero";
import Services from "components/sections/Services";
import Testimonials from "components/sections/Testimonials";
import FAQ from "components/sections/FAQ";
import { homepage } from "content/homepage";
import { services } from "content/services";
import { testimonials } from "content/testimonials";
import { faqs } from "content/faqs";

export default function HomePage() {
  return (
    <main>
      <Hero
        title={homepage.hero.title}
        subtitle={homepage.hero.subtitle}
        ctaText={homepage.hero.ctaText}
        ctaHref={homepage.hero.ctaHref}
        image={homepage.hero.image}
      />
      <Services items={services} />
      <Testimonials title={homepage.testimonialsTitle} items={testimonials} />
      <FAQ title={homepage.faqsTitle} items={faqs} />
    </main>
  );
}
