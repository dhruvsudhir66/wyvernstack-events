import { z } from "zod";
import { weddingShareSeoSchema } from "../../lib/seo-schema.ts";

const photo = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const template2Schema = z.object({
  template: z.literal("template2"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  couple: z.object({
    bride: z.string().min(1),
    groom: z.string().min(1),
    brideFull: z.string().min(1),
    groomFull: z.string().min(1),
    joined: z.string().min(1),
  }),
  seo: weddingShareSeoSchema.extend({
    icon: z.string().min(1),
  }),
  event: z.object({
    displayDate: z.string().min(1),
    weekdayDate: z.string().min(1),
    compactNumeric: z.string().min(1),
    navDate: z.string().min(1),
    countdownIso: z.string().min(1),
    timezone: z.string().min(1),
    location: z.string().min(1),
  }),
  sections: z.object({
    marquee: z.boolean(),
  }),
  music: z.object({
    src: z.string().min(1),
    enabled: z.boolean(),
    volume: z.number().min(0).max(1),
  }),
  assets: z.object({
    logo: z.string().min(1),
    hero: z.string().min(1),
    saveDate: z.string().min(1),
    invitation: z.string().min(1),
    church: z.string().min(1),
    storyPrimary: z.string().min(1),
    storySecondary: z.string().min(1),
  }),
  people: z.array(z.object({
    role: z.string().min(1),
    name: z.string().min(1),
    image: z.string().min(1),
    family: z.string().min(1),
    work: z.string().min(1),
  })).length(2),
  story: z.object({
    captionLabel: z.string().min(1),
    captionDate: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
  gallery: z.array(photo).length(6),
  venue: z.object({
    churchImageAlt: z.string().min(1),
    events: z.array(z.object({
      number: z.string().min(1),
      type: z.string().min(1),
      time: z.string().min(1),
      place: z.string().min(1),
      description: z.string().min(1),
      mapsUrl: z.string().min(1),
    })).min(1),
    colors: z.array(z.string().min(1)).min(1),
  }),
  calendar: z.object({
    title: z.string().min(1),
    start: z.string().min(1),
    end: z.string().min(1),
    location: z.string().min(1),
    description: z.string().min(1),
  }),
  marquee: z.array(z.string().min(1)).min(1),
  footer: z.object({
    eyebrow: z.string().min(1),
    creditUrl: z.string().min(1),
    creditLabel: z.string().min(1),
    copyright: z.string().min(1),
  }),
  integrations: z.object({
    rsvpUrl: z.url(),
    uploadUrl: z.url(),
    wishesUrl: z.url(),
  }),
});

export type Template2Config = z.infer<typeof template2Schema>;
