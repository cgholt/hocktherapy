import Image from "next/image";

export default function About({
  title,
  content,
  image,
}: {
  title?: string;
  content: string;
  image?: string | null;
}) {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {image && (
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden ring-2 ring-tertiary">
              <Image
                src={image}
                alt={title || "About"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className={image ? "" : "md:col-span-2 max-w-2xl"}>
            <h2 className="text-2xl font-semibold text-secondary-foreground">
              {title || "About Me"}
            </h2>
            <div className="mt-1 h-1 w-16 bg-accent rounded" />
            <div
              className="mt-6 text-tertiary leading-relaxed space-y-4 [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
