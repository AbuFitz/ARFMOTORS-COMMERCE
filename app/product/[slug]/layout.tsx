import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getCategoryName } from "@/lib/products";
import { getGuidesForProduct } from "@/lib/blog";
import { GuideCard } from "@/components/blog/guide-card";
import { JsonLd } from "@/components/json-ld";
import { calculateDiscount } from "@/lib/utils";
import { absoluteUrl, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  const url = `/product/${product.slug}`;
  const description = product.description.length > 160 ? `${product.description.slice(0, 157).trimEnd()}...` : product.description;
  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: product.title,
      description,
      images: product.images.slice(0, 1).map((src) => ({ url: src, alt: product.title })),
    },
  };
}

export default function ProductLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return children;

  const price = calculateDiscount(product.price, product.discountType, product.discountValue);
  const guides = getGuidesForProduct(product.slug, product.category, 3);
  const url = absoluteUrl(`/product/${product.slug}`);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.id,
    image: product.images.map((src) => absoluteUrl(src)),
    category: getCategoryName(product.category),
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "GBP",
      price: price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability: product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  return (
    <>
      <JsonLd
        data={[
          productLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: getCategoryName(product.category), path: `/shop/${product.category}` },
            { name: product.title, path: `/product/${product.slug}` },
          ]),
        ]}
      />
      {children}
      {guides.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-neutral-900">Helpful guides</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => <GuideCard key={g.slug} post={g} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
