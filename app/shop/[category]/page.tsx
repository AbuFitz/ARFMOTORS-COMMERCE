import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopBrowser } from "@/components/shop-browser";
import { GuideCard } from "@/components/blog/guide-card";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/products";
import { getPostsByCategory } from "@/lib/blog";
import { CATEGORY_CONTENT } from "@/data/category-content";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return { title: "Category not found" };
  const content = CATEGORY_CONTENT[category.id];
  const url = `/shop/${category.id}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: { url, title: `${content.metaTitle} | ARF Commerce`, description: content.metaDescription, images: [{ url: category.image, alt: category.name }] },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();
  const content = CATEGORY_CONTENT[category.id];
  const guides = getPostsByCategory(category.id).slice(0, 3);
  const products = getProductsByCategory(category.id);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: category.name, path: `/shop/${category.id}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: content.metaDescription,
            url: absoluteUrl(`/shop/${category.id}`),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/product/${p.slug}`), name: p.title })),
            },
          },
          faqJsonLd(content.faqs),
        ]}
      />
      <ShopBrowser lockedCategory={category.id} intro={content.intro} />

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            {content.body.map((b) => (
              <div key={b.heading}>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">{b.heading}</h2>
                <p className="mt-2 leading-relaxed text-neutral-700"><RichText text={b.text} /></p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">Common questions</h2>
            <div className="mt-2 divide-y divide-neutral-200">
              {content.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-neutral-900">
                    {f.q}
                    <span className="text-primary-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-neutral-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-neutral-900">{category.name} guides</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => <GuideCard key={g.slug} post={g} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
