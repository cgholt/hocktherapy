import Services from "components/sections/Services";
import { services } from "content/services";

export const metadata = {
  title: "Services",
  description: "Therapy services offered",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-2 text-muted-foreground">
          Explore the therapy services we offer to support your mental health journey.
        </p>
      </div>
      <Services items={services} />
    </main>
  );
}
