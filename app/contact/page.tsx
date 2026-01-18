import { getContactContent } from "lib/content";
import ContactForm from "components/ContactForm";

export default function ContactPage() {
  const contactContent = getContactContent();

  return (
    <main className="bg-primary min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">Contact</h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        <p className="mt-4 text-tertiary">
          Get in touch to schedule a consultation or ask any questions.
        </p>
        <ContactForm contactContent={contactContent} />
      </div>
    </main>
  );
}
