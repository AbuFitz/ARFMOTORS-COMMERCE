import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

export function calculateDiscount(
  price: number,
  discountType: "none" | "percentage" | "fixed",
  discountValue: number
): number {
  if (discountType === "none") return price;
  if (discountType === "percentage") {
    return price * (1 - discountValue / 100);
  }
  return Math.max(0, price - discountValue);
}

export function getDeliveryEstimate(inStockUK: boolean, imported: boolean): string {
  if (inStockUK) return "1-3 days";
  if (imported) return "10-14 days";
  return "Contact us";
}
