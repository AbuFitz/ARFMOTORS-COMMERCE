import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import { ArticleBlocks } from "@/components/blog/article-blocks";
import { GuideCard } from "@/components/blog/guide-card";
import { JsonLd } from "@/components/json-ld";
import {
  BLOG_POSTS, getPostMeta, getPostContent, heroImage, readingTime, tableOfContents, formatDate, getPostsByCategory,
} from "@/lib/blog";
import { getCategory } from "@/lib/products";
import { COMPANY } from "@/lib/site-config";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostMeta(params.slug);
  if (!post) return { title: "Guide not found" };
  const hero = heroImage(post);
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: hero.src, alt: hero.alt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [hero.src] },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const post = getPostMeta(params.slug);
  if (!post) notFound();
  const blocks = getPostContent(post.slug);
  const hero = heroImage(post);
  const toc = tableOfContents(blocks);
  const minutes = readingTime(blocks);
  const category = getCategory(post.category);
  const related = [
    ...getPostsByCategory(post.category).filter((p) => p.slug !== post.slug),
    ...BLOG_POSTS.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(hero.src)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: COMPANY.brandName, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.keyword,
  };

  return (
    <article className="bg-white">
      <JsonLd data={[articleLd, breadcrumbJsonLd(crumbs), ...(post.faqs?.length ? [faqJsonLd(post.faqs)] : [])]} />

      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-8 sm:pb-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-neutral-900">Guides</Link>
            {category && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={`/blog#${category.id}`} className="hover:text-neutral-900">{category.name}</Link>
              </>
            )}
          </nav>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-neutral-900">{post.title}</h1>
          <p className="mt-4 text-lg text-neutral-600">{post.description}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
            <span>By the {COMPANY.brandName} team</span>
            <time dateTime={post.updatedAt ?? post.publishedAt}>
              {post.updatedAt ? `Updated ${formatDate(post.updatedAt)}` : formatDate(post.publishedAt)}
            </time>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{minutes} min read</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
          <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-12">
        {toc.length > 2 && (
          <nav aria-label="In this guide" className="mb-8 rounded-xl border border-neutral-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">In this guide</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-neutral-700 hover:text-primary-600">{item.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <ArticleBlocks blocks={blocks} />

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 border-t border-neutral-200 pt-8" aria-labelledby="faqs">
            <h2 id="faqs" className="font-display text-2xl font-bold text-neutral-900">Frequently asked questions</h2>
            <div className="mt-4 divide-y divide-neutral-200">
              {post.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-semibold text-neutral-900 marker:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {f.q}
                      <span className="text-primary-500 transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-2 text-neutral-700">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {category && (
          <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-neutral-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Shop {category.name.toLowerCase()}</p>
              <p className="mt-1 text-sm text-neutral-400">{category.description}</p>
            </div>
            <Link href={`/shop/${category.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
              View range <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-neutral-900">More guides</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <GuideCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
