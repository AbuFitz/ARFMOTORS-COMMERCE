"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MapPin, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "What's the difference between UK Stock and Imported parts?",
        a: "UK Stock items are held at our UK warehouse and ship within 1 working day, with delivery typically in 1-3 days. Imported parts come from our verified suppliers and take 10-14 days to arrive. Both are clearly labeled on product pages.",
      },
      {
        q: "How are delivery costs calculated?",
        a: "Delivery costs are calculated at checkout based on your location, order weight, and chosen delivery method. UK Stock orders over £100 qualify for free standard delivery.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order on our Track Order page.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we only ship within the UK. International shipping may be available in the future.",
      },
      {
        q: "Are your products also on eBay?",
        a: "Yes — most of our range is also listed on our eBay store. The parts and stock are the same. Ordering direct on our website gives you access to our discount codes and lets you add FixNow Mechanics fitting to eligible parts.",
      },
    ],
  },
  {
    category: "FixNow Fitting",
    questions: [
      {
        q: "How does FixNow Mechanics fitting work?",
        a: "FixNow Mechanics is our professional mobile fitting division. Parts that are eligible for fitting show a fitting option on the product page. Tick \"Add fitting\", check your postcode, and after you order we'll contact you to arrange a convenient time and location. Our technicians come to you with all necessary tools and expertise.",
      },
      {
        q: "What areas do you cover for fitting?",
        a: "We cover London and surrounding regions, extending up to Peterborough. Use the postcode checker on product pages to confirm availability for your location.",
      },
      {
        q: "How much does fitting cost?",
        a: "Fitting prices depend on the part and your car. Where we can, product pages show a \"fitting from\" guide price, and FixNow Mechanics confirm the final price with you before any work is booked. Fitting is paid separately to the parts.",
      },
      {
        q: "Can I fit the parts myself?",
        a: "Many of our parts are designed for enthusiast installation. Each product page includes fitment notes indicating difficulty level and whether professional fitting is recommended. Parts we don't offer fitting for are designed for straightforward DIY fitting.",
      },
    ],
  },
  {
    category: "Products & Compatibility",
    questions: [
      {
        q: "How do I know if a part will fit my BMW?",
        a: "Every product lists compatible BMW models in the description. Check the 'Fitment' tab on the product page for detailed compatibility information and any important notes.",
      },
      {
        q: "Are your parts genuine BMW or aftermarket?",
        a: "We offer both OEM-quality aftermarket parts and genuine BMW accessories. Product descriptions clearly state the manufacturer and quality grade.",
      },
      {
        q: "What does 'OEM+' mean?",
        a: "OEM+ refers to aftermarket parts that match or exceed original equipment manufacturer (OEM) standards in quality and fitment, often adding enhanced styling or performance features.",
      },
      {
        q: "Can I request a part not listed on your website?",
        a: "Yes! Contact us with details of the part you're looking for. We have access to an extensive supplier network and may be able to source it for you.",
      },
    ],
  },
  {
    category: "Returns & Warranty",
    questions: [
      {
        q: "What is your returns policy?",
        a: "You have a 14-day cooling-off period for online purchases (exclusions apply). Faulty products can be returned within 30 days for a full refund. See our Returns & Refunds Policy for complete details.",
      },
      {
        q: "What if my part arrives damaged?",
        a: "Contact us immediately with photos of the damage. We'll arrange a replacement or full refund, including return shipping costs.",
      },
      {
        q: "Do products come with warranty?",
        a: "Yes! All products include manufacturer warranty (typically 12-24 months). FixNow Mechanics installation includes 12-month labor warranty. See our Warranty page for details.",
      },
      {
        q: "What if a part doesn't fit correctly?",
        a: "If we provided incorrect compatibility information, you're entitled to a full refund. If you ordered the wrong part, returns are subject to the 14-day policy (conditions apply).",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards via our secure Stripe payment gateway.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use Stripe for payment processing, which is PCI-DSS compliant and employs industry-leading security measures. We never store your card details.",
      },
      {
        q: "Can I get an invoice?",
        a: "Yes, you'll receive an automated invoice via email after your order is confirmed.",
      },
    ],
  },
  {
    category: "About ARF Motors",
    questions: [
      {
        q: "Who runs ARF Motors?",
        a: "ARF Motors is a trading name of ARF Commerce Ltd, a UK company registered in England and Wales (company number 17432383). We sell BMW parts on this website and on eBay, with fitting available through our partner FixNow Mechanics.",
      },
      {
        q: "Why are some parts imported?",
        a: "Many high-quality BMW aftermarket parts are manufactured overseas to the same specifications as OEM parts, but at more accessible prices. We verify all suppliers for quality and reliability.",
      },
      {
        q: "Are you affiliated with BMW?",
        a: "No, ARF Motors is an independent aftermarket parts specialist. We're not affiliated with BMW AG or BMW UK, but we specialize exclusively in BMW products.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-neutral-900 pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-neutral-700 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    carModel: "",
    postcode: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", carModel: "", postcode: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">Support Centre</h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
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
                Typically respond within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-lg mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Response Times</h3>
              <div className="text-neutral-700 space-y-1 text-sm">
                <p>Mon-Fri: Same day</p>
                <p>Sat: Within 24 hours</p>
                <p>Sun: Within 48 hours</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-lg mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">Service Area</h3>
              <p className="text-neutral-700 text-sm">
                FixNow fitting available across London and surrounding regions up to Peterborough
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: FAQs + Contact Form */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FAQs Section (2/3 width) */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-neutral-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-10">
                {faqs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.05 }}
                  >
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.questions.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form (1/3 width, sticky) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                  <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                    Get in Touch
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Can't find your answer? Send us a message.
                  </p>

                  {submitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium text-sm">
                        ✓ Message sent! We'll respond within 24 hours.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Your name"
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
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
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
                      <label htmlFor="subject" className="block text-sm font-bold text-neutral-900 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-neutral-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                        placeholder="Your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neutral-900 text-white py-3 rounded-lg font-bold hover:bg-primary-500 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-neutral-500 text-center">
                      We typically respond within 24 hours
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Need More Help?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Check our policy pages for detailed information on returns, privacy, and terms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/returns"
              className="inline-flex items-center gap-2 bg-white border-2 border-neutral-900 text-neutral-900 px-6 py-3 rounded-lg font-bold hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Returns Policy
            </a>
            <a
              href="/warranty"
              className="inline-flex items-center gap-2 bg-white border-2 border-neutral-900 text-neutral-900 px-6 py-3 rounded-lg font-bold hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Warranty Info
            </a>
            <a
              href="/track-order"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-500 transition-colors"
            >
              Track Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
