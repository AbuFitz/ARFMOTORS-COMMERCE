"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, X } from "lucide-react";
import { checkPostcodeCoverage, formatPostcode } from "@/lib/postcode-checker";
import { cn } from "@/lib/utils";

interface PostcodeCheckerProps {
  onResult?: (result: { isAvailable: boolean; postcode: string }) => void;
}

export function PostcodeChecker({ onResult }: PostcodeCheckerProps) {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<{
    isAvailable: boolean;
    message: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    if (!postcode.trim()) return;

    setIsChecking(true);

    // Simulate API call delay for better UX
    setTimeout(() => {
      const checkResult = checkPostcodeCoverage(postcode);
      setResult({
        isAvailable: checkResult.isAvailable,
        message: checkResult.message,
      });
      setPostcode(formatPostcode(postcode));
      setIsChecking(false);

      if (onResult) {
        onResult({
          isAvailable: checkResult.isAvailable,
          postcode: checkResult.postcode,
        });
      }
    }, 500);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="Enter your postcode"
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={isChecking || !postcode.trim()}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            "bg-neutral-900 text-white hover:bg-neutral-800",
            "disabled:bg-neutral-300 disabled:cursor-not-allowed"
          )}
        >
          {isChecking ? "Checking..." : "Check"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border",
              result.isAvailable
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-amber-50 border-amber-200 text-amber-800"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {result.isAvailable ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-amber-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed">
                {result.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-neutral-500">
        Our fitting service covers London and surrounding regions up to Peterborough.
        Enter your postcode to check availability.
      </p>
    </div>
  );
}
