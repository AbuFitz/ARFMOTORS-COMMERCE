import { create } from "zustand";

// Which side panel is open: the cart, the wishlist, or neither.
type Drawer = "cart" | "wishlist" | null;

interface DrawerStore {
  open: Drawer;
  openDrawer: (drawer: Exclude<Drawer, null>) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  open: null,
  openDrawer: (drawer) => set({ open: drawer }),
  closeDrawer: () => set({ open: null }),
}));
