import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ListChecks, Truck, MessageCircle, Wrench, Store, Handshake, PackageCheck, ScanBarcode, Building2,
} from "lucide-react";
import { COMPANY, SITE_CONFIG } from "@/lib/site-config";
import { CATEGORIES } from "@/lib/products";
import { slotImage, uploadedSlotImage } from "@/lib/image-slots";
import { SlotImage } from "@/components/slot-image";

export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  description:
    "ARF Commerce is an independent UK online retailer of car accessories, in-car tech, roadside kit and tools. See how we stock, pack and ship every order.",
  openGraph: { url: "/about", title: "About ARF Commerce", images: [{ url: "/images/about/hero.jpg", alt: "ARF Commerce dispatch" }] },
};

const facts = [
  { icon: ListChecks, label: `${CATEGORIES.length} focused categories` },
  { icon: Truck, label: "Dispatched from the UK" },
  { icon: Wrench, label: "Fitting on selected products" },
  { icon: Building2, label: "Registered UK company" },
];

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

const journey = [
  { icon: ScanBarcode, title: "Checked in", text: "Stock is scanned into our warehouse and labelled, so we always know what's on the shelf." },
  { icon: PackageCheck, title: "Picked and packed", text: "Your order is picked, checked against the packing slip and packed securely." },
  { icon: Truck, title: "Sent on its way", text: "Parcels are labelled and handed to the courier for delivery." },
];

export default function AboutPage() {
  const hero = slotImage("about-hero");
  const range = uploadedSlotImage("about-range");
  const fitting = uploadedSlotImage("about-fitting");

  return (
    <div className="bg-white">
      {/* Hero: photo as a softened background */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <Image
          src={hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 scale-[1.02] object-cover object-center blur-[1px] brightness-[.8] saturate-[.85]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-950/35" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-neutral-950/80 to-transparent" />
        <div className="mx-auto flex min-h-[260px] max-w-7xl flex-col justify-center px-4 py-8 sm:min-h-[300px] sm:px-6 sm:py-10 lg:min-h-[340px] lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">About us</p>
          <h1 className="mt-2 max-w-3xl font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Car accessories and tools, packed and shipped from the UK
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-200 leading-relaxed">
            ARF Commerce is an independent online retailer. We keep a focused range, hold real stock and look after
            every order from our shelves to your door.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
              Shop products <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how-we-work" className="inline-flex items-center rounded-lg border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15">
              How we work
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 bg-neutral-950/60 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {facts.map((f) => (
              <li key={f.label} className="flex items-center gap-2.5 text-sm text-neutral-200">
                <f.icon className="h-4 w-4 flex-shrink-0 text-primary-500" />
                {f.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 text-base text-neutral-700 leading-relaxed">
            <h2 className="font-display text-2xl font-bold text-neutral-900">Who we are</h2>
            <p>
              We&apos;re an independent UK retailer of car accessories, in-car tech and tools. We source products that
              do their job well and sell them at a fair price.
            </p>
            <p>
              Our range covers dash cams and in-car tech, everyday car accessories, roadside and emergency kit, and
              tools for the garage. We add to it carefully rather than listing everything we can find, and we hold UK
              stock in our own warehouse so we can get orders out quickly.
            </p>
            <p>
              We sell through this website and selected marketplaces, and eligible products can also be professionally
              installed by our fitting partner, {SITE_CONFIG.fitting.partner}.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section id="how-we-work" className="scroll-mt-24 border-y border-neutral-200 bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">How we work</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
                <p.icon className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From our shelves to your door */}
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <div aria-hidden className="absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:order-2 lg:aspect-auto">
            <SlotImage id="about-packing" className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-neutral-950 lg:via-neutral-950/30" />
          </div>
          <div className="px-4 pb-14 pt-4 sm:px-6 sm:pb-16 lg:py-20 lg:pl-8 lg:pr-12 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">Every order</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold">From our shelves to your door</h2>
            <p className="mt-3 max-w-md text-neutral-400">Orders from our UK stock are picked, packed and sent by our own team.</p>
            <ol className="relative mt-8 space-y-7">
              <div aria-hidden className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-primary-500 to-primary-500/0" />
              {journey.map((j, i) => (
                <li key={j.title} className="relative flex gap-4">
                  <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white ring-8 ring-neutral-950">
                    <j.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">Step 0{i + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold">{j.title}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-neutral-400">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {range && (
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-neutral-900">
              <Image src={range.src} alt={range.alt} fill sizes="100vw" className="object-cover" />
            </div>
          </div>
        )}
      </section>

      {/* Where we sell, fitting, suppliers */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={fitting ? "grid gap-8 lg:grid-cols-2 lg:items-center" : ""}>
            {fitting && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 lg:order-2">
                <Image src={fitting.src} alt={fitting.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
            )}
            <div className={fitting ? "grid gap-4" : "grid gap-4 md:grid-cols-3"}>
              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <Store className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">Where we sell</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                  This website is our main store. Some of the same products are also listed on our{" "}
                  <a href={SITE_CONFIG.ebay.storeUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    eBay store
                  </a>
                  . Buying here lets you use our discount codes and add fitting to eligible products.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <Wrench className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">Optional fitting</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                  Professional fitting is available on selected products through {SITE_CONFIG.fitting.partner}, across{" "}
                  {SITE_CONFIG.fitting.coverage}. We don&apos;t offer servicing or repairs.{" "}
                  <Link href="/installation" className="underline">How installation works</Link>
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                <Handshake className="h-5 w-5 text-primary-500" />
                <h3 className="mt-3 font-semibold text-neutral-900">Suppliers and brands</h3>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
                  Make or distribute car accessories, tech or tools and want them in front of UK drivers?{" "}
                  <Link href="/suppliers" className="underline">Work with us</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company details */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid gap-8 md:grid-cols-2 md:items-center">
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
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Shop products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-900 transition-colors"
            >
              Read our guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
