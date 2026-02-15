import { Metadata } from "next";
import { getFAQsPage, getFAQs } from "lib/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about our therapy services.",
};

export default function FAQsPage() {
  const page = getFAQsPage();
  const faqs = getFAQs();

  return (
    <main className="bg-primary min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-primary-foreground">
          {page.title}
        </h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        {page.description && (
          <p className="mt-4 text-tertiary">{page.description}</p>
        )}
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group bg-secondary rounded-lg border border-border px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-medium text-primary-foreground group-hover:text-accent transition">
                  {faq.question}
                </span>
                <span className="text-tertiary group-open:rotate-180 transition">
                  ▾
                </span>
              </summary>
              <div
                className="mt-3 text-tertiary [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
