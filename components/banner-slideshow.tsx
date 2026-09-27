"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/banners";
import { cn } from "@/lib/utils";

const INTERVAL = 5000;
const RESUME_AFTER_TOUCH = 4000;

/**
 * Rectangular banner slideshow. A native scroll-snap track, so it swipes on
 * touch screens. Scrolls itself every few seconds, pausing briefly after a
 * swipe or while a slide has keyboard focus.
 */
export function BannerSlideshow({ banners }: { banners: Banner[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const n = banners.length;

  // Slides always move right to left. After the last slide the track slides
  // on to a copy of the first, then jumps back to the real first one unseen.
  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const index = i < 0 ? n - 1 : Math.min(i, n);
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, [n]);

  // Track the slide in view, and loop back once the copy of slide 1 settles
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const pos = Math.round(el.scrollLeft / el.clientWidth);
      setActive(pos % n);
      clearTimeout(settle);
      settle = setTimeout(() => {
        if (Math.round(el.scrollLeft / el.clientWidth) >= n) el.scrollTo({ left: 0, behavior: "instant" });
      }, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
    };
  }, [n]);

  // Only autoplay while the slideshow is on screen
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || banners.length < 2) return;
    const t = setTimeout(() => goTo(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, visible, goTo, banners.length]);

  if (n === 0) return null;
  const slides = n > 1 ? [...banners, banners[0]] : banners;

  return (
    <div
      className="group relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => {
        clearTimeout(resumeTimer.current);
        setPaused(true);
      }}
      onTouchEnd={() => {
        resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_TOUCH);
      }}
    >
      <div ref={track} className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide bg-neutral-100 sm:rounded-2xl">
        {slides.map((b, i) => (
          <Link
            key={`${b.desktop}-${i}`}
            href={b.href}
            aria-hidden={i === n || undefined}
            tabIndex={i === n ? -1 : undefined}
            aria-label={`${b.label}: slide ${(i % n) + 1} of ${n}`}
            className="relative block w-full flex-shrink-0 snap-start aspect-[5/2] sm:aspect-[5/1]"
          >
            {/* Phones: dedicated 5:2 artwork, or the desktop artwork kept to its left edge (where the text is) */}
            <span className="absolute inset-0 sm:hidden">
              <Image
                src={b.mobile ?? b.desktop}
                alt={i === n ? "" : b.alt}
                fill
                sizes="100vw"
                className={b.mobile ? "object-cover" : "object-cover object-left"}
              />
            </span>
            {/* Tablet and desktop: 5:1 artwork */}
            <span className="absolute inset-0 hidden sm:block">
              <Image
                src={b.desktop}
                alt={i === n ? "" : b.alt}
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
                style={b.position ? { objectPosition: b.position } : undefined}
              />
            </span>
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
                key={b.desktop}
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
