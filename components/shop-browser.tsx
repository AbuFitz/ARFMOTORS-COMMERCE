"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Loader2, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { filterProducts, getActiveCategories, getCategory } from "@/lib/products";
import { ProductCategory, ProductFilter, ProductSort } from "@/types/product";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function filtersFromParams(params: URLSearchParams, lockedCategory?: ProductCategory): ProductFilter {
  const sort = params.get("sort") as ProductSort | null;
  return {
    category: lockedCategory,
    search: params.get("search") || "",
    fittingOnly: params.get("fitting") === "1",
    featuredOnly: params.get("featured") === "1",
    inStockOnly: params.get("stock") === "1",
    sort: sort && SORT_OPTIONS.some((o) => o.value === sort) ? sort : "featured",
    minPrice: undefined,
    maxPrice: undefined,
  };
}

interface ShopBrowserProps {
  /** Category pages pass their category; the main shop leaves it unset. */
  lockedCategory?: ProductCategory;
  /** Short intro shown under the heading on category pages. */
  intro?: string;
}

function ShopContent({ lockedCategory, intro }: ShopBrowserProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categories = getActiveCategories();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilter>(() => filtersFromParams(searchParams, lockedCategory));

  // Follow the URL when the customer uses the header links or back button
  useEffect(() => {
    setFilters(filtersFromParams(searchParams, lockedCategory));
  }, [searchParams, lockedCategory]);

  const products = useMemo(() => filterProducts(filters), [filters]);
  const category = getCategory(filters.category);

  const update = (patch: Partial<ProductFilter>) => setFilters((prev) => ({ ...prev, ...patch }));

  const clearFilters = () => {
    setFilters(filtersFromParams(new URLSearchParams(), lockedCategory));
    router.replace(lockedCategory ? `/shop/${lockedCategory}` : "/shop", { scroll: false });
  };

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...(category ? [{ label: category.name, onRemove: () => router.push("/shop") }] : []),
    ...(filters.featuredOnly ? [{ label: "Featured", onRemove: () => update({ featuredOnly: false }) }] : []),
    ...(filters.fittingOnly ? [{ label: "Fitting available", onRemove: () => update({ fittingOnly: false }) }] : []),
    ...(filters.inStockOnly ? [{ label: "UK stock", onRemove: () => update({ inStockOnly: false }) }] : []),
    ...(filters.minPrice !== undefined ? [{ label: `From £${filters.minPrice}`, onRemove: () => update({ minPrice: undefined }) }] : []),
    ...(filters.maxPrice !== undefined ? [{ label: `Up to £${filters.maxPrice}`, onRemove: () => update({ maxPrice: undefined }) }] : []),
  ];

  const title = category
    ? category.name
    : filters.sort === "newest" && !filters.search
    ? "New arrivals"
    : filters.featuredOnly
    ? "Featured products"
    : "Shop all products";

  const checkbox = (label: string, checked: boolean | undefined, onChange: (v: boolean) => void) => (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-neutral-700">
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
      />
      {label}
    </label>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <nav className="mb-2 text-xs text-neutral-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-neutral-900">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/shop" className="hover:text-neutral-900">Shop</Link>
          {category && (
            <>
              <span className="mx-1.5">/</span>
              <span className="text-neutral-900">{category.name}</span>
            </>
          )}
        </nav>
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">{title}</h1>
          <p className="text-sm text-neutral-600">
            {category?.description ? `${category.description} · ` : ""}
            {filters.search
              ? `${products.length} result${products.length !== 1 ? "s" : ""} for "${filters.search}"`
              : `${products.length} product${products.length !== 1 ? "s" : ""}`}
          </p>
          {intro && <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-neutral-700">{intro}</p>}
        </div>

        {/* Category pills */}
        <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:px-0">
          <Link
            href="/shop"
            className={cn(
              "flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              !filters.category ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
            )}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${c.id}`}
              className={cn(
                "flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filters.category === c.id
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="search"
              placeholder={category ? `Search ${category.name.toLowerCase()}` : "Search this store"}
              value={filters.search || ""}
              onChange={(e) => update({ search: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 py-2.5 pl-10 pr-4 text-sm focus:border-neutral-900 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <label className="sr-only" htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as ProductSort })}
              className="flex-1 sm:flex-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm focus:border-neutral-900 focus:outline-none focus:ring-0"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <span key={chip.label} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
                {chip.label}
                <button onClick={chip.onRemove} aria-label={`Remove ${chip.label} filter`}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-xs font-medium text-neutral-500 underline hover:text-neutral-900">
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters */}
          <aside className={cn("lg:w-56 flex-shrink-0 space-y-6", !showFilters && "hidden lg:block")}>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Availability</p>
              <div className="space-y-2.5">
                {checkbox("UK stock only", filters.inStockOnly, (v) => update({ inStockOnly: v }))}
                {checkbox("Featured", filters.featuredOnly, (v) => update({ featuredOnly: v }))}
                {checkbox("Fitting available", filters.fittingOnly, (v) => update({ fittingOnly: v }))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Price</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  placeholder="Min £"
                  aria-label="Minimum price"
                  value={filters.minPrice ?? ""}
                  onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-neutral-400">to</span>
                <input
                  type="number"
                  min={0}
                  placeholder="Max £"
                  aria-label="Maximum price"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 py-16 text-center">
                <Search className="mx-auto mb-3 h-10 w-10 text-neutral-300" />
                <p className="font-semibold text-neutral-800">No products match these filters</p>
                <p className="mt-1 text-sm text-neutral-500">Try a different search or clear your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-sm font-semibold text-primary-500 hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopBrowser(props: ShopBrowserProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      }
    >
      <ShopContent {...props} />
    </Suspense>
  );
}
