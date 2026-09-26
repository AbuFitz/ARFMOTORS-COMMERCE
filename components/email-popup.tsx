"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Copy, Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import { POPUP_CONFIG as cfg } from "@/lib/site-config";

type Step = "capture" | "success";

export function EmailPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState<Step>("capture");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!cfg.enabled) return;
    const subscribedAt = localStorage.getItem("newsletter-subscribed-at");
    const dismissedAt = localStorage.getItem("newsletter-popup-dismissed");

    if (subscribedAt) return;

    if (dismissedAt) {
      const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < cfg.dismiss_days) return;
    }

    const timer = setTimeout(() => setShowPopup(true), cfg.delay_seconds * 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowPopup(false);
    if (step !== "success") {
      localStorage.setItem("newsletter-popup-dismissed", String(Date.now()));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website-popup" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      localStorage.setItem("newsletter-subscribed-at", String(Date.now()));
      localStorage.removeItem("newsletter-popup-dismissed");
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cfg.discount_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
          role="dialog"
          aria-label={`Newsletter signup — get ${cfg.discount_percent}% off`}
        >
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl shadow-2xl overflow-hidden border-2 border-primary-500">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              {/* Icon & Heading */}
              <div className="flex items-start gap-4 mb-5">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-xl"
                >
                  <Gift className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">{cfg.heading}</h3>
                  <p className="text-sm text-neutral-300">
                    Get <strong className="text-primary-400">{cfg.discount_percent}% off</strong> your first order
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === "capture" ? (
                  <motion.div key="capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                      {error && <p className="text-xs text-red-400">{error}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-primary-600 transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="h-4 w-4 animate-spin" />Subscribing...</>
                        ) : (
                          <>{cfg.cta_text}<ArrowRight className="h-4 w-4" /></>
                        )}
                      </button>
                    </form>
                    <div className="mt-3 space-y-1 text-xs text-neutral-400">
                      <p>✓ {cfg.terms_text}</p>
                      <p>{cfg.footer_text}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
                    <p className="text-sm text-neutral-300 mb-3">{cfg.success_message}</p>
                    <div className="bg-neutral-950/50 rounded-lg p-4 mb-4 border border-primary-500/30">
                      <p className="text-xs text-primary-400 mb-2 font-medium">YOUR CODE:</p>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-2xl font-bold tracking-wider text-white">{cfg.discount_code}</p>
                        <button
                          onClick={handleCopyCode}
                          className="flex-shrink-0 inline-flex items-center gap-1.5 bg-primary-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-primary-600 transition-all"
                        >
                          {copied ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleDismiss}
                      className="w-full bg-primary-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-primary-600 transition-colors"
                    >
                      {cfg.success_cta}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
