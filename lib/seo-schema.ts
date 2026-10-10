import { z } from "zod";

/** Shared per-wedding fields for link previews (WhatsApp, iMessage, etc.). */
export const weddingShareSeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Short line shown on social cards; can differ from the meta description. */
  openGraphDescription: z.string().min(1),
  /**
   * Path under `public/weddings/<slug>/` (e.g. `/images/invitation.png`).
   * Use a wide image (~1200×630) when possible for best previews.
   */
  ogImage: z.string().min(1),
  /**
   * Site origin for absolute OG URLs (e.g. `https://wyvernstack.com`).
   * Optional when `NEXT_PUBLIC_SITE_URL` is set on the Worker.
   */
  metadataBase: z.url().optional(),
});

export type WeddingShareSeo = z.infer<typeof weddingShareSeoSchema>;
