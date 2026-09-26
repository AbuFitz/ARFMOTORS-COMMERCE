import Image from "next/image";
import { Lightbulb, AlertTriangle } from "lucide-react";
import { BlogBlock } from "@/types/blog";
import { Product } from "@/types/product";
import { RichText } from "@/components/rich-text";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug } from "@/lib/products";
import { findPublicImage } from "@/lib/public-image";
import { slugify } from "@/lib/blog";

export function ArticleBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5 text-[17px] leading-relaxed text-neutral-700">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}><RichText text={block.text} /></p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="scroll-mt-28 pt-4 font-display text-2xl sm:text-[28px] font-bold leading-tight text-neutral-900">
                <RichText text={block.text} />
              </h2>
            );
          case "h3":
            return <h3 key={i} className="pt-2 text-lg font-semibold text-neutral-900"><RichText text={block.text} /></h3>;
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary-500">
                {block.items.map((item, j) => <li key={j}><RichText text={item} /></li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-neutral-900">
                {block.items.map((item, j) => <li key={j} className="pl-1"><RichText text={item} /></li>)}
              </ol>
            );
          case "tip":
          case "warning": {
            const warn = block.type === "warning";
            const Icon = warn ? AlertTriangle : Lightbulb;
            return (
              <aside key={i} className={warn ? "rounded-xl border border-amber-200 bg-amber-50 p-5" : "rounded-xl border border-neutral-200 bg-neutral-50 p-5"}>
                <p className="flex items-center gap-2 font-semibold text-neutral-900">
                  <Icon className={warn ? "h-5 w-5 text-amber-600" : "h-5 w-5 text-primary-500"} />
                  {block.title}
                </p>
                <p className="mt-2 text-base"><RichText text={block.text} /></p>
              </aside>
            );
          }
          case "image": {
            const src = findPublicImage(block.src);
            if (!src) return null;
            return (
              <figure key={i} className="py-2">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-neutral-100">
                  <Image src={src} alt={block.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
                </div>
                {block.caption && <figcaption className="mt-2 text-sm text-neutral-500">{block.caption}</figcaption>}
              </figure>
            );
          }
          case "products": {
            const products = block.slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p));
            if (products.length === 0) return null;
            return (
              <div key={i} className="not-prose rounded-2xl border border-neutral-200 p-4 sm:p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Products in this guide</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
