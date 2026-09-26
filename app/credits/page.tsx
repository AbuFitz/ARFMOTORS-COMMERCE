import type { Metadata } from "next";
import Link from "next/link";
import { IMAGE_CREDITS } from "@/data/image-credits";
import { getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Credits and licences for photos used on the ARF Commerce website.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Image credits</h1>
        <p className="mt-3 text-neutral-600">
          Some product photos on this site are used under Creative Commons licences. Thank you to the photographers
          below. Photos may be resized for display.
        </p>
        <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {IMAGE_CREDITS.map((c) => {
            const product = getProductBySlug(c.slug);
            return (
              <li key={c.slug} className="py-4 text-sm">
                {product && (
                  <Link href={`/product/${product.slug}`} className="font-semibold text-neutral-900 hover:text-primary-600">
                    {product.title}
                  </Link>
                )}
                <p className="mt-1 text-neutral-600">
                  &ldquo;
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline">
                    {c.title}
                  </a>
                  &rdquo; by {c.author},{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
