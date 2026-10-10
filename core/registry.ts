import { wedding1 } from "../configs/weddings/wedding1.ts";
import { wedding2 } from "../configs/weddings/wedding2.ts";
import { wedding3 } from "../configs/weddings/wedding3.ts";
import type { TemplateId, WeddingConfig } from "./wedding-base.ts";

export const weddings = [wedding1, wedding2, wedding3] as const;

const bySlug = new Map<string, WeddingConfig>(weddings.map((wedding) => [wedding.slug, wedding]));

export function listWeddings(): WeddingConfig[] {
  return [...bySlug.values()];
}

export function getWedding(slug: string): WeddingConfig | undefined {
  return bySlug.get(slug);
}

export function isTemplateId(value: string): value is TemplateId {
  return value === "template1" || value === "template2" || value === "template3";
}
