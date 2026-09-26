import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, X, Store, ShoppingBag, Wrench, Truck, Camera, BadgePoundSterling } from "lucide-react";
import { SupplierEnquiryForm } from "./enquiry-form";
import { SlotImage } from "@/components/slot-image";
import { JsonLd } from "@/components/json-ld";
import { CATEGORIES } from "@/lib/products";
import { slotImage } from "@/lib/image-slots";
import { SITE_CONFIG } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Suppliers & Distributors",
  description:
    "Brands, manufacturers and distributors of car accessories, in-car tech, roadside kit and tools: sell your range through ARF Commerce's UK online store and eBay.",
  alternates: { canonical: "/suppliers" },
  openGraph: { url: "/suppliers", title: "Suppliers & Distributors | ARF Commerce" },
};

const CATEGORY_EXAMPLES: Record<string, string> = {
  "in-car-tech": "Dash cams, reversing cameras, CarPlay adapters, OBD2 readers",
  accessories: "Phone mounts, chargers, cables, interior and boot accessories",
  roadside: "Jump starters, tyre inflators, gauges, breakdown and safety kit",
  tools: "Tool kits, test equipment, work lights, garage essentials",
};

const offer = [
  { icon: Store, title: "Our own UK store", text: "Your products listed on arfcommerce.co.uk with proper descriptions, specs and compatibility." },
  { icon: ShoppingBag, title: "eBay as well", text: "Selected products are also listed on our eBay store, reaching buyers who shop there first." },
  { icon: Camera, title: "Listings done properly", text: "We write the copy, organise the photography and keep stock levels and prices up to date." },
  { icon: Wrench, title: "Fitting network", text: `Eligible in-car products can be sold with professional fitting through ${SITE_CONFIG.fitting.partner}.` },
  { icon: Truck, title: "UK fulfilment", text: "We can hold stock and dispatch from the UK, or work with you on supplier-dispatched orders." },
  { icon: BadgePoundSterling, title: "Simple commercials", text: "Wholesale or agreed trade pricing, with straightforward reordering. No listing fees." },
];

const steps = [
  { title: "Send an enquiry", text: "Tell us about your range using the form below." },
  { title: "We review your products", text: "We check fit with our categories, quality, pricing and demand." },
  { title: "Samples and terms", text: "If it's a match we'll ask for samples and agree pricing and stock." },
  { title: "Go live", text: "We create the listings and your products go on sale." },
];

export default function SuppliersPage() {
  const hero = slotImage("suppliers-hero");
  const categoryNames = CATEGORIES.map((c) => c.name);

  return (
    <div className="bg-white">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Suppliers & distributors", path: "/suppliers" }])} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="-z-10 object-cover object-[70%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/0" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">Suppliers & distributors</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Sell your car products through ARF Commerce
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-neutral-300 leading-relaxed">
            We&apos;re a UK online retailer looking for brands, manufacturers and distributors of quality car
            accessories, in-car tech and tools.
          </p>
          <a href="#enquiry" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600">
            Make an enquiry <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* What we list */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">What we list</h2>
            <p className="mt-2 text-neutral-600">
              We keep our range focused on the car. If your products fit one of these categories, we&apos;d like to hear from you.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="group overflow-hidden rounded-xl border border-neutral-200">
                <div className="relative aspect-[16/10] bg-neutral-900">
                  <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900">{c.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{CATEGORY_EXAMPLES[c.id]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="font-semibold text-neutral-900">We look for</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                {["UKCA or CE marked where required", "Clear specs, instructions and warranty", "Reliable stock and lead times", "Good product photos, or samples we can photograph"].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="h-4 w-4 flex-shrink-0 text-primary-500 mt-0.5" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="font-semibold text-neutral-900">We don&apos;t list</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                {["Products outside car accessories, tech and tools", "Engine, brake or safety-critical replacement parts", "Anything that can't be sold legally in the UK", "Unbranded items with no product information"].map((t) => (
                  <li key={t} className="flex gap-2"><X className="h-4 w-4 flex-shrink-0 text-neutral-400 mt-0.5" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">What we offer</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offer.map((o) => (
              <div key={o.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <o.icon className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">{o.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {([
              ["suppliers-listing", "Proper listings"],
              ["suppliers-dispatch", "UK dispatch"],
              ["suppliers-fitting", "Fitting on eligible products"],
            ] as const).map(([id, caption]) => (
              <figure key={id}>
                <SlotImage id={id} className="aspect-[4/3] rounded-xl" sizes="(min-width: 768px) 33vw, 100vw" />
                <figcaption className="mt-2 text-sm text-neutral-500">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">How it works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-neutral-200 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">Make an enquiry</h2>
            <p className="mt-2 text-neutral-600 leading-relaxed">
              Tell us about your company and range. We reply to every enquiry that fits our categories within 5
              working days.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Prefer email?{" "}
              <a href={`mailto:${SITE_CONFIG.emails.info}?subject=Supplier%20enquiry`} className="font-medium text-neutral-900 underline">
                {SITE_CONFIG.emails.info}
              </a>
            </p>
          </div>
          <div className="bg-white rounded-2xl">
            <SupplierEnquiryForm categories={categoryNames} />
          </div>
        </div>
      </section>
    </div>
  );
}
