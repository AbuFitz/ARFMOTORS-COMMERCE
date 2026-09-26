import { Product, ProductCategory, ProductFilter, ProductSort } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import IMPORTED_PRODUCTS from "@/data/imported-products.json";

// ─── Categories ──────────────────────────────────────────────────────────────
// Add a category here (and to ProductCategory in types/product.ts) as the
// range grows. Categories with no active products are hidden automatically.

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "in-car-tech",
    name: "In-Car Tech",
    description: "Dash cams, reversing cameras, CarPlay and diagnostics",
    image: "/images/categories/in-car-tech.png",
  },
  {
    id: "accessories",
    name: "Car Accessories",
    description: "Mounts, chargers, cables and interior accessories",
    image: "/images/categories/accessories.png",
  },
  {
    id: "roadside",
    name: "Roadside & Emergency",
    description: "Jump starters, tyre inflators and breakdown kit",
    image: "/images/categories/roadside.png",
  },
  {
    id: "tools",
    name: "Tools & Garage",
    description: "Tool kits, test equipment and work lights",
    image: "/images/categories/tools.png",
  },
];

export function getCategory(id: string | undefined): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryName(id: string): string {
  return getCategory(id)?.name ?? id.replace(/-/g, " ");
}

// ─── Catalogue ───────────────────────────────────────────────────────────────
// Products come from data/products.ts (edited by hand) plus
// data/imported-products.json (written by `npm run import-products`).
// An imported product with the same id or slug replaces the hand-written one.

const CATALOGUE: Product[] = (() => {
  const imported = IMPORTED_PRODUCTS as unknown as Product[];
  const importedKeys = new Set(imported.flatMap((p) => [p.id, p.slug]));
  return [
    ...PRODUCTS.filter((p) => !importedKeys.has(p.id) && !importedKeys.has(p.slug)),
    ...imported,
  ];
})();

export function getAllProducts(): Product[] {
  return CATALOGUE.filter((p) => p.isActive);
}

export function getProductBySlug(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) ?? null;
}

export function getProductById(id: string): Product | null {
  return getAllProducts().find((p) => p.id === id) ?? null;
}

/** Categories that currently have at least one active product. */
export function getActiveCategories(): (CategoryInfo & { count: number })[] {
  const all = getAllProducts();
  return CATEGORIES.map((c) => ({ ...c, count: all.filter((p) => p.category === c.id).length })).filter(
    (c) => c.count > 0
  );
}

function sortProducts(products: Product[], sort: ProductSort = "featured"): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
  }
}

export function filterProducts(filters: ProductFilter, source?: Product[]): Product[] {
  let products = source ?? getAllProducts();

  if (filters.category) {
    products = products.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.inStockOnly) {
    products = products.filter((p) => p.inStockUK);
  }

  if (filters.fittingOnly) {
    products = products.filter((p) => p.fittingEligible);
  }

  if (filters.featuredOnly) {
    products = products.filter((p) => p.isFeatured);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        getCategoryName(p.category).toLowerCase().includes(searchLower) ||
        (p.compatibility ?? []).some((c) => c.toLowerCase().includes(searchLower))
    );
  }

  return sortProducts(products, filters.sort);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  const all = getAllProducts();
  const featured = all.filter((p) => p.isFeatured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getNewestProducts(limit: number = 4, exclude: string[] = []): Product[] {
  return sortProducts(
    getAllProducts().filter((p) => !exclude.includes(p.id)),
    "newest"
  ).slice(0, limit);
}

export function getProductsByCategory(category: string, limit?: number): Product[] {
  const products = getAllProducts().filter((p) => p.category === category);
  return limit ? products.slice(0, limit) : products;
}
