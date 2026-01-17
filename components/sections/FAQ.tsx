import { FAQ } from "content/faqs";

export default function FAQSection({
  title,
  items,
}: {
  title?: string;
  items: FAQ[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-semibold">
        {title || "Frequently asked questions"}
      </h2>
      <div className="mt-6 divide-y divide-border">
        {items.map((f) => (
          <details key={f.id} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">{f.question}</span>
              <span className="text-muted-foreground group-open:rotate-180 transition">
                ▾
              </span>
            </summary>
            <div
              className="prose prose-neutral dark:prose-invert mt-3"
              dangerouslySetInnerHTML={{ __html: f.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}
