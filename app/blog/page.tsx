import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/blog/guide-card";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES } from "@/lib/products";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guides & Advice",
  description:
    "Practical car guides from ARF Commerce: choosing a dash cam, checking tyre pressure, using a jump starter, breakdown kit checklists and more.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Guides & Advice | ARF Commerce", url: "/blog" },
};

export default function BlogPage() {
  const all = getAllPosts();
  const latest = all.slice(0, 3);
  const withPosts = CATEGORIES.filter((c) => all.some((p) => p.category === c.id));

  return (
    <div className="bg-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Guides & Advice",
            url: absoluteUrl("/blog"),
            hasPart: all.map((p) => ({ "@type": "Article", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`) })),
          },
        ]}
      />
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">Guides</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-neutral-900">Guides & advice</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Straightforward help with choosing, fitting and using car accessories, tech and tools.
          </p>
          <nav aria-label="Guide categories" className="mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {withPosts.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 hover:border-neutral-900">
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-neutral-900">Latest guides</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, i) => <GuideCard key={post.slug} post={post} priority={i < 3} />)}
          </div>
        </div>
      </section>
      {withPosts.map((c) => {
        const posts = all.filter((p) => p.category === c.id);
        return (
          <section key={c.id} id={c.id} className="scroll-mt-24 border-t border-neutral-200 py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-neutral-900">{c.name}</h2>
                <Link href={`/shop/${c.id}`} className="shrink-0 text-sm font-semibold text-neutral-900 hover:text-primary-500">Shop {c.name.toLowerCase()}</Link>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => <GuideCard key={post.slug} post={post} />)}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
