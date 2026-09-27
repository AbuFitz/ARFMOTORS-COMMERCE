"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { SideDrawer } from "@/components/side-drawer";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useCartStore } from "@/lib/cart-store";
import { useDrawerStore } from "@/lib/drawer-store";
import { useHydrated } from "@/lib/use-hydrated";
import { getProductBySlug } from "@/lib/products";
import { calculateDiscount, formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const hydrated = useHydrated();
  const open = useDrawerStore((s) => s.open === "wishlist");
  const { closeDrawer: close, openDrawer } = useDrawerStore();
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);
  const lines = hydrated ? items : [];

  const moveToCart = (slug: string) => {
    const p = getProductBySlug(slug);
    if (!p) return;
    const final = calculateDiscount(p.price, p.discountType, p.discountValue);
    addToCart({
      productId: p.id,
      slug: p.slug,
      title: p.title,
      price: p.price,
      discountedPrice: final < p.price ? final : undefined,
      quantity: 1,
      image: p.images[0],
      inStockUK: p.inStockUK,
      imported: p.imported,
    });
    removeItem(p.id);
    openDrawer("cart");
  };

  return (
    <SideDrawer
      open={open}
      onClose={close}
      title={`Wishlist${lines.length > 0 ? ` (${lines.length})` : ""}`}
      footer={
        lines.length > 0 ? (
          <Link href="/wishlist" onClick={close} className="block text-center text-sm font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
            View full wishlist
          </Link>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
            <Heart className="h-6 w-6 text-neutral-500" />
          </span>
          <p className="mt-4 font-medium text-neutral-900">Nothing saved yet</p>
          <p className="mt-1 text-sm text-neutral-500">Tap the heart on any product to save it here.</p>
          <Link href="/shop" onClick={close} className="mt-5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
            Browse the shop
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {lines.map((item) => {
            const product = getProductBySlug(item.slug);
            const price = product ? calculateDiscount(product.price, product.discountType, product.discountValue) : item.price;
            return (
              <li key={item.productId} className="flex gap-4 px-5 py-5">
                <Link href={`/product/${item.slug}`} onClick={close} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/product/${item.slug}`} onClick={close} className="text-sm font-medium leading-snug text-neutral-900 hover:text-primary-600">
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.title} from wishlist`}
                      className="-m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{formatPrice(price)}</p>
                  {product ? (
                    <button
                      type="button"
                      onClick={() => moveToCart(item.slug)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Move to cart
                    </button>
                  ) : (
                    <p className="mt-2 text-xs text-neutral-500">No longer available</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SideDrawer>
  );
}
