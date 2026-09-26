"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Heart, Clock, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { getCategoryName } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export function ProductCard({ product, showQuickView = false }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  useEffect(() => setIsWishlisted(isInWishlist(product.id)), [isInWishlist, product.id]);
  const [showWishlistFeedback, setShowWishlistFeedback] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hydrated = useHydrated();

  const finalPrice = calculateDiscount(
    product.price,
    product.discountType,
    product.discountValue
  );
  const hasDiscount = product.discountType !== "none" && product.discountValue > 0;

  // New = added in the last 30 days. Only worked out in the browser, because the
  // server's build date and the visitor's date can differ.
  const isNew = () => {
    if (!hydrated) return false;
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const createdDate = new Date(product.createdAt).getTime();
    return createdDate > thirtyDaysAgo;
  };

  // Check if extended shipping time
  const hasExtendedShipping = !product.inStockUK && Boolean(product.shippingDays);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeItem(product.id);
      setIsWishlisted(false);
    } else {
      addItem({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: finalPrice,
        image: product.images[0],
        inStockUK: product.inStockUK,
      });
      setIsWishlisted(true);
      setShowWishlistFeedback(true);
      setTimeout(() => setShowWishlistFeedback(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 border border-neutral-200">
          {/* Badges Container - Top Left */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
            {hasDiscount && (
              <span className="inline-flex items-center rounded-full bg-primary-500 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white shadow-sm">
                {product.discountType === "percentage"
                  ? `-${product.discountValue}%`
                  : `Save ${formatPrice(product.discountValue)}`}
              </span>
            )}
            {isNew() && (
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white shadow-sm">
                New
              </span>
            )}
            {hasExtendedShipping && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-700 shadow-sm">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Ships in {product.shippingDays} days
              </span>
            )}
          </div>

          {/* Badges Container - Top Right */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex flex-col gap-1 sm:gap-2">
            {product.fittingEligible && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-neutral-900/85 px-2 py-1 sm:px-2.5 backdrop-blur text-[10px] sm:text-xs font-medium text-white shadow-sm"
                title="Professional fitting available"
              >
                <Wrench className="h-3 w-3" />
                <span className="hidden sm:inline">Fitting available</span>
              </span>
            )}
          </div>

          {/* Wishlist Heart Button - Larger touch target for mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10 rounded-full bg-white/90 backdrop-blur p-2 sm:p-2.5 shadow-lg hover:bg-white transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "h-5 w-5 sm:h-5 sm:w-5 transition-all",
                isWishlisted ? "fill-primary-500 text-primary-500" : "text-neutral-600"
              )}
            />
          </motion.button>

          {/* Wishlist Feedback */}
          <AnimatePresence>
            {showWishlistFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 left-3 z-10 bg-primary-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg"
              >
                Added to wishlist!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image */}
          <div className="relative h-full w-full">
            {product.images[0] && !imgError ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 gap-2">
                <span className="text-2xl font-bold text-neutral-300 tracking-widest select-none">ARF</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Image coming soon</span>
              </div>
            )}
          </div>

          {/* Quick View Overlay - Shows on Hover */}
          {showQuickView && (
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Quick view functionality would go here
                }}
              >
                <Eye className="h-4 w-4" />
                Quick View
              </motion.button>
            </div>
          )}
        </div>

        <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-neutral-500">
            {getCategoryName(product.category)}
          </p>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1">
            <span className="text-base sm:text-lg font-bold text-neutral-900">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-neutral-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Delivery estimate with custom note */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-600">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span className="line-clamp-1">{product.shippingNote || product.deliveryEstimate}</span>
          </div>
        </div>
      </Link>

    </motion.div>
  );
}
