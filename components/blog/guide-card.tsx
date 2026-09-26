import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/types/blog";
import { getCategoryName } from "@/lib/products";
import { heroImage, readingTime, getPostContent } from "@/lib/blog";

export function GuideCard({ post, priority = false }: { post: BlogPostMeta; priority?: boolean }) {
  const hero = heroImage(post);
  const minutes = readingTime(getPostContent(post.slug));
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors hover:border-neutral-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        <Image src={hero.src} alt={hero.alt} fill priority={priority} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-500">{getCategoryName(post.category)}</p>
        <h3 className="mt-2 font-semibold leading-snug text-neutral-900 group-hover:text-primary-600">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.description}</p>
        <p className="mt-auto pt-4 text-xs text-neutral-500">{minutes} min read</p>
      </div>
    </Link>
  );
}
