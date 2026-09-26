import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getActiveCategories, getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse ARF Commerce by category — automotive, electronics and charging, tools and equipment, and home and utility.",
};

export default function CategoriesPage() {
  const categories = getActiveCategories();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Categories</h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          Our range is growing. Here&apos;s everything we stock right now.
        </p>

        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
          {categories.map((c) => {
            const examples = getProductsByCategory(c.id, 3);
            return (
              <Link
                key={c.id}
                href={`/shop?category=${c.id}`}
                className="group grid grid-cols-[120px_1fr] sm:grid-cols-[180px_1fr] overflow-hidden rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors"
              >
                <div className="relative bg-neutral-900">
                  <Image src={c.image} alt="" fill sizes="180px" className="object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-xl font-bold text-neutral-900 group-hover:text-primary-500 transition-colors">
                      {c.name}
                    </h2>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                      {c.count}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{c.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-neutral-500">
                    {examples.map((p) => (
                      <li key={p.id} className="line-clamp-1">{p.title}</li>
                    ))}
                  </ul>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900">
                    Shop {c.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
