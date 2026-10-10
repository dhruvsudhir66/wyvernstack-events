import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import WeddingTemplate from "@/core/template-resolver";
import { getWedding, listWeddings } from "@/core/registry";
import { buildWeddingMetadata } from "@/lib/wedding-metadata";

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
  return buildWeddingMetadata(wedding);
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
