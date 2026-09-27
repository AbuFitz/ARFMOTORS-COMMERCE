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
import { getActiveCategories, getAllProducts, getFeaturedProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { GuideCard } from "@/components/blog/guide-card";
import { getAllPosts } from "@/lib/blog";
import { BannerSlideshow } from "@/components/banner-slideshow";
import { BANNERS } from "@/lib/banners";

export const metadata: Metadata = {
  title: { absolute: "ARF Commerce | Car Accessories, In-Car Tech & Tools" },
  alternates: { canonical: "/" },
};

const TRUST = [
  { icon: Truck, title: "UK delivery", text: "Delivery times shown on every product" },
  { icon: ShieldCheck, title: "Secure checkout", text: "Payments processed by Stripe" },
  { icon: RotateCcw, title: "14-day returns", text: "Change your mind? See our returns policy" },
  { icon: MessageCircle, title: "Here to help", text: "Email us and we'll reply within 24 hours" },
];

const REASONS = [
  { icon: ListChecks, title: "A focused range", text: "Car accessories and tools picked for quality and value, not thousands of near-identical listings." },
  { icon: Info, title: "Clear product information", text: "Every product page shows what's included, what it works with and when it will arrive." },
  { icon: Building2, title: "A registered UK company", text: "ARF Commerce Ltd is registered in England and Wales, so you always know who you're buying from." },
  { icon: Wrench, title: "Fitting when you need it", text: "Selected products can be professionally installed by our fitting partner." },
];

// Every homepage section uses the same container and vertical rhythm
function Section({ children, className, tone = "white" }: { children: React.ReactNode; className?: string; tone?: "white" | "grey" | "dark" }) {
  return (
    <section
      className={cn(
        "py-12 sm:py-14 lg:py-16",
        tone === "grey" && "border-y border-neutral-200 bg-neutral-50",
        tone === "dark" && "bg-neutral-950 text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeading({ title, subtitle, href, linkText, dark = false }: { title: string; subtitle?: string; href?: string; linkText?: string; dark?: boolean }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <div>
        <h2 className={cn("font-display text-2xl font-bold sm:text-3xl", dark ? "text-white" : "text-neutral-900")}>{title}</h2>
        {subtitle && <p className={cn("mt-1 text-sm", dark ? "text-neutral-400" : "text-neutral-600")}>{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            "group inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold transition-colors hover:text-primary-500",
            dark ? "text-white" : "text-neutral-900"
          )}
        >
          {linkText ?? "View all"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

// Swipeable row on mobile and tablet, grid from lg up
function Rail({ children, cols = 4 }: { children: React.ReactNode[]; cols?: 3 | 4 }) {
  return (
    <div
      className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide sm:-mx-6 sm:gap-5 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0",
        cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      )}
    >
      {children.map((child, i) => (
        <div key={i} className={cn("flex-shrink-0 snap-start lg:w-auto", cols === 4 ? "w-[62%] sm:w-[40%] md:w-[30%]" : "w-[80%] sm:w-[46%]")}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const categories = getActiveCategories();
  const fittingProducts = getAllProducts().filter((p) => p.fittingEligible);
  const guides = getAllPosts().slice(0, 3);

  return (
    <div className="bg-white">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">ARF Commerce</p>
            <h1 className="mt-2 font-display text-[1.75rem] font-bold leading-[1.05] tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
              Products worth buying.
              <br />
              <span className="text-neutral-400">Service you can rely on.</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-300 sm:mt-4 sm:text-base">
              Car accessories, in-car tech, roadside essentials and tools. Professional fitting is available on
              selected products through {SITE_CONFIG.fitting.partner}.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 sm:px-5">
                Shop products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/categories" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-5">
                Browse categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip (tablet and desktop) ─────────────────── */}
      <section className="hidden border-b border-neutral-200 sm:block">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-4 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 flex-shrink-0 text-neutral-900" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                <p className="text-xs leading-relaxed text-neutral-500">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Shop by category ─────────────────────────────────── */}
      <Section>
        <SectionHeading title="Shop by category" href="/categories" linkText="All categories" />
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${c.id}`}
              className="group relative aspect-[4/3] w-[78%] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-neutral-900 sm:w-[46%] md:w-auto"
            >
              <Image src={c.image} alt="" fill sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <h3 className="font-display text-base font-bold text-white sm:text-lg">{c.name}</h3>
                <p className="line-clamp-1 text-xs text-neutral-300">{c.description}</p>
                <p className="mt-1 text-[11px] text-neutral-400">{c.count} {c.count === 1 ? "product" : "products"}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ─── Featured ─────────────────────────────────────────── */}
      <Section>
        <SectionHeading title="Featured products" href="/shop" linkText="View all products" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* ─── Banners ──────────────────────────────────────────── */}
      <Section>
        {/* Edge to edge on mobile, rounded card from sm up */}
        <div className="-mx-4 sm:mx-0">
          <BannerSlideshow banners={BANNERS} />
        </div>
      </Section>

      {/* ─── Fitting (dark band) ──────────────────────────────── */}
      {fittingProducts.length > 0 && (
        <Section tone="dark">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-neutral-200">
                <Wrench className="h-3.5 w-3.5 text-primary-500" />
                Optional service
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Professional fitting available</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                Selected products can be professionally installed by our fitting partner, {SITE_CONFIG.fitting.partner}.
                Tick &quot;Add fitting&quot; on an eligible product, check your postcode, and they&apos;ll contact you to
                confirm the price and book a time.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400">
                <MapPin className="h-4 w-4" />
                {SITE_CONFIG.fitting.coverage}
              </p>
              <div>
                <Link href="/installation" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-primary-500">
                  How installation works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Eligible products</p>
              <ul className="divide-y divide-white/10">
                {fittingProducts.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} className="group flex items-center gap-3 py-2.5">
                      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-md bg-white">
                        <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />
                      </div>
                      <span className="line-clamp-1 flex-1 text-sm font-medium text-white group-hover:text-primary-400">{p.title}</span>
                      {p.fittingFrom && (
                        <span className="whitespace-nowrap text-xs text-neutral-400">fitting from {formatPrice(p.fittingFrom)}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {/* ─── Guides ───────────────────────────────────────────── */}
      {guides.length > 0 && (
        <Section>
          <SectionHeading title="Guides & advice" subtitle="Help choosing and using car tech, accessories and tools" href="/blog" linkText="All guides" />
          <Rail cols={3}>{guides.map((g) => <GuideCard key={g.slug} post={g} />)}</Rail>
        </Section>
      )}

      {/* ─── Why shop with us (grey band) ─────────────────────── */}
      <Section tone="grey">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Why shop with ARF Commerce</h2>
            <p className="mt-1 max-w-2xl text-sm text-neutral-600">
              An independent UK retailer with a focused range, plain product descriptions and help when you need it.
            </p>
          </div>
          <Link href="/about" className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-neutral-900 hover:text-primary-500">
            About us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-6">
          {REASONS.map((item) => (
            <div key={item.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200">
                <item.icon className="h-5 w-5 text-primary-500" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
