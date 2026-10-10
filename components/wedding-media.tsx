"use client";

import Image, { type ImageProps } from "next/image";
import {
  createContext,
  forwardRef,
  useContext,
  type AudioHTMLAttributes,
  type ImgHTMLAttributes,
} from "react";
import { mediaUrl } from "@/lib/assets";

const SlugContext = createContext<string | null>(null);

export function WeddingAssetScope({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return <SlugContext.Provider value={slug}>{children}</SlugContext.Provider>;
}

function useSlug(): string {
  const slug = useContext(SlugContext);
  if (!slug) {
    throw new Error("Wedding media rendered outside WeddingAssetScope.");
  }
  return slug;
}

export function WeddingImage({ src, alt = "", ...props }: ImageProps) {
  const slug = useSlug();
  // Unoptimized next/image does not prepend basePath, so the browser URL is built here.
  const resolved = typeof src === "string" ? mediaUrl(slug, src) : src;
  return <Image {...props} alt={alt} src={resolved} unoptimized />;
}

export function WeddingImg({
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const slug = useSlug();
  const resolved = typeof src === "string" ? mediaUrl(slug, src) : src;
  return <img {...props} alt={props.alt ?? ""} src={resolved} />;
}

export const WeddingAudio = forwardRef<HTMLAudioElement, AudioHTMLAttributes<HTMLAudioElement>>(
  function WeddingAudio({ src, ...props }, ref) {
    const slug = useSlug();
    const resolved = typeof src === "string" ? mediaUrl(slug, src) : src;
    return <audio {...props} ref={ref} src={resolved} />;
  },
);
