import Image from "next/image";
import Link from "next/link";

function renderTitleWithUnderline(title: string, word: string) {
  const parts = title.split(new RegExp(`(${word})`, "i"));
  return parts.map((part, i) =>
    part.toLowerCase() === word.toLowerCase() ? (
      <span key={i} className="relative inline-block">
        {part}
        <span
          aria-hidden="true"
          className="absolute left-0 top-[0.9em] w-full h-3 bg-accent pointer-events-none select-none"
          style={{
            WebkitMaskImage: "url(/images/decorations/underline-living.png)",
            maskImage: "url(/images/decorations/underline-living.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </span>
    ) : (
      part
    )
  );
}

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
    <section className="relative overflow-hidden">
      {image && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none"
          {...(imageCredit ? { title: imageCredit } : {})}
        >
          <div className="relative w-full h-full max-w-2xl">
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
              style={{ objectPosition: imagePosition }}
              priority
              fetchPriority="high"
            />
            <div
              className="absolute inset-0 bg-secondary mix-blend-multiply"
              style={{
                WebkitMaskImage: `url(${image})`,
                maskImage: `url(${image})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: imagePosition,
                maskPosition: imagePosition,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center space-y-16">
        <h1
          className="text-4xl/tight md:text-5xl font-extrabold tracking-tight text-primary-foreground"
          style={{ textTransform: "none" }}
        >
          {renderTitleWithUnderline(title, "living")}
        </h1>
        {subtitle && (
          <p className="text-lg text-tertiary">{subtitle}</p>
        )}
        {ctaText && ctaHref && (
          <div>
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-none bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
