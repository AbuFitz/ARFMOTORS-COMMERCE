"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight, Heart, Menu, Package, Search, ShoppingCart, Wrench, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { getActiveCategories } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useDrawerStore } from "@/lib/drawer-store";

const LINKS = [
  { name: "Installation", href: "/installation" },
  { name: "Guides", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Help", href: "/support" },
];

function SearchForm({ onDone, autoFocus = false, className }: { onDone?: () => void; autoFocus?: boolean; className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        router.push(`/shop?search=${encodeURIComponent(q)}`);
        setQuery("");
        onDone?.();
      }}
    >
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        autoFocus={autoFocus}
        className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-0"
      />
    </form>
  );
}

function CountDot({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <span className={cn("absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-bold text-white", className)}>
      {count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.getTotalItems());
  const cartItems = hydrated ? cartCount : 0;
  const wishlistItems = hydrated ? wishlistCount : 0;
  const categories = getActiveCategories();
  const openDrawer = useDrawerStore((s) => s.openDrawer);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>();
  const hoverOpenedAt = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(64);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const shopActive = pathname === "/shop" || pathname.startsWith("/shop/") || pathname.startsWith("/product/") || pathname === "/categories";

  // Close everything when the page changes
  useEffect(() => {
    setDrawerOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Escape closes any open panel; the drawer locks page scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDrawerOpen(false);
        setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  useEffect(() => () => clearTimeout(megaTimer.current), []);
  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMegaOpen((was) => {
      if (!was) hoverOpenedAt.current = Date.now();
      return true;
    });
  };
  // A click straight after hovering shouldn't close the menu the hover just opened
  const clickMega = () => {
    if (Date.now() - hoverOpenedAt.current < 600) return setMegaOpen(true);
    setMegaOpen((v) => !v);
  };
  const closeMegaSoon = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[76px] lg:gap-8 lg:px-8">
          {/* Logo */}
          <Link href="/" aria-label="ARF Commerce home" className="flex-shrink-0">
            <Image src="/logo.png" alt="ARF Commerce" width={1484} height={559} priority sizes="200px" className="h-9 w-auto lg:h-11" />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden h-full items-center gap-1 lg:flex">
            <div className="relative flex h-full items-center" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
              <button
                type="button"
                onClick={clickMega}
                aria-expanded={megaOpen}
                aria-controls="shop-menu"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  megaOpen || shopActive ? "bg-neutral-900 text-white" : "text-neutral-900 hover:bg-neutral-100"
                )}
              >
                Shop
                <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} />
              </button>
            </div>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(l.href) ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <SearchForm className="hidden w-56 lg:block xl:w-72" />
            <button
              type="button"
              onClick={() => openDrawer("wishlist")}
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              <Heart className="h-5 w-5" />
              <CountDot count={wishlistItems} />
            </button>
            <button
              type="button"
              onClick={() => openDrawer("cart")}
              aria-label="Cart"
              className="relative flex h-10 items-center gap-2 rounded-full px-2.5 text-neutral-800 transition-colors hover:bg-neutral-100 lg:bg-neutral-900 lg:px-4 lg:text-white lg:hover:bg-neutral-800"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden text-sm font-semibold lg:inline">Cart</span>
              <CountDot count={cartItems} className="right-0 lg:static lg:h-5 lg:min-w-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (headerRef.current) setMenuTop(Math.round(headerRef.current.getBoundingClientRect().bottom));
                setDrawerOpen((v) => !v);
              }}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-100 lg:hidden"
            >
              {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop shop menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="shop-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              className="absolute inset-x-0 top-full hidden border-b border-neutral-200 bg-white shadow-xl lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-[1fr_260px] gap-8 px-8 py-8">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((c) => (
                    <Link key={c.id} href={`/shop/${c.id}`} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900">
                        <Image src={c.image} alt="" fill sizes="240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="mt-2.5 text-sm font-semibold text-neutral-900 group-hover:text-primary-600">{c.name}</p>
                      <p className="line-clamp-1 text-xs text-neutral-500">{c.description}</p>
                    </Link>
                  ))}
                </div>
                <div className="border-l border-neutral-200 pl-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Browse</p>
                  <ul className="mt-3 space-y-1">
                    {[
                      { name: "All products", href: "/shop", icon: Package },
                      { name: "Featured products", href: "/shop?featured=1", icon: ChevronRight },
                      { name: "Fitting available", href: "/shop?fitting=1", icon: Wrench },
                    ].map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setMegaOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50">
                          <l.icon className="h-4 w-4 text-primary-500" />
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/shop" onClick={() => setMegaOpen(false)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
                    Shop all products <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu: opens below the header, so the header's logo and icons stay in view */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{ top: menuTop }}
            className="fixed inset-x-0 bottom-0 z-[49] flex flex-col overflow-y-auto overscroll-contain bg-white lg:hidden"
          >
            <div className="flex-1 px-4 pb-8 pt-4 sm:px-6">
              <SearchForm onDone={() => setDrawerOpen(false)} />

              <p className="mt-7 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">Shop</p>
              <ul className="mt-2">
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setDrawerOpen(false)}
                    className={cn("flex items-center justify-between rounded-xl px-3 py-3.5 text-lg font-semibold", pathname === "/shop" ? "bg-neutral-100 text-neutral-900" : "text-neutral-900")}
                  >
                    Shop all products
                    <ArrowRight className="h-5 w-5 text-primary-500" />
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/shop/${c.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium",
                        isActive(`/shop/${c.id}`) ? "bg-neutral-100 text-neutral-900" : "text-neutral-800"
                      )}
                    >
                      {c.name}
                      <span className="flex items-center gap-2 text-sm text-neutral-400">
                        {c.count}
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px bg-neutral-100" />

              <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">ARF Commerce</p>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {[...LINKS, { name: "Track an order", href: "/track-order" }, { name: "Contact", href: "/contact" }].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "block rounded-xl border px-3.5 py-3 text-sm font-medium transition-colors",
                        isActive(l.href) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-800 hover:border-neutral-400"
                      )}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-4 text-sm text-neutral-600 sm:px-6">
              Questions? Email{" "}
              <a href={`mailto:${SITE_CONFIG.emails.support}`} className="font-medium text-neutral-900 underline underline-offset-2">
                {SITE_CONFIG.emails.support}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
