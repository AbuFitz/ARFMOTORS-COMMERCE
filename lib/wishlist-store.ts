import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  inStockUK: boolean;
  addedAt: number; // timestamp
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const exists = get().items.find((i) => i.productId === item.productId);
        if (exists) return; // Don't add duplicates

        set((state) => ({
          items: [...state.items, { ...item, addedAt: Date.now() }],
        }));
      },

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,
    }),
    {
      name: 'arfmotors-wishlist-storage',
    }
  )
);
