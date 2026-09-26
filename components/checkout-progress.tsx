"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  name: string;
  description?: string;
}

interface CheckoutProgressProps {
  currentStep: number; // 1, 2, or 3
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { id: "shipping", name: "Shipping", description: "Address & delivery" },
  { id: "payment", name: "Payment", description: "Card details" },
  { id: "confirmation", name: "Confirmation", description: "Review & place order" },
];

export function CheckoutProgress({ currentStep, steps = defaultSteps }: CheckoutProgressProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      {/* Mobile: Horizontal compact */}
      <ol className="flex items-center justify-between md:hidden">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                    isComplete &&
                      "border-primary-500 bg-primary-500 text-white",
                    isCurrent &&
                      "border-primary-500 bg-white text-primary-500 shadow-lg shadow-primary-500/30",
                    !isComplete &&
                      !isCurrent &&
                      "border-neutral-300 bg-white text-neutral-500"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-xs font-bold">{stepNumber}</span>
                  )}
                </div>

                {/* Label - Mobile */}
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent ? "text-neutral-900" : "text-neutral-500"
                  )}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-2 pt-0 pb-8">
                  <div
                    className={cn(
                      "h-0.5 w-full transition-all",
                      isComplete ? "bg-primary-500" : "bg-neutral-300"
                    )}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Desktop: Horizontal with descriptions */}
      <ol className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-4 flex-1">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                    isComplete &&
                      "border-primary-500 bg-primary-500 text-white",
                    isCurrent &&
                      "border-primary-500 bg-white text-primary-500 shadow-lg shadow-primary-500/30 scale-110",
                    !isComplete &&
                      !isCurrent &&
                      "border-neutral-300 bg-white text-neutral-500"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-lg font-bold">{stepNumber}</span>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isCurrent ? "text-neutral-900" : "text-neutral-600"
                    )}
                  >
                    {step.name}
                  </p>
                  {step.description && (
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-6 max-w-[120px]">
                  <div
                    className={cn(
                      "h-0.5 w-full transition-all",
                      isComplete ? "bg-primary-500" : "bg-neutral-300"
                    )}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
