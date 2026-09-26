// Server-side only (uses the filesystem).
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Returns the public URL of an uploaded image if it exists, trying common
 * extensions (so "hero.jpg" also finds "hero.png" or "hero.webp").
 * Returns null when nothing has been uploaded yet.
 */
export function findPublicImage(src: string): string | null {
  const publicDir = path.join(process.cwd(), "public");
  const base = src.replace(/\.(jpe?g|png|webp)$/i, "");
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (fs.existsSync(path.join(publicDir, candidate))) return candidate;
  }
  return null;
}

/** Like findPublicImage, but falls back to another image. */
export function publicImageOr(src: string, fallback: string): string {
  return findPublicImage(src) ?? fallback;
}
