import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: { title: product.title, description: product.description, images: product.images.slice(0, 1) },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
