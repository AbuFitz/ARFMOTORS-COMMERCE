


"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, ShoppingBag, Sparkles, ChevronRight, ExternalLink, ShieldCheck, Truck, Store } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { MODEL_CATEGORIES } from "@/lib/bmw-models";
import { getFeaturedProducts } from "@/lib/products";
import { SITE_CONFIG } from "@/lib/site-config";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="bg-neutral-950">
      {/* Hero Section with Large BMW Image - Mobile Optimized */}
      <section className="relative h-[60vh] min-h-[500px] md:min-h-[600px] lg:h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&h=1080&fit=crop&q=80"
            alt="BMW M Performance"
            fill
            className="object-cover brightness-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl w-full"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-4 sm:mb-5 md:mb-6 text-white leading-[1.05] drop-shadow-2xl">
              BMW Performance<br />
              <span className="text-primary-500">& Styling Parts</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl drop-shadow-lg">
              Premium aftermarket parts and styling upgrades for your BMW — delivered fast, with optional fitting by FixNow Mechanics.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-primary-500 text-white px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:bg-primary-600 transition-all hover:gap-3 md:hover:gap-4 active:scale-95 touch-manipulation"
              >
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                Shop Parts
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?fitting=1"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-white/10 backdrop-blur text-white border-2 border-white/20 px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:bg-white/20 transition-all active:scale-95 touch-manipulation"
              >
                <Wrench className="h-5 w-5 md:h-6 md:w-6" />
                Parts with Fitting
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-5 w-5 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products - Immediate Product Showcase - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 text-primary-600 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Trending Now
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-3 sm:mb-4 md:mb-6">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Hand-picked upgrades that transform your BMW
            </p>
          </motion.div>

          {/* Responsive Grid: 2 columns mobile, 2-3 columns desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-primary-500 transition-colors group active:scale-95 touch-manipulation"
            >
              View All Products
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories - Horizontal Carousel on Mobile */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-2 sm:mb-3 md:mb-4">
              Shop By Category
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600">
              Premium parts for every aspect of your BMW
            </p>
          </div>

          {/* Mobile: Horizontal Carousel */}
          <div className="sm:hidden">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-4 px-4 scrollbar-hide smooth-scroll">
              {[
                {
                  title: "Exterior",
                  image: "/categories/exterior.jpg",
                  href: "/shop?category=exterior",
                  description: "Carbon styling & body kits"
                },
                {
                  title: "Interior",
                  image: "/categories/interior.jpg",
                  href: "/shop?category=interior",
                  description: "Premium cabin upgrades"
                },
                {
                  title: "Performance",
                  image: "/categories/performance.jpg",
                  href: "/shop?category=performance",
                  description: "Power & handling mods"
                },
                {
                  title: "Lighting",
                  image: "/categories/lighting.jpg",
                  href: "/shop?category=lighting",
                  description: "LED & angel eyes"
                },
              ].map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group relative flex-shrink-0 w-[75vw] aspect-[4/3] rounded-xl overflow-hidden snap-start active:scale-95 transition-transform touch-manipulation gpu-accelerated"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover brightness-110"
                    sizes="75vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <Sparkles className="h-6 w-6 text-primary-500 mb-2" />
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-neutral-200 mb-2">{category.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary-400 font-semibold text-sm">
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-center text-xs text-neutral-500 mt-2">Swipe to view more →</p>
          </div>

          {/* Tablet+: 2x2 Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {[
              {
                title: "Exterior",
                image: "/categories/exterior.jpg",
                href: "/shop?category=exterior",
                description: "Carbon styling & body kits"
              },
              {
                title: "Interior",
                image: "/categories/interior.jpg",
                href: "/shop?category=interior",
                description: "Premium cabin upgrades"
              },
              {
                title: "Performance",
                image: "/categories/performance.jpg",
                href: "/shop?category=performance",
                description: "Power & handling mods"
              },
              {
                title: "Lighting",
                image: "/categories/lighting.jpg",
                href: "/shop?category=lighting",
                description: "LED & angel eyes"
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative aspect-[4/5] lg:aspect-[3/4] rounded-xl lg:rounded-2xl overflow-hidden active:scale-95 transition-transform touch-manipulation"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover brightness-110 group-hover:brightness-140 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/25 to-transparent" />
                <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
                  <Sparkles className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary-500 mb-2 md:mb-3" />
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-300 mb-2 md:mb-3">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary-400 font-semibold text-sm md:text-base group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by BMW Model - Mobile: Dropdown, Desktop: Grid */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              Shop By Model
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600">
              Find parts for your BMW
            </p>
          </div>

          {/* Mobile: Compact Dropdown Selector */}
          <div className="sm:hidden">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = `/shop?model=${e.target.value}`;
                }
              }}
              className="w-full px-4 py-4 text-base font-display font-semibold text-neutral-900 bg-white border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5rem",
              }}
              defaultValue=""
            >
              <option value="" disabled>Select your BMW Series</option>
              {MODEL_CATEGORIES.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} Series
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Tablet+: Horizontal Image Carousel - Full Width Scrollable */}
        <div className="hidden sm:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                {MODEL_CATEGORIES.map((model) => {
                  const imageSrc = model.image || "/model/3series.jpeg";

                  return (
                    <Link
                      key={model.id}
                      href={`/shop?model=${model.id}`}
                      className="group relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden snap-start active:scale-95 transition-all touch-manipulation"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      {/* BMW Model Image */}
                      <Image
                        src={imageSrc}
                        alt={`BMW ${model.name} Series`}
                        fill
                        className="object-cover brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
                      />

                      {/* Dark overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/60 via-transparent to-transparent" />

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                        {/* BMW Badge Icon */}
                        <div className="mb-3 md:mb-4">
                          <svg
                            className="h-8 w-8 md:h-10 md:w-10 text-primary-400 drop-shadow-lg"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 6C7 4.89543 7.89543 4 9 4H11V20H9C7.89543 20 7 19.1046 7 18V6Z"
                              fill="currentColor"
                            />
                            <path
                              d="M13 4H15C16.1046 4 17 4.89543 17 6V18C17 19.1046 16.1046 20 15 20H13V4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>

                        {/* Model Name */}
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
                          {model.name}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-300 mb-3 drop-shadow-lg">
                          {model.id === "1-series" ? "Compact & Sporty" :
                           model.id === "2-series" ? "Dynamic Coupe" :
                           model.id === "3-series" ? "Ultimate Sport Sedan" :
                           model.id === "4-series" ? "Elegant Performance" :
                           model.id === "5-series" ? "Executive Luxury" :
                           model.id === "6-series" ? "Grand Touring" :
                           model.id === "7-series" ? "Flagship Luxury" :
                           model.id === "8-series" ? "High-Performance GT" :
                           model.id === "x-models" ? "Sport Activity Vehicle" :
                           "BMW Series"}
                        </p>

                        {/* CTA */}
                        <div className="inline-flex items-center gap-2 text-primary-400 font-semibold text-sm md:text-base group-hover:gap-3 transition-all">
                          Shop Parts
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                      </div>

                      {/* Hover border effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 rounded-xl md:rounded-2xl transition-colors pointer-events-none" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <p className="text-center text-xs md:text-sm text-neutral-500 mt-3">Scroll to view all models →</p>
          </div>
        </div>
      </section>

      {/* Also on eBay */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                <Store className="h-3 w-3 sm:h-4 sm:w-4 text-primary-400" />
                <span className="text-xs sm:text-sm font-bold text-primary-400 uppercase tracking-wider">
                  Also on eBay
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Shop Direct<br />
                <span className="text-primary-500">or on eBay</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed mb-6 sm:mb-8">
                Most of our range is also listed on our eBay store. Buy wherever you&apos;re
                most comfortable — ordering direct gets you our discount codes and the option
                to add FixNow fitting.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  { icon: ShoppingBag, text: "Same parts, same UK stock" },
                  { icon: Wrench, text: "FixNow fitting when you order direct" },
                  { icon: Truck, text: "Fast dispatch from UK stock" },
                  { icon: ShieldCheck, text: "Manufacturer warranty on every part" },
                ].map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-neutral-200">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-primary-600 transition-colors group active:scale-95 touch-manipulation"
                >
                  Shop Direct
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={SITE_CONFIG.ebay.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-white/20 transition-colors active:scale-95 touch-manipulation"
                >
                  Visit our eBay Store
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden order-first lg:order-last"
            >
              <Image
                src="/model/4series.jpg"
                alt="BMW parts from ARFMODS"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FixNow Fitting - Mobile Optimized */}
      <section id="fitting" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/fitting.jpg"
                alt="FixNow Mechanics fitting a part"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <div>
              <div className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                <Wrench className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-700" />
                <span className="text-xs sm:text-sm font-bold text-neutral-700 uppercase tracking-wider">
                  FixNow Mechanics
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Fitting Available on Eligible Parts
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6 sm:mb-8">
                Can&apos;t fit it yourself? Look for the fitting badge and tick &quot;Add fitting&quot;
                when you order. FixNow Mechanics will come to you, covering {SITE_CONFIG.fitting.coverage}.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  "Mobile fitting at your home or work",
                  "Postcode check before you buy",
                  "Fitting price confirmed before booking",
                  "12 months warranty on fitting labour"
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-sm sm:text-base text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/shop?fitting=1"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-primary-500 transition-colors active:scale-95 touch-manipulation"
              >
                Shop Fitting-Eligible Parts
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
