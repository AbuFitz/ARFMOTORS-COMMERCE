"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Package, RotateCcw, Wrench, MessageCircle } from "lucide-react";
import { FAQS } from "@/lib/faqs";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium text-neutral-900">{question}</span>
        <ChevronDown className={cn("h-5 w-5 text-neutral-400 flex-shrink-0 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-neutral-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const topics = [
  { icon: Package, title: "Track an order", text: "Find your tracking details", href: "/track-order" },
  { icon: RotateCcw, title: "Returns", text: "14-day returns on most items", href: "/returns" },
  { icon: Wrench, title: "Installation", text: "Fitting on selected products", href: "/installation" },
  { icon: MessageCircle, title: "Contact us", text: "We reply within 24 hours", href: "/contact" },
];

export default function SupportPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">Help centre</h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Answers to common questions about orders, delivery, returns and fitting.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {topics.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-400 transition-colors"
              >
                <t.icon className="h-5 w-5 text-primary-500" />
                <p className="mt-2 text-sm font-semibold text-neutral-900">{t.title}</p>
                <p className="text-xs text-neutral-500">{t.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[200px_1fr]">
          <nav className="hidden lg:block" aria-label="FAQ sections">
            <ul className="sticky top-32 space-y-2 text-sm">
              {FAQS.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="text-neutral-600 hover:text-neutral-900">
                    {g.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {FAQS.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-32">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">{group.category}</h2>
                <div>
                  {group.questions.map((faq) => (
                    <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-neutral-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="font-semibold">Still need help?</p>
                <p className="mt-1 text-sm text-neutral-400">
                  Send us a message and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  Contact us
                </Link>
                <a
                  href={`mailto:${SITE_CONFIG.emails.info}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
