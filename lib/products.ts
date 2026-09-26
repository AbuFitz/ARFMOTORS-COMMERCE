import { Product, ProductFilter } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import IMPORTED_PRODUCTS from "@/data/imported-products.json";

// ─── BMW model-category → individual generation codes ────────────────────────
// Home page passes "3-series"; products store ["F30","F31","G20","G21"].
// This map bridges the two.
const MODEL_CODES: Record<string, string[]> = {
  "1-series":  ["E30", "F20", "F21", "F40"],
  "2-series":  ["F22", "F23", "F44", "G42"],
  "3-series":  ["E36", "E46", "E90", "E91", "E92", "E93", "F30", "F31", "F34", "F35", "F80", "G20", "G21", "G80"],
  "4-series":  ["F32", "F33", "F36", "F82", "G22", "G23", "G26", "G82"],
  "5-series":  ["E39", "E60", "E61", "F10", "F11", "G30", "G31", "G60", "G61"],
  "m-cars":    ["F80", "F82", "F87", "G80", "G82", "G87"],
  "x-models":  ["X1", "X2", "X3", "X4", "X5", "X6", "X7"],
};

// ─── Catalogue helpers ───────────────────────────────────────────────────────
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

export function filterProducts(filters: ProductFilter, source?: Product[]): Product[] {
  let products = source ?? getAllProducts();

  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }

  if (filters.bmwModel) {
    const key = filters.bmwModel.toLowerCase();
    const codes = MODEL_CODES[key];
    if (codes) {
      // Category filter: "3-series" → match any of its generation codes
      const codeSet = new Set(codes.map(c => c.toLowerCase()));
      products = products.filter(p =>
        p.bmwModels.some(m => codeSet.has(m.toLowerCase()))
      );
    } else {
      // Direct code filter: "F30" → exact match
      products = products.filter(p =>
        p.bmwModels.some(m => m.toLowerCase() === key)
      );
    }
  }

  if (filters.minPrice !== undefined) {
    products = products.filter(p => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters.inStockOnly) {
    products = products.filter(p => p.inStockUK);
  }

  if (filters.fittingOnly) {
    products = products.filter(p => p.installationAvailable);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.bmwModels.some(model => model.toLowerCase().includes(searchLower))
    );
  }

  return products;
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  const all = getAllProducts();
  const featured = all.filter((p) => p.isFeatured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function getProductsByCategory(category: string, limit?: number): Product[] {
  const products = getAllProducts().filter((p) => p.category === category);
  return limit ? products.slice(0, limit) : products;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const BMW_MODELS = [
  "E30", "E36", "E46", "E90", "E91", "E92", "E93",
  "F30", "F31", "F32", "F33", "F34", "F80", "F82", "F87",
  "G20", "G21", "G22", "G23", "G80", "G82", "G87",
  "E39", "E60", "E61", "F10", "F11", "G30", "G31",
  "E38", "E65", "F01", "G11", "G12",
  "X1", "X2", "X3", "X4", "X5", "X6", "X7"
];

export const CATEGORIES = [
  { id: "interior", name: "Interior", description: "Enhance your cabin" },
  { id: "exterior", name: "Exterior", description: "Style & aerodynamics" },
  { id: "lighting", name: "Lighting", description: "LED & xenon upgrades" },
  { id: "oem-plus", name: "OEM+", description: "Factory-inspired upgrades" },
  { id: "performance", name: "Performance", description: "Power & handling" },
  { id: "wheels-tyres", name: "Wheels & Tyres", description: "Premium fitments" },
  { id: "audio", name: "Audio", description: "Sound systems" },
  { id: "accessories", name: "Accessories", description: "Care & maintenance" },
];
