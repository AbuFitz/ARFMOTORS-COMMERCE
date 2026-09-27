"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, LifeBuoy, Mail, MessageCircle, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Floating help button. Hidden at checkout, and lifted above the sticky
// add-to-cart bar on product pages on mobile.
export function StickySupportButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname.startsWith("/checkout")) return null;
  const onProduct = pathname.startsWith("/product/");

  const options = [
    { href: "/support", icon: LifeBuoy, title: "Help centre", text: "Delivery, returns and fitting" },
    { href: "/contact", icon: MessageCircle, title: "Contact us", text: "Send us a message" },
    { href: `mailto:${SITE_CONFIG.emails.info}`, icon: Mail, title: "Email us", text: SITE_CONFIG.emails.info },
  ];

  return (
    <>
      {open && <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-[39]" />}
      <div className={cn("fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-6", onProduct ? "bottom-24 lg:bottom-6" : "bottom-4 sm:bottom-6")}>
        <AnimatePresence>
          {open && (
            <motion.div
              id="help-panel"
              role="dialog"
              aria-label="Need help?"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
            >
              <div className="px-5 pb-2 pt-4">
                <p className="font-display text-base font-semibold text-neutral-900">Need help?</p>
                <p className="text-xs text-neutral-500">We reply to every message within 24 hours.</p>
              </div>
              <ul className="px-2 pb-2">
                {options.map((o) => {
                  const inner = (
                    <>
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100">
                        <o.icon className="h-4 w-4 text-primary-500" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-neutral-900">{o.title}</span>
                        <span className="block truncate text-xs text-neutral-500">{o.text}</span>
                      </span>
                    </>
                  );
                  const cls = "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-50";
                  return (
                    <li key={o.title}>
                      {o.href.startsWith("mailto:") ? (
                        <a href={o.href} className={cls}>{inner}</a>
                      ) : (
                        <Link href={o.href} className={cls}>{inner}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="help-panel"
          aria-label={open ? "Close help" : "Need help?"}
          className="flex h-12 items-center gap-2 rounded-full bg-neutral-900 px-3.5 text-white shadow-xl transition-colors hover:bg-neutral-800 sm:px-4"
        >
          {open ? <X className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
          <span className="hidden text-sm font-semibold sm:inline">{open ? "Close" : "Help"}</span>
        </button>
      </div>
    </>
  );
}
