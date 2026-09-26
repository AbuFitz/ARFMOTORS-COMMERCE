"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { getCartRecommendations } from "@/lib/recommendations";
import { getAllProducts } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";

interface CartRecommendationsProps {
  cartProducts: Product[];
}

export function CartRecommendations({ cartProducts }: CartRecommendationsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const allProducts = getAllProducts();

  // Get smart recommendations - filter for lower-priced items only (under £100)
  const productRecs = getCartRecommendations(cartProducts, allProducts)
    .filter(rec => rec.product.price < 100)
    .slice(0, 4); // Show max 4 recommendations

  // Quick add to cart
  const handleQuickAdd = (product: Product) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountType !== "none" && product.discountValue > 0
        ? calculateDiscount(product.price, product.discountType, product.discountValue)
        : undefined,
      quantity: 1,
      image: product.images[0],
      inStockUK: product.inStockUK,
      imported: product.imported,
    });
  };

  if (productRecs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Complete Your Build - Product Recommendations */}
      {productRecs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-50 border border-neutral-200 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-neutral-900 text-white rounded-lg">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-900">
                You might also like
              </h3>
              <p className="text-xs text-neutral-600">
                Popular with other customers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {productRecs.map((rec, index) => (
              <motion.div
                key={rec.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-neutral-200 rounded-lg p-3 hover:border-primary-500 transition-all group"
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-neutral-100">
                    <Image
                      src={rec.product.images[0] || "/images/placeholder.png"}
                      alt={rec.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-neutral-900 mb-1 line-clamp-1">
                      {rec.product.title}
                    </h4>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base font-bold text-neutral-900">
                        {formatPrice(calculateDiscount(rec.product.price, rec.product.discountType, rec.product.discountValue))}
                      </span>
                      {rec.product.inStockUK && (
                        <span className="text-xs text-green-600 font-medium">UK Stock</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(rec.product)}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      )}

    </div>
  );
}
