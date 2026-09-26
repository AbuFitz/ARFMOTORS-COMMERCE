"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Mail, Store, Wrench, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const order = new URLSearchParams(window.location.search).get("order");
    if (order) setOrderNumber(order.toUpperCase());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `Order status request for order ${orderNumber}`,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(`Something went wrong. Please email us at ${SITE_CONFIG.emails.support}.`);
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">Track Your Order</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Where to find your tracking details, wherever you ordered
            </p>
          </motion.div>
        </div>
      </section>

      {/* Where to track */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 rounded-2xl p-6">
              <Mail className="h-8 w-8 text-primary-500 mb-4" />
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">Ordered on our website</h2>
              <p className="text-sm text-neutral-600">
                Your tracking number and courier link are emailed as soon as your order is dispatched.
                Check your inbox (and spam folder) for an email from ARF Commerce.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <Store className="h-8 w-8 text-primary-500 mb-4" />
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">Ordered on eBay</h2>
              <p className="text-sm text-neutral-600 mb-3">
                eBay orders are tracked in your eBay purchase history, and you can message us there too.
              </p>
              <a
                href="https://www.ebay.co.uk/mye/myebay/purchase"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:underline"
              >
                eBay purchase history
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-6">
              <Wrench className="h-8 w-8 text-primary-500 mb-4" />
              <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">Fitting booked</h2>
              <p className="text-sm text-neutral-600">
                If you added fitting, FixNow Mechanics will contact you within 24 hours of your order to
                confirm the price and book a time once your order arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status request form */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="bg-neutral-50 rounded-2xl p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
              Can&apos;t find your tracking?
            </h2>
            <p className="text-neutral-600 mb-6">
              Send us your order number and we&apos;ll reply with an update, usually within a few hours.
            </p>

            {sent ? (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm">
                  Thanks. We&apos;ve received your request for order <strong>{orderNumber}</strong> and
                  will email you at {email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-bold text-neutral-900 mb-2">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    className={`${inputClass} font-mono`}
                    placeholder="ARF-XXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-neutral-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-neutral-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="The email used when ordering"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-neutral-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-500 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Request Order Update"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
