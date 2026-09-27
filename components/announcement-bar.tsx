"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Tag, Wrench } from "lucide-react";
import { DISCOUNT_MINIMUM_ORDER } from "@/lib/site-config";

// Thin bar above the header. Desktop shows every message; mobile rotates them.
const MESSAGES = [
  { icon: Tag, text: <>10% off orders over £{DISCOUNT_MINIMUM_ORDER} with code <strong className="font-semibold text-white">WELCOME10</strong></>, href: "/shop" },
  { icon: Wrench, text: <>Professional fitting on selected products</>, href: "/installation" },
  { icon: RotateCcw, text: <>UK delivery and 14-day returns</>, href: "/returns" },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const current = MESSAGES[i];

  return (
    <div className="bg-neutral-950 text-neutral-300" role="region" aria-label="Offers and information">
      {/* Mobile: one message at a time */}
      <div className="relative flex h-9 items-center justify-center overflow-hidden px-4 text-xs sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            <Link href={current.href} className="flex items-center gap-1.5">
              <current.icon className="h-3.5 w-3.5 flex-shrink-0 text-primary-500" />
              <span>{current.text}</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Tablet and desktop: all messages */}
      <ul className="mx-auto hidden h-9 max-w-7xl items-center justify-between gap-6 px-6 text-xs sm:flex lg:px-8">
        {MESSAGES.map((m, n) => (
          <li key={n} className={n === 2 ? "hidden md:block" : undefined}>
            <Link href={m.href} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <m.icon className="h-3.5 w-3.5 text-primary-500" />
              <span>{m.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
