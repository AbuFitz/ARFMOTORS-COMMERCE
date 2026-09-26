import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all products from ARF Commerce.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
