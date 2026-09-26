// Every marketing image slot on the site. Upload your photo to `upload`
// (jpg, png or webp all work) and it replaces the branded placeholder
// automatically on the next build. The same list drives docs/IMAGE-BRIEF.md.

import { findPublicImage } from "@/lib/public-image";

export interface ImageSlot {
  upload: string;
  placeholder: string;
  alt: string;
  /** Recommended size in pixels (width x height) */
  size: string;
  brief: string;
}

const slot = (upload: string, placeholderId: string, alt: string, size: string, brief: string): ImageSlot => ({
  upload,
  placeholder: `/images/placeholders/${placeholderId}.jpg`,
  alt,
  size,
  brief,
});

export const IMAGE_SLOTS = {
  // ─── About page ───────────────────────────────────────────
  "about-hero": slot("/images/about/hero.jpg", "about-hero", "ARF Commerce products ready to dispatch", "2400 x 1000",
    "Wide banner. Your range laid out or stacked neatly, dark background, brand orange accent lighting. Leave the left third fairly plain for the headline."),
  "about-range": slot("/images/about/range.jpg", "about-range", "A selection of car accessories and tools sold by ARF Commerce", "1600 x 1200",
    "Flat lay from above of 6 to 10 products across the four categories: dash cam, phone mount, jump starter, tool kit."),
  "about-packing": slot("/images/about/packing.jpg", "about-packing", "An order being packed for delivery", "1600 x 1200",
    "Hands packing an order into a branded or plain box, with a packing slip visible. Warm, real, not staged-looking."),
  "about-stock": slot("/images/about/stock.jpg", "about-stock", "Stock on shelves ready to ship", "1600 x 1200",
    "Shelving or storage with boxed stock, labelled and organised. Shows you hold real UK stock."),
  "about-fitting": slot("/images/about/fitting.jpg", "about-fitting", "A dash cam being professionally fitted", "1600 x 1200",
    "A FixNow Mechanics technician fitting a dash cam or routing a cable behind trim. Close-up of hands and tools."),

  // ─── Suppliers page ───────────────────────────────────────
  "suppliers-hero": slot("/images/suppliers/hero.jpg", "suppliers-hero", "Boxed products in a warehouse ready to be listed", "2400 x 1000",
    "Wide banner. Pallets or cartons of product, or a shelf of boxed stock. Dark, moody lighting with an orange accent. Leave the left side calm for the headline."),
  "suppliers-listing": slot("/images/suppliers/listing.jpg", "suppliers-listing", "Product photography for an online listing", "1600 x 1200",
    "A product being photographed on a clean background, or a laptop showing a product page. Shows you create proper listings."),
  "suppliers-dispatch": slot("/images/suppliers/dispatch.jpg", "suppliers-dispatch", "Parcels packed and ready for courier collection", "1600 x 1200",
    "A stack of packed parcels with shipping labels, or a courier collection."),
  "suppliers-fitting": slot("/images/suppliers/fitting.jpg", "suppliers-fitting", "An in-car product being installed", "1600 x 1200",
    "An automotive product being fitted in a car: dash cam, reversing camera or wiring. Shows the fitting network behind your listings."),
} satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof IMAGE_SLOTS;

/** The uploaded image for a slot, or its branded placeholder. */
export function slotImage(id: ImageSlotId): { src: string; alt: string; uploaded: boolean } {
  const s = IMAGE_SLOTS[id];
  const uploaded = findPublicImage(s.upload);
  return { src: uploaded ?? s.placeholder, alt: s.alt, uploaded: Boolean(uploaded) };
}
