import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getServiceBySlug } from "lib/content";

function splitContentSections(html: string): string[] {
  return html.split(/(?=<h1[^>]*>)/i).filter((s) => s.trim());
}

const sectionBgs = ["bg-secondary", "bg-deep"];

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
        <Link href="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition mb-8">
          ← Back to Services
        </Link>
        {service.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 ring-2 ring-tertiary" {...(service.imageCredit ? { title: service.imageCredit } : {})}>
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
          <blockquote className="mt-6 border-l-4 border-accent pl-4 text-lg italic text-tertiary">
            {service.summary}
          </blockquote>
        )}
        {service.content && (
          <div className="mt-8 space-y-3">
            {splitContentSections(service.content).map((section, i) => (
              <div
                key={i}
                className={`prose-content text-tertiary rounded-xl px-6 py-6 ${sectionBgs[i % sectionBgs.length]}`}
                dangerouslySetInnerHTML={{ __html: section }}
              />
            ))}
          </div>
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
