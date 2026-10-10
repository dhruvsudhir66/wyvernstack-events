import type { Metadata } from "next";
import type { WeddingConfig } from "@/core/wedding-base";
import { absoluteMediaUrl } from "@/lib/assets";
import { getSiteOrigin, weddingPageUrl } from "@/lib/site-url";

export function buildWeddingMetadata(wedding: WeddingConfig): Metadata {
  const seo = wedding.seo;
  const origin = seo.metadataBase ?? getSiteOrigin();
  const pageUrl = weddingPageUrl(wedding.slug);
  const ogDescription = seo.openGraphDescription;
  const ogImageUrl = absoluteMediaUrl(wedding.slug, seo.ogImage);

  const metadata: Metadata = {
    metadataBase: new URL(origin),
    title: seo.title,
    description: seo.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Wyvernstack",
      locale: "en_IN",
      title: seo.title,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };

  if (wedding.template === "template2") {
    metadata.icons = { icon: absoluteMediaUrl(wedding.slug, wedding.seo.icon) };
  }

  return metadata;
}
