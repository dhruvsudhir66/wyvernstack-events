import { withBasePath } from "./base-path.ts";
import { getSiteOrigin } from "./site-url.ts";

/** Public-file path relative to `public/`. Does not include `/events`. */
export function resolveWeddingFile(slug: string, src: string): string {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  if (src.startsWith("/weddings/")) return src;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return `/weddings/${slug}${clean}`;
}

/** Browser URL for img, audio, CSS, and fetch. Includes `/events` once. */
export function mediaUrl(slug: string, src: string): string {
  const resolved = resolveWeddingFile(slug, src);
  if (/^(https?:|data:|blob:)/.test(resolved)) return resolved;
  return withBasePath(resolved);
}

/** Absolute URL for Open Graph / Twitter cards (WhatsApp, etc.). */
export function absoluteMediaUrl(slug: string, src: string): string {
  const path = mediaUrl(slug, src);
  if (/^https?:/.test(path)) return path;
  return `${getSiteOrigin()}${path}`;
}
