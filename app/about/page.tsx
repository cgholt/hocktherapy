import Image from "next/image";
import { Metadata } from "next";
import { getAboutPage } from "lib/content";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about my therapy practice and approach.",
};

export default function AboutPage() {
  const about = getAboutPage();

  return (
    <main className="bg-primary min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {about.image && (
          <div className="mb-8 flex justify-center">
            <Image
              src={about.image}
              alt="Headshot"
              width={200}
              height={200}
              className="rounded-full object-cover w-48 h-48"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-primary-foreground">
          {about.title}
        </h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        <div
          className="prose-content mt-8 prose prose-invert prose-headings:text-primary-foreground prose-p:text-tertiary prose-a:text-accent prose-strong:text-primary-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: about.content }}
        />
      </div>
    </main>
  );
}
