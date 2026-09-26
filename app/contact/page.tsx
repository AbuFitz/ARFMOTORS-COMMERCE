"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Clock, HelpCircle, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const inputClass =
  "w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900 focus:ring-0 transition-colors";
const labelClass = "block text-sm font-semibold text-neutral-900 mb-1.5";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", orderNumber: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      setFormData({ name: "", email: "", orderNumber: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Contact us</h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          Questions about a product, an order or fitting? Send us a message.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-5 text-sm">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-900">Email</p>
                <a href={`mailto:${SITE_CONFIG.emails.info}`} className="text-neutral-700 hover:underline">
                  {SITE_CONFIG.emails.info}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-primary-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-900">Response time</p>
                <p className="text-neutral-700">We aim to reply within 24 hours on working days.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <HelpCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-900">Quick answers</p>
                <p className="text-neutral-700">
                  Delivery, returns and fitting questions are covered in our{" "}
                  <Link href="/support" className="underline">help centre</Link>.
                </p>
              </div>
            </div>
          </aside>

          <div className="rounded-2xl border border-neutral-200 p-5 sm:p-8">
            {submitted ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900">Thanks — your message has been sent.</p>
                  <p className="mt-1 text-sm text-neutral-600">We&apos;ve emailed you a copy and will reply within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold underline">
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name *</label>
                    <input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="orderNumber" className={labelClass}>
                    Order number <span className="font-normal text-neutral-500">(if you have one)</span>
                  </label>
                  <input
                    id="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value.toUpperCase() })}
                    className={`${inputClass} font-mono`}
                    placeholder="ARF-XXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea
                    id="message"
                    required
                    minLength={10}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="How can we help?"
                  />
                </div>
                {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-neutral-900 py-3 font-semibold text-white hover:bg-neutral-800 transition-colors disabled:bg-neutral-400"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
