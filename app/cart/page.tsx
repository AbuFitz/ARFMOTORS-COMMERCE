"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CartRecommendations } from "@/components/cart-recommendations";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getDiscountAmount,
    getTotalPrice,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
  } = useCartStore();

  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);

  const handleApplyCode = () => {
    const subtotal = getSubtotal();
    const MINIMUM_PURCHASE = 50;

    if (subtotal < MINIMUM_PURCHASE) {
      setCodeError(`Minimum order of £${MINIMUM_PURCHASE} required for discount codes`);
      setCodeSuccess(false);
      return;
    }

    const success = applyDiscountCode(codeInput);
    if (success) {
      setCodeSuccess(true);
      setCodeError("");
      setCodeInput("");
      setTimeout(() => setCodeSuccess(false), 3000);
    } else {
      setCodeError("Invalid discount code");
      setCodeSuccess(false);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Get full product objects for recommendations
  const cartProducts = items
    .map(item => getProductById(item.productId))
    .filter(Boolean) as any[];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-full mb-6">
            <ShoppingBag className="h-12 w-12 text-neutral-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-neutral-600 mb-8">
            Start shopping and add some premium BMW parts to your cart.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-600">{getTotalItems()} items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white border border-neutral-200 rounded-lg p-6"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-semibold text-neutral-900 hover:text-primary-500 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.inStockUK && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              UK Stock
                            </span>
                          )}
                          {item.installationRequested && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              FixNow Fitting Requested
                            </span>
                          )}
                        </div>
                        {item.installationRequested && item.installationPostcode && (
                          <p className="text-xs text-neutral-500 mt-1">
                            Fitting postcode: {item.installationPostcode}
                            {item.installationAvailable
                              ? " ✓ Available"
                              : " ✗ Not available"}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-neutral-900">
                          {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                        </p>
                        {item.discountedPrice && (
                          <p className="text-sm text-neutral-500 line-through">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Smart Recommendations - Moved here for better visibility */}
            {cartProducts.length > 0 && (
              <div className="mt-6">
                <CartRecommendations cartProducts={cartProducts} />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-6">
                Order Summary
              </h2>

              {/* Discount Code Input */}
              <div className="mb-6">
                {!discountCode ? (
                  <div>
                    <label htmlFor="discount-code" className="block text-sm font-medium text-neutral-900 mb-2">
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="discount-code"
                        value={codeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value.toUpperCase());
                          setCodeError("");
                        }}
                        placeholder="WELCOME10"
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={handleApplyCode}
                        className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors text-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {codeError && (
                      <p className="text-red-500 text-xs mt-1">{codeError}</p>
                    )}
                    {codeSuccess && (
                      <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                        ✓ Discount code applied!
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">{discountCode}</span>
                      </div>
                      <button
                        onClick={removeDiscountCode}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium text-neutral-900">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                {discountCode && getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount ({discountCode})</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(getDiscountAmount())}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium text-neutral-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-neutral-300 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-900">Total</span>
                  <span className="font-bold text-2xl text-neutral-900">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                {discountCode && getDiscountAmount() > 0 && (
                  <p className="text-xs text-green-600 mt-2 text-right">
                    You saved {formatPrice(getDiscountAmount())}!
                  </p>
                )}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-neutral-900 text-white py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>

              <Link
                href="/shop"
                className="block text-center text-sm text-primary-500 hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Additional info */}
              <div className="mt-6 pt-6 border-t border-neutral-300 space-y-3">
                <p className="text-xs text-neutral-600">
                  ✓ Secure checkout powered by Stripe
                </p>
                <p className="text-xs text-neutral-600">
                  ✓ FixNow fitting available on eligible parts
                </p>
                <p className="text-xs text-neutral-600">
                  ✓ Manufacturer warranty included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
