import type { Template1Config } from "../templates/template1/schema.ts";
import type { Template2Config } from "../templates/template2/schema.ts";
import type { Template3Config } from "../templates/template3/schema.ts";

export type TemplateId = "template1" | "template2" | "template3";

export type WeddingConfig = Template1Config | Template2Config | Template3Config;

export type WeddingBase = {
  slug: string;
  template: TemplateId;
  couple: {
    bride: string;
    groom: string;
  };
  seo: {
    title: string;
    description: string;
    openGraphDescription: string;
    ogImage: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    metadataBase?: string;
  };
};
