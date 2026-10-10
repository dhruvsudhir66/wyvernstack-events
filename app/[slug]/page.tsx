import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import WeddingTemplate from "@/core/template-resolver";
import { getWedding, listWeddings } from "@/core/registry";
import { mediaUrl } from "@/lib/assets";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listWeddings().map((wedding) => ({ slug: wedding.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) return {};

  const metadata: Metadata = {
    title: wedding.seo.title,
    description: wedding.seo.description,
  };

  if (wedding.template === "template1") {
    metadata.metadataBase = new URL(wedding.seo.metadataBase);
    metadata.openGraph = {
      title: wedding.seo.title,
      description: wedding.seo.openGraphDescription,
      type: "website",
    };
  }

  if (wedding.template === "template2") {
    metadata.icons = { icon: mediaUrl(wedding.slug, wedding.seo.icon) };
  }

  if (wedding.template === "template3") {
    metadata.openGraph = {
      title: wedding.seo.title,
      description: wedding.seo.description,
      type: "website",
    };
    metadata.twitter = {
      card: "summary",
      title: wedding.seo.title,
      description: wedding.seo.description,
    };
  }

  return metadata;
}

export async function generateViewport({ params }: PageProps): Promise<Viewport> {
  const { slug } = await params;
  const wedding = getWedding(slug);
  const themeColor =
    wedding?.template === "template1"
      ? wedding.seo.themeColor
      : wedding?.template === "template3"
        ? wedding.seo.themeColor
        : "#f7f3ed";

  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor,
  };
}

export default async function WeddingPage({ params }: PageProps) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) notFound();
  return <WeddingTemplate wedding={wedding} />;
}
