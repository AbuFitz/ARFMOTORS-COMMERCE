import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Wrench,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  ListChecks,
  Info,
  Building2,
  MapPin,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { getActiveCategories, getAllProducts, getFeaturedProducts, getNewestProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { GuideCard } from "@/components/blog/guide-card";
import { getAllPosts } from "@/lib/blog";
import { BannerSlideshow } from "@/components/banner-slideshow";
import { BANNERS } from "@/lib/banners";

export const metadata: Metadata = {
  title: { absolute: "ARF Commerce | Car Accessories, In-Car Tech & Tools" },
  alternates: { canonical: "/" },
};

// Swipeable row of product cards on mobile and tablet, 4-column grid from lg up
function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide sm:-mx-6 sm:scroll-px-6 sm:px-6 sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
      {products.map((product) => (
        <div key={product.id} className="w-[62%] flex-shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-auto">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ title, subtitle, href, linkText }: { title: string; subtitle?: string; href?: string; linkText?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500 transition-colors"
        >
          {linkText ?? "View all"}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}


export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newest = getNewestProducts(4, featured.map((p) => p.id));
  const categories = getActiveCategories();
  const heroProducts = getFeaturedProducts(3);
  const fittingProducts = getAllProducts().filter((p) => p.fittingEligible);
  const guides = getAllPosts().slice(0, 3);

  return (
    <div className="bg-white">
      {/* ─── Compact hero ─────────────────────────────────────── */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-12 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">ARF Commerce</p>
              <h1 className="mt-2 sm:mt-3 font-display text-[1.75rem] sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight">
                Products worth buying.
                <br />
                <span className="text-neutral-400">Service you can rely on.</span>
              </h1>
              <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-neutral-300 leading-relaxed">
                Car accessories, in-car tech, roadside essentials and tools. Professional fitting is available on
                selected products through FixNow Mechanics.
              </p>
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 sm:px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                >
                  Shop products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 sm:px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Browse categories
                </Link>
              </div>
            </div>

            {/* Featured product preview (desktop) */}
            <div className="hidden lg:grid grid-cols-3 gap-3">
              {heroProducts.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className={`group rounded-xl bg-white p-2.5 text-neutral-900 transition-transform hover:-translate-y-1 ${i === 1 ? "mt-8" : ""}`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                    <Image src={p.images[0]} alt={p.title} fill sizes="200px" className="object-cover" />
                  </div>
                  <p className="mt-2 line-clamp-1 text-xs font-medium">{p.title}</p>
                  <p className="text-sm font-bold">
                    {formatPrice(calculateDiscount(p.price, p.discountType, p.discountValue))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ───────────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-4 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Truck, title: "UK delivery", text: "Delivery times shown on every product" },
            { icon: ShieldCheck, title: "Secure checkout", text: "Payments processed by Stripe" },
            { icon: RotateCcw, title: "14-day returns", text: "Change your mind? See our returns policy" },
            { icon: MessageCircle, title: "Here to help", text: "Email us and we'll reply within 24 hours" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 flex-shrink-0 text-neutral-900" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Shop by category ──────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Shop by category" href="/categories" linkText="All categories" />
          {/* Swipeable row on mobile, grid from md up */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/shop/${c.id}`}
                className="group relative aspect-[4/3] w-[78%] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-neutral-900 sm:w-[46%] md:w-auto"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-neutral-300 line-clamp-1">{c.description}</p>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    {c.count} {c.count === 1 ? "product" : "products"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured products ─────────────────────────────────── */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Featured products" href="/shop?featured=1" />
          <ProductRail products={featured} />
        </div>
      </section>

      {/* ─── Optional fitting ──────────────────────────────────── */}
      {fittingProducts.length > 0 && (
        <section className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="grid gap-6 rounded-2xl border border-neutral-200 p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                  <Wrench className="h-3.5 w-3.5" />
                  Optional service
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                  Professional fitting available
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                  Selected products can be professionally installed by our fitting partner, FixNow
                  Mechanics. Tick &quot;Add fitting&quot; on an eligible product, check your postcode, and they&apos;ll
                  contact you to confirm the price and book a time.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    {SITE_CONFIG.fitting.coverage}
                  </span>
                </div>
                <Link
                  href="/installation"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500"
                >
                  How installation works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Eligible products</p>
                <ul className="divide-y divide-neutral-200">
                  {fittingProducts.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} className="group flex items-center gap-3 py-2.5">
                        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-md bg-white border border-neutral-200">
                          <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-neutral-900 group-hover:text-primary-500 line-clamp-1">
                          {p.title}
                        </span>
                        {p.fittingFrom && (
                          <span className="text-xs text-neutral-500 whitespace-nowrap">
                            fitting from {formatPrice(p.fittingFrom)}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── New arrivals ──────────────────────────────────────── */}
      {newest.length > 0 && (
        <section className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="New arrivals" subtitle="Recently added to the store" href="/shop?sort=newest" />
            <ProductRail products={newest} />
          </div>
        </section>
      )}

      {/* ─── Banner slideshow ─────────────────────────────────── */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BannerSlideshow banners={BANNERS} />
        </div>
      </section>

      {/* ─── Why shop with ARF Commerce ────────────────────────── */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">Why shop with ARF Commerce</h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              We&apos;re an independent UK retailer. We keep our range focused, describe products plainly and
              make it easy to get help when you need it.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500"
            >
              About us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: ListChecks,
                title: "A focused range",
                text: "Car accessories and tools picked for quality and value, not thousands of near-identical listings.",
              },
              {
                icon: Info,
                title: "Clear product information",
                text: "Every product page shows what's included, what it works with and when it will arrive.",
              },
              {
                icon: Building2,
                title: "A registered UK company",
                text: "ARF Commerce Ltd is registered in England and Wales. You'll always know who you're buying from.",
              },
              {
                icon: Wrench,
                title: "Fitting when you need it",
                text: "Selected products can be professionally installed by our fitting partner.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-xl bg-white p-4 border border-neutral-200">
                <item.icon className="h-5 w-5 flex-shrink-0 text-primary-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Guides ────────────────────────────────────────────── */}
      {guides.length > 0 && (
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Guides & advice" subtitle="Help choosing and using car tech, accessories and tools" href="/blog" linkText="All guides" />
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide sm:-mx-6 sm:gap-5 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
              {guides.map((g) => (
                <div key={g.slug} className="w-[80%] flex-shrink-0 snap-start sm:w-[46%] lg:w-auto">
                  <GuideCard post={g} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
