import type { MetadataRoute } from "next";
import { CATEGORIES, getAllProducts } from "@/lib/products";
import { BLOG_POSTS } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "daily"],
    ["/shop", 0.9, "daily"],
    ["/categories", 0.7, "weekly"],
    ["/blog", 0.7, "weekly"],
    ["/installation", 0.6, "monthly"],
    ["/about", 0.5, "monthly"],
    ["/suppliers", 0.5, "monthly"],
    ["/support", 0.5, "monthly"],
    ["/contact", 0.4, "yearly"],
    ["/returns", 0.3, "yearly"],
    ["/warranty", 0.3, "yearly"],
    ["/terms", 0.2, "yearly"],
    ["/privacy", 0.2, "yearly"],
  ];

  return [
    ...staticPages.map(([path, priority, changeFrequency]) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority })),
    ...CATEGORIES.map((c) => ({ url: absoluteUrl(`/shop/${c.id}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getAllProducts().map((p) => ({
      url: absoluteUrl(`/product/${p.slug}`),
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
