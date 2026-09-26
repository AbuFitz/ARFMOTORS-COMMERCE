import type { Metadata } from "next";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Shop dash cams, in-car tech, car accessories, roadside kit and tools from ARF Commerce, with UK delivery and optional fitting on selected products.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop All Products | ARF Commerce" },
};

export default function ShopPage() {
  return <ShopBrowser />;
}
