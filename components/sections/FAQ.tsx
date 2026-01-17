import { FAQ } from "lib/content";

export default function FAQSection({
  title,
  items,
}: {
  title?: string;
  items: FAQ[];
}) {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-primary-foreground">
          {title || "Frequently asked questions"}
        </h2>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        <div className="mt-8 divide-y divide-border">
          {items.map((f) => (
            <details key={f.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-medium text-primary-foreground group-hover:text-accent transition">
                  {f.question}
                </span>
                <span className="text-tertiary group-open:rotate-180 transition">
                  ▾
                </span>
              </summary>
              <div
                className="mt-3 text-tertiary [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: f.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
