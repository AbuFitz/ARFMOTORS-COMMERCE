// Simple "you might also like" suggestions for the cart.

import { Product } from "@/types/product";

export interface Recommendation {
  product: Product;
  reason: string;
  priority: number; // Higher = more relevant
}

/**
 * Suggests products that aren't already in the cart: first other items from the
 * same categories, then featured products from elsewhere in the store.
 */
export function getCartRecommendations(cartProducts: Product[], allProducts: Product[]): Recommendation[] {
  if (cartProducts.length === 0) return [];

  const inCart = new Set(cartProducts.map((p) => p.id));
  const cartCategories = new Set(cartProducts.map((p) => p.category));
  const candidates = allProducts.filter((p) => !inCart.has(p.id));

  const recommendations: Recommendation[] = [
    ...candidates
      .filter((p) => cartCategories.has(p.category))
      .map((p) => ({ product: p, reason: "From the same category", priority: p.isFeatured ? 80 : 70 })),
    ...candidates
      .filter((p) => !cartCategories.has(p.category) && p.isFeatured)
      .map((p) => ({ product: p, reason: "Popular right now", priority: 50 })),
  ];

  return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 4);
}
