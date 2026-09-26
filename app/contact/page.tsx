"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    carModel: "",
    postcode: "",
    message: "",
  });

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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          bmwModel: formData.carModel,
          postcode: formData.postcode,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSubmitted(true);
      setFormData({ name: "", email: "", carModel: "", postcode: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Have questions about our products, fitting, or an order?
              Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-lg mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Email Us</h3>
                <a
                  href="mailto:info@arfmotors.co.uk"
                  className="text-primary-500 hover:underline font-medium"
                >
                  info@arfmotors.co.uk
                </a>
                <p className="text-sm text-neutral-600 mt-1">
                  We typically respond within 24 hours
                </p>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-lg mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Response Times</h3>
                <div className="text-neutral-700 space-y-1 text-sm">
                  <p>Monday - Friday: Same day response</p>
                  <p>Saturday: Within 24 hours</p>
                  <p>Sunday: Within 48 hours</p>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-lg mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Fitting Area</h3>
                <p className="text-neutral-700 text-sm">
                  FixNow fitting available across London and surrounding regions up to Peterborough.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-8 lg:p-10">
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      ✓ Message sent! Check your email for a confirmation. We'll be in touch within 24 hours.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-neutral-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-neutral-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="carModel" className="block text-sm font-bold text-neutral-900 mb-2">
                        BMW Model
                      </label>
                      <input
                        type="text"
                        id="carModel"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="e.g., F30"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="block text-sm font-bold text-neutral-900 mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-neutral-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                      placeholder="Tell us about your enquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neutral-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-500 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-neutral-500 text-center">
                    We typically respond within 24 hours during business days
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Check our FAQ page for common questions about delivery, installation, returns, and more.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-500 transition-colors"
          >
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
}
