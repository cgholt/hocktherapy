import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getServiceBySlug } from "lib/content";

export function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
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
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-primary">
      <article className="mx-auto max-w-3xl px-6 py-12">
        {service.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 ring-2 ring-tertiary">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">{service.title}</h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        {(service.durationMinutes || service.price) && (
          <div className="mt-4 flex gap-4 text-sm text-tertiary">
            {service.durationMinutes && (
              <span>{service.durationMinutes} minutes</span>
            )}
            {service.price && <span>${service.price}</span>}
          </div>
        )}
        {service.summary && (
          <p className="mt-4 text-lg text-tertiary">{service.summary}</p>
        )}
        {service.content && (
          <div
            className="prose-content mt-8 text-tertiary [&_h3]:text-primary-foreground [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        )}
        {service.ctaText && (
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-accent px-8 py-3 text-lg font-semibold text-white hover:bg-accent/90 transition"
            >
              {service.ctaText}
            </Link>
          </div>
        )}
      </article>
    </main>
  );
}
