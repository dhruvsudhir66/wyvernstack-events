import { z } from "zod";

const photo = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

const profile = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  page: z.string().min(1),
  eyebrow: z.string().min(1),
  description: z.string().min(1),
  note: z.string().min(1),
  details: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1),
});

export const template1Schema = z.object({
  template: z.literal("template1"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  couple: z.object({
    bride: z.string().min(1),
    groom: z.string().min(1),
    monogram: z.string().min(1),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    openGraphDescription: z.string().min(1),
    metadataBase: z.url(),
    themeColor: z.string().min(1),
    manifestName: z.string().min(1),
    manifestShortName: z.string().min(1),
  }),
  event: z.object({
    displayDate: z.string().min(1),
    compactDate: z.string().min(1),
    countdownIso: z.string().min(1),
    timezone: z.string().min(1),
    location: z.string().min(1),
    locationLine: z.string().min(1),
    nav: z.object({
      day: z.string().min(1),
      month: z.string().min(1),
      year: z.string().min(1),
    }),
  }),
  footer: z.object({
    date: z.string().min(1),
    place: z.string().min(1),
    instagramUrl: z.string().min(1),
    instagramHandle: z.string().min(1),
  }),
  venue: z.object({
    date: z.string().min(1),
    time: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
    mapsUrl: z.string().min(1),
  }),
  music: z.object({
    src: z.string().min(1),
    enabled: z.boolean(),
  }),
  assets: z.object({
    logo: z.string().min(1),
    paperTexture: z.string().min(1),
    countdownPaper: z.string().min(1),
    hero: z.string().min(1),
    saveDate: z.string().min(1),
  }),
  profiles: z.object({
    bride: profile,
    groom: profile,
  }),
  gallery: z.object({
    left: z.array(photo).length(3),
    right: z.array(photo).length(3),
    captionDate: z.string().min(1),
    volumeDate: z.string().min(1),
    sideLabel: z.string().min(1),
  }),
  mobileNote: z.string().min(1),
  integrations: z.object({
    rsvpPath: z.string().startsWith("/"),
    uploadPath: z.string().startsWith("/"),
  }),
});

export type Template1Config = z.infer<typeof template1Schema>;
