import Services from "components/sections/Services";
import { getServices } from "lib/content";

export const metadata = {
  title: "Services",
  description: "Therapy services offered",
};

export default function ServicesPage() {
  const services = getServices();
  const hasServices = services.length > 0;

  return (
    <main className="min-h-screen bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">
          {hasServices ? "Our Services" : "Services Coming Soon"}
        </h1>
        <div className="mt-1 h-1 w-16 bg-accent rounded" />
        {hasServices && (
          <p className="mt-4 text-tertiary">
            Explore the therapy services we offer to support your mental health journey.
          </p>
        )}
        {!hasServices && (
          <p className="mt-4 text-tertiary">
            Please check back later.
          </p>
        )}
      </div>
      {hasServices && <Services items={services} />}
    </main>
  );
}
