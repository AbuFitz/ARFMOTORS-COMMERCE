import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ListChecks, Truck, MessageCircle, Wrench, Store } from "lucide-react";
import { COMPANY, SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ARF Commerce is an independent UK online retailer of car accessories, in-car tech and tools.",
};

const principles = [
  {
    icon: ListChecks,
    title: "A focused range",
    text: "We list products across a small number of categories and describe them plainly, so you can see what you're getting.",
  },
  {
    icon: Truck,
    title: "Clear delivery times",
    text: "Every product shows whether it's held in UK stock or ships from our supplier, and how long it should take to arrive.",
  },
  {
    icon: MessageCircle,
    title: "Help when you need it",
    text: "If you have a question before or after you buy, email us and a member of the team will reply.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">About us</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Car accessories and tools, sold by a UK retailer
          </h1>
          <div className="mt-5 space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed">
            <p>
              ARF Commerce is an independent UK online retailer of car accessories, in-car tech and tools. We focus
              on straightforward products, competitive pricing and dependable customer service.
            </p>
            <p>
              We source and sell dash cams and in-car tech, everyday car accessories, roadside and emergency kit,
              and tools for the garage. We&apos;ll keep adding to the range as it grows.
            </p>
            <p>
              We sell through our own online store and selected marketplaces, and eligible products can also be
              professionally installed by our fitting partner, FixNow Mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">How we work</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-neutral-200 p-5">
                <p.icon className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to buy + fitting */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-neutral-50 p-5 sm:p-6">
            <Store className="h-5 w-5 text-neutral-800" />
            <h3 className="mt-3 font-semibold text-neutral-900">Where we sell</h3>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
              This website is our main store. Some of the same products are also listed on our{" "}
              <a href={SITE_CONFIG.ebay.storeUrl} target="_blank" rel="noopener noreferrer" className="underline">
                eBay store
              </a>
              . Buying here lets you use our discount codes and add fitting to eligible products.
            </p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-5 sm:p-6">
            <Wrench className="h-5 w-5 text-neutral-800" />
            <h3 className="mt-3 font-semibold text-neutral-900">Optional fitting</h3>
            <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
              Professional fitting is available on selected products through FixNow Mechanics, across{" "}
              {SITE_CONFIG.fitting.coverage}. We don&apos;t offer servicing or repairs.{" "}
              <Link href="/installation" className="underline">How installation works</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Company details */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">Company details</h2>
            <address className="mt-3 not-italic text-sm text-neutral-700 leading-relaxed">
              {COMPANY.legalName}
              <br />
              Registered in {COMPANY.registeredIn}
              <br />
              Company number {COMPANY.companyNumber}
              {COMPANY.registeredOffice && (
                <>
                  <br />
                  Registered office: {COMPANY.registeredOffice}
                </>
              )}
              <br />
              <a href={`mailto:${SITE_CONFIG.emails.info}`} className="underline">
                {SITE_CONFIG.emails.info}
              </a>
            </address>
          </div>
          <div className="md:text-right">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Shop products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
