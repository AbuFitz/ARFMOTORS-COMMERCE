"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Search, Heart, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { getActiveCategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Shop all", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "New arrivals", href: "/shop?sort=newest" },
  { name: "Featured", href: "/shop?featured=1" },
  { name: "Automotive", href: "/shop?category=automotive" },
  { name: "Installation", href: "/installation" },
  { name: "About", href: "/about" },
  { name: "Help", href: "/support" },
];

function SearchForm({ onDone, autoFocus = false }: { onDone?: () => void; autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
        setQuery("");
        onDone?.();
      }}
      className="relative w-full"
    >
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-0 transition-colors"
      />
    </form>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white"
    >
      {count}
    </motion.span>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.getTotalItems());
  const totalItems = hydrated ? cartCount : 0;
  const wishlistItems = hydrated ? wishlistCount : 0;
  const categories = getActiveCategories();

  const isActive = (href: string) => !href.includes("?") && pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Main row */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px]">
        <Link href="/" className="flex-shrink-0" aria-label="ARF Commerce home">
          <Image
            src="/logo.svg"
            alt="ARF Commerce"
            width={1381}
            height={524}
            priority
            unoptimized
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchForm />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="relative p-2 text-neutral-700 hover:text-neutral-900" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            <CountBadge count={wishlistItems} />
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 p-2 lg:pl-3 lg:pr-4 lg:rounded-lg lg:bg-neutral-900 lg:text-white lg:hover:bg-neutral-800 text-neutral-700 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden lg:inline text-sm font-semibold">Cart</span>
            <CountBadge count={totalItems} />
          </Link>
          <button
            type="button"
            className="xl:hidden p-2 text-neutral-700"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop navigation row */}
      <nav className="hidden xl:block border-t border-neutral-100" aria-label="Main">
        <div className="mx-auto flex max-w-7xl items-center gap-7 px-8 h-11">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-neutral-900",
                isActive(item.href) ? "text-neutral-900" : "text-neutral-600",
                isActive(item.href) &&
                  "after:absolute after:-bottom-[13px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-500"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile search */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-neutral-100"
          >
            <div className="px-4 py-3">
              <SearchForm autoFocus onDone={() => setMobileSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden border-t border-neutral-200 bg-white"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Shop</p>
                {navigation.slice(0, 4).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 text-neutral-300" />
                  </Link>
                ))}
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    {c.name}
                    <span className="text-xs text-neutral-400">{c.count}</span>
                  </Link>
                ))}
              </div>
              <div>
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">ARF Commerce</p>
                {navigation.slice(5).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium hover:bg-neutral-50",
                      isActive(item.href) ? "text-neutral-900 bg-neutral-50" : "text-neutral-800"
                    )}
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 text-neutral-300" />
                  </Link>
                ))}
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  Track an order
                  <ChevronRight className="h-4 w-4 text-neutral-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
