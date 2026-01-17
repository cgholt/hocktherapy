import Image from "next/image";
import Link from "next/link";

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  image,
}: {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl/tight md:text-5xl font-extrabold tracking-tight text-primary-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-tertiary">{subtitle}</p>
          )}
          {ctaText && ctaHref && (
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
        {image && (
          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-xl ring-1 ring-tertiary overflow-hidden">
            <Image
              src={image}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
