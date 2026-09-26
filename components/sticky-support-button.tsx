"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function StickySupportButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Main floating button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="collapsed"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(true)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-2xl hover:bg-primary-600 transition-colors"
              aria-label="Open support menu"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden min-w-[280px]"
            >
              {/* Header */}
              <div className="bg-primary-500 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">Need Help?</h3>
                  <p className="text-primary-100 text-sm">We're here for you</p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white hover:bg-primary-600 rounded-full p-1.5 transition-colors"
                  aria-label="Close support menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Options */}
              <div className="p-3 space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm">Contact Us</p>
                    <p className="text-xs text-neutral-600">Send a message</p>
                  </div>
                </Link>

                <Link
                  href="/support"
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm">Get Support</p>
                    <p className="text-xs text-neutral-600">FAQs & guides</p>
                  </div>
                </Link>

                <a
                  href="mailto:sales@arfmods.uk"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    <MessageCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm">Email Direct</p>
                    <p className="text-xs text-neutral-600">sales@arfmods.uk</p>
                  </div>
                </a>
              </div>

              {/* Quick info */}
              <div className="bg-neutral-50 px-4 py-3 border-t border-neutral-100">
                <p className="text-xs text-neutral-600 text-center">
                  Response time: <span className="font-semibold text-neutral-900">Within 24hrs</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
