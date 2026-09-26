"use client";

import Link from "next/link";
import { Wrench, ShoppingCart, MapPin, Phone, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { PostcodeChecker } from "@/components/postcode-checker";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";

const steps = [
  {
    icon: ShoppingCart,
    title: "Choose an eligible product",
    text: "Products that can be fitted show a \"Fitting available\" badge. Tick \"Add fitting\" on the product page.",
  },
  {
    icon: MapPin,
    title: "Check your postcode",
    text: `Fitting is available across ${SITE_CONFIG.fitting.coverage}. We check your postcode before you order.`,
  },
  {
    icon: Phone,
    title: "FixNow Mechanics contact you",
    text: "After your order, FixNow Mechanics confirm the fitting price with you and book a time once your product has arrived.",
  },
];

export default function InstallationPage() {
  const eligible = getAllProducts().filter((p) => p.fittingEligible);

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700">
              <Wrench className="h-3.5 w-3.5" />
              Optional service
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-neutral-900">Professional installation</h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-600 leading-relaxed">
              Selected automotive products can be professionally installed by our fitting partner,{" "}
              <a href={SITE_CONFIG.fitting.url} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 underline underline-offset-2">
                FixNow Mechanics
              </a>
              . Fitting is optional — every product can also be bought on its own for delivery.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm font-semibold text-neutral-900 mb-3">Check if fitting is available where you are</p>
            <PostcodeChecker />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-neutral-200 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <step.icon className="h-5 w-5 text-primary-500" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-neutral-50 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-neutral-900">What fitting covers</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {[
                "Installing the eligible product you bought from ARF Commerce",
                "Mobile fitting at your home or workplace, within the coverage area",
                "A fitting price confirmed with you before anything is booked",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-neutral-50 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-neutral-900">What it doesn&apos;t cover</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {[
                "Vehicle servicing, repairs or MOT work",
                "Fitting products bought elsewhere",
                "Products that aren't marked as eligible for fitting",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <XCircle className="h-4 w-4 flex-shrink-0 text-neutral-400 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="md:col-span-2 text-xs text-neutral-500 leading-relaxed">
            Fitting is carried out by FixNow Mechanics, who are responsible for the installation work under their own
            terms. Fitting is paid separately from your ARF Commerce order. See our{" "}
            <Link href="/terms" className="underline">terms</Link> for details.
          </p>
        </div>
      </section>

      {/* Eligible products */}
      {eligible.length > 0 && (
        <section className="border-t border-neutral-200 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">Products with fitting available</h2>
              <Link href="/shop?fitting=1" className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {eligible.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
