"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  badges?: React.ReactNode;
}

export function ProductImageGallery({ images, title, badges }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const validImages = images.filter(Boolean);
  const current = validImages[selected] || "/images/placeholder.png";

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox(true);
  };

  const closeLightbox = useCallback(() => setLightbox(false), []);

  const lbPrev = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + validImages.length) % validImages.length),
    [validImages.length]
  );

  const lbNext = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % validImages.length),
    [validImages.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, lbPrev, lbNext]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 group cursor-zoom-in"
          onClick={() => openLightbox(selected)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={current}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          {badges && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {badges}
            </div>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn className="h-4 w-4" />
          </div>

          {/* Arrow nav on main image (if multiple) */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected((i) => (i - 1 + validImages.length) % validImages.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="h-4 w-4 text-neutral-800" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelected((i) => (i + 1) % validImages.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="h-4 w-4 text-neutral-800" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {validImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 snap-x">
            {validImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex-shrink-0 snap-start relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all",
                  selected === i
                    ? "border-neutral-900 shadow-md scale-105"
                    : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}

        {/* Image counter */}
        {validImages.length > 1 && (
          <p className="text-center text-xs text-neutral-400">
            {selected + 1} / {validImages.length} — click image to zoom
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
              {lightboxIndex + 1} / {validImages.length}
            </div>

            {/* Prev */}
            {validImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[85vh] mx-16 aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={validImages[lightboxIndex]}
                alt={`${title} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </motion.div>

            {/* Next */}
            {validImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            )}

            {/* Thumbnail strip */}
            {validImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {validImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      lightboxIndex === i ? "bg-white w-6" : "bg-white/40 hover:bg-white/70"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
