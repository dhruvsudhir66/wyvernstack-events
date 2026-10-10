import { withBasePath } from "./base-path.ts";

/** Production origin without a trailing slash. Used for Open Graph and canonical URLs. */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return raw && raw.length > 0 ? raw : "https://wyvernstack.com";
}

export function weddingPagePath(slug: string): string {
  return withBasePath(`/${slug}/`);
}

export function weddingPageUrl(slug: string): string {
  return `${getSiteOrigin()}${weddingPagePath(slug)}`;
}
