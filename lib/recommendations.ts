// Smart product recommendation algorithm for ARF Motors

import { Product } from "@/types/product";

export interface Recommendation {
  product: Product;
  reason: string;
  discount?: number;
  priority: number; // Higher = more relevant
}

/**
 * Get smart product recommendations based on cart contents
 * Uses category matching and visual completion
 */
export function getCartRecommendations(
  cartProducts: Product[],
  allProducts: Product[]
): Recommendation[] {
  if (cartProducts.length === 0) return [];

  const recommendations: Recommendation[] = [];
  const cartProductIds = new Set(cartProducts.map((p) => p.id));

  // Get categories in cart
  const cartCategories = new Set(cartProducts.map((p) => p.category));

  cartProducts.forEach((cartItem) => {
    // RULE 1: COMPLEMENTARY PRODUCTS (Visual Completion)
    const complementaryRules: Record<string, { categories: string[]; reason: string }> = {
      "exhaust-tips": {
        categories: ["exterior"],
        reason: "Complete the M Sport look",
      },
      "headlights": {
        categories: ["lighting"],
        reason: "Complete your lighting upgrade",
      },
      "steering-wheel": {
        categories: ["interior"],
        reason: "Perfect interior pairing",
      },
      "mirror-caps": {
        categories: ["exterior"],
        reason: "Match the carbon theme",
      },
    };

    // Find complementary products
    Object.entries(complementaryRules).forEach(([key, rule]) => {
      if (cartItem.slug.includes(key)) {
        allProducts
          .filter(
            (p) =>
              !cartProductIds.has(p.id) &&
              rule.categories.includes(p.category) &&
              p.id !== cartItem.id
          )
          .slice(0, 2)
          .forEach((p) => {
            recommendations.push({
              product: p,
              reason: rule.reason,
              discount: 10,
              priority: 90,
            });
          });
      }
    });

    // RULE 2: CATEGORY COMPLETION
    // If customer bought from a category, suggest more from same category
    const sameCategoryProducts = allProducts.filter(
      (p) =>
        !cartProductIds.has(p.id) &&
        p.category === cartItem.category &&
        p.id !== cartItem.id
    );

    sameCategoryProducts.slice(0, 2).forEach((p) => {
      recommendations.push({
        product: p,
        reason: `Popular ${p.category.replace("-", " ")} upgrade`,
        priority: 70,
      });
    });
  });

  // RULE 4: FREQUENTLY BOUGHT TOGETHER
  // Based on category patterns
  if (cartCategories.has("exterior")) {
    allProducts
      .filter(
        (p) =>
          !cartProductIds.has(p.id) &&
          (p.category === "exterior" || p.category === "lighting")
      )
      .slice(0, 2)
      .forEach((p) => {
        recommendations.push({
          product: p,
          reason: "Customers also added",
          priority: 60,
        });
      });
  }

  if (cartCategories.has("interior")) {
    allProducts
      .filter((p) => !cartProductIds.has(p.id) && p.category === "interior")
      .slice(0, 2)
      .forEach((p) => {
        recommendations.push({
          product: p,
          reason: "Complete your interior",
          priority: 65,
        });
      });
  }

  // RULE 5: INSTALLATION UPSELL
  // This is handled separately in the cart component

  // Remove duplicates and sort by priority
  const uniqueRecommendations = Array.from(
    new Map(recommendations.map((r) => [r.product.id, r])).values()
  );

  return uniqueRecommendations.sort((a, b) => b.priority - a.priority).slice(0, 4);
}

/**
 * Get bundle discount for multiple items
 */
export function getBundleDiscount(itemCount: number): number {
  if (itemCount >= 5) return 15;
  if (itemCount >= 3) return 10;
  if (itemCount >= 2) return 5;
  return 0;
}

/**
 * Get installation bundle price
 */
export function getInstallationBundlePrice(
  itemCount: number,
  baseInstallPrice: number = 85
): { price: number; savings: number } {
  if (itemCount >= 3) {
    return {
      price: baseInstallPrice + (itemCount - 1) * 40,
      savings: (itemCount - 1) * 25,
    };
  }
  if (itemCount >= 2) {
    return {
      price: baseInstallPrice + 50,
      savings: 20,
    };
  }
  return { price: baseInstallPrice, savings: 0 };
}
