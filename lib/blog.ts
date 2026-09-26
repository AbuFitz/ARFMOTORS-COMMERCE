// Server-side blog helpers (reads /public to find uploaded images).
import { BlogBlock, BlogPostMeta } from "@/types/blog";
import { BLOG_CONTENT } from "@/data/blog/content";
import { getCategory } from "@/lib/products";
import { findPublicImage } from "@/lib/public-image";
import { plainText } from "@/components/rich-text";

export { BLOG_POSTS, getAllPosts, getPostMeta, getPostsByCategory, getGuidesForProduct } from "@/data/blog/meta";

export function getPostContent(slug: string): BlogBlock[] {
  return BLOG_CONTENT[slug] ?? [];
}

/** The uploaded hero, or the category photo until one is uploaded. */
export function heroImage(post: BlogPostMeta): { src: string; alt: string; uploaded: boolean } {
  const uploaded = findPublicImage(post.hero.src);
  return {
    src: uploaded ?? getCategory(post.category)?.image ?? "/og-default.jpg",
    alt: post.hero.alt,
    uploaded: Boolean(uploaded),
  };
}

export function slugify(text: string): string {
  return plainText(text).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "tip":
    case "warning":
      return `${block.title} ${block.text}`;
    default:
      return "";
  }
}

export function readingTime(blocks: BlogBlock[]): number {
  const words = blocks.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function tableOfContents(blocks: BlogBlock[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: plainText(b.text) }));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
