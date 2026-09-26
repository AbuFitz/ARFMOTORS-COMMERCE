"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Search, Heart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Fitting", href: "/#fitting" },
  { name: "About", href: "/about" },
  { name: "Support", href: "/support" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.getTotalItems());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-display font-bold tracking-tighter text-neutral-900 group-hover:text-primary-500 transition-colors">
                ARF
              </span>
              <span className="text-2xl lg:text-3xl font-display font-bold tracking-tighter text-primary-500">
                MODS
              </span>
            </div>
            <div className="text-[9px] lg:text-[10px] font-mono font-medium text-neutral-600 tracking-[0.2em] uppercase -mt-1">
              BMW Performance
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-neutral-700 hover:text-primary-500 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="relative p-2">
            <Heart className="h-5 w-5 text-neutral-700" />
            {wishlistItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {wishlistItems}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-neutral-700" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="p-2 text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-500",
                pathname === item.href
                  ? "text-neutral-900 font-semibold"
                  : "text-neutral-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-neutral-700 hover:text-primary-500 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2">
            <Heart className="h-5 w-5 text-neutral-700 hover:text-primary-500 transition-colors" />
            {wishlistItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white"
              >
                {wishlistItems}
              </motion.span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-neutral-700 hover:text-primary-500 transition-colors" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neutral-200 bg-neutral-50"
          >
            <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for BMW parts, products, or categories..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-600 hover:text-primary-500 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
              <p className="text-xs text-neutral-600 mt-2">
                Try: "angel eyes", "carbon spoiler", "exhaust", "interior trim"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-200"
          >
            <div className="space-y-1 px-6 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
