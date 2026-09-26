export interface ProductVariant {
  id: string;
  name: string; // e.g., "Black", "Carbon Fiber", "Large"
  type: "color" | "size" | "material" | "finish";
  priceAdjustment: number; // 0 for same price, positive for extra cost
  inStock: boolean;
  image?: string; // Optional different image for this variant
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  images: string[];
  bmwModels: string[];
  category: ProductCategory;
  price: number;
  inStockUK: boolean;
  imported: boolean;
  deliveryEstimate: string;
  shippingDays?: number; // NEW: Number of days for shipping (e.g., 14 for imported items)
  shippingNote?: string; // NEW: Custom note like "Made to order" or "Extended lead time"
  installationAvailable: boolean; // Eligible for fitting by FixNow Mechanics
  fittingFrom?: number; // Optional "fitting from £X" guide price shown to customers
  ebayListed?: boolean; // Also listed on our eBay store
  ebayItemId?: string; // Optional eBay item number for a direct link to the listing
  discountType: "none" | "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
  isFeatured?: boolean;
  warranty?: string;
  fitmentNotes?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[]; // NEW: Product variants (colors, sizes, etc.)
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory =
  | "interior"
  | "exterior"
  | "lighting"
  | "oem-plus"
  | "performance"
  | "wheels-tyres"
  | "audio"
  | "accessories";

export interface ProductFilter {
  category?: ProductCategory;
  bmwModel?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  fittingOnly?: boolean;
  search?: string;
}
