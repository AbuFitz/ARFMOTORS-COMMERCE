"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Search, Heart, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { getActiveCategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Secondary links, shown on the right of the desktop nav and in the menu
const infoNav = [
  { name: "Installation", href: "/installation" },
  { name: "Guides", href: "/blog" },
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
  const shopNav = [{ name: "Shop all", href: "/shop" }, ...categories.map((c) => ({ name: c.name, href: `/shop/${c.id}` }))];

  const isActive = (href: string) => !href.includes("?") && pathname === href;

  // Close the menu and search whenever the page changes (links, back button, search)
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  // While the menu is open: Escape closes it and the page behind doesn't scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileSearchOpen(false);
    setMobileMenuOpen((v) => !v);
  };
  const toggleSearch = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen((v) => !v);
  };

  return (
    <>
    {/* Tap outside the menu to close it */}
    {mobileMenuOpen && (
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setMobileMenuOpen(false)}
        className="lg:hidden fixed inset-0 z-[45] bg-neutral-950/40"
      />
    )}

    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Main row */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px]">
        <Link href="/" className="flex-shrink-0" aria-label="ARF Commerce home">
          <Image
            src="/logo.png"
            alt="ARF Commerce"
            width={1484}
            height={559}
            priority
            sizes="200px"
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
            onClick={toggleSearch}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
            aria-label={mobileSearchOpen ? "Close search" : "Search"}
            aria-expanded={mobileSearchOpen}
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
            className="lg:hidden p-2 text-neutral-700"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop navigation row: shop links left, information right */}
      <nav className="hidden lg:block border-t border-neutral-100" aria-label="Main">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 h-11">
          <div className="flex items-center gap-5 xl:gap-7">
            {shopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap text-sm font-semibold transition-colors hover:text-neutral-900",
                  isActive(item.href) ? "text-neutral-900" : "text-neutral-700",
                  isActive(item.href) &&
                    "after:absolute after:-bottom-[13px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-500"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 xl:gap-6">
            {infoNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm transition-colors hover:text-neutral-900",
                  isActive(item.href) ? "font-medium text-neutral-900" : "text-neutral-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
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
            id="mobile-menu"
            className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-neutral-200 bg-white"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Shop</p>
                {[{ name: "Shop all", href: "/shop" }].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium hover:bg-neutral-50",
                      isActive(item.href) ? "bg-neutral-50 text-neutral-900" : "text-neutral-800"
                    )}
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 text-neutral-300" />
                  </Link>
                ))}
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop/${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-neutral-50",
                      isActive(`/shop/${c.id}`) ? "bg-neutral-50 font-medium text-neutral-900" : "text-neutral-600"
                    )}
                  >
                    {c.name}
                    <span className="text-xs text-neutral-400">{c.count}</span>
                  </Link>
                ))}
              </div>
              <div>
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">ARF Commerce</p>
                {infoNav.map((item) => (
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
    </>
  );
}
