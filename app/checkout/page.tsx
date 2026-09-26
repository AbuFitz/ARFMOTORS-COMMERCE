"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CreditCard, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CheckoutProgress } from "@/components/checkout-progress";
import { formatPrice } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getSubtotal, getDiscountAmount, discountCode, discountPercentage } =
    useCartStore();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
  });

  const hydrated = useHydrated();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.push("/cart");
    }
  }, [hydrated, items.length, router]);

  if (!hydrated || items.length === 0) return null;

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotalPrice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "postcode" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerInfo: formData,
          discountCode: discountCode ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.sessionUrl) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Hosted Checkout
      window.location.href = data.sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder-neutral-400 text-sm";

  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <div className="min-h-screen bg-neutral-50 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 sm:mb-8 text-sm sm:text-base active:scale-95 transition-transform touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </button>

        {/* Progress Bar */}
        <div className="mb-8 sm:mb-12">
          <CheckoutProgress currentStep={2} />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-neutral-900 mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Lock className="h-4 w-4 text-green-600" />
            <span>Secure checkout powered by Stripe</span>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 className="font-semibold text-lg text-neutral-900 mb-4">Contact Information</h2>
                <div>
                  <label htmlFor="email" className={labelClass}>Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 className="font-semibold text-lg text-neutral-900 mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>First name *</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>Last name *</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className={labelClass}>Address *</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 High Street"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className={labelClass}>City *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className={labelClass}>Postcode *</label>
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="SW1A 1AA"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7700 000000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment info */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 className="font-semibold text-lg text-neutral-900 mb-4">Payment</h2>
                <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <CreditCard className="h-6 w-6 text-neutral-600" />
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 text-sm">Stripe Secure Checkout</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      You'll be redirected to Stripe to complete payment securely.
                      Card details never touch our servers.
                    </p>
                  </div>
                  <Lock className="h-5 w-5 text-green-600 flex-shrink-0" />
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  256-bit SSL encryption
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                  PCI-DSS compliant
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                  All major cards accepted
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: isProcessing ? 1 : 1.01 }}
                whileTap={{ scale: isProcessing ? 1 : 0.99 }}
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pay {formatPrice(total)} securely
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-neutral-500">
                By placing your order you agree to our{" "}
                <Link href="/terms" className="underline hover:text-neutral-700">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="underline hover:text-neutral-700">Privacy Policy</Link>
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 sticky top-24">
              <h2 className="font-semibold text-lg text-neutral-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">Qty: {item.quantity}</p>
                      {item.installationRequested && (
                        <p className="text-xs text-blue-600 mt-0.5">+ FixNow fitting</p>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 flex-shrink-0">
                      {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-neutral-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                </div>

                {discountCode && discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600">
                      Discount ({discountCode})
                    </span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium text-neutral-900">Free</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-neutral-900 text-lg">Total</span>
                <span className="font-bold text-2xl text-neutral-900">{formatPrice(total)}</span>
              </div>

              {discountPercentage > 0 && (
                <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                  You save {formatPrice(discountAmount)} with {discountCode}!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
