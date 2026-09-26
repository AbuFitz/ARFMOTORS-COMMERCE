"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Wrench,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  ChevronRight,
  Package,
  ExternalLink,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { PostcodeChecker } from "@/components/postcode-checker";
import { ToolsNeeded } from "@/components/tools-needed";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { getProductBySlug } from "@/lib/products";
import { SITE_CONFIG, getEbayListingUrl } from "@/lib/site-config";

type TabType = "description" | "fitment" | "delivery" | "installation" | "warranty";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [requestInstallation, setRequestInstallation] = useState(false);
  const [postcodeChecked, setPostcodeChecked] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [installationData, setInstallationData] = useState<{
    postcode?: string;
    available?: boolean;
  }>({});

  // Show sticky Add to Cart button on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Product not found</h1>
          <button
            onClick={() => router.push("/shop")}
            className="text-primary-500 hover:underline"
          >
            Return to shop
          </button>
        </div>
      </div>
    );
  }

  const finalPrice = calculateDiscount(
    product.price,
    product.discountType,
    product.discountValue
  );
  const hasDiscount = product.discountType !== "none" && product.discountValue > 0;
  const ebayUrl = getEbayListingUrl(product);

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
      installationRequested: requestInstallation,
      installationPostcode: installationData.postcode,
      installationAvailable: installationData.available,
    });
    router.push("/cart");
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "description", label: "Description", icon: Package },
    { id: "fitment", label: "Fitment", icon: Check },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "installation", label: "Fitting", icon: Wrench },
    { id: "warranty", label: "Warranty", icon: Shield },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              { label: product.category.replace("-", " "), href: `/shop?category=${product.category}` },
              { label: product.title, href: `/product/${product.slug}` },
            ]}
          />
        </div>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 sm:mb-8 text-sm sm:text-base active:scale-95 transition-transform touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Images — modern gallery with zoom/lightbox */}
          <div>
            <ProductImageGallery
              images={product.images}
              title={product.title}
              badges={
                <>
                  {product.inStockUK && (
                    <span className="inline-flex items-center rounded-full bg-green-500 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium text-white shadow-lg">
                      UK Stock
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="inline-flex items-center rounded-full bg-primary-500 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium text-white shadow-lg">
                      {product.discountType === "percentage"
                        ? `-${product.discountValue}%`
                        : `Save ${formatPrice(product.discountValue)}`}
                    </span>
                  )}
                </>
              }
            />
          </div>
          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category */}
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wide text-neutral-500">
              {product.category.replace("-", " ")}
            </p>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                {formatPrice(finalPrice)}
              </span>
              {hasDiscount && (
                <span className="text-lg sm:text-xl text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* BMW Models */}
            <div>
              <p className="text-sm font-semibold text-neutral-900 mb-2">Compatible Models:</p>
              <div className="flex flex-wrap gap-2">
                {product.bmwModels.map((model) => (
                  <span
                    key={model}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-sm font-medium text-neutral-700"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Truck className="h-5 w-5" />
              <span>Delivery: {product.deliveryEstimate}</span>
            </div>

            {/* Installation option */}
            {product.installationAvailable && (
              <div className="border border-neutral-200 rounded-lg p-4 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestInstallation}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRequestInstallation(checked);
                      if (!checked) {
                        setPostcodeChecked(false);
                        setInstallationData({});
                      }
                    }}
                    className="w-5 h-5 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-neutral-600" />
                    <span className="font-semibold text-neutral-900">
                      Add Fitting by {SITE_CONFIG.fitting.partner}
                    </span>
                  </div>
                </label>
                <p className="text-sm text-neutral-600 ml-8">
                  Mobile fitting at your home or work ({SITE_CONFIG.fitting.coverage}).
                  {product.fittingFrom
                    ? ` Fitting from ${formatPrice(product.fittingFrom)}, confirmed before any work is booked.`
                    : " We'll send you a fitting quote before any work is booked."}
                </p>

                {/* Show postcode checker when installation is requested */}
                {requestInstallation && (
                  <div className="ml-8 pt-4 border-t border-neutral-200">
                    <p className="text-sm font-semibold text-neutral-900 mb-3">
                      Check installation availability at your location:
                    </p>
                    <PostcodeChecker
                      onResult={(result) => {
                        setInstallationData({
                          postcode: result.postcode,
                          available: result.isAvailable,
                        });
                        setPostcodeChecked(true);
                      }}
                    />
                    {postcodeChecked && installationData.available === false && (
                      <p className="text-sm text-amber-600 mt-3">
                        Installation is not available in your area, but you can still order the product for self-installation.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div>
              <motion.button
                whileHover={!requestInstallation || postcodeChecked ? { scale: 1.02 } : {}}
                whileTap={!requestInstallation || postcodeChecked ? { scale: 0.98 } : {}}
                onClick={handleAddToCart}
                disabled={requestInstallation && !postcodeChecked}
                className="w-full bg-neutral-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-500 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - {formatPrice(finalPrice * quantity)}
              </motion.button>
              {requestInstallation && !postcodeChecked && (
                <p className="text-sm text-amber-600 mt-2 text-center">
                  Please check installation availability before adding to cart
                </p>
              )}
            </div>

            {/* Also on eBay */}
            {ebayUrl && (
              <a
                href={ebayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-neutral-200 rounded-lg px-4 py-3 hover:border-neutral-400 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Prefer to buy on eBay?</p>
                  <p className="text-xs text-neutral-600">
                    This part is also listed on our eBay store.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 whitespace-nowrap">
                  View on eBay
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          {/* Tab navigation */}
          <div className="border-b border-neutral-200 mb-8">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-500"
                        : "border-transparent text-neutral-600 hover:text-neutral-900"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="max-w-3xl">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                  {product.longDescription || product.description}
                </p>
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Features:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.specifications && (
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-3">Specifications:</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-neutral-500">{key}</dt>
                          <dd className="text-neutral-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === "fitment" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Fitment Information</h3>
                <p className="text-neutral-700">
                  This part is compatible with the following BMW models:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.bmwModels.map((model) => (
                    <span
                      key={model}
                      className="px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium"
                    >
                      {model}
                    </span>
                  ))}
                </div>
                {product.fitmentNotes && product.fitmentNotes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-neutral-900 mb-2">Important Notes:</h4>
                    <ul className="space-y-2">
                      {product.fitmentNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Delivery Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900">
                        {product.inStockUK ? "UK Stock" : "Imported"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Estimated delivery: {product.deliveryEstimate}
                      </p>
                    </div>
                  </div>
                  {product.inStockUK ? (
                    <p className="text-neutral-700">
                      This item is in stock at our UK warehouse and will be dispatched within 1
                      working day. Most UK deliveries arrive within 1-3 days.
                    </p>
                  ) : (
                    <p className="text-neutral-700">
                      This item is imported from our verified suppliers. Delivery typically takes
                      10-14 days from order confirmation.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "installation" && (
              <div className="space-y-6">
                <h3 className="font-semibold text-neutral-900">Fitting by {SITE_CONFIG.fitting.partner}</h3>
                {product.installationAvailable ? (
                  <>
                    <p className="text-neutral-700">
                      This part is eligible for mobile fitting by FixNow Mechanics, our fitting
                      partner.
                      {product.fittingFrom ? ` Fitting starts from ${formatPrice(product.fittingFrom)}.` : ""}{" "}
                      Check if we cover your location:
                    </p>
                    <PostcodeChecker
                      onResult={(result) => {
                        setInstallationData({
                          postcode: result.postcode,
                          available: result.isAvailable,
                        });
                      }}
                    />
                  </>
                ) : (
                  <p className="text-neutral-700">
                    This part is designed for DIY fitting and isn&apos;t part of our FixNow
                    fitting service. If you need help, please contact us.
                  </p>
                )}
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">Warranty & Returns</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900">
                        {product.warranty || "Manufacturer warranty applies"}
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-700">
                    All products come with manufacturer warranty. For detailed warranty and returns
                    information, please see our{" "}
                    <a href="/warranty" className="text-primary-500 hover:underline">
                      warranty policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tools Needed - Amazon Affiliate */}
        <div className="mt-12 sm:mt-16">
          <ToolsNeeded category={product.category} />
        </div>
      </div>

      {/* Sticky Add to Cart Button - Mobile Only */}
      {showStickyButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t border-neutral-200 p-4 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-neutral-600">Total</p>
              <p className="text-lg font-bold text-neutral-900">
                {formatPrice(finalPrice * quantity)}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={requestInstallation && !postcodeChecked}
              className="flex-1 bg-neutral-900 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-400 disabled:cursor-not-allowed min-h-[52px] touch-manipulation"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
