import Image from "next/image";
import Link from "next/link";

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  image,
  imageCredit,
  imagePosition = "top",
}: {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string | null;
  imageCredit?: string;
  imagePosition?: string;
}) {
  return (
    <section
      className="relative pb-16 md:pb-24"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 8rem), 0 100%)",
        backgroundColor: "rgba(24, 22, 25, 0.75)",
      }}
    >
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
          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-xl ring-1 ring-tertiary overflow-hidden" {...(imageCredit ? { title: imageCredit } : {})}>
            <Image
              src={image}
              alt="Hero"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
              priority
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </section>
  );
}
