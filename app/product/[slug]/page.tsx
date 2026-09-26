"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Wrench,
  Truck,
  Shield,
  Check,
  ChevronRight,
  Package,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Link2,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { PostcodeChecker } from "@/components/postcode-checker";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { getCategoryName, getProductBySlug, getProductsByCategory } from "@/lib/products";
import { SITE_CONFIG, getEbayListingUrl } from "@/lib/site-config";

type TabType = "description" | "compatibility" | "delivery" | "fitting" | "returns";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [fittingRequested, setFittingRequested] = useState(false);
  const [postcodeChecked, setPostcodeChecked] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [fittingData, setFittingData] = useState<{ postcode?: string; available?: boolean }>({});

  // Show sticky Add to Cart button on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => setShowStickyButton(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Product not found</h1>
          <p className="text-neutral-600 mb-4">It may have sold out or been removed.</p>
          <Link href="/shop" className="font-semibold text-primary-500 hover:underline">
            Back to the shop
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = calculateDiscount(product.price, product.discountType, product.discountValue);
  const hasDiscount = product.discountType !== "none" && product.discountValue > 0;
  const ebayUrl = getEbayListingUrl(product);
  const categoryName = getCategoryName(product.category);
  const hasCompatibility = Boolean(product.compatibility?.length || product.compatibilityNotes?.length);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const addDisabled = fittingRequested && !postcodeChecked;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      discountedPrice: hasDiscount ? finalPrice : undefined,
      quantity,
      image: product.images[0],
      inStockUK: product.inStockUK,
      imported: product.imported,
      // Only carry fitting through when the postcode check passed
      fittingRequested: fittingRequested && fittingData.available === true,
      fittingPostcode: fittingData.available ? fittingData.postcode : undefined,
      fittingAvailable: fittingData.available,
    });
    router.push("/cart");
  };

  const tabs: { id: TabType; label: string; icon: typeof Package; show: boolean }[] = [
    { id: "description", label: "Description", icon: Package, show: true },
    { id: "compatibility", label: "Compatibility", icon: Link2, show: hasCompatibility },
    { id: "delivery", label: "Delivery", icon: Truck, show: true },
    { id: "fitting", label: "Fitting", icon: Wrench, show: product.fittingEligible },
    { id: "returns", label: "Returns & warranty", icon: Shield, show: true },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              { label: categoryName, href: `/shop?category=${product.category}` },
              { label: product.title, href: `/product/${product.slug}` },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
          <div>
            <ProductImageGallery
              images={product.images}
              title={product.title}
              badges={
                <>
                  {hasDiscount && (
                    <span className="inline-flex items-center rounded-full bg-primary-500 px-2.5 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm">
                      {product.discountType === "percentage"
                        ? `-${product.discountValue}%`
                        : `Save ${formatPrice(product.discountValue)}`}
                    </span>
                  )}
                </>
              }
            />
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-xs sm:text-sm font-medium uppercase tracking-wide text-neutral-500 hover:text-neutral-900"
              >
                {categoryName}
              </Link>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
                {product.title}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">{formatPrice(finalPrice)}</span>
              {hasDiscount && <span className="text-lg text-neutral-500 line-through">{formatPrice(product.price)}</span>}
            </div>

            <p className="text-base text-neutral-600 leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 font-medium text-neutral-800">
                <span className={cn("h-2 w-2 rounded-full", product.inStockUK ? "bg-green-500" : "bg-amber-500")} />
                {product.inStockUK ? "In stock — ships from the UK" : "Ships from our supplier"}
              </span>
              <span className="inline-flex items-center gap-2 text-neutral-600">
                <Truck className="h-4 w-4" />
                Delivery: {product.deliveryEstimate}
              </span>
            </div>

            {product.compatibility && product.compatibility.length > 0 && (
              <div className="rounded-lg bg-neutral-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Works with</p>
                <ul className="text-sm text-neutral-800 space-y-0.5">
                  {product.compatibility.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optional fitting */}
            {product.fittingEligible && (
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start gap-3">
                  <Wrench className="h-5 w-5 text-neutral-700 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">Professional fitting available</p>
                    <p className="mt-0.5 text-sm text-neutral-600">
                      This product can be professionally installed by our fitting partner, {SITE_CONFIG.fitting.partner}
                      {product.fittingFrom ? ` — fitting from ${formatPrice(product.fittingFrom)}` : ""}. The price is
                      confirmed with you before anything is booked, and paid separately.{" "}
                      <Link href="/installation" className="underline underline-offset-2 hover:text-neutral-900">
                        How it works
                      </Link>
                    </p>
                    <label className="mt-3 flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fittingRequested}
                        onChange={(e) => {
                          setFittingRequested(e.target.checked);
                          if (!e.target.checked) {
                            setPostcodeChecked(false);
                            setFittingData({});
                          }
                        }}
                        className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                      />
                      <span className="text-sm font-semibold text-neutral-900">Add fitting</span>
                    </label>
                    {fittingRequested && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <p className="text-sm font-medium text-neutral-900 mb-2">Check fitting is available at your postcode</p>
                        <PostcodeChecker
                          onResult={(result) => {
                            setFittingData({ postcode: result.postcode, available: result.isAvailable });
                            setPostcodeChecked(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity + add to cart */}
            <div className="flex gap-3">
              <div className="flex items-center rounded-lg border border-neutral-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-11 items-center justify-center text-neutral-700 hover:bg-neutral-50 rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold" aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  className="flex h-12 w-11 items-center justify-center text-neutral-700 hover:bg-neutral-50 rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <motion.button
                whileTap={!addDisabled ? { scale: 0.98 } : {}}
                onClick={handleAddToCart}
                disabled={addDisabled}
                className="flex-1 h-12 rounded-lg bg-primary-500 px-4 font-semibold text-white hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to cart · {formatPrice(finalPrice * quantity)}
              </motion.button>
            </div>
            {addDisabled && (
              <p className="-mt-2 text-sm text-amber-700">Check your postcode to add fitting, or untick &quot;Add fitting&quot;.</p>
            )}

            <ul className="grid gap-2 border-t border-neutral-200 pt-4 text-sm text-neutral-600 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neutral-500" /> Secure checkout with Stripe
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-neutral-500" /> 14-day returns
              </li>
            </ul>

            {ebayUrl && (
              <p className="text-xs text-neutral-500">
                Also listed on our{" "}
                <a href={ebayUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-neutral-800">
                  eBay store <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Details tabs */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-neutral-200 mb-6">
            <div className="-mb-px flex gap-6 overflow-x-auto scrollbar-hide">
              {tabs
                .filter((t) => t.show)
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "border-primary-500 text-neutral-900"
                        : "border-transparent text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>

          <div className="max-w-3xl text-neutral-700">
            {activeTab === "description" && (
              <div className="space-y-5">
                <p className="leading-relaxed">{product.longDescription || product.description}</p>
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Key features</h3>
                    <ul className="space-y-1.5">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Specifications</h3>
                    <dl className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-2.5 text-sm">
                          <dt className="text-neutral-500">{key}</dt>
                          <dd className="text-neutral-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === "compatibility" && (
              <div className="space-y-4">
                {product.compatibility && product.compatibility.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Works with</h3>
                    <ul className="flex flex-wrap gap-2">
                      {product.compatibility.map((c) => (
                        <li key={c} className="rounded-full bg-neutral-100 px-3 py-1 text-sm">{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.compatibilityNotes && product.compatibilityNotes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Before you buy</h3>
                    <ul className="space-y-1.5">
                      {product.compatibilityNotes.map((note) => (
                        <li key={note} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-1" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-sm text-neutral-500">
                  Not sure it&apos;s right for you?{" "}
                  <Link href="/contact" className="underline">Ask us before you order</Link>.
                </p>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-3">
                <p>
                  <strong className="text-neutral-900">Estimated delivery: {product.deliveryEstimate}.</strong>{" "}
                  {product.inStockUK
                    ? "This product is held in UK stock."
                    : "This product ships from our supplier, so it takes a little longer to arrive."}
                </p>
                <p className="text-sm text-neutral-600">
                  We deliver to UK addresses only. You&apos;ll get an email with tracking once your order is dispatched.
                </p>
              </div>
            )}

            {activeTab === "fitting" && product.fittingEligible && (
              <div className="space-y-4">
                <p>
                  This product is eligible for professional fitting by our partner, {SITE_CONFIG.fitting.partner}, across{" "}
                  {SITE_CONFIG.fitting.coverage}.
                  {product.fittingFrom ? ` Fitting starts from ${formatPrice(product.fittingFrom)}.` : ""} Tick
                  &quot;Add fitting&quot; above and they&apos;ll contact you after your order to confirm the price and book a
                  time.
                </p>
                <Link href="/installation" className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500">
                  Read more about installation <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="space-y-3">
                {product.warranty && <p className="font-medium text-neutral-900">{product.warranty}</p>}
                <p>
                  You can return most unused items within 14 days of delivery, and your rights under UK consumer law
                  always apply if something is faulty. See our{" "}
                  <Link href="/returns" className="underline">returns policy</Link> and{" "}
                  <Link href="/warranty" className="underline">warranty information</Link>.
                </p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12 sm:mt-16 border-t border-neutral-200 pt-8">
            <div className="mb-5 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold text-neutral-900">More in {categoryName}</h2>
              <Link href={`/shop?category=${product.category}`} className="text-sm font-semibold text-neutral-900 hover:text-primary-500">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Add to Cart - mobile */}
      {showStickyButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t border-neutral-200 px-4 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-500 line-clamp-1">{product.title}</p>
              <p className="text-lg font-bold text-neutral-900">{formatPrice(finalPrice * quantity)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addDisabled}
              className="flex-1 h-12 rounded-lg bg-primary-500 font-semibold text-white flex items-center justify-center gap-2 disabled:bg-neutral-300"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to cart
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
