import Image from "next/image";
import { Testimonial } from "content/testimonials";

export default function Testimonials({
  title,
  items,
}: {
  title?: string;
  items: Testimonial[];
}) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold">
          {title || "What clients say"}
        </h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure
              key={t.id}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-muted-foreground">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>
                <figcaption>
                  <div className="font-medium">{t.name}</div>
                  {t.role && (
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  )}
                </figcaption>
              </div>
              <blockquote className="mt-4 text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
