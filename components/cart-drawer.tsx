"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, Wrench, ShoppingCart } from "lucide-react";
import { SideDrawer } from "@/components/side-drawer";
import { useCartStore } from "@/lib/cart-store";
import { useDrawerStore } from "@/lib/drawer-store";
import { useHydrated } from "@/lib/use-hydrated";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const hydrated = useHydrated();
  const open = useDrawerStore((s) => s.open === "cart");
  const close = useDrawerStore((s) => s.closeDrawer);
  const { items, removeItem, updateQuantity, getTotalItems, getSubtotal } = useCartStore();
  const lines = hydrated ? items : [];
  const count = hydrated ? getTotalItems() : 0;

  return (
    <SideDrawer
      open={open}
      onClose={close}
      title={`Your cart${count > 0 ? ` (${count})` : ""}`}
      footer={
        lines.length > 0 ? (
          <>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600">Subtotal</span>
              <span className="font-display text-lg font-bold text-neutral-900">{formatPrice(getSubtotal())}</span>
            </div>
            <p className="mb-4 text-xs text-neutral-500">Delivery and any discount codes are added at checkout.</p>
            <Link
              href="/checkout"
              onClick={close}
              className="mb-2.5 flex w-full items-center justify-center rounded-full bg-primary-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Checkout
            </Link>
            <Link href="/cart" onClick={close} className="block text-center text-sm font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
              View full cart
            </Link>
          </>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
            <ShoppingCart className="h-6 w-6 text-neutral-500" />
          </span>
          <p className="mt-4 font-medium text-neutral-900">Your cart is empty</p>
          <p className="mt-1 text-sm text-neutral-500">Add something and it will show up here.</p>
          <Link href="/shop" onClick={close} className="mt-5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
            Browse the shop
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {lines.map((item) => {
            const unit = item.discountedPrice || item.price;
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
                      aria-label={`Remove ${item.title}`}
                      className="-m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {item.fittingRequested && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-600">
                      <Wrench className="h-3 w-3 text-primary-500" />
                      Fitting requested{item.fittingPostcode ? `, ${item.fittingPostcode}` : ""}
                    </p>
                  )}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-md border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center hover:bg-neutral-100 disabled:opacity-30"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-medium tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, Math.min(9, item.quantity + 1))}
                        disabled={item.quantity >= 9}
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center hover:bg-neutral-100 disabled:opacity-30"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">{formatPrice(unit * item.quantity)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SideDrawer>
  );
}
