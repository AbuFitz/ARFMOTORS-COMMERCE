"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, X, Loader2, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { filterProducts, getAllProducts, BMW_MODELS, CATEGORIES } from "@/lib/products";
import { Product, ProductFilter } from "@/types/product";
import { cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || undefined;
  const initialSearch = searchParams.get("search") || "";
  const initialModel = searchParams.get("model") || undefined;

  const allProducts = useMemo<Product[]>(() => getAllProducts(), []);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilter>({
    category: initialCategory as ProductFilter["category"],
    bmwModel: initialModel,
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: false,
    fittingOnly: searchParams.get("fitting") === "1",
    search: initialSearch,
  });

  const filteredProducts = useMemo(
    () => filterProducts(filters, allProducts),
    [filters, allProducts]
  );

  const updateFilter = (key: keyof ProductFilter, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      bmwModel: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
      fittingOnly: false,
      search: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== false && v !== ""
  ).length;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-2 sm:mb-4">
            Shop BMW Parts
          </h1>
          <p className="text-base sm:text-lg text-neutral-600">
            {filters.search
              ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} for "${filters.search}"`
              : `${filteredProducts.length} products available`}
          </p>
        </div>

        {/* Top Search Bar — always visible */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search parts, e.g. carbon fibre, F30 spoiler…"
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-12 pr-12 py-3 sm:py-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm sm:text-base shadow-sm"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Active model / category chips */}
        {(filters.bmwModel || filters.category) && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {filters.bmwModel && (
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-sm px-3 py-1.5 rounded-full">
                {filters.bmwModel.replace("-", " ")}
                <button onClick={() => updateFilter("bmwModel", undefined)} aria-label="Remove model filter">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-sm px-3 py-1.5 rounded-full capitalize">
                {filters.category.replace("-", " ")}
                <button onClick={() => updateFilter("category", undefined)} aria-label="Remove category filter">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between bg-neutral-100 px-4 py-3 rounded-lg mb-4"
            >
              <span className="flex items-center gap-2 font-medium">
                <Filter className="h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </span>
              <X className={cn("h-5 w-5 transition-transform", showFilters && "rotate-180")} />
            </button>

            {/* Filters */}
            <div className={cn("space-y-6", !showFilters && "hidden lg:block")}>
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || ""}
                  onChange={(e) => updateFilter("category", e.target.value || undefined)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* BMW Model */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  BMW Model
                </label>
                <select
                  value={filters.bmwModel || ""}
                  onChange={(e) => updateFilter("bmwModel", e.target.value || undefined)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Models</option>
                  {BMW_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* In Stock Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    UK Stock Only
                  </span>
                </label>
              </div>

              {/* FixNow fitting */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.fittingOnly}
                    onChange={(e) => updateFilter("fittingOnly", e.target.checked)}
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    FixNow Fitting Available
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                {filters.search ? (
                  <>
                    <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-700 text-lg font-semibold mb-1">
                      No results for "{filters.search}"
                    </p>
                    <p className="text-neutral-500 mb-4 text-sm">
                      Try a different term or browse all parts below.
                    </p>
                  </>
                ) : (
                  <p className="text-neutral-600 text-lg mb-4">
                    No products found matching your filters.
                  </p>
                )}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-primary-500 font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
