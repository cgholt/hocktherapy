import Image from "next/image";
import Link from "next/link";
import { Service } from "content/services";

export default function Services({ items }: { items: Service[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="text-2xl font-semibold">Services</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((s) => (
          <Link
            key={s.id}
            href={`/services/${s.slug}`}
            className="group rounded-xl border border-border bg-background p-4 hover:shadow transition"
          >
            {s.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
            )}
            <h3 className={`font-medium ${s.image ? "mt-3" : ""}`}>{s.title}</h3>
            {s.summary && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                {s.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
