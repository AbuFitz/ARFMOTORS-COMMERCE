import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDiscountPercent } from '@/lib/site-config';

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  image: string;
  inStockUK: boolean;
  imported: boolean;
  installationRequested?: boolean;
  installationPostcode?: string;
  installationAvailable?: boolean;
}

interface CartStore {
  items: CartItem[];
  discountCode: string | null;
  discountPercentage: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateInstallation: (productId: string, installation: {
    requested: boolean;
    postcode?: string;
    available?: boolean;
  }) => void;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,
      discountPercentage: 0,

      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.productId === item.productId);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      })),

      updateInstallation: (productId, installation) => set((state) => ({
        items: state.items.map((i) =>
          i.productId === productId
            ? {
                ...i,
                installationRequested: installation.requested,
                installationPostcode: installation.postcode,
                installationAvailable: installation.available,
              }
            : i
        ),
      })),

      applyDiscountCode: (code) => {
        // Codes are defined in lib/site-config.ts and re-validated by /api/checkout.
        const upperCode = code.toUpperCase().trim();
        const percent = getDiscountPercent(upperCode, get().getSubtotal());
        if (!percent) return false;

        set({
          discountCode: upperCode,
          discountPercentage: percent,
        });
        return true;
      },

      removeDiscountCode: () => set({
        discountCode: null,
        discountPercentage: 0,
      }),

      clearCart: () => set({
        items: [],
        discountCode: null,
        discountPercentage: 0,
      }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountedPrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percentage = get().discountPercentage;
        return (subtotal * percentage) / 100;
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return subtotal - discount;
      },
    }),
    {
      name: 'arfmotors-cart-storage',
    }
  )
);
