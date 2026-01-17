import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Note: This is a workaround - in production, Next.js handles this properly
  const slug = (params as unknown as { slug: string }).slug;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-3xl px-6 py-12">
        {service.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        {(service.durationMinutes || service.price) && (
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            {service.durationMinutes && (
              <span>{service.durationMinutes} minutes</span>
            )}
            {service.price && <span>${service.price}</span>}
          </div>
        )}
        {service.summary && (
          <p className="mt-4 text-lg text-muted-foreground">{service.summary}</p>
        )}
        {service.content && (
          <div
            className="prose prose-neutral dark:prose-invert mt-8"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        )}
      </article>
    </main>
  );
}
