"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "What's the difference between UK Stock and Imported parts?",
        a: "UK Stock items are held at our UK warehouse and ship within 1 working day, with delivery typically in 1-3 days. Imported parts come from our verified Chinese suppliers and take 10-14 days to arrive. Both are clearly labeled on product pages.",
      },
      {
        q: "How are delivery costs calculated?",
        a: "Delivery costs are calculated at checkout based on your location, order weight, and chosen delivery method. UK Stock orders over £100 qualify for free standard delivery.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this to monitor your delivery in real-time.",
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
        a: "We accept returns within 30 days of delivery for unused items in original packaging. Return shipping costs are the customer's responsibility unless the item is faulty.",
      },
      {
        q: "What if my part arrives damaged?",
        a: "Contact us immediately with photos of the damage. We'll arrange a replacement or full refund, including return shipping costs.",
      },
      {
        q: "Do products come with warranty?",
        a: "Yes! All products include manufacturer warranty as stated on the product page. Warranty periods vary by product (typically 6-12 months).",
      },
      {
        q: "What if a part doesn't fit correctly?",
        a: "If you've ordered the correct part for your model and it doesn't fit, we'll help troubleshoot. If it's a fitment issue on our end, we'll arrange a return and refund.",
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
        a: "Yes, you'll receive an automated invoice via email after your order is confirmed. You can also download invoices from your account dashboard.",
      },
    ],
  },
  {
    category: "About ARFMODS",
    questions: [
      {
        q: "What is ARF Automotive Group?",
        a: "ARF Automotive Group is our parent company, bringing together automotive retail, retrofit services, and professional fitting under one trusted organization.",
      },
      {
        q: "Why are some parts imported from China?",
        a: "Many high-quality BMW aftermarket parts are manufactured in China to the same specifications as OEM parts, but at more accessible prices. We verify all suppliers for quality and reliability, providing full transparency about sourcing on every product.",
      },
      {
        q: "Are you affiliated with BMW?",
        a: "No, ARFMODS is an independent aftermarket parts specialist. We're not affiliated with BMW AG or BMW UK, but we specialize exclusively in BMW products.",
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
        className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
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
            <div className="px-6 pb-6 text-neutral-700 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white py-20">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about ordering, installation, and our products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <FAQItem key={index} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Can't find what you're looking for? Get in touch and we'll be happy to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
