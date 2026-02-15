"use client";

import Link from "next/link";

interface ServicesDropdownProps {
  label: string;
  services: { title: string; slug: string }[];
}

export default function ServicesDropdown({ label, services }: ServicesDropdownProps) {
  return (
    <li className="relative group">
      <Link
        href="/services"
        className="nav-link text-sm md:text-base font-medium text-tertiary hover:text-accent transition"
      >
        {label}
      </Link>
      <ul className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-48 bg-secondary border border-border rounded shadow-lg py-1 z-50">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="block px-4 py-2 text-sm text-tertiary hover:text-accent hover:bg-secondary transition"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
