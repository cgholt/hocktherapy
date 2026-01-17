import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
      >
        Go home
      </Link>
    </main>
  );
}
