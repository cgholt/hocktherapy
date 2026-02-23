import Image from "next/image";
import Link from "next/link";
import { Service } from "lib/content";

export default function Services({ items }: { items: Service[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-primary-foreground">Services</h2>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-xl border border-border bg-secondary p-4 hover:border-tertiary transition"
            >
              {s.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden" {...(s.imageCredit ? { title: s.imageCredit } : {})}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
              )}
              <h3 className={`font-medium text-secondary-foreground group-hover:text-accent transition ${s.image ? "mt-3" : ""}`}>
                {s.title}
              </h3>
              {s.summary && (
                <p className="mt-1 text-sm text-tertiary line-clamp-3">
                  {s.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
