import Image from "next/image";
import { slotImage, IMAGE_SLOTS, type ImageSlotId } from "@/lib/image-slots";
import { cn } from "@/lib/utils";

interface SlotImageProps {
  id: ImageSlotId;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Slightly soften and grade the photo so fine detail doesn't draw the eye. On by default. */
  soft?: boolean;
}

/**
 * A marketing image slot. Shows the uploaded photo, or a branded placeholder
 * until one is uploaded. In development the placeholder is labelled with the
 * path to upload to, so it's easy to see which photo goes where.
 */
export function SlotImage({ id, sizes, className, imageClassName, priority = false, soft = true }: SlotImageProps) {
  const img = slotImage(id);
  const showLabel = !img.uploaded && process.env.NODE_ENV !== "production";
  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", soft && "scale-[1.03] blur-[0.8px] saturate-[.85] brightness-95", imageClassName)} />
      {soft && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-neutral-950/10" />}
      {showLabel && (
        <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 font-mono text-[11px] text-white">
          Upload: public{IMAGE_SLOTS[id].upload} ({IMAGE_SLOTS[id].size})
        </span>
      )}
    </div>
  );
}
