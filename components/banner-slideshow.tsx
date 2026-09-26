"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/banners";
import { cn } from "@/lib/utils";

const INTERVAL = 6000;

/**
 * Rectangular banner slideshow. A native scroll-snap track, so it swipes on
 * touch screens; autoplays and pauses on hover, focus or when off screen.
 */
export function BannerSlideshow({ banners }: { banners: Banner[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = banners.length;
    const index = ((i % n) + n) % n;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, [banners.length]);

  // Track the slide in view as the visitor swipes
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Only autoplay while the slideshow is on screen
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || !visible || reduced || banners.length < 2) return;
    const t = setTimeout(() => goTo(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, visible, goTo, banners.length]);

  if (banners.length === 0) return null;

  return (
    <div
      className="group relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide rounded-2xl bg-neutral-100">
        {banners.map((b, i) => (
          <Link
            key={b.src}
            href={b.href}
            aria-label={`${b.label}: slide ${i + 1} of ${banners.length}`}
            className="relative block w-full flex-shrink-0 snap-start aspect-[2/1] sm:aspect-[3/1]"
          >
            <Image
              src={b.src}
              alt={b.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-left sm:object-center"
            />
          </Link>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-neutral-900 shadow opacity-0 transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 sm:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-neutral-900 shadow opacity-0 transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 sm:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-3 flex justify-center gap-2">
            {banners.map((b, i) => (
              <button
                key={b.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active}
                className={cn("h-2 rounded-full transition-all", i === active ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300 hover:bg-neutral-400")}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
