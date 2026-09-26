import Image from "next/image";
import { slotImage, IMAGE_SLOTS, type ImageSlotId } from "@/lib/image-slots";
import { cn } from "@/lib/utils";

interface SlotImageProps {
  id: ImageSlotId;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

/**
 * A marketing image slot. Shows the uploaded photo, or a branded placeholder
 * until one is uploaded. In development the placeholder is labelled with the
 * path to upload to, so it's easy to see which photo goes where.
 */
export function SlotImage({ id, sizes, className, imageClassName, priority = false }: SlotImageProps) {
  const img = slotImage(id);
  const showLabel = !img.uploaded && process.env.NODE_ENV !== "production";
  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      {showLabel && (
        <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 font-mono text-[11px] text-white">
          Upload: public{IMAGE_SLOTS[id].upload} ({IMAGE_SLOTS[id].size})
        </span>
      )}
    </div>
  );
}
