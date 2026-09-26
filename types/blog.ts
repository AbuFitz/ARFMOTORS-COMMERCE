import { ProductCategory } from "@/types/product";

// Text supports [link text](/url) and **bold**.
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "warning"; title: string; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; youtubeId: string; title: string; caption?: string }
  | { type: "products"; slugs: string[] };

export interface BlogPostMeta {
  slug: string;
  title: string;
  /** Used for the meta description and card summary. Aim for 140 to 160 characters. */
  description: string;
  category: ProductCategory;
  /** Main search phrase this guide targets. */
  keyword: string;
  publishedAt: string;
  updatedAt?: string;
  /** Hero image. Upload to this path; until then the category photo is shown. */
  hero: { src: string; alt: string };
  relatedProducts: string[];
  faqs?: { q: string; a: string }[];
}
