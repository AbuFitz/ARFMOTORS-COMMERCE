export interface ProductVariant {
  id: string;
  name: string; // e.g., "Black", "Large"
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
  category: ProductCategory;
  price: number;
  inStockUK: boolean;
  imported: boolean;
  deliveryEstimate: string;
  shippingDays?: number; // Number of days for shipping (e.g., 14 for imported items)
  shippingNote?: string; // Custom note like "Made to order" or "Extended lead time"
  fittingEligible: boolean; // Can be professionally fitted by FixNow Mechanics
  fittingFrom?: number; // Optional "fitting from £X" guide price shown to customers
  compatibility?: string[]; // Optional list of what the product works with
  compatibilityNotes?: string[];
  ebayListed?: boolean; // Also listed on our eBay store
  ebayItemId?: string; // Optional eBay item number for a direct link to the listing
  discountType: "none" | "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
  isFeatured?: boolean;
  warranty?: string;
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = "in-car-tech" | "accessories" | "roadside" | "tools";

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc";

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  fittingOnly?: boolean;
  featuredOnly?: boolean;
  search?: string;
  sort?: ProductSort;
}
