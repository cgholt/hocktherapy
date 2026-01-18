"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#181619] text-white">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mt-4 text-lg text-gray-400">
            We encountered an unexpected error.
          </p>
          <button
            onClick={reset}
            className="mt-8 inline-flex items-center rounded-lg bg-[#a76b09] px-6 py-3 text-white font-medium hover:opacity-90 transition"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
