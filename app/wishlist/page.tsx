"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem, getTotalItems } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-6">
            <Heart className="h-12 w-12 text-neutral-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-neutral-600 mb-8">
            Save your favorite BMW parts and accessories for later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Browse Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-neutral-600">{getTotalItems()} items saved</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <Link href={`/product/${item.slug}`}>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-4">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {item.inStockUK && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      UK Stock
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-2 hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-lg font-bold text-neutral-900 mb-3">
                  {formatPrice(item.price)}
                </p>
              </Link>

              <div className="flex gap-2">
                <Link
                  href={`/product/${item.slug}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  View
                </Link>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
